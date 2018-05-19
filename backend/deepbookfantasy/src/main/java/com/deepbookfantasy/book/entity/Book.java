package com.deepbookfantasy.book.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;

/**
 * Created By HeartunderBlade on 2018/5/13
 */
@Entity
@Table(name = "book")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Book {
    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "book_generator", sequenceName = "book_sequence")
    @GeneratedValue(generator = "book_generator")
    private Long id;

    private String name;
    private String ISBN;
    private String description;
    private String image;
    private Date start;
    private Date end;
    private Integer enable;
    private Integer type;
    private Long ownerID;
}
