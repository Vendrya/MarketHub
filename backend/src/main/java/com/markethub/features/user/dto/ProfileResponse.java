package com.markethub.features.user.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.markethub.features.user.models.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
@JsonInclude(JsonInclude.Include.NON_NULL)
public class ProfileResponse {
    private User profile;
    private boolean isOwner;
}
