package com.sy.common.pagination;

import java.util.List;

/**
 * 分页器
 * User: Chandler
 * Date: 24/02/16
 */
public class Pagination<T> {

    private List<T> result; //对象记录结果集
    private List<T> footer; //对象记录合计结果集
    private int totalCount = 0; // 总记录数
    private int pageSize = 15; // 每页显示记录数
    private int totalPage = 1; // 总页数
    private int pageNum = 1; // 当前页

    public Pagination() {
        init(this.totalCount, this.pageSize, this.pageNum);
    }

    public Pagination(List<T> result) {
        this.result = result;
        init(this.totalCount, this.pageSize, this.pageNum);
    }

    public Pagination(List<T> result, List<T> footer, int totalCount) {
        this.result = result;
        this.footer = footer;
        this.totalCount = totalCount;
        init(this.totalCount, this.pageSize, this.pageNum);
    }

    public Pagination(List<T> result, int totalCount) {
        this.result = result;
        this.totalCount = totalCount;
        init(this.totalCount, this.pageSize, this.pageNum);
    }

    public Pagination(List<T> result, int totalCount, int pageSize) {
        this.result = result;
        this.totalCount = totalCount;
        this.pageSize = pageSize;
        init(this.totalCount, this.pageSize, this.pageNum);
    }

    private void init(int totalCount, int pageSize, int pageNum) {
        this.totalCount = totalCount;
        this.pageSize = pageSize;
        this.totalPage = (this.totalCount - 1) / this.pageSize + 1;

        if (pageNum < 1) {
            this.pageNum = 1;
        } else if (pageNum > this.totalPage) {
            this.pageNum = this.totalPage;
        } else {
            this.pageNum = pageNum;
        }
    }


    public List<T> getResult() {
        return result;
    }

    public void setResult(List<T> result) {
        this.result = result;
    }

    public List<T> getFooter() {
        return footer;
    }

    public void setFooter(List<T> footer) {
        this.footer = footer;
    }

    public int getTotalCount() {
        return totalCount;
    }

    public void setTotalCount(int totalCount) {
        this.totalCount = totalCount;
    }

    public int getPageSize() {
        return pageSize;
    }

    public void setPageSize(int pageSize) {
        this.pageSize = pageSize;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getPageNum() {
        return pageNum;
    }

    public void setPageNum(int pageNum) {
        this.pageNum = pageNum;
    }
}
