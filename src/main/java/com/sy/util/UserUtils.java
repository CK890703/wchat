package com.sy.util;

import com.sy.common.Constant.Constants;
import com.sy.domain.sys.User;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.subject.Subject;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by 杨成1 on 2016/4/12.
 */
public class UserUtils {

    /**
     * 获取当前登陆用户名
     * @return
     */
    public static String getCurrentUsername() {
        String username = "";
        //获取当前的Subject
        Subject currentUser = SecurityUtils.getSubject();
        if(null != currentUser && null != currentUser.getPrincipal()){
            username = currentUser.getPrincipal().toString();
        }
        return username;
    }

    /**
     * 获取当前登陆用户
     * @return
     */
    public static User getCurrentUser() {
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes sra = (ServletRequestAttributes)ra;
        HttpServletRequest httpRequest = sra.getRequest();
        User user = (User) httpRequest.getSession().getAttribute(Constants.SYS.WEB_USER_SESSION);
        return user;
    }

}
