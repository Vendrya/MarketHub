package com.markethub.features.user;

import java.util.UUID;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.markethub.common.response.ResponseBuilder;
import com.markethub.features.user.dto.ProfileResponse;
import com.markethub.features.user.models.User;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/api/profile")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/{id}")
    public ResponseEntity<?> getProfile(@AuthenticationPrincipal User profile, @PathVariable("id") UUID id) {
        ProfileResponse response = ProfileResponse.builder()
                .profile(userService.getUserById(id))
                .isOwner(profile.getId().equals(id))
                .build();

        return ResponseBuilder.ok("Get a profile", response);
    }
}
