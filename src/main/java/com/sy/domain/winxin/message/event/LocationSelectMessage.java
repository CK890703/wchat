package com.sy.domain.winxin.message.event;

/**
 * 弹出地理位置选择器的事件推送
 */
public class LocationSelectMessage extends EvBaseMessage{

    // 事件类型：location_select
    private String Event;
    // 事件KEY值，由开发者在创建菜单时设定
    private String EventKey;
    // 发送的位置信息
    private String SendLocationInfo;
    // X坐标信息
    private String Location_X;
    // Y坐标信息
    private String Location_Y;
    // 精度，可理解为精度或者比例尺、越精细的话 scale越高
    private String Scale;
    // 地理位置的字符串信息
    private String Label;
    // 朋友圈POI的名字，可能为空
    private String Poiname;

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

    public String getSendLocationInfo() {
        return SendLocationInfo;
    }

    public void setSendLocationInfo(String sendLocationInfo) {
        SendLocationInfo = sendLocationInfo;
    }

    public String getLocation_X() {
        return Location_X;
    }

    public void setLocation_X(String location_X) {
        Location_X = location_X;
    }

    public String getLocation_Y() {
        return Location_Y;
    }

    public void setLocation_Y(String location_Y) {
        Location_Y = location_Y;
    }

    public String getScale() {
        return Scale;
    }

    public void setScale(String scale) {
        Scale = scale;
    }

    public String getLabel() {
        return Label;
    }

    public void setLabel(String label) {
        Label = label;
    }

    public String getPoiname() {
        return Poiname;
    }

    public void setPoiname(String poiname) {
        Poiname = poiname;
    }
}
