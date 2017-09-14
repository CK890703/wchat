package com.sy.service;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import com.sy.common.Constant.Constants;
import com.sy.domain.business.*;
import com.sy.domain.winxin.message.resp.Article;
import com.sy.domain.winxin.message.resp.NewsMessage;
import com.sy.domain.winxin.message.resp.TextMessage;
import com.sy.mapper.business.WxAccessTokenMapper;
import com.sy.mapper.business.WxUserInfoMapper;
import com.sy.mapper.business.WxUserTagMapper;
import com.sy.mapper.sys.PubDictMapper;
import com.sy.util.*;
import org.apache.commons.codec.digest.DigestUtils;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.*;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * 微信服务
 */

@Service
public class WeChatService {
    Logger logger = Logger.getLogger(WeChatService.class);

    @Autowired
    private WxAccessTokenMapper wxAccessTokenMapper;
    @Autowired
    private WxUserInfoService wxUserInfoService;
    @Autowired
    private WxUserTagService wxUserTagService;

    /**
     * 通过参数校验信息是否是从微信服务器发过来的
     * @return
     */
    public Boolean checkSignature(String token, String timestamp, String nonce, String signature) {
        ArrayList<String> list = new ArrayList<String>();
        list.add(token);
        list.add(timestamp);
        list.add(nonce);
        Collections.sort(list);
        String mysignature = DigestUtils.shaHex(list.get(0) + list.get(1) + list.get(2));
        if (mysignature.equals(signature))
            return true;
        else
            return false;
    }

    /**
     * 处理微信发来的请求并推送消息
     * @param request
     * @return
     */
    @Transactional(value = "ds2", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
    public String processRequest(HttpServletRequest request){
        String respMessage = null;
        try {
            // 默认返回的文本消息内容
            String respContent = "请求处理异常，请稍候尝试！";
            // xml请求解析
            Map<String, String> requestMap = WeiXinMessageUtil.parseXml(request);
            // 发送方帐号(open_id)
            String fromUserName = requestMap.get("FromUserName");
            // 公众帐号
            String toUserName = requestMap.get("ToUserName");
            // 消息类型(文本、图片、链接、地理位置、音频、视频、小视频、事件推送)
            String msgType = requestMap.get("MsgType");
            // 事件类型
            // subscribe(订阅、未关注群体扫描二维码)、
            // unsubscribe(取消订阅)、
            // SCAN(已关注群体扫描二维码)、
            // LOCATION(上报地理位置事件)、
            // CLICK(自定义菜单点击事件)、
            // VIEW(点击自定义菜单跳转链接时的事件)
            String event = requestMap.get("Event");

            // 创建文本消息
            TextMessage textMessage = new TextMessage();
            textMessage.setToUserName(fromUserName);
            textMessage.setFromUserName(toUserName);
            textMessage.setCreateTime(new Date().getTime());
            textMessage.setMsgType(WeiXinMessageUtil.RESP_MESSAGE_TYPE_TEXT);

            // 创建图文消息
            NewsMessage newsMessage = new NewsMessage();
            newsMessage.setToUserName(fromUserName);
            newsMessage.setFromUserName(toUserName);
            newsMessage.setCreateTime(new Date().getTime());
            newsMessage.setMsgType(WeiXinMessageUtil.RESP_MESSAGE_TYPE_NEWS);

            List<Article> articleList = new ArrayList<Article>();

            // 文本消息
            if (msgType.equals(WeiXinMessageUtil.REQ_MESSAGE_TYPE_TEXT)) {
                // 接收文本消息内容
                String content = requestMap.get("Content");
                //如果用户发送表情，则回复同样表情。
                if (isQqFace(content)) {
                    respContent = content;
                    textMessage.setContent(respContent);
                    // 将文本消息对象转换成xml字符串
                    respMessage = WeiXinMessageUtil.textMessageToXml(textMessage);
                } else {
                    //回复固定消息
                    switch (content) {
                        case "1": {
                            StringBuffer buffer = new StringBuffer();
                            buffer.append("您好，我是国王\n请回复数字选择服务：").append("\n");
                            buffer.append("11 可测试单图文").append("\n");
                            buffer.append("12 可测试多图文发送").append("\n");
                            buffer.append("13 可测试网址").append("\n");
                            buffer.append("或者您可以尝试发送表情").append("\n");
                            buffer.append("回复“1”显示此帮助菜单").append("\n");
                            respContent = String.valueOf(buffer);
                            textMessage.setContent(respContent);
                            respMessage = WeiXinMessageUtil.textMessageToXml(textMessage);
                            break;
                        }
                        case "11": {
                            // 创建图文回复
                            Article article = new Article();
                            article.setTitle("图文");
                            // 图文回复消息中可以使用QQ表情、符号表情
                            article.setDescription("这是测试有没有换行\n\n如果有空行就代表换行成功\n\n点击图文可以跳转到百度首页");
                            // 图片
                            article.setPicUrl("http://www.sinaimg.cn/dy/slidenews/31_img/2016_38/28380_733695_698372.jpg");
                            // url
                            article.setUrl("http://www.baidu.com");
                            articleList.add(article);
                            newsMessage.setArticleCount(articleList.size());
                            newsMessage.setArticles(articleList);
                            respMessage = WeiXinMessageUtil.newsMessageToXml(newsMessage);
                            break;
                        }
                        case "12": {
                            //多图文发送
                            Article article1 = new Article();
                            article1.setTitle(emoji(0x1F604) + "腾讯");
                            article1.setDescription("");
                            article1.setPicUrl("http://image.zhichanjia.com/uploads/news/image/2016-08-26/1472204938262982.jpg");
                            article1.setUrl("http://www.qq.com");

                            Article article2 = new Article();
                            article2.setTitle(emoji(0x1F60C) + "B搜狐");
                            article2.setDescription("");
                            article2.setPicUrl("http://a0.att.hudong.com/76/63/01300542781809141326634339222_s.png");
                            article2.setUrl("http://www.sohu.com/");

                            Article article3 = new Article();
                            article3.setTitle(emoji(0x1F614) + "网易");
                            article3.setDescription("");
                            article3.setPicUrl("http://img.25pp.com/uploadfile/app/icon/20151223/1450840524330906.jpg");
                            article3.setUrl("http://www.163.com/");

                            articleList.add(article1);
                            articleList.add(article2);
                            articleList.add(article3);
                            newsMessage.setArticleCount(articleList.size());
                            newsMessage.setArticles(articleList);
                            respMessage = WeiXinMessageUtil.newsMessageToXml(newsMessage);
                            break;
                        }
                        case "13": {
                            // 测试网址回复
                            respContent = "<a href=\"http://www.baidu.com\">百度</a>\n<a href=\"http://www.qq.com\">腾讯</a>\n<a href=\"http://www.163.com\">网易</a>";
                            textMessage.setContent(respContent);
                            // 将文本消息对象转换成xml字符串
                            respMessage = WeiXinMessageUtil.textMessageToXml(textMessage);
                            break;
                        }
                        default: {
                            respContent = "很抱歉，现在小A暂时无法提供此功能给您使用。\n回复“1”显示帮助信息";
                            textMessage.setContent(respContent);
                            // 将文本消息对象转换成xml字符串
                            respMessage = WeiXinMessageUtil.textMessageToXml(textMessage);
                        }
                    }
                }
            }
            // 图片消息
            else if (msgType.equals(WeiXinMessageUtil.REQ_MESSAGE_TYPE_IMAGE)) {
                // TODO: 2017/9/6
            }
            // 地理位置消息
            else if (msgType.equals(WeiXinMessageUtil.REQ_MESSAGE_TYPE_LOCATION)) {
                // TODO: 2017/9/6
            }
            // 链接消息
            else if (msgType.equals(WeiXinMessageUtil.REQ_MESSAGE_TYPE_LINK)) {
                // TODO: 2017/9/6

            }
            // 音频消息
            else if (msgType.equals(WeiXinMessageUtil.REQ_MESSAGE_TYPE_VOICE)) {
                // TODO: 2017/9/6
            }
            // 视频消息
            else if (msgType.equals(WeiXinMessageUtil.REQ_MESSAGE_TYPE_VIDEO)) {
                // TODO: 2017/9/6
            }
            // 小视频消息
            else if (msgType.equals(WeiXinMessageUtil.REQ_MESSAGE_TYPE_SHORTVIDEO)) {
                // TODO: 2017/9/6
            }
            // 事件推送
            else if (msgType.equals(WeiXinMessageUtil.REQ_MESSAGE_TYPE_EVENT)) {
                // 事件类型
                // subscribe(订阅、未关注群体扫描二维码)
                if(event.equals(WeiXinMessageUtil.EVENT_TYPE_SUBSCRIBE)){
                    WxAccessToken accessToken = getWxAccessToken(request);
                    WxUserInfo userInfo = this.getUserInfo(accessToken.getAccessToken(), fromUserName);
                    if(userInfo != null){
                        WxUserInfo wxUserInfo = wxUserInfoService.getUserInfoByOpenId(userInfo.getOpenid());
                        if(wxUserInfo == null){
                            wxUserInfoService.insert(userInfo);
                        }else{
                            wxUserInfo.setSubscribe(userInfo.getSubscribe());
                            wxUserInfoService.update(wxUserInfo);
                        }
                    }
                    respContent = "亲爱的" + userInfo.getNickname() + "感谢你关注本公众号，\n回复“1”显示帮助信息";
                    textMessage.setContent(respContent);
                    // 将文本消息对象转换成xml字符串
                    respMessage = WeiXinMessageUtil.textMessageToXml(textMessage);
                }
                // unsubscribe(取消订阅)
                if(event.equals(WeiXinMessageUtil.EVENT_TYPE_UNSUBSCRIBE)){
                    WxAccessToken accessToken = getWxAccessToken(request);
                    WxUserInfo userInfo = this.getUserInfo(accessToken.getAccessToken(), fromUserName);
                    if(userInfo != null){
                        WxUserInfo wxUserInfo = wxUserInfoService.getUserInfoByOpenId(userInfo.getOpenid());
                        if(wxUserInfo != null){
                            wxUserInfo.setSubscribe(userInfo.getSubscribe());
                            wxUserInfoService.update(wxUserInfo);
                        }
                    }
                    respContent = "亲爱的" + userInfo.getNickname() + "感谢你一直以来对本公众号的支持！再见";
                    textMessage.setContent(respContent);
                    // 将文本消息对象转换成xml字符串
                    respMessage = WeiXinMessageUtil.textMessageToXml(textMessage);
                }
                // SCAN(已关注群体扫描二维码)
                if(event.equals(WeiXinMessageUtil.EVENT_TYPE_SCAN)){
                    // TODO: 2017/9/6
                }
                // LOCATION(上报地理位置事件)
                if(event.equals(WeiXinMessageUtil.EVENT_TYPE_LOCATION)){
                    // TODO: 2017/9/6
                }
                // CLICK(自定义菜单点击事件)
                if(event.equals(WeiXinMessageUtil.EVENT_TYPE_CLICK)){
                    // TODO: 2017/9/6
                }
                // VIEW(点击自定义菜单跳转链接时的事件)
                if(event.equals(WeiXinMessageUtil.EVENT_TYPE_VIEW)){
                    // TODO: 2017/9/6
                }
            }
        } catch (Exception e) {
            e.printStackTrace();
        }

        return respMessage;
    }

    /**
     * 获取微信access_token
     * @param request
     * @return
     */
    public WxAccessToken getWxAccessToken(HttpServletRequest request) {
        WxAccessToken accessToken = null;
        try {
            accessToken = wxAccessTokenMapper.getLatestWxAccessToken();
            if (accessToken != null && accessToken.getCreateMstime() != null) {
                if ((System.currentTimeMillis() / 1000) - (accessToken.getCreateMstime() / 1000) > 7200) {//微信access_token过期
                    accessToken = reqAccessToken(request);
                }
            } else { //微信access_token本地不存在
                accessToken = reqAccessToken(request);
            }
        } catch (Exception e) {
            logger.error("获取access_token异常,请稍后再试");
            e.printStackTrace();
        }
        return accessToken;
    }

    /**
     * 请求获取微信access_token
     * @RequestMethod GET
     * @param request
     * @return
     */
    @Transactional(value = "ds2", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
    public WxAccessToken reqAccessToken(HttpServletRequest request) throws Exception {
        WxAccessToken accessToken = null;
        Map<String, String> map = new TreeMap<String, String>();
        map.put("grant_type", Constants.WX.GRANT_TYPE);
        map.put("appid", Constants.WX.APPID);
        map.put("secret", Constants.WX.SECRET);
        String result = HttpUtils.sendGet(Constants.WX.ACCESS_TOKEN_URL, MapUtil.Join(map, "&"), "UTF-8");
        if(StringUtils.isNotBlank(result)){
            accessToken = JSONObject.parseObject(result, WxAccessToken.class);
            if(StringUtils.isNotBlank(accessToken.getAccessToken()) && accessToken.getExpiresIn() != null){
                accessToken.setAccessIp(NetworkUtil.getIpAddress(request));
                accessToken.setCreateMstime(System.currentTimeMillis());
                accessToken.setCreateTime(new Date());
                wxAccessTokenMapper.insertSelective(accessToken);
            }
        }
        return accessToken;
    }

    /**
     * 获取微信服务器IP地址
     * @RequestMethod GET
     * @param accessToken
     * @return
     */
    public JSONObject getWxCallbackIp(String accessToken) {
        String result = HttpUtils.sendGet(Constants.WX.CALLBACK_IP_URL, "access_token=" + accessToken, "UTF-8");
        return JSONObject.parseObject(result);
    }

    /**
     * 获取公众号已创建的标签
     * @RequestMethod GET
     * @param accessToken
     * @return
     */
    public List<WxUserTag> getTagList(String accessToken) {
        List<WxUserTag> userTagList = null;
        String result = HttpUtils.sendGet(Constants.WX.GET_TAGS_LIST_URL, "access_token=" + accessToken, "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            JSONObject jsonObject = JSONObject.parseObject(result);
            if(StringUtils.isNotBlank(jsonObject.getString("tags"))){
                userTagList = JSONObject.parseArray(jsonObject.getString("tags"), WxUserTag.class);
            }
        }
        return userTagList;
    }

    /**
     * 创建用户标签
     * @RequestMethod POST
     * @param accessToken
     * @param name 标签名称
     * @return
     */
    public WxUserTag createTag(String accessToken, String name) {
        WxUserTag userTag = null;
        JSONObject paramJson = new JSONObject();
        JSONObject nameJson = new JSONObject();
        nameJson.put("name", name);
        paramJson.put("tag", nameJson);
        String result = HttpUtils.sendPost(Constants.WX.CREATE_TAGS_URL + "?access_token=" + accessToken,  paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            JSONObject jsonObject = JSONObject.parseObject(result);
            if(StringUtils.isNotBlank(jsonObject.getString("errcode"))){
                userTag = JSONObject.parseObject(result, WxUserTag.class);
            }
            if(StringUtils.isNotBlank(jsonObject.getString("tag"))){
                userTag = JSONObject.parseObject(jsonObject.getString("tag"), WxUserTag.class);
            }
        }
        return userTag;
    }

    /**
     * 编辑用户标签
     * @RequestMethod POST
     * @param accessToken
     * @param id 标签id
     * @param name 标签名称
     * @return
     */
    @Transactional(value = "ds2", propagation= Propagation.REQUIRED, rollbackFor = RuntimeException.class)
    public WxErrMsg updateTag(String accessToken, Integer id, String name) {
        WxErrMsg errMsg = null;
        JSONObject paramJson = new JSONObject();
        JSONObject idnameJson = new JSONObject();
        idnameJson.put("id", id);
        idnameJson.put("name", name);
        paramJson.put("tag", idnameJson);
        String result = HttpUtils.sendPost(Constants.WX.UPDATE_TAGS_URL + "?access_token=" + accessToken,  paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            errMsg = JSONObject.parseObject(result, WxErrMsg.class);
        }
        return errMsg;
    }

    /**
     * 删除用户标签
     * @RequestMethod POST
     * @param accessToken
     * @param id 标签id
     * @param name 标签名称
     * @return
     */
    public WxErrMsg deleteTag(String accessToken, Integer id) {
        WxErrMsg errMsg = null;
        JSONObject paramJson = new JSONObject();
        JSONObject idJson = new JSONObject();
        idJson.put("id", id);
        paramJson.put("tag", idJson);
        String result = HttpUtils.sendPost(Constants.WX.DELETE_TAGS_URL + "?access_token=" + accessToken,  paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            errMsg = JSONObject.parseObject(result, WxErrMsg.class);
        }
        return errMsg;
    }

    /**
     * 获取标签下粉丝列表
     * @RequestMethod GET
     * @param accessToken
     * @param tagid 标签id
     * @param nextOpenid 第一个拉取的OPENID，不填默认从头开始拉取
     * @return
     */
    public WxRespData getTagUserList(String accessToken, Integer tagid, String nextOpenid) {
        WxRespData respData = new WxRespData();
        List<String> openids = new ArrayList<String>();
        JSONObject paramJson = new JSONObject();
        paramJson.put("tagid", tagid);
        if(StringUtils.isNotBlank(nextOpenid)){
            paramJson.put("next_openid", nextOpenid);
        }
        String result = HttpUtils.sendJsonGet(Constants.WX.GET_TAG_USER_LIST_URL + "?access_token=" + accessToken,  paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            JSONObject jsonObject = JSONObject.parseObject(result);
            if(StringUtils.isNotBlank(jsonObject.getString("errcode"))){
                respData = JSONObject.parseObject(result, WxRespData.class);
            }
            if(StringUtils.isNotBlank(jsonObject.getString("data"))){
                JSONObject openidJson = JSONObject.parseObject(jsonObject.getString("data"));
                openids = JSONObject.parseArray(openidJson.getString("openid"), String.class);
                respData.setOpenidlist(openids);
            }
            if(StringUtils.isNotBlank(jsonObject.getString("count"))){
                respData.setCount(Integer.valueOf(jsonObject.getString("count")));
            }
            if(StringUtils.isNotBlank(jsonObject.getString("next_openid"))){
                respData.setNextOpenid(jsonObject.getString("next_openid"));
            }
        }
        return respData;
    }

    /**
     * 批量为用户打标签
     * @RequestMethod POST
     * @param accessToken
     * @param tagid 标签id
     * @param openids 用户标识列表
     * @return
     */
    public WxErrMsg batchTaggingTag(String accessToken, Integer tagid, List<String> openids) {
        WxErrMsg errMsg = null;
        JSONObject paramJson = new JSONObject();
        JSONArray openidListJsonArr = JSONArray.parseArray(JSON.toJSONString(openids));
        paramJson.put("tagid", tagid);
        paramJson.put("openid_list", openidListJsonArr);
        String result = HttpUtils.sendPost(Constants.WX.BATCHTAGGING_URL + "?access_token=" + accessToken, paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            errMsg = JSONObject.parseObject(result, WxErrMsg.class);
        }
        return errMsg;
    }

    /**
     * 批量为用户取消标签
     * @RequestMethod POST
     * @param accessToken
     * @param tagid 标签id
     * @param openids 用户标识列表
     * @return
     */
    public WxErrMsg batchUnTaggingTag(String accessToken, Integer tagid, List<String> openids) {
        WxErrMsg errMsg = null;
        JSONObject paramJson = new JSONObject();
        JSONArray openidListJsonArr = JSONArray.parseArray(JSON.toJSONString(openids));
        paramJson.put("tagid", tagid);
        paramJson.put("openid_list", openidListJsonArr);
        String result = HttpUtils.sendPost(Constants.WX.BATCHUNTAGGING_URL + "?access_token=" + accessToken, paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            errMsg = JSONObject.parseObject(result, WxErrMsg.class);
        }
        return errMsg;
    }

    /**
     * 获取用户身上的标签列表
     * @RequestMethod POST
     * @param accessToken
     * @param openid 用户标识
     * @return
     */
    public List<WxUserTag> getUserTagIdList(String accessToken, String openid) {
        List<WxUserTag> userTagList = new ArrayList<WxUserTag>() ;
        JSONObject paramJson = new JSONObject();
        paramJson.put("openid", openid);
        String result = HttpUtils.sendPost(Constants.WX.GET_USER_TAGID_LIST_URL + "?access_token=" + accessToken, paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            JSONObject jsonObject = JSONObject.parseObject(result);
            if(StringUtils.isBlank(jsonObject.getString("errcode"))){
                if(StringUtils.isNotBlank(jsonObject.getString("tagid_list"))){
                    List<String> tagidList = JSONObject.parseArray(jsonObject.getString("tagid_list"), String.class);
                    for(String id : tagidList){
                        WxUserTag userTag = wxUserTagService.getModel(NumberUtil.getInt(id));
                        if(userTag != null){
                            userTagList.add(userTag);
                        }
                    }
                }
            }
        }
        return userTagList;
    }

    /**
     * 设置用户备注名
     * @RequestMethod POST
     * @param accessToken
     * @param openid 用户标识
     * @param remark 新的备注名，长度必须小于30字符
     * @return
     */
    public WxErrMsg updateRemark(String accessToken, String openid, String remark) {
        WxErrMsg errMsg = null;
        JSONObject paramJson = new JSONObject();
        paramJson.put("openid", openid);
        paramJson.put("remark", remark);
        String result = HttpUtils.sendPost(Constants.WX.UPDATE_REMARK_URL + "?access_token=" + accessToken, paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            errMsg = JSONObject.parseObject(result, WxErrMsg.class);
        }
        return errMsg;
    }

    /**
     * 获取用户列表
     * @RequestMethod GET
     * @param accessToken
     * @param nextOpenid 第一个拉取的OPENID，不填默认从头开始拉取
     * @return
     */
    public WxRespData getUserList(String accessToken, String nextOpenid) {
        WxRespData respData = new WxRespData();
        List<String> openids = new ArrayList<String>();
        Map<String, String> map = new TreeMap<String, String>();
        map.put("access_token", accessToken);
        if(StringUtils.isNotBlank(nextOpenid)){
            map.put("next_openid", nextOpenid);
        }
        String result = HttpUtils.sendGet(Constants.WX.GET_USER_LIST_URL, MapUtil.Join(map, "&"), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            JSONObject jsonObject = JSONObject.parseObject(result);
            if(StringUtils.isNotBlank(jsonObject.getString("data"))){
                JSONObject dataJson = JSONObject.parseObject(jsonObject.getString("data"));
                openids = JSONObject.parseArray(dataJson.getString("openid"), String.class);
                respData.setOpenidlist(openids);
            }
            if(StringUtils.isNotBlank(jsonObject.getString("count"))){
                respData.setCount(Integer.valueOf(jsonObject.getString("count")));
            }
            if(StringUtils.isNotBlank(jsonObject.getString("total"))){
                respData.setTotal(Integer.valueOf(jsonObject.getString("total")));
            }
            if(StringUtils.isNotBlank(jsonObject.getString("next_openid"))){
                respData.setNextOpenid(jsonObject.getString("next_openid"));
            }
        }
        return respData;
    }

    /**
     * 获取用户基本信息(UnionID机制)
     * @RequestMethod GET
     * @param accessToken
     * @param openid 用户标识
     * @return
     */
    public WxUserInfo getUserInfo(String accessToken, String openid) {
        WxUserInfo userInfo = null;
        Map<String, String> map = new TreeMap<String, String>();
        map.put("access_token", accessToken);
        map.put("openid", openid);
        map.put("lang", "zh_CN");
        String result = HttpUtils.sendGet(Constants.WX.GET_USER_INFO_URL, MapUtil.Join(map, "&"), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            userInfo = JSONObject.parseObject(result, WxUserInfo.class);
        }
        return userInfo;
    }

    /**
     * 批量获取用户基本信息
     * @RequestMethod POST
     * @param accessToken
     * @param openids 用户标识列表
     * @return
     */
    public List<WxUserInfo> getUserInfoList(String accessToken, List<String> openids) {
        List<WxUserInfo> userInfoList = null;
        JSONObject paramJson = new JSONObject();
        JSONArray userJsonArr = new JSONArray();
        for (String openid : openids) {
            if (!openid.equals("")) {
                JSONObject userJson = new JSONObject();
                userJson.put("openid", openid);
                userJson.put("lang", "zh_CN");
                userJsonArr.add(userJson);
            }
        }
        paramJson.put("user_list", userJsonArr);
        String result = HttpUtils.sendPost(Constants.WX.GET_USER_INFO_LIST_URL + "?access_token=" + accessToken,  paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            JSONObject jsonObject = JSONObject.parseObject(result);
            userInfoList = JSONObject.parseArray(jsonObject.getString("user_info_list"), WxUserInfo.class);
        }
        return userInfoList;
    }

    /**
     * 获取公众号的黑名单列表
     * @RequestMethod POST
     * @param accessToken
     * @param openids 用户标识列表
     * @return
     */
    public WxRespData getBlackList(String accessToken, String beginOpenid) {
        WxRespData respData = new WxRespData();
        List<String> openids = new ArrayList<String>();
        JSONObject paramJson = new JSONObject();
        if(StringUtils.isNotBlank(beginOpenid)){
            paramJson.put("begin_openid", beginOpenid);
        }
        String result = HttpUtils.sendPost(Constants.WX.GET_BLACKLIST_URL + "?access_token=" + accessToken,  paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            JSONObject jsonObject = JSONObject.parseObject(result);
            if(StringUtils.isNotBlank(jsonObject.getString("errcode"))){
                respData = JSONObject.parseObject(result, WxRespData.class);
            }
            if(StringUtils.isNotBlank(jsonObject.getString("data"))){
                JSONObject openidJson = JSONObject.parseObject(jsonObject.getString("data"));
                openids = JSONObject.parseArray(openidJson.getString("openid"), String.class);
                respData.setOpenidlist(openids);
            }
            if(StringUtils.isNotBlank(jsonObject.getString("total"))){
                respData.setTotal(Integer.valueOf(jsonObject.getString("total")));
            }
            if(StringUtils.isNotBlank(jsonObject.getString("count"))){
                respData.setCount(Integer.valueOf(jsonObject.getString("count")));
            }
            if(StringUtils.isNotBlank(jsonObject.getString("next_openid"))){
                respData.setNextOpenid(jsonObject.getString("next_openid"));
            }
        }
        return respData;
    }

    /**
     * 批量拉黑用户
     * @RequestMethod POST
     * @param accessToken
     * @param openids 用户标识列表
     * @return
     */
    public WxErrMsg batchBlackList(String accessToken, List<String> openids) {
        WxErrMsg errMsg = null;
        JSONObject paramJson = new JSONObject();
        JSONArray openidListJsonArr = JSONArray.parseArray(JSON.toJSONString(openids));
        paramJson.put("openid_list", openidListJsonArr);
        String result = HttpUtils.sendPost(Constants.WX.BATCHBLACKLIST_URL + "?access_token=" + accessToken, paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            errMsg = JSONObject.parseObject(result, WxErrMsg.class);
        }
        return errMsg;
    }

    /**
     * 批量取消拉黑用户
     * @RequestMethod POST
     * @param accessToken
     * @param openids 用户标识列表
     * @return
     */
    public WxErrMsg batchUnBlackList(String accessToken, List<String> openids) {
        WxErrMsg errMsg = null;
        JSONObject paramJson = new JSONObject();
        JSONArray openidListJsonArr = JSONArray.parseArray(JSON.toJSONString(openids));
        paramJson.put("openid_list", openidListJsonArr);
        String result = HttpUtils.sendPost(Constants.WX.BATCHUNBLACKLIST_URL + "?access_token=" + accessToken, paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            errMsg = JSONObject.parseObject(result, WxErrMsg.class);
        }
        return errMsg;
    }

    /**
     * 获取自定义菜单配置接口(官网和API创建)
     * @RequestMethod GET
     * @param accessToken
     * @return
     */
    public JSONObject getCurrentSelfmenuInfoList(String accessToken) {
        JSONObject jsonObject = null;
        String result = HttpUtils.sendGet(Constants.WX.GET_CURRENT_SELFMENU_INFO_URL, "access_token=" + accessToken, "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            jsonObject = JSONObject.parseObject(result);
        }
        return jsonObject;
    }

    /**
     * 自定义菜单查询接口(API创建，包含个性化菜单)
     * @RequestMethod GET
     * @param accessToken
     * @return
     */
    public WxRespJson getMenuList(String accessToken) {
        WxErrMsg errMsg = null;
        WxRespJson respJson = new WxRespJson();
        String result = HttpUtils.sendGet(Constants.WX.GET_MENU_LIST_URL, "access_token=" + accessToken, "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            JSONObject jsonObject = JSONObject.parseObject(result);
            if(StringUtils.isNotBlank(jsonObject.getString("errcode"))){
                errMsg = JSONObject.parseObject(result, WxErrMsg.class);
                respJson.setWxErrMsg(errMsg);
            }else{
                respJson.setJsonData(jsonObject);
            }
        }
        return respJson;
    }

    /**
     * 自定义菜单创建接口
     * @RequestMethod POST
     * @param accessToken
     * @return
     */
    public WxRespJson createMenu(String accessToken, String menuStr) {
        WxErrMsg errMsg = null;
        WxRespJson respJson = new WxRespJson();
        JSONObject paramJson = JSONObject.parseObject(menuStr);
        String result = HttpUtils.sendPost(Constants.WX.CREATE_MENU_URL + "?access_token=" + accessToken, paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            JSONObject jsonObject = JSONObject.parseObject(result);
            if(StringUtils.isNotBlank(jsonObject.getString("errcode"))){
                errMsg = JSONObject.parseObject(result, WxErrMsg.class);
                respJson.setWxErrMsg(errMsg);
            }else{
                respJson.setJsonData(jsonObject);
            }
        }
        return respJson;
    }

    /**
     * 自定义菜单删除接口(包含个性化菜单)
     * @RequestMethod GET
     * @param accessToken
     * @return
     */
    public WxErrMsg deleteMenu(String accessToken) {
        WxErrMsg errMsg = null;
        String result = HttpUtils.sendGet(Constants.WX.DELETE_MENU_URL, "access_token=" + accessToken, "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            errMsg = JSONObject.parseObject(result, WxErrMsg.class);
        }
        return errMsg;
    }

    /**
     * 创建个性化菜单
     * @RequestMethod POST
     * @param accessToken
     * @return
     */
    public WxMenuData addConditionalMenu(String accessToken, String conditionalMenuStr) {
        WxMenuData menuData = null;
        JSONObject paramJson = JSONObject.parseObject(conditionalMenuStr);
        String result = HttpUtils.sendPost(Constants.WX.ADD_CONDITIONAL_MENU_URL + "?access_token=" + accessToken, paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            menuData = JSONObject.parseObject(result, WxMenuData.class);
        }
        return menuData;
    }

    /**
     * 删除个性化菜单
     * @RequestMethod POST
     * @param accessToken
     * @return
     */
    public WxErrMsg delConditionalMenu(String accessToken, String menuId) {
        WxErrMsg errMsg = null;
        JSONObject paramJson = new JSONObject();
        paramJson.put("menuid", menuId);
        String result = HttpUtils.sendPost(Constants.WX.DEL_CONDITIONAL_MENU_URL + "?access_token=" + accessToken, paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            errMsg = JSONObject.parseObject(result, WxErrMsg.class);
        }
        return errMsg;
    }

    /**
     * 测试个性化菜单匹配结果
     * @RequestMethod POST
     * @param accessToken
     * @return
     */
    public WxRespJson trymatchMenu(String accessToken, String openid) {
        WxErrMsg errMsg = null;
        WxRespJson respJson = new WxRespJson();
        JSONObject paramJson = new JSONObject();
        paramJson.put("user_id", openid);
        String result = HttpUtils.sendPost(Constants.WX.TRYMATCH_MENU_URL + "?access_token=" + accessToken, paramJson.toJSONString(), "UTF-8");
        if(StringUtils.isNotBlank(result)) {
            JSONObject jsonObject = JSONObject.parseObject(result);
            if(StringUtils.isNotBlank(jsonObject.getString("errcode"))){
                errMsg = JSONObject.parseObject(result, WxErrMsg.class);
                respJson.setWxErrMsg(errMsg);
            }else{
                respJson.setJsonData(jsonObject);
            }
        }
        return respJson;
    }














































    /**
     * emoji表情转换(hex -> utf-16)
     * @param hexEmoji
     * @return
     */
    public static String emoji(int hexEmoji) {
        return String.valueOf(Character.toChars(hexEmoji));
    }

    /**
     * 判断是否是QQ表情
     * @param content
     * @return
     */
    public static boolean isQqFace(String content) {
        boolean result = false;
        // 判断QQ表情的正则表达式
        String qqfaceRegex = "/::\\)|/::~|/::B|/::\\||/:8-\\)|/::<|/::$|/::X|/::Z|/::'\\(|/::-\\||/::@|/::P|/::D|/::O|/::\\(|/::\\+|/:--b|/::Q|/::T|/:,@P|/:,@-D|/::d|/:,@o|/::g|/:\\|-\\)|/::!|/::L|/::>|/::,@|/:,@f|/::-S|/:\\?|/:,@x|/:,@@|/::8|/:,@!|/:!!!|/:xx|/:bye|/:wipe|/:dig|/:handclap|/:&-\\(|/:B-\\)|/:<@|/:@>|/::-O|/:>-\\||/:P-\\(|/::'\\||/:X-\\)|/::\\*|/:@x|/:8\\*|/:pd|/:<W>|/:beer|/:basketb|/:oo|/:coffee|/:eat|/:pig|/:rose|/:fade|/:showlove|/:heart|/:break|/:cake|/:li|/:bome|/:kn|/:footb|/:ladybug|/:shit|/:moon|/:sun|/:gift|/:hug|/:strong|/:weak|/:share|/:v|/:@\\)|/:jj|/:@@|/:bad|/:lvu|/:no|/:ok|/:love|/:<L>|/:jump|/:shake|/:<O>|/:circle|/:kotow|/:turn|/:skip|/:oY|/:#-0|/:hiphot|/:kiss|/:<&|/:&>";
        Pattern p = Pattern.compile(qqfaceRegex);
        Matcher m = p.matcher(content);
        if (m.matches()) {
            result = true;
        }
        return result;
    }



}
