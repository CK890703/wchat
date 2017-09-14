package com.sy.mapper.sys;

import com.sy.domain.sys.MenuItem;
import com.sy.domain.sys.Module;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface ModuleMapper {
    /**
     * 获取数据库的记录列表
     *
     */
    List<Module> getList(Map<String, Object> key);

    /**
     * 获取数据库的记录数
     *
     */
    int getCount(Map<String, Object> key);

    /**
     * 根据主键获取数据库的记录数
     *
     * @param moduleId
     */
    int getCountById(Integer moduleId);

    int deleteByPrimaryKey(Integer moduleId);

    int insert(Module record);

    int insertSelective(Module record);

    Module selectByPrimaryKey(Integer moduleId);

    int updateByPrimaryKeySelective(Module record);

    int updateByPrimaryKey(Module record);

    List<MenuItem> getLogUserMenuInfo(@Param("userId")int userId, @Param("parentId")int parentId);

}