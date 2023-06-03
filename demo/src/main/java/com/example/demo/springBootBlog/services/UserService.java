package com.example.demo.springBootBlog.services;

import com.example.demo.springBootBlog.entities.UserDetail;
import com.example.demo.springBootBlog.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public UserDetail createUser(UserDetail user) {
        return userRepository.save(user);
    }

    public boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }
}
