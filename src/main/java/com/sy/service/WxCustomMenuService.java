package com.sy.service;

import com.sy.common.pagination.Pagination;
import com.sy.domain.business.WxCustomMenu;
import com.sy.mapper.business.WxCustomMenuMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class WxCustomMenuService {
	Logger logger = Logger.getLogger(WxCustomMenuService.class);

    @Autowired
	private WxCustomMenuMapper wxCustomMenuMapper;

	public Pagination<WxCustomMenu> getPageDataList(Map params, int currentpage, int pagesize) {
		//获取数据列表
		List<WxCustomMenu> dataList = wxCustomMenuMapper.getList(params);
		//获取总列数
		Integer count = wxCustomMenuMapper.getCount(params);
		return new Pagination<WxCustomMenu>(dataList, count);
	}

	public List<WxCustomMenu> getList(Map<String, Object> key) {
		return wxCustomMenuMapper.getList(key);
	}

	public int getCount(Map params) {
		return wxCustomMenuMapper.getCount(params);
	}

	public int getCountById(int id) {
		return wxCustomMenuMapper.getCountById(id);
	}

	public WxCustomMenu getModel(int id) {
		return wxCustomMenuMapper.selectByPrimaryKey(id);
	}

	@Transactional(value = "ds2", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
	public Boolean insert(WxCustomMenu record) {
		record.setCreateTime(new Date());
		return wxCustomMenuMapper.insertSelective(record) > 0;
	}

	@Transactional(value = "ds2", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
	public Boolean update(WxCustomMenu record) {
		return wxCustomMenuMapper.updateByPrimaryKeySelective(record) > 0;
	}

	@Transactional(value = "ds2",propagation= Propagation.REQUIRED,rollbackFor = RuntimeException.class)
	public int delete(int id) {
		return wxCustomMenuMapper.deleteByPrimaryKey(id);
	}

}



