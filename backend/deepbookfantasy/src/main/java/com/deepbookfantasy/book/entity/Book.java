package com.deepbookfantasy.book.entity;

import com.deepbookfantasy.user.entity.User;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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

    @Column(nullable = false)
    private String name;
    private String ISBN;
    private String description;
    private String image;

    @Column(nullable = false)
    private LocalDate start;

    @Column(nullable = false)
    private LocalDate end;

    @Column(nullable = false)
    private Integer enable;

    @Column(nullable = false)
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
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
        this.start = LocalDate.parse(String.valueOf(bookVO.get("start")), formatter);
        this.end = LocalDate.parse(String.valueOf(bookVO.get("end")), formatter);
        this.enable = 0;
        this.type = Integer.parseInt(String.valueOf(bookVO.get("type")));
        this.user = (User)bookVO.get("user");
    }
}
