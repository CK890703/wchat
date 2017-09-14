package com.sy.util;

import com.alibaba.druid.util.StringUtils;
import org.apache.log4j.Logger;

import javax.servlet.http.HttpServletRequest;
import java.lang.reflect.Field;
import java.util.Map;

/**
 * Created by 杨成 on 2016/2/24.
 */
public class DomainUtils {

    private static Logger logger = Logger.getLogger(DomainUtils.class);

    public static void copyValue(Object domain, HttpServletRequest request){
        copyValue(domain, request, false);
    }

    public static void copyValue(Object domain, HttpServletRequest request, Boolean nullFillEmpty){
        if(null == domain || null == request){
            return;
        }
        for(Class clazz = domain.getClass(); clazz != Object.class ; clazz = clazz.getSuperclass()) {
            for (Field f : clazz.getDeclaredFields()) {
                try {
                    //开启无敌accessible大法，跳过private、final等限制赋值
                    f.setAccessible(true);
                    String value = request.getParameter(f.getName());
                    setValue(f, domain, value, nullFillEmpty);
                } catch (Exception e) {
//                    logger.info("cobyValue类型错误:" + domain.getClass().getName() + "." + f.getName(), e);
                }
            }
        }
    }

    public static void copyValue(Object domain, Map map){
        copyValue(domain, map, false);
    }

    public static void copyValue(Object domain, Map map, Boolean nullFillEmpty){
        if(null == domain || null == map){
            return;
        }
        for(Class clazz = domain.getClass(); clazz != Object.class ; clazz = clazz.getSuperclass()) {
            for (Field f : clazz.getDeclaredFields()) {
                try {
                    //开启无敌accessible大法，跳过private、final等限制赋值
                    f.setAccessible(true);
                    Object value = map.get(f.getName());
                    setValue(f, domain, value, nullFillEmpty);
                } catch (Exception e) {
//                    logger.info("cobyValue类型错误:" + domain.getClass().getName() + "." + f.getName(), e);
                }
            }
        }
    }

    private static void setValue(Field f, Object domain, Object value, Boolean nullFillEmpty) throws IllegalAccessException {
        Boolean isEmpty = false;
        if(null == value || StringUtils.isEmpty(value.toString())){
            if(nullFillEmpty){
                isEmpty = true;
            }else{
                if(null != value && f.getType() == String.class){
                    f.set(domain, value.toString());
                }
                return;
            }
        }

        if (f.getType() == String.class) {
            f.set(domain, isEmpty?"":value.toString());
        } else if (f.getType() == Integer.class) {
            f.set(domain, isEmpty?0:Integer.valueOf(value.toString()));
        } else if (f.getType() == Long.class) {
            f.set(domain, isEmpty?0L:Long.valueOf(value.toString()));
        } else if (f.getType() == Float.class) {
            f.set(domain, isEmpty?0F:Float.valueOf(value.toString()));
        } else if (f.getType() == Double.class) {
            f.set(domain, isEmpty?0D:Double.valueOf(value.toString()));
        } else if (f.getType() == Byte.class) {
            f.set(domain, isEmpty?0:Byte.valueOf(value.toString()));
        }else{
//            logger.info("cobyValue不支持的类型:"+f.getType());
        }
    }
}
