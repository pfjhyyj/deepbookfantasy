package com.deepbookfantasy.user.entity;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Map;

/**
 * Created By HeartunderBlade on 2018/4/15
 */
@Entity
@Table(name = "user")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User implements Serializable {
    private static final long serialVersionUID = 1L;

    @Id
    @SequenceGenerator(name = "user_generator", sequenceName = "user_sequence")
    @GeneratedValue(generator = "user_generator")
    private Long id;

    @Column(unique = true)
    private String wxOpenId;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private Integer gender;

    private String description;

    private String email;

    private String wechatID;

    @Column(nullable = false)
    private Integer enable;

    public User(Map<String, Object> userVO) {
        this.name = userVO.get("name").toString();
        this.wxOpenId = userVO.get("wxOpenId").toString();
        this.gender = Integer.valueOf(userVO.get("gender").toString());
        this.description = userVO.get("description").toString();
        this.email = userVO.get("email").toString();
        this.wechatID = userVO.get("wechatID").toString();
        this.enable = 0;
    }


}
