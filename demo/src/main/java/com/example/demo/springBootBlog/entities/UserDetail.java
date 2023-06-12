package com.example.demo.springBootBlog.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.security.SecureRandom;
import java.util.*;

@Entity
@Table(name = "user_details")
@Getter
@Setter
@AllArgsConstructor
public class UserDetail  {

//    @Autowired
//    private UserRepository userRepository;

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

    public UserDetail() {
        generateUserId();
    }

    private void generateUserId(){
        String firstPart = "U";
        String randomNumber = generateRandomNumber(5);
        String lastPart = "I";
        userId = firstPart + randomNumber + lastPart;
//        boolean isUnique = false;

//        do {
//            randomNumber = generateRandomNumber(5);
//            userId = firstPart + randomNumber + lastPart;
//            isUnique = checkIfUserIdExists(userId);
//        } while (isUnique);
    }

    private String generateRandomNumber(int length){
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder(length);
        for (int i=0; i<length; i++){
            int randomDigit = random.nextInt(10);
            sb.append(randomDigit);
        }
        return sb.toString();
    }

//    private boolean checkIfUserIdExists(String userId) {
//        return userRepository.existsByUserId(userId);
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
