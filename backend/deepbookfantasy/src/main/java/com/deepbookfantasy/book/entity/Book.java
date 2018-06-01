package com.deepbookfantasy.book.entity;

import com.deepbookfantasy.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.util.Date;
import java.util.Map;

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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    @OnDelete(action =  OnDeleteAction.CASCADE)
    private User user;

    public Book(Map<String, Object> bookVO) {
        this.name = String.valueOf(bookVO.get("name"));
        this.ISBN = String.valueOf(bookVO.get("ISBN"));
        this.description = String.valueOf(bookVO.get("description"));
        this.image = String.valueOf(bookVO.get("image"));
        this.start = new Date(Long.parseLong(String.valueOf(bookVO.get("start"))));
        this.end = new Date(Long.parseLong(String.valueOf(bookVO.get("end"))));
        this.enable = 0;
        this.type = Integer.parseInt(String.valueOf(bookVO.get("type")));
        this.user = (User)bookVO.get("user");
    }
}