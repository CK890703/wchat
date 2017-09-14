package com.sy.util;

import java.util.concurrent.atomic.AtomicInteger;

/**
 * Created by 杨成1 on 2016/3/28.
 */
public class NoUtils {
    private static AtomicInteger iapppayOrderSeqNum = new AtomicInteger();

    /**
     * 爱贝云计算下单订单号
     * @return
     */
    public static String genIapppayOrderSn() {
        String dateTimeStr = DateUtils.getFormatDateFromSecond(DateUtils.getCurrentSecondIntValue(),"yyyyMMddHHmmss");
        return "IP"+dateTimeStr + iapppayOrderSeqNum.incrementAndGet();
    }

}
