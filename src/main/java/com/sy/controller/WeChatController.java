package com.sy.controller;

import com.alibaba.fastjson.JSONObject;
import com.sy.common.Constant.Constants;
import com.sy.domain.business.WxAccessToken;
import com.sy.service.WeChatService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;

@Controller
@RequestMapping("/wechat")
public class WeChatController {
    private Logger logger = Logger.getLogger(WeChatController.class);
    @Autowired
    private WeChatService weChatService;

    /**
     * 校验微信服务器
     */
    @RequestMapping(value = "/weixin", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public void validWeiXin(HttpServletRequest request, HttpServletResponse response) {
        PrintWriter out = null;
        try {
            String signature = request.getParameter("signature"); //微信加密签名，signature结合了开发者填写的token参数和请求中的timestamp参数、nonce参数。
            String timestamp = request.getParameter("timestamp"); //时间戳
            String nonce = request.getParameter("nonce"); //随机数
            String echostr = request.getParameter("echostr"); //随机字符串
            out = response.getWriter();
            if (signature != null && timestamp != null && nonce != null) {
                // 通过检验signature对请求进行校验，若校验成功则原样返回echostr，表示接入成功，否则接入失败
                if (weChatService.checkSignature(Constants.WX.TOKEN, timestamp, nonce, signature)) {
                    out.print(echostr);
                }
            }
        } catch (IOException e) {
            logger.error("连接微信服务器异常");
            e.printStackTrace();
        } finally {
            out.flush();
            out.close();
        }
    }

    /**
     * 调用核心业务类接收消息、处理消息跟推送消息
     */
    @RequestMapping(value = "weixin", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public void reqMessage(HttpServletRequest request, HttpServletResponse response) {
        PrintWriter out = null;
        try {
            String respMessage = weChatService.processRequest(request);
            //返回自动回复
            response.setContentType("text/xml");
            out = response.getWriter();
            out.write(respMessage);
        } catch (Exception e) {
            e.printStackTrace();
        }finally {
            out.flush();
            out.close();
        }
    }

    /**
     * 获取微信服务器IP地址
     */
    @ResponseBody
    @RequestMapping(value = "/weixinip", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
    public JSONObject getWxCallbackIp(HttpServletRequest request) {
        WxAccessToken wxAccessToken = weChatService.getWxAccessToken(request);
        if (wxAccessToken != null) {
            return weChatService.getWxCallbackIp(wxAccessToken.getAccessToken());
        }
        return null;
    }


}
