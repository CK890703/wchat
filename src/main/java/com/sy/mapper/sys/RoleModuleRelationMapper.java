package com.sy.mapper.sys;

import com.sy.domain.sys.RoleModuleRelation;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface RoleModuleRelationMapper {

    /**
     * 获取数据库的记录列表
     *
     */
    List<RoleModuleRelation> getList(Map<String, Object> key);

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

    int insert(RoleModuleRelation record);

    int insertSelective(RoleModuleRelation record);

    RoleModuleRelation selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(RoleModuleRelation record);

    int updateByPrimaryKey(RoleModuleRelation record);

    List<RoleModuleRelation> getRoleModuleRelationList(@Param("roleId")Integer roleId);

    RoleModuleRelation getRoleModule(@Param("roleId")Integer roleId, @Param("moduleId")Integer moduleId);

    int deleteByRoleId(Integer roleId);
}