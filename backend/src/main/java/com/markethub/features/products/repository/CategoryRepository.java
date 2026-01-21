package com.markethub.features.products.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.markethub.features.categories.models.Category;

import java.util.UUID;

public interface CategoryRepository extends JpaRepository<Category, UUID> {
}
