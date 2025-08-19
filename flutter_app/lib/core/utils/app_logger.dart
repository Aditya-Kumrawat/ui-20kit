import 'dart:developer' as developer;
import 'package:flutter/foundation.dart';

enum LogLevel {
  debug,
  info,
  warning,
  error,
  verbose,
}

class AppLogger {
  AppLogger._();

  static const String _tag = 'DashboardApp';
  static bool _isEnabled = kDebugMode;

  static void setEnabled(bool enabled) {
    _isEnabled = enabled;
  }

  static void debug(String message, [Object? error, StackTrace? stackTrace]) {
    _log(LogLevel.debug, message, error, stackTrace);
  }

  static void info(String message, [Object? error, StackTrace? stackTrace]) {
    _log(LogLevel.info, message, error, stackTrace);
  }

  static void warning(String message, [Object? error, StackTrace? stackTrace]) {
    _log(LogLevel.warning, message, error, stackTrace);
  }

  static void error(String message, [Object? error, StackTrace? stackTrace]) {
    _log(LogLevel.error, message, error, stackTrace);
  }

  static void verbose(String message, [Object? error, StackTrace? stackTrace]) {
    _log(LogLevel.verbose, message, error, stackTrace);
  }

  static void _log(
    LogLevel level,
    String message,
    Object? error,
    StackTrace? stackTrace,
  ) {
    if (!_isEnabled) return;

    final timestamp = DateTime.now().toIso8601String();
    final levelString = _getLevelString(level);
    final formattedMessage = '[$timestamp] [$_tag] [$levelString] $message';

    switch (level) {
      case LogLevel.debug:
        developer.log(
          formattedMessage,
          name: _tag,
          level: 500,
          error: error,
          stackTrace: stackTrace,
        );
        break;
      case LogLevel.info:
        developer.log(
          formattedMessage,
          name: _tag,
          level: 800,
          error: error,
          stackTrace: stackTrace,
        );
        break;
      case LogLevel.warning:
        developer.log(
          formattedMessage,
          name: _tag,
          level: 900,
          error: error,
          stackTrace: stackTrace,
        );
        break;
      case LogLevel.error:
        developer.log(
          formattedMessage,
          name: _tag,
          level: 1000,
          error: error,
          stackTrace: stackTrace,
        );
        break;
      case LogLevel.verbose:
        developer.log(
          formattedMessage,
          name: _tag,
          level: 300,
          error: error,
          stackTrace: stackTrace,
        );
        break;
    }

    // Also print to console in debug mode
    if (kDebugMode) {
      print(formattedMessage);
      if (error != null) {
        print('Error: $error');
      }
      if (stackTrace != null) {
        print('StackTrace: $stackTrace');
      }
    }
  }

  static String _getLevelString(LogLevel level) {
    switch (level) {
      case LogLevel.debug:
        return 'DEBUG';
      case LogLevel.info:
        return 'INFO';
      case LogLevel.warning:
        return 'WARNING';
      case LogLevel.error:
        return 'ERROR';
      case LogLevel.verbose:
        return 'VERBOSE';
    }
  }

  // Convenience methods for common logging scenarios
  static void apiRequest(String endpoint, Map<String, dynamic>? data) {
    info('API Request: $endpoint', data);
  }

  static void apiResponse(String endpoint, int statusCode, [dynamic data]) {
    if (statusCode >= 200 && statusCode < 300) {
      info('API Response: $endpoint - $statusCode', data);
    } else {
      error('API Error: $endpoint - $statusCode', data);
    }
  }

  static void navigation(String from, String to) {
    info('Navigation: $from -> $to');
  }

  static void userAction(String action, [Map<String, dynamic>? context]) {
    info('User Action: $action', context);
  }

  static void performance(String operation, Duration duration) {
    if (duration.inMilliseconds > 1000) {
      warning('Slow Operation: $operation took ${duration.inMilliseconds}ms');
    } else {
      debug('Performance: $operation took ${duration.inMilliseconds}ms');
    }
  }

  static void exception(String operation, Object error, [StackTrace? stackTrace]) {
    AppLogger.error('Exception in $operation: $error', error, stackTrace);
  }
}
