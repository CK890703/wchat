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
@MapperScan(basePackages = "com.sy.mapper.sys",sqlSessionFactoryRef="sqlSessionFactoryBean")
public class DataSourceConfig {

    static Logger logger = Logger.getLogger(DataSourceConfig.class);

    @Bean(name = "sqlSessionFactoryBean")
    public SqlSessionFactory sqlSessionFactoryBean() throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(DynamicDataSourceRegister.defaultDataSource);
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        sqlSessionFactoryBean.setMapperLocations(resolver.getResources("classpath:/mybatis/mapping/sys/*.xml"));
        logger.debug("SqlSessionFactory init.....");
        return sqlSessionFactoryBean.getObject();
    }

    @Bean(name = "ds1")
    public PlatformTransactionManager transactionManager() {
        logger.debug("transactionManager init.......");
        return new DataSourceTransactionManager(DynamicDataSourceRegister.defaultDataSource);
    }

}
