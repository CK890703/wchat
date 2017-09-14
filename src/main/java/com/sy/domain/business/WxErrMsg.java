package com.sy.domain.business;

import com.alibaba.fastjson.annotation.JSONField;

import java.io.Serializable;

public class WxErrMsg implements Serializable{

    /**
     * 返回码
     */
    @JSONField(name="errcode")
    private String errcode;

    /**
     * 返回码说明(具体请参考https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1433747234)
     */
    @JSONField(name="errmsg")
    private String errmsg;

    public String getErrcode() {
        return errcode;
    }

    public void setErrcode(String errcode) {
        this.errcode = errcode;
    }

    public String getErrmsg() {
        return errmsg;
    }

    public void setErrmsg(String errmsg) {
        this.errmsg = errmsg;
    }
}
