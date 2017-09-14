$(function(){
    //打开添加窗口
    $("#J_BtnAdd").click(function(){
        //重置表单
        $("#fmAdd :input").not(":button, :submit, :reset, :checkbox, :radio").val("");
        $("#fmAdd input").removeAttr("selected").removeAttr("checked");
        $("#addwxUserTag").modal({show: true, backdrop: 'static', keyboard: false});
    });

    //新增表单验证
    $("#fmAdd").validate({
        debug: true,
        rules: {
            name: {
                required: true,
                maxlength: 30
            }
        },
        messages: {
            name: {
                required: "请输入标签名",
                maxlength: "标签名不能超过30个字符"
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
                        $("#addwxUserTag").modal('hide');
                        layer.msg(data.message, 2, 9, function(){
                            search(1);
                        });
                    }else{
                        layer.msg(data.message, 2, 8);
                    }
                }
            });
        }
    });

    //修改表单验证
    $("#frmModify").validate({
        debug: true,
        rules: {
            name: {
                required: true,
                maxlength: 30
            }
        },
        messages: {
            name: {
                required: "请输入标签名",
                maxlength: "标签名不能超过30个字符"
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
                        $("#editwxUserTag").modal('hide');
                        layer.msg(data.message, 2, 9, function(){
                            search(1);
                        });
                    }else{
                        layer.msg(data.message, 2, 8);
                    }
                }
            });
        }
    });

});

function initOperate(id) {
    html = '<td><div class="action-buttons">';
    if(id == 1 || id == 2 || id == 3){
        html += '<span class="tbqbgw" style="margin:0px;">系统默认</span>';
    }else{
        html += '<a title="编辑" style="cursor:pointer;" href="javascript:void(0)" onclick="editor(' + id + ')" ><span class="tbqbgw" style="margin:0px;">编辑</span></a>';
        html += '<a title="删除" style="cursor:pointer;" href="javascript:void(0)" onclick="del(' + id + ')" ><span class="tbqbgw" style="margin:0px;">删除</span></a>';
    }
    html += '</div></td>';
    return html;
}

function editor(id) {
    //重置表单
    $("#frmModify :input").not(":button, :submit, :reset, :checkbox, :radio").val("");
    $("#frmModify input").removeAttr("selected").removeAttr("checked");
    $("#editwxUserTag").modal({show: true, backdrop: 'static', keyboard: false});
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
                if (data && data.statuscode) {
                    layer.msg(data.message, 1, 9, function(){
                        search(0);
                    });
                }
            }
        });
    });
}
