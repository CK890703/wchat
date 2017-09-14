package com.sy.mapper.sys;

import com.sy.domain.sys.User;
import org.apache.ibatis.annotations.Param;

import java.util.List;
import java.util.Map;

public interface UserMapper {

    List<User> getList(Map<String, Object> key);

    int getCount(Map<String, Object> key);

    int getCountById(int userId);

    User getUser(@Param("username")String username, @Param("password") String password);

    int deleteByPrimaryKey(Integer userId);

    int insert(User record);

    int insertSelective(User record);

    User selectByPrimaryKey(Integer userId);

    int updateByPrimaryKeySelective(User record);

    int updateByPrimaryKey(User record);

    int modifyPassword(@Param("userId") int userId, @Param("password") String password);

    int getCountByUserName(String userName);
}