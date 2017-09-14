package com.sy.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sy.common.enums.EnumUtil;
import com.sy.common.pagination.Pagination;
import com.sy.domain.sys.MenuItem;
import com.sy.domain.sys.Module;
import com.sy.domain.sys.Role;
import com.sy.domain.sys.RoleModuleRelation;
import com.sy.mapper.sys.ModuleMapper;
import com.sy.mapper.sys.RoleMapper;
import com.sy.mapper.sys.RoleModuleRelationMapper;
import com.sy.mapper.sys.UserMapper;
import com.sy.util.UserUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.*;

/**
* 角色信息
*/

@Service
public class RoleService {
	Logger logger = Logger.getLogger(RoleService.class);

    @Autowired
	private RoleMapper roleMapper;
    @Autowired
    private UserMapper userMapper;
	@Autowired
	private ModuleMapper moduleMapper;
	@Autowired
	private RoleModuleRelationMapper roleModuleRelationMapper;

	public Pagination<Role> getPageDataList(Map params, int currentpage, int pagesize) {
		//获取数据列表
		List<Role> dataList = roleMapper.getList(params);
		//获取总列数
		Integer count = roleMapper.getCount(params);
		return new Pagination<Role>(dataList, count);
	}

	public List<Role> getList(Map<String, Object> key) {
		return roleMapper.getList(key);
	}

	public Role getModel(int roleId) {
		return roleMapper.selectByPrimaryKey(roleId);
	}

	public int getCountById(Integer roleId) {
		return roleMapper.getCountById(roleId);
	}

	@Transactional(value = "ds1", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
	public int insert(Role model) {
		if(model.getState() == null){
			model.setState(0);
		}
		model.setCreateTime(new Date());
		model.setCreator(UserUtils.getCurrentUser().getRealName());
		return roleMapper.insert(model);
	}

	@Transactional(value = "ds1", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
	public int update(Role model) {
        model.setUpdateTime(new Date());
        model.setUpdateMan(UserUtils.getCurrentUser().getRealName());
		return roleMapper.updateByPrimaryKeySelective(model);
	}

	@Transactional(value = "ds1", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
	public int delete(int roleId) {
		return roleMapper.deleteByPrimaryKey(roleId);
	}

	public boolean isCanDelete(int roleId) {
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("roleId", roleId);
		if (userMapper.getCount(params) > 0) {
			return false;
		} else {
			return true;
		}
	}

	@Transactional(value = "ds1", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
    public int changeStatus(Integer roleId, Integer state) {
		Role model = roleMapper.selectByPrimaryKey(roleId);
		model.setUpdateTime(new Date());
		model.setUpdateMan(UserUtils.getCurrentUser().getRealName());
		model.setState(state);
		return roleMapper.updateByPrimaryKeySelective(model);
    }

    public JSONObject getRolePermission(Integer roleId) {
		Integer rootId = 0;
		JSONObject rootJson = new JSONObject();
		Map<String, Object> params = new HashMap<String, Object>();
		params.put("parentId", "0");
		params.put("orderby", "module_id");
		List<Module> infoList  = moduleMapper.getList(params);
		if(infoList != null && infoList.size() > 0 && !infoList.isEmpty()){
			JSONArray moduleJsonArr = new JSONArray();
			for(Module module : infoList){
				JSONObject moduleJson = new JSONObject();
				moduleJson.put("id", module.getModuleId());
				moduleJson.put("text", module.getModuleName());
				JSONObject moduleAttributesJson = new JSONObject();
				moduleAttributesJson.put("parentId", module.getParentId());
				moduleJson.put("attributes", moduleAttributesJson);
				Map<String, Object> params1 = new HashMap<String, Object>();
				params1.put("parentId", module.getModuleId());
				params1.put("orderby", "module_id");
				List<Module> sonMenuItemList = moduleMapper.getList(params1);
				if(sonMenuItemList != null && sonMenuItemList.size() == 0){
					RoleModuleRelation roleModuleRelation =  roleModuleRelationMapper.getRoleModule(roleId, module.getModuleId());
					JSONArray permissionJsonArr = new JSONArray();
					List<String> permissionlist = new ArrayList<String>();
					if(StringUtils.isNotBlank(module.getPermissionCode())){
						if(roleModuleRelation != null){
							if(StringUtils.isNotBlank(roleModuleRelation.getPermissionCode())){
								String[] roleModuleStr = roleModuleRelation.getPermissionCode().split(",");
								if(roleModuleStr != null && roleModuleStr.length > 0){
									permissionlist = Arrays.asList(roleModuleStr);
								}
							}
						}
						String[] permissionStr = module.getPermissionCode().split(",");
						if(permissionStr != null && permissionStr.length > 0){
							for(int i = 0; i < permissionStr.length; i++){
								JSONObject permissionJson = new JSONObject();
								JSONObject permissionAttributesJson = new JSONObject();
								permissionAttributesJson.put("parentId", module.getModuleId());
								String permissionName = permissionStr[i];
								permissionJson.put("id", i + 1);
								if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_show.getCode())){
									permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_show.getName());
									permissionAttributesJson.put("code", EnumUtil.PermissionNameEnum.permission_show.getCode());
									permissionJson.put("attributes", permissionAttributesJson);
								}
								if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_add.getCode())){
									permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_add.getName());
									permissionAttributesJson.put("code", EnumUtil.PermissionNameEnum.permission_add.getCode());
									permissionJson.put("attributes", permissionAttributesJson);
								}
								if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_modify.getCode())){
									permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_modify.getName());
									permissionAttributesJson.put("code",EnumUtil.PermissionNameEnum.permission_modify.getCode());
									permissionJson.put("attributes", permissionAttributesJson);
								}
								if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_delete.getCode())){
									permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_delete.getName());
									permissionAttributesJson.put("code", EnumUtil.PermissionNameEnum.permission_delete.getCode());
									permissionJson.put("attributes", permissionAttributesJson);
								}
								if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_check.getCode())){
									permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_check.getName());
									permissionAttributesJson.put("code", EnumUtil.PermissionNameEnum.permission_check.getCode());
									permissionJson.put("attributes", permissionAttributesJson);
								}
								if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_setrole.getCode())){
									permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_setrole.getName());
									permissionAttributesJson.put("code", EnumUtil.PermissionNameEnum.permission_setrole.getCode());
									permissionJson.put("attributes", permissionAttributesJson);
								}
								if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_import.getCode())){
									permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_import.getName());
									permissionAttributesJson.put("code", EnumUtil.PermissionNameEnum.permission_import.getCode());
									permissionJson.put("attributes", permissionAttributesJson);
								}
								if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_export.getCode())){
									permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_export.getName());
									permissionAttributesJson.put("code", EnumUtil.PermissionNameEnum.permission_export.getCode());
									permissionJson.put("attributes", permissionAttributesJson);
								}
								if(permissionlist != null && !permissionlist.isEmpty() && permissionlist.size() > 0 && permissionlist.contains(permissionName)){
									permissionJson.put("checked", true);
									moduleJson.put("state", "open");
								}else{
									permissionJson.put("checked", false);
									moduleJson.put("state", "closed");
								}
								permissionJsonArr.add(permissionJson);
							}
							moduleJson.put("children", permissionJsonArr);
						}
					}
				}else if(sonMenuItemList != null && sonMenuItemList.size() > 0){
					JSONArray sonmoduleJsonArr = new JSONArray();
					for(Module sonmodule : sonMenuItemList){
						JSONObject sonmoduleJson = new JSONObject();
						sonmoduleJson.put("id", sonmodule.getModuleId());
						sonmoduleJson.put("text", sonmodule.getModuleName());
						JSONObject sonmoduleAttributesJson = new JSONObject();
						sonmoduleAttributesJson.put("parentId", sonmodule.getParentId());
						sonmoduleJson.put("attributes", sonmoduleAttributesJson);
						RoleModuleRelation roleModuleRelation =  roleModuleRelationMapper.getRoleModule(roleId, sonmodule.getModuleId());
						JSONArray permissionJsonArr = new JSONArray();
						List<String> permissionlist = new ArrayList<String>();
						if(StringUtils.isNotBlank(sonmodule.getPermissionCode())){
							if(roleModuleRelation != null){
								if(StringUtils.isNotBlank(roleModuleRelation.getPermissionCode())){
									String[] roleModuleStr = roleModuleRelation.getPermissionCode().split(",");
									if(roleModuleStr != null && roleModuleStr.length > 0){
										permissionlist = Arrays.asList(roleModuleStr);
									}
								}
							}
							String[] permissionStr = sonmodule.getPermissionCode().split(",");
							if(permissionStr != null && permissionStr.length > 0){
								for(int i = 0; i < permissionStr.length; i++){
									JSONObject permissionJson = new JSONObject();
									JSONObject permissionAttributesJson = new JSONObject();
									permissionAttributesJson.put("parentId", sonmodule.getModuleId());
									String permissionName = permissionStr[i];
									permissionJson.put("id", i + 1);
									if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_show.getCode())){
										permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_show.getName());
										permissionAttributesJson.put("code", EnumUtil.PermissionNameEnum.permission_show.getCode());
										permissionJson.put("attributes", permissionAttributesJson);
									}
									if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_add.getCode())){
										permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_add.getName());
										permissionAttributesJson.put("code", EnumUtil.PermissionNameEnum.permission_add.getCode());
										permissionJson.put("attributes", permissionAttributesJson);
									}
									if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_modify.getCode())){
										permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_modify.getName());
										permissionAttributesJson.put("code",EnumUtil.PermissionNameEnum.permission_modify.getCode());
										permissionJson.put("attributes", permissionAttributesJson);
									}
									if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_delete.getCode())){
										permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_delete.getName());
										permissionAttributesJson.put("code", EnumUtil.PermissionNameEnum.permission_delete.getCode());
										permissionJson.put("attributes", permissionAttributesJson);
									}
									if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_check.getCode())){
										permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_check.getName());
										permissionAttributesJson.put("code", EnumUtil.PermissionNameEnum.permission_check.getCode());
										permissionJson.put("attributes", permissionAttributesJson);
									}
									if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_setrole.getCode())){
										permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_setrole.getName());
										permissionAttributesJson.put("code", EnumUtil.PermissionNameEnum.permission_setrole.getCode());
										permissionJson.put("attributes", permissionAttributesJson);
									}
									if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_import.getCode())){
										permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_import.getName());
										permissionAttributesJson.put("code", EnumUtil.PermissionNameEnum.permission_import.getCode());
										permissionJson.put("attributes", permissionAttributesJson);
									}
									if(permissionName.equalsIgnoreCase(EnumUtil.PermissionNameEnum.permission_export.getCode())){
										permissionJson.put("text", EnumUtil.PermissionNameEnum.permission_export.getName());
										permissionAttributesJson.put("code", EnumUtil.PermissionNameEnum.permission_export.getCode());
										permissionJson.put("attributes", permissionAttributesJson);
									}
									if(permissionlist != null && !permissionlist.isEmpty() && permissionlist.size() > 0 && permissionlist.contains(permissionName)){
										permissionJson.put("checked", true);
										sonmoduleJson.put("state", "open");
									}else{
										permissionJson.put("checked", false);
										sonmoduleJson.put("state", "closed");
									}
									permissionJsonArr.add(permissionJson);
								}
								sonmoduleJson.put("children", permissionJsonArr);
							}
							sonmoduleJsonArr.add(sonmoduleJson);
						}
					}
					moduleJson.put("children", sonmoduleJsonArr);
				}
				moduleJsonArr.add(moduleJson);
			}
			rootJson.put("id", rootId);
			rootJson.put("text", "后台管理权限");
			rootJson.put("children", moduleJsonArr);
		}
		return rootJson;
    }

	@Transactional(value = "ds1", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
	public void updateRolePermission(Integer roleId, String permissionData) {
		roleModuleRelationMapper.deleteByRoleId(roleId);
		List<RoleModuleRelation> relationList = JSON.parseArray(permissionData, RoleModuleRelation.class);
		if(relationList != null && !relationList.isEmpty() && relationList.size() > 0){
			for(RoleModuleRelation relation : relationList){
				String permissionCode = "";
				if(relation != null){
					if(StringUtils.isNotBlank(relation.getPermissionCode())){
						List list = JSONArray.parseArray(JSON.parseArray(relation.getPermissionCode()).toString(), Object.class);
						if(!list.isEmpty() && list.size() > 0){
							for(int i = 0; i < list.size(); i++){
								if(i < list.size() - 1){
									permissionCode += list.get(i).toString() + ",";
								}else{
									permissionCode += list.get(i).toString();
								}
							}
						}
					}else{
						permissionCode = "show";
					}
					relation.setPermissionCode(permissionCode);
					roleModuleRelationMapper.insert(relation);
				}
			}
		}
	}
}



