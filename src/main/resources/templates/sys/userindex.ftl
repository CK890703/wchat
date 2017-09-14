<#import "../common/spring.ftl" as s />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="zh-cn">
<head>
    <base id="contextPath" href="${request.contextPath}/">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <title>账户管理</title>
    <meta name="description" content="账户管理" />
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
        <div class="row " style="width: 100%; height: 40px; float: left; border-bottom: 1px solid #eaeaea;margin-top: 10px;">
            <form id="checkform" class="form-inline" role="form">
                <div class="form-group" style="margin-left:16px;">
                    <label>登录名：</label>
                    <input type="text" serachkey="userName" placeholder="登录名" name="userName" id="userName" class="form-control " data-provide="typeahead">
                    <label>用户角色：</label>
                    <select serachkey="roleId" name="roleId" id="roleId" class="form-control " data-provide="typeahead">
                        <option value="">请选择</option>
                        <#if roleList??>
                            <#list roleList as role>
                                <option value="${role.roleId}" >${role.roleName}</option>
                            </#list>
                        </#if>
                    </select>
                    <label>启用状态：</label>
                    <select serachkey="state" name="state" id="state" class="form-control " data-provide="typeahead">
                        <option value="">请选择</option>
                        <option value="1">启用</option>
                        <option value="0">停用</option>
                    </select>
                </div>
                <button  id="buttonSearch" class="btn btn-purple btn-sm" type="button">
                    <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>查询
                </button>
                <@shiro.hasPermission name="user:add">
                    <button id="J_BtnAdd" tag="" class="btn btn-purple_a btn-sm" type="button">
                        <i class="ace-icon fa fa-plus  bigger-110"></i>添加
                    </button>
                </@shiro.hasPermission>
                <@shiro.hasPermission name="user:modify">
                    <input type="hidden" id="modifypermissions" name="modifypermissions" value="modify"/>
                </@shiro.hasPermission>
                <@shiro.hasPermission name="user:delete">
                    <input type="hidden" id="deletepermissions" name="deletepermissions" value="delete"/>
                </@shiro.hasPermission>
                <@shiro.hasPermission name="user:show">
                    <input type="hidden" id="showpermissions" name="showpermissions" value="show"/>
                </@shiro.hasPermission>
            </form>
        </div>
        <div class="row">
            <table id="tdata" class="table table-striped table-bordered table-hover"  data-id-column="userId" data-name-column="">
                <colgroup>
                    <colstyle="min-width:10px;" class = "cgcol">
                    <colstyle="min-width:80px;" class = "cgcol">
                    <colstyle="min-width:80px;" class = "cgcol">
                    <colstyle="min-width:80px;" class = "cgcol">
                    <colstyle="min-width:80px;" class = "cgcol">
                    <colstyle="min-width:80px;" class = "cgcol">
                    <colstyle="min-width:80px;" class = "cgcol">
                    <colstyle="min-width:80px;" class = "cgcol">
                    <colstyle="width:100px;min-width:100px;" class = "cgcol">
                </colgroup>
                <thead id="datas" data-id-column="userId" data-name-column="userName">
                <tr>
                    <th data-type="value" data-column="userId">用户编号</th>
                    <th data-type="value" data-column="userName">登录名</th>
                    <th data-type="value" data-column="roleName">角色</th>
                    <th data-type="value" data-column="realName">姓名</th>
                    <th data-type="value" data-column="phone">联系方式</th>
                    <th data-type="value" data-column="state" data-escape='{"0":"停用","1":"启用"}'>启用状态</th>
                    <th data-type="value" data-column="lastestLoginTime">最近登录时间</th>
                    <th data-type="value" data-column="createTime">创建时间</th>
                    <th data-type="moreoperate" data-cols="userId,state" onrendering="initOperate">操 作</th>
                </tr>
                </thead>
                <tbody id="listInfo" data-nametype="2"
                       data-listAjax="<@s.url '/user/userlist'/>"
                       data-delAjax="<@s.url '/user/rm'/>" >
                </tbody>
            </table>
        </div>
        <div class="row">
            <div class="pagination" id="J_pagination">
                <div class="paging"></div>
            </div>
        </div>
    </div>
</div>

    <div class="modal fade" id="addUserInfo" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" >
                <div class="modal-header ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" style="cursor: hand;">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <div class="modal-title">新增账号</div>
                </div>
                <form action="<@s.url '/user/update'/>"  method="post" class="form-horizontal" id="fmAdd">
                    <div class="modal-body">
                        <div class="widget-box">
                            <div class="widget-content nopadding">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>所属角色：
                                    </label>
                                    <select class="col-xs-3 col-sm-3" id="roleId_add" json-id="roleId" name="roleId" >
                                        <option value="">请选择</option>
                                        <#if roleList??>
                                            <#list roleList as role>
                                                <option role-data="${role.roleName}" value="${role.roleId}" >${role.roleName}</option>
                                            </#list>
                                        </#if>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>登录名：
                                    </label>
                                    <input type="text" class="col-xs-3 col-sm-3" id="userName_add" json-id="userName" name="userName" placeholder="请输入登录名"/>
                                    <input type="hidden" id="oldUserName_add" name="oldUserName">
                                </div>
                                <input name="userType" id="userType_add1" json-id="userType" type="hidden" value="1" />
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        联系人姓名：
                                    </label>
                                    <input type="text" class="col-xs-3 col-sm-3" id="realName_add" json-id="realName" name="realName" placeholder="请输入姓名"/>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        联系人手机号：
                                    </label>
                                    <input type="text" class="col-xs-3 col-sm-3" id="phone_add" json-id="phone" name="phone" placeholder="请输入手机号"/>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        邮箱：
                                    </label>
                                    <input type="text" class="col-xs-3 col-sm-3" id="email_add" json-id="email" name="email" placeholder="请输入邮箱"/>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        性别：
                                    </label>
                                    <div class="col-xs-6 col-sm-6">
                                        <input name="sex" id="sex_add1" json-id="sex" type="radio" value="0"/>
                                        <label for="sex_add1">男</label>
                                        <input name="sex" id="sex_add2" json-id="sex" type="radio" value="1"/>
                                        <label for="sex_add2">女</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        年龄：
                                    </label>
                                    <input type="text" class="col-xs-3 col-sm-3" id="age_add" json-id="age" name="age" placeholder="请输入年龄"/>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>状态：
                                    </label>
                                    <div class="col-xs-6 col-sm-6">
                                        <input name="state" id="state_add1" json-id="state" type="radio" value="1"/>
                                        <label for="state_add1">启用</label>
                                        <input name="state" id="state_add2" json-id="state" type="radio" value="0"/>
                                        <label for="state_add2">停用</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        备注：
                                    </label>
                                    <div class="col-xs-6 col-sm-6">
                                        <textarea id="discription_add" rows="5" json-id="discription" name="discription" placeholder="" style="margin: 0px 5px 0px 0px; width: 360px;" > </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" id="btnadd" class="btn btn-white btn-info btn-bold">
                            <i class="ace-icon fa fa-floppy-o bigger-120 blue"></i>保存
                        </button>
                        <button type="button" class="btn btn-white btn-default btn-round" data-dismiss="modal">
                            <i class="ace-icon fa fa-times red2"></i>取消
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="editUserInfo"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="">
                <div class="modal-header ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"
                     style="cursor: hand;">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <div class="modal-title" id="Div6">修改账号</div>
                </div>
                <form action="<@s.url '/user/update'/>"  method="post" class="form-horizontal" id="frmModify">
                    <div class="modal-body">
                        <div class="widget-box">
                            <input type="hidden" id="userId_modify" name="userId" json-id="userId"/>
                            <div class="widget-content nopadding">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>所属角色：
                                    </label>
                                    <select class="col-xs-3 col-sm-3" id="roleId_modify" json-id="roleId" name="roleId" >
                                        <#if roleList??>
                                            <#list roleList as role>
                                                <option role-data="${role.roleName}" value="${role.roleId}" >${role.roleName}</option>
                                            </#list>
                                        </#if>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>登录名：
                                    </label>
                                    <input type="text" class="col-xs-3 col-sm-3" id="user_name_modify" json-id="userName" name="userName" placeholder="请输入登录名" readonly/>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        联系人姓名：
                                    </label>
                                    <input type="text" class="col-xs-3 col-sm-3" id="realName_modify" json-id="realName" name="realName" placeholder="请输入姓名"/>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        联系人手机号：
                                    </label>
                                    <input type="text" class="col-xs-3 col-sm-3" id="phone_modify" json-id="phone" name="phone" placeholder="请输入手机号"/>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        邮箱：
                                    </label>
                                    <input type="text" class="col-xs-3 col-sm-3" id="email_modify" json-id="email" name="email" placeholder="请输入邮箱"/>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        性别：
                                    </label>
                                    <div class="col-xs-6 col-sm-6">
                                        <input name="sex" id="sex_modify1" json-id="sex" type="radio" value="0"/>
                                        <label for="sex_modify1">男</label>
                                        <input name="sex" id="sex_modify2" json-id="sex" type="radio" value="1"/>
                                        <label for="sex_modify2">女</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        年龄：
                                    </label>
                                    <input type="text" class="col-xs-3 col-sm-3" id="age_modify" json-id="age" name="age" placeholder="请输入年龄"/>
                                </div>
                                <#--<div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>状态：
                                    </label>
                                    <div class="col-xs-6 col-sm-6">
                                        <input name="state" id="state_modify1" json-id="state" type="radio" value="1"/>
                                        <label for="state_modify1">启用</label>
                                        <input name="state" id="state_modify2" json-id="state" type="radio" value="0"/>
                                        <label for="state_modify2">停用</label>
                                    </div>
                                </div>-->
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        备注：
                                    </label>
                                    <div class="col-xs-6 col-sm-6">
                                        <textarea id="discription_modify" rows="5" json-id="discription" name="discription" placeholder="" style="margin: 0px 5px 0px 0px; width: 360px;" > </textarea>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="submit" id="J_btn_modify" class="btn btn-white btn-info btn-bold">
                            <i class="ace-icon fa fa-floppy-o bigger-120 blue"></i>保存
                        </button>
                        <button type="button" class="btn btn-white btn-default btn-round" data-dismiss="modal">
                            <i class="ace-icon fa fa-times red2"></i>取消
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <script>
        var delurl = "<@s.url'/user/rm'/>";
        var editurl = "<@s.url'/user/get?d='/>";
        var updateurl = "<@s.url'/user/update'/>";
        var resetpwdurl = "<@s.url'/user/resetpwd'/>";
    </script>
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
    <script type="text/javascript" src="<@s.url '/js/initlist.js'/>" ></script>
    <script type="text/javascript" src="<@s.url '/js/page/user.js'/>" ></script>
</body>
</html>