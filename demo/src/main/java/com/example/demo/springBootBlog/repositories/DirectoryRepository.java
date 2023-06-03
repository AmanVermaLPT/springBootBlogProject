package com.example.demo.springBootBlog.repositories;

import com.example.demo.springBootBlog.entities.Directory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DirectoryRepository extends JpaRepository<Directory, Long> {
    boolean existsByNameAndCompany(String name, String company);
}
