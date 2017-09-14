package com.sy.mapper.sys;

import com.sy.domain.sys.ModuleOperation;

public interface ModuleOperationMapper {
    int deleteByPrimaryKey(Integer id);

    int insert(ModuleOperation record);

    int insertSelective(ModuleOperation record);

    ModuleOperation selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(ModuleOperation record);

    int updateByPrimaryKey(ModuleOperation record);
}