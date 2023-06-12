package com.example.demo.springBootBlog.repositories;

import com.example.demo.springBootBlog.entities.UserDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<UserDetail, Long> {

    Optional<UserDetail> findOneByEmailAndPassword(String email, String password);

    public boolean existsByEmail(String email);
    UserDetail findByEmail(String email);

    boolean existsByUserId(String userId);

}
