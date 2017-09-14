var contextPath = window.parent.document.baseURI;
function bindingControls(frm, dataUrl, paramString, fun) {
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
                    var o = eval('map.' + $(this).attr("name"));
                    $(this).val(o);
                    if (this.target == 'checkbox') {
                        if (o == 1)
                            $(this).attr("checked", "checked");
                        else $(this).attr("checked", "");
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

function bindLable(frm, dataUrl, paramString, fun) {
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
                $(frm).find("span[json-id]").each(function (i) {
                    var o = eval('map.' + $(this).attr("json-id"));
                    $(this).html(o);

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

function bindingBusiness(dataUrl, paramString, fun) {
    $.ajax({
        type: "POST",
        url: dataUrl,
        data: paramString,
        dataType: "json",
        success: function (data) {
            if (typeof fun == 'function') {
                fun(data);
            }
        },
        error: function () {
            layer.msg("读取数据失败", 1, 8);
        }
    });
}

//$(document).ajaxError(function(event, request, settings) {
//    if (request.getResponseHeader('REQUIRES_AUTH') === '1') {
//        window.location = '/';
//    }
//});

$.ajaxSetup({
    complete:function(XMLHttpRequest,textStatus){
        if(textStatus=="parsererror"){
            layer.alert('登陆超时！请重新登陆！', 8, function(index) {
                layer.close(index);
                if (window.parent) {
                    window.parent.location.href = contextPath + '/login';
                } else {
                    window.location.href = contextPath + '/login';
                }
            });
            //$.messager.alert('提示信息', "登陆超时！请重新登陆！", 'info',function(){
            //    if(window.parent){
            //        window.parent.location.href = contextPath+'/login';
            //    }else{
            //        window.location.href = contextPath+'/login';
            //    }
            //});
        } else if(textStatus=="error"){
            //$.messager.alert('提示信息', "请求超时！请稍后再试！", 'info');
            layer.msg("请求超时,请稍后再试", 1, 8);
        }
    }
});

function newDate(str) {
    str = str.split('-');
    var date = new Date();
    date.setUTCFullYear(str[0], str[1] - 1, str[2]);
    date.setUTCHours(0, 0, 0, 0);
    return date;
}

//返回星期几
function dayFn(a,b){
    var a = new newDate(a);
    a = a.valueOf();
    a = a + b * 24 * 60 * 60 * 1000;
    a = new Date(a);
    //var t = a.getFullYear() + "-" + (a.getMonth() + 1) + "-" + a.getDate();
    var t =	a.getDay();
    return t
}

//日期差
function DateDiff(d1,d2){
    var day = 24 * 60 * 60 *1000;
    try{
        var dateArr = d1.split("-");
        var checkDate = new Date();
        checkDate.setFullYear(dateArr[0], dateArr[1]-1, dateArr[2]);
        var checkTime = checkDate.getTime();

        var dateArr2 = d2.split("-");
        var checkDate2 = new Date();
        checkDate2.setFullYear(dateArr2[0], dateArr2[1]-1, dateArr2[2]);
        var checkTime2 = checkDate2.getTime();

        var cha = (checkTime - checkTime2)/day;
        return cha;
    }catch(e){
        return false;
    }
}


function changeDate(days) {
    // 参数表示在当前日期下要增加的天数
    var now = new Date();
    // + 1 代表日期加，- 1代表日期减
    now.setDate(now.getDate() + 1 * days);
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var day = now.getDate();
    if (month < 10) {
        month = '0' + month;
    }
    if (day < 10) {
        day = '0' + day;
    }
    return year + '-' + month + '-' + day;
}
