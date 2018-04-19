package com.deepbookfantasy.common.util;

import com.google.common.collect.ImmutableMap;

import java.util.Map;

/**
 * Created By HeartunderBlade on 2018/4/15
 */
public class WxResponse {
    public static Map<String, Object> wxReply(Integer code, Object data) {
        if (code == 0) {
            return ImmutableMap.<String, Object>builder()
                    .put("errorCode",  code)
                    .put("data", (data == null)? new Object() : data)
                    .build();
        } else {
            // TODO: Add Error Message
            return ImmutableMap.of("errorCode", code, "msg", "Error Message");
        }
    }
}
