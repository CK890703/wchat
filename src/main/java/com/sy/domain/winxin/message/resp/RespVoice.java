package com.sy.domain.winxin.message.resp;


import java.io.Serializable;

/**
 * 语音消息
 */
public class RespVoice implements Serializable {

    // 通过素材管理中的接口上传多媒体文件，得到的id
    private String MediaId;

    public String getMediaId() {
        return MediaId;
    }

    public void setMediaId(String mediaId) {
        MediaId = mediaId;
    }

}
