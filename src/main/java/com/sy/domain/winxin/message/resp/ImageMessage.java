package com.sy.domain.winxin.message.resp;


import com.thoughtworks.xstream.annotations.XStreamAlias;
import com.thoughtworks.xstream.annotations.XStreamAsAttribute;

/**
 * 图片消息
 */
public class ImageMessage extends RespBaseMessage {

    @XStreamAlias("Image")
    private RespImage image;

    public RespImage getImage() {
        return image;
    }

    public void setImage(RespImage image) {
        this.image = image;
    }
}
