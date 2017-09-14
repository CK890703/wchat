package com.sy.controller;

import com.sy.common.pagination.Pagination;
import com.sy.domain.business.*;
import com.sy.domain.sys.User;
import com.sy.service.WeChatService;
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
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/wxusertag")
public class WxUserTagController {
    Logger logger = Logger.getLogger(WxUserTagController.class);
    @Autowired
    private WxUserTagService wxUserTagService;
    @Autowired
    private WeChatService weChatService;
    
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(ModelMap modelMap, HttpServletRequest request) {
        User user = UserUtils.getCurrentUser();
        modelMap.put("user", user);
        return "business/wxusertagindex";
	}

	@ResponseBody
	@RequestMapping(value = "/wxusertaglist", method = RequestMethod.POST)
	public String getPageDataList(HttpServletRequest request) { 
		try {
            WxAccessToken wxAccessToken = weChatService.getWxAccessToken(request);
            if (wxAccessToken != null) {
                Paging page = new Paging();
                Map<String, Object> key = FormSupport.generateParamsAndPage(request, page);
                Map<String, Object> params = (Map<String, Object>) key.get("params");
                params.put("orderby", "id");
                Pagination<WxUserTag> result = wxUserTagService.getPageDataList(wxAccessToken.getAccessToken(), params);
                // 得到总条数
                page.setTotal_item(result.getTotalCount());
                return ResultUtil.getSuccessJsonString("获取数据成功", result.getResult(), page);
            }
            return ResultUtil.getFailureJson("获取数据失败").toString();
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
                WxUserTag model = wxUserTagService.getModel(id);
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
	public String updateSubmit(@ModelAttribute WxUserTag model, HttpServletRequest request) {
        String errMessage = "操作失败";
		try {
            Integer id = NumberUtil.getInt(request.getParameter("id"));
            WxAccessToken wxAccessToken = weChatService.getWxAccessToken(request);
            if (wxAccessToken != null) {
                if (wxUserTagService.getCountById(id) > 0) {
                    WxErrMsg errMsg =  wxUserTagService.update(model, wxAccessToken.getAccessToken());
                    if(errMsg != null){
                        if(errMsg.getErrcode().equals("0"))
                            return ResultUtil.getSuccessJson("修改成功").toString();
                        else if(errMsg.getErrcode().equals("-1"))
                            errMessage = "系统繁忙";
                        else if(errMsg.getErrcode().equals("45157"))
                            errMessage = "标签名非法，请注意不能和其他标签重名";
                        else if(errMsg.getErrcode().equals("45158"))
                            errMessage = "标签名长度超过30个字节";
                        else if(errMsg.getErrcode().equals("45056"))
                            errMessage = "不能修改0/1/2这三个系统默认保留的标签";
                        return ResultUtil.getFailureJson(errMessage).toString();
                    }
                } else {
                    WxErrMsg errMsg = wxUserTagService.insert(model, wxAccessToken.getAccessToken());
                    if(errMsg == null){
                        return ResultUtil.getSuccessJson("创建成功").toString();
                    }else{
                        if(errMsg.getErrcode().equals("-1"))
                            errMessage = "系统繁忙";
                        else if(errMsg.getErrcode().equals("45157"))
                            errMessage = "标签名非法，请注意不能和其他标签重名";
                        else if(errMsg.getErrcode().equals("45158"))
                            errMessage = "标签名长度超过30个字节";
                        else if(errMsg.getErrcode().equals("45056"))
                            errMessage = "创建的标签数过多，请注意不能超过100个";
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

	@ResponseBody
	@RequestMapping(value = "/rm", method = RequestMethod.POST)
	public String remove(HttpServletRequest request) {
		 try {
             WxAccessToken wxAccessToken = weChatService.getWxAccessToken(request);
             if (wxAccessToken != null) {
                 String ids = request.getParameter("id");
                 if (ids != null && !ids.equals("")) {
                     String[] arrayId = ids.split(",");
                     int identity = 0;
                     for (String id : arrayId) {
                         if (!id.equals("")) {
                             identity = Integer.parseInt(id);
                             WxErrMsg errMsg = wxUserTagService.delete(identity, wxAccessToken.getAccessToken());
                             String errMessage = "操作失败";
                             if(errMsg != null){
                                 if(errMsg.getErrcode().equals("0"))
                                     continue;
                                 else if(errMsg.getErrcode().equals("-1"))
                                     errMessage = "系统繁忙";
                                 else if(errMsg.getErrcode().equals("45058"))
                                     errMessage = "不能修改0/1/2这三个系统默认保留的标签";
                                 else if(errMsg.getErrcode().equals("45057"))
                                     errMessage = "该标签下粉丝数超过10w，不允许直接删除";
                                 return ResultUtil.getFailureJson(errMessage).toString();
                             }
                         }
                     }
                     return ResultUtil.getSuccessJson("删除成功").toString();
                 }
             }
             return ResultUtil.getFailureJson("操作失败").toString();
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("操作失败").toString();
        }
	}

    /**
     * 批量为用户打标签
     */
    @ResponseBody
    @RequestMapping(value = "/batchtaggingtag", method = RequestMethod.POST)
    public String batchTaggingTag(HttpServletRequest request) {
        try {
            Integer tagid = NumberUtil.getInt(request.getParameter("id"));
            String openid = request.getParameter("openid");
            WxAccessToken wxAccessToken = weChatService.getWxAccessToken(request);
            if (wxAccessToken != null) {
                if(tagid != null && StringUtils.isNotBlank(openid)){
                    List<String> openids = Arrays.asList(openid.split(","));
                    WxErrMsg errMsg = wxUserTagService.batchTaggingTag(wxAccessToken.getAccessToken(), tagid, openids);
                    String errMessage = "操作失败";
                    if(errMsg != null){
                        if(errMsg.getErrcode().equals("0"))
                            return ResultUtil.getSuccessJson("操作成功").toString();
                        else if(errMsg.getErrcode().equals("-1"))
                            errMessage = "系统繁忙";
                        else if(errMsg.getErrcode().equals("40032"))
                            errMessage = "每次传入的openid列表个数不能超过50个";
                        else if(errMsg.getErrcode().equals("45159"))
                            errMessage = "非法的标签";
                        else if(errMsg.getErrcode().equals("45059"))
                            errMessage = "有粉丝身上的标签数已经超过限制，即超过20个";
                        else if(errMsg.getErrcode().equals("40003"))
                            errMessage = "传入非法的openid";
                        else if(errMsg.getErrcode().equals("49003"))
                            errMessage = "传入的openid不属于此AppID";
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
     * 批量为用户取消标签
     */
    @ResponseBody
    @RequestMapping(value = "/batchuntaggingtag", method = RequestMethod.POST)
    public String batchUnTaggingTag(HttpServletRequest request) {
        try {
            Integer tagid = NumberUtil.getInt(request.getParameter("id"));
            String openid = request.getParameter("openid");
            WxAccessToken wxAccessToken = weChatService.getWxAccessToken(request);
            if (wxAccessToken != null) {
                if(tagid != null && StringUtils.isNotBlank(openid)){
                    List<String> openids = Arrays.asList(openid.split(","));
                    WxErrMsg errMsg = wxUserTagService.batchUnTaggingTag(wxAccessToken.getAccessToken(), tagid, openids);
                    String errMessage = "操作失败";
                    if(errMsg != null){
                        if(errMsg.getErrcode().equals("0"))
                            return ResultUtil.getSuccessJson("操作成功").toString();
                        else if(errMsg.getErrcode().equals("-1"))
                            errMessage = "系统繁忙";
                        else if(errMsg.getErrcode().equals("40032"))
                            errMessage = "每次传入的openid列表个数不能超过50个";
                        else if(errMsg.getErrcode().equals("45159"))
                            errMessage = "非法的标签";
                        else if(errMsg.getErrcode().equals("40003"))
                            errMessage = "传入非法的openid";
                        else if(errMsg.getErrcode().equals("49003"))
                            errMessage = "传入的openid不属于此AppID";
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
     * 获取标签下粉丝列表(测试使用)
     */
    @ResponseBody
    @RequestMapping(value = "/taguserlist", method = RequestMethod.GET)
    public String getTagUserList(HttpServletRequest request) {
        try {
            Integer tagid = NumberUtil.getInt(request.getParameter("id"));
            String nextOpenid = request.getParameter("nextOpenid");
            WxAccessToken wxAccessToken = weChatService.getWxAccessToken(request);
            if (wxAccessToken != null) {
                if(tagid != null){
                    WxRespData respData = weChatService.getTagUserList(wxAccessToken.getAccessToken(), tagid, nextOpenid);
                    if(respData != null){
                        if(respData.getOpenidlist() != null && respData.getOpenidlist().size() > 0){
                            List<WxUserInfo> userInfoList = weChatService.getUserInfoList(wxAccessToken.getAccessToken(), respData.getOpenidlist());
                            return ResultUtil.getSuccessJson("获取数据成功", userInfoList).toString();
                        }
                        String errMessage = "获取数据失败";
                        if(respData.getErrcode().equals("-1"))
                            errMessage = "系统繁忙";
                        else if(respData.getErrcode().equals("40003"))
                            errMessage = "传入非法的openid";
                        else if(respData.getErrcode().equals("45159"))
                            errMessage = "非法的tag_id";
                        return ResultUtil.getFailureJson(errMessage).toString();
                    }
                }
            }
            return ResultUtil.getFailureJson("获取数据失败").toString();
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("获取数据失败").toString();
        }
    }

    /**
     * 获取用户身上的标签列表(测试使用)
     */
    @ResponseBody
    @RequestMapping(value = "/getusertagidlist", method = RequestMethod.GET)
    public String getUserTagIdList(HttpServletRequest request) {
        try {
            String openid = request.getParameter("openid");
            WxAccessToken wxAccessToken = weChatService.getWxAccessToken(request);
            if (wxAccessToken != null) {
                if(StringUtils.isNotBlank(openid)){
                    List<WxUserTag> userTagList = weChatService.getUserTagIdList(wxAccessToken.getAccessToken(), openid);
                    return ResultUtil.getSuccessJson("获取数据成功", userTagList).toString();
                }
            }
            return ResultUtil.getFailureJson("获取数据失败").toString();
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("获取数据失败").toString();
        }
    }


}


