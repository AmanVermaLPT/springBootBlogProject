package com.example.demo.springBootBlog.repositories;

import com.example.demo.springBootBlog.entities.ViewData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ViewDataRepository extends JpaRepository<ViewData, Long> {
}
