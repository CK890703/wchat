package com.sy.util;

import org.apache.log4j.Logger;

import java.util.Map;

public class GlobalResource {
	Logger logger = Logger.getLogger(GlobalResource.class);

	public static Map<String, Map<String, String>> PubDict = null;

	public static Map<String, String> getPubDictData(String tableName, String columnName) {
		if(GlobalResource.PubDict == null || GlobalResource.PubDict.size() == 0){
			return null;
		}
		return GlobalResource.PubDict.get(tableName + "*" + columnName);
	}
}
