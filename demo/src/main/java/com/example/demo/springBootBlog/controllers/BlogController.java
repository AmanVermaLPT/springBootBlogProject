package com.example.demo.springBootBlog.controllers;

import com.example.demo.springBootBlog.entities.Blog;
import com.example.demo.springBootBlog.services.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;
import java.util.Date;

import java.util.List;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping(value = "/")
    public String name(){
        return "Aman";
    }


    @GetMapping("/get")
    public List<Blog> allBlogs(){
        return blogService.getAllBlogs();
    }

    @GetMapping("/getWithSort")
    public List<Blog> allBlogsWithSort(@RequestParam("field") String field){
        return blogService.sortBlogsByField(field);
    }

    @GetMapping("/getWithPagination")
    public Page<Blog> getBlogsWithPagination(@RequestParam("offset") int offset,
                                             @RequestParam("pageSize") int pageSize){
        return blogService.BlogsWithPagination(offset, pageSize);
    }

    @GetMapping("/getWithPaginationAndSort")
    public Page<Blog> getBlogsWithPaginationAndSorting(@RequestParam("offset") int offset,
                                                       @RequestParam("pageSize") int pageSize,
                                                       @RequestParam("field") String field){
        return blogService.BlogsWithPaginationAndSorting(offset, pageSize, field);
    }

    @PostMapping("/create")
    public void createBlog(@RequestBody Blog blog){
        try {
            blog.setCreatedDate(new Date());
            blog.setModifiedDate(new Date());
            blogService.saveBlog(blog);
            System.out.println(blog.toString());
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    @PutMapping("update/{blogId}")
    public void updateBlog(@PathVariable("blogId") Long blogId, @RequestBody Blog updatedBlog){
        blogService.updateBlog(blogId, updatedBlog);
    }

    @DeleteMapping(path = "{blogId}")
    public void deleteBlog(@PathVariable("blogId") Long blogId){
        blogService.deleteBlog(blogId);
    }

}
