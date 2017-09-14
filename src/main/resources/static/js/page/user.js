$(function () {
    //打开添加窗口
    $("#J_BtnAdd").click(function(){
        //重置表单
        $("#fmAdd :input").not(":button, :submit, :reset, :checkbox, :radio").val("");
        $("#fmAdd input").removeAttr("selected").removeAttr("checked");
        $("#addUserInfo").modal({show: true, backdrop: 'static', keyboard: false});
    });

    //新增表单验证
    $("#fmAdd").validate({
        debug: true,
        rules: {
            roleId: {
                required: true
            },
            userName: {
                required: true,
                isMobile : true,
                remote: {
                    url: 'user/validatephone?d=' + Math.random(),//后台处理程序
                    type: "post",               //数据发送方式
                    dataType: "json",           //接受数据格式
                    data: {                     //要传递的数据
                        phone: function() {
                            return $("#userName_add").val();
                        },
                        oldphone: function() {
                            return $("#oldUserName_add").val();
                        }
                    }
                }
            },
            phone: {
                isMobile : true
            },
            userType: {
                required: true
            },
            realName: {
                maxlength: 30
            },
            state: {
                required: true
            },
            email: {
                email: true
            },
            age: {
                number: true,
                min: 0
            },
            discription: {
                maxlength: 500
            }
        },
        messages: {
            roleId: {
                required: "请选择角色"
            },
            userName: {
                required: "请输入手机号",
                isMobile : "请输入正确的手机号",
                remote: "手机号已注册"
            },
            phone: {
                isMobile : "请输入正确的手机号"
            },
            userType: {
                required: "请选择用户类型"
            },
            realName: {
                maxlength: "姓名不能超过30个字符"
            },
            state: {
                required: "请选择状态"
            },
            email: {
                email: "请输入正确的邮箱"
            },
            age: {
                number: "请输入正确的年龄",
                min: "年龄必须大于零"
            },
            discription: {
                maxlength: "备注不能超过500个字符"
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
                        $("#addUserInfo").modal('hide');
                        layer.msg("新增成功", 1, 9, function(){
                            search(1);
                        });
                    }else{
                        layer.msg("新增失败", 2, 8);
                    }
                }
            });
        }
    });

    //修改表单验证
    $("#frmModify").validate({
        debug: true,
        rules: {
            roleId: {
                required: true
            },
            userName: {
                required: true,
                isMobile : true
            },
            phone: {
                isMobile : true
            },
            userType: {
                required: true
            },
            realName: {
                maxlength: 30
            },
            state: {
                required: true
            },
            email: {
                email: true
            },
            age: {
                number: true,
                min: 0
            },
            discription: {
                maxlength: 500
            }
        },
        messages: {
            roleId: {
                required: "请选择角色"
            },
            userName: {
                required: "请输入手机号",
                isMobile : "请输入正确的手机号"
            },
            phone: {
                isMobile : "请输入正确的手机号"
            },
            userType: {
                required: "请选择用户类型"
            },
            realName: {
                maxlength: "姓名不能超过30个字符"
            },
            state: {
                required: "请选择状态"
            },
            email: {
                email: "请输入正确的邮箱"
            },
            age: {
                number: "请输入正确的年龄",
                min: "年龄必须大于零"
            },
            discription: {
                maxlength: "备注不能超过500个字符"
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
                        $("#editUserInfo").modal('hide');
                        layer.msg("修改成功", 1, 9, function(){
                            search(1);
                        });
                    }else{
                        layer.msg("修改失败", 2, 8);
                    }
                }
            });
        }
    });

});

function initOperate(id, state) {
    //编辑权限
    var modifypermissions = $("#modifypermissions").val();
    //删除权限
    var deletepermissions = $("#deletepermissions").val();
    //查看权限
    var showpermissions = $("#showpermissions").val();
    html = '<td><div class="action-buttons">';
    if(id != 1) {
        if(typeof(modifypermissions) != "undefined" && modifypermissions == 'modify') {
            if(state == 1){
                html += '<a title="停用" style="cursor:pointer;" href="javascript:void(0)" onclick="updateState(' + id + ', 0)" ><span class="tbqbgw" style="margin:0px;">停用</span></a>';
            }else{
                html += '<a title="启用" style="cursor:pointer;" href="javascript:void(0)" onclick="updateState(' + id + ', 1)" ><span class="tbqbgw" style="margin:0px;">启用</span></a>';
            }
            html += '<a title="编辑" style="cursor:pointer;" href="javascript:void(0)" onclick="editor(' + id + ')" ><span class="tbqbgw" style="margin:0px;">编辑</span></a>';
        }
        if(typeof(deletepermissions) != "undefined" && deletepermissions == 'delete') {
            html += '<a title="删除" style="cursor:pointer;" href="javascript:void(0)" onclick="del(' + id + ')" ><span class="tbqbgw" style="margin:0px;">删除</span></a>';
        }
        if(typeof(modifypermissions) != "undefined" && modifypermissions == 'modify') {
            html += '<a title="重置密码" style="cursor:pointer;" href="javascript:void(0)" onclick="resetPwd(' + id + ')" ><span class="tbqbgw" style="margin:0px;">重置密码</span></a>';
        }
    }
    html += '</div></td>';
    return html;
}

function editor(id) {
    //重置表单
    $("#frmModify :input").not(":button, :submit, :reset, :checkbox, :radio").val("");
    $("#frmModify input").removeAttr("selected").removeAttr("checked");
    $("#editUserInfo").modal({show: true, backdrop: 'static', keyboard: false});
    bindingDataControls($("#frmModify"), editurl + Math.random(), "userId=" + id);
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
            layer.msg("读取数据失败!", 2, 8);
        }
    });
}

function updateState(id, state) {
    var msg = state==0?"停用":"启用";
    layer.confirm("确定"+msg+"该账户吗？", function () {
        $.ajax({
            type: "POST",
            url: updateurl,
            data: {
                "userId": id,
                "state": state
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
                    layer.msg(data.message, 2, 8);
                }
            },
            error: function () {
                layer.msg("操作数据失败!", 2, 8);
            }
        });
    });
}

function del(id) {
    layer.confirm("确定删除该账户吗？", function () {
        $.ajax({
            type: "POST",
            url: delurl,
            data: {
                "userId": id
            },
            dataType: "json",
            success: function (data) {
                if (typeof data == "string") {
                    data = $.parseJSON(data);
                }
                if (data && data.statuscode && data.statuscode == 10000) {
                    layer.msg(data.message, 1, 9, function(){
                        search(0);
                    });
                }else{
                    layer.msg(data.message, 2, 8);
                }
            },
            error: function () {
                layer.msg("操作数据失败!", 2, 8);
            }
        });
    });
}

function resetPwd(id) {
    layer.confirm("确定重置该账户密码吗？", function () {
        $.ajax({
            type: "POST",
            url: resetpwdurl,
            data: {
                "userId": id,
            },
            dataType: "json",
            success: function (data) {
                if (typeof data == "string") {
                    data = $.parseJSON(data);
                }
                if (data && data.statuscode && data.statuscode == 10000) {
                    layer.msg(data.message, 1, 9, function(){
                        search(0);
                    });
                }else{
                    layer.msg(data.message, 2, 8);
                }
            },
            error: function () {
                layer.msg("操作数据失败!", 2, 8);
            }
        });
    });
}

