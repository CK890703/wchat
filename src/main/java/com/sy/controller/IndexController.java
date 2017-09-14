package com.sy.controller;

import com.alibaba.fastjson.JSONObject;
import com.sy.common.pagination.Pagination;
import com.sy.domain.sys.User;
import com.sy.service.*;
import com.sy.util.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping(value = "/")
public class IndexController extends BaseController {
    private Logger logger = Logger.getLogger(IndexController.class);

    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index(ModelMap modelMap, HttpServletRequest request) {
        User user = UserUtils.getCurrentUser();
        modelMap.put("user", user);
        modelMap.put("url", "main");
        return "index";
    }

    @RequestMapping(value = "/main", method = RequestMethod.GET)
    public String mainIndex(ModelMap modelMap, HttpServletRequest request) {
        User user = UserUtils.getCurrentUser();
        modelMap.put("user", user);
        return "main";
    }

    @RequestMapping("/403")
    public String unauthorizedRole() {
        return "common/403";
    }

    //模板需要
    @RequestMapping(value = "ec/api")
    @ResponseBody
    public void api(HttpServletRequest request, HttpServletResponse response) {
        printJson(response, "{\"ret\":0,\"msg\":\"\",\"data\":{\"loguid\":648186168,\"logname\":\"\",\"uname\":\"\",\"aduser_type\":0,\"nickname\":\"648186168\",\"remain\":\"0.00\",\"remain_v\":\"0.00\",\"agid\":0,\"aduid\":3935548,\"status\":19,\"appid\":1,\"targettype\":24,\"notice\":\"请联系管理员\",\"privilege\":{\"shoppinginterest\":0,\"group_search\":0,\"is_portal_reguser\":0,\"collaborator\":1,\"invoice_enabled\":1,\"campaign_del\":1,\"ka_advertiser\":0,\"limitation_1000\":0,\"renzheng_embed\":0,\"merchant_qq\":0,\"cpm\":0,\"highconsumption\":0,\"lowconsumption\":0,\"customrpt\":0,\"targeting_lbs\":0,\"qq_liveshow_room\":0,\"qzone_gift\":0,\"qzone_sign\":0,\"media_tool\":0,\"weixin_ex_link\":0,\"mobuni_medical\":0,\"pcuni_medical\":0,\"numberpackage_qqgrp\":0,\"numberpackage_cookie\":0,\"market_task_userlist\":0,\"estimate\":0,\"suggestprice\":0,\"dzdp\":0,\"oplog\":0,\"market_block_user\":0,\"myapppromotion\":0,\"target_kw_setting\":0,\"customized_url\":0,\"use_click_tracking_url\":0,\"conversion_rule\":0,\"player_consupt\":0,\"CPM_frecon\":0,\"dmp_user\":0,\"feed_deellinking\":0,\"ios_campaignID\":0,\"union_android_app\":0,\"targeting_new_device\":0,\"business_travel\":0,\"remarket\":0,\"web_track\":0,\"Atlas_targetting\":0,\"targeting_junior\":0,\"use_medium_shield\":0,\"SmartOptimizer\":0,\"new_area\":0,\"targeting_appuser\":0,\"webpixel\":0,\"newadsoCPA\":0,\"otc_protect\":0,\"targeting_detailed\":0,\"tsa_search\":0,\"YYB_Targeting\":0,\"qqbrowser_rw\":0,\"phoenix\":0,\"Local_ads\":0,\"Anmediatarget\":0,\"targeting_industry\":0,\"targeting_aqi\":0,\"QzoneFeeds\":0,\"cpt_page\":0,\"myapp_landing_page_tool\":0},\"isboss\":true,\"can_charge\":1,\"is_qq_biz\":0,\"time\":1490780423,\"corporate_image_name\":\"\",\"corporate_image_image_url\":\"\",\"mp_bound_status\":0,\"show_mp_bound\":\"false\",\"env\":\"formal\",\"identity_padding_tag\":0,\"register_time\":1490233962}}");
    }

}
