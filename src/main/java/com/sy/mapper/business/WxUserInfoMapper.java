package com.sy.mapper.business;

import com.sy.domain.business.WxUserInfo;

import java.util.List;
import java.util.Map;

public interface WxUserInfoMapper {

    /**
     * 获取数据库的记录列表
     *
     */
    List<WxUserInfo> getList(Map<String, Object> key);

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

    int insert(WxUserInfo record);

    int insertSelective(WxUserInfo record);

    WxUserInfo selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WxUserInfo record);

    int updateByPrimaryKey(WxUserInfo record);

    WxUserInfo getUserInfoByOpenId(String openid);
}