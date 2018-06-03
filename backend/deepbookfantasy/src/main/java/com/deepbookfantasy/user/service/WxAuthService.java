package com.deepbookfantasy.user.service;

import com.alibaba.fastjson.JSON;
import com.deepbookfantasy.common.properties.WxAuth;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.deepbookfantasy.common.util.HttpRequest;

import java.util.Map;

/**
 * Created By HeartunderBlade on 2018/4/15
 */
@Service
public class WxAuthService {
    @Autowired
    private WxAuth wxAuth;

    @SuppressWarnings("unchecked")
    public Map<String,Object> getWxSession(String wxCode) {
        StringBuffer sb = new StringBuffer();
        sb.append("appid=").append(wxAuth.getAppId());
        sb.append("&secret=").append(wxAuth.getSecret());
        sb.append("&js_code=").append(wxCode);
        sb.append("&grant_type=").append(wxAuth.getGrantType());
        String res = HttpRequest.sendGetWithQuery(wxAuth.getSessionHost(), sb.toString());
        if (res == null || res.isEmpty()) {
            return null;
        }
        return JSON.parseObject(res, Map.class);
    }
}
