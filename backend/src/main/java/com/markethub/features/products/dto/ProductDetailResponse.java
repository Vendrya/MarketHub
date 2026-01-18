package com.markethub.features.products.dto;

import com.markethub.features.products.models.ProductStatus;
import com.markethub.features.tags.models.Tag;

import lombok.Builder;
import lombok.Data;
import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Data
@Builder
public class ProductDetailResponse {
    private UUID id;

    private UUID seller_id;

    private String title;
    private String description;
    private BigDecimal price;
    private List<Tag> tags;
    private ProductStatus status;
    private UUID category_id;
    private LocalDateTime created_at;
    private LocalDateTime updated_at;

    private List<String> exportCountries;
}
