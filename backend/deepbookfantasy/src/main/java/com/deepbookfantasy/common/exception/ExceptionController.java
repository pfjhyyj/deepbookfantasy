package com.deepbookfantasy.common.exception;

import org.springframework.dao.DataAccessException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.persistence.EntityNotFoundException;
import java.util.Map;

import static com.deepbookfantasy.common.util.WxResponse.wxReply;

/**
 * Created By HeartunderBlade on 2018/5/18
 */
@RestControllerAdvice
public class ExceptionController {
    @ExceptionHandler(EntityNotFoundException.class)
    public Map<String, Object> notFound(EntityNotFoundException e) {
        return wxReply(404, e.getMessage());
    }

    @ExceptionHandler(DataAccessException.class)
    public Map<String, Object> notFound(DataAccessException e) {
        return wxReply(403, "数据冲突");
    }
}
