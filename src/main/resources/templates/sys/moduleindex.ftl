<#import "../common/spring.ftl" as s />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="zh-cn">
<head>
    <base id="contextPath" href="${request.contextPath}/">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <title>菜单管理</title>
    <meta name="description" content="菜单管理" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
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
                        <label>菜单名称：</label>
						<input type="text" serachkey="moduleName" placeholder="菜单名称" name="moduleName" id="moduleName" class="form-control " data-provide="typeahead">
                        <label>父类菜单：</label>
                        <select serachkey="parentId" name="parentId" id="parentId" class="form-control " data-provide="typeahead">
                            <option value="">请选择</option>
                            <option value="0">一级菜单</option>
                            <#if moduleList??>
                                <#list moduleList as module>
                                    <#if module_index != 0>
                                        <option value="${module.moduleId}" >${module.moduleName}</option>
                                    </#if>
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
                    <button  id="buttonSearch"  class="btn btn-purple btn-sm" type="button">
                        <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>查询
                    </button>
					<@shiro.hasPermission name="module:add">
						<button id="J_BtnAdd" tag="" class="btn btn-purple_a btn-sm" type="button">
							<i class="ace-icon fa fa-plus  bigger-110"></i>添加
						</button>
					</@shiro.hasPermission>
					<@shiro.hasPermission name="module:modify">
						<input type="hidden" id="modifypermissions" name="modifypermissions" value="modify"/>
					</@shiro.hasPermission>
					<@shiro.hasPermission name="module:delete">
						<input type="hidden" id="deletepermissions" name="deletepermissions" value="delete"/>
					</@shiro.hasPermission>
					<@shiro.hasPermission name="module:show">
						<input type="hidden" id="showpermissions" name="showpermissions" value="show"/>
					</@shiro.hasPermission>
                </form>
            </div>
            <div class="row">
                <table id="tdata" class="table table-striped table-bordered table-hover"  data-id-column="module_id" data-name-column="">
					<colgroup>
						<colstyle="min-width:80px;" class = "cgcol">
						<colstyle="min-width:80px;" class = "cgcol">
						<colstyle="min-width:80px;" class = "cgcol">
						<colstyle="min-width:80px;" class = "cgcol">
						<colstyle="min-width:80px;" class = "cgcol">
						<colstyle="min-width:80px;" class = "cgcol">
						<colstyle="width: 150px;min-width:150px;" class = "cgcol">
					</colgroup>
					<thead id="datas" data-id-column="moduleId" data-name-column="">
						<tr>
							<th data-type="value" data-column="moduleId">菜单编号</th>
							<th data-type="value" data-column="moduleName">菜单名称</th>
                            <th data-type="value" data-column="state" data-escape='{"0":"停用","1":"启用"}'>启用状态</th>
							<th data-type="value" data-column="linkUrl">菜单地址</th>
							<th data-type="value" data-column="createTime">创建时间</th>
							<th data-type="value" data-column="creator">创建人</th>
							<th data-type="value" data-column="sort">菜单序号</th>
                            <th data-type="moreoperate" data-cols="moduleId,state" onrendering="initOperate">操 作</th>
						</tr>
					</thead>
                    <tbody  id="listInfo" data-nametype="2"
						data-listAjax="<@s.url '/module/modulelist'/>"
						data-delAjax="<@s.url '/module/rm'/>" >
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
   
    <div class="modal fade" id="addmodule" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" >
                <div class="modal-header ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"
                    style="cursor: hand;">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <div class="modal-title">新增菜单</div>
                </div>
                <form action="<@s.url '/module/update'/>"  method="post" class="form-horizontal" id="fmAdd">
					<div class="modal-body">
						<div class="widget-box">
							<div class="widget-content nopadding">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>父类菜单：
                                    </label>
                                    <select class="col-xs-3 col-sm-3" id="parent_id_add" json-id="parentId" name="parentId" >
                                        <option value="">请选择</option>
                                        <option value="0">一级菜单</option>
                                        <#if moduleList??>
                                            <#list moduleList as module>
                                                <#if module_index != 0>
                                                    <option value="${module.moduleId}" >${module.moduleName}</option>
                                                </#if>
                                            </#list>
                                        </#if>
                                    </select>
                                </div>
								<div class="form-group">
									<label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>菜单名称：
									</label>
									<input type="text"  class="col-xs-8 col-sm-8" id="module_name_add" json-id="moduleName" name="moduleName" placeholder="菜单名称"/>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>菜单标识：
									</label>
									<input type="text"  class="col-xs-8 col-sm-8" id="business_code_add" json-id="businessCode" name="businessCode" placeholder="菜单标识"/>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>菜单功能：
									</label>
                                    <div class="col-xs-8 col-sm-8">
                                    <#if permissionCodes??>
                                        <#list permissionCodes as permissionCode>
                                            <input type="checkbox" id="permission_code_add${permissionCode_index}" value="${permissionCode.getCode()}" json-id="permissionCode" name="permissionCode"/>
                                            <label for="permission_code_add${permissionCode_index}">${permissionCode.getName()}</label>
                                        </#list>
                                    </#if>
                                    </div>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>菜单地址：
									</label>
									<input type="text"  class="col-xs-8 col-sm-8" id="link_url_add" json-id="linkUrl" name="linkUrl" placeholder="菜单链接地址"/>
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>菜单序号：
									</label>
									<input type="text"  class="col-xs-8 col-sm-8" id="sort_add" json-id="sort" name="sort"  placeholder="菜单序号" />
								</div>
								<div class="form-group">
									<label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>菜单图标：
									</label>
                                    <div class="col-xs-8 col-sm-8">
                                        <input name="icon" id="icon_add1" json-id="icon" type="radio" value="ico-home"/>
                                        <label for="icon_add1"><i class="module_ico-home"></i></label>
                                        <input name="icon" id="icon_add2" json-id="icon" type="radio" value="ico-generalize"/>
                                        <label for="icon_add2"><i class="module_ico-generalize"></i></label>
                                        <input name="icon" id="icon_add3" json-id="icon" type="radio" value="ico-sheet"/>
                                        <label for="icon_add3"><i class="module_ico-sheet"></i></label>
                                        <input name="icon" id="icon_add4" json-id="icon" type="radio" value="ico-finance"/>
                                        <label for="icon_add4"><i class="module_ico-finance"></i></label>
                                        <input name="icon" id="icon_add5" json-id="icon" type="radio" value="ico-tool"/>
                                        <label for="icon_add5"><i class="module_ico-tool"></i></label>
                                        <input name="icon" id="icon_add6" json-id="icon" type="radio" value="ico-order"/>
                                        <label for="icon_add6"><i class="module_ico-order"></i></label>
                                    </div>
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
                                        菜单描述：
                                    </label>
                                    <div class="col-xs-6 col-sm-6">
                                        <textarea id="description_add" rows="5" json-id="description" name="description" placeholder="" style="margin: 0px 5px 0px 0px; width: 360px;" > </textarea>
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

	<div class="modal fade" id="editmodule"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="">
                <div class="modal-header ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"
                    style="cursor: hand;">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times; </button>
                    <div class="modal-title" id="Div6">修改菜单</div>
                </div>
                <form action="<@s.url '/module/update'/>"  method="post" class="form-horizontal" id="frmModify">
					<div class="modal-body">
						<div class="widget-box">
							<input type="hidden" id="module_id_modify" name="moduleId" json-id="moduleId"/>
							<div class="widget-content nopadding">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>父类菜单：
                                    </label>
                                    <select class="col-xs-3 col-sm-3" id="parent_id_modify" json-id="parentId" name="parentId" >
                                        <option value="0">一级菜单</option>
                                        <#if moduleList??>
                                            <#list moduleList as module>
                                                <#if module_index != 0>
                                                    <option value="${module.moduleId}" >${module.moduleName}</option>
                                                </#if>
                                            </#list>
                                        </#if>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>菜单名称：
                                    </label>
                                    <input type="text"  class="col-xs-8 col-sm-8" id="module_name_modify" json-id="moduleName" name="moduleName" placeholder="菜单名称"/>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>菜单标识：
                                    </label>
                                    <input type="text"  class="col-xs-8 col-sm-8" id="business_code_modify" json-id="businessCode" name="businessCode" placeholder="菜单标识"/>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>菜单功能：
                                    </label>
                                    <div class="col-xs-6 col-sm-6">
                                    <#if permissionCodes??>
                                        <#list permissionCodes as permissionCode>
                                            <input type="checkbox" id="permission_code_modify${permissionCode_index}" value="${permissionCode.getCode()}" json-id="permissionCode" name="permissionCode"/>
                                            <label for="permission_code_modify${permissionCode_index}">${permissionCode.getName()}</label>
                                        </#list>
                                    </#if>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>菜单地址：
                                    </label>
                                    <input type="text"  class="col-xs-8 col-sm-8" id="link_url_modify" json-id="linkUrl" name="linkUrl" placeholder="菜单链接地址"/>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>菜单序号：
                                    </label>
                                    <input type="text"  class="col-xs-8 col-sm-8" id="sort_modify" json-id="sort" name="sort"  placeholder="菜单序号" />
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>菜单图标：
                                    </label>
                                    <div class="col-xs-8 col-sm-8">
                                        <input name="icon" id="icon_modify1" json-id="icon" type="radio" value="ico-home"/>
                                        <label for="icon_modify1"><i class="module_ico-home"></i></label>
                                        <input name="icon" id="icon_modify2" json-id="icon" type="radio" value="ico-generalize"/>
                                        <label for="icon_modify2"><i class="module_ico-generalize"></i></label>
                                        <input name="icon" id="icon_modify3" json-id="icon" type="radio" value="ico-sheet"/>
                                        <label for="icon_modify3"><i class="module_ico-sheet"></i></label>
                                        <input name="icon" id="icon_modify4" json-id="icon" type="radio" value="ico-finance"/>
                                        <label for="icon_modify4"><i class="module_ico-finance"></i></label>
                                        <input name="icon" id="icon_modify5" json-id="icon" type="radio" value="ico-tool"/>
                                        <label for="icon_modify5"><i class="module_ico-tool"></i></label>
                                        <input name="icon" id="icon_modify6" json-id="icon" type="radio" value="ico-order"/>
                                        <label for="icon_modify6"><i class="module_ico-order"></i></label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        菜单描述：
                                    </label>
                                    <div class="col-xs-6 col-sm-6">
                                        <textarea id="description_modify" rows="5" json-id="description" name="description" placeholder="" style="margin: 0px 5px 0px 0px; width: 360px;" > </textarea>
                                    </div>
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

    <script>
        var delurl = "<@s.url'/module/rm'/>";
        var editurl = "<@s.url'/module/get?d='/>";
        var updateurl = "<@s.url'/module/update'/>";
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
    <script type="text/javascript" src="<@s.url '/js/page/module.js'/>" ></script>
</body>
</html>

