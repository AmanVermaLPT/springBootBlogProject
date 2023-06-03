package com.example.demo.springBootBlog.controllers;

import com.example.demo.springBootBlog.entities.UserDetail;
import com.example.demo.springBootBlog.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@RestController
//@RequestMapping("/api/auth")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @GetMapping("/test")
    public String getTest(){
        return "AMan Verma";
    }

    @GetMapping("/userTest")
    public String getUserTest(){
        return "User Test";
    }

    @PostMapping("/registerNewUser")
    public ResponseEntity<String> registerNewUser(@RequestBody UserDetail user){
        try {
            boolean emailExists = userService.checkEmail(user.getEmail());
            if (emailExists){
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email already exists!");
            } else {
                user.setAccountStatus("Account Created");
                String password = user.getPassword();
                String EncodedPassword = passwordEncoder.encode(password);
                user.setPassword(EncodedPassword);
                UserDetail userDetail = userService.createUser(user);
                System.out.println(userDetail.toString());
                return ResponseEntity.status(HttpStatus.OK).body("User registered successfully!");
            }
        }
        catch (Exception e){
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to register user!");
        }
    }
}
