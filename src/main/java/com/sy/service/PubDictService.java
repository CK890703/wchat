package com.sy.service;

import com.sy.domain.sys.PubDict;
import com.sy.mapper.sys.PubDictMapper;
import com.sy.util.GlobalResource;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

/**
 * 数据字典信息
 */

@Service
public class PubDictService {
    Logger logger = Logger.getLogger(PubDictService.class);

    @Autowired
    private PubDictMapper pubDictMapper;

    public List<PubDict> getList() {
        return pubDictMapper.getList();
    }

    /**
     * 初始化组装vcode为key，value为tablename和columnname为key，vname为value的子集合数据
     */
    public Map<String, Map<String, String>> setPubDictData() {
        if (null != GlobalResource.PubDict) {
            GlobalResource.PubDict.clear();
        } else {
            GlobalResource.PubDict = new HashMap<String, Map<String, String>>();
        }

        List<PubDict> listPubDict = pubDictMapper.getList();

        String dictkey = null;
        for (PubDict dict : listPubDict) {
            dictkey = dict.getTableName() + "*" + dict.getColumnName();
            Map<String, String> childMap;
            if (GlobalResource.PubDict.containsKey(dictkey)) {
                childMap = GlobalResource.PubDict.get(dictkey);
            } else {
                childMap = new LinkedHashMap<String, String>();
                GlobalResource.PubDict.put(dictkey, childMap);
            }
            childMap.put(String.valueOf(dict.getVcode()), dict.getVname());
            logger.info("初始化数据字典成功," + dictkey + "。");
        }
        return GlobalResource.PubDict;
    }

}
