package com.sy.domain.winxin.message.event;

/**
 * 扫码推事件且弹出“消息接收中”提示框的事件推送
 */
public class ScanCodeWaitMsgMessage extends EvBaseMessage{

    // 事件类型: scancode_waitmsg
    private String Event;
    // 事件KEY值，由开发者在创建菜单时设定
    private String EventKey;
    // 扫描信息
    private String ScanCodeInfo;
    // 扫描类型，一般是qrcode
    private String ScanType;
    // 扫描结果，即二维码对应的字符串信息
    private String ScanResult;

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

    public String getScanCodeInfo() {
        return ScanCodeInfo;
    }

    public void setScanCodeInfo(String scanCodeInfo) {
        ScanCodeInfo = scanCodeInfo;
    }

    public String getScanType() {
        return ScanType;
    }

    public void setScanType(String scanType) {
        ScanType = scanType;
    }

    public String getScanResult() {
        return ScanResult;
    }

    public void setScanResult(String scanResult) {
        ScanResult = scanResult;
    }
}
