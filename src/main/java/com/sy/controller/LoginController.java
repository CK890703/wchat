package com.sy.controller;

import com.sy.common.Constant.Constants;
import com.sy.domain.sys.MenuItem;
import com.sy.domain.sys.MenuItemBo;
import com.sy.domain.sys.User;
import com.sy.service.ModuleService;
import com.sy.service.UserService;
import com.sy.util.MD5;
import com.sy.util.ResultUtil;
import com.sy.util.UserUtils;
import com.sy.util.ValidateCode;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.*;
import org.apache.shiro.subject.Subject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@RequestMapping("/")
public class LoginController extends BaseController {
    Logger logger = Logger.getLogger(LoginController.class);
    // 验证码参数
    private static String CHECKCODE = "code";
    // 当前输入的验证码
    private static final String CURRENTCHECKCODE = "currentCode";
    // 用户账户停用状态
    private static final int STOPFLAG = 0;

    @Autowired
    private UserService userService;
    @Autowired
    private ModuleService moduleService;

    /**
     * 跳转到登录页面
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.GET)
    public String login() {
        return "login";
    }

    /**
     *  登录成功后跳转到主页面
     * @param httpRequest 对象
     * @return
     */
    @ResponseBody
    @RequestMapping(value = "/loginon", method = RequestMethod.POST)
    public String login(HttpServletRequest httpRequest) {
        String currentCode = httpRequest.getParameter(CHECKCODE);
        String loginName = httpRequest.getParameter("username");
        String loginPassword = httpRequest.getParameter("password");
        httpRequest.setAttribute(CURRENTCHECKCODE, currentCode);
        try {
            if (StringUtils.isBlank(loginName)) {
                return ResultUtil.getFailureJson("用户名不能为空").toString();
            }
            if (StringUtils.isBlank(loginPassword)) {
                return ResultUtil.getFailureJson("登录密码不能为空").toString();
            }
            // 读取生成的验证码，session过期验证码将会读到null
            Object createcode = httpRequest.getSession().getAttribute(CHECKCODE);
            if (null == createcode) {
                return ResultUtil.getFailureJson("验证码已过期！").toString();
            }
            if (checkCodeCompare(currentCode, createcode.toString())) {
                UsernamePasswordToken token = new UsernamePasswordToken(loginName, loginPassword);
                //获取当前的Subject
                Subject currentUser = SecurityUtils.getSubject();
                try {
                    //在调用了login方法后,SecurityManager会收到AuthenticationToken,并将其发送给已配置的Realm执行必须的认证检查
                    //每个Realm都能在必要时对提交的AuthenticationTokens作出反应
                    //所以这一步在调用login(token)方法时,它会走到MyRealm.doGetAuthenticationInfo()方法中,具体验证方式详见此方法
                    logger.info("对用户[" + loginName + "]进行登录验证..验证开始");
                    currentUser.login(token);
                    logger.info("对用户[" + loginName + "]进行登录验证..验证通过");
                }catch(UnknownAccountException uae){
                    logger.info("对用户[" + loginName + "]进行登录验证..验证未通过,未知账户");
                    return ResultUtil.getFailureJson("用户名或密码不正确").toString();
                }catch(IncorrectCredentialsException ice){
                    logger.info("对用户[" + loginName + "]进行登录验证..验证未通过,错误的凭证");
                    return ResultUtil.getFailureJson("用户名或密码不正确").toString();
                }catch(DisabledAccountException dae){
                    logger.info("对用户[" + loginName + "]进行登录验证..验证未通过,账户已锁定");
                    return ResultUtil.getFailureJson("账户已锁定").toString();
                }catch(ExcessiveAttemptsException eae){
                    logger.info("对用户[" + loginName + "]进行登录验证..验证未通过,错误次数过多");
                    return ResultUtil.getFailureJson("用户名或密码错误次数过多").toString();
                }catch(AuthenticationException ae){
                    //通过处理Shiro的运行时AuthenticationException就可以控制用户登录失败或密码错误时的情景
                    logger.info("对用户[" + loginName + "]进行登录验证..验证未通过,堆栈轨迹如下");
                    ae.printStackTrace();
                    return ResultUtil.getFailureJson("用户名或密码不正确").toString();
                }
                //验证是否登录成功
                if(currentUser.isAuthenticated()){
                    logger.info("用户[" + loginName + "]登录认证通过");
                    //这里可以进行一些认证通过后的一些系统参数初始化操作
                    Map<String, Object> queryMap = new HashMap<String, Object>();
                    queryMap.put("userName", token.getUsername());
                    User user = userService.getList(queryMap).get(0);
                    //将用户登录信息放入session中
                    httpRequest.getSession().setAttribute(Constants.SYS.WEB_USER_SESSION, user);
                    //登录成功后获取用户的权限,并放入session中
                    //List<MenuItem> userPermission = moduleService.getModuleByUserId(user.getUserId(), 0);
                    List<MenuItemBo> userPermission = moduleService.getUserPermission(user.getUserId(), 0);
                    httpRequest.getSession().setAttribute(Constants.SYS.WEB_USERALLRIGHTS_SESSION, userPermission);
                    //记录本次登陆的时间
                    userService.updateLoginTime(user.getUserId());
                    return ResultUtil.getSuccessJson("登录成功！").toString();
                }else{
                    token.clear();
                    return ResultUtil.getFailureJson("用户名或密码不正确！").toString();
                }

            } else {
                return ResultUtil.getFailureJson("验证码错误！").toString();
            }
        } catch (Exception e) {
            logger.error("登录出错" + e.getMessage());
            return ResultUtil.getFailureJson("登录出错！").toString();
        } finally {
            httpRequest.getSession().setAttribute(CHECKCODE, null);
        }
    }

    /**
     * 用户退出
     * @param httpRequest 对象
     * @return
     */
    @RequestMapping("/logout")
    public String logout(HttpServletRequest httpRequest) {
        // 删除用户登录信息的session
        httpRequest.getSession().removeAttribute(Constants.SYS.WEB_USER_SESSION);
        httpRequest.getSession().removeAttribute(Constants.SYS.WEB_USERALLRIGHTS_SESSION);
        //使用权限管理工具进行用户的退出，跳出登录
        SecurityUtils.getSubject().logout();
        // 跳转到登录页面
        return "redirect:/login";
    }

    /**
     * 生成验证码
     */
    @RequestMapping("/getvalidatecode")
    public void getValidateCode(HttpServletRequest httpRequest, HttpServletResponse httpResponse) {
        try {
            // 设置响应的类型格式为图片格式
            httpResponse.setContentType("images/jpeg");
            // 禁止图像缓存。
            httpResponse.setHeader("Pragma", "No-cache");
            httpResponse.setHeader("Cache-Control", "no-cache");
            httpResponse.setDateHeader("Expires", 0);
            ValidateCode vCode = new ValidateCode(160, 40, 4, 88);
            httpRequest.getSession().setAttribute(CHECKCODE, vCode.getCode());
            // 输出图象到页面
            vCode.write(httpResponse.getOutputStream());
        } catch (Exception e) {
            e.printStackTrace();
            logger.error("获取验证码出错");
        }
    }

    /**
     * 修改密码请求页面
     * @param httpRequest 对象
     * @return
     */
    @RequestMapping(value = "/pwdchange", method = RequestMethod.GET)
    public String changPwd(HttpServletRequest httpRequest) {
        httpRequest.setAttribute("user", httpRequest.getSession().getAttribute(Constants.SYS.WEB_USER_SESSION));
        return "manage/changepwd";
    }

    /**
     * 修改密码的操作
     * @param httpRequest 对象
     * @param oldpwd      旧密码
     * @param newpwd1     新密码
     * @param newpwd2     新密码确认
     * @return
     */
    @RequestMapping(value = "/pwdchange", method = RequestMethod.POST)
    public String changPwd(HttpServletRequest httpRequest, String oldpwd, String newpwd1, String newpwd2) {
        User user = UserUtils.getCurrentUser();
        if (user.getPassword().equals(MD5.encodePassword(oldpwd))) {
            if (StringUtils.isBlank(newpwd1) || StringUtils.isBlank(newpwd2)) {
                // 密码未输入
                httpRequest.setAttribute(Constants.SYS.JSON_RESULT_MESSAGE, "密码不能为空");
            } else if (!newpwd1.equals(newpwd2)) {
                // 密码输入不一致
                httpRequest.setAttribute(Constants.SYS.JSON_RESULT_MESSAGE, "两次输入密码输入不一致");
            } else {
                userService.modifyPassword(user.getUserId(), MD5.encodePassword(newpwd2));
                httpRequest.getSession().removeAttribute(Constants.SYS.WEB_USER_SESSION);
                httpRequest.setAttribute(Constants.SYS.JSON_RESULT_MESSAGE, "修改密码成功");
            }
        } else {
            // 原密码输入错误
            httpRequest.setAttribute(Constants.SYS.JSON_RESULT_MESSAGE, "原密码输入错误");
        }
        return "manage/changepwd";
    }

    /**
     * 判断验证码 注：不区分大小写
     * @param currentCode 前台页面输入的验证码
     * @param createcode 后台随即生成的验证码
     * @return boolean 返回类型 false:前后输入不一致； true：输入正确
     */
    private boolean checkCodeCompare(String currentCode, String createcode) {
        boolean flag = false;
        if (null != currentCode || null != createcode) {
            if (currentCode.toLowerCase().equals(createcode.toLowerCase()))
                flag = true;
        }
        return flag;
    }

}
