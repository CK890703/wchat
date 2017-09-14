<#import "../common/spring.ftl" as s />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="zh-cn">
<head>
    <base id="contextPath" href="${request.contextPath}/">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <title></title>
    <meta name="description" content="" />
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
<script>
	var delurl = "<@s.url'/wxcustommenu/rm'/>";
    var editurl = "<@s.url'/wxcustommenu/get?d='/>";
	$(function(){
		//打开添加窗口
		$("#J_BtnAdd").click(function(){
			 //重置表单
			 $("#fmAdd :input").not(":button, :submit, :reset, :checkbox, :radio").val("");
			 $("#fmAdd input").removeAttr("selected").removeAttr("checked");
			 //重置图片
			 //$("#show_image_add").html("");
			 //$("#addwxCustomMenu").modal("show");
			 $("#addwxCustomMenu").modal({show: true, backdrop: 'static', keyboard: false});
		});
	   
	});

	function initOperate(id) {
		html = '<td><div class="action-buttons">';
		html += '<a title="编辑" style="cursor:pointer;" href="javascript:void(0)" onclick="editor(' + id + ')" ><span class="tbqbgw" style="margin:0px;">编辑</span></a>';
		html += '<a title="删除" style="cursor:pointer;" href="javascript:void(0)" onclick="del(' + id + ')" ><span class="tbqbgw" style="margin:0px;">删除</span></a>';
		html += '</div></td>';
		return html;
	}

	function editor(id) {
		//重置表单
        $("#frmModify :input").not(":button, :submit, :reset, :checkbox, :radio").val("");
        $("#frmModify input").removeAttr("selected").removeAttr("checked");
		//$("#editwxCustomMenu").modal("show");
		$("#editwxCustomMenu").modal({show: true, backdrop: 'static', keyboard: false});
		bindingDataControls($("#frmModify"), editurl + Math.random(), "id=" + id);
	}

	function bindingDataControls(frm, dataUrl, paramString, fun) {
		$.ajax({
			type: "POST",
			url: dataUrl,
			data: paramString,
			dataType: "json",
			success: function (data) {
            if (typeof data == "string") {
                data = $.parseJSON(data);
            }
            if (data.status == "y") {
                var map = data.data;
                $(frm).find(":input[json-id]").each(function (i) {
                    //input属性 type
                    var attrtype = $(this).attr("type");
                    //input属性 name
                    var attrname = $(this).attr("name");
                    var o = eval('map.' + $(this).attr("name"));
                    if(typeof(o) != "undefined"){
                        if(typeof(attrtype) != "undefined"){
                            if (attrtype == 'checkbox') {
                                var arro = String(o).split(",");
                                if(typeof(arro) != "undefined"){
                                    $.each(arro,function(i,item){
                                        $("input[name='" + attrname + "'][value=" + item + "]").attr("checked", true);
                                    });
                                }
                            }else if (attrtype == 'radio') {
                                $("input[name='" + attrname + "'][value=" + o + "]").attr("checked", true);
                            }else{
                                var attrfileurl = $(this).attr("json-fileurl");
                                if(typeof(attrfileurl) != "undefined" && attrfileurl == 'fileurl'){
                                    //$("#show_image_modify").html("<img style='width:50px;height:50px;' src='" + o + "'/>");
                                }
                                $(this).val(o);
                            }
                        }else{
                            $(this).val(o);
                        }
                    }
                });
                if (typeof fun == 'function') {
                    fun();
                }
			  }
			},
			error: function () {
				layer.msg("读取数据失败!", 1, 3);
			}
		});
	}

	function del(id) {
		layer.confirm("确定删除该数据吗？", function () {
			$.ajax({
				type: "POST",
				url: delurl,
				data: {
					"id": id
				},
				dataType: "json",
				success: function (data) {
					if (typeof data == "string") {
						data = $.parseJSON(data);
					}
					if (data && data.statuscode && data.statuscode == 10000) {
						search(0);
					}
				}
			});
		});
	}

</script>

</head>
<body class="no-skin" style="background: #fff">
    <div class="">
        <div class="col-xs-12">
            <div class="row ">
                <form id="checkform" class="form-inline" role="form">
                    <div class="form-group" style="margin-left:16px;">
                        						
							<input type="text" serachkey="name" placeholder="名称" name="name" id="name" class="form-control " data-provide="typeahead">
						
                    </div>

                    <button  id="buttonSearch"  class="btn btn-purple btn-sm" type="button">
                        <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>查询
                    </button>
					<button id="J_BtnAdd" tag="" class="btn btn-purple_a btn-sm" type="button">
                    <i class="ace-icon fa fa-plus  bigger-110"></i>添加
                    </button>
                </form>
            </div>
            <div class="row">
                <table id="tdata" class="table table-striped table-bordered table-hover"  data-id-column="id" data-name-column="">
					<colgroup>
						<col width="5%">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="width: 150px;min-width:150px;">
					</colgroup>
					<thead id="datas" data-id-column="id" data-name-column="">
						<tr>
							<th data-type="checkbox"> <input class="J_CheckAll ace"  type="checkbox"><span class="lbl"></span></th>
							<th data-type="value" data-column="button">一级菜单数组，个数应为1~3个</th>
							<th data-type="value" data-column="sub_button">二级菜单数组，个数应为1~5个</th>
							<th data-type="value" data-column="type">菜单的响应动作类型，view表示网页类型，click表示点击类型，miniprogram表示小程序类型</th>
							<th data-type="value" data-column="name">菜单标题，不超过16个字节，子菜单不超过60个字节</th>
							<th data-type="value" data-column="key">菜单KEY值，用于消息接口推送，不超过128字节;click等点击类型必须</th>
							<th data-type="value" data-column="url">网页链接，用户点击菜单可打开链接，不超过1024字节。type为miniprogram时，不支持小程序的老版本客户端将打开本url。view、miniprogram类型必须</th>
							<th data-type="value" data-column="media_id">调用新增永久素材接口返回的合法media_id;media_id类型和view_limited类型必须</th>
							<th data-type="value" data-column="appid">小程序的appid（仅认证公众号可配置）,miniprogram类型必须</th>
							<th data-type="value" data-column="pagepath">小程序的页面路径;miniprogram类型必须</th>
							<th data-type="value" data-column="create_time">创建时间</th>
							<th data-type="operate" onrendering="initOperate">操 作</th>
						</tr>
					</thead>
                    <tbody  id="listInfo" data-nametype="2"
						data-listAjax="<@s.url '/wxcustommenu/wxcustommenulist'/>"
						data-delAjax="<@s.url '/wxcustommenu/rm'/>" >
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
   
    <div class="modal fade" id="addwxCustomMenu" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" >
                <div class="modal-header ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"
                    style="cursor: hand;">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <div class="modal-title">新增
                    </div>
                </div>
                <form action="<@s.url '/wxcustommenu/update'/>"  method="post" class="form-horizontal" id="fmAdd">
					<div class="modal-body">
						<div class="widget-box">
							<div class="widget-content nopadding">
							   					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
一级菜单数组，个数应为1~3个：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="button_modify" json-id="button" name="button"       datatype="s1-30"  placeholder="输入一级菜单数组，个数应为1~3个"               nullmsg="请输入一级菜单数组，个数应为1~3个" errormsg="一级菜单数组，个数应为1~3个不能超过30字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
二级菜单数组，个数应为1~5个：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="sub_button_modify" json-id="sub_button" name="sub_button"       datatype="s1-30"  placeholder="输入二级菜单数组，个数应为1~5个"               nullmsg="请输入二级菜单数组，个数应为1~5个" errormsg="二级菜单数组，个数应为1~5个不能超过30字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
菜单的响应动作类型，view表示网页类型，click表示点击类型，miniprogram表示小程序类型：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="type_modify" json-id="type" name="type"       datatype="s1-30"  placeholder="输入菜单的响应动作类型，view表示网页类型，click表示点击类型，miniprogram表示小程序类型"               nullmsg="请输入菜单的响应动作类型，view表示网页类型，click表示点击类型，miniprogram表示小程序类型" errormsg="菜单的响应动作类型，view表示网页类型，click表示点击类型，miniprogram表示小程序类型不能超过30字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
菜单标题，不超过16个字节，子菜单不超过60个字节：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="name_modify" json-id="name" name="name"       datatype="s1-60"  placeholder="输入菜单标题，不超过16个字节，子菜单不超过60个字节"               nullmsg="请输入菜单标题，不超过16个字节，子菜单不超过60个字节" errormsg="菜单标题，不超过16个字节，子菜单不超过60个字节不能超过60字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
菜单KEY值，用于消息接口推送，不超过128字节;click等点击类型必须：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="key_modify" json-id="key" name="key"       datatype="s1-128"  placeholder="输入菜单KEY值，用于消息接口推送，不超过128字节;click等点击类型必须"               nullmsg="请输入菜单KEY值，用于消息接口推送，不超过128字节;click等点击类型必须" errormsg="菜单KEY值，用于消息接口推送，不超过128字节;click等点击类型必须不能超过128字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
网页链接，用户点击菜单可打开链接，不超过1024字节。type为miniprogram时，不支持小程序的老版本客户端将打开本url。view、miniprogram类型必须：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="url_modify" json-id="url" name="url"       datatype="s1-1024"  placeholder="输入网页链接，用户点击菜单可打开链接，不超过1024字节。type为miniprogram时，不支持小程序的老版本客户端将打开本url。view、miniprogram类型必须"               nullmsg="请输入网页链接，用户点击菜单可打开链接，不超过1024字节。type为miniprogram时，不支持小程序的老版本客户端将打开本url。view、miniprogram类型必须" errormsg="网页链接，用户点击菜单可打开链接，不超过1024字节。type为miniprogram时，不支持小程序的老版本客户端将打开本url。view、miniprogram类型必须不能超过1024字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
调用新增永久素材接口返回的合法media_id;media_id类型和view_limited类型必须：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="media_id_modify" json-id="media_id" name="media_id"       datatype="s1-60"  placeholder="输入调用新增永久素材接口返回的合法media_id;media_id类型和view_limited类型必须"               nullmsg="请输入调用新增永久素材接口返回的合法media_id;media_id类型和view_limited类型必须" errormsg="调用新增永久素材接口返回的合法media_id;media_id类型和view_limited类型必须不能超过60字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
小程序的appid（仅认证公众号可配置）,miniprogram类型必须：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="appid_modify" json-id="appid" name="appid"       datatype="s1-60"  placeholder="输入小程序的appid（仅认证公众号可配置）,miniprogram类型必须"               nullmsg="请输入小程序的appid（仅认证公众号可配置）,miniprogram类型必须" errormsg="小程序的appid（仅认证公众号可配置）,miniprogram类型必须不能超过60字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
小程序的页面路径;miniprogram类型必须：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="pagepath_modify" json-id="pagepath" name="pagepath"       datatype="s1-60"  placeholder="输入小程序的页面路径;miniprogram类型必须"               nullmsg="请输入小程序的页面路径;miniprogram类型必须" errormsg="小程序的页面路径;miniprogram类型必须不能超过60字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
创建时间：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="create_time_modify" json-id="create_time" name="create_time"       datatype="s1-"  placeholder="输入创建时间"               nullmsg="请输入创建时间" errormsg="创建时间不能超过字" /> 
						<span class="Validform_checktip"></span>
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

	<div class="modal fade" id="editwxCustomMenu"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="">
                <div class="modal-header ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"
                    style="cursor: hand;">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <div class="modal-title" id="Div6">修改
                    </div>
                </div>
                <form action="<@s.url '/wxcustommenu/update'/>"  method="post" class="form-horizontal" id="frmModify">
					<div class="modal-body">
						<div class="widget-box">
							<input type="hidden" id="id_modify" name="id" json-id="id"/>
							<div class="widget-content nopadding">
							 					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
一级菜单数组，个数应为1~3个：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="button_modify" json-id="button" name="button"       datatype="s1-30"  placeholder="输入一级菜单数组，个数应为1~3个"               nullmsg="请输入一级菜单数组，个数应为1~3个" errormsg="一级菜单数组，个数应为1~3个不能超过30字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
二级菜单数组，个数应为1~5个：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="sub_button_modify" json-id="sub_button" name="sub_button"       datatype="s1-30"  placeholder="输入二级菜单数组，个数应为1~5个"               nullmsg="请输入二级菜单数组，个数应为1~5个" errormsg="二级菜单数组，个数应为1~5个不能超过30字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
菜单的响应动作类型，view表示网页类型，click表示点击类型，miniprogram表示小程序类型：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="type_modify" json-id="type" name="type"       datatype="s1-30"  placeholder="输入菜单的响应动作类型，view表示网页类型，click表示点击类型，miniprogram表示小程序类型"               nullmsg="请输入菜单的响应动作类型，view表示网页类型，click表示点击类型，miniprogram表示小程序类型" errormsg="菜单的响应动作类型，view表示网页类型，click表示点击类型，miniprogram表示小程序类型不能超过30字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
菜单标题，不超过16个字节，子菜单不超过60个字节：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="name_modify" json-id="name" name="name"       datatype="s1-60"  placeholder="输入菜单标题，不超过16个字节，子菜单不超过60个字节"               nullmsg="请输入菜单标题，不超过16个字节，子菜单不超过60个字节" errormsg="菜单标题，不超过16个字节，子菜单不超过60个字节不能超过60字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
菜单KEY值，用于消息接口推送，不超过128字节;click等点击类型必须：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="key_modify" json-id="key" name="key"       datatype="s1-128"  placeholder="输入菜单KEY值，用于消息接口推送，不超过128字节;click等点击类型必须"               nullmsg="请输入菜单KEY值，用于消息接口推送，不超过128字节;click等点击类型必须" errormsg="菜单KEY值，用于消息接口推送，不超过128字节;click等点击类型必须不能超过128字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
网页链接，用户点击菜单可打开链接，不超过1024字节。type为miniprogram时，不支持小程序的老版本客户端将打开本url。view、miniprogram类型必须：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="url_modify" json-id="url" name="url"       datatype="s1-1024"  placeholder="输入网页链接，用户点击菜单可打开链接，不超过1024字节。type为miniprogram时，不支持小程序的老版本客户端将打开本url。view、miniprogram类型必须"               nullmsg="请输入网页链接，用户点击菜单可打开链接，不超过1024字节。type为miniprogram时，不支持小程序的老版本客户端将打开本url。view、miniprogram类型必须" errormsg="网页链接，用户点击菜单可打开链接，不超过1024字节。type为miniprogram时，不支持小程序的老版本客户端将打开本url。view、miniprogram类型必须不能超过1024字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
调用新增永久素材接口返回的合法media_id;media_id类型和view_limited类型必须：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="media_id_modify" json-id="media_id" name="media_id"       datatype="s1-60"  placeholder="输入调用新增永久素材接口返回的合法media_id;media_id类型和view_limited类型必须"               nullmsg="请输入调用新增永久素材接口返回的合法media_id;media_id类型和view_limited类型必须" errormsg="调用新增永久素材接口返回的合法media_id;media_id类型和view_limited类型必须不能超过60字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
小程序的appid（仅认证公众号可配置）,miniprogram类型必须：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="appid_modify" json-id="appid" name="appid"       datatype="s1-60"  placeholder="输入小程序的appid（仅认证公众号可配置）,miniprogram类型必须"               nullmsg="请输入小程序的appid（仅认证公众号可配置）,miniprogram类型必须" errormsg="小程序的appid（仅认证公众号可配置）,miniprogram类型必须不能超过60字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
小程序的页面路径;miniprogram类型必须：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="pagepath_modify" json-id="pagepath" name="pagepath"       datatype="s1-60"  placeholder="输入小程序的页面路径;miniprogram类型必须"               nullmsg="请输入小程序的页面路径;miniprogram类型必须" errormsg="小程序的页面路径;miniprogram类型必须不能超过60字" /> 
						<span class="Validform_checktip"></span>
					</div>
					</div>
					<div class="form-group">
						<label class="col-sm-2 control-label no-padding-right" for="txtName">
创建时间：
</label>
						<div class="col-sm-9">
						<input type="text"  class="col-xs-8 col-sm-8" id="create_time_modify" json-id="create_time" name="create_time"       datatype="s1-"  placeholder="输入创建时间"               nullmsg="请输入创建时间" errormsg="创建时间不能超过字" /> 
						<span class="Validform_checktip"></span>
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

