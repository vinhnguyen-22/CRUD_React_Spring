package com.java.api.service.impl;

import com.java.api.dto.PageDto;
import com.java.api.entity.Book;
import com.java.api.repository.BookRepository;
import com.java.api.service.IPageService;
import com.java.api.service.IService;
import org.codehaus.jettison.json.JSONException;
import org.codehaus.jettison.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.Collection;
import java.util.List;
import java.util.Optional;


@Service
public class BookServiceImlp implements IService<Book>, IPageService<Book> {
    @Autowired
    private BookRepository bookRepository;

    @Override
    public Collection<Book> findAll() {
        return (Collection<Book>) bookRepository.findAll();
    }

    @Override
    public Page<Book> findAll(Pageable pageable, String searchText) {
        return bookRepository.findAllBooks(pageable, searchText);
    }

    @Override
    public Page<Book> findAll(Pageable pageable) {
        return bookRepository.findAll(pageable);
    }

    @Override
    public PageDto getAllWithPageCustom(int pageNumber, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        // create Pageable instance
        Pageable pageable = PageRequest.of(pageNumber, pageSize, sort);

        Page<Book> posts = bookRepository.findAll(pageable);

        // get content for page object
        List<Book> listOfPosts = posts.getContent();


        PageDto postResponse = new PageDto<>();
        postResponse.setData(listOfPosts);
        postResponse.setPageIndex(posts.getNumber());
        postResponse.setPageSize(posts.getSize());
        postResponse.setTotalElements(posts.getTotalElements());
        postResponse.setTotalPages(posts.getTotalPages());
        postResponse.setLast(posts.isLast());

        return postResponse;
    }

    @Override
    public Optional<Book> findById(Long id) {
        return bookRepository.findById(id);
    }

    @Override
    public Book saveOrUpdate(Book book) {
        return bookRepository.save(book);
    }

    @Override
    public String deleteById(Long id) {
        JSONObject jsonObject = new JSONObject();
        try {
            bookRepository.deleteById(id);
            jsonObject.put("message", "Book deleted successfully");
        } catch (JSONException e) {
            e.printStackTrace();
        }
        return jsonObject.toString();
    }
}
