package com.markethub.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.lang.NonNull;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebMvcConfig implements WebMvcConfigurer {

    @Value("${application.cors.allowed-origins}")
    private String allowedOrigins;

    @Value("${application.cors.allowed-methods}")
    private String allowedMethods;

    @Value("${application.cors.allowed-headers}")
    private String allowedHeaders;

    @Value("${application.cors.allow-credentials}")
    private boolean allowCredentials;

    @Override
    public void addCorsMappings(@NonNull CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins)
                .allowedMethods(allowedMethods)
                .allowedHeaders(allowedHeaders)
                .allowCredentials(allowCredentials);
    }

}
