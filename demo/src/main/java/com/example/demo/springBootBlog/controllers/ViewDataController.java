package com.example.demo.springBootBlog.controllers;

import com.example.demo.springBootBlog.entities.ViewData;
import com.example.demo.springBootBlog.services.ViewDataService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
@RequiredArgsConstructor
@RestController
public class ViewDataController {

    @Autowired
    private ViewDataService viewDataService;

    @PostMapping("/api/saveViewData")
    public void saveViewData(@RequestBody ViewData viewData) {
        viewDataService.saveViewData(viewData);
    }

}
