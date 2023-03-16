package com.java.api.service;

import com.java.api.dto.PageDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface IPageService<T> {
    Page<T> findAll(Pageable pageable, String searchText);

    Page<T> findAll(Pageable pageable);
    PageDto getAllWithPageCustom(int pageIndex, int pageSize, String sortBy, String sortDir);
}
