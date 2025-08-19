import 'package:flutter/material.dart';
import 'package:injectable/injectable.dart';

import 'hive_manager.dart';

@lazySingleton
class PreferenceService {
  final HiveManager _hiveManager;

  PreferenceService(this._hiveManager);

  // Theme Settings
  static const String _themeKey = 'theme_mode';
  static const String _isFirstLaunchKey = 'is_first_launch';
  static const String _languageKey = 'language';
  static const String _pushNotificationsKey = 'push_notifications';
  static const String _biometricAuthKey = 'biometric_auth';
  static const String _autoSyncKey = 'auto_sync';
  static const String _offlineModeKey = 'offline_mode';

  // Theme Mode
  Future<void> setThemeMode(ThemeMode themeMode) async {
    await _hiveManager.saveSetting(_themeKey, themeMode.index);
  }

  ThemeMode getThemeMode() {
    final index = _hiveManager.getSetting<int>(_themeKey) ?? 0;
    return ThemeMode.values[index];
  }

  // First Launch
  Future<void> setIsFirstLaunch(bool isFirstLaunch) async {
    await _hiveManager.saveSetting(_isFirstLaunchKey, isFirstLaunch);
  }

  bool getIsFirstLaunch() {
    return _hiveManager.getSetting<bool>(_isFirstLaunchKey) ?? true;
  }

  // Language
  Future<void> setLanguage(String languageCode) async {
    await _hiveManager.saveSetting(_languageKey, languageCode);
  }

  String getLanguage() {
    return _hiveManager.getSetting<String>(_languageKey) ?? 'en';
  }

  // Push Notifications
  Future<void> setPushNotificationsEnabled(bool enabled) async {
    await _hiveManager.saveSetting(_pushNotificationsKey, enabled);
  }

  bool isPushNotificationsEnabled() {
    return _hiveManager.getSetting<bool>(_pushNotificationsKey) ?? true;
  }

  // Biometric Authentication
  Future<void> setBiometricAuthEnabled(bool enabled) async {
    await _hiveManager.saveSetting(_biometricAuthKey, enabled);
  }

  bool isBiometricAuthEnabled() {
    return _hiveManager.getSetting<bool>(_biometricAuthKey) ?? false;
  }

  // Auto Sync
  Future<void> setAutoSyncEnabled(bool enabled) async {
    await _hiveManager.saveSetting(_autoSyncKey, enabled);
  }

  bool isAutoSyncEnabled() {
    return _hiveManager.getSetting<bool>(_autoSyncKey) ?? true;
  }

  // Offline Mode
  Future<void> setOfflineModeEnabled(bool enabled) async {
    await _hiveManager.saveSetting(_offlineModeKey, enabled);
  }

  bool isOfflineModeEnabled() {
    return _hiveManager.getSetting<bool>(_offlineModeKey) ?? false;
  }

  // Clear all preferences
  Future<void> clearAllPreferences() async {
    await Future.wait([
      _hiveManager.deleteSetting(_themeKey),
      _hiveManager.deleteSetting(_isFirstLaunchKey),
      _hiveManager.deleteSetting(_languageKey),
      _hiveManager.deleteSetting(_pushNotificationsKey),
      _hiveManager.deleteSetting(_biometricAuthKey),
      _hiveManager.deleteSetting(_autoSyncKey),
      _hiveManager.deleteSetting(_offlineModeKey),
    ]);
  }

  // Custom settings
  Future<void> setCustomSetting(String key, dynamic value) async {
    await _hiveManager.saveSetting(key, value);
  }

  T? getCustomSetting<T>(String key) {
    return _hiveManager.getSetting<T>(key);
  }

  Future<void> deleteCustomSetting(String key) async {
    await _hiveManager.deleteSetting(key);
  }
}
