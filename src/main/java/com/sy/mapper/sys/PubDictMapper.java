package com.sy.mapper.sys;

import com.sy.domain.sys.PubDict;

import java.util.List;

public interface PubDictMapper {

    List<PubDict> getList();

    /**
     * 根据主键删除数据库的记录
     *
     * @param id
     */
    int deleteByPrimaryKey(Long id);

    /**
     * 插入数据库记录
     *
     * @param record
     */
    int insert(PubDict record);

    /**
     *
     * @param record
     */
    int insertSelective(PubDict record);

    /**
     * 根据主键获取一条数据库记录
     *
     * @param id
     */
    PubDict selectByPrimaryKey(Long id);

    /**
     *
     * @param record
     */
    int updateByPrimaryKeySelective(PubDict record);

    /**
     * 根据主键来更新数据库记录
     *
     * @param record
     */
    int updateByPrimaryKey(PubDict record);
}