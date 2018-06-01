package com.deepbookfantasy.book.service;

import com.deepbookfantasy.book.dao.BookDAO;
import com.deepbookfantasy.book.entity.Book;
import com.deepbookfantasy.user.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityNotFoundException;
import java.util.Collection;
import java.util.List;
import java.util.Map;

/**
 * Created By HeartunderBlade on 2018/6/1
 */
@Service
@Transactional
public class BookService {
    @Autowired
    private BookDAO bookDAO;

    public Book getBookById(Long id) {
        return bookDAO.findById(id).orElseThrow(() ->  new EntityNotFoundException("未找到图书") );
    }

    public Page<Book> getBooksByName(String name, Pageable pageable) {
        return bookDAO.findByNameContaining(name, pageable);
    }

    public Page<Book> getBookByUser(User owner, Pageable pageable) {
        return bookDAO.findByUser(owner, pageable);
    }

    public void addBook(Map<String, Object> bookVO) {
        Book newBook = new Book(bookVO);
        bookDAO.save(newBook);
    }

    public void updateBook(Map<String, Object> bookVO) {
        Book newBook = new Book(bookVO);
        bookDAO.save(newBook);
    }

    public void deleteBook(Long id) {
        this.bookDAO.findById(id).ifPresent(book -> {
            bookDAO.delete(book);
        });
    }

}
