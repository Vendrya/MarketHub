package com.markethub.features.products.dto;

import com.markethub.features.products.models.ProductStatus;

import jakarta.validation.constraints.NotNull;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
public class ProductUpdateRequest extends ProductCreateRequest {
    @NotNull(message = "Product status is required")
    private ProductStatus productStatus;
}
