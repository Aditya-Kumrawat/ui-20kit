class RouteNames {
  RouteNames._();

  // Auth & Onboarding
  static const String splash = '/';
  static const String onboarding = '/onboarding';
  static const String login = '/login';
  static const String signup = '/signup';
  static const String forgotPassword = '/forgot-password';

  // Main App Routes
  static const String dashboard = '/dashboard';
  static const String analytics = '/analytics';
  static const String chatbot = '/chatbot';
  static const String computerVision = '/computer-vision';
  static const String profile = '/profile';

  // Settings
  static const String settings = '/settings';

  // Auth Guard - Routes that require authentication
  static const List<String> authRequiredRoutes = [
    dashboard,
    analytics,
    chatbot,
    computerVision,
    profile,
    settings,
  ];

  // Public Routes - Routes that don't require authentication
  static const List<String> publicRoutes = [
    splash,
    onboarding,
    login,
    signup,
    forgotPassword,
  ];
}
