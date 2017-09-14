package com.sy.domain.winxin.message.resp;


import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 回复语音消息
 */
public class VoiceMessage extends RespBaseMessage {

    @XStreamAlias("Voice")
    private RespVoice voice;

    public RespVoice getVoice() {
        return voice;
    }

    public void setVoice(RespVoice voice) {
        this.voice = voice;
    }
}
