package com.sy;

/**
 * User: Chandler
 * Date: 22/02/16
 */

import com.sy.service.PubDictService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class AppInitListener implements ApplicationListener<ContextRefreshedEvent> {
    Logger logger = Logger.getLogger(AppInitListener.class);
    @Autowired
    private PubDictService dictService;

    @Override
    public void onApplicationEvent(ContextRefreshedEvent contextRefreshedEvent) {
        logger.info("******************初始化数据字典******************");
        Map<String, Map<String, String>> pubDictData = dictService.setPubDictData();
        logger.info("初始化数据字典成功，共：" + pubDictData.size() + "条。");
    }
}
