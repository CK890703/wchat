package com.sy.domain.sys;

import java.io.Serializable;

/**
 * 菜单信息
 */
public class MenuItem implements Serializable {

    private static final long serialVersionUID = -1656647196978720439L;
    /**
     * 模块名称
     */
    private String moduleName;

    /**
     * 模块Id
     */
    private int moduleId;

    /**
     * 父模块Id
     */
    private int parentId;

    /**
     * 链接地址
     */
    private String linkUrl;


    /**
     * 角色ID
     */
    private int roleId;

    /**
     * 权限码
     */
    private String permissionCode;

    /**
     * 业务码
     */
    private String businessCode;

    /**
     * 操作码
     */
    private int operateCode;

    /**
     * 排序序号
     */
    private String sort;
    /**
     * 业务码
     */
    private String icon;

    /**
     * 菜单项的构造函数
     */
    public MenuItem() {
    }

    public String getModuleName() {
        return moduleName;
    }

    public void setModuleName(String moduleName) {
        this.moduleName = moduleName;
    }

    public int getModuleId() {
        return moduleId;
    }

    public void setModuleId(int moduleId) {
        this.moduleId = moduleId;
    }

    public int getParentId() {
        return parentId;
    }

    public void setParentId(int parentId) {
        this.parentId = parentId;
    }

    public String getLinkUrl() {
        return linkUrl;
    }

    public void setLinkUrl(String linkUrl) {
        this.linkUrl = linkUrl;
    }

    public int getOperateCode() {
        return operateCode;
    }

    public void setOperateCode(int operateCode) {
        this.operateCode = operateCode;
    }

    public int getRoleId() {
        return roleId;
    }

    public void setRoleId(int roleId) {
        this.roleId = roleId;
    }

    public String getPermissionCode() {
        return permissionCode;
    }

    public void setPermissionCode(String permissionCode) {
        this.permissionCode = permissionCode;
    }

    public String getBusinessCode() {
        return businessCode;
    }

    public void setBusinessCode(String businessCode) {
        this.businessCode = businessCode;
    }

    public String getSort() {
        return sort;
    }

    public void setSort(String sort) {
        this.sort = sort;
    }

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }
}
