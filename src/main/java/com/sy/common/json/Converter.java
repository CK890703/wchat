package com.sy.common.json;

import java.util.Map;

/**
 * 转换器接口
 * User: Chandler
 * Date: 24/02/16
 */
public interface Converter<T>{
    public Map<String,Object> transform(T t);
}
