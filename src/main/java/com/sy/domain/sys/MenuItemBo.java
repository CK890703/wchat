package com.sy.domain.sys;

import java.io.Serializable;
import java.util.List;

/**
 * 菜单信息
 */
public class MenuItemBo extends MenuItem implements Serializable{

	private static final long serialVersionUID = 6392077521507004591L;
	/**
	 * 二级菜单
	 */
	private List<MenuItem> navs;

	public List<MenuItem> getNavs() {
		return navs;
	}

	public void setNavs(List<MenuItem> navs) {
		this.navs = navs;
	}
}
