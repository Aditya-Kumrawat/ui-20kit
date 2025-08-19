import 'package:equatable/equatable.dart';

class User extends Equatable {
  final String id;
  final String email;
  final String? displayName;
  final String? photoUrl;
  final String? phoneNumber;
  final DateTime? createdAt;
  final DateTime? lastLoginAt;
  final bool isEmailVerified;
  final Map<String, dynamic>? customClaims;
  final String? firstName;
  final String? lastName;
  final DateTime? dateOfBirth;
  final String? country;
  final String? timezone;

  const User({
    required this.id,
    required this.email,
    this.displayName,
    this.photoUrl,
    this.phoneNumber,
    this.createdAt,
    this.lastLoginAt,
    this.isEmailVerified = false,
    this.customClaims,
    this.firstName,
    this.lastName,
    this.dateOfBirth,
    this.country,
    this.timezone,
  });

  String get fullName {
    if (firstName != null && lastName != null) {
      return '$firstName $lastName';
    }
    return displayName ?? email.split('@').first;
  }

  String get initials {
    if (firstName != null && lastName != null) {
      return '${firstName![0]}${lastName![0]}'.toUpperCase();
    }
    if (displayName != null && displayName!.isNotEmpty) {
      final names = displayName!.split(' ');
      if (names.length >= 2) {
        return '${names[0][0]}${names[1][0]}'.toUpperCase();
      }
      return displayName![0].toUpperCase();
    }
    return email[0].toUpperCase();
  }

  bool get hasCompleteProfile {
    return firstName != null &&
        lastName != null &&
        displayName != null &&
        photoUrl != null;
  }

  @override
  List<Object?> get props => [
        id,
        email,
        displayName,
        photoUrl,
        phoneNumber,
        createdAt,
        lastLoginAt,
        isEmailVerified,
        customClaims,
        firstName,
        lastName,
        dateOfBirth,
        country,
        timezone,
      ];

  @override
  String toString() {
    return 'User(id: $id, email: $email, displayName: $displayName)';
  }
}
