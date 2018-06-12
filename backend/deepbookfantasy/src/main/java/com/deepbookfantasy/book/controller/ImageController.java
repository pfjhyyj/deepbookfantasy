package com.deepbookfantasy.book.controller;

import com.google.common.collect.ImmutableMap;
import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;

import static com.deepbookfantasy.common.util.WxResponse.wxReply;

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

    /**
     * 处理图片上传
     *
     * @param image 图片文件
     * @return 成功返回图片路径
     */
    @RequestMapping(value = "/upload", method = RequestMethod.POST, produces = "application/json")
    public Map<String, Object> imageUpload(@RequestParam("image") MultipartFile image) {
        if (image == null) {
            wxReply(500, "Empty file");
        }
        // 给予所上传图片一个hash值作为文件名减少冲突
        String random = RandomStringUtils.randomAlphabetic(16);
        String fileName = random + ".jpg";
        try {
            String uploadDirName = imgLocalPath.substring(imgLocalPath.lastIndexOf("/"), imgLocalPath.length());
            FileCopyUtils.copy(image.getBytes(), new File(imgLocalPath + "/", fileName));
            return wxReply(0, ImmutableMap.of("image", imgHost + uploadDirName + "/" + fileName));
        } catch (IOException e) {
            e.printStackTrace();
        }
        return wxReply(500, "Server Error");
    }

}
