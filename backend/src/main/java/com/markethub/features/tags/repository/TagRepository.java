package com.markethub.features.tags.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.markethub.features.tags.models.Tag;

public interface TagRepository extends JpaRepository<Tag, String> {
}
