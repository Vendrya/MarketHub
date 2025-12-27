package com.markethub.features.products.dto;

import com.markethub.features.products.models.ProductStatus;
import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.util.UUID;

@Data
@Builder
public class ProductListResponse {
    private UUID id;
    private String title;
    private String description;
    private BigDecimal price;
    private ProductStatus status;
    private UUID category_id;
}
