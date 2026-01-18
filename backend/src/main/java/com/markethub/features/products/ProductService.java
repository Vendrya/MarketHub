package com.markethub.features.products;

import com.markethub.features.categories.models.Category;
import com.markethub.features.products.dto.ProductCreateRequest;
import com.markethub.features.products.dto.ProductDetailResponse;
import com.markethub.features.products.dto.ProductListResponse;
import com.markethub.features.products.dto.ProductUpdateRequest;
import com.markethub.features.products.models.Product;
import com.markethub.features.products.models.ProductExportCountry;
import com.markethub.features.products.models.ProductStatus;
import com.markethub.features.products.repository.ProductRepository;
import com.markethub.features.tags.TagService;
import com.markethub.features.tags.models.Tag;
import com.markethub.features.user.models.User;
import com.markethub.features.products.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;
    private final TagService tagService;

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

    public void createProduct(ProductCreateRequest request) {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Category category = categoryRepository.findById(UUID.fromString(request.getCategoryId())).orElseThrow();

        List<Tag> tags = request.getTags().stream().map(tagName -> tagService.getTagById(tagName)).toList();

        Product newProduct = Product.builder()
                .seller((User) principal)
                .title(request.getTitle())
                .description(request.getDescription())
                .tags(tags)
                .price(request.getPrice())
                .status(ProductStatus.ACTIVE)
                .category(category)
                .build();

        productRepository.save(newProduct);
    }

    public void updateProduct(ProductUpdateRequest request, UUID id) {
        User principal = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        Category category = categoryRepository.findById(UUID.fromString(request.getCategoryId())).orElseThrow();

        Product product = productRepository.findById(id).orElseThrow();
        if (!principal.getId().equals(product.getSeller().getId()))
            throw new RuntimeException("You do not own the product.");

        product.setTitle(request.getTitle());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        product.setStatus(request.getProductStatus());
        product.setCategory(category);

        productRepository.save(product);
    }

    public void deleteProduct(UUID id) {
        Product product = productRepository.findById(id).orElseThrow();
        productRepository.delete(product);
    }

    private ProductListResponse mapToListResponse(Product product) {
        return ProductListResponse.builder()
                .id(product.getId())
                .title(product.getTitle())
                .description(product.getDescription())
                .tags(product.getTags())
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
                .tags(product.getTags())
                .status(product.getStatus())
                .category_id(product.getCategory().getId())
                .created_at(product.getCreatedAt())
                .updated_at(product.getUpdatedAt())
                .exportCountries(countries)
                .build();
    }
}