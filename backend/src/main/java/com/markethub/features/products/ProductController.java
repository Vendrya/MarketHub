package com.markethub.features.products;

import com.markethub.common.response.ApiResponse;
import com.markethub.common.response.ResponseBuilder;
import com.markethub.features.products.dto.ProductCreateRequest;
import com.markethub.features.products.dto.ProductDetailResponse;
import com.markethub.features.products.dto.ProductListResponse;
import com.markethub.features.products.dto.ProductUpdateRequest;
import jakarta.validation.Valid;
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
    public ResponseEntity<?> getAllProducts(@RequestParam(value = "category", required = false) String category) {
        if (category != null) {
            return ResponseBuilder.ok("Get products by category", productService.getProductsByCategory(category));
        }

        return ResponseBuilder.ok("Get all products", productService.getAllProducts());
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getProductById(@PathVariable("id") UUID id) {
        return ResponseBuilder.ok("Get a product", productService.getProductById(id));
    }

    @PostMapping()
    public ResponseEntity<?> createProduct(@Valid @RequestBody ProductCreateRequest request) {
        productService.createProduct(request);
        return ResponseBuilder.ok("Product created", request);
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@Valid @RequestBody ProductUpdateRequest request, @PathVariable("id") UUID id) {
        productService.updateProduct(request, id);
        return ResponseBuilder.ok("Product updated", request);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProduct(@PathVariable("id") UUID id) {
        productService.deleteProduct(id);
        return ResponseBuilder.ok("Product deleted", null);
    }

}