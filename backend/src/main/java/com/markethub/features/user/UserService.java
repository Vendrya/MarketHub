package com.markethub.features.user;

import java.util.UUID;

import org.springframework.stereotype.Service;

import com.markethub.features.user.models.User;
import com.markethub.features.user.repository.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {
	private final UserRepository userRepository;

	public User getUserById(UUID id) {
		return userRepository.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
	}
}
