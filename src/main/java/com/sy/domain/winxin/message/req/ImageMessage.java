package com.sy.domain.winxin.message.req;

/**
 * 接收图片消息
 */
public class ImageMessage extends ReqBaseMessage {
    // 图片链接
    private String PicUrl;

    //图片消息媒体id，可以调用多媒体文件下载接口拉取数据。
    private String MediaId;

    public String getPicUrl() {
        return PicUrl;
    }

    public void setPicUrl(String picUrl) {
        PicUrl = picUrl;
    }

    public String getMediaId() {
        return MediaId;
    }

    public void setMediaId(String mediaId) {
        MediaId = mediaId;
    }
}
