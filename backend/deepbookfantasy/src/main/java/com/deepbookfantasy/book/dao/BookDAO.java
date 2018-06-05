package com.deepbookfantasy.book.dao;



import com.deepbookfantasy.book.entity.Book;
import com.deepbookfantasy.user.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Collection;
import java.util.List;

/**
 * Created By HeartunderBlade on 2018/5/14
 */
public interface BookDAO extends PagingAndSortingRepository<Book, Long> {
    Page<Book> findByNameContaining(String name, Pageable pageable);

    Page<Book> findByUser(User owner, Pageable pageable);



}
