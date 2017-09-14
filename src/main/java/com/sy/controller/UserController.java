package com.sy.controller;

import com.sy.common.pagination.Pagination;
import com.sy.domain.sys.User;
import com.sy.service.UserService;
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
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/user")
public class UserController extends BaseController {
    Logger logger = Logger.getLogger(UserController.class);
    private String industryTableName = "customer_company_info";
    private String industryColumnName = "customer_industry";
    @Autowired
    private UserService userService;

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(ModelMap modelMap) {
        Map<String, Object> params = new HashMap<String, Object>();
        modelMap.put("roleList", userService.getRoleList(params));
        return "sys/userindex";
    }

    @ResponseBody
    @RequestMapping(value = "/userlist", method = RequestMethod.POST)
    public String getPageDataList(HttpServletRequest request) {
        try {
            Paging page = new Paging();
            Map<String, Object> key = FormSupport.generateParamsAndPage(request, page);
            Map<String, Object> params = (Map<String, Object>) key.get("params");
            Pagination<User> result = userService.getPageDataList(params);
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
            int userId = NumberUtil.getInt(request.getParameter("userId"));
            if (userId > 0) {
                User model = userService.getUserInfo(userId);
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
    public String updateSubmit(@ModelAttribute User model, HttpServletRequest request) {
        try {
            Integer userId = NumberUtil.getInt(request.getParameter("userId"));
            if (userId > 0) {
                if(!userService.update(model)){
                    return ResultUtil.getFailureJson("操作失败").toString();
                }
            } else {
                Map<String, Object> params = new HashMap<>();
                params.put("userName", model.getPhone());
                if(userService.getCount(params) > 0){
                    return ResultUtil.getFailureJson("账号已存在").toString();
                }
                model.setUserName(model.getPhone());
                model.setPassword(MD5.encodePassword(model.getPassword()));
                if(!userService.insert(model)){
                    return ResultUtil.getFailureJson("操作失败").toString();
                }
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
            String ids = request.getParameter("userId");
            if (ids != null && !ids.equals("")) {
                String[] arrayId = ids.split(",");
                int identity = 0;
                for (String id : arrayId) {
                    if (!id.equals("")) {
                        identity = Integer.parseInt(id);
                        userService.delete(identity);
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

    @ResponseBody
    @RequestMapping(value = "/validatephone", method = RequestMethod.POST)
    public Boolean validatePhone(HttpServletRequest request){
        String phone = request.getParameter("phone");//当前输入的手机号
        String oldphone = request.getParameter("oldphone");//原手机号(编辑时校验用到)
        if(StringUtils.isNotBlank(phone)) {
            if(phone.equalsIgnoreCase(oldphone)){
                return true;
            }
            Boolean result = userService.isExist(phone);
            return !result;
        }
        return false;
    }

    @ResponseBody
    @RequestMapping(value = "/validatePsw", method = RequestMethod.POST)
    public Boolean validatePsw(HttpServletRequest request){
        String orgPsw = request.getParameter("orgPsw");
        if(StringUtils.isNotBlank(orgPsw)) {
            Boolean result = UserUtils.getCurrentUser().getPassword().equals(MD5.encodePassword(orgPsw));
            return result;
        }
        return false;
    }

    @RequestMapping(value = "/userinfo", method = RequestMethod.GET)
    public String userInfo(ModelMap modelMap) {
        modelMap.put("industrys", GlobalResource.getPubDictData(industryTableName, industryColumnName));
        modelMap.put("userInfo", userService.getUserInfo(UserUtils.getCurrentUser().getUserId()));
        return "sys/userinfo";
    }

    @ResponseBody
    @RequestMapping(value = "/userSave", method = RequestMethod.POST)
    public String userSave(@ModelAttribute User user, HttpServletRequest request) {
        try {
            user.setUserId(UserUtils.getCurrentUser().getUserId());
            if(userService.updateUserInfoByPrimaryKeySelective(user) > 0){
                return ResultUtil.getSuccessJson("保存成功").toString();
            }else{
                return ResultUtil.getFailureJson("保存失败").toString();
            }
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("保存失败").toString();
        }
    }

    @ResponseBody
    @RequestMapping(value = "/userPsw", method = RequestMethod.POST)
    public String userPsw(HttpServletRequest request) {
        try {
            String orgPsw = request.getParameter("orgPsw");
            if(!UserUtils.getCurrentUser().getPassword().equals(MD5.encodePassword(orgPsw))){
                return ResultUtil.getFailureJson("原密码错误，修改失败").toString();
            }
            User user = new User();
            user.setUserId(UserUtils.getCurrentUser().getUserId());
            user.setPassword(MD5.encodePassword(request.getParameter("newPsw")));
            if(userService.updateUserInfoByPrimaryKeySelective(user) > 0){
                return ResultUtil.getSuccessJson("修改成功").toString();
            }else{
                return ResultUtil.getFailureJson("修改失败").toString();
            }
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("修改失败").toString();
        }
    }


}


