package com.sy.common.json;

import com.alibaba.fastjson.JSON;
import com.sy.common.pagination.Pagination;

import java.util.ArrayList;
import java.util.Collection;
import java.util.Map;

/**
 * 转换为json字符串
 * User: Chandler
 * Date: 24/02/16
 */
public class JSONUtil {

    public static String toJson(Object obj) {
        return JSON.toJSONString(obj);
    }

    public static String toJson(Collection collection, Converter converter) {
        Collection<Map<String, Object>> result = new ArrayList<Map<String, Object>>();
        for (Object data : collection) {
            result.add(converter.transform(data));
        }
        return JSON.toJSONString(result);
    }

    public static String toJson(Pagination pagination, Converter converter) {
        StringBuilder json = new StringBuilder("{");
        json.append("\"total\":").append(pagination.getTotalCount()).append(",\"rows\":");
        if (pagination.getResult() != null) {
            json.append(toJson(pagination.getResult(), converter));
        } else {
            json.append("[]");
        }
        json.append("}");
        return json.toString();
    }

    public static String toJson(Map<String, Object> map, Converter converter) {
        StringBuilder json = new StringBuilder("{");
        for (Map.Entry<String, Object> entry : map.entrySet()) {
            json.append("\"").append(entry.getKey()).append("\":");
            if (entry.getValue() instanceof Collection) {
                json.append(toJson((Collection) entry.getValue(), converter));
            } else {
                json.append(JSON.toJSONString(entry.getValue()));
            }
            json.append(",");
        }
        json.deleteCharAt(json.lastIndexOf(",")).append("}");
        return json.toString();
    }

}
