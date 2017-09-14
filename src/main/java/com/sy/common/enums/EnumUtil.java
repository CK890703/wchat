package com.sy.common.enums;

import org.apache.log4j.Logger;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationTargetException;
import java.lang.reflect.Method;
import java.util.EnumSet;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

/**
 * 枚举公共类
 * 系统的枚举在此定义
 * @Description
 * @author Chandler
 * @date 2016-3-7
 */
public class EnumUtil {

    private static Logger log = Logger.getLogger(EnumUtil.class);

    /**
     * 通过key取value
     * @param enumClass enum的class
     * @param code 代码
     * @return
     */
    public static String getDesc(Class enumClass,Object code){
        if(code == null) return "";
        String desc = "";
        try {
            Method method = enumClass.getMethod("values", new Class[0]);
            BaseEnum[] baseEnums = (BaseEnum[])method.invoke(enumClass,new Object[0]);
            Field codeField =enumClass.getDeclaredField("code");
            codeField.setAccessible(true);
            Field descField =enumClass.getDeclaredField("desc");
            descField.setAccessible(true);
            for(BaseEnum e : baseEnums){
                if(codeField.get(e) instanceof  String){
                    if(codeField.get(e).equals(code.toString())){
                        desc = (String)descField.get(e);
                        break;
                    }
                }else if(codeField.get(e) instanceof Integer){
                    if(((Integer)codeField.get(e)).equals(code)){
                        desc = (String)descField.get(e);
                        break;
                    }
                }else{
                    log.info("不支持code的类型，自己维护");
                }

            }
        } catch (NoSuchMethodException e) {
            log.info("EnumUtil : " + enumClass.getName() + "is not a enum!");
            e.printStackTrace();
        } catch (InvocationTargetException | IllegalAccessException e) {
            log.info("EnumUtil : " + enumClass.getName() + "has not implements BaseEnum!");
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            log.info("EnumUtil : " + enumClass.getName() + "has no code or desc field!");
            e.printStackTrace();
        }
        return desc;
    }

    /**
     * 通过value取key
     * @param enumClass enum的class
     * @param desc value
     * @return
     */
    public static Object getCode(Class enumClass,Object desc){
        Object code = null;
        try {
            Method method = enumClass.getMethod("values", new Class[0]);
            BaseEnum[] baseEnums = (BaseEnum[])method.invoke(enumClass,new Object[0]);
            Field codeField =enumClass.getDeclaredField("code");
            codeField.setAccessible(true);
            Field descField =enumClass.getDeclaredField("desc");
            descField.setAccessible(true);
            for(BaseEnum e : baseEnums){
                if(descField.get(e).equals(desc)){
                    code = codeField.get(e);
                    break;
                }
            }
        } catch (NoSuchMethodException e) {
            log.info("EnumUtil : " + enumClass.getName() + "is not a enum!");
            e.printStackTrace();
        } catch (InvocationTargetException | IllegalAccessException e) {
            log.info("EnumUtil : " + enumClass.getName() + "has not implements BaseEnum!");
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            log.info("EnumUtil : " + enumClass.getName() + "has no code or desc field!");
            e.printStackTrace();
        }
        return code;
    }

    /**
     * 遍历enum成LinkedHashMap
     * @param enumClass enum的class
     * @return
     */
    public static LinkedHashMap values(Class enumClass){
        LinkedHashMap map = null;
        try {
            Method method = enumClass.getMethod("values", new Class[0]);
            BaseEnum[] baseEnums = (BaseEnum[])method.invoke(enumClass,new Object[0]);
            Field codeField =enumClass.getDeclaredField("code");
            codeField.setAccessible(true);
            Field descField =enumClass.getDeclaredField("desc");
            descField.setAccessible(true);
            map = new LinkedHashMap<String, String>();
            for(BaseEnum e : baseEnums){
                map.put(codeField.get(e),descField.get(e));
            }
        } catch (NoSuchMethodException e) {
            log.info("EnumUtil : " + enumClass.getName() + "is not a enum!");
            e.printStackTrace();
        } catch (InvocationTargetException | IllegalAccessException e) {
            log.info("EnumUtil : " + enumClass.getName() + "has not implements BaseEnum!");
            e.printStackTrace();
        } catch (NoSuchFieldException e) {
            log.info("EnumUtil : " + enumClass.getName() + "has no code or desc field!");
            e.printStackTrace();
        }
        return map;
    }

	/**
	 * 枚举接口，管理通用方法
	 * @author Chandler
	 * @date 2016-3-7
	 */
	private interface BaseEnum{
//		public String getCode();
//		public String getDesc();
	}

	/**
	 * 是否枚举
	 * @author Chandler
	 * @date 2016-3-7
	 */
	public enum YesOrNoEnum implements BaseEnum{

		YES(1,"是"),
		NO(0,"否");

		private Integer code;
		private String desc;

		private YesOrNoEnum(Integer code, String desc){
			this.code = code;
			this.desc = desc;
		}

		public Integer getCode() {
			return code;
		}

		public String getDesc() {
			return desc;
		}

	}

    /**
     * 启用枚举
     * @author Chandler
     * @date 2016-3-7
     */
    public enum EnableEnum implements BaseEnum{

        ENABLE(1,"启用"),
        DISABLE(0,"停用");

        private Integer code;
        private String desc;

        private EnableEnum(Integer code, String desc){
            this.code = code;
            this.desc = desc;
        }

        public Integer getCode() {
            return code;
        }

        public String getDesc() {
            return desc;
        }

    }

    /**
     * 处理枚举
     * @author Chandler
     * @date 2016-3-7
     */
    public enum ProcessEnum implements BaseEnum{

        UNPROCESSED(0,"未处理"),
        PROCESSED(1,"已处理");

        private Integer code;
        private String desc;

        private ProcessEnum(Integer code, String desc){
            this.code = code;
            this.desc = desc;
        }

        public Integer getCode() {
            return code;
        }

        public String getDesc() {
            return desc;
        }

    }

    /**
     * 性别枚举
     * @author Chandler
     * @date 2016-3-9
     */
    public enum SexEnum implements BaseEnum{

        MALE(0,"男"),
        FEMALE(1,"女");

        private Integer code;
        private String desc;

        private SexEnum(Integer code, String desc){
            this.code = code;
            this.desc = desc;
        }

        public Integer getCode() {
            return code;
        }

        public String getDesc() {
            return desc;
        }

    }

    /**
     * 有效无效枚举
     * @author Chandler
     * @date 2016-3-10
     */
    public enum EffectiveEnum implements BaseEnum{

        EFFECTIVE(0,"有效"),
        INVALID(1,"无效");

        private Integer code;
        private String desc;

        private EffectiveEnum(Integer code, String desc){
            this.code = code;
            this.desc = desc;
        }

        public Integer getCode() {
            return code;
        }

        public String getDesc() {
            return desc;
        }

    }

    /**
     * 广告类型枚举
     * @author Chandler
     * @date 2016-3-10
     */
    public enum MaterialTypeEnum implements BaseEnum{

        HTML(0,"html"),
        NATIVE(1,"native");

        private Integer code;
        private String desc;

        private MaterialTypeEnum(Integer code, String desc){
            this.code = code;
            this.desc = desc;
        }

        public Integer getCode() {
            return code;
        }

        public String getDesc() {
            return desc;
        }

    }

    /**
     * 对接公司枚举
     * @author Chandler
     * @date 2016-3-10
     */
    public enum CompanyEnum implements BaseEnum{

        JESGOO(1,"捷酷"),
        BAIDU(2,"百度");

        private Integer code;
        private String desc;

        private CompanyEnum(Integer code, String desc){
            this.code = code;
            this.desc = desc;
        }

        public Integer getCode() {
            return code;
        }

        public String getDesc() {
            return desc;
        }

    }

    /**
     * 竞价广告类型(RTB)枚举
     */
    public enum RtbAdTypeEnum implements BaseEnum{

        HF_AD(1,"横幅广告"),
        QP_AD(2,"全屏广告"),
        SP_AD(3,"视频广告"),
        XXL_AD(4,"信息流广告");

        private Integer code;
        private String desc;

        private RtbAdTypeEnum(Integer code, String desc){
            this.code = code;
            this.desc = desc;
        }

        public Integer getCode() {
            return code;
        }

        public String getDesc() {
            return desc;
        }

    }

    /**
     * 权限名称
     */
    public enum PermissionNameEnum implements BaseEnum{
        permission_add("add", "新增"),
        permission_modify("modify", "编辑"),
        permission_show("show", "查看"),
        permission_delete("delete", "删除"),
        permission_check("check", "审核"),
        permission_import("import", "数据导入"),
        permission_export("export", "数据导出"),
        permission_setrole("setrole", "设置权限");

        private String code;
        private String name;

        private PermissionNameEnum(String code, String name){
            this.code = code;
            this.name = name;
        }

        public String getCode() {
            return code;
        }

        public String getName() {
            return name;
        }

    }

    /**
     * 财务审核枚举
     * @author Chandler
     * @date 2016-3-7
     */
    public enum FinanceStatusEnum implements BaseEnum{

        NO_NEED(-1,"无需审核"),
        UN_REVIEW(0,"未审核"),
        REVIEWED(1,"审核通过"),
        NEV_REVIEW(2,"审核驳回");

        private Integer code;
        private String desc;

        private FinanceStatusEnum(Integer code, String desc){
            this.code = code;
            this.desc = desc;
        }

        public Integer getCode() {
            return code;
        }

        public String getDesc() {
            return desc;
        }

    }


}