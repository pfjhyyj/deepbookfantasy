package com.deepbookfantasy.book.dao;



import com.deepbookfantasy.book.entity.Book;
import org.springframework.data.repository.PagingAndSortingRepository;
/**
 * Created By HeartunderBlade on 2018/5/14
 */
public interface BookDAO extends PagingAndSortingRepository<Book, Long> {
}
