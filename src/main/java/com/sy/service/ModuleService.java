package com.sy.service;

import com.sy.common.pagination.Pagination;
import com.sy.domain.sys.MenuItem;
import com.sy.domain.sys.MenuItemBo;
import com.sy.domain.sys.Module;
import com.sy.mapper.sys.ModuleMapper;
import com.sy.util.UserUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class ModuleService {
   Logger logger = Logger.getLogger(ModuleService.class);

    @Autowired
    private ModuleMapper moduleMapper;

    public Pagination<Module> getPageDataList(Map params, int currentpage, int pagesize) {
        //获取数据列表
        List<Module> dataList = moduleMapper.getList(params);
        //获取总列数
        Integer count = moduleMapper.getCount(params);
        return new Pagination<Module>(dataList, count);
    }

    public Module getModel(int moduleId) {
        return moduleMapper.selectByPrimaryKey(moduleId);
    }

    public int getCountById(Integer moduleId) {
        return moduleMapper.getCountById(moduleId);
    }


    public List<Module> getList(Map<String, Object> key) {
        return moduleMapper.getList(key);
    }

    @Transactional(value = "ds1",propagation= Propagation.REQUIRED,rollbackFor = RuntimeException.class)
    public int insert(Module module){
        module.setCreator(UserUtils.getCurrentUser().getRealName());
        module.setCreateTime(new Date());
        return moduleMapper.insertSelective(module);
    }

    @Transactional(value = "ds1",propagation= Propagation.REQUIRED,rollbackFor = RuntimeException.class)
    public int update(Module module) {
        module.setUpdateMan(UserUtils.getCurrentUser().getRealName());
        module.setUpdateTime(new Date());
        return moduleMapper.updateByPrimaryKeySelective(module);
    }

    @Transactional(value = "ds1",propagation= Propagation.REQUIRED,rollbackFor = RuntimeException.class)
    public int delete(int moduleId) {
        return moduleMapper.deleteByPrimaryKey(moduleId);
    }

    /**
     * 登录成功后查询用户的权限-菜单列表
     * @throws Exception
     */
    public List<MenuItem> getModuleByUserId(int userId, int parentId) throws Exception {
        // 查询用户的权限-菜单列表
        return moduleMapper.getLogUserMenuInfo(userId, parentId);
    }


    /**
     * 登录成功后查询用户的权限-菜单列表(兼容二级菜单)
     * @throws Exception
     */
    public List<MenuItemBo> getUserPermission(int userId, int parentId) throws Exception {
        List<MenuItemBo> itemBoList = new ArrayList<MenuItemBo>();
        List<MenuItem> menuItemList = moduleMapper.getLogUserMenuInfo(userId, parentId);
        if(menuItemList != null && menuItemList.size() > 0){
            for(MenuItem menuItem : menuItemList){
                MenuItemBo menuItemBo = new MenuItemBo();
                BeanUtils.copyProperties(menuItem, menuItemBo);
                List<MenuItem> sonMenuItemList = moduleMapper.getLogUserMenuInfo(userId, menuItem.getModuleId());
                if(sonMenuItemList != null && sonMenuItemList.size() > 0){
                    menuItemBo.setNavs(sonMenuItemList);
                }
                itemBoList.add(menuItemBo);
            }
        }
        return itemBoList;
    }

}
