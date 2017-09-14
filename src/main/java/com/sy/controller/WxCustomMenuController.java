package com.sy.controller;

import com.sy.common.pagination.Pagination;
import com.sy.domain.business.WxCustomMenu;
import com.sy.domain.sys.User;
import com.sy.service.WxCustomMenuService;
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
import java.util.Map;

@Controller
@RequestMapping("/wxcustommenu")
public class WxCustomMenuController {
    Logger logger = Logger.getLogger(WxCustomMenuController.class);
    @Autowired
    private WxCustomMenuService wxCustomMenuService;
    
	@RequestMapping(value = "/index", method = RequestMethod.GET)
	public String index(ModelMap modelMap, HttpServletRequest request) {
        User user = UserUtils.getCurrentUser();
        modelMap.put("user", user);
	    return "business/wxcustommenuindex";
	}

	@ResponseBody
	@RequestMapping(value = "/wxcustommenulist", method = RequestMethod.POST)
	public String getPageDataList(HttpServletRequest request) { 
		try {
            Paging page = new Paging();
            Map<String, Object> key = FormSupport.generateParamsAndPage(request, page);
            Map<String, Object> params = (Map<String, Object>) key.get("params");
            Pagination<WxCustomMenu> result = wxCustomMenuService.getPageDataList(params, page.getCurrent_page(), page.getPage_size());
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
                WxCustomMenu model = wxCustomMenuService.getModel(id);
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
	public String updateSubmit(@ModelAttribute WxCustomMenu model, HttpServletRequest request) {
		try {
            Integer id = NumberUtil.getInt(request.getParameter("id"));
            if (wxCustomMenuService.getCountById(id) > 0) {
                wxCustomMenuService.update(model);
            } else {
                wxCustomMenuService.insert(model);
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
                        wxCustomMenuService.delete(identity);
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


