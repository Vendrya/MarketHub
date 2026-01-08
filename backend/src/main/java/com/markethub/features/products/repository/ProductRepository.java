package com.markethub.features.products.repository;

import com.markethub.features.products.models.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.UUID;

public interface ProductRepository extends JpaRepository<Product, UUID> {
    @Query("select p from Product p where p.category.name = ?1")
    List<Product> findByCategory(String categoryName);
}
