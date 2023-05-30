package com.example.demo.springBootBlog.services;

import com.example.demo.springBootBlog.entities.Directory;
import com.example.demo.springBootBlog.repositories.DirectoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class DirectoryService {
    @Autowired
    private DirectoryRepository directoryRepository;

    public List<Directory> getAllDirectory() {
        return directoryRepository.findAll();
    }

    public List<Directory> sortDirectoryByField(String field) {
        return directoryRepository.findAll(Sort.by(Sort.Direction.DESC, field));
    }

    public Page<Directory> directoryWithPagination(int offset, int pageSize) {
        return directoryRepository.findAll(PageRequest.of(offset, pageSize));
    }

    public void saveDirectory(Directory directory){
        directoryRepository.save(directory);
    }

    public void updateDirectory(Long dirId, Directory updatedDirectory) {
        Optional<Directory> optionalExistingDirectory = directoryRepository.findById(dirId);
        if (optionalExistingDirectory.isPresent()) {
            Directory existingDirectory = optionalExistingDirectory.get();

            existingDirectory.setName(updatedDirectory.getName());
            existingDirectory.setAge(updatedDirectory.getAge());
            existingDirectory.setCompany(updatedDirectory.getCompany());
            existingDirectory.setStartingDate(updatedDirectory.getStartingDate());
            existingDirectory.setIndustry(updatedDirectory.getIndustry());
            existingDirectory.setIdea(updatedDirectory.getIdea());
            existingDirectory.setEducation(updatedDirectory.getEducation());
            existingDirectory.setNumber(updatedDirectory.getNumber());
            existingDirectory.setModifiedDate(new Date());

            directoryRepository.save(existingDirectory);
        } else {
            throw new IllegalStateException("Blog with id : " + dirId + " does not exists !");
        }
    }
}
