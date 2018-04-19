package com.deepbookfantasy.user.service;

import com.deepbookfantasy.user.dao.UserDAO;
import com.deepbookfantasy.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

import java.util.Map;
import java.util.Optional;

/**
 * Created By HeartunderBlade on 2018/4/16
 */
@Service
@Transactional
public class UserService {
    @Autowired
    private UserDAO userDAO;

    public User getUserById(Long id) throws Exception {
        Assert.notNull(id, "ID can't be null");
        Optional<User> user = this.userDAO.findById(id);
        if (!user.isPresent()) {
            throw new Exception("用户不存在");
        }
        return user.get();
    }

    public void addUser(Map<String, String> userVO) {
        // TODO: check user detail
        User newUser = new User(userVO);
        userDAO.save(newUser);
    }

    public void updateUser(Map<String, String> userVO) throws Exception {
        User newUser = new User(userVO);
        Optional<User> user = this.userDAO.findById(Long.parseLong(userVO.get("id")));
        if (!user.isPresent()) {
            throw new Exception("用户不存在");
        }
        userDAO.save(newUser);
    }
}
