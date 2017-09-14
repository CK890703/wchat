package com.sy.domain.winxin.message.resp;


import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 回复音乐消息
 */
public class MusicMessage extends RespBaseMessage {

    @XStreamAlias("Music")
    private RespMusic music;

    public RespMusic getMusic() {
        return music;
    }

    public void setMusic(RespMusic music) {
        this.music = music;
    }
}
