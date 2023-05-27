package com.example.demo.springBootBlog.controllers;

import com.example.demo.springBootBlog.entities.Blog;
import com.example.demo.springBootBlog.entities.Directory;
import com.example.demo.springBootBlog.services.DirectoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api/dir")
public class DirectoryController {

    @Autowired
    private DirectoryService directoryService;

    @GetMapping("/")
    public String name(){
        return "verma";
    }

    @GetMapping("/get")
    public List<Directory> allDirectory(){
        return directoryService.getAllDirectory();
    }

    @GetMapping("/getWithPagination")
    public Page<Directory> getDirectoryWithPagination(@RequestParam("offset") int offset,
                                             @RequestParam("pageSize") int pageSize){
        return directoryService.directoryWithPagination(offset, pageSize);
    }

    @PostMapping("/create")
    public void createDir(@RequestBody Directory directory){
        try{
            directory.setCreatedDate(new Date());
            directoryService.saveDirectory(directory);
            System.out.println(directory.toString());
        }
        catch (Exception e){
            e.printStackTrace();
        }
    }

    @PutMapping("/update/{dirId}")
    public void updateDirectory(@PathVariable("dirId") Long dirId, @RequestBody Directory updatedDirectory) {
        directoryService.updateDirectory(dirId, updatedDirectory);
    }
}
