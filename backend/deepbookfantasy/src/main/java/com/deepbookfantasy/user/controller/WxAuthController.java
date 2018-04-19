package com.deepbookfantasy.user.controller;

import com.deepbookfantasy.common.util.AES;
import com.deepbookfantasy.user.service.WxAuthService;
import io.swagger.annotations.ApiImplicitParam;
import io.swagger.annotations.ApiOperation;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpSession;
import java.util.Map;

import static com.deepbookfantasy.common.util.WxResponse.wxReply;

/**
 * Created By HeartunderBlade on 2018/4/15
 */
@RestController
public class WxAuthController {
    @Autowired
    private WxAuthService wxAuthService;

    @ApiOperation(value = "获取sessionId", notes = "小用户允许登录后，使用code 换取 session_key api，将 code 换成 openid 和 session_key")
    @ApiImplicitParam(name = "code", value = "用户登录回调内容会带上 ", required = true, dataType = "String")
    @RequestMapping("/auth/getSession")
    public Map<String,Object> cookie(@RequestParam(required = true,value = "code") String wxCode, HttpSession session) {
        System.out.println(wxCode);
        Map<String, Object> wxSessionMap = wxAuthService.getWxSession(wxCode);
        if (null == wxSessionMap) {
            return wxReply(50010, null);
        }
        System.out.println(wxSessionMap.toString());
        //获取异常
        if (wxSessionMap.containsKey("errcode")) {
            return wxReply(50020, null);
        }
        String wxOpenId = (String) wxSessionMap.get("openid");
        String wxSessionKey = (String) wxSessionMap.get("session_key");
        session.setAttribute("wx_openid", wxOpenId);
        session.setAttribute("wx_session_key", wxSessionKey);
        if (wxSessionMap.get("expires_in") != null) {
            Integer expires = Integer.valueOf(String.valueOf(wxSessionMap.get("expires_in")));
            session.setMaxInactiveInterval(expires);
        }
        return wxReply(0, null);
    }

    @RequestMapping(value = "/auth/decodeUserInfo", method = RequestMethod.GET, produces = "application/json")
    public Map<String,Object> decodeUserInfo(@RequestParam(required = true,value = "encryptedData")String encryptedData,
                                             @RequestParam(required = true,defaultValue = "iv")String iv,
                                             HttpSession session) throws Exception {
        Object wxSessionObj = session.getAttribute("session_key");
        if (null == wxSessionObj) {
            return wxReply(40008, null);
        }
        String sessionKey = (String)wxSessionObj;

        try {
            AES aes = new AES();
            byte[] resultByte = aes.decrypt(Base64.decodeBase64(encryptedData), Base64.decodeBase64(sessionKey), Base64.decodeBase64(iv));
            if(null != resultByte && resultByte.length > 0){
                String userInfo = new String(resultByte, "UTF-8");
                return wxReply(0, userInfo);
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
        return wxReply(50021, null);
    }
}
