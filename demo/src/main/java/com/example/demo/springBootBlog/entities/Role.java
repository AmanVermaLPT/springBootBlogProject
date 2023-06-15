package com.example.demo.springBootBlog.entities;

import jakarta.persistence.*;

import java.util.List;

@Entity
public class Role {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long roleId;

    @ManyToMany(mappedBy = "roles")
    private List<UserDetail> users;

    private String roleName;

    public Long getRoleId() {
        return roleId;
    }

    public void setRoleId(Long roleId) {
        this.roleId = roleId;
    }

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
