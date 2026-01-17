package com.markethub.features.products.dto;

import org.hibernate.validator.constraints.UUID;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProductCreateRequest {
    @NotNull
    @NotEmpty
    private String title;

    @NotNull
    @NotEmpty
    private String description;

    @NotNull
    @DecimalMin(value = "1.00")
    private BigDecimal price;

    @NotEmpty
    @Size(min = 1)
    @Valid
    private List<String> tags;

    @UUID
    @NotNull
    @NotEmpty
    private String categoryId;
}
