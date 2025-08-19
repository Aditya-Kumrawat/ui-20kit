import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:provider/provider.dart';

import '../../../../core/navigation/route_names.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';
import '../../../auth/presentation/providers/auth_provider.dart';
import '../widgets/custom_bottom_navigation_bar.dart';

class MainPage extends StatefulWidget {
  final Widget child;

  const MainPage({
    super.key,
    required this.child,
  });

  @override
  State<MainPage> createState() => _MainPageState();
}

class _MainPageState extends State<MainPage> with TickerProviderStateMixin {
  late AnimationController _animationController;
  late Animation<double> _scaleAnimation;

  @override
  void initState() {
    super.initState();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 200),
      vsync: this,
    );
    _scaleAnimation = Tween<double>(
      begin: 1.0,
      end: 0.95,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  int _getCurrentIndex(BuildContext context) {
    final location = GoRouterState.of(context).uri.path;
    switch (location) {
      case RouteNames.dashboard:
        return 0;
      case RouteNames.analytics:
        return 1;
      case RouteNames.chatbot:
        return 2;
      case RouteNames.computerVision:
        return 3;
      case RouteNames.profile:
        return 4;
      default:
        return 0;
    }
  }

  void _onTabTapped(int index) {
    // Add haptic feedback
    final routes = [
      RouteNames.dashboard,
      RouteNames.analytics,
      RouteNames.chatbot,
      RouteNames.computerVision,
      RouteNames.profile,
    ];

    if (index < routes.length) {
      // Animate scale down and up
      _animationController.forward().then((_) {
        _animationController.reverse();
      });

      context.go(routes[index]);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Consumer<AuthProvider>(
      builder: (context, authProvider, child) {
        // Show loading screen if authentication is in progress
        if (authProvider.status == AuthStatus.loading) {
          return const Scaffold(
            body: Center(
              child: CircularProgressIndicator(),
            ),
          );
        }

        // Redirect to login if not authenticated
        if (!authProvider.isAuthenticated) {
          WidgetsBinding.instance.addPostFrameCallback((_) {
            context.go(RouteNames.login);
          });
          return const SizedBox.shrink();
        }

        return Scaffold(
          body: Container(
            decoration: const BoxDecoration(
              gradient: AppColors.backgroundGradient,
            ),
            child: SafeArea(
              child: AnimatedBuilder(
                animation: _scaleAnimation,
                builder: (context, child) {
                  return Transform.scale(
                    scale: _scaleAnimation.value,
                    child: widget.child,
                  );
                },
              ),
            ),
          ),
          bottomNavigationBar: CustomBottomNavigationBar(
            currentIndex: _getCurrentIndex(context),
            onTap: _onTabTapped,
          ),
          floatingActionButton: _buildFloatingActionButton(context),
          floatingActionButtonLocation: FloatingActionButtonLocation.centerFloat,
        );
      },
    );
  }

  Widget? _buildFloatingActionButton(BuildContext context) {
    final location = GoRouterState.of(context).uri.path;
    
    // Show FAB only on specific pages
    if (location == RouteNames.dashboard) {
      return FloatingActionButton.extended(
        onPressed: () {
          // Show quick actions bottom sheet
          _showQuickActionsBottomSheet(context);
        },
        icon: const Icon(Icons.add),
        label: const Text('Quick Action'),
        backgroundColor: AppColors.primary,
        foregroundColor: Colors.white,
      );
    }

    return null;
  }

  void _showQuickActionsBottomSheet(BuildContext context) {
    showModalBottomSheet(
      context: context,
      backgroundColor: Colors.transparent,
      builder: (context) => Container(
        margin: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surface,
          borderRadius: BorderRadius.circular(24),
        ),
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              margin: const EdgeInsets.only(top: 12),
              width: 40,
              height: 4,
              decoration: BoxDecoration(
                color: Colors.grey[300],
                borderRadius: BorderRadius.circular(2),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(24),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Quick Actions',
                    style: AppTextStyles.h3.copyWith(
                      color: Theme.of(context).colorScheme.onSurface,
                    ),
                  ),
                  const SizedBox(height: 16),
                  GridView.count(
                    shrinkWrap: true,
                    crossAxisCount: 3,
                    mainAxisSpacing: 16,
                    crossAxisSpacing: 16,
                    children: [
                      _buildQuickActionItem(
                        context,
                        icon: Icons.analytics,
                        label: 'Analytics',
                        onTap: () {
                          Navigator.pop(context);
                          context.go(RouteNames.analytics);
                        },
                      ),
                      _buildQuickActionItem(
                        context,
                        icon: Icons.chat,
                        label: 'AI Chat',
                        onTap: () {
                          Navigator.pop(context);
                          context.go(RouteNames.chatbot);
                        },
                      ),
                      _buildQuickActionItem(
                        context,
                        icon: Icons.camera_alt,
                        label: 'Vision',
                        onTap: () {
                          Navigator.pop(context);
                          context.go(RouteNames.computerVision);
                        },
                      ),
                      _buildQuickActionItem(
                        context,
                        icon: Icons.settings,
                        label: 'Settings',
                        onTap: () {
                          Navigator.pop(context);
                          context.go(RouteNames.settings);
                        },
                      ),
                      _buildQuickActionItem(
                        context,
                        icon: Icons.person,
                        label: 'Profile',
                        onTap: () {
                          Navigator.pop(context);
                          context.go(RouteNames.profile);
                        },
                      ),
                      _buildQuickActionItem(
                        context,
                        icon: Icons.logout,
                        label: 'Logout',
                        onTap: () async {
                          Navigator.pop(context);
                          await context.read<AuthProvider>().signOut();
                        },
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildQuickActionItem(
    BuildContext context, {
    required IconData icon,
    required String label,
    required VoidCallback onTap,
  }) {
    return InkWell(
      onTap: onTap,
      borderRadius: BorderRadius.circular(16),
      child: Container(
        padding: const EdgeInsets.all(16),
        decoration: BoxDecoration(
          color: Theme.of(context).colorScheme.surfaceVariant.withOpacity(0.3),
          borderRadius: BorderRadius.circular(16),
          border: Border.all(
            color: Theme.of(context).colorScheme.outline.withOpacity(0.2),
          ),
        ),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              icon,
              size: 24,
              color: Theme.of(context).colorScheme.primary,
            ),
            const SizedBox(height: 8),
            Text(
              label,
              style: AppTextStyles.caption.copyWith(
                color: Theme.of(context).colorScheme.onSurface,
                fontWeight: FontWeight.w500,
              ),
              textAlign: TextAlign.center,
            ),
          ],
        ),
      ),
    );
  }
}
