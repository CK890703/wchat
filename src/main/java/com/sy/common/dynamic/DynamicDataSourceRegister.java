package com.sy.common.dynamic;

import com.alibaba.druid.pool.DruidDataSource;
import com.alibaba.druid.util.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.MutablePropertyValues;
import org.springframework.beans.PropertyValues;
import org.springframework.beans.factory.support.BeanDefinitionRegistry;
import org.springframework.beans.factory.support.GenericBeanDefinition;
import org.springframework.boot.bind.RelaxedDataBinder;
import org.springframework.boot.bind.RelaxedPropertyResolver;
import org.springframework.context.EnvironmentAware;
import org.springframework.context.annotation.ImportBeanDefinitionRegistrar;
import org.springframework.core.convert.ConversionService;
import org.springframework.core.convert.support.DefaultConversionService;
import org.springframework.core.env.Environment;
import org.springframework.core.type.AnnotationMetadata;

import javax.sql.DataSource;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * 动态数据源注册
 * 启动动态数据源请在启动类中（Application）
 * 添加 @Import(DynamicDataSourceRegister.class)
 * Created by 杨成 on 2016/2/29.
 */
public class DynamicDataSourceRegister implements ImportBeanDefinitionRegistrar, EnvironmentAware {

    static Logger logger = Logger.getLogger(DynamicDataSourceRegister.class);

    private ConversionService conversionService = new DefaultConversionService();
    private PropertyValues dataSourcePropertyValues;

    // 如配置文件中未指定数据源类型，使用该默认值
    private static final Object DATASOURCE_TYPE_DEFAULT = "org.apache.tomcat.jdbc.pool.DataSource";

    // 数据源
    public static DataSource defaultDataSource;
    public static Map<String, DataSource> customDataSources = new HashMap<>();
    public static List<String> customDataSourcesNameList = new ArrayList<String>();

    @Override
    public void registerBeanDefinitions(AnnotationMetadata importingClassMetadata, BeanDefinitionRegistry registry) {
        Map<Object, Object> targetDataSources = new HashMap<Object, Object>();
        // 将主数据源添加到更多数据源中
        targetDataSources.put("dataSource", defaultDataSource);
        DynamicDataSourceContextHolder.dataSourceIds.add("dataSource");
        // 添加更多数据源
        targetDataSources.putAll(customDataSources);
        for (String key : customDataSources.keySet()) {
            DynamicDataSourceContextHolder.dataSourceIds.add(key);
        }

        // 创建DynamicDataSource
        GenericBeanDefinition beanDefinition = new GenericBeanDefinition();
        beanDefinition.setBeanClass(DynamicDataSource.class);
        beanDefinition.setSynthetic(true);
        MutablePropertyValues mpv = beanDefinition.getPropertyValues();
        mpv.addPropertyValue("defaultTargetDataSource", defaultDataSource);
        mpv.addPropertyValue("targetDataSources", targetDataSources);
        registry.registerBeanDefinition("dataSource", beanDefinition);

        logger.info("Dynamic DataSource Registry");
    }

    /**
     * 创建DataSource
     */
    @SuppressWarnings("unchecked")
    public DataSource buildDataSource(Map<String, Object> dsMap) {
//        try {
//            Object type = dsMap.get("type");
//            if (type == null)
//                type = DATASOURCE_TYPE_DEFAULT;// 默认DataSource
//
//            Class<? extends DataSource> dataSourceType;
//            dataSourceType = (Class<? extends DataSource>) Class.forName((String) type);

            String driverClassName = dsMap.get("jdbcDriver").toString();
            String url = dsMap.get("url").toString();
            String username = dsMap.get("username").toString();
            String password = dsMap.get("password").toString();


//            DataSourceBuilder factory = DataSourceBuilder.create().driverClassName(driverClassName).url(url)
//                    .username(username).password(password).type(dataSourceType);
//            return factory.build();
            DruidDataSource druidDataSource = new DruidDataSource();
            druidDataSource.setDriverClassName(driverClassName);
            druidDataSource.setUrl(url);
            druidDataSource.setUsername(username);
            druidDataSource.setPassword(password);

            //configuration
            druidDataSource.setInitialSize(Integer.parseInt(dsMap.get("initialSize").toString()));
            druidDataSource.setMinIdle(Integer.parseInt(dsMap.get("minIdle").toString()));
            druidDataSource.setMaxActive(Integer.parseInt(dsMap.get("maxActive").toString()));
            druidDataSource.setMaxWait(Long.parseLong(dsMap.get("maxWait").toString()));
            druidDataSource.setTimeBetweenEvictionRunsMillis(Long.parseLong(dsMap.get("timeBetweenEvictionRunsMillis").toString()));
            druidDataSource.setMinEvictableIdleTimeMillis(Long.parseLong(dsMap.get("minEvictableIdleTimeMillis").toString()));
            druidDataSource.setValidationQuery(dsMap.get("validationQuery").toString());
            druidDataSource.setTestWhileIdle(Boolean.parseBoolean(dsMap.get("testWhileIdle").toString()));
            druidDataSource.setTestOnBorrow(Boolean.parseBoolean(dsMap.get("testOnBorrow").toString()));
            druidDataSource.setTestOnReturn(Boolean.parseBoolean(dsMap.get("testOnReturn").toString()));
            druidDataSource.setPoolPreparedStatements(Boolean.parseBoolean(dsMap.get("poolPreparedStatements").toString()));
            druidDataSource.setMaxPoolPreparedStatementPerConnectionSize(Integer.parseInt(dsMap.get("maxPoolPreparedStatementPerConnectionSize").toString()));
            try {
                druidDataSource.setFilters(dsMap.get("filters").toString());
            } catch (SQLException e) {
                logger.error("druid configuration initialization filter", e);
            }
            druidDataSource.setConnectionProperties(dsMap.get("connectionProperties").toString());

            return druidDataSource;
//        } catch (ClassNotFoundException e) {
//            e.printStackTrace();
//        }
//        return null;
    }

    /**
     * 加载多数据源配置
     */
    @Override
    public void setEnvironment(Environment env) {
        initDefaultDataSource(env);
        initCustomDataSources(env);
    }

    /**
     * 初始化主数据源
     */
    private void initDefaultDataSource(Environment env) {
        // 读取主数据源
        RelaxedPropertyResolver propertyResolver = new RelaxedPropertyResolver(env, "spring.datasource.");
        Map<String, Object> dsMap = new HashMap<>();
        dsMap.put("type", propertyResolver.getProperty("type"));
        dsMap.put("jdbcDriver", propertyResolver.getProperty("jdbcDriver"));
        dsMap.put("url", propertyResolver.getProperty("url"));
        dsMap.put("username", propertyResolver.getProperty("username"));
        dsMap.put("password", propertyResolver.getProperty("password"));

        fillConfigs(env, dsMap);

        defaultDataSource = buildDataSource(dsMap);

        dataBinder(defaultDataSource, env);
    }

    private void fillConfigs(Environment env, Map<String, Object> dsMap){
        RelaxedPropertyResolver propertyResolver = new RelaxedPropertyResolver(env, "spring.datasource.");
        dsMap.put("initialSize", propertyResolver.getProperty("initialSize"));
        dsMap.put("minIdle", propertyResolver.getProperty("minIdle"));
        dsMap.put("maxActive", propertyResolver.getProperty("maxActive"));
        dsMap.put("maxWait", propertyResolver.getProperty("maxWait"));
        dsMap.put("timeBetweenEvictionRunsMillis", propertyResolver.getProperty("timeBetweenEvictionRunsMillis"));
        dsMap.put("minEvictableIdleTimeMillis", propertyResolver.getProperty("minEvictableIdleTimeMillis"));
        dsMap.put("validationQuery", propertyResolver.getProperty("validationQuery"));
        dsMap.put("testWhileIdle", propertyResolver.getProperty("testWhileIdle"));
        dsMap.put("testOnBorrow", propertyResolver.getProperty("testOnBorrow"));
        dsMap.put("testOnReturn", propertyResolver.getProperty("testOnReturn"));
        dsMap.put("poolPreparedStatements", propertyResolver.getProperty("poolPreparedStatements"));
        dsMap.put("maxPoolPreparedStatementPerConnectionSize", propertyResolver.getProperty("maxPoolPreparedStatementPerConnectionSize"));
        dsMap.put("filters", propertyResolver.getProperty("filters"));
        dsMap.put("connectionProperties", propertyResolver.getProperty("connectionProperties"));
        dsMap.put("useGlobalDataSourceStat", propertyResolver.getProperty("useGlobalDataSourceStat"));
    }

    /**
     * 为DataSource绑定更多数据
     *
     * @param dataSource
     * @param env
     */
    private void dataBinder(DataSource dataSource, Environment env){
        RelaxedDataBinder dataBinder = new RelaxedDataBinder(dataSource);
        //dataBinder.setValidator(new LocalValidatorFactory().run(this.applicationContext));
        dataBinder.setConversionService(conversionService);
        dataBinder.setIgnoreNestedProperties(false);//false
        dataBinder.setIgnoreInvalidFields(false);//false
        dataBinder.setIgnoreUnknownFields(true);//true
        if(dataSourcePropertyValues == null){
            Map<String, Object> rpr = new RelaxedPropertyResolver(env, "spring.datasource").getSubProperties(".");
            Map<String, Object> values = new HashMap<>(rpr);
            // 排除已经设置的属性
            values.remove("type");
            values.remove("jdbcDriver");
            values.remove("url");
            values.remove("username");
            values.remove("password");
            dataSourcePropertyValues = new MutablePropertyValues(values);
        }
        dataBinder.bind(dataSourcePropertyValues);
    }

    /**
     * 初始化更多数据源
     */
    private void initCustomDataSources(Environment env) {
        // 读取配置文件获取更多数据源，也可以通过defaultDataSource读取数据库获取更多数据源
        RelaxedPropertyResolver propertyResolver = new RelaxedPropertyResolver(env, "custom.datasource.");
        String dsPrefixs = propertyResolver.getProperty("names");
        if(!StringUtils.isEmpty(dsPrefixs))
        for (String dsPrefix : dsPrefixs.split(",")) {// 多个数据源
            Map<String, Object> subProperties = propertyResolver.getSubProperties(dsPrefix + ".");
            Map<String, Object> dsMap = new HashMap<>();
            dsMap.put("type", subProperties.get("type"));
            dsMap.put("jdbcDriver", subProperties.get("jdbcDriver"));
            dsMap.put("url", subProperties.get("url"));
            dsMap.put("username", subProperties.get("username"));
            dsMap.put("password", subProperties.get("password"));
            fillConfigs(env, dsMap);
            DataSource ds = buildDataSource(dsMap);
            customDataSourcesNameList.add(dsPrefix);
            customDataSources.put(dsPrefix, ds);
            dataBinder(ds, env);
        }
    }
}
