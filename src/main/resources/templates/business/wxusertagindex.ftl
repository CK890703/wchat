<#import "../common/spring.ftl" as s />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="zh-cn">
<head>
    <base id="contextPath" href="${request.contextPath}/">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <title>用户标签管理</title>
    <meta name="description" content="用户标签管理" />
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
<body class="no-skin" style="background: #fff">
    <div class="">
        <div class="col-xs-12">
            <div class="row ">
                <form id="checkform" class="form-inline" role="form">
                    <div class="form-group" style="margin-left:16px;">
                        <label>标签名称：</label>
						<input type="text" serachkey="name" placeholder="标签名称" name="name" id="name" class="form-control " data-provide="typeahead">
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
						<col style="width: 150px;min-width:150px;" class = "cgcol">
					</colgroup>
					<thead id="datas" data-id-column="id" data-name-column="">
						<tr>
							<th data-type="checkbox"><input class="J_CheckAll ace"  type="checkbox"><span class="lbl"></span></th>
                            <th data-type="value" data-column="id">标签编码</th>
                            <th data-type="value" data-column="name">标签名</th>
							<th data-type="value" data-column="count">标签下粉丝数</th>
							<th data-type="value" data-column="createTime">创建时间</th>
							<th data-type="operate" onrendering="initOperate">操 作</th>
						</tr>
					</thead>
                    <tbody  id="listInfo" data-nametype="2"
						data-listAjax="<@s.url '/wxusertag/wxusertaglist'/>"
						data-delAjax="<@s.url '/wxusertag/rm'/>" >
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
   
    <div class="modal fade" id="addwxUserTag" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" >
                <div class="modal-header ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"
                    style="cursor: hand;">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <div class="modal-title">新增标签</div>
                </div>
                <form action="<@s.url '/wxusertag/update'/>"  method="post" class="form-horizontal" id="fmAdd">
					<div class="modal-body">
						<div class="widget-box">
							<div class="widget-content nopadding">
								<div class="form-group">
									<label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>标签名：
									</label>
									<input type="text"  class="col-xs-8 col-sm-8" id="name_add" json-id="name" name="name" placeholder="输入标签名" />
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

	<div class="modal fade" id="editwxUserTag"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
        aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="">
                <div class="modal-header ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix"
                    style="cursor: hand;">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">
                        &times;
                    </button>
                    <div class="modal-title" id="Div6">修改标签</div>
                </div>
                <form action="<@s.url '/wxusertag/update'/>"  method="post" class="form-horizontal" id="frmModify">
					<div class="modal-body">
						<div class="widget-box">
							<input type="hidden" id="id_modify" name="id" json-id="id"/>
							<div class="widget-content nopadding">
								<div class="form-group">
									<label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>标签名：
									</label>
									<input type="text"  class="col-xs-8 col-sm-8" id="name_modify" json-id="name" name="name" placeholder="输入标签名" />
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
        var delurl = "<@s.url'/wxusertag/rm'/>";
        var editurl = "<@s.url'/wxusertag/get?d='/>";
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
    <script type="text/javascript" src="<@s.url '/js/business/wx_usertag.js'/>" ></script>
</body>
</html>

