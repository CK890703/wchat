package com.sy.util;


import com.sy.common.Constant.Constants;

import java.io.Serializable;

public class Paging implements Serializable{

	private static final long serialVersionUID = 6195443430620757064L;

	private Integer start;

	private Integer end;

	public Integer page_size;
	
	public Integer current_page;
	
	public Integer total_item;

	/**
	 * 默认的分页初始化数据
	 */
	public Paging(){
		this.page_size = Constants.SYS.PAGESIZE;
		this.current_page = 0;
		this.total_item = 0;
	}
	
	public Paging(Integer start, Integer end){
		if(start == null)
			start = 0;
		if(end == null)
			end = Constants.SYS.PAGESIZE;
		this.start = start;
		this.end = end;
		this.current_page = start / (end - start + 1);
		this.page_size = end - start + 1;
	}

	public Integer getStart() {
		return start;
	}

	public void setStart(Integer start) {
		this.start = start;
	}

	public Integer getEnd() {
		return end;
	}

	public void setEnd(Integer end) {
		this.end = end;
	}
	
	public Integer getPage_size() {
		if(start != null && end != null){
			page_size = end - start + 1;
		}
		return page_size;
	}

	public void setPage_size(Integer page_size) {
		this.page_size = page_size;
	}

	public Integer getCurrent_page() {
		if(start!=null && page_size != null){
			current_page = start / page_size;
		}
		return current_page;
	}

	public void setCurrent_page(Integer current_page) {
		this.current_page = current_page;
	}

	public Integer getTotal_item() {
		return total_item;
	}

	public void setTotal_item(Integer total_item) {
		this.total_item = total_item;
	}
}