package com.sy.domain.winxin.message.event;

/**
 * 自定义菜单事件
 */
public class CustomMenuMessage extends EvBaseMessage{

    // 事件类型：CLICK(点击菜单拉取消息)、VIEW(点击菜单跳转链接)
    private String Event;
    // CLICK：事件KEY值，与自定义菜单接口中KEY值对应；VIEW：事件KEY值，设置的跳转URL
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
