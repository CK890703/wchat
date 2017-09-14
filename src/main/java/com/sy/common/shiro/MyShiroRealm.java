package com.sy.common.shiro;

import com.sy.common.enums.EnumUtil;
import com.sy.domain.sys.RoleModuleRelation;
import com.sy.domain.sys.User;
import com.sy.mapper.sys.RoleModuleRelationMapper;
import com.sy.mapper.sys.UserMapper;
import org.apache.shiro.authc.*;
import org.apache.shiro.authc.credential.HashedCredentialsMatcher;
import org.apache.shiro.authz.AuthorizationInfo;
import org.apache.shiro.authz.SimpleAuthorizationInfo;
import org.apache.shiro.realm.AuthorizingRealm;
import org.apache.shiro.subject.PrincipalCollection;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.util.*;

/**
 * Created by 杨成 on 2016/4/11.
 */
@Component
public class MyShiroRealm extends AuthorizingRealm {

    private static final Logger logger = LoggerFactory.getLogger(MyShiroRealm.class);

    public static final String HASH_ALGORITHM = "MD5";
    public static final int HASH_INTERATIONS = 1;

    @Autowired
    private UserMapper sysUserMapper;
    @Autowired
    private RoleModuleRelationMapper roleModuleRelationMapper;

    /**
     * 权限认证，为当前登录的Subject授予角色和权限
     *
     * @see 经测试：本例中该方法的调用时机为需授权资源被访问时
     * @see 经测试：并且每次访问需授权资源时都会执行该方法中的逻辑，这表明本例中默认并未启用AuthorizationCache
     * @see 经测试：如果连续访问同一个URL（比如刷新），该方法不会被重复调用，Shiro有一个时间间隔（也就是cache时间，在ehcache-shiro.xml中配置），超过这个时间间隔再刷新页面，该方法会被执行
     */
    @Override
    protected AuthorizationInfo doGetAuthorizationInfo(PrincipalCollection principalCollection) {
        //获取当前登录输入的用户名，等价于(String) principalCollection.fromRealm(getName()).iterator().next();
        String loginName = (String) super.getAvailablePrincipal(principalCollection);
        //到数据库查是否有此对象
        Map<String, Object> queryMap = new HashMap<String, Object>();
        queryMap.put("userName", loginName);
        List<User> users = sysUserMapper.getList(queryMap);// 实际项目中，这里可以根据实际情况做缓存，如果不做，Shiro自己也是有时间间隔机制，2分钟内不会重复执行该方法
        if (users != null && !users.isEmpty()) {
            //权限信息对象info,用来存放查出的用户的所有的角色（role）及权限（permission）
            SimpleAuthorizationInfo info = new SimpleAuthorizationInfo();
            //用户的角色集合
            Set<String> roleNameList = new HashSet<String>();
            roleNameList.add(users.get(0).getRoleName());
            info.setRoles(roleNameList);
            //用户的角色对应的所有权限，如果只使用角色定义访问权限，下面的四行可以不要
            List<RoleModuleRelation> roleModuleRelationList = roleModuleRelationMapper.getRoleModuleRelationList(users.get(0).getRoleId());
            List<String> rolePermissions = new ArrayList<String>();
            for (RoleModuleRelation roleModuleRelation : roleModuleRelationList) {
                for (String code : roleModuleRelation.getPermissionCode().split(",")) {
                    rolePermissions.add(roleModuleRelation.getBusinessCode() + ":" + code);
                }
            }
            info.addStringPermissions(rolePermissions);
            // 或者按下面这样添加
            //添加一个角色,不是配置意义上的添加,而是证明该用户拥有admin角色
//            simpleAuthorInfo.addRole("admin");
            //添加权限
//            simpleAuthorInfo.addStringPermission("admin:manage");
//            logger.info("已为用户[mike]赋予了[admin]角色和[admin:manage]权限");
            return info;
        }
        // 返回null的话，就会导致任何用户访问被拦截的请求时，都会自动跳转到unauthorizedUrl指定的地址
        return null;
    }

    /**
     * 登录认证
     */
    @Override
    protected AuthenticationInfo doGetAuthenticationInfo(AuthenticationToken authenticationToken) throws AuthenticationException {
        //UsernamePasswordToken对象用来存放提交的登录信息
        UsernamePasswordToken token = (UsernamePasswordToken) authenticationToken;
        logger.info("验证当前Subject时获取到token为：" + token);
        //查出是否有此用户
        Map<String, Object> queryMap = new HashMap<String, Object>();
        queryMap.put("userName", token.getUsername());
        List<User> users = sysUserMapper.getList(queryMap);
        if (users != null && !users.isEmpty()) {
            if (EnumUtil.EnableEnum.ENABLE.getCode().equals(users.get(0).getState())) {
                // 若存在，将此用户存放到登录认证info中，无需自己做密码对比，Shiro会为我们进行密码对比校验
                return new SimpleAuthenticationInfo(users.get(0).getUserName(), users.get(0).getPassword(), getName());
            } else {
                throw new DisabledAccountException();
            }
        } else {
            throw new UnknownAccountException();
        }
    }

    @PostConstruct
    public void initCredentialsMatcher() {
        HashedCredentialsMatcher matcher = new HashedCredentialsMatcher(HASH_ALGORITHM);
        matcher.setHashIterations(HASH_INTERATIONS);
        setCredentialsMatcher(matcher);
    }

}
