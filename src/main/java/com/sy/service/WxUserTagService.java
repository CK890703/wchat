package com.sy.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sy.common.pagination.Pagination;
import com.sy.domain.business.WxErrMsg;
import com.sy.domain.business.WxRespData;
import com.sy.domain.business.WxUserInfo;
import com.sy.domain.business.WxUserTag;
import com.sy.mapper.business.WxUserInfoMapper;
import com.sy.mapper.business.WxUserTagMapper;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.Map;

@Service
public class WxUserTagService {
	Logger logger = Logger.getLogger(WxUserTagService.class);

    @Autowired
	private WxUserTagMapper wxUserTagMapper;
	@Autowired
	private WxUserInfoMapper wxUserInfoMapper;
    @Autowired
	private WeChatService weChatService;

	public Pagination<WxUserTag> getPageDataList(String accessToken, Map params) {
		//同步微信-用户标签数据
		List<WxUserTag> tagList = weChatService.getTagList(accessToken);
		if(tagList != null && tagList.size() > 0){
			for(WxUserTag tag : tagList){
				wxUserTagMapper.deleteByPrimaryKey(tag.getId());
				tag.setCreateTime(new Date());
				wxUserTagMapper.insert(tag);
			}
		}
		//获取数据列表
		List<WxUserTag> dataList = wxUserTagMapper.getList(params);
		//获取总列数
		Integer count = wxUserTagMapper.getCount(params);
		return new Pagination<WxUserTag>(dataList, count);
	}

	public List<WxUserTag> getList(Map<String, Object> key) {
		return wxUserTagMapper.getList(key);
	}

	public int getCount(Map params) {
		return wxUserTagMapper.getCount(params);
	}

	public int getCountById(int id) {
		return wxUserTagMapper.getCountById(id);
	}

	public WxUserTag getModel(int id) {
		return wxUserTagMapper.selectByPrimaryKey(id);
	}

	@Transactional(value = "ds2", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
	public WxErrMsg insert(WxUserTag record, String accessToken) {
		WxErrMsg errMsg = null;
		//同步微信-创建用户标签
		WxUserTag userTag = weChatService.createTag(accessToken, record.getName());
		if(StringUtils.isBlank(userTag.getErrcode())){
			record.setId(userTag.getId());
			record.setCount(0L);
			record.setCreateTime(new Date());
			wxUserTagMapper.insertSelective(record);
		}else{
			errMsg = new WxErrMsg();
			errMsg.setErrcode(userTag.getErrcode());
			errMsg.setErrmsg(userTag.getErrmsg());
		}
		return errMsg;
	}

	@Transactional(value = "ds2", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
	public WxErrMsg update(WxUserTag record, String accessToken) {
		//同步微信-编辑用户标签
		WxErrMsg errMsg = weChatService.updateTag(accessToken, record.getId(), record.getName());
		if(errMsg.getErrcode().equals("0")){
			wxUserTagMapper.updateByPrimaryKeySelective(record);
		}
		return errMsg;
	}

	@Transactional(value = "ds2",propagation= Propagation.REQUIRED,rollbackFor = RuntimeException.class)
	public WxErrMsg delete(int id, String accessToken) {
		WxErrMsg errMsg = null;
		WxRespData respData = weChatService.getTagUserList(accessToken, id, null);
		if(respData != null && respData.getOpenidlist() != null && respData.getOpenidlist().size() > 0){
			//同步微信-删除用户标签
			errMsg = weChatService.deleteTag(accessToken, id);
			if(errMsg.getErrcode().equals("0")){
				for(String openid : respData.getOpenidlist()){
					WxUserInfo userInfo = wxUserInfoMapper.getUserInfoByOpenId(openid);
					if(userInfo != null) {
						JSONArray jsonArray = JSONObject.parseArray(userInfo.getTagidList());
						if(jsonArray.contains(id)){
							jsonArray.remove(Integer.valueOf(id));
							userInfo.setTagidList(jsonArray.toJSONString());
							wxUserInfoMapper.updateByPrimaryKeySelective(userInfo);
						}
					}
				}
				wxUserTagMapper.deleteByPrimaryKey(id);
			}
		}
		return errMsg;
	}

	@Transactional(value = "ds2",propagation= Propagation.REQUIRED,rollbackFor = RuntimeException.class)
	public WxErrMsg batchTaggingTag(String accessToken, Integer tagid, List<String> openids) {
		//同步微信-批量为用户打标签
		WxErrMsg errMsg = weChatService.batchTaggingTag(accessToken, tagid, openids);
		if(errMsg.getErrcode().equals("0")){
			for(String openid : openids){
				WxUserTag userTag = wxUserTagMapper.selectByPrimaryKey(tagid);
				WxUserInfo userInfo = wxUserInfoMapper.getUserInfoByOpenId(openid);
				if(userTag != null && userInfo != null) {
					JSONArray jsonArray = JSONObject.parseArray(userInfo.getTagidList());
					if(!jsonArray.contains(tagid)){
						jsonArray.add(tagid);
						userInfo.setTagidList(jsonArray.toJSONString());
						wxUserInfoMapper.updateByPrimaryKeySelective(userInfo);
					}
				}
			}
		}
		return errMsg;
	}

	@Transactional(value = "ds2",propagation= Propagation.REQUIRED,rollbackFor = RuntimeException.class)
	public WxErrMsg batchUnTaggingTag(String accessToken, Integer tagid, List<String> openids) {
		//同步微信-批量为用户取消标签
		WxErrMsg errMsg = weChatService.batchUnTaggingTag(accessToken, tagid, openids);
		if(errMsg.getErrcode().equals("0")){
			for(String openid : openids){
				WxUserTag userTag = wxUserTagMapper.selectByPrimaryKey(tagid);
				WxUserInfo userInfo = wxUserInfoMapper.getUserInfoByOpenId(openid);
				if(userTag != null && userInfo != null) {
					JSONArray jsonArray = JSONObject.parseArray(userInfo.getTagidList());
					if(jsonArray.contains(tagid)){
						jsonArray.remove(tagid);
						userInfo.setTagidList(jsonArray.toJSONString());
						wxUserInfoMapper.updateByPrimaryKeySelective(userInfo);
					}
				}
			}
		}
		return errMsg;
	}

}



