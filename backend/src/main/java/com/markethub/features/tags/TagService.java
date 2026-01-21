package com.markethub.features.tags;

import java.util.List;

import org.springframework.stereotype.Service;

import com.markethub.common.exceptions.ResourceNotFoundException;
import com.markethub.features.tags.models.Tag;
import com.markethub.features.tags.repository.TagRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TagService {
    private final TagRepository tagRepository;

    public List<Tag> getAllTags() {
        return tagRepository.findAll();
    }

    public Tag getTagById(String id) {
        return tagRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Tag " + id + " not found"));
    }

}
