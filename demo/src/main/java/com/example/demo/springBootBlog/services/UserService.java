package com.example.demo.springBootBlog.services;

import com.example.demo.springBootBlog.dto.CredentialsDto;
import com.example.demo.springBootBlog.dto.SignUpDto;
import com.example.demo.springBootBlog.dto.UserDto;
import com.example.demo.springBootBlog.entities.Role;
import com.example.demo.springBootBlog.entities.UserDetail;
import com.example.demo.springBootBlog.exception.AppException;
import com.example.demo.springBootBlog.mappers.UserMapper;
import com.example.demo.springBootBlog.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.nio.CharBuffer;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private UserMapper userMapper;

    public UserService(UserRepository userRepository, PasswordEncoder passwordEncoder, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
    }

    public UserDto login(CredentialsDto credentialsDto) {
        UserDetail user = userRepository.findByEmail(credentialsDto.getEmail());
        if (user == null){
            throw new AppException("Unknown user", HttpStatus.NOT_FOUND);
        }

        if (passwordEncoder.matches(CharBuffer.wrap(credentialsDto.getPassword()), user.getPassword())) {
            return userMapper.toUserDto(user);
        }
        throw new AppException("Invalid password", HttpStatus.BAD_REQUEST);
    }

    public UserDto register(SignUpDto userDto) {
        UserDetail user = userRepository.findByEmail(userDto.getEmail());

        if (user != null){
            throw new AppException("Login already exists", HttpStatus.BAD_REQUEST);
        }

        UserDetail user1 = userMapper.signUpToUser(userDto);
        user1.setPassword(passwordEncoder.encode(CharBuffer.wrap(userDto.getPassword())));

        UserDetail savedUser = userRepository.save(user1);

        return userMapper.toUserDto(savedUser);
    }

    public UserDto findByLogin(String email) {
        UserDetail user = userRepository.findByEmail(email);
        if (user == null){
            throw new AppException("Unknown user", HttpStatus.NOT_FOUND);
        }
        return userMapper.toUserDto(user);
    }

    public String getUserRole(String email) {
        UserDetail user = userRepository.findByEmail(email);
        if (user == null) {
            throw new AppException("Unknown user", HttpStatus.NOT_FOUND);
        }
        return user.getRoles().stream()
                .map( Role::getRoleName)
                .collect(Collectors.joining(","));
    }
}
