<#import "../common/spring.ftl" as s />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="zh-cn">
<head>
    <base id="contextPath" href="${request.contextPath}/">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <title>角色管理</title>
    <meta name="description" content="角色管理" />
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
                        <label>角色名称：</label>
						<input type="text" serachkey="roleNameSerach" placeholder="角色名称" name="roleName" id="roleName" class="form-control " data-provide="typeahead">
                        <label>启用状态：</label>
                        <select serachkey="state" name="state" id="state" class="form-control " data-provide="typeahead">
                            <option value="">请选择</option>
                            <option value="1">启用</option>
                            <option value="0">停用</option>
                        </select>
                    </div>
                    <button  id="buttonSearch"  class="btn btn-purple btn-sm" type="button">
                        <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>查询
                    </button>
                    <@shiro.hasPermission name="role:add">
                        <button id="J_BtnAdd" tag="" class="btn btn-purple_a btn-sm" type="button">
                            <i class="ace-icon fa fa-plus  bigger-110"></i>添加
                        </button>
                    </@shiro.hasPermission>
                    <@shiro.hasPermission name="role:modify">
                        <input type="hidden" id="modifypermissions" name="modifypermissions" value="modify"/>
                    </@shiro.hasPermission>
                    <@shiro.hasPermission name="role:delete">
                        <input type="hidden" id="deletepermissions" name="deletepermissions" value="delete"/>
                    </@shiro.hasPermission>
                    <@shiro.hasPermission name="role:show">
                        <input type="hidden" id="showpermissions" name="showpermissions" value="show"/>
                    </@shiro.hasPermission>
                    <@shiro.hasPermission name="role:setrole">
                        <input type="hidden" id="setrolepermissions" name="setrolepermissions" value="setrole"/>
                    </@shiro.hasPermission>
                </form>
            </div>
            <div class="row">
                <table id="tdata" class="table table-striped table-bordered table-hover"  data-id-column="roleId" data-name-column="">
					<colgroup>
						<colstyle="min-width:80px;" class = "cgcol">
						<colstyle="min-width:80px;" class = "cgcol">
						<colstyle="min-width:80px;" class = "cgcol">
						<colstyle="min-width:80px;" class = "cgcol">
						<colstyle="min-width:80px;" class = "cgcol">
						<colstyle="min-width:80px;" class = "cgcol">
						<colstyle="min-width:80px;" class = "cgcol">
						<col style="width: 150px;min-width:150px;" class = "cgcol">
					</colgroup>
					<thead id="datas" data-id-column="roleId" data-name-column="">
						<tr>
							<th data-type="value" data-column="roleId">角色编码</th>
							<th data-type="value" data-column="roleName">角色名称</th>
							<th data-type="value" data-column="state" data-escape='{"0":"已停用","1":"已启用"}'>状态</th>
							<th data-type="value" data-column="createTime">创建时间</th>
							<th data-type="value" data-column="creator">创建人</th>
							<th data-type="value" data-column="updateTime">修改时间</th>
							<th data-type="value" data-column="updateMan">修改人</th>
							<th data-type="moreoperate" data-cols="roleId,state" onrendering="initOperate">操 作</th>
						</tr>
					</thead>
                    <tbody  id="listInfo" data-nametype="2"
						data-listAjax="<@s.url '/role/rolelist'/>"
						data-delAjax="<@s.url '/role/rm'/>" >
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
   
    <div class="modal fade" id="addxmRole" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" >
                <div class="modal-header ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" style="cursor: hand;">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <div class="modal-title">新增角色
                    </div>
                </div>
                <form action="<@s.url '/role/update'/>"  method="post" class="form-horizontal" id="fmAdd">
					<div class="modal-body">
						<div class="widget-box">
							<div class="widget-content nopadding">
								<div class="form-group">
									<label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>角色名称：
									</label>
									<input type="text"  class="col-xs-3 col-sm-3" id="role_name_add" json-id="roleName" name="roleName" placeholder="输入角色名称" />
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>角色描述：
									</label>
									<input type="text"  class="col-xs-3 col-sm-3" id="description_add" json-id="description" name="description" placeholder="输入角色描述" />
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
							</div>
						</div>
					</div>
					<div class="modal-footer">
						<button type="submit"  id="btnadd" class="btn btn-white btn-info btn-bold">
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

	<div class="modal fade" id="editxmRole"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="">
                <div class="modal-header ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" style="cursor: hand;">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <div class="modal-title" id="Div6">修改角色</div>
                </div>
                <form action="<@s.url '/role/update'/>"  method="post" class="form-horizontal" id="frmModify">
					<div class="modal-body">
						<div class="widget-box">
							<input type="hidden" id="role_id_modify" name="roleId" json-id="roleId"/>
                            <input type="hidden" id="state_modify" json-id="state" name="state"/>
							<div class="widget-content nopadding">
								<div class="form-group">
									<label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>角色名称：
									</label>
									<input type="text"  class="col-xs-3 col-sm-3" id="role_name_modify" json-id="roleName" name="roleName" placeholder="输入角色名称"/>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>角色描述：
									</label>
									<input type="text"  class="col-xs-3 col-sm-3" id="description_modify" json-id="description" name="description" placeholder="输入角色描述"/>
								</div>
							</div>
                        </div>
					</div>
					<div class="modal-footer">
						<button type="submit" id="J_btn_modify"  class="btn btn-white btn-info btn-bold">
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

    <div class="modal fade" id="setxmRole"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="">
                <div class="modal-header ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" style="cursor: hand;">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <div class="modal-title" id="Div6">设置权限</div>
                </div>
                <form action="<@s.url '/role/updaterolepermission'/>"  method="post" class="form-horizontal" id="frmSavePermission">
                    <div class="modal-body">
                        <div class="widget-box">
                            <input type="hidden" id="role_id" name="roleId" json-id="roleId"/>
                            <div class="widget-content nopadding">
                                <ul id="rolepermissiontree"> </ul>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="J_btn_savepermission"  class="btn btn-white btn-info btn-bold">
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
        var delurl = "<@s.url'/role/rm'/>";
        var editurl = "<@s.url'/role/get?d='/>";
        var changestatusurl = "<@s.url'/role/changestatus?d='/>";
        var getrolepermissionurl = "<@s.url'/role/getrolepermission'/>";
        var updaterolepermissionurl = "<@s.url '/role/updaterolepermission'/>";
    </script>
    <script type="text/javascript" src="<@s.url '/Yui/jquery-1.8.0.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/BootStrap/js/bootstrap.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/BootStrap/js/jquery-ui.custom.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/BootStrap/js/jquery.ui.touch-punch.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/BootStrap/js/ace-elements.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/BootStrap/js/ace.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/Yui/jquery.easyui.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/Yui/easyui-lang-zh_CN.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/js/uploadify/jquery.uploadify.min.js'/>" ></script>
    <script type="text/javascript" src="<@s.url '/js/jquery-validation/jquery.validate.min.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/js/jquery-validation/additional-methods.js'/>"></script>
    <script type="text/javascript" src="<@s.url '/js/jquery.form.js'/>" ></script>
    <script type="text/javascript" src="<@s.url '/js/layer/layer.min.js'/>" ></script>
    <script type="text/javascript" src="<@s.url '/js/paging.js'/>" ></script>
    <script type="text/javascript" src="<@s.url '/js/common.js'/>" ></script>
    <script type="text/javascript" src="<@s.url '/js/initlist.js'/>" ></script>
    <script type="text/javascript" src="<@s.url '/js/page/role.js'/>" ></script>
</body>
</html>

