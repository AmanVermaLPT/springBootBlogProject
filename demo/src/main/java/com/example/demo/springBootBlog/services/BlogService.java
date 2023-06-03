package com.example.demo.springBootBlog.services;

import com.example.demo.springBootBlog.entities.Blog;
import com.example.demo.springBootBlog.repositories.BlogRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.Optional;

@Service
public class BlogService {
    @Autowired
    private BlogRepository blogRepository;

    public List<Blog> getAllBlogs(){
        return blogRepository.findAll();
    }

    public List<Blog> sortBlogsByField(String field){
        return blogRepository.findAll(Sort.by(Sort.Direction.DESC, field));
    }

    public Page<Blog> BlogsWithPagination(int offset, int pageSize){
        return blogRepository.findAll(PageRequest.of(offset, pageSize));
    }

    public Page<Blog> BlogsWithPaginationAndSorting(int offset, int pageSize, String field){
        return blogRepository.findAll(PageRequest.of(offset, pageSize).withSort(Sort.Direction.DESC, field));
    }

    public void saveBlog(Blog blog){
        blogRepository.save(blog);
    }

    public void deleteBlog(Long blogId) {
        boolean blogExist = blogRepository.existsById(blogId);
        if (!blogExist){
            throw new IllegalStateException("Blog with id : " + blogId + " does not exists !");
        }
        blogRepository.deleteById(blogId);
    }

    public Blog updateBlog(Long blogId, Blog updatedBlog){
        Optional<Blog> optionalExistingBlog = blogRepository.findById(blogId);
        if (optionalExistingBlog.isPresent()){
            Blog existBlog = optionalExistingBlog.get();

            existBlog.setTitle(updatedBlog.getTitle());
            existBlog.setBody(updatedBlog.getBody());
            existBlog.setAuthor(updatedBlog.getAuthor());
            existBlog.setTags(updatedBlog.getTags());
            existBlog.setModifiedDate(new Date());
            return blogRepository.save(updatedBlog);
        } else {
            throw new IllegalStateException("Blog with id : " + blogId + " does not exists !");
        }
    }

}
