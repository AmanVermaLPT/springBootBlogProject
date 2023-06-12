package com.example.demo.springBootBlog.dto;

import lombok.*;

@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class UserDto {

    private Long id;
    private String userId;
    private String userName;
    private String email;
    private String roles;
    private String token;
}
