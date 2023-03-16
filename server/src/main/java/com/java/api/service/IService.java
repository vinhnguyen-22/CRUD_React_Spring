package com.java.api.service;

import com.java.api.dto.PageDto;

import java.util.Collection;
import java.util.Optional;

public interface IService<T> {

    Collection<T> findAll();

    Optional<T> findById(Long id);

    T saveOrUpdate(T t);

    String deleteById(Long id);
    PageDto getAllWithPageCustom(int pageIndex, int pageSize, String sortBy, String sortDir);
    
}
