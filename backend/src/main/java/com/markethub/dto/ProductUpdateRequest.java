package com.markethub.dto;

import com.markethub.model.ProductStatus;
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
