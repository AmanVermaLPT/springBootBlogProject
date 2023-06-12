package com.example.demo.springBootBlog.services;

import com.example.demo.springBootBlog.entities.ViewData;
import com.example.demo.springBootBlog.repositories.ViewDataRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ViewDataService {
    @Autowired
    private ViewDataRepository viewDataRepository;

    public void saveViewData(ViewData viewData) {
        viewDataRepository.save(viewData);
    }
}
