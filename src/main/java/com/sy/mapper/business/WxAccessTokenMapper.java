package com.sy.mapper.business;

import com.sy.domain.business.WxAccessToken;

public interface WxAccessTokenMapper {

    int deleteByPrimaryKey(Integer id);

    int insert(WxAccessToken record);

    int insertSelective(WxAccessToken record);

    WxAccessToken selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(WxAccessToken record);

    int updateByPrimaryKey(WxAccessToken record);

    /**
     * 获取最新一条记录
     *
     */
    WxAccessToken getLatestWxAccessToken();

}