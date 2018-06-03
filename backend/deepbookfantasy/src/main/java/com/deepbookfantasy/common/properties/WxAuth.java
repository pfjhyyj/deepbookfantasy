package com.deepbookfantasy.common.properties;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

/**
 * Created By HeartunderBlade on 2018/4/15
 */
@Component
@ConfigurationProperties(prefix = "wxapp")
@Data
public class WxAuth {
    private String appId;

    private String secret;

    private String grantType;

    private String sessionHost;
}
