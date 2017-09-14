
!function ($) {
    var obj;
    $.fn.validation = function (options) {
        return this.each(function () {
            globalOptions = $.extend({}, $.fn.validation.defaults, options);
            obj = this;
            reg(obj);
            validationForm(obj);
        });
    };
    $.fn.validation.ss = function () {
        return this.each(function () {
            globalOptions = $.extend({}, $.fn.validation.defaults, options);
            obj = this;
            reg(obj);
            validationForm(obj);
        });
    }
    $.fn.validation.defaults = {
        validRules: [
{ name: 'required', validate: function (value) { return ($.trim(value) == ''); }, defaultMsg: '请输入内容。' },
{ name: 'length', validate: function (value) { return ($.trim(value).length > $(this).attr('l')); }, defaultMsg: '长度超长' },
{ name: 'requiredlength', validate: function (value) {
    if ($.trim(value).length > $(this).attr('l')) {
        return true;
    }
    if ($.trim(value) == '') {
        return true;
    }
    return false;
}, defaultMsg: '长度超长！'
},
{ name: 'number', validate: function (value) { return (!/^[0-9]+.?[0-9]*$/.test(value)); }, defaultMsg: '请输入数字。' },
{ name: 'numbers', validate: function (value) {
    if (isNaN(value)) {
        return true;
    }
    return false;
}, defaultMsg: '请输入数字。'
},
{ name: 'mail', validate: function (value) { return (!/^[a-zA-Z0-9]{1}([\._a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+){1,3}$/.test(value)); }, defaultMsg: '请输入邮箱地址。' },
{ name: 'char', validate: function (value) { return (!/^[a-z\_\-A-Z]*$/.test(value)); }, defaultMsg: '请输入英文字符。' },
{ name: 'chinese', validate: function (value) { return (!/^[\u4e00-\u9fff]$/.test(value)); }, defaultMsg: '请输入汉字。' },
{
    name: 'phone',
    validate: function (value) {

        var regu = /^1[3,4,5,7,8]\d{9}$/;
        var re = new RegExp(regu);
        if (!re.test(value)) {
            return true;
        }
        return false;
    },
    defaultMsg: '手机格式不正确。'
},
{
    name: 'phone1',
    validate: function (value) {
        if (value.length < 1) {
            return false;
        }
        var regu = /^1[3,4,5,7,8]\d{9}$/;
        var re = new RegExp(regu);
        if (!re.test(value)) {
            return true;
        }
        return false;
    },
    defaultMsg: '手机格式不正确。'
},
{
    name: 'contact',
    validate: function (value) {
        var regu = /^1[3,4,5,7,8]\d{9}$/;
        if (value.length > 9) {
            var re = new RegExp(regu);
            if (!re.test(value)) {
                var phoneRegWithArea = /^[0][0-9]{2,3}-[0-9]{7,8}$/;
                if (!phoneRegWithArea.test(value)) {
                    return true;
                }
            }
        }
        else {
            return true;
        }
        return false;
    },
    defaultMsg: '联系方式格式不正确。'
},
{
    name: 'contact1',
    validate: function (value) {
        if (value == "") {
            return false;
        } else {
            var regu = /^1[3,4,5,7,8]\d{9}$/;
            if (value.length > 9) {
                var re = new RegExp(regu);
                if (!re.test(value)) {
                    var phoneRegWithArea = /^[0][0-9]{2,3}-[0-9]{7,8}$/;
                    if (!phoneRegWithArea.test(value)) {
                        return true;
                    }
                }
            }
        }
        return false;
    },
    defaultMsg: '联系方式格式不正确。'
},
{
    name: 'email',
    validate: function (value) {
        var regu = /^[a-zA-Z0-9]{1}([\._a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@[a-z0-9-]+(\.[a-z0-9-]+){1,3}$/;
        var re = new RegExp(regu);
        if (value != "") {
            if ($.trim(value).length > $(this).attr('l')) {
                return true;
            } else {
                if (!re.test(value)) {
                    return true;
                }
            }
        }
        return false;
    },
    defaultMsg: '邮箱格式不正确。'
},
{
    name: 'fax',
    validate: function (value) {
        var regu = /^[0][0-9]{2,3}-[0-9]{7,8}$/;
        var re = new RegExp(regu);
        if (value != "") {
            if ($.trim(value).length > $(this).attr('l')) {
                return true;
            } else {
                if (!re.test(value)) {
                    return true;
                }
            }
        }
        return false;
    },
    defaultMsg: '传真格式不正确。'
},
{
    name: 'QQ',
    validate: function (value) {
        var regu = /^[0-9]{5,10}$/;
        var re = new RegExp(regu);
        if (value != "") {
            if (!re.test(value)) {
                return true;
            }
        }
        return false;
    },
    defaultMsg: 'QQ格式不正确。'
}
]
    };
    var formState = false, fieldState = false, wFocus = false, globalOptions = {};
    var validateField = function (field, valid) { // 验证字段
        var el = $(field), error = false, errorMsg = '',
crule = (el.attr('btvd-el') == undefined) ? null : el.attr('btvd-el').split(' '),
msg = (el.attr('btvd-err') == undefined) ? null : el.attr('btvd-err').split(' ');
        if (crule) {
            if (!eval(crule[0]).test(el.val())) {
                error = true;
                errorMsg = msg;
            }
        } else {
            for (i = 0; (i < valid.length); i++) {
                var x = true, flag = valid[i];
                if (flag.substr(0, 1) == '!') {
                    x = false;
                    flag = flag.substr(1, flag.length - 1);
                }
                var rules = globalOptions.validRules;
                for (j = 0; j < rules.length; j++) {
                    var rule = rules[j];
                    if (flag == rule.name) {
                        if (rule.validate.call(field, el.val()) == x) {
                            error = true;
                            errorMsg = (msg == null) ? rule.defaultMsg : msg;
                            break;
                        }
                    }
                }
                if (error) { break; }
            }
        }
        var controls = el.parent().find('a');
        var len = controls.length;
        if (error) {
            var cls = (el.attr('btvd-class') == undefined) ? null : el.attr('btvd-class').split(' '); ;
            if (len <= 0) {
                el.after(' <a style=" visibility:hidden;" data-placement="right" data-content="' + errorMsg + '" data-toggle="popover" href="#" ></a> ');
            };
            el.next().popover("show");
            var pop = el.parent().find(".popover");
            var pos = el.offset();
            pos.left = pos.left + el.width();
            //             pos = pop.offset();
            //            pos.top = pos.top - el.next().height();
            pop.offset(pos);
            el.unbind('blur');
            el.bind('blur', function (e) {
                controls.popover("hide");
            });
            controls.next().unbind('click');
            controls.next().bind('click', function (e) {
                controls.popover("hide");
            })
            if (cls) pop.addClass("btvdclass");
        } else {
            controls.popover("hide");
        }
        return !error;
    };
    var reg = function (obj) {
        $('input, textarea').each(function () {
            var el = $(this), valid = (el.attr('btvd-type') == undefined) ? null : el.attr('btvd-type').split(' ');
            valid1 = (el.attr('btvd-el') == undefined) ? null : el.attr('btvd-el').split(' ');
            if (valid != null && valid.length > 0 || valid1 != null && valid1.length > 0) {
                el.blur(function () { // 失去焦点时
                    validateField(this, valid);
                });
            }
        });
    }

    var validationForm = function (obj) { // 表单验证方法
        //        $(obj).submit(function () { // 提交时验证
        //            //            if (formState) { // 重复提交则返回
        //            //                return false;
        //            //            }
        //            formState = true;
        //            var validationError = false;
        //            $('input, textarea', this).each(function () {
        //                var el = $(this), valid = (el.attr('btvd-type') == undefined) ? null : el.attr('btvd-type').split(' ');
        //                if (valid != null && valid.length > 0) {
        //                    if (!validateField(this, valid)) {
        //                        if (wFocus == false) {
        //                            scrollTo(0, el[0].offsetTop - 50);
        //                            wFocus = true;
        //                        }
        //                        validationError = true;
        //                    }
        //                }
        //            });
        //        if (formState) { // 重复提交则返回
        //            return false;
        //        }
        formState = true;
        var validationError = false;
        $('input, textarea', $(obj)).each(function () {
            var el = $(this), valid = (el.attr('btvd-type') == undefined) ? null : el.attr('btvd-type').split(' ');
            if (valid != null && valid.length > 0) {
                if (!validateField(this, valid)) {
                    if (wFocus == false) {
                        scrollTo(0, el[0].offsetTop - 50);
                        wFocus = true;
                    }
                    validationError = true;
                }
            }

            wFocus = false;
            fieldState = true;
            if (validationError) {
                formState = false;
                s = false;
                $.fn.validation.ll = false;
                return false;
                //return;
            }
            $.fn.validation.ll = true;
            return true;
        });
    };
} (window.jQuery);
$(function () {
//    $("input[l]").keyup(function () {
//        var l = parseInt($(this).attr("l"));
//        var str = $(this).val();
//        if (str.length > l) {
//            $(this).val(str.substring(0, l));
//        }
//    });
//    $("textarea[l]").keyup(function () {
//        var l = parseInt($(this).attr("l"));
//        var str = $(this).val();
//        if (str.length > l) {
//            $(this).val(str.substring(0, l));
//        }
//    });
});

//禁用Enter键表单自动提交  
document.onkeydown = function (event) {
    var target, code, tag;
    if (!event) {
        event = window.event; //针对ie浏览器  
        target = event.srcElement;
        code = event.keyCode;
        if (code == 13) {
            tag = target.tagName;
            if (tag == "TEXTAREA") { return true; }
            else { return false; }
        }
    }
    else {
        target = event.target; //针对遵循w3c标准的浏览器，如Firefox  
        code = event.keyCode;
        if (code == 13) {
            tag = target.tagName;
            if (tag == "INPUT") { return false; }
            else { return true; }
        }
    }
}; 

