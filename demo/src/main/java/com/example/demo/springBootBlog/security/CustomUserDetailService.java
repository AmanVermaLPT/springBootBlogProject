package com.example.demo.springBootBlog.security;

import com.example.demo.springBootBlog.entities.Role;
import com.example.demo.springBootBlog.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import com.example.demo.springBootBlog.entities.UserDetail;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetail user = userRepository.findByEmail(username);
        if(user!=null){
        return  new org.springframework.security.core.userdetails.User(user.getEmail(),
                user.getPassword(),
                mapRolesToAuthorities(user.getRoles()));
    }
        else {
        throw new UsernameNotFoundException("Invalid username or password");
    }
    }

    private Collection< ? extends GrantedAuthority> mapRolesToAuthorities(Collection<Role> roles){
        Collection< ? extends GrantedAuthority> mapRoles=roles.stream()
                .map(role->new SimpleGrantedAuthority(role.getRoleName()))
                .collect(Collectors.toList());

        return mapRoles;
    }
}
