package com.example.demo.springBootBlog.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Entity
@Table(name = "view_data")
@Getter
@Setter
public class ViewData {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @JsonIgnore
    private Long id;

    private String userId;

    private Long directoryId;

    private Long viewCount;

    private Date viewDate;
}
