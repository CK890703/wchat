package com.sy.domain.business;

import java.util.Date;


/**
 * 用户标签
 */
public class WxUserTag extends WxErrMsg {
    /**
     * 标签id，由微信分配
     */
    private Integer id;

    /**
     * 标签名
     */
    private String name;

    /**
     * 标签下粉丝数
     */
    private Long count;

    /**
     * 创建时间
     */
    private Date createTime;

    /**
     * 标签id，由微信分配
     * @return id 标签id，由微信分配
     */
    public Integer getId() {
        return id;
    }

    /**
     * 标签id，由微信分配
     * @param id 标签id，由微信分配
     */
    public void setId(Integer id) {
        this.id = id;
    }

    /**
     * 标签名
     * @return name 标签名
     */
    public String getName() {
        return name;
    }

    /**
     * 标签名
     * @param name 标签名
     */
    public void setName(String name) {
        this.name = name == null ? null : name.trim();
    }

    /**
     * 标签下粉丝数
     * @return count 标签下粉丝数
     */
    public Long getCount() {
        return count;
    }

    /**
     * 标签下粉丝数
     * @param count 标签下粉丝数
     */
    public void setCount(Long count) {
        this.count = count;
    }

    /**
     * 创建时间
     * @return create_time 创建时间
     */
    public Date getCreateTime() {
        return createTime;
    }

    /**
     * 创建时间
     * @param createTime 创建时间
     */
    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }
}