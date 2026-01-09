package com.markethub.features.user;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.markethub.features.user.dto.ProfileSummary;
import com.markethub.features.user.models.User;
import com.markethub.features.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;

	public ProfileSummary getProfile(UUID id, User user) {
		User profile = userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
		return ProfileSummary.builder()
				.id(profile.getId())
				.firstName(profile.getFirstName())
				.lastName(profile.getLastName())
				.role(profile.getRole())
				.enabled(profile.isEnabled())
				.accountNonLocked(profile.isAccountNonLocked())
				.accountNonExpired(profile.isAccountNonExpired())
				.credentialsNonExpired(profile.isCredentialsNonExpired())
				.authorities(profile.getAuthorities())
				.isOwner(profile.getId().equals(user.getId()))
				.build();
	}
}
