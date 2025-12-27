package com.markethub.features.products.dto;

import com.markethub.features.products.models.ProductStatus;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@EqualsAndHashCode(callSuper = true)
@Data
public class ProductUpdateRequest extends ProductCreateRequest {
    @NotNull
    @NotBlank
    private ProductStatus productStatus;
}
