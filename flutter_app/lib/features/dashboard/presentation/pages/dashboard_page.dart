import 'package:flutter/material.dart';
import 'package:animate_do/animate_do.dart';
import 'package:fl_chart/fl_chart.dart';
import 'package:provider/provider.dart';

import '../../../../core/theme/app_colors.dart';
import '../../../../core/theme/app_text_styles.dart';
import '../../../auth/presentation/providers/auth_provider.dart';
import '../widgets/dashboard_card.dart';
import '../widgets/metric_card.dart';
import '../widgets/chart_card.dart';

class DashboardPage extends StatefulWidget {
  const DashboardPage({super.key});

  @override
  State<DashboardPage> createState() => _DashboardPageState();
}

class _DashboardPageState extends State<DashboardPage>
    with TickerProviderStateMixin {
  late AnimationController _animationController;
  late List<Animation<double>> _cardAnimations;

  final List<DashboardMetric> _metrics = [
    DashboardMetric(
      title: 'Total Revenue',
      value: '\$54,239',
      change: '+12.5%',
      isPositive: true,
      icon: Icons.attach_money,
      color: AppColors.primary,
    ),
    DashboardMetric(
      title: 'Active Users',
      value: '9,532',
      change: '+18.7%',
      isPositive: true,
      icon: Icons.people,
      color: AppColors.secondary,
    ),
    DashboardMetric(
      title: 'New Orders',
      value: '1,429',
      change: '+8.2%',
      isPositive: true,
      icon: Icons.shopping_cart,
      color: AppColors.accent,
    ),
    DashboardMetric(
      title: 'Performance',
      value: '94.2%',
      change: '+2.1%',
      isPositive: true,
      icon: Icons.trending_up,
      color: AppColors.warning,
    ),
  ];

  @override
  void initState() {
    super.initState();
    _initAnimations();
  }

  void _initAnimations() {
    _animationController = AnimationController(
      duration: const Duration(milliseconds: 1500),
      vsync: this,
    );

    _cardAnimations = List.generate(
      _metrics.length,
      (index) => Tween<double>(
        begin: 0.0,
        end: 1.0,
      ).animate(CurvedAnimation(
        parent: _animationController,
        curve: Interval(
          index * 0.1,
          0.4 + (index * 0.1),
          curve: Curves.easeOutBack,
        ),
      )),
    );

    _animationController.forward();
  }

  @override
  void dispose() {
    _animationController.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Colors.transparent,
      body: RefreshIndicator(
        onRefresh: () async {
          // Simulate refresh
          await Future.delayed(const Duration(seconds: 2));
        },
        child: SingleChildScrollView(
          physics: const BouncingScrollPhysics(),
          padding: const EdgeInsets.all(16),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: [
              // Header
              FadeInDown(
                duration: const Duration(milliseconds: 600),
                child: _buildHeader(),
              ),
              
              const SizedBox(height: 24),
              
              // Metrics Grid
              _buildMetricsGrid(),
              
              const SizedBox(height: 24),
              
              // Charts Section
              FadeInUp(
                duration: const Duration(milliseconds: 800),
                delay: const Duration(milliseconds: 400),
                child: _buildChartsSection(),
              ),
              
              const SizedBox(height: 24),
              
              // Recent Activity
              FadeInUp(
                duration: const Duration(milliseconds: 800),
                delay: const Duration(milliseconds: 600),
                child: _buildRecentActivity(),
              ),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildHeader() {
    return Consumer<AuthProvider>(
      builder: (context, authProvider, child) {
        final user = authProvider.user;
        return Row(
          children: [
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Welcome back,',
                    style: AppTextStyles.body1.copyWith(
                      color: Colors.grey[600],
                    ),
                  ),
                  Text(
                    user?.fullName ?? 'User',
                    style: AppTextStyles.dashboardTitle.copyWith(
                      color: Colors.grey[800],
                    ),
                  ),
                ],
              ),
            ),
            CircleAvatar(
              radius: 24,
              backgroundColor: AppColors.primary.withOpacity(0.1),
              backgroundImage: user?.photoUrl != null
                  ? NetworkImage(user!.photoUrl!)
                  : null,
              child: user?.photoUrl == null
                  ? Text(
                      user?.initials ?? 'U',
                      style: AppTextStyles.h4.copyWith(
                        color: AppColors.primary,
                        fontWeight: FontWeight.bold,
                      ),
                    )
                  : null,
            ),
          ],
        );
      },
    );
  }

  Widget _buildMetricsGrid() {
    return GridView.builder(
      shrinkWrap: true,
      physics: const NeverScrollableScrollPhysics(),
      gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount: 2,
        crossAxisSpacing: 16,
        mainAxisSpacing: 16,
        childAspectRatio: 1.2,
      ),
      itemCount: _metrics.length,
      itemBuilder: (context, index) {
        return AnimatedBuilder(
          animation: _cardAnimations[index],
          builder: (context, child) {
            return Transform.scale(
              scale: _cardAnimations[index].value,
              child: Transform.translate(
                offset: Offset(0, 50 * (1 - _cardAnimations[index].value)),
                child: MetricCard(metric: _metrics[index]),
              ),
            );
          },
        );
      },
    );
  }

  Widget _buildChartsSection() {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          'Analytics Overview',
          style: AppTextStyles.h3.copyWith(
            color: Colors.grey[800],
            fontWeight: FontWeight.bold,
          ),
        ),
        const SizedBox(height: 16),
        
        // Revenue Chart
        ChartCard(
          title: 'Revenue Trend',
          subtitle: 'Last 7 days',
          child: SizedBox(
            height: 200,
            child: LineChart(
              LineChartData(
                gridData: FlGridData(show: false),
                titlesData: FlTitlesData(show: false),
                borderData: FlBorderData(show: false),
                lineBarsData: [
                  LineChartBarData(
                    spots: const [
                      FlSpot(0, 3),
                      FlSpot(1, 4),
                      FlSpot(2, 3.5),
                      FlSpot(3, 5),
                      FlSpot(4, 4),
                      FlSpot(5, 6),
                      FlSpot(6, 5.5),
                    ],
                    isCurved: true,
                    color: AppColors.primary,
                    barWidth: 3,
                    belowBarData: BarAreaData(
                      show: true,
                      color: AppColors.primary.withOpacity(0.2),
                    ),
                    dotData: FlDotData(show: false),
                  ),
                ],
              ),
            ),
          ),
        ),
        
        const SizedBox(height: 16),
        
        // Category Chart
        ChartCard(
          title: 'Category Performance',
          subtitle: 'Current month',
          child: SizedBox(
            height: 200,
            child: PieChart(
              PieChartData(
                sectionsSpace: 2,
                centerSpaceRadius: 40,
                sections: [
                  PieChartSectionData(
                    value: 35,
                    color: AppColors.primary,
                    title: '35%',
                    radius: 60,
                    titleStyle: AppTextStyles.caption.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  PieChartSectionData(
                    value: 25,
                    color: AppColors.secondary,
                    title: '25%',
                    radius: 60,
                    titleStyle: AppTextStyles.caption.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  PieChartSectionData(
                    value: 20,
                    color: AppColors.accent,
                    title: '20%',
                    radius: 60,
                    titleStyle: AppTextStyles.caption.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                  PieChartSectionData(
                    value: 20,
                    color: AppColors.warning,
                    title: '20%',
                    radius: 60,
                    titleStyle: AppTextStyles.caption.copyWith(
                      color: Colors.white,
                      fontWeight: FontWeight.bold,
                    ),
                  ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }

  Widget _buildRecentActivity() {
    return DashboardCard(
      title: 'Recent Activity',
      child: Column(
        children: List.generate(5, (index) {
          return Padding(
            padding: const EdgeInsets.symmetric(vertical: 8),
            child: Row(
              children: [
                CircleAvatar(
                  radius: 16,
                  backgroundColor: AppColors.chartColors[index % AppColors.chartColors.length].withOpacity(0.2),
                  child: Icon(
                    Icons.circle,
                    size: 8,
                    color: AppColors.chartColors[index % AppColors.chartColors.length],
                  ),
                ),
                const SizedBox(width: 12),
                Expanded(
                  child: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: [
                      Text(
                        'Activity ${index + 1}',
                        style: AppTextStyles.body2.copyWith(
                          fontWeight: FontWeight.w500,
                        ),
                      ),
                      Text(
                        '${index + 1} minutes ago',
                        style: AppTextStyles.caption.copyWith(
                          color: Colors.grey[600],
                        ),
                      ),
                    ],
                  ),
                ),
                Icon(
                  Icons.chevron_right,
                  color: Colors.grey[400],
                ),
              ],
            ),
          );
        }),
      ),
    );
  }
}

class DashboardMetric {
  final String title;
  final String value;
  final String change;
  final bool isPositive;
  final IconData icon;
  final Color color;

  const DashboardMetric({
    required this.title,
    required this.value,
    required this.change,
    required this.isPositive,
    required this.icon,
    required this.color,
  });
}
