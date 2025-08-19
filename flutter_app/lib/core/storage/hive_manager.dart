import 'package:hive_flutter/hive_flutter.dart';
import 'package:injectable/injectable.dart';

import '../../features/auth/data/models/user_model.dart';

@lazySingleton
class HiveManager {
  static const String userBox = 'user_box';
  static const String settingsBox = 'settings_box';
  static const String cacheBox = 'cache_box';
  static const String offlineDataBox = 'offline_data_box';

  static Future<void> init() async {
    await Hive.initFlutter();
    
    // Register adapters
    if (!Hive.isAdapterRegistered(0)) {
      Hive.registerAdapter(UserModelAdapter());
    }

    // Open boxes
    await Hive.openBox(userBox);
    await Hive.openBox(settingsBox);
    await Hive.openBox(cacheBox);
    await Hive.openBox(offlineDataBox);
  }

  // User Box Methods
  Box get _userBox => Hive.box(userBox);

  Future<void> saveUser(UserModel user) async {
    await _userBox.put('current_user', user);
  }

  UserModel? getUser() {
    return _userBox.get('current_user');
  }

  Future<void> deleteUser() async {
    await _userBox.delete('current_user');
  }

  // Settings Box Methods
  Box get _settingsBox => Hive.box(settingsBox);

  Future<void> saveSetting(String key, dynamic value) async {
    await _settingsBox.put(key, value);
  }

  T? getSetting<T>(String key) {
    return _settingsBox.get(key);
  }

  Future<void> deleteSetting(String key) async {
    await _settingsBox.delete(key);
  }

  // Cache Box Methods
  Box get _cacheBox => Hive.box(cacheBox);

  Future<void> saveToCache(String key, dynamic value, {Duration? expiry}) async {
    final data = {
      'value': value,
      'timestamp': DateTime.now().millisecondsSinceEpoch,
      'expiry': expiry?.inMilliseconds,
    };
    await _cacheBox.put(key, data);
  }

  T? getFromCache<T>(String key) {
    final data = _cacheBox.get(key);
    if (data == null) return null;

    final timestamp = data['timestamp'] as int;
    final expiry = data['expiry'] as int?;

    if (expiry != null) {
      final now = DateTime.now().millisecondsSinceEpoch;
      if (now - timestamp > expiry) {
        _cacheBox.delete(key);
        return null;
      }
    }

    return data['value'] as T?;
  }

  Future<void> clearCache() async {
    await _cacheBox.clear();
  }

  // Offline Data Box Methods
  Box get _offlineDataBox => Hive.box(offlineDataBox);

  Future<void> saveOfflineData(String key, dynamic value) async {
    await _offlineDataBox.put(key, value);
  }

  T? getOfflineData<T>(String key) {
    return _offlineDataBox.get(key);
  }

  List<T> getAllOfflineData<T>() {
    return _offlineDataBox.values.cast<T>().toList();
  }

  Future<void> deleteOfflineData(String key) async {
    await _offlineDataBox.delete(key);
  }

  Future<void> clearOfflineData() async {
    await _offlineDataBox.clear();
  }

  // General Methods
  Future<void> clearAllData() async {
    await Future.wait([
      _userBox.clear(),
      _settingsBox.clear(),
      _cacheBox.clear(),
      _offlineDataBox.clear(),
    ]);
  }

  Future<void> closeAllBoxes() async {
    await Hive.close();
  }
}
