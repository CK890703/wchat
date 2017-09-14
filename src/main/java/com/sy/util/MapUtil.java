package com.sy.util;

import java.util.Map;

public class MapUtil {

	public static String Join(Map<String, String> map,String separator)
	{
		 
		StringBuffer buffer = new StringBuffer();
		for (String key : map.keySet()) {
			buffer.append(key+"="+map.get(key).toString());
			buffer.append(separator);
		}
		if(buffer.length()>0)
		{
			return buffer.substring(0,buffer.length()-1);
		}
		return "";
	}

}
