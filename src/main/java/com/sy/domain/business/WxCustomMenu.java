package com.sy.domain.business;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;

/**
 * 自定义菜单
 */
public class WxCustomMenu extends WxErrMsg {
    /**
     * 主键
     */
    private Integer id;

    /**
     * 一级菜单数组，个数应为1~3个
     */
    private String button;

    /**
     * 二级菜单数组，个数应为1~5个
     */
    @JSONField(name="sub_button")
    private String subButton;

    /**
     * 菜单的响应动作类型，view表示网页类型，click表示点击类型，miniprogram表示小程序类型
     */
    private String type;

    /**
     * 菜单标题，不超过16个字节，子菜单不超过60个字节
     */
    private String name;

    /**
     * 菜单KEY值，用于消息接口推送，不超过128字节;click等点击类型必须
     */
    private String key;

    /**
     * 网页链接，用户点击菜单可打开链接，不超过1024字节。type为miniprogram时，不支持小程序的老版本客户端将打开本url。view、miniprogram类型必须
     */
    private String url;

    /**
     * 调用新增永久素材接口返回的合法media_id;media_id类型和view_limited类型必须
     */
    @JSONField(name="media_id")
    private String mediaId;

    /**
     * 小程序的appid（仅认证公众号可配置）,miniprogram类型必须
     */
    private String appid;

    /**
     * 小程序的页面路径;miniprogram类型必须
     */
    private String pagepath;

    /**
     * 创建时间
     */
    private Date createTime;


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getButton() {
        return button;
    }

    public void setButton(String button) {
        this.button = button;
    }

    public String getSubButton() {
        return subButton;
    }

    public void setSubButton(String subButton) {
        this.subButton = subButton;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getMediaId() {
        return mediaId;
    }

    public void setMediaId(String mediaId) {
        this.mediaId = mediaId;
    }

    public String getAppid() {
        return appid;
    }

    public void setAppid(String appid) {
        this.appid = appid;
    }

    public String getPagepath() {
        return pagepath;
    }

    public void setPagepath(String pagepath) {
        this.pagepath = pagepath;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}