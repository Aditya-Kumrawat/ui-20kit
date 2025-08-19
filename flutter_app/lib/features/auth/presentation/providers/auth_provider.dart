import 'package:firebase_auth/firebase_auth.dart' as firebase_auth;
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';
import 'package:injectable/injectable.dart';
import 'package:local_auth/local_auth.dart';

import '../../../../core/storage/hive_manager.dart';
import '../../../../core/storage/secure_storage_service.dart';
import '../../../../core/utils/app_logger.dart';
import '../../data/models/user_model.dart';
import '../../domain/entities/user.dart' as domain;

enum AuthStatus {
  initial,
  loading,
  authenticated,
  unauthenticated,
  error,
}

@lazySingleton
class AuthProvider extends ChangeNotifier {
  final firebase_auth.FirebaseAuth _firebaseAuth;
  final GoogleSignIn _googleSignIn;
  final SecureStorageService _secureStorageService;
  final HiveManager _hiveManager;
  final LocalAuthentication _localAuth;

  AuthProvider(
    this._firebaseAuth,
    this._googleSignIn,
    this._secureStorageService,
    this._hiveManager,
    this._localAuth,
  ) {
    _init();
  }

  AuthStatus _status = AuthStatus.initial;
  domain.User? _user;
  String? _errorMessage;
  bool _isBiometricAvailable = false;
  bool _isBiometricEnabled = false;

  // Getters
  AuthStatus get status => _status;
  domain.User? get user => _user;
  String? get errorMessage => _errorMessage;
  bool get isAuthenticated => _status == AuthStatus.authenticated && _user != null;
  bool get isBiometricAvailable => _isBiometricAvailable;
  bool get isBiometricEnabled => _isBiometricEnabled;

  void _init() async {
    await _checkBiometricAvailability();
    await _checkStoredUser();
    _firebaseAuth.authStateChanges().listen(_onAuthStateChanged);
  }

  Future<void> _checkBiometricAvailability() async {
    try {
      _isBiometricAvailable = await _localAuth.canCheckBiometrics;
      notifyListeners();
    } catch (e) {
      AppLogger.error('Error checking biometric availability: $e');
    }
  }

  Future<void> _checkStoredUser() async {
    try {
      final storedUser = _hiveManager.getUser();
      final hasToken = await _secureStorageService.hasAccessToken();
      
      if (storedUser != null && hasToken) {
        _user = storedUser.toEntity();
        _status = AuthStatus.authenticated;
      } else {
        _status = AuthStatus.unauthenticated;
      }
      notifyListeners();
    } catch (e) {
      AppLogger.error('Error checking stored user: $e');
      _status = AuthStatus.unauthenticated;
      notifyListeners();
    }
  }

  void _onAuthStateChanged(firebase_auth.User? firebaseUser) async {
    if (firebaseUser != null) {
      await _updateUserFromFirebase(firebaseUser);
    } else {
      await _handleSignOut();
    }
  }

  Future<void> _updateUserFromFirebase(firebase_auth.User firebaseUser) async {
    try {
      final userModel = UserModel(
        id: firebaseUser.uid,
        email: firebaseUser.email!,
        displayName: firebaseUser.displayName,
        photoUrl: firebaseUser.photoURL,
        phoneNumber: firebaseUser.phoneNumber,
        createdAt: firebaseUser.metadata.creationTime,
        lastLoginAt: firebaseUser.metadata.lastSignInTime,
        isEmailVerified: firebaseUser.emailVerified,
      );

      await _hiveManager.saveUser(userModel);
      await _secureStorageService.saveUserId(firebaseUser.uid);
      
      // Get access token
      final idToken = await firebaseUser.getIdToken();
      await _secureStorageService.saveAccessToken(idToken);

      _user = userModel.toEntity();
      _status = AuthStatus.authenticated;
      _errorMessage = null;
      notifyListeners();
    } catch (e) {
      AppLogger.error('Error updating user from Firebase: $e');
      _setError('Failed to update user information');
    }
  }

  // Sign in with email and password
  Future<bool> signInWithEmailPassword(String email, String password) async {
    try {
      _setLoading();
      
      final credential = await _firebaseAuth.signInWithEmailAndPassword(
        email: email,
        password: password,
      );

      if (credential.user != null) {
        AppLogger.info('User signed in successfully: ${credential.user!.email}');
        return true;
      }
      
      _setError('Sign in failed');
      return false;
    } on firebase_auth.FirebaseAuthException catch (e) {
      _setError(_getFirebaseErrorMessage(e));
      return false;
    } catch (e) {
      AppLogger.error('Sign in error: $e');
      _setError('An unexpected error occurred');
      return false;
    }
  }

  // Sign up with email and password
  Future<bool> signUpWithEmailPassword(
    String email,
    String password,
    String firstName,
    String lastName,
  ) async {
    try {
      _setLoading();
      
      final credential = await _firebaseAuth.createUserWithEmailAndPassword(
        email: email,
        password: password,
      );

      if (credential.user != null) {
        // Update display name
        await credential.user!.updateDisplayName('$firstName $lastName');
        
        // Send email verification
        await credential.user!.sendEmailVerification();
        
        AppLogger.info('User signed up successfully: ${credential.user!.email}');
        return true;
      }
      
      _setError('Sign up failed');
      return false;
    } on firebase_auth.FirebaseAuthException catch (e) {
      _setError(_getFirebaseErrorMessage(e));
      return false;
    } catch (e) {
      AppLogger.error('Sign up error: $e');
      _setError('An unexpected error occurred');
      return false;
    }
  }

  // Sign in with Google
  Future<bool> signInWithGoogle() async {
    try {
      _setLoading();
      
      final GoogleSignInAccount? googleUser = await _googleSignIn.signIn();
      if (googleUser == null) {
        _status = AuthStatus.unauthenticated;
        notifyListeners();
        return false;
      }

      final GoogleSignInAuthentication googleAuth = await googleUser.authentication;
      final credential = firebase_auth.GoogleAuthProvider.credential(
        accessToken: googleAuth.accessToken,
        idToken: googleAuth.idToken,
      );

      final userCredential = await _firebaseAuth.signInWithCredential(credential);
      
      if (userCredential.user != null) {
        AppLogger.info('User signed in with Google: ${userCredential.user!.email}');
        return true;
      }
      
      _setError('Google sign in failed');
      return false;
    } catch (e) {
      AppLogger.error('Google sign in error: $e');
      _setError('Google sign in failed');
      return false;
    }
  }

  // Reset password
  Future<bool> resetPassword(String email) async {
    try {
      _setLoading();
      
      await _firebaseAuth.sendPasswordResetEmail(email: email);
      
      _status = AuthStatus.unauthenticated;
      _errorMessage = null;
      notifyListeners();
      
      AppLogger.info('Password reset email sent to: $email');
      return true;
    } on firebase_auth.FirebaseAuthException catch (e) {
      _setError(_getFirebaseErrorMessage(e));
      return false;
    } catch (e) {
      AppLogger.error('Password reset error: $e');
      _setError('Failed to send password reset email');
      return false;
    }
  }

  // Biometric authentication
  Future<bool> authenticateWithBiometrics() async {
    if (!_isBiometricAvailable) {
      _setError('Biometric authentication not available');
      return false;
    }

    try {
      final isAuthenticated = await _localAuth.authenticate(
        localizedReason: 'Please authenticate to access your account',
        options: const AuthenticationOptions(
          biometricOnly: true,
          stickyAuth: true,
        ),
      );

      if (isAuthenticated) {
        // Check if user has stored credentials
        final hasToken = await _secureStorageService.hasAccessToken();
        if (hasToken) {
          await _checkStoredUser();
          return true;
        }
      }

      return false;
    } catch (e) {
      AppLogger.error('Biometric authentication error: $e');
      _setError('Biometric authentication failed');
      return false;
    }
  }

  // Enable/disable biometric authentication
  Future<void> setBiometricEnabled(bool enabled) async {
    _isBiometricEnabled = enabled;
    // Store biometric preference
    await _secureStorageService.saveBiometricKey(enabled.toString());
    notifyListeners();
  }

  // Sign out
  Future<void> signOut() async {
    try {
      await _firebaseAuth.signOut();
      await _googleSignIn.signOut();
      await _handleSignOut();
      AppLogger.info('User signed out successfully');
    } catch (e) {
      AppLogger.error('Sign out error: $e');
      _setError('Sign out failed');
    }
  }

  Future<void> _handleSignOut() async {
    await _secureStorageService.clearAuthTokens();
    await _hiveManager.deleteUser();
    
    _user = null;
    _status = AuthStatus.unauthenticated;
    _errorMessage = null;
    notifyListeners();
  }

  // Update user profile
  Future<bool> updateProfile({
    String? displayName,
    String? photoUrl,
    String? firstName,
    String? lastName,
  }) async {
    try {
      final currentUser = _firebaseAuth.currentUser;
      if (currentUser == null) return false;

      _setLoading();

      if (displayName != null) {
        await currentUser.updateDisplayName(displayName);
      }
      
      if (photoUrl != null) {
        await currentUser.updatePhotoURL(photoUrl);
      }

      // Update local user data
      if (_user != null) {
        final updatedUserModel = UserModel.fromEntity(_user!).copyWith(
          displayName: displayName ?? _user!.displayName,
          photoUrl: photoUrl ?? _user!.photoUrl,
          firstName: firstName ?? _user!.firstName,
          lastName: lastName ?? _user!.lastName,
        );

        await _hiveManager.saveUser(updatedUserModel);
        _user = updatedUserModel.toEntity();
      }

      _status = AuthStatus.authenticated;
      notifyListeners();
      
      return true;
    } catch (e) {
      AppLogger.error('Profile update error: $e');
      _setError('Failed to update profile');
      return false;
    }
  }

  // Delete account
  Future<bool> deleteAccount() async {
    try {
      final currentUser = _firebaseAuth.currentUser;
      if (currentUser == null) return false;

      _setLoading();
      
      await currentUser.delete();
      await _handleSignOut();
      
      AppLogger.info('User account deleted successfully');
      return true;
    } catch (e) {
      AppLogger.error('Account deletion error: $e');
      _setError('Failed to delete account');
      return false;
    }
  }

  void _setLoading() {
    _status = AuthStatus.loading;
    _errorMessage = null;
    notifyListeners();
  }

  void _setError(String message) {
    _status = AuthStatus.error;
    _errorMessage = message;
    notifyListeners();
  }

  void clearError() {
    _errorMessage = null;
    notifyListeners();
  }

  String _getFirebaseErrorMessage(firebase_auth.FirebaseAuthException e) {
    switch (e.code) {
      case 'user-not-found':
        return 'No user found with this email address.';
      case 'wrong-password':
        return 'Incorrect password.';
      case 'email-already-in-use':
        return 'An account already exists with this email address.';
      case 'weak-password':
        return 'Password is too weak.';
      case 'invalid-email':
        return 'Invalid email address.';
      case 'user-disabled':
        return 'This account has been disabled.';
      case 'too-many-requests':
        return 'Too many failed attempts. Please try again later.';
      case 'operation-not-allowed':
        return 'This sign-in method is not enabled.';
      default:
        return e.message ?? 'An authentication error occurred.';
    }
  }
}
