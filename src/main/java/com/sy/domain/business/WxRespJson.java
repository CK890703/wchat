package com.sy.domain.business;


import com.alibaba.fastjson.JSONObject;


public class WxRespJson{

    private JSONObject jsonData;
    private WxErrMsg wxErrMsg;

    public JSONObject getJsonData() {
        return jsonData;
    }

    public void setJsonData(JSONObject jsonData) {
        this.jsonData = jsonData;
    }

    public WxErrMsg getWxErrMsg() {
        return wxErrMsg;
    }

    public void setWxErrMsg(WxErrMsg wxErrMsg) {
        this.wxErrMsg = wxErrMsg;
    }
}
