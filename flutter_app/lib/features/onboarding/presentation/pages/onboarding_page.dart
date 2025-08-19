import 'package:flutter/material.dart';
import 'package:go_router/go_router.dart';
import 'package:lottie/lottie.dart';
import 'package:animate_do/animate_do.dart';

import '../../../../core/navigation/route_names.dart';
import '../../../../core/storage/preference_service.dart';
import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';
import '../../../../core/di/injection.dart';

class OnboardingPage extends StatefulWidget {
  const OnboardingPage({super.key});

  @override
  State<OnboardingPage> createState() => _OnboardingPageState();
}

class _OnboardingPageState extends State<OnboardingPage>
    with TickerProviderStateMixin {
  late PageController _pageController;
  late AnimationController _animationController;
  late Animation<double> _fadeAnimation;
  late Animation<Offset> _slideAnimation;
  
  int _currentPage = 0;
  final _preferenceService = getIt<PreferenceService>();

  final List<OnboardingItem> _onboardingItems = [
    OnboardingItem(
      title: 'Welcome to Dashboard App',
      description: 'Your all-in-one solution for analytics, AI chat, and computer vision capabilities.',
      animationAsset: 'assets/animations/welcome.json',
      backgroundColor: AppColors.primary,
    ),
    OnboardingItem(
      title: 'Powerful Analytics',
      description: 'Get insights from your data with beautiful charts and real-time analytics.',
      animationAsset: 'assets/animations/analytics.json',
      backgroundColor: AppColors.secondary,
    ),
    OnboardingItem(
      title: 'AI-Powered Chat',
      description: 'Chat with our intelligent AI assistant to get answers and assistance.',
      animationAsset: 'assets/animations/chat.json',
      backgroundColor: AppColors.accent,
    ),
    OnboardingItem(
      title: 'Computer Vision',
      description: 'Analyze images and videos with advanced machine learning capabilities.',
      animationAsset: 'assets/animations/vision.json',
      backgroundColor: AppColors.warning,
    ),
  ];

  @override
  void initState() {
    super.initState();
    _pageController = PageController();
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1000),
      vsync: this,
    );
    
    _fadeAnimation = Tween<double>(
      begin: 0.0,
      end: 1.0,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeInOut,
    ));
    
    _slideAnimation = Tween<Offset>(
      begin: const Offset(0, 0.3),
      end: Offset.zero,
    ).animate(CurvedAnimation(
      parent: _animationController,
      curve: Curves.easeOutBack,
    ));
    
    _animationController.forward();
  }

  @override
  void dispose() {
    _pageController.dispose();
    _animationController.dispose();
    super.dispose();
  }

  void _onPageChanged(int page) {
    setState(() {
      _currentPage = page;
    });
    
    // Restart animation for new page
    _animationController.reset();
    _animationController.forward();
  }

  void _nextPage() {
    if (_currentPage < _onboardingItems.length - 1) {
      _pageController.nextPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    } else {
      _completeOnboarding();
    }
  }

  void _previousPage() {
    if (_currentPage > 0) {
      _pageController.previousPage(
        duration: const Duration(milliseconds: 300),
        curve: Curves.easeInOut,
      );
    }
  }

  void _skipOnboarding() {
    _completeOnboarding();
  }

  void _completeOnboarding() async {
    await _preferenceService.setIsFirstLaunch(false);
    if (mounted) {
      context.go(RouteNames.login);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Container(
        decoration: BoxDecoration(
          gradient: LinearGradient(
            begin: Alignment.topLeft,
            end: Alignment.bottomRight,
            colors: [
              _onboardingItems[_currentPage].backgroundColor.withOpacity(0.8),
              _onboardingItems[_currentPage].backgroundColor.withOpacity(0.6),
              Colors.white,
            ],
          ),
        ),
        child: SafeArea(
          child: Column(
            children: [
              // Skip button
              Padding(
                padding: const EdgeInsets.all(20),
                child: Row(
                  mainAxisAlignment: MainAxisAlignment.end,
                  children: [
                    if (_currentPage < _onboardingItems.length - 1)
                      FadeInRight(
                        duration: const Duration(milliseconds: 500),
                        child: TextButton(
                          onPressed: _skipOnboarding,
                          child: Text(
                            'Skip',
                            style: AppTextStyles.button.copyWith(
                              color: Colors.white.withOpacity(0.8),
                            ),
                          ),
                        ),
                      ),
                  ],
                ),
              ),
              
              // Page content
              Expanded(
                child: PageView.builder(
                  controller: _pageController,
                  onPageChanged: _onPageChanged,
                  itemCount: _onboardingItems.length,
                  itemBuilder: (context, index) {
                    final item = _onboardingItems[index];
                    return AnimatedBuilder(
                      animation: _animationController,
                      child: _buildPageContent(item),
                      builder: (context, child) {
                        return FadeTransition(
                          opacity: _fadeAnimation,
                          child: SlideTransition(
                            position: _slideAnimation,
                            child: child,
                          ),
                        );
                      },
                    );
                  },
                ),
              ),
              
              // Page indicator and navigation
              Padding(
                padding: const EdgeInsets.all(32),
                child: Column(
                  children: [
                    // Page indicators
                    FadeInUp(
                      duration: const Duration(milliseconds: 600),
                      delay: const Duration(milliseconds: 200),
                      child: Row(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: List.generate(
                          _onboardingItems.length,
                          (index) => AnimatedContainer(
                            duration: const Duration(milliseconds: 300),
                            margin: const EdgeInsets.symmetric(horizontal: 4),
                            width: _currentPage == index ? 24 : 8,
                            height: 8,
                            decoration: BoxDecoration(
                              color: _currentPage == index
                                  ? Colors.white
                                  : Colors.white.withOpacity(0.4),
                              borderRadius: BorderRadius.circular(4),
                            ),
                          ),
                        ),
                      ),
                    ),
                    
                    const SizedBox(height: 32),
                    
                    // Navigation buttons
                    FadeInUp(
                      duration: const Duration(milliseconds: 600),
                      delay: const Duration(milliseconds: 400),
                      child: Row(
                        children: [
                          // Previous button
                          if (_currentPage > 0)
                            Expanded(
                              child: OutlinedButton.icon(
                                onPressed: _previousPage,
                                icon: const Icon(Icons.arrow_back),
                                label: const Text('Previous'),
                                style: OutlinedButton.styleFrom(
                                  foregroundColor: Colors.white,
                                  side: const BorderSide(color: Colors.white),
                                  padding: const EdgeInsets.symmetric(vertical: 16),
                                  shape: RoundedRectangleBorder(
                                    borderRadius: BorderRadius.circular(12),
                                  ),
                                ),
                              ),
                            ),
                          
                          if (_currentPage > 0) const SizedBox(width: 16),
                          
                          // Next/Get Started button
                          Expanded(
                            flex: _currentPage > 0 ? 1 : 2,
                            child: ElevatedButton(
                              onPressed: _nextPage,
                              style: ElevatedButton.styleFrom(
                                backgroundColor: Colors.white,
                                foregroundColor: _onboardingItems[_currentPage].backgroundColor,
                                padding: const EdgeInsets.symmetric(vertical: 16),
                                shape: RoundedRectangleBorder(
                                  borderRadius: BorderRadius.circular(12),
                                ),
                                elevation: 4,
                              ),
                              child: Row(
                                mainAxisAlignment: MainAxisAlignment.center,
                                children: [
                                  Text(
                                    _currentPage == _onboardingItems.length - 1
                                        ? 'Get Started'
                                        : 'Next',
                                    style: AppTextStyles.button,
                                  ),
                                  const SizedBox(width: 8),
                                  Icon(
                                    _currentPage == _onboardingItems.length - 1
                                        ? Icons.check
                                        : Icons.arrow_forward,
                                  ),
                                ],
                              ),
                            ),
                          ),
                        ],
                      ),
                    ),
                  ],
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildPageContent(OnboardingItem item) {
    return Padding(
      padding: const EdgeInsets.symmetric(horizontal: 32),
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          // Animation
          FadeInDown(
            duration: const Duration(milliseconds: 800),
            child: Container(
              height: 300,
              width: 300,
              decoration: BoxDecoration(
                color: Colors.white.withOpacity(0.1),
                borderRadius: BorderRadius.circular(150),
              ),
              child: Center(
                child: item.animationAsset.isNotEmpty
                    ? Lottie.asset(
                        item.animationAsset,
                        width: 250,
                        height: 250,
                        fit: BoxFit.contain,
                        errorBuilder: (context, error, stackTrace) {
                          return Icon(
                            Icons.dashboard,
                            size: 150,
                            color: Colors.white.withOpacity(0.8),
                          );
                        },
                      )
                    : Icon(
                        Icons.dashboard,
                        size: 150,
                        color: Colors.white.withOpacity(0.8),
                      ),
              ),
            ),
          ),
          
          const SizedBox(height: 48),
          
          // Title
          FadeInUp(
            duration: const Duration(milliseconds: 800),
            delay: const Duration(milliseconds: 200),
            child: Text(
              item.title,
              style: AppTextStyles.h1.copyWith(
                color: Colors.white,
                fontWeight: FontWeight.bold,
              ),
              textAlign: TextAlign.center,
            ),
          ),
          
          const SizedBox(height: 16),
          
          // Description
          FadeInUp(
            duration: const Duration(milliseconds: 800),
            delay: const Duration(milliseconds: 400),
            child: Text(
              item.description,
              style: AppTextStyles.body1.copyWith(
                color: Colors.white.withOpacity(0.9),
                height: 1.6,
              ),
              textAlign: TextAlign.center,
            ),
          ),
        ],
      ),
    );
  }
}

class OnboardingItem {
  final String title;
  final String description;
  final String animationAsset;
  final Color backgroundColor;

  const OnboardingItem({
    required this.title,
    required this.description,
    required this.animationAsset,
    required this.backgroundColor,
  });
}
