package com.markethub.features.tags;

import java.util.List;

import org.springframework.stereotype.Service;

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

}
