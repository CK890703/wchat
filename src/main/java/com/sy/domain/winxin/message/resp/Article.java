package com.sy.domain.winxin.message.resp;


import java.io.Serializable;

/**
 * 图文
 */
public class Article implements Serializable{

    // 图文消息名称
    private String Title;

    // 图文消息描述
    private String Description;

    // 图片链接，图片链接，支持JPG、PNG格式，较好的效果为大图360*200，小图200*200
    private String PicUrl;

    // 点击图文消息跳转链接
    private String Url;

    public String getTitle() {
        return Title;
    }

    public void setTitle(String title) {
        Title = title;
    }

    public String getDescription() {
        return Description;
    }

    public void setDescription(String description) {
        Description = description;
    }

    public String getPicUrl() {
        return PicUrl;
    }

    public void setPicUrl(String picUrl) {
        PicUrl = picUrl;
    }

    public String getUrl() {
        return Url;
    }

    public void setUrl(String url) {
        Url = url;
    }
}
