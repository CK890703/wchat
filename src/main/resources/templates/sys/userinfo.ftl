<#import "../common/spring.ftl" as s />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="zh-cn">
<head>
    <base id="contextPath" href="${request.contextPath}/">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <title>账户中心</title>
    <meta name="description" content="账户中心" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="<@s.url '/BootStrap/css/bootstrap.min.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<@s.url '/BootStrap/css/font-awesome.min.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<@s.url '/BootStrap/css/ace.min.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<@s.url '/BootStrap/css/ace-skins.min.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<@s.url '/BootStrap/css/ace-rtl.min.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<@s.url '/Yui/themes/icon.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<@s.url '/Yui/themes/default/easyui.css'/>"/>
    <link rel="stylesheet" type="text/css" href="<@s.url '/js/uploadify/uploadify.css'/>" />
    <link rel="stylesheet" type="text/css" href="<@s.url '/css/style.css'/>" >
    <link rel="stylesheet" type="text/css" href="<@s.url '/js/layer/skin/layer.css'/>"/>
</head>
<body class="no-skin body_bg">
    <div class="">
        <div class="col-xs-12 table_body" style="border-radius: 10px;">
            <div style="margin-left: 15px;margin-top: 10px;">
                <ul class="nav nav-tabs" id="myTab">
                    <li class="active">
                        <a href="#userinfo">账户信息</a>
                    </li>
                    <li>
                        <a href="#safe">修改密码</a>
                    </li>
                </ul>
                <div class="tab-content" id="myTabContent">
                    <div class="tab-pane fade in active" id="userinfo">
                        <div class="modal-content" style="border: 1px solid #428bca;">
                        <form action="<@s.url '/user/userSave'/>"  method="post" class="form-horizontal" id="frmUserInfo">
                            <div class="modal-body">
                                <div class="widget-box">
                                    <div class="widget-content nopadding">
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                                账&nbsp;&nbsp;&nbsp;号：
                                            </label>
                                            <input type="text" class="col-xs-3 col-sm-3" id="user_name" json-id="userName" name="userName" value="${userInfo.userName}" readonly/>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                                姓&nbsp;&nbsp;&nbsp;名：
                                            </label>
                                            <input type="text" class="col-xs-3 col-sm-3" id="realName" json-id="realName" name="realName" value="${userInfo.realName}" placeholder="请输入姓名"/>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                                手机号：
                                            </label>
                                            <input type="text" class="col-xs-3 col-sm-3" id="phone" json-id="phone" name="phone" value="${userInfo.phone}" placeholder="请输入手机号"/>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                                邮&nbsp;&nbsp;&nbsp;箱：
                                            </label>
                                            <input type="text" class="col-xs-3 col-sm-3" id="email" json-id="email" name="email" value="${userInfo.email}" placeholder="请输入邮箱"/>
                                        </div>
                                        <div class="form-group">
                                            <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                                性&nbsp;&nbsp;&nbsp;别：
                                            </label>
                                            <div class="col-xs-6 col-sm-6">
                                                <input name="sex" id="sex1" json-id="sex" type="radio" value="0" <#if userInfo.sex == 0>checked</#if>/>
                                                <label for="sex1">男</label>
                                                <input name="sex" id="sex2" json-id="sex" type="radio" value="1" <#if userInfo.sex == 1>checked</#if>/>
                                                <label for="sex2">女</label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="modal-footer">
                                <button type="submit" id="J_btn" class="btn btn-white btn-info btn-bold">
                                    <i class="ace-icon fa fa-floppy-o bigger-120 blue"></i>保存
                                </button>
                                <button type="button" class="btn btn-white btn-default btn-round" id="J_userinfo_cancel" data-dismiss="modal">
                                    <i class="ace-icon fa fa-times red2"></i>取消
                                </button>
                            </div>
                        </form>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="safe">
                        <div class="modal-content" style="border: 1px solid #428bca;">
                            <form action="<@s.url '/user/userPsw'/>"  method="post" class="form-horizontal" id="frmUserSafe">
                                <div class="modal-body">
                                    <div class="widget-box">
                                        <div class="widget-content nopadding">
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                                    请输入原密码：
                                                </label>
                                                <input type="text" class="col-xs-3 col-sm-3" id="orgPsw" json-id="orgPsw" name="orgPsw"/>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                                    请输入新密码：
                                                </label>
                                                <input type="text" class="col-xs-3 col-sm-3" id="newPsw" json-id="newPsw" name="newPsw"/>
                                            </div>
                                            <div class="form-group">
                                                <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                                    请确认新密码：
                                                </label>
                                                <input type="text" class="col-xs-3 col-sm-3" id="conPsw" json-id="conPsw" name="conPsw"/>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="modal-footer">
                                    <button type="submit" id="J_btn" class="btn btn-white btn-info btn-bold">
                                        <i class="ace-icon fa fa-floppy-o bigger-120 blue"></i>保存
                                    </button>
                                    <button type="button" class="btn btn-white btn-default btn-round" id="J_usersafe_cancel" data-dismiss="modal">
                                        <i class="ace-icon fa fa-times red2"></i>取消
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <script type="text/javascript" src="<@s.url '/Yui/jquery-1.8.0.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/Yui/jquery.easyui.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/Yui/easyui-lang-zh_CN.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/BootStrap/js/bootstrap.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/BootStrap/js/jquery-ui.custom.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/BootStrap/js/jquery.ui.touch-punch.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/BootStrap/js/ace-elements.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/BootStrap/js/ace.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/js/uploadify/jquery.uploadify.min.js'/>" ></script>
    <script type="text/javascript" src="<@s.url '/js/jquery-validation/jquery.validate.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/js/jquery-validation/additional-methods.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/js/jquery.form.js'/>" ></script>
    <script type="text/javascript" src="<@s.url '/js/layer/layer.min.js'/>" ></script>
    <script type="text/javascript" src="<@s.url '/js/paging.js'/>" ></script>
    <script type="text/javascript" src="<@s.url '/js/common.js'/>" ></script>
    <script type="text/javascript" src="<@s.url '/js/page/userinfo.js'/>"></script>
</body>
</html>