package com.sy.controller;

import com.sy.common.pagination.Pagination;
import com.sy.domain.business.*;
import com.sy.domain.sys.User;
import com.sy.service.WeChatService;
import com.sy.service.WxUserInfoService;
import com.sy.service.WxUserTagService;
import com.sy.util.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import javax.servlet.http.HttpServletRequest;
import java.lang.Object;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/wxuserinfo")
public class WxUserInfoController {
    Logger logger = Logger.getLogger(WxUserInfoController.class);
    @Autowired
    private WxUserInfoService wxUserInfoService;
    @Autowired
    private WxUserTagService wxUserTagService;
    @Autowired
    private WeChatService weChatService;
    
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(ModelMap modelMap, HttpServletRequest request) {
        User user = UserUtils.getCurrentUser();
        modelMap.put("user", user);
        Map<String, Object> params = new HashMap<String, Object>();
        params.put("orderby", "id");
        modelMap.put("userTagList", wxUserTagService.getList(params));
	   return "business/wxuserinfoindex";
	}

	@ResponseBody
	@RequestMapping(value = "/wxuserinfolist", method = RequestMethod.POST)
	public String getPageDataList(HttpServletRequest request) { 
		try {
            Paging page = new Paging();
            Map<String, Object> key = FormSupport.generateParamsAndPage(request, page);
            Map<String, Object> params = (Map<String, Object>) key.get("params");
            Pagination<WxUserInfo> result = wxUserInfoService.getPageDataList(params);
            // 得到总条数
            page.setTotal_item(result.getTotalCount());
            return ResultUtil.getSuccessJsonString("获取数据成功", result.getResult(), page);
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("获取数据失败").toString();
        }
	}
 
	@ResponseBody
	@RequestMapping(value = "/get", method = RequestMethod.POST)
	public String getData(HttpServletRequest request) { 
		try {
            int id = NumberUtil.getInt(request.getParameter("id"));
            if (id > 0) {
                WxUserInfo model = wxUserInfoService.getWxUserInfo(id);
                return ResultUtil.getSuccessJson("获取数据成功", model).toString();
            }
            return ResultUtil.getFailureJson("获取数据失败").toString();
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("获取数据失败").toString();
        }
	}

	@ResponseBody
	@RequestMapping(value = "/update", method = RequestMethod.POST)
	public String updateSubmit(@ModelAttribute WxUserInfo model, HttpServletRequest request) {
		try {
            Integer id = NumberUtil.getInt(request.getParameter("id"));
            if (wxUserInfoService.getCountById(id) > 0) {
                wxUserInfoService.update(model);
            } else {
                wxUserInfoService.insert(model);
            }
            return ResultUtil.getSuccessJson("操作成功").toString();
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("操作失败").toString();
        }
	}

	@ResponseBody
	@RequestMapping(value = "/rm", method = RequestMethod.POST)
	public String remove(HttpServletRequest request) { 
		 try {
            String ids = request.getParameter("id");
            if (ids != null && !ids.equals("")) {
                String[] arrayId = ids.split(",");
                int identity = 0;
                for (String id : arrayId) {
                    if (!id.equals("")) {
                        identity = Integer.parseInt(id);
                        wxUserInfoService.delete(identity);
                    }
                }
                return ResultUtil.getSuccessJson("操作成功").toString();
            }
            return ResultUtil.getFailureJson("操作失败").toString();
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("操作失败，原因：" + ex.getMessage()).toString();
        }
	}

    /**
     * 设置用户备注名
     */
    @ResponseBody
    @RequestMapping(value = "/updateremark", method = RequestMethod.POST)
    public String updateRemark(HttpServletRequest request) {
        try {
            String openid = request.getParameter("openid");
            String remark = request.getParameter("remark");
            WxAccessToken wxAccessToken = weChatService.getWxAccessToken(request);
            if (wxAccessToken != null) {
                    WxErrMsg errMsg =  wxUserInfoService.updateRemark(wxAccessToken.getAccessToken(), openid, remark);
                    if(errMsg != null){
                        if(errMsg.getErrcode().equals("0"))
                            return ResultUtil.getSuccessJson("修改成功").toString();
                    }
                }
            return ResultUtil.getFailureJson("操作失败").toString();
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("操作失败").toString();
        }
    }

    /**
     * 批量拉黑用户
     */
    @ResponseBody
    @RequestMapping(value = "/batchblacklist", method = RequestMethod.POST)
    public String batchBlackList(HttpServletRequest request) {
        try {
            String openid = request.getParameter("openid");
            WxAccessToken wxAccessToken = weChatService.getWxAccessToken(request);
            if (wxAccessToken != null) {
                if(StringUtils.isNotBlank(openid)){
                    List<String> openids = Arrays.asList(openid.split(","));
                    WxErrMsg errMsg = wxUserInfoService.batchBlackList(wxAccessToken.getAccessToken(), openids);
                    String errMessage = "操作失败";
                    if(errMsg != null){
                        if(errMsg.getErrcode().equals("0"))
                            return ResultUtil.getSuccessJson("操作成功").toString();
                        else if(errMsg.getErrcode().equals("-1"))
                            errMessage = "系统繁忙";
                        else if(errMsg.getErrcode().equals("40003"))
                            errMessage = "传入非法的openid";
                        else if(errMsg.getErrcode().equals("49003"))
                            errMessage = "传入的openid不属于此AppID";
                        else if(errMsg.getErrcode().equals("40032"))
                            errMessage = "一次只能拉黑20个用户";
                        return ResultUtil.getFailureJson(errMessage).toString();
                    }
                }
            }
            return ResultUtil.getFailureJson("操作失败").toString();
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("操作失败").toString();
        }
    }

    /**
     * 批量取消拉黑用户
     */
    @ResponseBody
    @RequestMapping(value = "/batchunblacklist", method = RequestMethod.POST)
    public String batchUnBlackList(HttpServletRequest request) {
        try {
            String openid = request.getParameter("openid");
            WxAccessToken wxAccessToken = weChatService.getWxAccessToken(request);
            if (wxAccessToken != null) {
                if(StringUtils.isNotBlank(openid)){
                    List<String> openids = Arrays.asList(openid.split(","));
                    WxErrMsg errMsg = wxUserInfoService.batchUnBlackList(wxAccessToken.getAccessToken(), openids);
                    String errMessage = "操作失败";
                    if(errMsg != null){
                        if(errMsg.getErrcode().equals("0"))
                            return ResultUtil.getSuccessJson("操作成功").toString();
                        else if(errMsg.getErrcode().equals("-1"))
                            errMessage = "系统繁忙";
                        else if(errMsg.getErrcode().equals("40003"))
                            errMessage = "传入非法的openid";
                        else if(errMsg.getErrcode().equals("49003"))
                            errMessage = "传入的openid不属于此AppID";
                        else if(errMsg.getErrcode().equals("40032"))
                            errMessage = "一次只能取消拉黑20个用户";
                        return ResultUtil.getFailureJson(errMessage).toString();
                    }
                }
            }
            return ResultUtil.getFailureJson("操作失败").toString();
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("操作失败").toString();
        }
    }

    /**
     * 获取公众号的黑名单列表(测试使用)
     */
    @ResponseBody
    @RequestMapping(value = "/getblacklist", method = RequestMethod.GET)
    public String getBlackList(HttpServletRequest request) {
        try {
            String beginOpenid = request.getParameter("beginOpenid");
            WxAccessToken wxAccessToken = weChatService.getWxAccessToken(request);
            if (wxAccessToken != null) {
                WxRespData respData = weChatService.getBlackList(wxAccessToken.getAccessToken(), beginOpenid);
                if(respData != null) {
                    if (respData.getOpenidlist() != null && respData.getOpenidlist().size() > 0) {
                        List<WxUserInfo> userInfoList = weChatService.getUserInfoList(wxAccessToken.getAccessToken(), respData.getOpenidlist());
                        return ResultUtil.getSuccessJson("获取数据成功", userInfoList).toString();
                    }
                    String errMessage = "获取数据失败";
                    if (respData.getErrcode().equals("-1"))
                        errMessage = "系统繁忙";
                    else if (respData.getErrcode().equals("40003"))
                        errMessage = "传入非法的openid";
                    else if (respData.getErrcode().equals("49003"))
                        errMessage = "传入的openid不属于此AppID";
                    return ResultUtil.getFailureJson(errMessage).toString();
                }
            }
            return ResultUtil.getFailureJson("获取数据失败").toString();
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("获取数据失败").toString();
        }
    }



}


