package com.java.api.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class PageDto<T> {

    private List<T> data;
    private int pageIndex;
    private int pageSize;
    private long totalElements;
    private long totalPages;
    private boolean last;
    private boolean first;

}