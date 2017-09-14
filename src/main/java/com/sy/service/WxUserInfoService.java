package com.sy.service;

import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sy.common.pagination.Pagination;
import com.sy.domain.business.WxErrMsg;
import com.sy.domain.business.WxUserInfo;
import com.sy.domain.business.WxUserTag;
import com.sy.mapper.business.WxUserInfoMapper;
import com.sy.util.DateUtils;
import com.sy.util.NumberUtil;
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
public class WxUserInfoService {
	Logger logger = Logger.getLogger(WxUserInfoService.class);

    @Autowired
	private WxUserInfoMapper wxUserInfoMapper;
	@Autowired
	private WxUserTagService wxUserTagService;
	@Autowired
	private WeChatService weChatService;

	public Pagination<WxUserInfo> getPageDataList(Map params) throws Exception {
		//获取数据列表
		List<WxUserInfo> dataList = wxUserInfoMapper.getList(params);
		//时间转换
		if(dataList != null && dataList.size() > 0){
			for(WxUserInfo userInfo : dataList){
				if(userInfo.getSubscribeTime() != null)
					userInfo.setSubscribeTimeDate(DateUtils.timeStampToStrDate(userInfo.getSubscribeTime() * 1000));
				if(StringUtils.isNotBlank(userInfo.getTagidList())){
					List<String> tagidList = JSONObject.parseArray(userInfo.getTagidList(), String.class);
					if(tagidList != null && tagidList.size() > 0){
						String tagnameList = "";
						int i = 1;
						for(String tagid : tagidList){
							WxUserTag userTag = wxUserTagService.getModel(NumberUtil.getInt(tagid));
							if(userTag != null){
								if(i == tagidList.size())
									tagnameList += userTag.getName();
								else
									tagnameList += userTag.getName() + ",";
							}
							i++;
						}
						userInfo.setTagnameList(tagnameList);
					}
				}

			}
		}
		//获取总列数
		Integer count = wxUserInfoMapper.getCount(params);
		return new Pagination<WxUserInfo>(dataList, count);
	}

	public List<WxUserInfo> getList(Map<String, Object> key) {
		return wxUserInfoMapper.getList(key);
	}

	public int getCount(Map params) {
		return wxUserInfoMapper.getCount(params);
	}

	public int getCountById(int id) {
		return wxUserInfoMapper.getCountById(id);
	}

	public WxUserInfo getModel(int id) {
		return wxUserInfoMapper.selectByPrimaryKey(id);
	}

	@Transactional(value = "ds2", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
	public Boolean insert(WxUserInfo record) {
		record.setIsblacklist(0);
		record.setCreateTime(new Date());
		return wxUserInfoMapper.insertSelective(record) > 0;
	}

	@Transactional(value = "ds2", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
	public Boolean update(WxUserInfo record) {
		return wxUserInfoMapper.updateByPrimaryKeySelective(record) > 0;
	}

	@Transactional(value = "ds2",propagation= Propagation.REQUIRED,rollbackFor = RuntimeException.class)
	public int delete(int id) {
		return wxUserInfoMapper.deleteByPrimaryKey(id);
	}

	public WxUserInfo getUserInfoByOpenId(String openid) {
			return wxUserInfoMapper.getUserInfoByOpenId(openid);
	}

	public WxUserInfo getWxUserInfo(int id) throws Exception {
		WxUserInfo userInfo = wxUserInfoMapper.selectByPrimaryKey(id);
		if(userInfo != null){
			if(userInfo.getSubscribeTime() != null)
				userInfo.setSubscribeTimeDate(DateUtils.timeStampToStrDate(userInfo.getSubscribeTime() * 1000));
			if(StringUtils.isNotBlank(userInfo.getTagidList())){
				List<String> tagidList = JSONObject.parseArray(userInfo.getTagidList(), String.class);
				if(tagidList != null && tagidList.size() > 0){
					String tagnameList = "";
					int i = 1;
					for(String tagid : tagidList){
						WxUserTag userTag = wxUserTagService.getModel(NumberUtil.getInt(tagid));
						if(userTag != null){
							if(i == tagidList.size())
								tagnameList += userTag.getName();
							else
								tagnameList += userTag.getName() + ",";
						}
						i++;
					}
					userInfo.setTagnameList(tagnameList);
				}
			}
		}
		return userInfo;
	}

	@Transactional(value = "ds2",propagation= Propagation.REQUIRED,rollbackFor = RuntimeException.class)
	public WxErrMsg updateRemark(String accessToken, String openid, String remark) {
		WxErrMsg errMsg = null;
		WxUserInfo userInfo = wxUserInfoMapper.getUserInfoByOpenId(openid);
		if(userInfo != null){
			//同步微信-设置用户备注名
			errMsg = weChatService.updateRemark(accessToken, userInfo.getOpenid(), remark);
			if(errMsg.getErrcode().equals("0")){
				userInfo.setRemark(remark);
				wxUserInfoMapper.updateByPrimaryKeySelective(userInfo);
			}
		}
		return errMsg;
	}

	@Transactional(value = "ds2",propagation= Propagation.REQUIRED,rollbackFor = RuntimeException.class)
	public WxErrMsg batchBlackList(String accessToken, List<String> openids) {
		//同步微信-批量拉黑用户
		WxErrMsg errMsg = weChatService.batchBlackList(accessToken, openids);
		if(errMsg.getErrcode().equals("0")){
			for(String openid : openids){
				WxUserInfo userInfo = wxUserInfoMapper.getUserInfoByOpenId(openid);
				if(userInfo != null) {
					userInfo.setIsblacklist(1);
					wxUserInfoMapper.updateByPrimaryKeySelective(userInfo);
				}
			}
		}

		return errMsg;
	}

	@Transactional(value = "ds2",propagation= Propagation.REQUIRED,rollbackFor = RuntimeException.class)
	public WxErrMsg batchUnBlackList(String accessToken, List<String> openids) {
		//同步微信-批量取消拉黑用户
		WxErrMsg errMsg = weChatService.batchUnBlackList(accessToken, openids);
		if(errMsg.getErrcode().equals("0")){
			for(String openid : openids){
				WxUserInfo userInfo = wxUserInfoMapper.getUserInfoByOpenId(openid);
				if(userInfo != null) {
					userInfo.setIsblacklist(0);
					wxUserInfoMapper.updateByPrimaryKeySelective(userInfo);
				}
			}
		}
		return errMsg;
	}

}



