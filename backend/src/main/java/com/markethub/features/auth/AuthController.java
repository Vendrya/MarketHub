package com.markethub.features.auth;

import com.markethub.features.auth.dto.AuthResponse;
import com.markethub.features.auth.dto.LoginRequest;
import com.markethub.features.auth.dto.RegisterRequest;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    private final AuthService authService;

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(
            @Valid @RequestBody RegisterRequest request,
            HttpServletResponse response
    ) {
        AuthResponse authResponse = authService.register(request);
        authService.setTokenCookies(response, authResponse.getAccessToken(), authResponse.getRefreshToken());

        authResponse.setAccessToken(null);
        authResponse.setRefreshToken(null);

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(
            @Valid @RequestBody LoginRequest request,
            HttpServletResponse response
    ) {
        AuthResponse authResponse = authService.login(request);
        authService.setTokenCookies(response, authResponse.getAccessToken(), authResponse.getRefreshToken());

        authResponse.setAccessToken(null);
        authResponse.setRefreshToken(null);

        return ResponseEntity.ok(authResponse);
    }

    @PostMapping("/refresh")
    public ResponseEntity<AuthResponse> refresh(HttpServletRequest request, HttpServletResponse response) {
        String refreshToken = null;

        if (request.getCookies() != null) {
            for (Cookie cookie : request.getCookies()) {
                if ("refresh_token".equals(cookie.getName())) {
                    refreshToken = cookie.getValue();
                    break;
                }
            }
        }

        if (refreshToken == null) {
            return ResponseEntity.badRequest().build();
        }

        AuthResponse authResponse = authService.refreshToken(refreshToken);

        authService.setTokenCookies(response, authResponse.getAccessToken(), authResponse.getRefreshToken());

        authResponse.setAccessToken(null);
        authResponse.setRefreshToken(null);

        return ResponseEntity.ok(authResponse);
    }


}