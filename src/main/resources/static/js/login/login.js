var contextPath = document.baseURI;
$(function() {

    if (window.top!=null && window.top.document.URL!=document.URL){
        window.top.location= document.URL;
    }

    //输入域失去焦点(blur)触发校验事件
    $('.username, .password , .code').blur(function(){
        formValidate(this);
    });

    //登录事件
    $("#loginbtn").click(function(){
        submitLogin();
    });

});

function submitLogin() {
    var username = $('#username').val();
    var password = $('#password').val();
    var code = $('#code').val();
    if(username == '') {
        $('.username').trigger("blur");
        return false;
    }
    if(password == '') {
        $('.password').trigger("blur");
        return false;
    }
    if(code == '') {
        $('.code').trigger("blur");
        return false;
    }
    //登录提示
    var loadlayer = layer.load(3);
    var data ={};
    data.username = username;
    data.password = password;
    data.code = code;
    $.ajax({
        type: "post",
        url: contextPath + "loginon",
        cache: false,
        data: data,
        dataType: "json",
        success: function(data) {
            if (typeof data=="string") {
                data = $.parseJSON(data);
            }
            //关闭提示
            layer.close(loadlayer);
            if (data.statuscode == 10000) {
                window.location = contextPath + "index";
            }  else {
                flushCode();
                $('#error').fadeOut('fast', function(){
                    $('#error').css('top', '165px');
                });
                $('#error').fadeIn('fast', function(){
                    $('#error').find('span').html('');
                    $('#error').find('span').html(data.message);
                });
            }
        },
        error: function() {
            layer.msg("网络错误,请稍后重试", 1, 8);
        }
    });
}

//页面手动验证码刷新
$("#vcode").click(function(){
    $(this).attr("src",$(this).attr("src")+"?"+Math.random());
});

//js内部验证码刷新
function flushCode() {
    $("#vcode").attr("src",$("#vcode").attr("src")+"?"+Math.random());
}

//回车执行登录事件
$(document).keydown(function(e){
    var curKey = e.which;
    if(curKey == 13){
        $("#loginbtn").click();
        return false;
    }
});

//表单检验
function formValidate(element) {
    var inputvalue = $(element).val();
    var inputname = $(element).prop("name");
    //用户名
    if(inputname == 'username' && inputvalue == '') {
        $('#error').fadeOut('fast', function(){
            $(this).css('top', '27px');
        });
        $('#error').fadeIn('fast', function(){
            $(this).find('span').html('');
            $(this).find('span').html('用户名不能为空');
        });
        return false;
    }else{
        $('#error').fadeOut('fast');//移除错误信息
    }
    //密码
    if(inputname == 'password' && inputvalue == '') {
        $('#error').fadeOut('fast', function(){
            $(this).css('top', '96px');
        });
        $('#error').fadeIn('fast', function(){
            $(this).find('span').html('');
            $(this).find('span').html('密码不能为空');
        });
        return false;
    }else{
        $('#error').fadeOut('fast');//移除错误信息
    }
    //验证码
    if(inputname == 'code' && inputvalue == '') {
        $('#error').fadeOut('fast', function(){
            $(this).css('top', '165px');
        });
        $('#error').fadeIn('fast', function(){
            $(this).find('span').html('');
            $(this).find('span').html('验证码不能为空');
        });
        return false;
    }else{
        $('#error').fadeOut('fast');//移除错误信息
    }

}