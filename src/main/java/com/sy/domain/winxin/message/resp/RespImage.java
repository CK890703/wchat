package com.sy.domain.winxin.message.resp;

import java.io.Serializable;

/**
 * 图片消息
 */
public class RespImage implements Serializable{

    //图片消息媒体id，可以调用多媒体文件下载接口拉取数据。
    private String MediaId;

    public String getMediaId() {
        return MediaId;
    }

    public void setMediaId(String mediaId) {
        MediaId = mediaId;
    }
}
