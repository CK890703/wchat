package com.sy.domain.business;

import com.alibaba.fastjson.annotation.JSONField;

import java.util.Date;

public class WxAccessToken extends WxErrMsg {
    /**
     * 主键
     * 表字段 : wx_access_token.id
     */
    private Integer id;

    /**
     * access_token凭证
     * 表字段 : wx_access_token.access_token
     */
    @JSONField(name="access_token")
    private String accessToken;

    /**
     * 凭证有效时间，单位：秒
     * 表字段 : wx_access_token.expires_in
     */
    @JSONField(name="expires_in")
    private Long expiresIn;

    /**
     * 访问IP
     * 表字段 : wx_access_token.access_ip
     */
    private String accessIp;

    /**
     * 凭证创建时间(毫秒数)
     * 表字段 : wx_access_token.create_mstime
     */
    private Long createMstime;

    /**
     * 凭证创建时间
     * 表字段 : wx_access_token.create_time
     */
    private Date createTime;

    /**
     * 获取：主键
     * 表字段：wx_access_token.id
     *
     * @return wx_access_token.id：主键
     */
    public Integer getId() {
        return id;
    }

    /**
     * 设置：主键
     * 表字段：wx_access_token.id
     *
     * @param id
     *            wx_access_token.id：主键
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 获取：access_token凭证
     * 表字段：wx_access_token.access_token
     *
     * @return wx_access_token.access_token：access_token凭证
     */
    public String getAccessToken() {
        return accessToken;
    }

    /**
     * 设置：access_token凭证
     * 表字段：wx_access_token.access_token
     *
     * @param accessToken
     *            wx_access_token.access_token：access_token凭证
     */
    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken == null ? null : accessToken.trim();
    }

    /**
     * 获取：凭证有效时间，单位：秒
     * 表字段：wx_access_token.expires_in
     *
     * @return wx_access_token.expires_in：凭证有效时间，单位：秒
     */
    public Long getExpiresIn() {
        return expiresIn;
    }

    /**
     * 设置：凭证有效时间，单位：秒
     * 表字段：wx_access_token.expires_in
     *
     * @param expiresIn
     *            wx_access_token.expires_in：凭证有效时间，单位：秒
     */
    public void setExpiresIn(Long expiresIn) {
        this.expiresIn = expiresIn;
    }

    public String getAccessIp() {
        return accessIp;
    }

    public void setAccessIp(String accessIp) {
        this.accessIp = accessIp;
    }

    /**
     * 获取：凭证创建时间(毫秒数)
     * 表字段：wx_access_token.create_mstime
     *
     * @return wx_access_token.create_mstime：凭证创建时间(毫秒数)
     */
    public Long getCreateMstime() {
        return createMstime;
    }

    /**
     * 设置：凭证创建时间(毫秒数)
     * 表字段：wx_access_token.create_mstime
     *
     * @param createMstime
     *            wx_access_token.create_mstime：凭证创建时间(毫秒数)
     */
    public void setCreateMstime(Long createMstime) {
        this.createMstime = createMstime;
    }

    /**
     * 获取：凭证创建时间
     * 表字段：wx_access_token.create_time
     *
     * @return wx_access_token.create_time：凭证创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 设置：凭证创建时间
     * 表字段：wx_access_token.create_time
     *
     * @param createTime
     *            wx_access_token.create_time：凭证创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}