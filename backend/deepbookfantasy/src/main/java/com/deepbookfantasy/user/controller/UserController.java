package com.deepbookfantasy.user.controller;

import com.deepbookfantasy.user.entity.User;
import com.deepbookfantasy.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Map;

import static com.deepbookfantasy.common.util.WxResponse.wxReply;

/**
 * Created By HeartunderBlade on 2018/5/17
 */
@RestController
public class UserController {
    @Autowired
    private UserService userService;

    /**
     * 创建新的用户
     * @param reqMap Map<String, String> 用户对象
     * @param session http session
     * @return 操作消息内容
     */
    @RequestMapping(value="/user", method = RequestMethod.POST, produces = "application/json")
    public Map<String, Object> createUser(@RequestBody Map<String,Object> reqMap, HttpSession session) {
        String wxOpenId = String.valueOf(session.getAttribute("wx_openid"));
        reqMap.put("wxOpenId", wxOpenId);
        userService.addUser(reqMap);
        User newUser = null;
        newUser = userService.getUserByWxOpenId(wxOpenId);
        return wxReply(0,newUser);
    }

    /**
     * 根据用户id获取用户信息
     * @param userid 用户id
     * @return 操作消息内容
     */
    @RequestMapping(value="/user/{userid}", method = RequestMethod.GET, produces = "application/json")
    public Map<String, Object> getUser(@PathVariable String userid) {
        User result = null;
        result = userService.getUserById(Long.valueOf(userid));
        return wxReply(0, result);
    }

    /**
     * 更新用户信息
     * @param userid 用户id
     * @param reqMap Map<String, String> 用户对象
     * @param session http session
     * @return 操作消息内容
     */
    @RequestMapping(value="/user/{userid}", method = RequestMethod.PUT, produces = "application/json")
    public Map<String, Object> updateUser(@PathVariable String userid, @RequestBody Map<String,Object> reqMap, HttpSession session) {
        userService.validateUser(Long.valueOf(userid));
        reqMap.put("wxOpenId", String.valueOf(session.getAttribute("wx_openid")));
        reqMap.put("id", userid);
        userService.updateUser(reqMap);
        return wxReply(0, userService.getUserById(Long.valueOf(userid)));
    }

    /**
     * 删除该用户
     * @param userid 用户id
     * @param session http session
     * @return 操作消息内容
     */
    @RequestMapping(value="/user/{userid}", method = RequestMethod.DELETE, produces = "application/json")
    public Map<String, Object> deleteUser(@PathVariable String userid, HttpSession session) {
        userService.deleteUser(Long.valueOf(userid), String.valueOf(session.getAttribute("wx_openid")));
        return wxReply(0, "success");
    }

}
