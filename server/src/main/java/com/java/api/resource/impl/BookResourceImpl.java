package com.java.api.resource.impl;


import com.java.api.dto.PageDto;
import com.java.api.entity.Book;
import com.java.api.resource.Resource;
import com.java.api.service.IPageService;
import com.java.api.service.IService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Arrays;
import java.util.Set;
import java.util.TreeSet;

@RestController
@RequestMapping("/books")
public class BookResourceImpl implements Resource<Book> {
    @Autowired
    private IService<Book> bookService;

    @Autowired
    private IPageService<Book> bookPageService;

    @Override
    public ResponseEntity<Page<Book>> findAll(Pageable pageable, String searchText) {
        return new ResponseEntity<>(bookPageService.findAll(pageable, searchText), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<?> findAll(int pageNumber, int pageSize, String sortBy, String sortDir) {
        return new ResponseEntity<PageDto<Book>>(
                bookService.getAllWithPageCustom(pageNumber, pageSize, sortBy, sortDir),
                HttpStatus.OK
        );
    }

    @Override
    public ResponseEntity<Book> findById(Long id) {
        return new ResponseEntity<>(bookService.findById(id).get(), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<Book> save(Book book) {
        return new ResponseEntity<>(bookService.saveOrUpdate(book), HttpStatus.CREATED);
    }

    @Override
    public ResponseEntity<Book> update(Book book) {
        return new ResponseEntity<>(bookService.saveOrUpdate(book), HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> deleteById(Long id) {
        return new ResponseEntity<>(bookService.deleteById(id), HttpStatus.OK);
    }

    @GetMapping("/languages")
    public  ResponseEntity<Set<String>> findAllLanguages() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("French", "Portuguese", "English", "Russian", "Hindi", "Arabic", "Spanish", "Chinese")), HttpStatus.OK);
    }

    @GetMapping("/genres")
    public  ResponseEntity<Set<String>> findAllGenres() {
        return new ResponseEntity<>(new TreeSet<>(Arrays.asList("Technology", "Science", "History", "Fantasy", "Biography", "Horror", "Romance")), HttpStatus.OK);
    }
}
