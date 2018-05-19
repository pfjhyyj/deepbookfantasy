package com.deepbookfantasy.book.controller;

import java.io.File;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import com.google.common.collect.ImmutableMap;

import static com.deepbookfantasy.common.util.WxResponse.wxReply;

import java.io.IOException;
import java.util.Map;

/**
 * Created By HeartunderBlade on 2018/5/14
 */
@RestController
public class ImageController {
    //文件存储路径
    @Value("${img.local.path}")
    private String imgLocalPath;
    //文件网络访问路径
    @Value("${img.host}")
    private String imgHost;

    @RequestMapping(value="/upload", method = RequestMethod.GET, produces = "application/json")
    public Map<String,Object> imageUpload(@RequestParam("image") MultipartFile image) {
        if (image == null) {
            wxReply(40010, null);
        }
        String random = RandomStringUtils.randomAlphabetic(16);
        String fileName = random + ".jpg";
        try {
            String uploadDirName = imgLocalPath.substring(imgLocalPath.lastIndexOf("/"), imgLocalPath.length());
            FileCopyUtils.copy(image.getBytes(), new File(imgLocalPath + "/", fileName));
            return wxReply(0, ImmutableMap.of("url", imgHost + uploadDirName + "/" + fileName));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return wxReply(40011, null);
    }
}
