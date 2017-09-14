package com.sy.domain.winxin.message.event;

/**
 * 扫描带参数二维码事件
 */
public class ScanQrCodeMessage extends EvBaseMessage{

    // 事件类型：subscribe(用户未关注时)、SCAN(用户已关注)
    private String Event;
    // subscribe：事件KEY值，qrscene_为前缀，后面为二维码的参数值;SCAN：事件KEY值，是一个32位无符号整数，即创建二维码时的二维码scene_id
    private String EventKey;
    // 二维码的ticket，可用来换取二维码图片
    private String Ticket;

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

    public String getTicket() {
        return Ticket;
    }

    public void setTicket(String ticket) {
        Ticket = ticket;
    }
}
