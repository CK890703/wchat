package com.sy.common.Components;

import com.sy.common.Constant.Constants;
import com.sy.domain.sys.MenuItem;
import com.sy.domain.sys.MenuItemBo;
import com.sy.domain.sys.User;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import javax.servlet.http.HttpServletRequest;
import java.util.ArrayList;
import java.util.List;

/**
 * Created by 杨成1 on 2017/5/3.
 */
@Aspect
@Component
public class ControllerAspect {

    /**
     * 定义拦截规则：拦截com.sy.controller包下面的所有类中，有@RequestMapping注解的方法。
     */
    @Pointcut("execution(* com.sy.controller..*(..)) && @annotation(org.springframework.web.bind.annotation.RequestMapping)")
    public void controllerMethodPointcut(){}

//    @Before("controllerMethodPointcut()")
//    public void doBeforeInServiceLayer(JoinPoint joinPoint) {
//    }
//
//    @After("controllerMethodPointcut()")
//    public void doAfterInServiceLayer(JoinPoint joinPoint) {
//    }

    /**
     *
     * @Title：doAround
     * @Description: 环绕触发
     * @author 杨成1
     * @param pjp
     * @return
     * @throws Throwable
     */
    @Around("controllerMethodPointcut()")
    public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
        /**
         * 1.获取request信息
         * 2.根据request获取session
         * 3.从session中取出登录用户信息
         */
        RequestAttributes ra = RequestContextHolder.getRequestAttributes();
        ServletRequestAttributes sra = (ServletRequestAttributes)ra;
        HttpServletRequest httpRequest = sra.getRequest();
        User user = (User) httpRequest.getSession().getAttribute(Constants.SYS.WEB_USER_SESSION);
        if(user != null){
           /* List<MenuItem> menuItemList = null;
            Object menuItemObject = httpRequest.getSession().getAttribute(Constants.SYS.WEB_USERALLRIGHTS_SESSION);
            if (menuItemObject instanceof ArrayList<?>) {
                menuItemList = (ArrayList<MenuItem>) menuItemObject;
            }*/
            List<MenuItemBo> menuItemBoList = null;
            Object menuItemObject = httpRequest.getSession().getAttribute(Constants.SYS.WEB_USERALLRIGHTS_SESSION);
            if (menuItemObject instanceof ArrayList<?>) {
                menuItemBoList = (ArrayList<MenuItemBo>) menuItemObject;
            }
            httpRequest.setAttribute("user", user);
            //httpRequest.setAttribute("menuItemList", menuItemList);
            httpRequest.setAttribute("menuItemList", menuItemBoList);
        }
        httpRequest.setAttribute("sessionid", httpRequest.getSession().getId());

        Object result = pjp.proceed();// result的值就是被拦截方法的返回值

        return result;
    }
}
