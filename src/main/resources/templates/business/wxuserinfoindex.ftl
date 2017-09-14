<#import "../common/spring.ftl" as s />
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="zh-cn">
<head>
    <base id="contextPath" href="${request.contextPath}/">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
    <meta charset="utf-8" />
    <title>关注用户管理</title>
    <meta name="description" content="关注用户管理" />
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
                        <label>用户昵称：</label>
						<input type="text" serachkey="nickname" placeholder="用户昵称" name="nickname" id="nickname" class="form-control " data-provide="typeahead">
                        <label>关注状态：</label>
                        <select serachkey="subscribe" name="subscribe" id="subscribe" class="form-control " data-provide="typeahead">
                            <option value="">请选择</option>
                            <option value="1">已关注</option>
                            <option value="0">未关注</option>
                        </select>
                        <label>是否拉黑：</label>
                        <select serachkey="isblacklist" name="isblacklist" id="isblacklist" class="form-control " data-provide="typeahead">
                            <option value="">请选择</option>
                            <option value="1">是</option>
                            <option value="0">否</option>
                        </select>
                    </div>
                    <button  id="buttonSearch"  class="btn btn-purple btn-sm" type="button">
                        <i class="ace-icon fa fa-search icon-on-right bigger-110"></i>查询
                    </button>
                    <button id="J_BtnAggingTag" tag="" class="btn btn-warning btn-sm" type="button">
                        <i class="ace-icon fa fa-plus  bigger-110"></i>设置标签
                    </button>
                    <button id="J_BtnUnAggingTag" tag="" class="btn btn-danger btn-sm" type="button">
                        <i class="ace-icon fa fa-plus  bigger-110"></i>移除标签
                    </button>
                </form>
            </div>
            <div class="row">
                <table id="tdata" class="table table-striped table-bordered table-hover"  data-id-column="openid" data-name-column="">
					<colgroup>
						<col width="5%">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:100px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="min-width:80px;" class = "cgcol">
						<col style="width: 150px;min-width:150px;" class = "cgcol">
					</colgroup>
					<thead id="datas" data-id-column="openid" data-name-column="">
						<tr>
							<th data-type="checkbox"> <input class="J_CheckAll ace"  type="checkbox"><span class="lbl"></span></th>
                            <th data-type="value" data-column="openid">用户标识</th>
                            <th data-type="value" data-column="nickname">昵称</th>
                            <th data-type="value" data-column="remark">备注</th>
                            <th data-type="value" data-column="sex" data-escape='{"0":"未知","1":"男","2":"女"}'>性别</th>
                            <th data-type="value" data-column="country">国家</th>
                            <th data-type="value" data-column="province">省份</th>
                            <th data-type="value" data-column="city">城市</th>
                            <th data-type="value" data-column="tagnameList" data-con-type ="array">标签</th>
                            <th data-type="value" data-column="subscribe" data-escape='{"0":"未关注","1":"已关注"}'>关注状态</th>
                            <th data-type="value" data-column="isblacklist" data-escape='{"0":"否","1":"是"}'>是否拉黑</th>
							<th data-type="value" data-column="subscribeTimeDate">关注时间</th>
                            <th data-type="moreoperate" data-cols="id,openid,isblacklist" onrendering="initOperate">操 作</th>
						</tr>
					</thead>
                    <tbody  id="listInfo" data-nametype="2"
						data-listAjax="<@s.url '/wxuserinfo/wxuserinfolist'/>"
						data-delAjax="" >
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

    <div class="modal fade" id="editwxUserInfo"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content" style="">
                <div class="modal-header ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" style="cursor: hand;">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <div class="modal-title" id="Div6">用户详情</div>
                </div>
                <form action="<@s.url '/wxuserinfo/update'/>"  method="post" class="form-horizontal" id="frmModify">
                    <div class="modal-body">
                        <div class="widget-box">
                            <input type="hidden" id="id_modify" name="id" json-id="id"/>
                            <div class="widget-content nopadding">
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        关注状态：
                                    </label>
                                    <div class="col-sm-9">
                                        <input name="subscribe" id="subscribe_modify1" json-id="subscribe" type="radio" value="1"/>
                                        <label for="subscribe_modify1">已关注</label>
                                        <input name="subscribe" id="subscribe_modify2" json-id="subscribe" type="radio" value="0"/>
                                        <label for="subscribe_modify2">未关注</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        用户标识：
                                    </label>
                                    <div class="col-sm-9">
                                        <input type="text"  class="col-xs-8 col-sm-8" id="openid_modify" json-id="openid" name="openid" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        用户昵称：
                                    </label>
                                    <div class="col-sm-9">
                                        <input type="text"  class="col-xs-8 col-sm-8" id="nickname_modify" json-id="nickname" name="nickname" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        性别：
                                    </label>
                                    <div class="col-sm-9">
                                        <input name="sex" id="sex_modify1" json-id="sex" type="radio" value="1"/>
                                        <label for="sex_modify1">男</label>
                                        <input name="sex" id="sex_modify2" json-id="sex" type="radio" value="2"/>
                                        <label for="sex_modify2">女</label>
                                        <input name="sex" id="sex_modify3" json-id="sex" type="radio" value="0"/>
                                        <label for="sex_modify3">未知</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        国家：
                                    </label>
                                    <div class="col-sm-9">
                                        <input type="text"  class="col-xs-8 col-sm-8" id="country_modify" json-id="country" name="country" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        省份：
                                    </label>
                                    <div class="col-sm-9">
                                        <input type="text"  class="col-xs-8 col-sm-8" id="province_modify" json-id="province" name="province" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        城市：
                                    </label>
                                    <div class="col-sm-9">
                                        <input type="text"  class="col-xs-8 col-sm-8" id="city_modify" json-id="city" name="city" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        用户头像：
                                    </label>
                                    <div class="col-sm-9">
                                        <img id="headimgurl_modify" class="img-circle" style="width: 140px;height: 140px;border: 1px solid #AD24A9;" json-id="headimgurl" name="headimgurl" src="">
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        UNIONID：
                                    </label>
                                    <div class="col-sm-9">
                                        <input type="text"  class="col-xs-8 col-sm-8" id="unionid_modify" json-id="unionid" name="unionid" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        粉丝备注：
                                    </label>
                                    <div class="col-sm-9">
                                        <input type="text"  class="col-xs-8 col-sm-8" id="remark_modify" json-id="remark" name="remark" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        用户标签：
                                    </label>
                                    <div class="col-sm-9">
                                        <input type="text"  class="col-xs-8 col-sm-8" id="tagname_list_modify" json-id="tagnameList" name="tagnameList" />
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        是否拉黑：
                                    </label>
                                    <div class="col-sm-9">
                                        <input name="isblacklist" id="isblacklist_modify1" json-id="isblacklist" type="radio" value="1"/>
                                        <label for="isblacklist_modify1">是</label>
                                        <input name="isblacklist" id="isblacklist_modify2" json-id="isblacklist" type="radio" value="0"/>
                                        <label for="isblacklist_modify2">否</label>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        关注时间：
                                    </label>
                                    <div class="col-sm-9">
                                        <input type="text"  class="col-xs-8 col-sm-8" id="subscribe_time_date_modify" json-id="subscribeTimeDate" name="subscribeTimeDate" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-white btn-default btn-round" data-dismiss="modal">
                            <i class="ace-icon fa fa-times red2"></i>取消
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>

    <div class="modal fade" id="aggingTag"  tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" style="width: 300px;">
            <div class="modal-content" style="">
                <div class="modal-header ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix" style="cursor: hand;">
                    <button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
                    <div class="modal-title" id="aggingTagDiv6">用户标签</div>
                </div>
                <form method="post" class="form-horizontal" id="frmAggingTag">
                    <div class="modal-body">
                        <div class="widget-box">
                            <div class="widget-content nopadding">
                                <input type="hidden" id="operatetype" name="operatetype" json-id="operatetype"/>
                                <input type="hidden" id="openids" name="openids" json-id="openids"/>
                                <div class="form-group">
                                    <label class="col-sm-2 control-label no-padding-right" for="txtName">
                                        <i class="required">*</i>用户标签：
                                    </label>
                                    <select class="col-xs-3 col-sm-3" id="userTagId" json-id="userTagId" name="userTagId" >
                                        <option value="" >请选择</option>
                                        <#if userTagList??>
                                            <#list userTagList as usertag>
                                                <option value="${usertag.id}" >${usertag.name}</option>
                                            </#list>
                                        </#if>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="modal-footer">
                        <button type="button" id="J_btn_bc" class="btn btn-white btn-info btn-bold">
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
        var editurl = "<@s.url'/wxuserinfo/get?d='/>";
        var updateremarkurl = "<@s.url'/wxuserinfo/updateremark'/>";
        var batchblacklisturl = "<@s.url'/wxuserinfo/batchblacklist'/>";
        var batchunblacklisturl = "<@s.url'/wxuserinfo/batchunblacklist'/>";
        var batchtaggingtagurl = "<@s.url'/wxusertag/batchtaggingtag'/>";
        var batchuntaggingtagurl = "<@s.url'/wxusertag/batchuntaggingtag'/>";
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
    <script type="text/javascript" src="<@s.url '/js/business/wx_userinfo.js'/>" ></script>
</body>
</html>

