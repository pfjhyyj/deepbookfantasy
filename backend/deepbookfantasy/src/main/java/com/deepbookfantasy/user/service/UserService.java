package com.deepbookfantasy.user.service;

import com.deepbookfantasy.user.dao.UserDAO;
import com.deepbookfantasy.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.List;
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

    public User getUserById(Long id) {
        return userDAO.findById(id).orElseThrow(() -> new EntityNotFoundException("未找到用户"));
    }

    public User getUserByWxOpenId(String wxOpenId) {
        return userDAO.findByWxOpenId(wxOpenId).orElseThrow(() -> new EntityNotFoundException("未找到用户"));
    }

    public List<User> getUsersByName(String name) {
        return userDAO.findByNameContaining(name);
    }

    public void addUser(Map<String, Object> userVO) {
        User newUser = new User(userVO);
        userDAO.save(newUser);
    }

    public void updateUser(Map<String, Object> userVO) {
        User newUser = getUserById(Long.valueOf(userVO.get("id").toString()));
        newUser.setDescription(userVO.get("description").toString());
        newUser.setEmail(userVO.get("email").toString());
        newUser.setGender(Integer.valueOf(userVO.get("gender").toString()));
        newUser.setName(userVO.get("name").toString());
        newUser.setWechatID(userVO.get("wechatID").toString());
        userDAO.save(newUser);
    }

    public void deleteUser(Long id, String wxOpenId) {
        this.userDAO.findById(id).ifPresent(user1 -> {
            if (!user1.getWxOpenId().equals(wxOpenId)) {
                throw new RuntimeException("非本人删除用户");
            }
            userDAO.delete(user1);
        });
    }

    public void validateUser(Long id) {
        Optional<User> user = this.userDAO.findById(id);
        user.orElseThrow(() -> new EntityNotFoundException("未找到用户"));
    }

}
