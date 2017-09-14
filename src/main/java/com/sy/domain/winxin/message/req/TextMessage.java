package com.sy.domain.winxin.message.req;

/**
 * 接收文本消息
 */
public class TextMessage extends ReqBaseMessage {

    // 消息内容
    private String Content;

    public String getContent() {
        return Content;
    }

    public void setContent(String content) {
        Content = content;
    }
}
