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

    private String wxOpenId;
    private String wxUnionId;

    private String name;

    public User(Map<String, String> userVO) {
        this.name = userVO.get("name");
    }


}
