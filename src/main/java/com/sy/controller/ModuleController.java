package com.sy.controller;

import com.sy.common.enums.EnumUtil;
import com.sy.common.pagination.Pagination;
import com.sy.domain.sys.Module;
import com.sy.domain.sys.User;
import com.sy.service.ModuleService;
import com.sy.util.*;
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
import java.util.HashMap;
import java.util.Map;

@Controller
@RequestMapping("/module")
public class ModuleController {
    Logger logger = Logger.getLogger(ModuleController.class);
    @Autowired
    private ModuleService moduleService;

    
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(ModelMap modelMap, HttpServletRequest request) { 
	   User user = UserUtils.getCurrentUser();
       modelMap.put("permissionCodes", EnumUtil.PermissionNameEnum.values());
       Map<String, Object> params = new HashMap<String, Object>();
       params.put("parentId", "0");
       params.put("orderby", "module_id");
       modelMap.put("moduleList", moduleService.getList(params));
       modelMap.put("user", user);
	   return "sys/moduleindex";
	}

	@ResponseBody
	@RequestMapping(value = "/modulelist", method = RequestMethod.POST)
	public String getPageDataList(HttpServletRequest request) { 
		try {
            Paging page = new Paging();
            Map<String, Object> key = FormSupport.generateParamsAndPage(request, page);
            Map<String, Object> params = (Map<String, Object>) key.get("params");
            params.put("orderby", "sort");
            Pagination<Module> result = moduleService.getPageDataList(params, page.getCurrent_page(), page.getPage_size());
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
            int moduleId = NumberUtil.getInt(request.getParameter("moduleId"));
            if (moduleId > 0) {
                Module model = moduleService.getModel(moduleId);
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
	public String updateSubmit(@ModelAttribute Module model, HttpServletRequest request) {
		try {
            Integer moduleId = NumberUtil.getInt(request.getParameter("moduleId"));
            if (moduleService.getCountById(moduleId) > 0) {
                moduleService.update(model);
            } else {
                moduleService.insert(model);
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
            String ids = request.getParameter("moduleId");
            if (ids != null && !ids.equals("")) {
                String[] arrayId = ids.split(",");
                int identity = 0;
                for (String id : arrayId) {
                    if (!id.equals("")) {
                        identity = Integer.parseInt(id);
                        moduleService.delete(identity);
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
	
}


