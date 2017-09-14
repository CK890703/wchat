package com.sy.service;

import com.sy.common.pagination.Pagination;
import com.sy.domain.sys.RoleModuleRelation;
import com.sy.mapper.sys.RoleMapper;
import com.sy.mapper.sys.RoleModuleRelationMapper;
import com.sy.mapper.sys.UserMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;

/**
 * 角色权限信息
 */

@Service
public class RoleModuleRelationService {
    Logger logger = Logger.getLogger(RoleModuleRelationService.class);
    @Autowired
    private RoleModuleRelationMapper roleModuleRelationMapper;
    @Autowired
    private RoleMapper roleMapper;
    @Autowired
    private UserMapper userMapper;

    public Pagination<RoleModuleRelation> getPageDataList(Map params, int currentpage, int pagesize) {
        //获取数据列表
        List<RoleModuleRelation> dataList = roleModuleRelationMapper.getList(params);
        //获取总列数
        Integer count = roleModuleRelationMapper.getCount(params);
        return new Pagination<RoleModuleRelation>(dataList, count);
    }

    public List<RoleModuleRelation> getList(Map<String, Object> key) {
        return roleModuleRelationMapper.getList(key);
    }

    public RoleModuleRelation getModel(int id) {
        return roleModuleRelationMapper.selectByPrimaryKey(id);
    }

    public int getCountById(Integer id) {
        return roleModuleRelationMapper.getCountById(id);
    }

    @Transactional(value = "ds1", propagation = Propagation.REQUIRED, rollbackFor = RuntimeException.class)
    public int insert(RoleModuleRelation model) {
        return roleModuleRelationMapper.insert(model);
    }

    @Transactional(value = "ds1", propagation = Propagation.REQUIRED, rollbackFor = RuntimeException.class)
    public int update(RoleModuleRelation model) {
        return roleModuleRelationMapper.updateByPrimaryKeySelective(model);
    }

    @Transactional(value = "ds1", propagation = Propagation.REQUIRED, rollbackFor = RuntimeException.class)
    public int delete(int rtbSiteTypeId) {
        return roleModuleRelationMapper.deleteByPrimaryKey(rtbSiteTypeId);
    }

}