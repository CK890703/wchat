package com.sy.mapper.business;

import com.sy.domain.business.DataSequence;

import java.util.Map;

public interface DataSequenceMapper {
    int deleteByPrimaryKey(Long id);

    int insert(DataSequence record);

    int insertSelective(DataSequence record);

    DataSequence selectByPrimaryKey(Long id);

    int updateByPrimaryKeySelective(DataSequence record);

    int updateByPrimaryKey(DataSequence record);

    Map<String, Object> getSequenceNum(Map<String, Object> param);
}