package com.sy.service;

import com.sy.mapper.business.DataSequenceMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;

/**
 * 自增序列化信息
 */

@Service
public class DataSequenceService {

    Logger logger = Logger.getLogger(DataSequenceService.class);

    @Autowired
    private DataSequenceMapper dataSequenceMapper;

    public int getSequenceNum(String seqname) {
        HashMap<String, Object> paras = new HashMap<String, Object>();
        paras.put("seqname", seqname);
        paras.put("min", 0);
        paras.put("max", 0);
        dataSequenceMapper.getSequenceNum(paras);
        return (Integer) paras.get("max");
    }

}
