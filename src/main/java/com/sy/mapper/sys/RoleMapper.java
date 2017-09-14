package com.sy.mapper.sys;

import com.sy.domain.sys.Role;

import java.util.List;
import java.util.Map;

public interface RoleMapper {

    /**
     * 获取数据库的记录列表
     *
     */
    List<Role> getList(Map<String, Object> key);

    /**
     * 获取数据库的记录数
     *
     */
    int getCount(Map<String, Object> key);

    /**
     * 根据主键获取数据库的记录数
     *
     * @param roleId
     */
    int getCountById(Integer roleId);

    int deleteByPrimaryKey(Integer roleId);

    int insert(Role record);

    int insertSelective(Role record);

    Role selectByPrimaryKey(Integer roleId);

    int updateByPrimaryKeySelective(Role record);

    int updateByPrimaryKey(Role record);

}