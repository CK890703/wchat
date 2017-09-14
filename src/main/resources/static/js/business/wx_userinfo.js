$(function(){
    layer.use('extend/layer.ext.js');

    $("#J_BtnAggingTag").click(function(){
        var openids = getAllId();
        if (openids.length > 0) {
            $("#userTagId").val("");
            $("#aggingTag").modal({show: true, backdrop: 'static', keyboard: false});
            $("#aggingTagDiv6").html("设置标签");
            $("#operatetype").val(1);
            $("#openids").val(openids);
        }else {
            layer.alert('请选择要操作的选择项', 9);
        }
    });

    $("#J_BtnUnAggingTag").click(function(){
        var openids = getAllId();
        if (openids.length > 0) {
            $("#userTagId").val("");
            $("#aggingTag").modal({show: true, backdrop: 'static', keyboard: false});
            $("#aggingTagDiv6").html("移除标签");
            $("#operatetype").val(2);
            $("#openids").val(openids);
        }else {
            layer.alert('请选择要操作的选择项', 9);
        }
    });

    $("#J_btn_bc").click(function(){
        var operatetype = $("#operatetype").val();
        var tagid = $("#userTagId").val();
        var openids = $("#openids").val();
        if(tagid && openids && operatetype){
            if(operatetype == 1)
                batchtAggingtag(tagid,openids);
            else
                batchUntAggingtag(tagid,openids);
        }
    });

});

function initOperate(id,openid,isblacklist) {
    html = '<td><div class="action-buttons">';
    html += '<a title="查看" style="cursor:pointer;" href="javascript:void(0)" onclick="editor(' + id + ')" ><span class="tbqbgw" style="margin:0px;">查看</span></a>';
    html += "<a title=\"修改备注\" style=\"cursor:pointer;\" href=\"javascript:void(0)\" onclick=\"updateRemark('" + openid + "')\" ><span class=\"tbqbgw\" style=\"margin:0px;\">备注</span></a>";
    if(isblacklist == 1){
        html += "<a title=\"取消拉黑\" style=\"cursor:pointer;\" href=\"javascript:void(0)\" onclick=\"batchUnblacklist('" + openid + "')\" ><span class=\"tbqbgw\" style=\"margin:0px;\">消黑</span></a>";
    }else{
        html += "<a title=\"拉黑\" style=\"cursor:pointer;\" href=\"javascript:void(0)\" onclick=\"batchBlacklist('" + openid + "')\" ><span class=\"tbqbgw\" style=\"margin:0px;\">拉黑</span></a>";
    }
    html += '</div></td>';
    return html;
}

function editor(id) {
    //重置表单
    $("#frmModify :input").not(":button, :submit, :reset, :checkbox, :radio").val("");
    $("#frmModify input").removeAttr("selected").removeAttr("checked");
    $("#editwxUserInfo").modal({show: true, backdrop: 'static', keyboard: false});
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
                                $(this).val(o);
                            }
                        }else{
                            $(this).val(o);
                        }
                    }
                });
                if(map && map.headimgurl){
                    $("#headimgurl_modify").attr("src", map.headimgurl);
                }
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

function updateRemark(openid) {
    layer.prompt({title: '请输入用户备注', formType: 1}, function(text, index){
        $.ajax({
            type: "POST",
            url: updateremarkurl,
            data: {
                "openid": openid,
                "remark": text
            },
            dataType: "json",
            success: function (data) {
                if (typeof data == "string") {
                    data = $.parseJSON(data);
                }
                if (data && data.statuscode) {
                    layer.close(index);
                    layer.msg(data.message, 1, 9, function(){
                        search(0);
                    });
                }
            }
        });
    });
}

function batchBlacklist(openid) {
    layer.confirm("确定拉黑该用户吗？", function () {
        $.ajax({
            type: "POST",
            url: batchblacklisturl,
            data: {
                "openid": openid
            },
            dataType: "json",
            success: function (data) {
                if (typeof data == "string") {
                    data = $.parseJSON(data);
                }
                if (data && data.statuscode) {
                    layer.msg(data.message, 1, 9, function(){
                        search(0);
                    });
                }
            }
        });
    });
}

function batchUnblacklist(openid) {
    layer.confirm("确定取消拉黑该用户吗？", function () {
        $.ajax({
            type: "POST",
            url: batchunblacklisturl,
            data: {
                "openid": openid
            },
            dataType: "json",
            success: function (data) {
                if (typeof data == "string") {
                    data = $.parseJSON(data);
                }
                if (data && data.statuscode) {
                    layer.msg(data.message, 1, 9, function(){
                        search(0);
                    });
                }
            }
        });
    });
}

function batchtAggingtag(tagid,openid) {
    $.ajax({
        type: "POST",
        url: batchtaggingtagurl,
        data: {
            'id': tagid,
            "openid": openid
        },
        dataType: "json",
        success: function (data) {
            if (typeof data == "string") {
                data = $.parseJSON(data);
            }
            if (data && data.statuscode) {
                $("#aggingTag").modal('hide');
                layer.msg(data.message, 1, 9, function(){
                    search(0);
                });
            }
        }
    });
}

function batchUntAggingtag(tagid,openid) {
    $.ajax({
        type: "POST",
        url: batchuntaggingtagurl,
        data: {
            'id': tagid,
            "openid": openid
        },
        dataType: "json",
        success: function (data) {
            if (typeof data == "string") {
                data = $.parseJSON(data);
            }
            if (data && data.statuscode) {
                $("#aggingTag").modal('hide');
                layer.msg(data.message, 1, 9, function(){
                    search(0);
                });
            }
        }
    });
}
