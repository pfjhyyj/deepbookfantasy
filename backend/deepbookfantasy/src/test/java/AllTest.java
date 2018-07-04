import com.deepbookfantasy.Application;
import com.deepbookfantasy.book.entity.Book;
import com.deepbookfantasy.book.service.BookService;
import com.deepbookfantasy.user.entity.User;
import com.deepbookfantasy.user.service.UserService;
import org.junit.BeforeClass;
import org.junit.FixMethodOrder;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.junit.runners.MethodSorters;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.context.web.WebAppConfiguration;

import java.util.HashMap;
import java.util.Map;

/**
 * Created By HeartunderBlade on 2018/7/2
 */
@RunWith(SpringRunner.class)
@SpringBootTest(classes = Application.class)
@FixMethodOrder(MethodSorters.NAME_ASCENDING)
public class AllTest {
    @Autowired
    private UserService userService;

    @Autowired
    private BookService bookService;

    private static Map<String, Object> userVO = new HashMap<String, Object>();

    private static Map<String, Object> bookVO = new HashMap<String, Object>();

    @BeforeClass
    public static void init() {
        userVO.put ("description", "My description");
        userVO.put("email", "123@qq.com");
        userVO.put("gender", 1);
        userVO.put("name", "testUser");
        userVO.put("wechatID", "testid");
        userVO.put("wxOpenId", "oO47D5K6Cyr1aBbDoVTRkEetTeRB");

        bookVO.put("description", "Book description");
        bookVO.put("name", "newBook");
        bookVO.put("ISBN", "S225a4das");
        bookVO.put("start", "2018-08-01");
        bookVO.put("end", "2018-08-01");
        bookVO.put("image", "asdadsadsasd");
        bookVO.put("type", 0);
    }

    @Test
    public void test1AddUser() {
        userService.addUser(userVO);
    }

    @Test
    public void test2UpdateUser() {
        userVO.put("email", "321@qq.com");
        User old = userService.getUsersByName("testUser").get(0);
        userVO.put("id", old.getId());
        userService.updateUser(userVO);
    }

    @Test
    public void test3AddBook() {
        User old = userService.getUsersByName("testUser").get(0);
        bookVO.put("user", old);
        bookService.addBook(bookVO);
    }

    @Test
    public void test4UpdateBook() {
        bookVO.put("ISBN", "new ISBN");
        Sort sort = new Sort(Sort.Direction.DESC, "id");
        Pageable pageable = PageRequest.of(0, 20, sort);
        Book old = bookService.getBooksByName("newBook", pageable).getContent().get(0);
        bookVO.put("id", old.getId());
        bookService.updateBook(bookVO);
    }

    @Test
    public void test5DeleteBook() {
        bookService.deleteBook(Long.valueOf(bookVO.get("id").toString()));
    }


    @Test
    public void test6DeleteUser() {
        User old = userService.getUsersByName("testUser").get(0);
        userService.deleteUser(old.getId(), userVO.get("wxOpenId").toString());
    }

}
