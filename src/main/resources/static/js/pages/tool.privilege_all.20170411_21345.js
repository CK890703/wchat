define("js/controller/tool.privilege", ["require", "jquery", "angular", "js/modules/common", "js/services/tool.privilege", "js/modules/tabler", "js/modules/beautyui", "js/controller/tool.privilege.action", "js/config/comm"], function (require) {
    var $ = require("jquery"), e = require("angular"), t = require("js/modules/common"), i = require("js/services/tool.privilege"), a = require("js/modules/tabler"), n = require("js/modules/beautyui"), o = require("js/controller/tool.privilege.action"), r = require("js/config/comm"), s = null, c = null, l = {}, d = r.privilege;

    function u(e) {
        var i = [], a, n, o;
        e = e || {};
        a = e.qqNumberList || [];
        n = e.optOuterEle || null;
        o = e.privilegeService || {};
        function r(e, t) {
            if (n) {
                $("._async_nickname_" + e, n).html(t)
            } else {
                $("#_invite_list ._async_nickname_" + e + ",#_current_list ._async_nickname_" + e).text(t)
            }
        }

        function s(e) {
            var t;
            for (var i in e) {
                t = $.escHTML(e[i][6] || "");
                l[i] = t;
                r(i, t)
            }
        }

        function c(e) {
            t.showMsgbox(e.msg || "昵称获取失败", 5)
        }

        try {
            var d = a.length;
            for (var u = 0; u < d; u++) {
                if (a[u]in l) {
                    r(a[u], l[a[u]])
                } else {
                    i.push(a[u])
                }
            }
            if (i.length > 0) {
                o.qqNick({uins: i.join(",")}, s, c)
            }
        } catch (p) {
        }
    }

    function p(e) {
        var t = {}, i = 1, n = $("#_number_invite"), o = $("#_invite_list");
        e = e || {};
        t = e.data || {};
        s = new a({
            name: "inviteList",
            cgiFunction: function r(e, i) {
                var a = t.invited || [];
                i({ret: 0, data: {list: a, conf: {}}});
                n.text(a.length)
            },
            tableWrap: o,
            extraClasses: ["mod-table"],
            totalRowClasses: ["tr-total"],
            needPaging: false,
            noDataTip: "抱歉，暂无邀请中的协作者",
            needTotal: false,
            isFixedBar: false,
            columnConfigs: [{
                fieldName: "index", displayName: "编号", type: "number", beforeShow: function c() {
                    return i++
                }
            }, {
                fieldName: "info", displayName: "协作者信息", type: "string", beforeShow: function l(e, t) {
                    return ['<span class="worker_name _async_nickname_' + t.FAccount + '"></span>', "&nbsp;&nbsp;&nbsp;&nbsp;", '<span class="c_tx3">QQ：' + t.FAccount + "</span>"].join("")
                }
            }, {
                fieldName: "character", displayName: "协作者角色", type: "string", beforeShow: function u(e, t) {
                    var i = [];
                    t = t || {};
                    i.push(e);
                    if (t.role_editable) {
                        i.push('<a href="javascript:;" style="visibility:hidden;" class="change_select _change_show _js_edit_pen" opt="change_character" user="' + t.FAccount + '" nowpermission="' + t.FPermission + '"><i class="icon ico-edit"><i></i></i></a>')
                    }
                    return '<span user="' + t.FAccount + '" nowpermission="' + t.FPermission + '">' + i.join("") + "</span>"
                }
            }, {
                fieldName: "operate", displayName: "操作", type: "string", beforeShow: function p(e, t) {
                    var i = [];
                    if (t.FStatus == d.needAuthConfirm) {
                        i.push('<a href="javascript:;" class="ui_mr25" opt="authorise" user="' + t.FAccount + '" permission="' + t.FPermission + '">授权</a>')
                    } else {
                        i.push('<a href="javascript:;" class="ui_mr25" opt="resend" user="' + t.FAccount + '">重发邀请</a>')
                    }
                    i.push(" | ");
                    i.push('<a href="javascript:;" opt="cancel_authorise" user="' + t.FAccount + '">撤销邀请</a>');
                    return i.join("")
                }
            }]
        })
    }

    function f(e) {
        var t = {}, i = 1, n = $("#_number_current"), o = $("#_current_list");
        e = e || {};
        t = e.data || {};
        c = new a({
            name: "currentList",
            cgiFunction: function r(e, i) {
                var a = t.current || [];
                i({ret: 0, data: {list: a, conf: {}}});
                n.text(a.length)
            },
            tableWrap: o,
            extraClasses: ["mod-table"],
            totalRowClasses: ["tr-total"],
            needPaging: false,
            noDataTip: "抱歉，暂无已添加的协作者",
            needTotal: false,
            isFixedBar: false,
            columnConfigs: [{
                fieldName: "index", displayName: "编号", type: "number", beforeShow: function s() {
                    return i++
                }
            }, {
                fieldName: "info", displayName: "协作者信息", type: "string", beforeShow: function l(e, t) {
                    return ['<span class="worker_name _async_nickname_' + t.FAccount + '"></span>', "&nbsp;&nbsp;&nbsp;&nbsp;", '<span class="c_tx3">QQ：' + t.FAccount + "</span>"].join("")
                }
            }, {
                fieldName: "character", displayName: "协作者角色", type: "string", beforeShow: function d(e, t) {
                    var i = [];
                    t = t || {};
                    i.push(e);
                    if (t.role_editable) {
                        i.push('<a href="javascript:;" style="visibility:hidden;" class="change_select _change_show _js_edit_pen" opt="change_character" user="' + t.FAccount + '" nowpermission="' + t.FPermission + '"><i class="icon ico-edit"><i></i></i></a>')
                    }
                    return '<span user="' + t.FAccount + '" nowpermission="' + t.FPermission + '">' + i.join("") + "</span>"
                }
            }, {
                fieldName: "phone", displayName: "手机", type: "string", beforeShow: function u(e, t) {
                    var i = [];
                    t = t || {};
                    i.push(e || "-");
                    if (t.contract_editable) {
                        i.push('<a href="javascript:;" style="visibility:hidden;" class="_js_edit_pen" opt="change_phone"  data-user="' + t.FAccount + '" data-phone="' + (t.phone || "") + '" nowpermission="' + t.FPermission + '"><i class="icon ico-edit"><i></i></i></a>')
                    }
                    return i.join("")
                }
            }, {
                fieldName: "email", displayName: "邮箱", type: "string", beforeShow: function p(e, t) {
                    var i = [];
                    t = t || {};
                    i.push(e || "-");
                    if (t.contract_editable) {
                        i.push('<a href="javascript:;" style="visibility:hidden;" class="_js_edit_pen" opt="change_email"  data-user="' + t.FAccount + '" data-email="' + (t.email || "") + '" nowpermission="' + t.FPermission + '"><i class="icon ico-edit"><i></i></i></a>')
                    }
                    return i.join("")
                }
            }, {
                fieldName: "operate", displayName: "操作", type: "string", beforeShow: function f(e, t) {
                    var i = [];
                    if (t.FPermission != 10) {
                        i.push('<a href="javascript:;" opt="delete" user="' + t.FAccount + '">删除此协作者</a>')
                    }
                    return i.join("")
                }
            }]
        })
    }

    function _(e) {
        var t = [], i = [];

        function a(e) {
            t.push(e.FAccount);
            i.push(e);
            e.character = d.operatorPermissionMap[e.FPermission]
        }

        n.showLoading("_invite_list", {minHeight: "150px"});
        n.showLoading("_current_list", {minHeight: "150px"});
        e.getOperatorList(function (r) {
            var s = {}, c = {}, l = {};
            r = r || {};
            s = r.data || {};
            c.list = s.invited || [];
            l.list = s.current || [];
            c.count = c.list.length;
            l.count = l.list.length;
            n.hideLoading("_invite_list");
            n.hideLoading("_current_list");
            for (var h = 0; h < c.count; h++) {
                a(c.list[h])
            }
            for (h = 0; h < l.count; h++) {
                a(l.list[h])
            }
            p(r);
            f(r);
            u({qqNumberList: t, privilegeService: e});
            o.delegateOperations({
                privilegeService: e, showTables: function v() {
                    _(e)
                }, config: d, fillNickName: function g(t, i) {
                    u({qqNumberList: t, optOuterEle: i, privilegeService: e})
                }, listData: i
            })
        }, function (e) {
            n.hideLoading("_invite_list");
            n.hideLoading("_current_list");
            p(e);
            f(e)
        })
    }

    function h() {
        var t = "privilegeControllerModule", a = e.module(t, [i]);
        a.controller("privilegeController", ["$scope", "privilegeService", function (e, t) {
            _(t)
        }]);
        return t
    }

    return [h()]
});
define("js/controller/tool.privilege.action", ["require", "jquery", "js/modules/common", "js/modules/validator", "js/modules/changeUserContactWay", "js/services/tool.notice"], function (require) {
    var $ = require("jquery"), e = require("js/modules/common"), t = require("js/modules/validator"), i = require("js/modules/changeUserContactWay"), a = require("js/services/tool.notice");
    var n = {}, o = function d() {
    }, r = {}, s = function u() {
    }, c = [];
    var l = {
        delegateOperations: function p(e) {
            var t = l;
            n = e.privilegeService || {};
            o = e.showTables || function () {
            }, r = e.config || {}, s = e.fillNickName || function () {
            }, c = e.listData || [];
            $("#_invite_list").off("click").on("click", "[opt=change_character]", function () {
                var e = $(this).parent();
                t.edit.showSelectButton(e, this, "invite");
                return false
            }).on("click", "[opt=change_phone]", function () {
                var e = $(this).parent();
                t.edit.changePhone(e, this, "invite");
                return false
            }).on("click", "[opt=change_email]", function () {
                var e = $(this).parent();
                t.edit.changeEmail(e, this, "invite");
                return false
            }).on("click", "[opt=change_select]", function (e) {
                var i = $(e.target).parent().parent();
                t.edit.showOperatorCharacterEditSelect(i, e.target, "invite");
                return false
            }).on("click", "[opt=character_submit]", function (e) {
                var i = $(e.target);
                var a = i.parent();
                var n = a.find("._select");
                var o = n.eq(0).attr("tobe");
                var r = a.eq(0).attr("user");
                t.edit.doOperatorCharacterEdit(r, o);
                return false
            }).on("click", "[opt=character_cancel]", function (e) {
                var i = $(e.target);
                var a = i.parent();
                t.edit.initOperatorCharacterTd(a);
                return false
            }).on("click", "[opt=authorise]", function (e) {
                var i = $(e.target);
                var a = i.eq(0).attr("user");
                var n = i.eq(0).attr("permission");
                t.auth.confirmAuth(a, n);
                return false
            }).on("click", "[opt=cancel_authorise]", function (e) {
                var i = $(e.target);
                var a = i.eq(0).attr("user");
                t.auth.cancelAuth(a);
                return false
            }).on("click", "[opt=resend]", function (e) {
                var i = $(e.target);
                var a = i.eq(0).attr("user");
                t.auth.resend(a);
                return false
            });
            $("#_current_list").off("click").on("click", "[opt=change_character]", function () {
                var e = $(this).parent();
                t.edit.showSelectButton(e, this, "current");
                return false
            }).on("click", "[opt=change_phone]", function () {
                var e = $(this).parent();
                t.edit.changePhone(e, this, "current");
                return false
            }).on("click", "[opt=change_email]", function () {
                var e = $(this).parent();
                t.edit.changeEmail(e, this, "current");
                return false
            }).on("click", "[opt=change_select]", function (e) {
                var i = $(e.target).parent().parent();
                t.edit.showOperatorCharacterEditSelect(i, e.target, "current");
                return false
            }).on("click", "[opt=character_submit]", function (e) {
                var i = $(e.target);
                var a = i.parent();
                var n = a.find("._select");
                var o = n.eq(0).attr("tobe");
                var r = a.eq(0).attr("user");
                t.edit.doOperatorCharacterEdit(r, o);
                return false
            }).on("click", "[opt=character_cancel]", function (e) {
                var i = $(e.target);
                var a = i.parent();
                t.edit.initOperatorCharacterTd(a);
                return false
            }).on("click", "[opt=delete]", function (e) {
                var i = $(e.target);
                var a = i.eq(0).attr("user");
                t.remove.confirmDelete(a);
                return false
            });
            $("#_add_operator_div").off("click").on("click", "[opt=show_form]", function () {
                t.add.showAddOperatorPanel();
                return false
            }).on("click", "[opt=invite_query]", function () {
                t.add.doInvite();
                return false
            }).on("click", "[opt=invite_cancel]", function () {
                t.add.initAddOperatorPanel();
                return false
            });
            t.add.bindUinValidate();
            t.add.bindPhoneValidate();
            function i(e) {
                var t = ["_invite_list", "_current_list"];
                $.each(t, function (t, i) {
                    if (e == i) {
                        $("#" + i).show()
                    } else {
                        $("#" + i).hide()
                    }
                })
            }

            function a() {
                $('#_choose_table input[type="radio"]').click(function () {
                    var e = $(this).val();
                    i(e)
                })
            }

            a();
            $("#_invite_list,#_current_list").on({
                mouseenter: function d() {
                    $(this).addClass("dcu-list-hov")
                }, mouseleave: function u() {
                    $(this).removeClass("dcu-list-hov")
                }
            }, ".dcu-list li");
            $("#_invite_list,#_current_list").on({
                mouseenter: function p() {
                    $(this).addClass("hover").find("._js_edit_pen").css("visibility", "")
                }, mouseleave: function f() {
                    $(this).removeClass("hover").find("._js_edit_pen").css("visibility", "hidden")
                }
            }, "tr")
        }, displayTipDialog: function f(e, t) {
            var i = ['<div style="padding: 20px;" class="pop_notice_one">', '<div class="pop_notice_main">', '<i class="icon_notice"></i><span>' + t + "</span>", "</div>", "</div>"].join("\n");
            QZFL.dialog.create(e, i, {
                showMask: true,
                height: 105,
                width: 380,
                buttonConfig: [{type: QZFL.dialog.BUTTON_TYPE.Confirm, text: "确定"}]
            })
        }, auth: {
            confirmAuth: function _(e, t) {
                var i = l.auth;
                var a = ['<div style="padding: 20px;" class="pop_info">', '<div class="pop_info_main clearfix" id="_auth_dialog">', '<p>您将授权 <strong class="_async_nickname_' + e + '"></strong><strong>（' + e + "）</strong> 成为 <strong>" + r.operatorPermissionMap[t] + "</strong></p>", '<p class="c_tx3">授权通知发送至对方的QQ邮箱。</p>', "</div>", "</div>"].join("\n");
                QZFL.dialog.create("授权给协作者", a, {
                    showMask: true,
                    height: 105,
                    width: 380,
                    buttonConfig: [{
                        type: QZFL.dialog.BUTTON_TYPE.Cancel, text: "取消", clickFn: function c() {
                            o()
                        }
                    }, {
                        type: QZFL.dialog.BUTTON_TYPE.Confirm, text: "确定", clickFn: function d() {
                            n.authConfirm({loguid: e}, i._callbackSuccessTipConfirmAuth, i._callbackFailTip)
                        }
                    }],
                    onLoad: function u(t) {
                        s([e], t.dialogContent)
                    }
                })
            }, cancelAuth: function h(e) {
                var t = l.auth;
                var i = ['<div style="padding: 20px;" class="pop_info">', '<div class="pop_info_main clearfix" id="_auth_dialog">', '<p>您将撤销对 <strong class="_async_nickname_' + e + '"></strong><strong>（' + e + "）</strong> 的邀请</p>", '<p class="c_tx3">撤销通知将发送至对方的QQ邮箱。</p>', "</div>", "</div>"].join("\n");
                QZFL.dialog.create("撤销邀请", i, {
                    showMask: true,
                    height: 105,
                    width: 380,
                    buttonConfig: [{
                        type: QZFL.dialog.BUTTON_TYPE.Cancel, text: "取消", clickFn: function a() {
                            o()
                        }
                    }, {
                        type: QZFL.dialog.BUTTON_TYPE.Confirm, text: "确定", clickFn: function r() {
                            n.deleteOperator({loguid: e}, t._callbackSuccessTipCancelAuth, t._callbackFailTip)
                        }
                    }],
                    onLoad: function c(t) {
                        s([e], t.dialogContent)
                    }
                })
            }, resend: function v(e) {
                var t = l.auth;
                n.resendMail({loguid: e}, t._callbackSuccessTipResend, t._callbackFailTip)
            }, _callbackSuccessTipConfirmAuth: function g(t) {
                var i = l.auth;
                if (t.ret != 0) {
                    i._callbackFailTip(t);
                    return false
                }
                e.showMsgbox("授权成功", 4);
                o()
            }, _callbackSuccessTipCancelAuth: function m(t) {
                var i = l.auth;
                if (t.ret != 0) {
                    i._callbackFailTip(t);
                    return false
                }
                e.showMsgbox("撤销成功", 4);
                o()
            }, _callbackSuccessTipResend: function b(t) {
                var i = l.auth;
                if (t.ret != 0) {
                    i._callbackFailTip(t);
                    return false
                }
                e.showMsgbox("邀请成功", 4);
                o()
            }, _callbackFailTip: function k(t) {
                e.showMsgbox(t.msg || "操作失败", 5)
            }
        }, edit: {
            showSelectButton: function T(e, t, i) {
                var a = l.edit;
                e.find("._raw").addClass("none");
                e.find("._select").removeClass("none");
                a.showOperatorCharacterEditSelect(e, e.find("._select")[0], i)
            }, showOperatorCharacterEditSelect: function y(t, i, a) {
                var n = l.edit;
                var o = $.extend(true, {}, r.operatorPermissionMap);
                $.each(o, function (e) {
                    if ($.inArray(parseInt(e, 10), r.opAbleToBe) < 0) {
                        delete o[e]
                    }
                });
                var s = t.find("a[opt=change_character]").attr("nowpermission");

                function c(e, t, i, a) {
                    var n = ['<div class="dcu-btn">', '  <a href="javascript:;" title="点击这里确认" class="qz_dialog_layer_sub _ok s-button-right">确认</a>', '  <a href="javascript:;" title="点击这里取消" class="qz_dialog_layer_nor _cancel ui-button">取消</a>', "</div>"].join("");
                    var o = $("<div></div>").addClass("datas-change-user");
                    var r = $("<ul></ul>").addClass("dcu-list");
                    r.appendTo(o);
                    $.each(t, function (e, t) {
                        var i = $("<li></li>").appendTo(r);
                        var a = $("<label></label>").appendTo(i);
                        $('<input class="radio" type="radio">').attr("value", e).attr("name", "tobe").appendTo(a);
                        a.append(t)
                    });
                    o.append(n);
                    o.find("a._cancel").bind("click", function () {
                        o.remove();
                        $("a._js_edit_pen").css("visibility", "hidden");
                        return false
                    });
                    o.find("a._ok").bind("click", function () {
                        var e = o.find('ul input[type="radio"]:checked').val();
                        var t = i(e);
                        if (t) {
                            o.remove()
                        }
                        return false
                    });
                    o.appendTo(e);
                    a && a(o)
                }

                if ($.inArray(parseInt(s, 10), r.opAbleToBe) > -1) {
                    c(t, o, function (i) {
                        if (!i) {
                            e.showMsgbox("请选择角色", 5);
                            return false
                        }
                        t.contents().filter(function () {
                            return this.nodeType == 3
                        }).filter(":first").text(r.operatorPermissionMap[i]);
                        var o = t.attr("user");
                        n.doOperatorCharacterEdit(o, i, a)
                    }, function (e) {
                        e.find('input[value="' + s + '"]').prop("checked", true)
                    })
                }
            }, operatorEditSubmit: function C(e, t) {
                var i = l.edit;
                var a = e;
                var n = a.find("._select");
                var o = n.eq(0).attr("tobe");
                var r = a.eq(0).attr("user");
                i.doOperatorCharacterEdit(r, o, t)
            }, initOperatorCharacterTd: function j(e) {
                e.find("._raw").removeClass("none");
                e.find("._select").addClass("none");
                o()
            }, doOperatorCharacterEdit: function F(e, t, i) {
                var a = l.edit;
                var c = ['<div style="padding: 20px;" class="pop_info">', '<div class="pop_info_main clearfix" id="_auth_dialog">', '<p>您将授权 <strong class="_async_nickname_' + e + '"></strong><strong>（' + e + "）</strong> 成为 <strong>" + r.operatorPermissionMap[t] + "</strong></p>", i == "current" ? '<p class="c_tx3">授权通知发送至对方的QQ邮箱。</p>' : "", "</div>", "</div>"].join("\n");
                QZFL.dialog.create("授权给协作者", c, {
                    showMask: true,
                    height: 105,
                    width: 380,
                    buttonConfig: [{
                        type: QZFL.dialog.BUTTON_TYPE.Cancel, text: "取消", clickFn: function d() {
                            o()
                        }
                    }, {
                        type: QZFL.dialog.BUTTON_TYPE.Confirm, text: "确定", clickFn: function u() {
                            n.editOperator({loguid: e, permission: t}, a._callbackSuccessTip, a._callbackFailTip)
                        }
                    }],
                    onLoad: function p(t) {
                        s([e], t.dialogContent)
                    }
                })
            }, _callbackSuccessTip: function w(t) {
                var i = l.edit;
                if (t.ret != 0) {
                    i._callbackFailTip(t);
                    return false
                }
                e.showMsgbox("修改成功", 4);
                o()
            }, _callbackFailTip: function x(t) {
                e.showMsgbox(t.msg || "操作失败", 5);
                o()
            }, changePhone: function O(e, t, a) {
                var n = $(t).data("phone") || "", r = $(t).data("user") || "", s = $(t).attr("nowpermission") || "";
                i.changePhone({
                    phone: n, operator_login_name: r, operator_role: s, callback: function c(e) {
                        o()
                    }
                })
            }, changeEmail: function P(e, t, a) {
                var n = $(t).data("email") || "", r = $(t).data("user") || "", s = $(t).attr("nowpermission") || "";
                i.changeEmail({
                    email: n, operator_login_name: r, operator_role: s, callback: function c() {
                        o()
                    }
                })
            }
        }, add: {
            initAddOperatorPanel: function N() {
                $("#_add_operator_div ._add_button").removeClass("none");
                $("#_add_operator_div ._add_panel").addClass("none");
                $("#_error_uid").addClass("none")
            }, showAddOperatorPanel: function S() {
                $("#_add_operator_div ._add_button").addClass("none");
                $("#_add_operator_div ._add_panel").removeClass("none")
            }, doInvite: function L() {
                var t = l.add;
                if (t.doUinValidate() && t.doPhoneValidate()) {
                    var i = e.getFormData("#_invite_form"), a = "";
                    if (!i.permission) {
                        e.showMsgbox("请选择角色", 5);
                        return false
                    }
                    for (a in i) {
                        if (!i[a]) {
                            delete i[a]
                        }
                    }
                    if (t.checkBeforeInvite(i)) {
                        var o = ['<div style="padding: 20px;" class="pop_info">', '<div class="pop_info_main clearfix" id="_auth_dialog">', '<p>您将邀请 <strong class="_async_nickname_' + i.loguid + '"></strong><strong>（' + i.loguid + "）</strong> 成为 <strong>" + r.operatorPermissionMap[i.permission] + "</strong></p>", '<p class="c_tx3">邀请将发送至对方的QQ邮箱。</p>', "</div>", "</div>"].join("\n");
                        QZFL.dialog.create("邀请协作者", o, {
                            showMask: true,
                            height: 105,
                            width: 380,
                            buttonConfig: [{
                                type: QZFL.dialog.BUTTON_TYPE.Cancel,
                                text: "取消"
                            }, {
                                type: QZFL.dialog.BUTTON_TYPE.Confirm, text: "确定", clickFn: function c() {
                                    n.addOperator(i, t._callbackSuccessTip, t._callbackFailTip)
                                }
                            }],
                            onLoad: function d(e) {
                                s([i.loguid], e.dialogContent)
                            }
                        })
                    }
                }
            }, checkBeforeInvite: function q(e) {
                var t = true;
                var i = "";
                var a = c.length;
                var n = c;
                if (a == 20) {
                    t = false;
                    i = "协作者人数与邀请中的人数之和大于20，请删除部分协作者后重新操作"
                }
                for (var o = 0; o < a; o++) {
                    if (n[o].FAccount == e.loguid) {
                        t = false;
                        if (n[o].FStatus == 1) {
                            i = "该QQ已经是您的协作者"
                        } else {
                            i = "您已经向该QQ发送过了邀请"
                        }
                        break
                    }
                }
                if (!t) {
                    l.displayTipDialog("邀请协作者", i)
                }
                return t
            }, doUinValidate: function Q() {
                var e = $("#_add_operator_uin").val();
                var t = /^[1-9][0-9]{4,20}$/;
                if (t.test(e)) {
                    $("#_error_uid").addClass("none");
                    return true
                } else {
                    $("#_error_uid").removeClass("none");
                    return false
                }
            }, doPhoneValidate: function A() {
                var e = $.trim($("#_add_operator_phone").val());
                if (!e || t.valfun.phone(e)) {
                    $("#_error_phone").addClass("none");
                    return true
                } else {
                    $("#_error_phone").removeClass("none");
                    return false
                }
            }, bindUinValidate: function M() {
                var e = l.add;
                $("#_add_operator_uin").on("blur", function () {
                    e.doUinValidate()
                }).on("input", function () {
                    if (!$("#_error_uid").hasClass("none")) {
                        e.doUinValidate()
                    }
                })
            }, bindPhoneValidate: function E() {
                var e = l.add;
                $("#_add_operator_phone").on("blur", function () {
                    e.doPhoneValidate()
                }).on("input", function () {
                    if (!$("#_error_phone").hasClass("none")) {
                        e.doPhoneValidate()
                    }
                })
            }, _callbackSuccessTip: function B(t) {
                var i = l.add;
                if (t.ret != 0) {
                    i._callbackFailTip(t);
                    return false
                }
                e.showMsgbox("邀请发送成功", 4);
                o()
            }, _callbackFailTip: function U(e) {
                l.displayTipDialog("邀请协作者", e.msg || "操作失败");
                o()
            }
        }, remove: {
            confirmDelete: function Z(e) {
                var t = l.remove;
                var i = ['<div style="padding: 20px;" class="pop_info">', '<div class="pop_info_main clearfix" id="_auth_dialog">', '<p>您将删除协作者： <strong class="_async_nickname_' + e + '"></strong><strong>（' + e + "）</strong></p>", '<p class="c_tx3">删除通知将发送至对方的QQ邮箱。</p>', "</div>", "</div>"].join("\n");
                QZFL.dialog.create("删除协作者", i, {
                    showMask: true,
                    height: 105,
                    width: 380,
                    buttonConfig: [{type: QZFL.dialog.BUTTON_TYPE.Cancel, text: "取消"}, {
                        type: QZFL.dialog.BUTTON_TYPE.Confirm,
                        text: "确定",
                        clickFn: function a() {
                            n.deleteOperator({loguid: e}, t._callbackSuccessTip, t._callbackFailTip)
                        }
                    }],
                    onLoad: function o(t) {
                        s([e], t.dialogContent)
                    }
                })
            }, _callbackSuccessTip: function V(t) {
                var i = l.remove;
                if (t.ret != 0) {
                    i._callbackFailTip(t);
                    return false
                }
                e.showMsgbox("删除成功", 4);
                o()
            }, _callbackFailTip: function z(t) {
                e.showMsgbox(t.msg || "操作失败", 5);
                o()
            }
        }
    };
    return l
});
define("js/services/tool.privilege", ["require", "angular", "js/services/common", "js/modules/jsonp"], function (require) {
    var e = require("angular"), t = require("js/services/common"), i = t.loader, a = t.sender, n = require("js/modules/jsonp"), o = "privilege", r = e.module(o, []);
    var s = n.getter, c = n.poster;
    var l = {
        getOperatorList: i("user", "list", {base: "/ec/api.php?mod={mod}&act={act}", ozid: 420141}),
        addOperator: a("user", "add", {base: "/ec/api.php?mod={mod}&act={act}", ozid: 420142}),
        editOperator: a("user", "edit", {base: "/ec/api.php?mod={mod}&act={act}", ozid: 420143}),
        deleteOperator: a("user", "del", {base: "/ec/api.php?mod={mod}&act={act}", ozid: 420144}),
        resendMail: a("user", "invite", {base: "/ec/api.php?mod={mod}&act={act}", ozid: 420145}),
        authConfirm: a("user", "authorize", {base: "/ec/api.php?mod={mod}&act={act}", ozid: 420146})
    };
    r.factory("privilegeService", ["$http", "$q", "$log", "$timeout", function (e) {
        return {
            getOperatorList: function t(e, i) {
                l.getOperatorList(function (t) {
                    e(t)
                }, {data: {}, error: i})
            }, addOperator: function i(e, t, a) {
                l.addOperator(function (e) {
                    t(e)
                }, {data: e, error: a})
            }, editOperator: function a(e, t, i) {
                l.editOperator(function (e) {
                    t(e)
                }, {data: e, error: i})
            }, deleteOperator: function n(e, t, i) {
                l.deleteOperator(function (e) {
                    t(e)
                }, {data: e, error: i})
            }, resendMail: function o(e, t, i) {
                l.resendMail(function (e) {
                    t(e)
                }, {data: e, error: i})
            }, authConfirm: function r(e, t, i) {
                l.authConfirm(function (e) {
                    t(e)
                }, {data: e, error: i})
            }, qqNick: function c(e, t, i) {
                var a = "http://r.qzone.qq.com/fcg-bin/cgi_get_score.fcg?mask=4";
                s(a, e, t, {errcbFn: i, ozid: 420147, callbackName: "portraitCallBack", noDefErr: 1})
            }
        }
    }]);
    return o
});
require(["require", "angular", "utils", "js/pages/common", "js/modules/account", "js/modules/common", "js/controller/tool.privilege"], function (require) {
    var e = require("angular"), t = require("js/pages/common"), i = require("js/modules/account"), a = require("js/modules/common"), n = require("js/controller/tool.privilege");
    if (!i.checkPrivilege("collaborator")) {
        a.showMsgbox("您没有权限使用此功能", 5);
        setTimeout(function () {
            location.href = "index"
        }, 3e3)
    }
    t.initPage();
    i.privilegeElementShow();
    e.bootstrap(document, n)
});