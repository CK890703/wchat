package com.sy.util;

import org.springframework.util.StringUtils;

import javax.servlet.http.HttpServletRequest;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.Map;
import java.util.TreeMap;

public class FormSupport {

	public static Map<String, String> generateHttpRequestStringMap(HttpServletRequest httpRequest) {
		Map<String, String> map = new TreeMap<String, String>();

		@SuppressWarnings("rawtypes")
		Enumeration enu = httpRequest.getParameterNames();
		while (enu.hasMoreElements()) {
			String paraName = (String) enu.nextElement();
			map.put(paraName, httpRequest.getParameter(paraName));
		}
		return map;
	}

	public static Map<String, Object> generateHttpRequestMap(HttpServletRequest httpRequest) {
		Map<String, Object> map = new HashMap<String, Object>();

		@SuppressWarnings("rawtypes")
		Enumeration enu = httpRequest.getParameterNames();
		while (enu.hasMoreElements()) {
			String paraName = (String) enu.nextElement();
			map.put(paraName, httpRequest.getParameter(paraName));
		}
		return map;
	}

	/**
	 * 生成分页和客户端传递参数健值对
	 * 
	 * @param httpRequest
	 * @return Map<String, Object>
	 */
	public static Map<String, Object> generatePagingQueryMap(HttpServletRequest httpRequest, Paging page) {
		Map<String, Object> key = new HashMap<String, Object>();
		@SuppressWarnings("rawtypes")
		Enumeration enu = httpRequest.getParameterNames();
		while (enu.hasMoreElements()) {
			String paraName = (String) enu.nextElement();
			key.put(paraName, httpRequest.getParameter(paraName));
		}
		Integer start = 0;
		Integer end = 0;
		if (httpRequest.getParameter("start") != null) {
			start = Integer.valueOf(httpRequest.getParameter("start"));
			key.remove("start");
		}
		if (httpRequest.getParameter("end") != null) {
			end = Integer.valueOf(httpRequest.getParameter("end"));
			key.remove("end");
		}

		Integer pagesize = end - start + 1;
		Integer currentpage = start / pagesize;
		if (page == null) {
			page = new Paging();
		}
		page.setCurrent_page(currentpage);
		page.setPage_size(pagesize);

		key.put("page", page);
		return key;
	}

	/**
	 * 生成分页和客户端传递参数健值对
	 * 
	 * @param httpRequest
	 * @return Map<String, Object>
	 */
	public static Map<String, Object> generatePagingQueryMap2(HttpServletRequest httpRequest, Paging page) {
		Map<String, Object> key = new HashMap<String, Object>();
		@SuppressWarnings("rawtypes")
		Enumeration enu = httpRequest.getParameterNames();
		while (enu.hasMoreElements()) {
			String paraName = (String) enu.nextElement();
			key.put(paraName, httpRequest.getParameter(paraName));
		}
		key.put("start", httpRequest.getParameter("start"));
		key.put("end", httpRequest.getParameter("end"));
		key.put("offset", httpRequest.getParameter("start"));
		key.put("max", httpRequest.getParameter("end"));
		key.put("page", page);
		return key;
	}

	/**
	 * 生成参数信息
	 * 
	 * @param httpRequest
	 * @return Map<String, Object>
	 */
	public static Map<String, Object> generateParamsAndPage(HttpServletRequest httpRequest, Paging page) {
		Map<String, Object> key = new HashMap<String, Object>();
		// 参数信息
		Map<String, Object> params = new HashMap<String, Object>();
		@SuppressWarnings("rawtypes")
		Enumeration enu = httpRequest.getParameterNames();
		while (enu.hasMoreElements()) {
			String paraName = (String) enu.nextElement();
			params.put(paraName, httpRequest.getParameter(paraName));
		}

		// 分页信息
		Integer start = 0;
		Integer end = 0;
		if (httpRequest.getParameter("start") != null) {
			start = Integer.valueOf(httpRequest.getParameter("start"));
		}
		if (httpRequest.getParameter("end") != null) {
			end = Integer.valueOf(httpRequest.getParameter("end"));
		}

		Integer pagesize = end - start + 1;
		Integer currentpage = start / pagesize;
		if (page == null) {
			page = new Paging();
		}
		page.setCurrent_page(currentpage);
		page.setPage_size(pagesize);

		params.put("limitstart", page.getCurrent_page() * page.getPage_size());
		params.put("limitend", page.getPage_size());
		params.put("offset", page.getCurrent_page() * page.getPage_size());
		params.put("max", page.getPage_size());
		key.put("params", params);
		key.put("page", page);
		return key;
	}

	public static Map<String, Object> generatePagingQueryMap1(HttpServletRequest httpRequest, Paging page) {
		Map<String, Object> key = new HashMap<String, Object>();
		@SuppressWarnings("rawtypes")
		Enumeration enu = httpRequest.getParameterNames();
		while (enu.hasMoreElements()) {
			String paraName = (String) enu.nextElement();
			if (StringUtils.hasLength(httpRequest.getParameter(paraName))) {
				key.put(paraName, httpRequest.getParameter(paraName));
			}
		}
		Integer start = 0;
		Integer end = 0;
		if (httpRequest.getParameter("start") != null) {
			start = Integer.valueOf(httpRequest.getParameter("start"));
			key.remove("start");
		}
		if (httpRequest.getParameter("end") != null) {
			end = Integer.valueOf(httpRequest.getParameter("end"));
			key.remove("end");
		}

		Integer pagesize = end - start + 1;
		Integer currentpage = start / pagesize;
		if (page == null) {
			page = new Paging();
		}
		page.setCurrent_page(currentpage);
		page.setPage_size(pagesize);

		key.put("page", page);
		return key;
	}

}