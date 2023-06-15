package com.example.demo.springBootBlog.mappers;

import com.example.demo.springBootBlog.dto.SignUpDto;
import com.example.demo.springBootBlog.dto.UserDto;
import com.example.demo.springBootBlog.entities.Role;
import com.example.demo.springBootBlog.entities.UserDetail;
import org.mapstruct.Mapping;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

import java.util.stream.Collectors;
import java.util.List;
@Mapper(componentModel = "spring")
public interface UserMapper {

    UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);
    UserDto toUserDto(UserDetail user);

    @Mapping(target = "password", ignore = true)
    @Mapping(target = "email", source = "signUpDto.email")
    @Mapping(target = "accountStatus", constant = "active")
    UserDetail signUpToUser(SignUpDto signUpDto);

    default String map(List<Role> roles) {
        return roles.stream()
                .map(Role::getRoleName)
                .collect(Collectors.joining(","));
    }
}
