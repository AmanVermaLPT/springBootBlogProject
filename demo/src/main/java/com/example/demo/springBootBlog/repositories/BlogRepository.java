package com.example.demo.springBootBlog.repositories;

import com.example.demo.springBootBlog.entities.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long>{
}
