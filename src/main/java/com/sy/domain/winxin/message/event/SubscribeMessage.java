package com.sy.domain.winxin.message.event;

/**
 * 关注/取消关注事件
 */
public class SubscribeMessage extends EvBaseMessage{

    // 事件类型：subscribe(订阅)、unsubscribe(取消订阅)
    private String Event;

    public String getEvent() {
        return Event;
    }

    public void setEvent(String event) {
        Event = event;
    }
}
