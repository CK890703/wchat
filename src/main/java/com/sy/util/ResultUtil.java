package com.sy.util;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SerializeConfig;
import com.alibaba.fastjson.serializer.SimpleDateFormatSerializer;
import com.sy.common.Constant.Constants;
import com.sy.common.pagination.Pagination;
import org.apache.log4j.Logger;

import java.util.Date;
import java.util.List;


/**
 * 返回JSON工具类
 *
 */
public class ResultUtil {
	private static Logger logger = Logger.getLogger(ResultUtil.class);


	/**
	 * 生成一个成功的json
	 * @param message 成功消息
	 * @return
	 */
	public static JSONObject getSuccessJson(String message) {
		JSONObject resultJson = new JSONObject();
		resultJson.put(Constants.SYS.JSON_RESULT_MESSAGE, message);
		resultJson.put(Constants.SYS.JSON_RESULT_STATUS_CODE, Constants.SYS.OK);
		resultJson.put(Constants.SYS.JSON_RESULT_ValidFORM_STATUS, "y");
		return resultJson;
	}

	/**
	 * 生成一个成功的json
	 * @param message 成功消息
	 * @param data 成功数据
	 * @return JSON对象
	 */
	public static JSONObject getSuccessJson(String message, Object data) {
		JSONObject resultJson = new JSONObject();
		resultJson.put(Constants.SYS.JSON_RESULT_MESSAGE, message);
		resultJson.put(Constants.SYS.JSON_RESULT_STATUS_CODE, Constants.SYS.OK);
		resultJson.put(Constants.SYS.JSON_RESULT_ValidFORM_STATUS, "y");
		resultJson.put(Constants.SYS.JSON_RESULT_DATA, data);
		return resultJson;
	}

	/**
	 * 生成一个j成功son
	 * @param message 成功消息
	 * @param data 成功数据
	 * @return
	 */
	public static <T> JSONObject getSuccessJsonList(String message, List<T> data) {
		return getSuccessJson(message, data, null);
	}

	/**
	 * 生成一个成功的json
	 * @param message 消息
	 * @param data 数据
	 * @param format
	 * @return 生成的JSON对象
	 */
	public static JSONObject getSuccessFormatJson(String message, Object data, String format) {
		JSONObject resultJson = new JSONObject();
		resultJson.put(Constants.SYS.JSON_RESULT_MESSAGE, message);
		resultJson.put(Constants.SYS.JSON_RESULT_STATUS_CODE, Constants.SYS.OK);
		resultJson.put(Constants.SYS.JSON_RESULT_ValidFORM_STATUS, "y");
		SerializeConfig mapping = new SerializeConfig();
		mapping.put(Date.class, new SimpleDateFormatSerializer(format));
		resultJson.put(Constants.SYS.JSON_RESULT_DATA, data);
		resultJson = JSON.parseObject(JSON.toJSONString(resultJson, mapping));
		return resultJson;
	}

    public static JSONObject getSuccessJson(String message, Object data, Paging page) {
			JSONObject resultJson = new JSONObject();
		resultJson.put(Constants.SYS.JSON_RESULT_MESSAGE, message);
		resultJson.put(Constants.SYS.JSON_RESULT_STATUS_CODE, Constants.SYS.OK);
		resultJson.put(Constants.SYS.JSON_RESULT_ValidFORM_STATUS, "y");
		SerializeConfig mapping = new SerializeConfig();
		mapping.put(Date.class, new SimpleDateFormatSerializer("yyyy-MM-dd mm:HH:ss"));
		if (data != null)
			resultJson.put(Constants.SYS.JSON_RESULT_DATA, data);
		if (page != null) {
			JSONObject  jsonpage = new JSONObject();
			jsonpage.put("page_size", page.getPage_size());
			jsonpage.put("current_page", page.getCurrent_page()+1);
			jsonpage.put("total_item", page.getTotal_item());
			resultJson.put(Constants.SYS.JSON_RESULT_PAGING, jsonpage);
		}
		return resultJson;
	}

	public static String getSuccessJsonString(String message, Object data, Paging page) {
		return getSuccessJsonString(message, "yyyy-MM-dd HH:mm:ss", data, page);
	}

	public static String getSuccessJsonString(String message, String format, Object data, Paging page) {
		SerializeConfig mapping = new SerializeConfig();
		mapping.put(Date.class, new SimpleDateFormatSerializer(format));
		return JSON.toJSONString(getSuccessJson(message, data, page), mapping);
	}



	/**
	 * 生成一个失败的JSON对象
	 * @param message 失败消息
	 * @return JSON对象
	 */
	public static JSONObject getFailureJson(String message) {
		JSONObject resultJson = new JSONObject();
		resultJson.put(Constants.SYS.JSON_RESULT_STATUS_CODE, Constants.SYS.ERROR);
		resultJson.put(Constants.SYS.JSON_RESULT_ValidFORM_STATUS, "n");
		resultJson.put(Constants.SYS.JSON_RESULT_MESSAGE, message);
		return resultJson;
	}

	/**
	 * 生成一个失败的JSON对象
	 * @param message 失败消息
	 * @param data 失败数据
	 * @return JSON对象
	 */
	public static JSONObject getFailureJson(String message, Object data) {
		JSONObject resultJson = new JSONObject();
		resultJson.put(Constants.SYS.JSON_RESULT_MESSAGE, message);
		resultJson.put(Constants.SYS.JSON_RESULT_STATUS_CODE, Constants.SYS.ERROR);
		resultJson.put(Constants.SYS.JSON_RESULT_ValidFORM_STATUS, "n");
		resultJson.put(Constants.SYS.JSON_RESULT_DATA, data);
		return resultJson;
	}

	/**
	 * 生成一个失败的JSON对象
	 * @param message 失败消息
	 * @param data 失败数据
	 * @param format
	 * @return JSON对象
	 */
	public static JSONObject getFailureJson(String message, Object data, String format) {
		JSONObject resultJson = new JSONObject();
		resultJson.put(Constants.SYS.JSON_RESULT_MESSAGE, message);
		resultJson.put(Constants.SYS.JSON_RESULT_STATUS_CODE, Constants.SYS.ERROR);
		resultJson.put(Constants.SYS.JSON_RESULT_ValidFORM_STATUS, "n");
		SerializeConfig mapping = new SerializeConfig();
		mapping.put(Date.class, new SimpleDateFormatSerializer(format));
		resultJson.put(Constants.SYS.JSON_RESULT_DATA, data);
		return JSON.parseObject(JSON.toJSONString(resultJson, mapping));
	}

}
