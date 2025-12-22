package com.markethub.service;

import com.markethub.dto.ProductDetailResponse;
import com.markethub.dto.ProductListResponse;
import com.markethub.model.Product;
import com.markethub.model.ProductExportCountry;
import com.markethub.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    public List<ProductListResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::mapToListResponse)
                .collect(Collectors.toList());
    }

    public ProductDetailResponse getProductById(UUID id) {
        Product product = productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        return mapToDetailResponse(product);
    }

    public List<ProductListResponse> getProductsByCategory(String categoryName) {
        return productRepository.findByCategory(categoryName).stream().map(this::mapToListResponse).toList();
    }

    private ProductListResponse mapToListResponse(Product product) {
        return ProductListResponse.builder()
                .id(product.getId())
                .title(product.getTitle())
                .description(product.getDescription())
                .price(product.getPrice())
                .status(product.getStatus())
                .category_id(product.getCategory().getId())
                .build();
    }

    private ProductDetailResponse mapToDetailResponse(Product product) {
        List<String> countries = product.getExportCountries().stream()
                .map(ProductExportCountry::getCountryCode)
                .collect(Collectors.toList());

        return ProductDetailResponse.builder()
                .id(product.getId())
                .seller_id(product.getSeller().getId())
                .title(product.getTitle())
                .description(product.getDescription())
                .price(product.getPrice())
                .status(product.getStatus())
                .category_id(product.getCategory().getId())
                .created_at(product.getCreatedAt())
                .updated_at(product.getUpdatedAt())
                .exportCountries(countries)
                .build();
    }
}