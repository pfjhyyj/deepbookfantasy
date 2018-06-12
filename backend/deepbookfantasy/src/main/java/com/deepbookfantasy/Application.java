package com.deepbookfantasy;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.MultipartConfigFactory;
import org.springframework.context.annotation.Bean;

import javax.servlet.MultipartConfigElement;

/**
 * Created By HeartunderBlade on 2018/4/15
 */
@SpringBootApplication
public class Application {
    @Value("${img.local.path}")
    private String imgLocalPath;

    public static void main(String[] args) {
        SpringApplication.run(Application.class, args);
    }

    @Bean
    MultipartConfigElement multipartConfigElement() {
        MultipartConfigFactory factory = new MultipartConfigFactory();
        factory.setLocation(imgLocalPath+"/tmp");
        return factory.createMultipartConfig();
    }

}
