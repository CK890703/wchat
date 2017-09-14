$(function () {
    $('#myTab a').click(function (e) {
        e.preventDefault();
        $(this).tab('show');
    });

    //账户信息表单验证
    $("#frmUserInfo").validate({
        debug: true,
        rules: {
            realName: {
                required: true,
                maxlength: 30
            },
            phone: {
                isMobile : true
            },
            email: {
                email: true
            },
            age: {
                number: true,
                min: 0
            }
        },
        messages: {
            realName: {
                required: "请输入姓名",
                maxlength: "姓名不能超过30个字符"
            },
            phone: {
                isMobile : "请输入正确的手机号"
            },
            email: {
                email: "请输入正确的邮箱"
            },
            age: {
                number: "请输入正确的年龄",
                min: "年龄必须大于零"
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
                        layer.msg("修改成功", 2, 9, function(){
                            window.parent.gotoMenuUrl(this, "main");
                        });
                    }else{
                        layer.msg("修改失败", 2, 8);
                    }
                }
            });
        }
    });

    //修改密码表单验证
    $("#frmUserSafe").validate({
        debug: true,
        rules: {
            orgPsw: {
                required: true,
                remote: {
                    url: 'user/validatePsw?d=' + Math.random(),//后台处理程序
                    type: "post",               //数据发送方式
                    dataType: "json",           //接受数据格式
                    data: {                     //要传递的数据
                        orgPsw: function() {
                            return $("#orgPsw").val();
                        }
                    }
                }
            },
            newPsw: {
                required: true,
                maxlength: 30
            },
            conPsw: {
                required : true,
                maxlength: 30,
                equalTo: "#newPsw"
            }
        },
        messages: {
            orgPsw: {
                required: "请输入原密码",
                remote: "原密码不正确"
            },
            newPsw: {
                required: "请输入新密码",
                maxlength : "密码长度不能超过20个字符"
            },
            conPsw: {
                required : "请再次输入新密码",
                maxlength : "密码长度不能超过20个字符",
                equalTo : "新密码两次输入不一致"
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
                        layer.msg("修改成功,请使用新密码重新登录", 2, 9, function(){
                            window.location.href = "logout";
                        });

                    }else{
                        layer.msg("修改失败", 2, 8);
                    }
                }
            });
        }
    });

    $("#J_userinfo_cancel").click(function(){
        window.parent.gotoMenuUrl(this, "main");
    });

    $("#J_usersafe_cancel").click(function(){
        window.parent.gotoMenuUrl(this, "main");
    });

});


