package com.sy.domain.sys;

import java.io.Serializable;
import java.util.Date;

public class PubDict implements Serializable {

    private static final long serialVersionUID = 3285099243151630002L;
    /**
     *
     * ID
     * 表字段 : pub_dict.id
     *
     */
    private Long id;

    /**
     *
     * 字典数据所在数据表
     * 表字段 : pub_dict.table_name
     *
     */
    private String tableName;

    /**
     *
     * 字典数据所在列表
     * 表字段 : pub_dict.column_name
     *
     */
    private String columnName;

    /**
     *
     * 值-code
     * 表字段 : pub_dict.vcode
     *
     */
    private Integer vcode;

    /**
     *
     * 值-name
     * 表字段 : pub_dict.vname
     *
     */
    private String vname;

    /**
     *
     * 修改记录
     * 表字段 : pub_dict.remark
     *
     */
    private String remark;

    /**
     *
     * 是否有效
     * 表字段 : pub_dict.isvalid
     *
     */
    private Short isvalid;

    /**
     *
     * 入库时间
     * 表字段 : pub_dict.c_time
     *
     */
    private Date cTime;

    /**
     *
     * 修改时间
     * 表字段 : pub_dict.m_time
     *
     */
    private Date mTime;

    /**
     *
     * 获取：ID
     * 表字段：pub_dict.id
     *
     *
     * @return pub_dict.id：ID
     */
    public Long getId() {
        return id;
    }

    /**
     *
     * 设置：ID
     * 表字段：pub_dict.id
     *
     *
     * @param id
     *            pub_dict.id：ID
     */
    public void setId(Long id) {
        this.id = id;
    }

    /**
     *
     * 获取：字典数据所在数据表
     * 表字段：pub_dict.table_name
     *
     *
     * @return pub_dict.table_name：字典数据所在数据表
     */
    public String getTableName() {
        return tableName;
    }

    /**
     *
     * 设置：字典数据所在数据表
     * 表字段：pub_dict.table_name
     *
     *
     * @param tableName
     *            pub_dict.table_name：字典数据所在数据表
     */
    public void setTableName(String tableName) {
        this.tableName = tableName == null ? null : tableName.trim();
    }

    /**
     *
     * 获取：字典数据所在列表
     * 表字段：pub_dict.column_name
     *
     *
     * @return pub_dict.column_name：字典数据所在列表
     */
    public String getColumnName() {
        return columnName;
    }

    /**
     *
     * 设置：字典数据所在列表
     * 表字段：pub_dict.column_name
     *
     *
     * @param columnName
     *            pub_dict.column_name：字典数据所在列表
     */
    public void setColumnName(String columnName) {
        this.columnName = columnName == null ? null : columnName.trim();
    }

    /**
     *
     * 获取：值-code
     * 表字段：pub_dict.vcode
     *
     *
     * @return pub_dict.vcode：值-code
     */
    public Integer getVcode() {
        return vcode;
    }

    /**
     *
     * 设置：值-code
     * 表字段：pub_dict.vcode
     *
     *
     * @param vcode
     *            pub_dict.vcode：值-code
     */
    public void setVcode(Integer vcode) {
        this.vcode = vcode;
    }

    /**
     *
     * 获取：值-name
     * 表字段：pub_dict.vname
     *
     *
     * @return pub_dict.vname：值-name
     */
    public String getVname() {
        return vname;
    }

    /**
     *
     * 设置：值-name
     * 表字段：pub_dict.vname
     *
     *
     * @param vname
     *            pub_dict.vname：值-name
     */
    public void setVname(String vname) {
        this.vname = vname == null ? null : vname.trim();
    }

    /**
     *
     * 获取：修改记录
     * 表字段：pub_dict.remark
     *
     *
     * @return pub_dict.remark：修改记录
     */
    public String getRemark() {
        return remark;
    }

    /**
     *
     * 设置：修改记录
     * 表字段：pub_dict.remark
     *
     *
     * @param remark
     *            pub_dict.remark：修改记录
     */
    public void setRemark(String remark) {
        this.remark = remark == null ? null : remark.trim();
    }

    /**
     *
     * 获取：是否有效
     * 表字段：pub_dict.isvalid
     *
     *
     * @return pub_dict.isvalid：是否有效
     */
    public Short getIsvalid() {
        return isvalid;
    }

    /**
     *
     * 设置：是否有效
     * 表字段：pub_dict.isvalid
     *
     *
     * @param isvalid
     *            pub_dict.isvalid：是否有效
     */
    public void setIsvalid(Short isvalid) {
        this.isvalid = isvalid;
    }

    /**
     *
     * 获取：入库时间
     * 表字段：pub_dict.c_time
     *
     *
     * @return pub_dict.c_time：入库时间
     */
    public Date getcTime() {
        return cTime;
    }

    /**
     *
     * 设置：入库时间
     * 表字段：pub_dict.c_time
     *
     *
     * @param cTime
     *            pub_dict.c_time：入库时间
     */
    public void setcTime(Date cTime) {
        this.cTime = cTime;
    }

    /**
     *
     * 获取：修改时间
     * 表字段：pub_dict.m_time
     *
     *
     * @return pub_dict.m_time：修改时间
     */
    public Date getmTime() {
        return mTime;
    }

    /**
     *
     * 设置：修改时间
     * 表字段：pub_dict.m_time
     *
     *
     * @param mTime
     *            pub_dict.m_time：修改时间
     */
    public void setmTime(Date mTime) {
        this.mTime = mTime;
    }
}