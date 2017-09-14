package com.sy.common.dynamic;

import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

/**
 * 切换数据源Advice
 * Created by 杨成 on 2016/2/29.
 */
@Aspect
@Order(-1)// 保证该AOP在@Transactional之前执行
@Component
public class DynamicDataSourceAspect {

    static Logger logger = Logger.getLogger(DynamicDataSourceAspect.class);

    @Before("@annotation(ds)")
    public void changeDataSource(JoinPoint point, TargetDataSource ds) throws Throwable {
        String dsId = ds.value();
        if (!DynamicDataSourceContextHolder.containsDataSource(dsId)) {
            logger.error("数据源"+ds.value()+"不存在，使用默认数据源 > "+point.getSignature());
        } else {
            logger.debug("Use DataSource : "+ds.value()+" > "+point.getSignature());
            DynamicDataSourceContextHolder.setDataSourceType(ds.value());
        }
    }

    @After("@annotation(ds)")
    public void restoreDataSource(JoinPoint point, TargetDataSource ds) {
        logger.debug("Revert DataSource : "+ds.value()+" > "+point.getSignature());
        DynamicDataSourceContextHolder.clearDataSourceType();
    }

}
