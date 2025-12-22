package com.markethub.controller;

import com.markethub.dto.ProductCreateRequest;
import com.markethub.dto.ProductDetailResponse;
import com.markethub.dto.ProductListResponse;
import com.markethub.dto.ProductUpdateRequest;
import com.markethub.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductListResponse>> getAllProducts(@RequestParam(value = "category", required = false) String category) {
        if (category != null) {
            return ResponseEntity.ok(productService.getProductsByCategory(category));
        }

        return ResponseEntity.ok(productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<ProductDetailResponse> getProductById(@PathVariable("id") UUID id) {
        return ResponseEntity.ok(productService.getProductById(id));
    }

    @PostMapping()
    public ResponseEntity<?> createProduct(@RequestBody ProductCreateRequest request) {
        productService.createProduct(request);
        return ResponseEntity.ok(request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@RequestBody ProductUpdateRequest request, @PathVariable("id") UUID id) {
        productService.updateProduct(request, id);
        return ResponseEntity.ok(request);
    }
}