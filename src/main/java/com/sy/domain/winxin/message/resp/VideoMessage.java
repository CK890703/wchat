package com.sy.domain.winxin.message.resp;


import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 回复视频消息
 */
public class VideoMessage extends RespBaseMessage {

    @XStreamAlias("Video")
    private RespVideo video;

    public RespVideo getVideo() {
        return video;
    }

    public void setVideo(RespVideo video) {
        this.video = video;
    }
}
