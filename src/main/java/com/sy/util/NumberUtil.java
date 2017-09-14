package com.sy.util;

import java.math.BigDecimal;
import java.text.DecimalFormat;

public class NumberUtil {

    public static double format(double d, String format) {
        DecimalFormat df = new DecimalFormat(format);
        String ds = df.format(d);
        return Double.parseDouble(ds);
    }

    //v1.6.7.2 RDPROJECT-725 wcw 2014-3-14 start
    public static double format2(double d) {
        /*DecimalFormat df = new DecimalFormat("0.00");
		String ds=df.format(d);
		return Double.parseDouble(ds);*/
        return BigDecimalUtil.decimal(d, 2);
    }



    public static String format2Str(double d) {
		/*DecimalFormat df = new DecimalFormat("0.00"); 
		String ds=df.format(d);
		return ds;*/
        return BigDecimalUtil.decimal(d, 2) + "";
    }

    public static double format4(double d) {
		/*DecimalFormat df = new DecimalFormat("0.0000"); 
		String ds=df.format(d);
		return Double.parseDouble(ds);*/
        return BigDecimalUtil.decimal(d, 4);
    }

    public static double format6(double d) {
		/*DecimalFormat df = new DecimalFormat("0.000000"); 
		String ds=df.format(d);
		return Double.parseDouble(ds);*/
        return BigDecimalUtil.decimal(d, 6);
    }

    //v1.6.7.2 RDPROJECT-725 wcw 2014-3-14 end
    public static double getDouble(String str) {
        if (str == null || str.equals(""))
            return 0.0;
        double ret = 0.0;
        try {
            ret = Double.parseDouble(str);
        } catch (NumberFormatException e) {
            ret = 0.0;
        }
        return format6(ret);
    }

    public static double getDouble(double d) {
        BigDecimal b = new BigDecimal(d);
        //保留2位小数
        double dd = b.setScale(2, BigDecimal.ROUND_HALF_UP).doubleValue();
        return dd;
    }

    public static BigDecimal getBigDecimal(double d) {
        BigDecimal b = new BigDecimal(d);
        //保留2位小数
        return b.setScale(2, BigDecimal.ROUND_HALF_UP);
    }

    // v1.6.7.2 RDPROJECT-548 lx 2013-12-13 start
    public static double getDouble2(String str) {
        if (str == null || str.equals(""))
            return 0.0;
        double ret = 0.0;
        try {
            ret = Double.parseDouble(str);
        } catch (NumberFormatException e) {
            ret = 0.0;
        }
        return format2(ret);
    }

    // v1.6.7.2 RDPROJECT-548 lx 2013-12-13 end
    public static long getLong(String str) {
        if (str == null || str.equals(""))
            return 0L;
        long ret = 0;
        try {
            ret = Long.parseLong(str);
        } catch (NumberFormatException e) {
            ret = 0;
        }
        return ret;
    }

    public static long getLong(double d) {
        long l = Math.round(d);
        return l;
    }

    public static Long[] getLongs(String[] str) {
        if (str == null || str.length < 1)
            return new Long[]{0L};
        Long[] ret = new Long[str.length];
        for (int i = 0; i < str.length; i++) {
            ret[i] = getLong(str[i]);
        }
        return ret;
    }

    public static int getInt(String str) {
        if (str == null || str.equals(""))
            return 0;
        int ret = 0;
        try {
            ret = Integer.parseInt(str);
        } catch (NumberFormatException e) {
            ret = 0;
        }
        return ret;
    }

    public static int getInt(double d) {
        BigDecimal b = new BigDecimal(d);
        int di = b.setScale(0, BigDecimal.ROUND_HALF_UP).intValue();
        return di;
    }

    public static int compare(double x, double y) {
        BigDecimal val1 = new BigDecimal(x);
        BigDecimal val2 = new BigDecimal(y);
        return val1.compareTo(val2);
    }

    /**
     * @param d
     * @param len
     * @return
     */
    public static double ceil(double d, int len) {
        String str = Double.toString(d);
        int a = str.indexOf(".");
        if (a + 3 > str.length()) {
            a = str.length();
        } else {
            a = a + 3;
        }
        str = str.substring(0, a);
        return Double.parseDouble(str);
    }

    public static double ceil(double d) {
        return ceil(d, 2);
    }

    //数字左边补o
    public static String padLeft(int d, int length) {
        // 0 代表前面补充0
        // 4 代表长度为4
        // d 代表参数为正数型
        return String.format("%0" + length + "d", d);

    }

}
