package com.sy.domain.winxin.message.event;

/**
 * 点击菜单拉取消息时的事件推送
 */
public class ClickMenuMessage extends EvBaseMessage{

    // 事件类型：CLICK(点击菜单拉取消息)
    private String Event;
    // CLICK：事件KEY值，与自定义菜单接口中KEY值对应
    private String EventKey;

    public String getEvent() {
        return Event;
    }

    public void setEvent(String event) {
        Event = event;
    }

    public String getEventKey() {
        return EventKey;
    }

    public void setEventKey(String eventKey) {
        EventKey = eventKey;
    }
}
