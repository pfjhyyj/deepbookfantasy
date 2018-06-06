package com.deepbookfantasy.book.controller;

import com.deepbookfantasy.book.entity.Book;
import com.deepbookfantasy.book.service.BookService;
import com.deepbookfantasy.user.entity.User;
import com.deepbookfantasy.user.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpSession;
import java.util.Map;

import static com.deepbookfantasy.common.util.WxResponse.wxReply;

/**
 * Created By HeartunderBlade on 2018/6/1
 */
@RestController
public class BookController {
    @Autowired
    private BookService bookService;

    @Autowired
    private UserService userService;

    /**
     * 根据图书信息创建图书
     * @param reqMap 图书信息
     * @param session http session
     * @return 成功返回0，不返回详细信息
     */
    @RequestMapping(value = "/book", method = RequestMethod.POST, produces = "application/json")
    public Map<String, Object> addBook(@RequestBody Map<String, Object> reqMap, HttpSession session) {
        System.out.println(reqMap.get("name"));
        String wxOpenId = String.valueOf(session.getAttribute("wx_openid"));
        User user = userService.getUserByWxOpenId(wxOpenId);
        reqMap.put("user", user);
        bookService.addBook(reqMap);
        return wxReply(0, null);
    }

    /**
     * 根据图书id获取具体图书
     * @param bookid 图书id
     * @return 返回具体图书信息
     */
    @RequestMapping(value = "/book/{bookid}", method = RequestMethod.GET, produces = "application/json")
    public Map<String, Object> getBookById(@PathVariable String bookid) {
        Book result = null;
        result = bookService.getBookById(Long.valueOf(bookid));
        return wxReply(0, result);
    }

    /**
     * 更新图书信息
     * @param bookid 图书id
     * @param reqMap 图书信息
     * @param session http session
     * @return 成功返回0，不返回详细信息
     */
    @RequestMapping(value = "/book/{bookid}", method = RequestMethod.PUT, produces = "application/json")
    public Map<String, Object> updateBookById(@PathVariable String bookid, @RequestBody Map<String, Object> reqMap, HttpSession session) {
        String wxOpenId = String.valueOf(session.getAttribute("wx_openid"));
        User user = userService.getUserByWxOpenId(wxOpenId);
        Book result = bookService.getBookById(Long.valueOf(bookid));
        if (!result.getId().equals(user.getId())) {
            wxReply(403, "这是不属于你的图书");
        }
        reqMap.put("owner", user);
        reqMap.put("id", result.getId());
        bookService.updateBook(reqMap);
        return wxReply(0, null);
    }

    /**
     * 删除图书信息
     * @param bookid 图书id
     * @param session http session
     * @return 成功返回0，不返回详细信息
     */
    @RequestMapping(value = "/book/{bookid}", method = RequestMethod.DELETE, produces = "application/json")
    public Map<String, Object> deleteBookById(@PathVariable String bookid, HttpSession session) {
        String wxOpenId = String.valueOf(session.getAttribute("wx_openid"));
        User user = userService.getUserByWxOpenId(wxOpenId);
        Book result = bookService.getBookById(Long.valueOf(bookid));
        if (!result.getId().equals(user.getId())) {
            wxReply(403, "这是不属于你的图�?");
        }
        bookService.deleteBook(Long.valueOf(bookid));
        return wxReply(0, null);
    }

    /**
     * 根据名字进行模糊搜索
     * @param page 页码
     * @param size 页的大小
     * @param name 关键字
     * @return 图书的list
     */
    @RequestMapping(value = "/book/search", method = RequestMethod.GET, produces = "application/json")
    public Map<String, Object> searchBooksByName(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                                @RequestParam(value = "size", defaultValue = "20") Integer size,
                                                @RequestParam(value = "name") String name) {
        Sort sort = new Sort(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Book> books = bookService.getBooksByName(name, pageable);
        return wxReply(0, books.getContent());
    }

    /**
     * 分页获取所有图书
     * @param page 页码
     * @param size 页大小
     * @return 图书的list
     */
    @RequestMapping(value = "/book/all", method = RequestMethod.GET, produces = "application/json")
    public Map<String, Object> getAllBooks(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                           @RequestParam(value = "size", defaultValue = "20") Integer size) {
        Sort sort = new Sort(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Book> books = bookService.getAllBooks(pageable);
        return wxReply(0, books.getContent());
    }

    /**
     * 根据用户id获得此用户的图书
     * @param page 页码
     * @param size 页的大小
     * @return 图书的list
     */
    @RequestMapping(value = "/list", method = RequestMethod.GET, produces = "application/json")
    public Map<String, Object> getBooksByUser(@RequestParam(value = "page", defaultValue = "0") Integer page,
                                              @RequestParam(value = "size", defaultValue = "20") Integer size,
                                              HttpSession httpSession) {
        String openid = httpSession.getAttribute("wx_openid").toString();
        User user = userService.getUserByWxOpenId(openid);
        Sort sort = new Sort(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Book> books = bookService.getBookByUser(user, pageable);
        return wxReply(0, books.getContent());
    }
}
