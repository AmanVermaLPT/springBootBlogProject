package com.example.demo.springBootBlog.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.*;
import java.util.stream.Collectors;

@Entity
@Table(name = "user_details")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserDetail  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String userId;
    private String userName;
    private String email;
    private String password;

    private String accountStatus;

    @ManyToMany(cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JoinTable(name = "user_role",
           joinColumns = @JoinColumn(name="userName", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "roleName", referencedColumnName = "roleId")
    )
    private List<Role> roles = new ArrayList<>();

    private void generateUserId(){
        String firstPart = "U";
        String randomNumber = generateRandomNumber(5);
        String lastPart = "I";
        userId = firstPart + randomNumber + lastPart;
    }

    private String generateRandomNumber(int length){
        StringBuilder sb = new StringBuilder(length);
        for (int i=0; i<length; i++){
            int randomDigit = (int) (Math.random()*10);
            sb.append(randomDigit);
        }
        return sb.toString();
    }

//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        List<SimpleGrantedAuthority> authorities=  this.roles.stream().map((role)->
//                new SimpleGrantedAuthority(role.getRoleName())).collect(Collectors.toList());
//        return authorities;
//    }

    @Override
    public String toString() {
        return "UserDetails{" +
                "id=" + id +
                ", userId='" + userId + '\'' +
                ", userName='" + userName + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                ", accountStatus='" + accountStatus + '\'' +
                '}';
    }
}
