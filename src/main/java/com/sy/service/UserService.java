package com.sy.service;

import com.sy.common.Constant.Constants;
import com.sy.common.pagination.Pagination;
import com.sy.domain.sys.Role;
import com.sy.domain.sys.User;
import com.sy.domain.sys.UserRoleRelation;
import com.sy.mapper.sys.RoleMapper;
import com.sy.mapper.sys.UserMapper;
import com.sy.mapper.sys.UserRoleRelationMapper;
import com.sy.util.MD5;
import com.sy.util.UserUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class UserService {
	Logger logger = Logger.getLogger(UserService.class);

    @Autowired
	private UserMapper userMapper;
    @Autowired
	private RoleMapper roleMapper;
    @Autowired
	private UserRoleRelationMapper roleRelationMapper;

	public Pagination<User> getPageDataList(Map params) {
		//获取数据列表
		List<User> dataList = userMapper.getList(params);
		//获取总列数
		Integer count = userMapper.getCount(params);
		return new Pagination<User>(dataList, count);
	}

	public List<User> getList(Map<String, Object> key) {
		return userMapper.getList(key);
	}

	public int getCount(Map params) {
		return userMapper.getCount(params);
	}

	@Transactional(value = "ds1", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
	public Boolean insert(User record) {
		UserRoleRelation roleRelation = new UserRoleRelation();
		roleRelation.setUserId(record.getUserId());
		roleRelation.setRoleId(record.getRoleId());
		roleRelationMapper.insertSelective(roleRelation);
		record.setCreateTime(new Date());
		record.setCreator(UserUtils.getCurrentUsername());
		record.setPassword(MD5.encodePassword(Constants.SYS.DEFAULT_PASSWORD));
		return userMapper.insertSelective(record) > 0;
	}

	@Transactional(value = "ds1", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
	public Boolean update(User record) {
		UserRoleRelation roleRelation = roleRelationMapper.getModelByUserId(record.getUserId());
		roleRelation.setRoleId(record.getRoleId());
		roleRelationMapper.updateByPrimaryKeySelective(roleRelation);
		record.setUpdateTime(new Date());
		record.setUpdateMan(UserUtils.getCurrentUser().getRealName());
		return userMapper.updateByPrimaryKeySelective(record) > 0;
	}

	public List<Role> getRoleList(Map<String, Object> key) {
		return roleMapper.getList(key);
	}

	public User getUserInfo(Integer userid){
		return userMapper.selectByPrimaryKey(userid);
	}

	@Transactional(value = "ds1", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
	public int updateUserInfoByPrimaryKeySelective(User record){
		record.setUpdateTime(new Date());
		record.setUpdateMan(UserUtils.getCurrentUser().getRealName());
		return userMapper.updateByPrimaryKeySelective(record);
	}

	public int getCount(int userId) {
		return userMapper.getCountById(userId);
	}

	public User getUser(String username, String password) {
		return userMapper.getUser(username, MD5.encodePassword(password));
	}

	public User getModel(int userId) {
		return userMapper.selectByPrimaryKey(userId);
	}

	@Transactional(value = "ds1",propagation= Propagation.REQUIRED,rollbackFor = RuntimeException.class)
	public int updateLoginTime(int userId) {
		User user = userMapper.selectByPrimaryKey(userId);
		user.setLastestLoginTime(new Date());
		return userMapper.updateByPrimaryKey(user);
	}

	@Transactional(value = "ds1",propagation= Propagation.REQUIRED,rollbackFor = RuntimeException.class)
	public int delete(int userId) {
		return userMapper.deleteByPrimaryKey(userId);
	}

	@Transactional(value = "ds1",propagation= Propagation.REQUIRED,rollbackFor = RuntimeException.class)
	public int modifyPassword(int userId, String password) {
		return userMapper.modifyPassword(userId, MD5.encodePassword(password));
	}

	public Boolean isExist(String userName) {
		Integer result = userMapper.getCountByUserName(userName);
		if(result > 0){
			return true;
		}else
			return false;
	}
}



