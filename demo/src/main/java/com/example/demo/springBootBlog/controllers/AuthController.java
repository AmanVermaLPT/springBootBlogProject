package com.example.demo.springBootBlog.controllers;

import com.example.demo.springBootBlog.configuration.UserAuthProvider;
import com.example.demo.springBootBlog.dto.CredentialsDto;
import com.example.demo.springBootBlog.dto.SignUpDto;
import com.example.demo.springBootBlog.dto.UserDto;
import com.example.demo.springBootBlog.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.net.URI;

@RequiredArgsConstructor
@RestController
public class AuthController {

    private final UserService userService;
    private final UserAuthProvider userAuthProvider;

    @PostMapping("/login")
    public ResponseEntity<UserDto> login(@RequestBody CredentialsDto credentialsDto) {
        UserDto user = userService.login(credentialsDto);
        user.setToken(userAuthProvider.createToken(user.getUserName()));
        user.setRoles(getUserRole(user.getEmail()));
        return ResponseEntity.ok(user);
    }

    @PostMapping("/register")
    public ResponseEntity<UserDto> register(@RequestBody SignUpDto signUpDto) {
        UserDto user = userService.register(signUpDto);
        user.setToken(userAuthProvider.createToken(user.getUserName()));
        user.setRoles(getUserRole(user.getEmail()));
        return ResponseEntity.created(URI.create("/users/" + user.getId())).body(user);
    }

    private String getUserRole(String email) {
        return userService.getUserRole(email);
    }
}
