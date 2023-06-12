package com.example.demo.springBootBlog.mappers;

import com.example.demo.springBootBlog.dto.SignUpDto;
import com.example.demo.springBootBlog.dto.UserDto;
import com.example.demo.springBootBlog.entities.UserDetail;
import org.mapstruct.Mapping;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface UserMapper {

    UserDto toUserDto(UserDetail user);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "email", source = "signUpDto.email")
    @Mapping(target = "accountStatus", constant = "active")
    UserDetail signUpToUser(SignUpDto signUpDto);
}
