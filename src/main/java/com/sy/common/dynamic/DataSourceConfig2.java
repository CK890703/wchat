package com.sy.common.dynamic;

import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.log4j.Logger;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;

/**
 * 自定义数据源配置
 * User: Chandler
 * Date: 22/02/16
 */
@Configuration
@MapperScan(basePackages = "com.sy.mapper.business", sqlSessionFactoryRef = "sqlSessionFactoryBean2")
public class DataSourceConfig2 {
    static Logger logger = Logger.getLogger(DataSourceConfig2.class);

    @Bean(name = "sqlSessionFactoryBean2")
    public SqlSessionFactory sqlSessionFactoryBean2() throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(DynamicDataSourceRegister.customDataSources.get(DynamicDataSourceRegister.customDataSourcesNameList.get(0)));
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        sqlSessionFactoryBean.setMapperLocations(resolver.getResources("classpath:/mybatis/mapping/business/*.xml"));
        logger.debug("SqlSessionFactory init.....");
        return sqlSessionFactoryBean.getObject();
    }

    @Bean(name = "ds2")
    public PlatformTransactionManager transactionManager2() {
        logger.debug("transactionManager init.......");
        return new DataSourceTransactionManager(DynamicDataSourceRegister.customDataSources.get(DynamicDataSourceRegister.customDataSourcesNameList.get(0)));
    }

}
