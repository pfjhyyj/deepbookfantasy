package com.deepbookfantasy.user.dao;

import com.deepbookfantasy.user.entity.User;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * Created By HeartunderBlade on 2018/4/16
 */
@Repository
public interface UserDAO extends PagingAndSortingRepository<User, Long> {
    Optional<User> findByWxOpenId(String wxOpenId);

    List<User> findByNameContaining(String name);
}
