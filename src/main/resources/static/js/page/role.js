$(function () {
    //打开添加窗口
    $("#J_BtnAdd").click(function(){
        //重置表单
        $("#fmAdd :input").not(":button, :submit, :reset, :checkbox, :radio").val("");
        $("#fmAdd input").removeAttr("selected").removeAttr("checked");
        $("#addxmRole").modal({show: true, backdrop: 'static', keyboard: false});
    });

    //新增表单验证
    $("#fmAdd").validate({
        debug: true,
        rules: {
            roleName: {
                required: true,
                maxlength: 30
            },
            description: {
                required: true,
                maxlength: 50
            }
        },
        messages: {
            roleName: {
                required: "请输入角色名称",
                maxlength: "角色名称不能大于30个字符"
            },
            description: {
                required: "请输入角色描述",
                maxlength: "角色描述不能大于50个字符"
            }
        },
        errorPlacement: function (error, element) { //指定错误信息位置
            if (element.is(':radio') || element.is(':checkbox')) { //如果是radio或checkbox
                var eid = element.attr('name'); //获取元素的name属性
                error.appendTo(element.parent()); //将错误信息添加当前元素的父结点后面
            } else {
                error.insertAfter(element);
            }
        },
        focusInvalid: true,
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                type: 'post',
                dataType:"json",
                success:function(data){
                    if(typeof data=="string"){
                        data = $.parseJSON(data);
                    }
                    if(data.status=="y"){
                        $("#addxmRole").modal('hide');
                        layer.msg("新增成功", 1, 9, function(){
                            search(1);
                        });
                    }else{
                        layer.msg("新增失败", 1, 8);
                    }
                }
            });
        }
    });

    //修改表单验证
    $("#frmModify").validate({
        debug: true,
        rules: {
            roleName: {
                required: true,
                maxlength: 30
            },
            description: {
                required: true,
                maxlength: 50
            }
        },
        messages: {
            roleName: {
                required: "请输入角色名称",
                maxlength: "角色名称不能大于30个字符"
            },
            description: {
                required: "请输入角色描述",
                maxlength: "角色描述不能大于50个字符"
            }
        },
        errorPlacement: function (error, element) { //指定错误信息位置
            if (element.is(':radio') || element.is(':checkbox')) { //如果是radio或checkbox
                var eid = element.attr('name'); //获取元素的name属性
                error.appendTo(element.parent()); //将错误信息添加当前元素的父结点后面
            } else {
                error.insertAfter(element);
            }
        },
        focusInvalid: true,
        submitHandler: function (form) {
            $(form).ajaxSubmit({
                type: 'post',
                dataType:"json",
                success:function(data){
                    if(typeof data=="string"){
                        data = $.parseJSON(data);
                    }
                    if(data.status=="y"){
                        $("#editxmRole").modal('hide');
                        layer.msg("修改成功", 1, 9, function(){
                            search(1);
                        });
                    }else{
                        layer.msg("修改失败", 1, 8);
                    }
                }
            });
        }
    });

    //保存权限
    $("#J_btn_savepermission").click(function(){
        var datajson = [];
        var roleId =  $("#role_id").val();
        var nodes = $('#rolepermissiontree').tree('getChecked');
        if(nodes != null && nodes != '' && roleId != null && roleId != ''){
            var perArr = [];
            for(var i = 0; i < nodes.length; i++){
                var obj = {};
                var node = nodes[i];
                if(typeof(node.attributes) != "undefined"){
                    if(node.attributes.parentId == 0){//顶级菜单节点
                        continue;
                    }else{
                        obj.roleId = roleId;
                        obj.moduleId = node.attributes.parentId;
                        obj.permissionCode = node.attributes.code;
                        perArr.push(obj);
                    }
                }
            }

            if(perArr != null && perArr.length > 0){
                datajson = arrayParseDataJSON(perArr);
                //ajax提交表单
                $.ajax({
                    type : "POST",
                    url : updaterolepermissionurl,
                    data : {
                        roleId : roleId,
                        permissiondata: JSON.stringify(datajson)
                    },
                    dataType : "json",
                    success : function(data) {
                        if(typeof data=="string"){
                            data = $.parseJSON(data);
                        }
                        if(data.status=="y"){
                            $("#setxmRole").modal('hide');
                            layer.msg("提交成功", 1, 9, function(){
                                search(1);
                            });
                        }else{
                            layer.msg("提交失败", 1, 8);
                        }
                    }
                });
            }
        }
    });

});

function initOperate(id,status) {
    //编辑权限
    var modifypermissions = $("#modifypermissions").val();
    //删除权限
    var deletepermissions = $("#deletepermissions").val();
    //查看权限
    var showpermissions = $("#showpermissions").val();
    //设置角色权限
    var setrolepermissions = $("#setrolepermissions").val();
    html = '<td><div class="action-buttons">';
    if(id != 1) {
        if(typeof(modifypermissions) != "undefined" && modifypermissions == 'modify') {
            //状态：0:停用,1:启用
            if(status == 1){//启用
                html += '<a title="停用" style="cursor:pointer;" href="javascript:void(0)" onclick="changestatus(' + id + ',0)" ><span class="tbqbgw" style="margin:0px;">停用</span></a>';
            }else{//停用
                html += '<a title="启用" style="cursor:pointer;" href="javascript:void(0)" onclick="changestatus(' + id + ',1)" ><span class="tbqbgw" style="margin:0px;">启用</span></a>';
            }
            html += '<a title="编辑" style="cursor:pointer;" href="javascript:void(0)" onclick="editor(' + id + ')" ><span class="tbqbgw" style="margin:0px;">编辑</span></a>';
        }
        if(typeof(deletepermissions) != "undefined" && deletepermissions == 'delete') {
            html += '<a title="删除" style="cursor:pointer;" href="javascript:void(0)" onclick="del(' + id + ')" ><span class="tbqbgw" style="margin:0px;">删除</span></a>';
        }
        if(typeof(setrolepermissions) != "undefined" && setrolepermissions == 'setrole') {
            html += '<a title="设置权限" style="cursor:pointer;" href="javascript:void(0)" onclick="setrolepermission(' + id + ')" ><span class="tbqbgw" style="margin:0px;">设置权限</span></a>';
        }
    }
    html += '</div></td>';
    return html;
}

function editor(id) {
    //重置表单
    $("#frmModify :input").not(":button, :submit, :reset, :checkbox, :radio").val("");
    $("#frmModify input").removeAttr("selected").removeAttr("checked");
    $("#editxmRole").modal({show: true, backdrop: 'static', keyboard: false});
    bindingDataControls($("#frmModify"), editurl + Math.random(), "roleId=" + id);
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
                if (typeof fun == 'function') {
                    fun();
                }
            }
        },
        error: function () {
            layer.msg("读取数据失败", 1, 8);
        }
    });
}

function changestatus(id, status) {
    layer.confirm("您确定更改该数据的状态吗？", function() {
        $.ajax({
            type : "POST",
            url : changestatusurl + Math.random(),
            data : {
                "roleId" : id,
                "state" : status
            },
            dataType : "json",
            success : function(data) {
                if (typeof data == "string") {
                    data = $.parseJSON(data);
                }
                if (data && data.statuscode && data.statuscode == 10000) {
                    layer.msg(data.message, 1, 9, function(){
                        search(1);
                    });
                }else{
                    layer.msg(data.message, 1, 8);
                }
            },
            error : function() {
                layer.msg("处理数据失败", 1, 8);
            }
        });
    });
}

function del(id) {
    layer.confirm("确定删除该数据吗？", function () {
        $.ajax({
            type: "POST",
            url: delurl,
            data: {
                "roleId": id
            },
            dataType: "json",
            success: function (data) {
                if (typeof data == "string") {
                    data = $.parseJSON(data);
                }
                if (data && data.statuscode && data.statuscode == 10000) {
                    layer.msg(data.message, 1, 9, function(){
                        search(1);
                    });
                }else{
                    layer.msg(data.message, 1, 8);
                }
            },
            error: function () {
                layer.msg("操作数据失败", 1, 8);
            }
        });
    });
}

function setrolepermission(id) {
    $("#setxmRole").modal({show: true, backdrop: 'static', keyboard: false});
    $("#role_id").val(id);
    loadTree(id);
}

function loadTree(id) {
    $("#rolepermissiontree").tree({
        method: "post",
        url: getrolepermissionurl,
        checkbox: true,
        animate: true,
        onBeforeLoad: function (node, param) {
            param.roleId = id
        },
        onClick: function(node){
            //alert(node.text);
        }
    },"reload");
}

function arrayParseDataJSON(arr){
    var map = {}, dest = [];
    for(var i = 0; i < arr.length; i++){
        var ai = arr[i];
        if(!map[ai.moduleId]){
            if(ai.permissionCode){
                dest.push({
                    roleId: ai.roleId,
                    moduleId: ai.moduleId,
                    permissionCode: [ai.permissionCode]
                });
            }else{
                dest.push({
                    roleId: ai.roleId,
                    moduleId: ai.moduleId
                });
            }
            map[ai.moduleId] = ai;
        }else{
            for(var j = 0; j < dest.length; j++){
                var dj = dest[j];
                if(dj.moduleId == ai.moduleId){
                    if(ai.permissionCode){
                        dj.permissionCode.push(ai.permissionCode);
                    }
                    break;
                }
            }
        }
    }
    return dest;
}