package com.sy.controller;

import com.alibaba.fastjson.JSONArray;
import com.sy.common.pagination.Pagination;
import com.sy.domain.sys.Role;
import com.sy.domain.sys.User;
import com.sy.service.RoleService;
import com.sy.service.ModuleService;
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
import java.util.Map;

@Controller
@RequestMapping("/role")
public class RoleController extends BaseController {
    Logger logger = Logger.getLogger(RoleController.class);
    @Autowired
    private RoleService roleService;
    @Autowired
    private ModuleService moduleService;

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(ModelMap modelMap, HttpServletRequest request) {
        User user = UserUtils.getCurrentUser();
        modelMap.put("user", user);
        return "sys/roleindex";
    }

    @ResponseBody
    @RequestMapping(value = "/rolelist", method = RequestMethod.POST)
    public String getPageDataList(HttpServletRequest request) {
        try {
            Paging page = new Paging();
            Map<String, Object> key = FormSupport.generateParamsAndPage(request, page);
            Map<String, Object> params = (Map<String, Object>) key.get("params");
            Pagination<Role> result = roleService.getPageDataList(params, page.getCurrent_page(), page.getPage_size());
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
            int roleId = NumberUtil.getInt(request.getParameter("roleId"));
            if (roleId > 0) {
                Role model = roleService.getModel(roleId);
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
    public String updateSubmit(@ModelAttribute Role model, HttpServletRequest request) {
        try {
            Integer roleId = NumberUtil.getInt(request.getParameter("roleId"));
            if (roleService.getCountById(roleId) > 0) {
                roleService.update(model);
            } else {
                roleService.insert(model);
            }
            return ResultUtil.getSuccessJson("操作成功").toString();
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("操作失败").toString();
        }
    }

    @ResponseBody
    @RequestMapping(value = "/changestatus", method = RequestMethod.POST)
    public String changeStatus(HttpServletRequest request) {
        try {
            Integer roleId = NumberUtil.getInt(request.getParameter("roleId"));
            //要改变的状态
            Integer state = NumberUtil.getInt(request.getParameter("state"));
            if (roleId != null && state != null) {
                roleService.changeStatus(roleId, state);
                return ResultUtil.getSuccessJson("操作成功").toString();
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
            String ids = request.getParameter("roleId");
            if (ids != null && !ids.equals("")) {
                String[] arrayId = ids.split(",");
                int identity = 0;
                for (String id : arrayId) {
                    if (!id.equals("")) {
                        identity = Integer.parseInt(id);
                        //检查是否有用户角色数据关联
                        if(roleService.isCanDelete(identity)){
                            roleService.delete(identity);
                        }else{
                            return ResultUtil.getFailureJson("操作失败，该角色有用户关联不能删除").toString();
                        }
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
    @RequestMapping(value = "/getrolepermission", method = RequestMethod.POST)
    public String getRolePermission(HttpServletRequest request) {
        JSONArray rolePermissionJson = new JSONArray();
        try {
            Integer roleId = NumberUtil.getInt(request.getParameter("roleId"));
            if (roleId != null) {
                rolePermissionJson.add(roleService.getRolePermission(roleId));
            }
        } catch (Exception ex) {
            logger.error(ex);
        }
        return rolePermissionJson.toString();
    }

    @ResponseBody
    @RequestMapping(value = "/updaterolepermission", method = RequestMethod.POST)
    public String updateRolePermission( HttpServletRequest request) {
        try {
            Integer roleId = NumberUtil.getInt(request.getParameter("roleId"));
            String permissionData = request.getParameter("permissiondata");
            if(roleId != null && StringUtils.isNotBlank(permissionData)){
                roleService.updateRolePermission(roleId, permissionData);
                return ResultUtil.getSuccessJson("操作成功").toString();
            }
            return ResultUtil.getFailureJson("操作失败").toString();
        } catch (Exception ex) {
            logger.error(ex);
            return ResultUtil.getFailureJson("操作失败").toString();
        }
    }

}