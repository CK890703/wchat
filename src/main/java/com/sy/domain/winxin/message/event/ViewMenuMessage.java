package com.sy.domain.winxin.message.event;

import com.thoughtworks.xstream.annotations.XStreamAlias;

/**
 * 点击菜单跳转链接时的事件推送
 */
public class ViewMenuMessage extends EvBaseMessage{

    // 事件类型：VIEW(点击菜单跳转链接)
    private String Event;
    // VIEW：事件KEY值，设置的跳转URL
    private String EventKey;
    // 菜单ID，如果是个性化菜单，则可以通过这个字段，知道是哪个规则的菜单被点击了。
    @XStreamAlias("MenuId")
    private String MenuID;

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

    public String getMenuID() {
        return MenuID;
    }

    public void setMenuID(String menuID) {
        MenuID = menuID;
    }
}
