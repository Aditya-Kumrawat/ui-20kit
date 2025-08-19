import 'package:hive/hive.dart';
import 'package:json_annotation/json_annotation.dart';

import '../../domain/entities/user.dart';

part 'user_model.g.dart';

@HiveType(typeId: 0)
@JsonSerializable()
class UserModel extends HiveObject {
  @HiveField(0)
  final String id;

  @HiveField(1)
  final String email;

  @HiveField(2)
  final String? displayName;

  @HiveField(3)
  final String? photoUrl;

  @HiveField(4)
  final String? phoneNumber;

  @HiveField(5)
  final DateTime? createdAt;

  @HiveField(6)
  final DateTime? lastLoginAt;

  @HiveField(7)
  final bool isEmailVerified;

  @HiveField(8)
  final Map<String, dynamic>? customClaims;

  @HiveField(9)
  final String? firstName;

  @HiveField(10)
  final String? lastName;

  @HiveField(11)
  final DateTime? dateOfBirth;

  @HiveField(12)
  final String? country;

  @HiveField(13)
  final String? timezone;

  const UserModel({
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

  factory UserModel.fromJson(Map<String, dynamic> json) => 
      _$UserModelFromJson(json);

  Map<String, dynamic> toJson() => _$UserModelToJson(this);

  User toEntity() {
    return User(
      id: id,
      email: email,
      displayName: displayName,
      photoUrl: photoUrl,
      phoneNumber: phoneNumber,
      createdAt: createdAt,
      lastLoginAt: lastLoginAt,
      isEmailVerified: isEmailVerified,
      customClaims: customClaims,
      firstName: firstName,
      lastName: lastName,
      dateOfBirth: dateOfBirth,
      country: country,
      timezone: timezone,
    );
  }

  factory UserModel.fromEntity(User user) {
    return UserModel(
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
      phoneNumber: user.phoneNumber,
      createdAt: user.createdAt,
      lastLoginAt: user.lastLoginAt,
      isEmailVerified: user.isEmailVerified,
      customClaims: user.customClaims,
      firstName: user.firstName,
      lastName: user.lastName,
      dateOfBirth: user.dateOfBirth,
      country: user.country,
      timezone: user.timezone,
    );
  }

  UserModel copyWith({
    String? id,
    String? email,
    String? displayName,
    String? photoUrl,
    String? phoneNumber,
    DateTime? createdAt,
    DateTime? lastLoginAt,
    bool? isEmailVerified,
    Map<String, dynamic>? customClaims,
    String? firstName,
    String? lastName,
    DateTime? dateOfBirth,
    String? country,
    String? timezone,
  }) {
    return UserModel(
      id: id ?? this.id,
      email: email ?? this.email,
      displayName: displayName ?? this.displayName,
      photoUrl: photoUrl ?? this.photoUrl,
      phoneNumber: phoneNumber ?? this.phoneNumber,
      createdAt: createdAt ?? this.createdAt,
      lastLoginAt: lastLoginAt ?? this.lastLoginAt,
      isEmailVerified: isEmailVerified ?? this.isEmailVerified,
      customClaims: customClaims ?? this.customClaims,
      firstName: firstName ?? this.firstName,
      lastName: lastName ?? this.lastName,
      dateOfBirth: dateOfBirth ?? this.dateOfBirth,
      country: country ?? this.country,
      timezone: timezone ?? this.timezone,
    );
  }

  @override
  bool operator ==(Object other) {
    if (identical(this, other)) return true;
    return other is UserModel &&
        other.id == id &&
        other.email == email &&
        other.displayName == displayName &&
        other.photoUrl == photoUrl &&
        other.phoneNumber == phoneNumber &&
        other.isEmailVerified == isEmailVerified &&
        other.firstName == firstName &&
        other.lastName == lastName;
  }

  @override
  int get hashCode {
    return id.hashCode ^
        email.hashCode ^
        displayName.hashCode ^
        photoUrl.hashCode ^
        phoneNumber.hashCode ^
        isEmailVerified.hashCode ^
        firstName.hashCode ^
        lastName.hashCode;
  }

  @override
  String toString() {
    return 'UserModel(id: $id, email: $email, displayName: $displayName, isEmailVerified: $isEmailVerified)';
  }
}
