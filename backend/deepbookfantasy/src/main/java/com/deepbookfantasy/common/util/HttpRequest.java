package com.deepbookfantasy.common.util;

import com.google.common.collect.ImmutableMap;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

/**
 * Created By HeartunderBlade on 2018/4/15
 */
public class HttpRequest {
    @SuppressWarnings("unchecked")
    public static String sendGetWithQuery(String url, String query) {
        RestTemplate restTemplate = new RestTemplate();
        String result;
        String destination = url + "?" + query;
        try {
            result = restTemplate.getForObject(destination, String.class);
        } catch (HttpStatusCodeException exception) {
            int statusCode = exception.getStatusCode().value();
            // output to log4j
            return null;
        }
        return result;
    }
}
