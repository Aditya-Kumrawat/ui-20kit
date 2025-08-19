import 'package:flutter/material.dart';
import 'dashboard_card.dart';

class ChartCard extends StatelessWidget {
  final String title;
  final String? subtitle;
  final Widget child;
  final Widget? action;

  const ChartCard({
    super.key,
    required this.title,
    this.subtitle,
    required this.child,
    this.action,
  });

  @override
  Widget build(BuildContext context) {
    return DashboardCard(
      title: title,
      subtitle: subtitle,
      action: action,
      child: child,
    );
  }
}
