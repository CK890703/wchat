package com.sy.mapper.business;

import com.sy.domain.business.WxCustomMenu;

import java.util.List;
import java.util.Map;

public interface WxCustomMenuMapper {

    /**
     * 获取数据库的记录列表
     *
     */
    List<WxCustomMenu> getList(Map<String, Object> key);

    /**
     * 获取数据库的记录数
     *
     */
    int getCount(Map<String, Object> key);

    /**
     * 根据主键获取数据库的记录数
     *
     * @param id
     */
    int getCountById(Integer id);

    int deleteByPrimaryKey(Integer id);

    int insert(WxCustomMenu record);

    int insertSelective(WxCustomMenu record);

    WxCustomMenu selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WxCustomMenu record);

    int updateByPrimaryKey(WxCustomMenu record);
}