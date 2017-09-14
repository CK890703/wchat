package com.sy.mapper.business;

import com.sy.domain.business.WxUserTag;

import java.util.List;
import java.util.Map;

public interface WxUserTagMapper {

    /**
     * 获取数据库的记录列表
     *
     */
    List<WxUserTag> getList(Map<String, Object> key);

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

    int insert(WxUserTag record);

    int insertSelective(WxUserTag record);

    WxUserTag selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WxUserTag record);

    int updateByPrimaryKey(WxUserTag record);
}