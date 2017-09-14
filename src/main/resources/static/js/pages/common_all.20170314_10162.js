define("js/pages/common", ["require", "jquery", "aduser", "utils", "js/modules/route", "js/modules/sideslide", "js/modules/message", "js/modules/accountstat", "js/modules/helpbar", "js/modules/common", "js/modules/account", "js/config/comm", "js/config/env", "js/modules/tips", "js/modules/platform", "js/modules/sideslide", "js/modules/atlasdomflag", "js/modules/atlasdominfo", "js/modules/report", "js/modules/jquery.plugin"], function (require) {
    "use strict";
    var $ = require("jquery"), e = require("aduser"), t = require("utils"), n = require("js/modules/route"), i = require("js/modules/sideslide"), a = require("js/modules/message"), r = require("js/modules/accountstat"), o = require("js/modules/helpbar"), s = require("js/modules/common"), l = require("js/modules/account"), c = require("js/config/comm"), u = require("js/config/env"), d = require("js/modules/tips"), f = require("js/modules/platform"), p = require("js/modules/sideslide"), m = require("js/modules/atlasdomflag"), g = require("js/modules/atlasdominfo"), h = require("js/modules/report");
    require("js/modules/jquery.plugin");
    function v() {
        $(window).bind("resize", function () {
            var e = $("#" + d.Greenhand_id);
            if (!e.length) {
                s.resizeMainDivHeightToMatchWin()
            }
        });
        s.resizeMainDivHeightToMatchWin()
    }

    function _() {
        N();
        y();
        E();
        I();
        j();
        O();
        L();
        F()
    }

    function y() {
        var t = e, i = $("#headerAccountInfo"), s = $("#gUserBar");
        //i.find("._accountname").text(t.logname || t.nickname).attr("title", t.logname);
        //var c = [$("<span></span>").text("QQ:" + t.loguid), $("<span></span>").text("帐户ID:" + t.aduid)];
        //i.find("._accountid").empty().append(c);
        i.click(function () {
            var e = $(this);
            l.privilegeElementShow($("#headerAccountInfo"));
            if (e.hasClass("user-logon")) {
                e.removeClass("user-logon")
            } else {
                e.addClass("user-logon")
            }
        });
        $("#logout").click(function () {
            T(u.PORTAL_PAGE);
            m.remove();
            g.remove()
        });
        $(document.body).bind("click.showAcctInfo", function (e) {
            var t = e.target;
            if ($(t).parents("#headerAccountInfo").length === 0) {
                i.removeClass("user-logon")
            }
        }).on("click", "._relateLink", function (e) {
            e.preventDefault();
            n.toPage(this.getAttribute("data-link"))
        });
        (function () {
            var e = function () {
                if (document.activeElement && document.activeElement.tagName == "IFRAME") {
                    i.removeClass("user-logon")
                }
                setTimeout(e, 500)
            };
            e()
        })();
        s.on("click", "#_logout", function () {
            T(u.PORTAL_PAGE);
            m.remove();
            g.remove()
        });
        a.init();
        r.init();
        o.init();
        if (l.checkPrivilege("phoenix")) {
            s.append('<div class="user-logon-list"><a href="javascript:;" data-hottag="Click.Entrance.PhoenixNew.All.NewAd" target="_blank" class="js_ordercreatebutton" data-version="new">新版本（内测）</a><a href="javascript:;" data-hottag="Click.Entrance.AtlasNew.All.NewAd" target="_blank" class="js_ordercreatebutton" data-version="old">老版本</a></div>').on({
                mouseleave: function () {
                    s.removeClass("on");
                    $('.__controller[data-hottag="atlas.sideslide.collapse"]').show()
                }, mouseover: function (e) {
                    var t = $('.__controller[data-hottag="atlas.sideslide.collapse"]');
                    if (e.target.id == "_logout" || e.target.id == "gUserBar") {
                        s.removeClass("on");
                        t.show()
                    } else if (!s.hasClass("on")) {
                        s.addClass("on");
                        t.hide()
                    }
                }
            });
            s.on("click", ".js_ordercreatebutton", function (t) {
                var i = $(this).data("version");
                if ($.inArray(e.status, [u.userStatusPrepare, u.userStatusInvalidate]) > -1) {
                    w(function () {
                        if (e.status == u.userStatusPrepare) {
                            n.toPage("tool/profile?act=edit")
                        } else {
                            n.toPage("tool/profile")
                        }
                    }, function () {
                        b(i)
                    })
                } else {
                    b(i)
                }
                t.preventDefault()
            })
        } else {
            /*s.on("click", "#createorder", function () {
             if ($.inArray(e.status, [u.userStatusPrepare, u.userStatusInvalidate]) > -1) {
             w(function () {
             if (e.status == u.userStatusPrepare) {
             n.toPage("tool/profile?act=edit")
             } else {
             n.toPage("tool/profile")
             }
             }, b)
             } else {
             b()
             }
             })*/
        }
    }

    function b(e) {
        var a = t.URIParams.get("search", "cid"), r;
        e = e || "old";
        if (e == "new") {
            window.open(n.genRealUrl("ad/create"))
        } else {
            r = u.ROOT + "order/edit";
            if (a) {
                r += "?cid=" + a
            }
            i.sideslide(r, {iframe: true})
        }
    }

    function w(t, i, a) {
        a = a || "index";
        var r = a == "index" ? "请立即前往账号中心修改资料，审核通过，才可以正常投放广告。" : "请立即前往账号中心修改资料，账户资料审核通过后即可充值。";
        var o = ['<div class="qz_dialog_layer_cont">', '    <div class="overdraw-result">', '        <h3 class="overdraw-result-tip"><i class="qz-dialog-icon dialog-icon-warning"></i>很抱歉，您提交的开户资料尚未通过审核！</h3>', "        <p>" + r + "</p>", '        <p>如有疑问可参考《<a href="http://e.qq.com/faq/list011.html" target="_blank">开户审核中常见拒绝原因及修改指引</a>》</p>', "    </div>", "</div>"].join(""), l = "前往修改", c = 500, d = 200, f = "atlas.userstatustips.invalidate";
        if (e.status == u.userStatusPrepare) {
            l = "立即补充";
            f = "atlas.userstatustips.prepare"
        }
        t = t || function () {
                if (e.status == u.userStatusPrepare) {
                    n.toPage("tool/profile?act=edit")
                } else {
                    n.toPage("tool/profile")
                }
            };
        i = i || $.noop;
        if (e.status == u.userStatusPrepare) {
            A(t, i, f);
            return
        }
        s.dialog("", o, {
            buttonConfig: [{
                type: s.dialog.BUTTON_TYPE.Confirm, text: l, clickFn: function () {
                    s.reportHottag("atlas.userstatustips.ok");
                    setTimeout(function () {
                        t()
                    }, 50)
                }
            }, {
                type: s.dialog.BUTTON_TYPE.Cancel, text: "暂时忽略", clickFn: function () {
                    i();
                    s.reportHottag(f)
                }
            }], onLoad: function (e) {
                $("#" + e.headId).find(".qz_dialog_btn_close").click(function () {
                    i();
                    s.reportHottag(f)
                })
            }, noCloseButton: true, width: c, height: d
        })
    }

    function A(e, t, n) {
        var i = ['<div id="prepare_pop" class="qz_dialog_layer width_448" style="z-index: 9999;position: absolute;right: auto;bottom: auto;left: 50%;top: 50%;margin: -197px 0 0 -225px;">' + '<div class="qz_dialog_layer_main">' + '<div class="qz_dialog_layer_cont _cont-banner">' + '<img src="img/gdt-wxguanzhu1.jpg" alt="">' + '<div class="qrcode">' + '<img id="qr_prepare" alt="">' + "</div>" + "</div>" + '<div class="qz_dialog_layer_cont">' + '<div class="overdraw-result">' + '<h3 class="overdraw-result-tip"><i class="qz-dialog-icon dialog-icon-warning"></i>您尚未完成开户流程</h3>' + "<p>请您尽快补全资质以便我们进行开户审核</p>" + '<p class="c-yellow">您也可以扫描上方二维码关注服务号后，直接用手机拍照补全资质。</p>' + "</div>" + "</div>" + '<div class="qz_dialog_layer_ft">' + '<div class="qz_dialog_layer_op"><a href="javascript:;" title="点击这里补全" class="qz_dialog_layer_btn qz_dialog_layer_sub _confirm"><span>立即补全</span></a><a href="javascript:;" title="点击这里取消" class="qz_dialog_layer_btn qz_dialog_layer_nor _cancel"><span>暂时忽略</span></a></div>' + "</div>" + "</div>" + "</div>"].join("");
        $(i).appendTo($("body"));
        QZFL.maskLayout(999, null, {opacity: .7});
        s.getWXQrcode($("#qr_prepare"), "ATALS-2001");
        $("#prepare_pop").on("click", "._confirm", function () {
            s.reportHottag("atlas.userstatustips.ok");
            setTimeout(function () {
                e()
            }, 50)
        }).on("click", "._cancel", function () {
            $("#prepare_pop").remove();
            QZFL.maskLayout.remove();
            s.reportHottag(n);
            t()
        })
    }

    function T(n) {
        $.each(["uin", "skey", "zzpaneluin", "zzpanelkey", "atlas_aduid" + e.aduid], function (e, t) {
            $.cookie.del(t, "qq.com", "/")
        });
        $.each(["elogininfo", "gdt_elogin"], function (e, t) {
            $.cookie.del(t, "e.qq.com", "/")
        });
        t.storage.del("oLCD_lastUrl", "local");
        sessionStorage.removeItem("register_uid");
        n ? top.location.href = n : top.location.reload()
    }

    function E() {
        var e = c.navHeader, t = [], i, a, r = 0, o = ['<li style="width:56px"></li>'], s = false, l, d, p, m = u.ROOT, g = f.getPlatform(), h = 5, v = false;
        if (g == "CPT") {
            e = c.cpt_navHeader
        }
        p = n.getCurrentPageName() || "index";
        for (l = 0, d = e.length; l < d; l++) {
            s = false;
            r = -1;
            e[l][1] == p && (s = true);
            a = e[l][3];
            $.isArray(a) && $.each(a, function (e, t) {
                if (t[1] == p) {
                    s = true;
                    r = e;
                    return false
                }
            });
            i = e[l];
            if (i[2]) {
                t.push('<a href="' + m + i[1] + '" class="menu ' + (s ? "current" : "") + '"><span class="currentline"></span><i class="ico ' + i[2] + '"></i><p>' + i[0] + "</p></a>")
            }
            if (r > -1) {
                $.each(a, function (e, t) {
                    var n = [];
                    var i = a[r][3];
                    if (typeof t == "string") {
                        o.push(t)
                    } else {
                        if (r == e) {
                            n.push("on");
                            if (o.length > h + 1) {
                                v = o.length + 1
                            }
                        }
                        r == e && n.push("on");
                        if ($.isFunction(t[2]) && t[2]() === false) {
                            return
                        } else if (i && t[3] && i != t[3]) {
                            return
                        }
                        o.push("<li " + (n.length ? ' class="' + n.join(" ") + '"' : "") + '><a href="' + m + t[1] + '">' + t[0] + "</a></li>")
                    }
                })
            }
            if (v) {
                o.splice(2, v - h - 2)
            }
        }
        t = '<div class="inner">' + t.join("") + "</div>";
        o = o.length ? "<ul>" + o.join("") + "</ul>" : "";
        /*$("#_hNav").html(t);*/
        //$("#_hSubNav").html(o);
        if (p == "order.html" || p == "rulepackedit.html") {
            $("#_pageTip, #_hNav>div").addClass("none")
        } else {
            $("#_pageTip, #_hNav>div").removeClass("none");
            $("#_pageTip>div")[p == "index.html" ? "addClass" : "removeClass"]("index_top_hint_inner")
        }
    }

    function x() {
        $(document).on("click", "[data-hottag]", function () {
            s.reportHottag(this.getAttribute("data-hottag"))
        })
    }

    function P() {
        setTimeout(function () {
            $(document).off("click", "[data-action]").on("click", "[data-action]", function () {
                var t = $(this), n = t.attr("data-action") || "", i = t.attr("data-href") || t.attr("href") || "";
                var a = function (t) {
                    var n = e.loguid || "", a = e.aduid || "", r = e.status || "";
                    t = t || "";
                    if (!n || !a || !i || !t) {
                        return false
                    }
                    new h.WriteLog({invoice_id: "" + Math.floor((new Date).getTime() / 1e3) + a}).send({
                        action_flag: 1,
                        operate_type: 7,
                        loguid: n,
                        request_url: encodeURIComponent(i),
                        status: r,
                        page_type: t
                    })
                };
                switch (n) {
                    case"help":
                        a(n);
                        break;
                    case"consultation":
                        a(n);
                        break
                }
            })
        }, 200)
    }

    function C() {
        setTimeout(function () {
            $(document).off("click", "[data-material]").on("click", "[data-material]", function () {
                var e = $(this), t = e.attr("data-material") || "";
                var n = t.split(","), i = [], a = {};
                for (var r = 0, o = n.length; r < o; r++) {
                    i = n[r].split("=");
                    if (i.length == 2) {
                        a[i[0]] = i[1]
                    }
                }
                s.reportMaterial(a)
            })
        }, 200)
    }

    function S() {
        var e = "showMPQrcode", t = $("#" + e), n = ['<div class="pop-gz-gdt" id="' + e + '">', '<a href="javascript:;" class="close"></a>', '<p class="gdt-wx-erweima"><img src="http://ctc.imgcache.qq.com/open_proj/proj-gdt-toufang/img/showqrcode2.png" alt="腾讯广点通服务平台" width="270" height="270"></p>', '<p class="wline"><span>扫码关注公众账号，第一时间获知审核结果。</span></p>', "</div>"].join("");
        var i = function () {
            t.remove();
            QZFL.maskLayout.remove()
        };
        if (t.length > 0) {
            i()
        } else {
            $("body").append(n);
            QZFL.maskLayout(999, null, {opacity: .7});
            t = $("#" + e);
            s.getWXQrcode(t.find("img"), "ATLAS-2000");
            t.off("click").on("click", ".close", function () {
                i()
            }).on("click", "img", function () {
                s.getWXQrcode(t.find("img"), "ATLAS-2000")
            })
        }
    }

    function k() {
        setTimeout(function () {
            $(document).off("click", "[data-showmpqrcode]").on("click", "[data-showmpqrcode]", function () {
                S();
                return false
            })
        }, 200)
    }

    function I() {
        var t = $("#_switch_site"), i = $("#platform-control"), a = [], r = !l.checkPrivilege("market_block_user") && (l.isTaskAduser() || l.isOpenPlatformAppAduser() || l.isMyAppExchangeAduser() || e.targettype == u.TARGETTYPE_DEF.INNER_APP), o = l.checkPrivilege("dmp_user"), s = l.checkPrivilege("cpt_page"), d = l.isYYBKAAduser() || l.isYYBAppAduser(), p = f.getPlatform();
        var g = function (e) {
            if (e && c.supportPlatform[e]) {
                return '<a class="platform-task selectPlatform" data-platform="' + e + '" href="javascript:;"><span>' + c.supportPlatform[e] + "</span></a>"
            } else {
                return ""
            }
        };
        var h = function () {
            t.find(".switchicon").show();
            m.set("platformlist")
        };
        var v = function () {
            t.find(".switchicon").hide();
            m.remove("platformlist")
        };
        i.html(c.supportPlatform[p]).removeClass("none");
        if (l.isYYBKAAduser()) {
            $("#root").addClass("tcappstore");
            m.set("tcappstore")
        } else {
            $("#root").removeClass("tcappstore");
            m.remove("tcappstore")
        }
        if (r || o || s || d && p == "CPT") {
            h();
            t.find(".switchbutton").click(function () {
                var e = $("body");
                if (t.hasClass("platform-sel-hov")) {
                    t.removeClass("platform-sel-hov");
                    e.unbind("click.switchsite")
                } else {
                    t.addClass("platform-sel-hov");
                    e.bind("click.switchsite", function () {
                        t.removeClass("platform-sel-hov");
                        e.unbind("click.switchsite")
                    })
                }
                return false
            });
            if (r && !l.isYYBKAAduser()) {
                a.push(['<a class="platform-task" href="', l.getTaskLink(), '"><span>任务集市</span></a>'].join(""))
            }
            if (o) {
                a.push(['<a class="platform-task" href="http://de.qq.com/dmp/prometheus/3" target="_blank"><span>DMP平台</span></a>'].join(""))
            }
            if (d && p == "CPT") {
                if (l.isYYBKAAduser()) {
                    a.push([g("CPD")].join(""))
                } else if (l.isYYBAppAduser()) {
                    a.push([g("atlas")].join(""))
                }
            }
            if (s && p != "CPT") {
                a.push([g("CPT")].join(""))
            }
            t.find("#_switch_site_list").append(a.join(""));
            if (t.find(".selectPlatform").length > 0) {
                t.find(".selectPlatform").off("click").on("click", function () {
                    var e = $(this), t = e.attr("data-platform") || "atlas", i = {
                        CPD: "index",
                        atlas: "index",
                        CPT: "cpt/index"
                    }, a = false;
                    a = f.setPlatform(t);
                    if (a) {
                        n.toPage(i[t] || "index")
                    }
                })
            }
        } else {
            t.find(".switchbutton").css("cursor", "default");
            v()
        }
    }

    function N() {
        var e = location.href || "", t = [], n = [], i = "", a = u.ROOT, r = f.getPlatform() || "", o = false;
        if (!e) {
            return false
        }
        if (r == "CPT") {
            t = c.cpt_navHeader || [];
            for (var s = 0, d = t.length; s < d; s++) {
                n = t[s][3] || [];
                i = t[s][1] || "";
                if (e.indexOf(a + i) > -1) {
                    o = true;
                    break
                }
                if (!o && n.length > 0) {
                    for (var p = 0, m = n.length; p < m; p++) {
                        i = n[p][1] || "";
                        if (e.indexOf(a + i) > -1) {
                            o = true;
                            break
                        }
                    }
                }
            }
            if (!o) {
                if (l.isYYBKAAduser()) {
                    f.setPlatform("CPD")
                } else {
                    f.setPlatform("atlas")
                }
            }
        }
    }

    function j() {
        var e = f.getPlatform(), t = $("#createorder");
        if (e == "CPT") {
            t.addClass("none")
        } else {
            t.removeClass("none")
        }
    }

    function O() {
        var e = t.storage.get("oLCD_lastUrl", "local") || "", n = f.getPlatform();
        if (e && location.pathname.indexOf("/order/edit") < 0 && n != "CPT") {
            p.sideslide(e, {iframe: true, noexpand: true})
        }
    }

    function L() {
        var e = GDT.gAduser || {}, t = e.logname || e.nickname || "", n = e.loguid || "", i = e.aduid || "";
        g.remove("loguid");
        if (n) {
            g.set("loguid", n)
        }
        g.remove("aduid");
        if (i) {
            g.set("aduid", i)
        }
        g.remove("nickname");
        if (t) {
            g.set("nickname", t)
        }
    }

    function F() {
        var e = t.URIParams.get("search", "sub_url_need_open") || "", n = f.getPlatform();
        if (typeof e == "string" && e.indexOf(location.host) > -1 && location.pathname.indexOf("/order/edit") < 0 && n != "CPT") {
            p.sideslide(e, {iframe: true})
        }
    }

    return {
        initPage: function (t) {
            GDT.timepot.jsEnd = +new Date;
            t = t || {};
            //if (t.autoReportPV !== false) {
            //    s.reportPV()
            //}
            //if (t.autoReportSpeed !== false) {
            //    s.pageSpeed.report()
            //}
            if (!t.noNeedHeader) {
                _()
            }
            //x();
            P();
            C();
            k();
            v();
            //if ($.inArray(e.status, [u.userStatusPrepare]) > -1 && !$.cookie.get("atlas_aduid" + e.aduid)) {
            //    if (!t.isProfile) {
            //        $.cookie.set("atlas_aduid" + e.aduid, e.aduid, "qq.com", "/");
            //        this.showAccountNoReadyTips(false, function () {
            //            d.init(t)
            //        })
            //    }
            //} else if ($.inArray(e.status, [u.userStatusInvalidate]) > -1 && t.isIndex) {
            //    this.showAccountNoReadyTips(false, function () {
            //        d.init(t)
            //    })
            //} else {
            d.init(t)
            //}
            l.privilegeElementShow();
            $(".js_ng_hide").removeClass("none")
        }, logout: T, sideslide: i.sideslide, maskLayout: i.maskLayout/*, showAccountNoReadyTips: w*/
    }
});
define("js/modules/account", ["require", "js/config/env", "js/modules/common", "aduser", "privilege", "jquery", "utils"], function (require) {
    "use strict";
    var e = require("js/config/env"), t = require("js/modules/common"), n = require("aduser"), i = require("privilege"), $ = require("jquery"), a = require("utils"), r = {
        getLoguin: function (e) {
            var t = e || n, i;
            i = t && t.loguid;
            return i
        }, getOwneruin: function (e) {
            var t = e || n, i;
            i = t && t.aduid;
            return i
        }, getTaskLink: function () {
            return ["/task", r.getOwneruin(), "index"].join("/")
        }, setUserData: function (e) {
            n = e
        }, isBoss: function (e) {
            var t = e || n;
            return t && t.isboss ? true : false
        }, isQqBiz: function (e) {
            var t = e || n;
            return t && t.is_qq_biz ? true : false
        }, isInteractive: function (e) {
            return true
        }, isCPM: function () {
            return i.cpm ? true : false
        }, isBrand: function (t) {
            var i = t || n;
            return i && i.targettype == e.BRAND_ADUSER ? true : false
        }, isLongTail: function (t) {
            var i = t || n;
            return i && i.targettype == e.LONGTAIL_ADUSER ? true : false
        }, isShoppinginterest: function (e) {
            var t = e || n;
            return t && t.privilege && t.privilege.shoppinginterest ? true : false
        }, isConsumption: function (e) {
            var t = e || n;
            return t && t.privilege && t.privilege.highconsumption ? true : false
        }, isLowConsumption: function (e) {
            var t = e || n;
            return t && t.privilege && t.privilege.lowconsumption ? true : false
        }, isO2o: function (e) {
            var t = e || n;
            return t && t.privilege && t.privilege.limitation_1000 ? true : false
        }, isBqq: function (e) {
            var n = r.getOwneruin(), i = false;
            return t.isBqq(n)
        }, canCharge: function (e) {
            var t = e || n;
            return t && t.can_charge && !r.isLongTail(e) ? true : false
        }, canUseSellerQqType: function (e) {
            var t = e || n;
            return t && t.privilege && t.privilege.merchant_qq ? true : false
        }, canUseIframe: function () {
            var e = n;
            return e && e.privilege && e.privilege.renzheng_embed ? true : false
        }, checkPrivilege: function (e) {
            var t = n;
            var i = (e + "").split(/\s+/);
            for (var a = 0, r = i.length; a < r; a++) {
                if (t && t.privilege && t.privilege[i[a]]) {
                    return true
                }
            }
            return false
        }, isFormalEnvirment: function () {
            return e.env === "formal"
        }, isDevEnvirment: function () {
            return e.env === "develop"
        }, isTestEnvirment: function () {
            return e.env === "testidc"
        }, isGrayEnvirment: function () {
            return e.env === "gray"
        }, isPrepareStatus: function () {
            return $.inArray(n.status, [e.USER_STATUS_DEF.prepare, e.USER_STATUS_DEF.validating, e.USER_STATUS_DEF.invalidate]) > -1
        }, isTaskAduser: function () {
            return n.targettype === 28
        }, isMyAppExchangeAduser: function () {
            return n.aduser_type ? true : false
        }, isYYBKAAduser: function () {
            return r.checkPrivilege("ka_advertiser")
        }, isYYBAppAduser: function () {
            return r.checkPrivilege("myapppromotion")
        }, isPlanTypeAduser: function () {
            return r.checkPrivilege("tsa_search")
        }, isLocalAdUser: function () {
            return r.checkPrivilege("Local_ads")
        }, isOpenPlatformAppAduser: function () {
            return n.targettype == e.TARGETTYPE_DEF.OPEN_PLATFORM_APP
        }, isInnerAppAduser: function () {
            return n.targettype == e.TARGETTYPE_DEF.INNER_APP
        }, isGroupSearch: function () {
            return r.checkPrivilege("group_search")
        }, isWechatAduser: function () {
            return r.checkPrivilege("weixin_ex_link")
        }, privilegeElementShow: function (t, n) {
            var i, a, o;
            if (t) {
                i = $("._privilege", t)
            } else {
                i = $("._privilege")
            }
            i.each(function () {
                var t = $(this);
                a = t.attr("data-apiversionlimit");
                o = t.attr("data-privilege");
                if (t.attr("data-notshowaduser")) {
                    var i = t.attr("data-notshowaduser"), s = i.split(",");
                    if ($.inArray("KA", s) > -1 && r.isYYBKAAduser()) {
                        n ? t.remove() : t.hide()
                    } else {
                        t.show()
                    }
                } else if (a && e.apiVersion() == a) {
                    t.show()
                } else if (t.attr("data-cancharge") && r.canCharge()) {
                    if (r.isPrepareStatus()) {
                        t.hide()
                    } else {
                        t.show()
                    }
                } else if (t.attr("data-needboss")) {
                    if (r.isBoss()) {
                        t.show()
                    } else {
                        n ? t.remove() : t.hide()
                    }
                } else if (o && r.checkPrivilege(o)) {
                    t.show()
                } else {
                    n ? t.remove() : t.hide()
                }
            })
        }, isNotFirstCreateAd: function () {
            var e = r.getOwneruin(), t = "isnotfirstcreatead_" + e;
            return a.storage.get(t, "local") == 1 ? true : false
        }, setNotFirstCreateAdSign: function () {
            var e = r.getOwneruin(), t = "isnotfirstcreatead_" + e;
            a.storage.set(t, 1, {media: "local", expire: 864e5 * 1e4})
        }
    };
    return r
});
define("js/modules/route", ["require", "js/config/comm"], function (require) {
    "use strict";
    var e = require("js/config/comm");
    var t = "__subpage__", n = null, i;
    i = {
        getIframe: function () {
            return document.getElementById(t)
        }, toPage: function (e) {
            var t = i.genRealUrl(e);
            i.toUrl(t)
        }, toUrl: function (e) {
            window.location.href = e
        }, getCurrentPageName: function () {
            var e = "", t;
            try {
                e = location.pathname
            } catch (n) {
            }
            var i = /^\/atlas\/([0-9]{4,20})/;
            if (i.test(location.pathname)) {
                t = e.match(/\/([\w\.]+)\/([0-9]{4,20})\/{1,}(.*)/);
                return t && t.length ? t[3] : ""
            } else {
                t = e.match(/\/([\w\.]+)\/{1,}(.*)/);
                return t && t.length ? t[2] : ""
            }
        }, setPageHash: function (e) {
            var t = [], i = "gdtpath=" + e, a = n.contentWindow.location, r, o;
            t.push(i);
            try {
                r = a.search.slice(1);
                o = a.hash.slice(1)
            } catch (s) {
            }
            o && (t = t.concat(o.split("&")));
            r && (t = t.concat(r.split("&")));
            t = $.unique(t);
            location.hash = t.join("&")
        }, passSubFrameWH: function () {
            try {
                n.height = Math.max(i.getScrollHeight(n), 450)
            } catch (e) {
            }
        }, genVirtualUrl: function () {
        }, genRealUrl: function (t) {
            var n, a, r, o;
            if (t) {
                o = t
            } else {
                n = i.getParameter("gdtpath");
                if (a = n.match(/^(\w+\/)*(\w+)$/)) {
                    r = a.length > 2 ? a[1] ? a[1] : r : r;
                    o = a[2] || a[1]
                }
            }
            o = o || "index";
            return [e.ENV.ROOT, o].join("")
        }, getParameter: function (e, t) {
            var n = new RegExp("(\\?|#|&)" + e + "=([^&#]*)(&|#|$)");
            var i = location.href.match(n);
            if ((!i || i == "") && !t) {
                i = top.location.href.match(n)
            }
            return !i ? "" : i[2]
        }, getScrollHeight: function (e) {
            var t = 0;
            if (!window.opera) {
                if (e.contentDocument && e.contentDocument.body.offsetHeight) {
                    t = e.contentDocument.body.offsetHeight + 20
                } else if (e.Document && e.Document.body.scrollHeight) {
                    t = e.Document.body.scrollHeight + 10
                }
            } else {
                if (e.contentWindow.document && e.contentWindow.document.body.scrollHeight) {
                    t = e.contentWindow.document.body.scrollHeight
                }
            }
            t = t || e.contentDocument.body.offsetHeight + 20;
            return t
        }, getScrollWidth: function (e) {
            var t = e || document;
            return Math.max(t.documentElement.scrollWidth, t.body.scrollWidth)
        }
    };
    return i
});
define("js/modules/sideslide", ["require", "jquery", "js/modules/report", "js/modules/account", "js/config/comm", "utils"], function (require) {
    "use strict";
    var $ = require("jquery"), e = require("js/modules/report"), t = require("js/modules/account"), n = require("js/config/comm"), i = require("utils");
    var a = function () {
        var e = null, t = 0, n = function (n, i, a) {
            ++t;
            if (e) {
                return t
            }
            n = n || 5e3;
            i = i || document;
            a = a || {};
            var r = parseFloat(a.opacity);
            a.opacity = isNaN(r) ? .3 : r;
            r = parseFloat(a.top);
            a.top = isNaN(r) ? 0 : r;
            r = parseFloat(a.left);
            a.left = isNaN(r) ? 0 : r;
            e = $('<div class="gdt-mask" unselectable="on">').appendTo(i.body).get(0);
            e.style.cssText = 'background-color:#000;-ms-filter:"alpha(opacity=20)";#filter:alpha(opacity=' + 100 * a.opacity + ");opacity:" + a.opacity + "; position:fixed;_position:absolute;left:" + a.left + "px;top:" + a.top + "px;z-index:" + n + ";width:100%;height:" + i.body.clientHeight + "px;";
            return t
        };
        n.setOpacity = function (t) {
            if (e && t) {
                $(e).css("opacity", t)
            }
        };
        n.getRef = function () {
            return e
        };
        n.remove = function (n) {
            t = Math.max(--t, 0);
            if (!t || n) {
                $(e).remove();
                e = null;
                n && (t = 0)
            }
        };
        return n.create = n
    }();
    var r = function () {
        var e = {};
        e.collapse = function (e, t) {
            var n = t || function () {
                };
            e = e || "_sider";
            $("#" + e).animate({width: "0"}, 600, n).css({overflow: "visible"})
        };
        e.expand = function (e, t, n) {
            var i = n || function () {
                };
            e = e || "_sider";
            t = t || 750;
            $("#" + e).css("background", "#fff").animate({width: t + "px"}, 600, i).css({overflow: "visible"})
        };
        return e
    }();
    var o = function (e, t, n) {
        var i, a, r;
        t = t || {};
        i = t.info ? "info" : "edit";
        a = o.instances[i];
        a && a.clear && a.clear() && (o.instances[i] = null);
        t.getDimensions = o.getDimensions;
        r = new s(e, t, n);
        o.instances[i] = r
    };
    o.instances = {};
    o.getDimensions = function () {
        var e, t, n = $(document.body), i, a = Math.max($(document).width() * .7, 996);
        e = n.outerHeight();
        t = 0;
        i = e - t;
        return {top: t, width: a, height: i}
    };
    o.getInstance = function (e) {
        var t, n;
        e = e || {};
        t = e.info ? "info" : "edit";
        n = o.instances[t];
        return n
    };
    o.collapse = function (e) {
        var t = o.getInstance(e);
        t && t.collapse(e)
    };
    o.expand = function (e) {
        var t = o.getInstance(e);
        t && t.expand(e)
    };
    var s = function (n, a, r) {
        var o, l = this, c, u = $(document.body), d, f, p, m = "", g, h, v = "auto", _;
        a = a || {};
        l.id = c = s.id + s.instancenum;
        s.instancenum++;
        l.opts = a;
        l.getDimensions = a.getDimensions || function () {
                return {}
            };
        h = l.getDimensions();
        d = a.width || 0;
        if (!d) {
            d = h.width
        }
        l.width = d;
        f = h.height;
        p = h.top;
        l.zindex = a.zindex || s.zindex;
        if (a.info) {
            m = s.classmap.info
        } else {
            m = s.classmap.expand
        }
        u.css("overflow-y", "hidden");
        if (a.iframe) {
            _ = n = '<iframe src="' + n + '" frameBorder="0" allowTransparency="true" marginWidth="0" marginHeight="0" style="width: 100%; height: ' + f + 'px;"></iframe>';
            v = "hidden"
        }
        if (a.noexpand) {
            n = ""
        }
        o = ['<div id="' + c + '" style="position: fixed; top: ' + p + "px; right: 0px; width:0px; height: " + f + "px; z-index: " + l.zindex + '; box-shadow: 10px  rgb(0,0,0); ">', '<div class="layer-container __container" style="width:' + d + 'px;height: 100%;">', '<div class="slide-layer" style="overflow: ' + v + '; height: 100%;">', '<div class="controller __controller ' + m + '" style="cursor: pointer;"></div>', n, "</div>", "</div>", "</div>"].join("");
        g = "expand";
        var y = $("#" + c);
        if (y.size() > 0) {
            y.remove()
        }
        $(document.body).append(o);
        if (!a.noexpand) {
            l.expand({id: c, width: d})
        } else {
            g = "collapse";
            l.setControllerIcon(g)
        }
        $("#" + c + " .__controller").bind("click", function () {
            var n = g == "expand" ? "collapse" : "expand";
            if (a.info) {
                n = "collapse"
            }
            if (n == "expand" && a.noexpand && $("#" + c + " iframe").size() < 1 && _) {
                $(_).insertAfter($("#" + c + " .__controller"))
            }
            l[n]();
            g = n;
            if (a.info) {
                setTimeout(function () {
                    i.log("sideid to remove", c);
                    $("#" + c).remove()
                }, 600)
            } else {
                setTimeout(function () {
                    l.setControllerIcon(n)
                }, 100)
            }
            if (!$.isEmptyObject(s.monitorMsg)) {
                new e.WriteLog({invoice_id: "" + Math.floor((new Date).getTime() / 1e3) + t.getOwneruin()}).send($.extend({
                    action_flag: 2,
                    operate_type: "204"
                }, s.monitorMsg))
            }
        }).bind("mouseenter", function () {
            $(this).addClass("controller-spread-h")
        }).bind("mouseleave", function () {
            $(this).removeClass("controller-spread-h")
        });
        l._resizefn = function () {
            l._winresize()
        };
        $(window).bind("resize", l._resizefn);
        r && r();
        return l
    };
    s.prototype.setControllerIcon = function (e, t) {
        var n = e == "expand" ? "collapse" : "expand", i, a, r;
        t = t || {};
        r = this.id;
        i = s.classmap[e];
        a = s.classmap[n];
        $("#" + r + " .__controller").removeClass(a).addClass(i).attr("data-hottag", "atlas.sideslide." + e)
    };
    s.prototype.expand = function (e) {
        var t = this.id, i;
        e = e || {};
        i = e.width || this.width;
        $(document.body).css("overflow-y", "hidden");
        a.create(this.zindex - 1, null, {opacity: n.ENV.OPACITY_DARK});
        r.expand(t, i)
    };
    s.prototype.collapse = function (e) {
        var t = this.id;
        e = e || {};
        r.collapse(t, function () {
            $(document.body).css("overflow-y", "auto");
            a.remove()
        });
        setTimeout(function () {
            $(document.body).css("overflow-y", "auto");
            a.remove()
        }, 600);
        if (e.remove) {
            setTimeout(function () {
                $("#" + t).fadeOut("slow").remove()
            }, 800);
            this._resizefn && $(window).unbind("resize", o._winresize) && (this._resizefn = null)
        }
    };
    s.prototype._winresize = function () {
        var e = this, t = this.getDimensions();
        i.log("dim size:", t);
        var r = function (i) {
            var r;
            if (i.size() === 0) {
                return
            }
            r = i.width();
            i.height(t.height);
            if (r > 0) {
                i.width(t.width);
                a.remove();
                a.create(e.zindex - 1, null, {opacity: n.ENV.OPACITY_DARK})
            }
            e.width = t.width;
            i.find(".__container").width(t.width);
            i.find("iframe").height(t.height)
        };
        r($("#" + e.id))
    };
    s.prototype.clear = function () {
        var e = this.id, t, n;
        t = $("#" + e);
        if (t.size() > 0) {
            t.find("iframe").attr("src", "about:blank");
            setTimeout(function () {
                n = t.get(0);
                n.removeNode ? n.removeNode(true) : n.parentNode && n.parentNode.removeChild(n);
                n = null
            }, 30)
        }
    };
    s.classmap = {info: "controller-close", expand: "controller-packup", collapse: "controller-spread"};
    s.monitorMsg = {};
    s.id = "__gdtsider";
    s.instancenum = 0;
    s.zindex = 1e3;
    window.GDT.sideslide = o;
    window.addEventListener("message", function (e) {
        var t, n, i, a;
        t = e.origin.split("://");
        i = /^http|https$/.test(t[0]);
        a = /^e\.qq\.com/.test(t[1]);
        if (i && a) {
            if (e.data == "collapse") {
                o.collapse({remove: true})
            } else if (e.data != "") {
                n = JSON.parse(e.data);
                if (n.type == "stepCondition") {
                    s.monitorMsg = n
                }
            }
        }
    }, true);
    return {sideslide: o, maskLayout: a, sideBar: r}
});
define("js/modules/message", ["require", "jquery", "utils", "js/config/comm", "js/services/message", "js/modules/beautyui", "js/modules/common", "js/modules/simulateui", "js/modules/sideslide", "js/modules/route", "js/modules/atlasdomflag", "js/modules/atlasdominfo"], function (require) {
    "use strict";
    var $ = require("jquery"), e = require("utils"), t = require("js/config/comm"), n = require("js/services/message"), i = require("js/modules/beautyui"), a = require("js/modules/common"), r = require("js/modules/simulateui"), o = require("js/modules/sideslide"), s = require("js/modules/route"), l = require("js/modules/atlasdomflag"), c = require("js/modules/atlasdominfo");
    var u = {0: "全部", 1: "未读", 2: "已读"}, d = {}, f, p = null;
    d.init = function () {
        var t = $("#gMessageWrap"), i = t.find(".inner").eq(0), a = $("#showMsglist"), r;
        a.on("click", function (e) {
            if (i.hasClass("current")) {
                d.removePopup()
            } else {
                d.popup()
            }
        });
        $(document.body).bind("click.hideAccountStat", function (e) {
            var t = e.target;
            if ($(t).parents("#gMessageWrap, .qz_dialog_layer").length === 0) {
                d.removePopup()
            }
        });
        (function () {
            var e = function () {
                if (document.activeElement && document.activeElement.tagName == "IFRAME") {
                    d.removePopup()
                }
                setTimeout(e, 500)
            };
            e()
        })();
        r = e.URIParams.get("search", "message") == 1;
        if (r) {
            d.popup()
        }
        //n.getNewMessage(0, d.newMessageStat)
    };
    d.bodyclick = function (e) {
        if (!f) {
            return true
        }
        var t = e.target;
        if (!$.contains(f.get(0), t) && $(t).parents(".qz_dialog_layer").size() < 1 && $(t).parents(".layer-container").size() < 1) {
            d.removePopup()
        }
    };
    d.newMessageStat = function (e) {
        var t = "hide", n = $("#_js_newmsg");
        if (e.ret === 0 && e.data && e.data.conf && e.data.conf.totalnum > 0) {
            t = "show";
            var i = e.data.conf.totalnum > 99 ? 99 : e.data.conf.totalnum;
            if (i > 9) {
                n.addClass("mail-num2")
            } else {
                n.removeClass("mail-num2")
            }
            n.text(i);
            c.remove("messagenumber");
            if (i) {
                c.set("messagenumber", i)
            }
        }
        n[t]();
        if (t == "hide") {
            l.remove("newmsg")
        } else {
            l.set("newmsg")
        }
    };
    d.popup = function () {
        var e = $("#gMessageWrap"), t = e.find(".inner").eq(0);
        var i, a, r;
        try {
            clearTimeout(p);
            if (f) {
                $(f).remove();
                f = null
            }
        } catch (o) {
        }
        d.showPopup();
        i = n.getCurSel();
        a = i.status;
        r = i.cate;
        $("._js_status", f).val(a);
        n.getList(0, r, function (e) {
            d.showList(e, r);
            d.updateCat(r)
        });
        t.addClass("current")
    };
    d.removePopup = function () {
        var e = $("#gMessageWrap"), t = e.find(".inner").eq(0);
        t.removeClass("current");
        p = setTimeout(function () {
            $(f).remove();
            f = null
        }, 250)
    };
    d.showPopup = function (e) {
        var t = ['<div class="poparea  pop-xiaoxi">', '<div class="pop chlearfix" style="display:;">', '<div class="tpline">', '<div class="del-all" style="width:124px">', '<label class="none"><input class="checkbox" value="" type="checkbox">全选</label>', '<span class="btndel none"><a href="#">删除</a></span>', '<span class="message-set"><a href="' + s.genRealUrl("tool/notice") + '">消息设置</a><i class="icon ico-help" rel="message.setup"><i></i></i></span>', "</div>", '<ul class="typebtn" id="_wrapCate"></ul>', '<div class="chosen-model r" style="padding-top:10px"><select class="select _js_status" id="messageStatus"></select></div>', "</div>", '<ul class="list" id="__messageList"></ul>', '<div class="btline">', '<p class="tips"></p>', '<span id="_messagePager"></span>', "</div>", "</div>", "</div>"].join("");
        if (f) {
            return
        }
        var o;
        f = $(t);
        f.appendTo($("#gMessageWrap ._js_inner"));
        i.showLoading("__messageList", {minHeight: "60px"});
        $("#__messageList").on("click", "li", function (e) {
            var t = $(e.currentTarget), n = $(e.target), i, a;
            a = t.attr("rel");
            if (n.hasClass("_del")) {
                a = n.attr("rel");
                d.del(a);
                return false
            }
            i = t.find("._js_ext");
            if (i.size() > 0 && $.contains(i.get(0), n.get(0))) {
                var r = n.prop("tagName"), o = n.attr("href");
                if (r.toLowerCase() == "a" && o) {
                    return d.dealMessageLink(o)
                }
                return
            }
            d.read(a);
            return false
        });
        $("#_wrapCate").on("click", "a", function (e) {
            var t = $(e.currentTarget), i;
            i = t.attr("rel");
            n.getList(0, i, function (e) {
                d.showList(e, i);
                d.updateCat(i)
            });
            return false
        });
        o = $("._js_status", f);
        a.initMapSelect(o[0], u, null, {noempty: true});
        o.on("change", function () {
            var e = $(this).val();
            n.changeStatus(e, d.showList)
        });
        r.showChosenSelect("#messageStatus", {width: "70px"})
    };
    d.dealMessageLink = function (e) {
        var n = e.match(/gdtpath=orderdetail&oid=(\d+)/), i, a;
        if (n && n[1]) {
            i = n[1];
            a = t.ENV.ROOT + "order/edit?oid=" + i;
            o.sideslide(a, {iframe: true});
            return false
        }
    };
    d.updateCat = function (e) {
        var t = ["全部", "系统消息", "审核消息", "账户消息", "财务消息"], n = [], i;
        i = t.length;
        $.each(t, function (t, a) {
            n.push('<li class="' + (t == i - 1 ? "last" : "") + '""><a href="javascript:;" class="tablink ' + (t != e ? "" : "tablink-on disable") + '" rel="' + t + '" style="' + (t != e ? "cursor:pointer" : "") + '">' + a + "</a></li>")
        });
        $("#_wrapCate").html(n.join(""))
    };
    d._tpl_messageList = ["<%var i=0,len=list.length;if(len<1){%>", "<li><label>无消息</label></li>", "<%}%>", "<%for(;i<len;i++){var row=list[i];%>", '<li class="_read <%=row.status==2? \'\':\'enread\'%>" rel="<%=row.msgid%>" id="_msgrow_<%=row.msgid%>">', "<label>", "<i class=\"icon <%=row.status==2? 'ico-xiaoxi-ed':'ico-xiaoxi' %> _js_icon\" rel=\"<%=row.msgid%>\"><i></i></i>", '<span class="info"><%=row.catename%></span>', '<span class="stit"><%=row.title%></span>', '<span class="time"><%=row.date%></span>', "</label>", '<div class="information none _js_ext" id="_content_<%=row.msgid%>" style="cursor: default;">', "<%=QZFL.string.restHTML(row.content)%>", '<p class="xiugai"><a href="javascript:;" class="_del" rel="<%=row.msgid%>">删除</a></p>', "</div>", "</li>", "<%}%>"].join("");
    d.showList = function (t) {
        var r = $("#__messageList");
        i.hideLoading("__messageList");
        if (t.ret === 0) {
            var o = t.data;
            r.html(e.tmpl(d._tpl_messageList, o));
            $("li", r).bind("mouseover", function () {
                !$(this).hasClass("extend") && $(this).addClass("hover")
            }).bind("mouseout", function () {
                !$(this).hasClass("extend") && $(this).removeClass("hover")
            });
            o.conf.simpleStyle = true;
            o.conf.pageNav = true;
            o.conf.arrow = true;
            o.conf.jumpPageFn = function (e) {
                n.getList(e, null, function (e) {
                    d.showList(e)
                })
            };
            a.pager("_messagePager", o.conf)
        } else {
            r.html('<li><label>获取消息列表失败，点击<a href="javascript:;">重试</a></label></li>').off("click").on("click", "a", function () {
                n.getList();
                return false
            })
        }
    };
    d.read = function (e) {
        var t = "_content_" + e, i = $("#" + t), a;
        $("li ._js_ext[id!=" + t + "]").addClass("none");
        i.toggleClass("none");
        if (!i.hasClass("none")) {
            a = n.getMsgDataById(e);
            if (a && a.status == 1) {
                n.read(e, function () {
                    d.setread(e);
                    n.getNewMessage(null, d.newMessageStat)
                })
            }
        }
    };
    d.setread = function (e) {
        var t = "_msgrow_" + e, n;
        n = $("#" + t);
        n.removeClass("enread");
        $("._js_icon", n).removeClass("ico-xiaoxi").addClass("ico-xiaoxi-ed")
    };
    d.del = function (e) {
        a.simpleConfirm("确认删除", "<strong>您确认删除此消息吗？</strong>", function () {
            n.deleMsgById(e, function () {
                a.showMsgbox("删除成功", 4);
                n.getList(0, null, d.showList)
            }, function (e) {
                e = e || {};
                a.showMsgbox(e.msg || "删除消息失败，请稍后再试")
            })
        })
    };
    d.acceptService = function (e) {
        a.simpleConfirm("邀请确认", "<strong>您确认接受邀请吗？</strong>", function () {
            n.acceptService(e, function (e) {
                a.showMsgbox("接受邀请成功", 4);
                n.getList(0, null, d.showList)
            }, function (e) {
                e = e || {};
                a.showMsgbox(e.msg || "接受邀请失败，请稍候再试")
            })
        })
    };
    GDT.viewMessage = d;
    return d
});
define("js/modules/accountstat", ["require", "exports", "jquery", "utils", "aduser", "js/services/user", "js/services/account", "js/modules/account", "js/modules/common", "js/modules/route", "js/modules/atlasdomflag"], function (require, e) {
    "use strict";
    var $ = require("jquery"), t = require("utils"), n = require("aduser"), i = require("js/services/user"), a = require("js/services/account"), r = require("js/modules/account"), o = require("js/modules/common"), s = require("js/modules/route"), l = require("js/modules/atlasdomflag");
    e.init = function () {
        var n = $("#gAccountWrap"), i = $("#showAccountStat"), r;
        i.on("click", function () {
            if (n.hasClass("current")) {
                e.popup(false)
            } else {
                e.popup(true)
            }
        });
        $(document.body).bind("click.hideAccountStat", function (t) {
            var n = t.target;
            if ($(n).parents("#gAccountWrap, .edit-price").length === 0) {
                e.popup(false)
            }
        });
        (function () {
            var t = function () {
                if (document.activeElement && document.activeElement.tagName == "IFRAME") {
                    e.popup(false)
                }
                setTimeout(t, 500)
            };
            t()
        })();
        if (i.size() > 0) {
            $('<div id="gAccountStat" class="poparea pop-zhanghu"></div>').appendTo($("#gAccountWrap"))
        }
        r = t.URIParams.get("search", "finance") == 1;
        if (r) {
            e.popup(true)
        }
        e._accountloading = true;
        //a.getDashboard(function (t) {
        //    var n = t.data || {};
        //    e._accountloading = false;
        //    if (t.ret == 0) {
        //        n = a.parseData(t.data);
        //        e.accountLoaded(n);
        //        e.showTips(n)
        //    }
        //})
    };
    e.accountLoaded = function (t) {
        var i = $("#gAccountWrap ._js_accountmsg");
        e._accountloading = false;
        if ((!a.isAmountEnough(t) || a.isNearLimit(t)) && n.status == 1) {
            i.removeClass("none");
            l.set("accountmsg")
        } else {
            i.addClass("none");
            l.remove("accountmsg")
        }
        e._accountLoaded = true;
        e._accountdata = t;
        e.renderAccount(t)
    };
    e.popup = function (t) {
        if (e._accountLoaded || e._accountloading) {
            e.showPopup(t)
        } else {
            e._accountloading = true
        }
    };
    var c = ['<div class="virtual">', "<h3><%=virtualAccount.account_name%></h3>", '<p><span class="c-red"><%=virtualAccount.balance%></span>元</p>', "</div>"].join(""), u = '<p id="_daybudget">日限额<span id="_ori_daybudget" class="_account_daybudget"></span>元/天 <i class="icon ico-edit" opt="daybudget"><i></i></i></p>';
    e._tpl_myaccount = ['<div class="pop clearfix">', '<div class="tips-normal none _s_accountAlert"></div>', '<div class="zhanghu-num clearfix">', '<div class="cash">', "<h3><%=cashAccount.account_name%></h3>", '<p><span class="c-red"><%=cashAccount.balance%></span>元</p>', '<p class="none" id="chargeCnt"><a class="btn-recharge" href="ACCOUNT_INFO_URL" data-hottag="atlas.chargeentry.topbar">充值</a></p>', "</div>", r.isYYBKAAduser() ? "" : c, '<div class="cost">', '<h3>今日消耗<span class="cft-attention c-tx3">（实时消耗）</span></h3>', '<p><span class="c-red"><%=daily_cost%></span>元</p>', u, "</div>", "</div>", "</div>"].join("").replace("ACCOUNT_INFO_URL", s.genRealUrl("account/info"));
    e._accountLoaded = false;
    e._accountdata;
    e._accountloading = false;
    var d;
    e.showPopup = function (e) {
        var t = $("#gAccountWrap");
        if (d == e) {
            return
        }
        d = e;
        if (e) {
            t.addClass("current")
        } else {
            t.removeClass("current")
        }
    };
    e.bodyclick = function (t) {
        var n = t.target;
        if (!$.contains($("#gAccountStat").get(0), n) && $(n).parents(".edit-price").size() < 1 || $("#gAccountStat").get(0) == n) {
            e.showPopup(false)
        }
    };
    e.showDaybudget = function (n) {
        n = n || e._accountdata.day_budget;
        var i = '日限额<span id="_ori_daybudget" class="_account_daybudget"><%=day_budget%></span>元/天 <i class="icon ico-edit" opt="daybudget"><i></i></i>';
        var r = '<i class="icon ico-warning"><i></i></i>已达<span id="_ori_daybudget" class="_account_daybudget"><%=day_budget%></span>元日限额<i class="icon ico-edit" opt="daybudget"><i></i></i>';
        var o = i, s = "removeClass";
        $.extend(e._accountdata, {day_budget: n});
        if (a.didReachLimit(e._accountdata)) {
            o = r;
            s = "addClass"
        }
        $("#_daybudget").html(t.tmpl(o, e._accountdata));
        $("#_daybudget")[s]("c-red")
    };
    e.showCPDDaybudget = function (n) {
        n = n || e._accountdata.cpd_day_budget;
        var i = 'CPD日限额<span id="_ori_daybudget" class="_account_daybudget"><%=cpd_day_budget%></span>元/天 <i class="icon ico-edit" opt="daybudget"><i></i></i>';
        var r = '<i class="icon ico-warning"><i></i></i>已达<span id="_ori_daybudget" class="_account_daybudget"><%=cpd_day_budget%></span>元CPD日限额<i class="icon ico-edit" opt="daybudget"><i></i></i>';
        var o = i, s = "removeClass";
        $.extend(e._accountdata, {cpd_day_budget: n});
        if (a.didReachLimit(e._accountdata)) {
            o = r;
            s = "addClass"
        }
        $("#_daybudget").html(t.tmpl(o, e._accountdata));
        $("#_daybudget")[s]("c-red")
    };
    e.showAccountNumbers = function (i) {
        var o = $("#gAccountStat");
        i = i || e._accountdata;
        e._accountdata = i;
        o.html(t.tmpl(e._tpl_myaccount, i));
        r.isYYBKAAduser() ? e.showCPDDaybudget() : e.showDaybudget();
        if (r.canCharge() && !r.isPrepareStatus()) {
            $("#chargeCnt").removeClass("none")
        }
        var s = [];
        if (!a.isAmountEnough(i) && n.status == 1) {
            s.push('<p>您的账户<strong class="c-red">余额不足</strong>，为保证广告投放，请尽快充值</p>')
        }
        if (a.didReachLimit(i)) {
            s.push('<p>您账户今日的消耗<strong class="c-red">已到达日限额</strong>，推广计划和广告已暂停</p>');
            $(".cost", o).addClass("cost-limit")
        } else if (a.isNearLimit(i)) {
            s.push('<p>您账户今日的消耗<strong class="c-red">已接近日限额</strong>，为不影响广告投放，请及时上调日限额</p>')
        }
        if (s.length > 0) {
            $("._s_accountAlert", o).html(s.join(" ")).removeClass("none")
        }
        r.isYYBKAAduser() ? e.bindSetDaybudget("_daybudget", "", "setCPADaybudget", false) : e.bindSetDaybudget("gAccountStat")
    };
    e.resetAccountInfo = function (n) {
        var i = $("#gAccountStat");
        n = n || e._accountdata;
        e._accountdata = n;
        i.html(t.tmpl(e._tpl_myaccount, n))
    };
    e.bindSetDaybudget = function (t, n, r, s) {
        r = r || "setDaybudget";
        if (typeof s == "undefined") {
            s = true
        }
        n = n || "_account_daybudget";
        t = t || "_daybudget";
        $("#" + t).off("click", "[opt=daybudget]").on("click", "[opt=daybudget]", function (l) {
            var c = function (i) {
                i = o.revertFormatNumber(i) + "";
                if (isNaN(i) || parseInt(i, 10).toString().length != i.length) {
                    o.showMsgbox("请输入合法的日限额");
                    return false
                }
                if (i == o.revertFormatNumber(f)) {
                    return
                }
                if (a[r]) {
                    a[r](function (i) {
                        if (i.ret === 0) {
                            $.extend(e._accountdata, {daybudget: i.data.budget});
                            e.showAccountNumbers();
                            o.showMsgbox("修改限额成功", 4);
                            i.data.budget && $("#" + t + " ." + n).html(i.data.budget);
                            $(p).remove()
                        } else {
                            o.showMsgbox(i.msg || "设置日限额失败");
                            return false
                        }
                    }, {
                        data: {daybudget: i}, error: function () {
                            o.showMsgbox("设置日限额失败")
                        }
                    })
                }
                return false
            };
            var u = function (e) {
                var t = e.target;
                if (!p) {
                    $(document.body).unbind("click", u);
                    return
                }
                if (!$.contains(p, t)) {
                    $(p).remove();
                    p = null;
                    $(document.body).unbind("click", u)
                }
            };
            var d = function (e) {
                $(e).css("zIndex", 1003);
                $(document.body).bind("click", u);
                if (s) {
                    i.getQuotaLimit(function (t) {
                        var n;
                        var i = [];
                        if (t.ret === 0) {
                            n = t.data;
                            n.budgeteditlimit = parseInt(n.budgeteditlimit, 10);
                            n.budgeteditused = parseInt(n.budgeteditused, 10);
                            if (n.budgeteditused / n.budgeteditlimit >= .8) {
                                i.push("消费限额每天最多修改" + n.budgeteditlimit + "次");
                                i.push("当前已修改<strong>" + n.budgeteditused + "</strong>次")
                            }
                            if (n.budgetovercost) {
                                i.push("最低额度是账户的今日消耗加上" + n.budgetovercost + "元。")
                            }
                            $("._tip", e).html(i.join("，"))
                        }
                    })
                }
            };
            var f = $("#" + t + " ." + n).html(), p;
            var m = ['<div class="edit-price" style="top:0;left:0px; width:220px;">', '<div class="txt">', '<p class="form-inline"><input type="text" class="_val form-control" value="' + f + '"><span class="c-tx3">元/天</span></p>', '<p class="c-tx3 _tip"></p>', "</div>", '<div class="s-btnline">', '<a href="javascript:void(0)" class="queding s-button-right _ok">确定</a>', '<a href="javascript:void(0)" class="quxiao s-button-back _cancel">取消</a>', "</div>", "</div>"].join("");
            p = o.modifier.layer(l.target, m);
            $("._ok", p).bind("click", function () {
                var e;
                e = c($("._val", p).val(), p);
                e !== false && $(p).remove() && (p = null)
            });
            $("._cancel", p).bind("click", function () {
                $(p).remove();
                p = null;
                return false
            });
            d(p);
            return false
        })
    }, e.renderAccount = function (t) {
        e._accountdata = t;
        e.showAccountNumbers()
    };
    e.getReginfo = function (e, t) {
        i.getRegistInfo(e, {error: t})
    };
    e.showTips = function (i) {
        var r = $("#headerAccountInfoErrorStatusTips"), o = $("#ErrorStatusTipsHolder"), s = o.height(), c = n, u = [], d = "indexHiddenTips_" + c.aduid, f = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"], p = (new Date).getDate(), m, g = location.pathname || "", h = false;
        if (g.indexOf("/tool/profile") > -1) {
            h = true
        }
        var v = function (e) {
            var e = e || "";
            r.removeClass("none");
            o.removeClass("none");
            l.set("errorstatustips");
            $("#main").height($("#main").height() + s);
            $("#root").addClass("width-account-tips");
            $(window).trigger("resize");
            for (var t = 0, n = f.length; t < n; t++) {
                l.remove(f[t])
            }
            l.set(e)
        }, _ = function () {
            r.addClass("none");
            o.addClass("none");
            l.remove("errorstatustips");
            $("#main").height($("#main").height() + s);
            $("#root").removeClass("width-account-tips");
            $(window).trigger("resize");
            for (var e = 0, t = f.length; e < t; e++) {
                l.remove(f[e])
            }
        };
        r.on("click", "a.close", function () {
            var e = this.getAttribute("data-msgtype"), n;
            n = t.storage.get(d, "local") || {};
            n[e] = p;
            t.storage.set(d, n, {media: "local", expire: 1728e5});
            _()
        });
        e.getReginfo(function (e) {
            m = t.storage.get(d, "local") || {};
            if (m[f[0]] != p && e && e.ret == 0 && e.data.status == 19) {
                u.push(f[0])
            }
            if (m[f[5]] != p && e && e.ret == 0 && e.data.status == 2) {
                if (c.identity_padding_tag == 2) {
                    if (e.data.customer_registration_type == 3) {
                        u.push(f[7])
                    } else {
                        u.push(f[6])
                    }
                } else {
                    u.push(f[5])
                }
            }
            if (m[f[1]] != p && c && c.status == "3") {
                u.push(f[1])
            }
            if (!i.remain_r) {
                i.remain_r = i.remain || 0
            }
            if (m[f[2]] != p && !a.isAmountEnough(i) && e && e.ret == 0 && e.data.status == 1) {
                u.push(f[2])
            }
            if (m[f[3]] != p && a.didReachLimit(i)) {
                u.push(f[3])
            } else if (m[f[4]] != p && a.isNearLimit(i)) {
                u.push(f[4])
            }
            if (u.length === 0) {
                _();
                return
            }
            if (h && $.inArray(u[0], [f[0], f[1], f[5], f[6], f[7]]) > -1) {
                _();
                return
            }
            r.find("p").addClass("none").parent().find("p." + u[0]).removeClass("none");
            v(u[0])
        })
    }
});
define("js/modules/common", ["require", "jquery", "utils", "js/config/env", "js/config/report", "QZFL", "verMap", "aduser", "js/modules/report", "js/modules/uuid", "spa.monitor", "js/modules/jquery.plugin"], function (require) {
    "use strict";
    var $ = require("jquery"), util = require("utils"), ENV = require("js/config/env"), confReport = require("js/config/report"), QZFL = require("QZFL"), verMap = require("verMap"), adUser = require("aduser"), modReport = require("js/modules/report"), modUuid = require("js/modules/uuid"), SPAMonitor = require("spa.monitor");
    var _nodeCache = {}, _crid;
    require("js/modules/jquery.plugin");
    var comm = {
        adjustSize: function (e, t, n) {
            e.onload = null;
            if (t <= 0 || n <= 0) {
                return
            }
            comm.scaleImage(e, t, n)
        },
        _imglist: [],
        scaleImage: function (e, t, n) {
            var i = $(e).get(0);
            if (!i || i.src == "javascript:;") {
                util.log("warn: scaleImage: element not found");
                return false
            }
            var a = comm._imglist, r = a.length;
            a[r] = new Image;
            a[r].onload = function (e, t, n, i, a) {
                return function () {
                    var r = e[t];
                    r.onload = null;
                    var o = comm.scaleSize([r.width, r.height], [i, a]);
                    n.style.width = o[0] + "px";
                    n.style.height = o[1] + "px";
                    e[t] = null;
                    delete e[t]
                }
            }(a, r, i, t, n);
            a[r].src = i.src
        },
        scaleSize: function (e, t) {
            var n = e[0], i = e[1], a = t[0], r = t[1], o, s;
            if (n / i > a / r) {
                if (n > a) {
                    o = a;
                    s = a * (i / n)
                } else {
                    o = n;
                    s = i
                }
            } else {
                if (i > r) {
                    s = r;
                    o = r * (n / i)
                } else {
                    o = n;
                    s = i
                }
            }
            return [o, s]
        },
        fixImgSize: function (e, t, n, i) {
            e.onload = null;
            if (t <= 0 || n <= 0) {
                return
            }
            var a = new Image;
            a.src = e.src;
            var r = a.width, o = a.height, s = false;
            if (r / o > t / n) {
                e.style.width = t + "px";
                e.style.height = t * (o / r) + "px";
                s = true
            } else {
                e.style.height = n + "px";
                e.style.width = n * (r / o) + "px";
                s = true
            }
            if (i && s) {
                e.style.cursor = "pointer";
                e.title = "点击预览原图";
                e.onclick = function () {
                    window.open(e.src)
                }
            }
        },
        calposion: function (e, t) {
            $(t).unbind("click");
            $(t).on("click", function (n) {
                comm.setCalendarPos($(t), e, n)
            });
            $(t).on("keydown", function (n) {
                var i = n.which;
                if (i == QZFL.event.KEYS.DELETE || i == QZFL.event.KEYS.BACKSPACE) {
                    $(t).value = "";
                    e.hide()
                }
                n.preventDefault()
            })
        },
        setCalendarPos: function (e, t) {
            var n = t;
            e = $(e);
            var i = e.position();
            var a = n._self;
            a.style.left = i.left + "px";
            a.style.top = i.top + e.height() + 10 + "px";
            a.style.zIndex = 10
        },
        hashManage: function () {
            var e = o(), t = s();

            function n(e, n) {
                t[e] = n;
                r()
            }

            function i(e) {
                t = s();
                var n = t;
                if (e) {
                    n = t[e] || ""
                }
                return n
            }

            function a(e) {
                t[e] = null;
                r()
            }

            function r() {
                var n = [];
                for (var i in t) {
                    if (!i || t[i] === null) {
                        continue
                    }
                    n.push(i + "=" + t[i])
                }
                location.href = e + "#" + n.join("&")
            }

            function o(e) {
                var t = e || location.href, n = t.indexOf("#");
                return t.substring(0, n >= 0 ? n : t.length)
            }

            function s() {
                var e = {}, t = location.hash.substring(1).split("&"), n, i;
                for (n in t) {
                    i = t[n].split("=");
                    if (i.length) {
                        e[i[0]] = i.slice(1).join("=")
                    }
                }
                return e
            }

            function l(e, t) {
                var n = {};
                var a = Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
                var r = a == "array" ? t : [t];
                for (var o = 0, s = r.length; o < s; o++) {
                    var l = r[o];
                    n[l] = i(l)
                }
                var c = function () {
                    var t = false;
                    for (var a in n) {
                        var r = n[a];
                        var o = i(a);
                        if (o != r) {
                            n[a] = o;
                            t = true
                        }
                    }
                    if (t) {
                        e()
                    }
                };
                if ("onhashchange"in window && (!document.documentMode || document.documentMode > 7)) {
                    window.onhashchange = c
                } else {
                    setInterval(c, 100)
                }
            }

            return {setHash: n, getHash: i, delHash: a, onhashchange: l}
        }(),
        FuncQueue: function () {
            function e() {
                this.queue = [];
                this.cbbuff = {};
                this.curNum = 0;
                this.callnum = 0;
                this.cn = 0
            }

            e.prototype.add = function () {
                var e = Array.prototype.slice.call(arguments);
                this.queue.push(e)
            };
            e.prototype._execCallback = function (e, t, n) {
                var i = this;
                i.cbbuff[e] = [t, n];
                if (e == i.curNum) {
                    while (i.curNum < i.callnum) {
                        if (i.cbbuff[i.curNum]) {
                            var a = i.cbbuff[i.curNum];
                            a[1].apply(null, a[0]);
                            delete i.cbbuff[i.curNum];
                            i.curNum++
                        } else {
                            break
                        }
                    }
                }
            };
            e.prototype.exec = function () {
                var e = this;
                e.callnum += e.queue.length;
                while (e.queue.length > 0) {
                    var t = e.queue.shift();
                    if (!t[1]) {
                        var n = function () {
                        };
                        t[0]();
                        e._execCallback(e.cn, [], n)
                    } else {
                        var i = function (t, n) {
                            return function () {
                                var i = Array.prototype.slice.call(arguments);
                                e._execCallback(t, i, n)
                            }
                        }(e.cn, t[1]);
                        t[0](i)
                    }
                    e.cn++
                }
            };
            return e
        }(),
        setNameFieldValue: function (e, t) {
            var n, i;
            $.each(e, function (e, a) {
                if ($.isArray(a)) {
                    n = typeof a[1] == "undefined" ? a[0] : a[1];
                    i = a[0]
                } else {
                    n = i = a
                }
                var r = $("[name=" + i + "]").attr("type");
                if (r == "radio") {
                    $("[name=" + i + "]").each(function (e, i) {
                        i.checked = t[n] + "" == i.value
                    })
                } else {
                    var o = t[n];
                    comm.setMultiCheck($("[name=" + i + "]"), o)
                }
            })
        },
        setMultiCheck: function (e, t) {
            t = parseInt(t, 10);
            e.each(function (e, n) {
                var i = parseInt($(n).val(), 10);
                n.checked = !!(i & t)
            })
        },
        clearSelect: function (e) {
            var t = $(e);
            if (t === undefined || t.tagName.toUpperCase() != "SELECT") {
                return false
            }
            for (var n = t.options.length; n >= 0; n--) {
                t.options[n] = null
            }
            return true
        },
        addSelectItem: function (e, t, n, i) {
            var a;
            a = $.type(e) == "string" ? $("#" + e)[0] : $(e)[0];
            if (a === undefined || a.tagName.toUpperCase() != "SELECT") {
                return false
            }
            i = i || false;
            var r = new Option(t, n, false, false);
            a.options[a.options.length] = r;
            r.selected = i;
            return true
        },
        mapToArrList: function (e) {
            var t = [];
            for (var n in e) {
                var i = {id: n, name: e[n]};
                t.push(i)
            }
            return t
        },
        initMapSelect: function (e, t, n, i) {
            var a = comm.mapToArrList(t);
            i = i || {};
            if (!i.noempty) {
                a.unshift({id: "", name: "请选择"})
            }
            comm.initselect(e, a, "id", "name", n, i)
        },
        initselect: function (e, t, n, i, a, r) {
            r = r || {};
            if ($.type(t) == "array") {
                $.each(t, function (t, o) {
                    var s = typeof a != "undefined" && o[n] == a ? true : false;
                    comm.addSelectItem(e, o[i], o[n], s, r)
                })
            } else {
                $.each(t, function (t, n) {
                    var i = a && n == a ? true : false;
                    comm.addSelectItem(e, n, t, i, r)
                })
            }
        },
        getParameter: function (e, t) {
            var n = new RegExp("(\\?|#|&)" + e + "=([^&#]*)(&|#|$)");
            var i = location.href.match(n);
            if ((!i || i == "") && !t) {
                i = top.location.href.match(n)
            }
            return !i ? "" : i[2]
        },
        setRadioAsso: function (e, t, n, i) {
            var a = function (e) {
                var a = e.target;
                var r = a.checked === true;
                var o = a.value;
                var s = false;
                if (r && $.inArray(o, t) >= 0) {
                    if (n) {
                        $(n).style.display = ""
                    }
                    s = true
                } else {
                    if (n) {
                        $(n).style.display = "none"
                    }
                }
                if (i) {
                    i(s)
                }
            };
            var r = document.getElementsByName(e);
            for (var o = 0, s = r.length; o < s; o++) {
                var l = r[o];
                $(l).on("click", a)
            }
        },
        radioSeachClick: function (e) {
            var t = document.getElementsByName(e);
            for (var n = 0, i = t.length; n < i; n++) {
                var a = t[n];
                if (a.checked) {
                    a.click()
                }
            }
        },
        selectAsso: function () {
            function e(t, n, i, a) {
                var r = function () {
                    var e = $("#" + t).elements[0].value;
                    var r = $.inArray(e, n) >= 0;
                    if (i) {
                        if (r) {
                            $("#" + i).hide()
                        } else {
                            $("#" + i).show()
                        }
                    }
                    if (a) {
                        a(!r)
                    }
                };
                e.flist[t] = e.flist[t] || [];
                e.flist[t].push(r);
                $("#" + t).bind("change", r)
            }

            e.flist = {};
            e.fireAsso = function (t) {
                var n = e.flist[t];
                if (n) {
                    $.each(n, function (e, t) {
                        t()
                    })
                }
            };
            return e
        }(),
        goPage: function (curPage, enterPage, totalPage, linkFormat) {
            var re = new RegExp("^\\s*[1-9]\\d*\\s*$");
            if (!re.test(enterPage)) {
                alert("输入页码必须为正整数");
                return false
            }
            enterPage = parseInt(enterPage, 10);
            if (enterPage > totalPage || enterPage <= 0) {
                alert("输入页码范围不正确");
                return false
            }
            if (curPage == enterPage) {
                return false
            }
            var reg = new RegExp("{no}", "g");
            linkFormat = linkFormat.replace(reg, enterPage);
            if (linkFormat.indexOf("javascript") != -1) {
                var sFun = linkFormat.split(":");
                if (sFun.length > 0) {
                    eval(sFun[1])
                }
                return
            } else {
                location.href = linkFormat;
                return
            }
        },
        showPageList: function (e, t, n, i, a, r, o) {
            e = Number(e);
            o = o || 5;
            var s = {};
            var l = $.each;
            typeof r === "object" && (s = r, r = "");
            if (e < 1 || t <= 1 || e > t)return "";
            if (!a) {
                a = {};
                a.textClass = "pg_having";
                a.preClass = "";
                a.nextClass = "";
                a.curPageClass = "hit";
                a.otherPageClass = "";
                a.jumpClass = "page_form";
                a.inputClass = "text-input";
                a.pageClass = "page_page";
                a.submitClass = "bt_submit"
            }
            if (!r)r = " ";
            var c = [];
            var u = e > 1 ? e - 1 : 1;
            var d = e < t ? e + 1 : t;
            var f = new RegExp("{no}", "g");
            var p;
            var m;
            if (!s.arrow) {
                c.push('<div class="inner">')
            }
            if (s.changePagesize) {
                p = i.replace(f, 1).replace("javascript:", "");
                var g = ENV.sizemap || {}, h = [];
                l(g, function (e, t) {
                    h.push('<option value="' + e + '"' + (n == e ? ' selected="selected"' : "") + ">" + t + "</option>")
                });
                c.push('<label><span class="txt">每页显示条数</span><select onchange="' + p.replace("{pagesize}", "this.value") + '" class="_setPageSizeSeletor">' + h.join("") + "</select></label> ");
                i = i.replace(",{pagesize}", "")
            }
            if (!s.arrow) {
            }
            if (a !== true) {
                if (1 == e) {
                    c[c.length] = '<span class="current">上一页</span>'
                } else {
                    p = i.replace(f, u);
                    c[c.length] = '<a href="' + p + '" title="上一页" class="c_tx">上一页</a>'
                }
                var v = false;
                var _ = false;
                var y = false;
                var b = false;
                if (t <= o) {
                    var w = 1;
                    var A = t
                } else {
                    var T = parseInt((o - 2) / 2, 10);
                    w = e - T;
                    A = e + T;
                    if (w >= 3) {
                        v = true
                    }
                    if (w >= 2) {
                        y = true
                    }
                    if (A < t) {
                        b = true
                    }
                    if (A + 1 < t) {
                        _ = true
                    }
                    if (w <= 1) {
                        w = 1;
                        A = o - 1
                    }
                    if (A >= t) {
                        w = t - o + 2;
                        A = t
                    }
                }
                if (y) {
                    p = i.replace(f, 1);
                    if (1 == e) {
                        c[c.length] = '<span class="current">' + 1 + "</span>"
                    } else {
                        c[c.length] = '<a  title="' + m + '" href="' + p + '" class="c_tx">' + 1 + "</a>"
                    }
                }
                if (v) {
                    c[c.length] = '<span class="ellipsis">…</span>'
                }
                for (m = w; m <= A; m++) {
                    p = i.replace(f, m);
                    if (m == e) {
                        c[c.length] = '<span class="current">' + m + "</span>"
                    } else {
                        c[c.length] = '<a  title="' + m + '" href="' + p + '" class="c_tx">' + m + "</a>"
                    }
                }
                if (_) {
                    c[c.length] = '<span class="ellipsis">…</span>'
                }
                if (b) {
                    if (A != t) {
                        m = t;
                        p = i.replace(f, m);
                        if (m == e) {
                            c[c.length] = '<span class="current">' + m + "</span>"
                        } else {
                            c[c.length] = '<a  title="' + m + '" href="' + p + '" class="c_tx">' + m + "</a>"
                        }
                    }
                }
                if (t == e) {
                    c[c.length] = '<span class="current">下一页</span>'
                } else {
                    p = i.replace(f, d);
                    c[c.length] = '<a href="' + p + '" title="下一页" class="c_tx">下一页</a>'
                }
                c.push("</div")
            } else {
                if (!s.arrow) {
                    if (1 == e) {
                        c[c.length] = '<span class="current">上一页</span>'
                    } else {
                        c[c.length] = '<a href="' + i.replace(f, -1) + '" title="上一页" class="c_tx">上一页</a>'
                    }
                    if (s.pageNav) {
                        c[c.length] = '<span class="mod_pagenav_count">' + e + "/" + t + "</span>"
                    }
                    if (t == e) {
                        c[c.length] = '<span class="current">下一页</span>'
                    } else {
                        c[c.length] = '<a href="' + i.replace(f, 1) + '" title="下一页" class="c_tx">下一页</a>'
                    }
                } else {
                    c[c.length] = '<div class="mod-page-s"><div class="mod-page-inner">';
                    if (1 == e) {
                        c[c.length] = '<a href="javascript:;" class="before btn-before-disable"></a>'
                    } else {
                        c[c.length] = '<a href="' + i.replace(f, -1) + '" class="before"></a>'
                    }
                    if (s.pageNav) {
                        c[c.length] = '<span class="num"><span class="now">' + e + "</span>/" + t + "</span>"
                    }
                    if (t == e) {
                        c[c.length] = '<a href="javascript:;" class="after btn-after-disable"></a> <span></span>'
                    } else {
                        c[c.length] = '<a href="' + i.replace(f, 1) + '" class="after"></a>'
                    }
                    c[c.length] = "</div></div>"
                }
            }
            return c.join("")
        },
        getCheckgroupValue: function (e, t) {
            var n = 0;
            t = t || "checkbox";
            var i = e.substring(0, 1) == "#" ? e : "#" + e;
            $(i + " input:checked[type=" + t + "]").each(function (e, t) {
                n += parseInt(t.value, 10)
            });
            return n
        },
        setFrameHeight: function () {
            setTimeout(function () {
                var e = document.body.offsetWidth || document.documentElement.offsetWidth;
                var t = document.body.offsetHeight || document.documentElement.offsetHeight;
                QZFL.FP.resizePopupDialog(e, t)
            }, 300)
        },
        inputFocus: function (e, t) {
            if (e.setSelectionRange) {
                e.focus();
                e.setSelectionRange(t, t)
            } else if (e.createTextRange) {
                var n = e.createTextRange();
                n.collapse(true);
                n.moveEnd("character", t);
                n.moveStart("character", t);
                n.select()
            }
        },
        docClickEvent: function (e, t) {
            var n = function (i) {
                var a = i.target;
                if (a != $(e.id) && !$.contains($(e.id), a) && !(t && t(i))) {
                    e.unload();
                    $(document).off("click", n)
                }
            };
            setTimeout(function () {
                $(document).on("click", n)
            }, 100)
        },
        _dockeyup: null,
        docKeyupEvent: function (e) {
            var t = comm;
            if (t._dockeyup) {
                t._dockeyup = e;
                return
            }
            t._dockeyup = e;
            $(document).on("keyup", function (e) {
                if (e.which == 13) {
                    t._dockeyup()
                }
            })
        },
        inherit: function (e, t) {
            var n = function () {
                var n = Array.prototype.slice.call(arguments);
                this._super = e;
                t.apply(this, n)
            };
            $.extend(n.prototype, e.prototype);
            return n
        },
        getTime: function () {
            return ENV.servertime > 0 ? ENV.servertime * 1e3 : (new Date).getTime()
        },
        setTime: function (e) {
            ENV.servertime = e
        },
        showMsgbox: function () {
            var e = Array.prototype.slice.call(arguments);
            if (e.length < 3 || !e[2]) {
                e.length < 2 && (e[1] = 1);
                e[2] = 2e3
            }
            QZFL.widget.msgbox.show.apply(null, e)
        },
        hideMsgbox: QZFL.widget.msgbox.hide,
        showBubble: function (e, t, n) {
            var i = null, a;
            i = setTimeout(p, 100);
            $(e).bind("mouseout", function () {
                clearTimeout(i)
            });
            var r = $(document).scrollHeight;
            var o = $(e).position().top;
            var s = o / r > .5;
            var l = document.createElement("div");
            l.style.cssText = "position:absolute;padding:6px;bottom:7px;width:188px;" + "left:-5000px;line-height:20px;text-align: left;visibility:hidden;";
            var c = $(l);
            c.appendTo($("body"));
            c.html(t);
            var u = c.height();
            u = u || 100;
            c.remove();
            a = {
                id: null,
                x: -15,
                y: s ? -10 : 10,
                timeout: 5e3,
                height: u,
                width: 200,
                arrowEdge: s ? 3 : 1,
                arrowPoint: s ? 4 : 1,
                arrowType: 2,
                noCloseButton: true,
                onLoad: null
            };
            var d = parseInt($(e).offset().left + a.width) || 0, f = parseInt($(window).width()) || 0;
            if (d > f) {
                a.x = 15;
                a.arrowPoint = s ? 4 : 2
            }
            $.extend(a, n);
            navigator.appVersion.indexOf("MSIE") > -1 && (a.noShadow = true);
            function p() {
                var n;
                QZFL.widget.bubble.useTween = false;
                n = QZFL.widget.bubble.show(e, "", t, a);
                !a.onLoad && (a.onLoad = function (t) {
                    $(e).bind("mouseout", function () {
                        QZFL.widget.bubble.hide(t)
                    })
                });
                a.onLoad(n);
                a = null
            }
        },
        hideBubble: function (e) {
            QZFL.widget.bubble.hide(e)
        },
        parseUrl: function (e) {
            var t = e.length, n = e.indexOf("?"), i = e.indexOf("#"), a = "", r = "", o = {};
            n < 0 && (n = t);
            i < 0 && (i = t);
            n < t && (a = e.substring(n + 1, i));
            i < t && (r = e.substring(i + 1));
            if (a) {
                o.search = {};
                $.each(a.split("&"), function (e, t) {
                    var n = t.split("=");
                    o.search[n[0]] = n[1]
                })
            }
            if (r) {
                o.hash = {};
                $.each(r.split("&"), function (e, t) {
                    var n = t.split("=");
                    o.hash[n[0]] = n[1]
                })
            }
            return o
        },
        setCalender: function (e, t) {
            var n = QZFL.widget.calendar.bind(e, 0), i = {
                yearPattern: "-",
                monthPattern: "-",
                datePattern: "",
                connectString: ""
            };
            $.extend(n, i);
            if (typeof t === "function") {
                var a = n.onDateSelected;
                n.onDateSelected = function (e) {
                    a(e);
                    t.apply(n, [e])
                }
            }
            return n
        },
        getDomGetter: function (e) {
            var t;
            t = e ? function (t) {
                return $(t, e)
            } : $;
            return t
        },
        getFormData: function (e, t) {
            var n = {}, i, a = document;
            t = t || {};
            if (e.nodeType && e.nodeType == 1) {
                a = e
            } else if (typeof e === "string") {
                a = $(e)
            } else if ($.type(e) === "object" && $.isArray(e.elements)) {
                i = e
            }
            i = i || $("input, textarea, select", a);
            i.each(function (e, i) {
                var a = i.type == "checkbox" ? 1 : 0, r = i.type == "radio" ? 1 : 0, o = i.type == "file" ? 1 : 0, s = false, l = i.name || i.id || "", c = $.trim(i.value);
                if (i.disabled && !t.includeDisabled) {
                    return
                }
                if (l.substr(l.length - 2, 2) === "[]") {
                    l = l.slice(0, -2);
                    s = true
                }
                if (o) {
                    if (c) {
                        n._file = n._file || [];
                        n._file.push(i.id)
                    }
                } else {
                    if (a || r) {
                        c == "on" && (c = 1)
                    }
                    if (s) {
                        n[l] = n[l] || [];
                        if (!(r || a) || i.checked) {
                            n[l].push(c)
                        }
                    } else {
                        if (!(r || a) || i.checked) {
                            n[l] = c
                        }
                    }
                }
            });
            return n
        },
        replaceNode: function (e, t) {
            var n, i;
            if (e.nodeType !== 1) {
                return false
            }
            e.style.display = "none";
            do {
                i = Math.ceil(Math.random() * 100)
            } while (typeof _nodeCache[i] !== "undefined");
            n = document.createElement("span");
            n.id = "_GDT_REPLACE_NODE_" + i;
            n.className = "fn_editbox";
            n.innerHTML = t;
            e.parentNode.insertBefore(n, e);
            _nodeCache[i] = e;
            _crid = i;
            return i
        },
        restoreNode: function (e) {
            typeof e === "undefined" && (e = _crid);
            $("#_GDT_REPLACE_NODE_" + e).remove();
            _nodeCache[e].style.display = "";
            delete _nodeCache[e];
            _nodeCache[e] = null
        },
        pager: function (e, t) {
            var n = {
                page: 1,
                totalpage: 1,
                pagesize: 10,
                changePagesize: false,
                simpleStyle: false,
                hideSecondCount: false,
                hideJump: false,
                useOnclick: false
            }, i = null, a, r, o;
            $.extend(n, t);
            n.simpleStyle && (i = true);
            r = "goPageFn" + $.now();
            window[r] = function (e, t) {
                n.jumpPageFn = $.isFunction(n.jumpPageFn) ? n.jumpPageFn : $.noop;
                if (typeof t == "undefined" && n.changePagesize) {
                    t = o.find("select._setPageSizeSeletor").val()
                }
                n.jumpPageFn(e, t)
            };
            if (typeof e == "string") {
                o = $("#" + e)
            } else {
                o = $(e)
            }
            if (n.useOnclick) {
                a = 'javascript:;" onclick="' + r + (n.changePagesize ? "({no},{pagesize});" : "({no});") + "return false;"
            } else {
                a = "javascript:" + r + (n.changePagesize ? "({no},{pagesize})" : "({no})")
            }
            if (o) {
                if (n.totalpage > 1) {
                    o.html(comm.showPageList(n.page, n.totalpage, n.pagesize, a, i, {
                        changePagesize: n.changePagesize,
                        pageNav: n.pageNav,
                        arrow: n.arrow,
                        hideSecondCount: n.hideSecondCount,
                        hideJump: n.hideJump
                    }, 8)).show()
                } else {
                    o.empty().hide()
                }
            }
        },
        timeFilter: function (e, t, n) {
            var i = QZFL.string.timeFormatString(comm.getTime(), "{Y}-{M}-{d}");
            n = n || {};
            util.log("time filter", e, t, n);
            if (n.both && (!e || !t)) {
                comm.showMsgbox("请选择完整的查询时间段", 5);
                return false
            }
            if (e && t && e > t) {
                comm.showMsgbox("查询的开始时间必须早于结束时间", 5);
                return false
            }
            if (n.futureEnable) {
            } else if (n.todayInclude && (e > i || t > i)) {
                comm.showMsgbox("只能查询今天及今天之前的数据", 5);
                return false
            } else if (!n.todayInclude && (e >= i || t >= i)) {
                comm.showMsgbox("只能查询今天之前的数据", 5);
                return false
            }
            if (n.include2Year) {
                if (e < QZFL.string.timeFormatString(comm.getTime() - 63072e6, "{Y}-{M}-{d}")) {
                    comm.showMsgbox("抱歉，只提供最近两年内的数据", 5);
                    return false
                }
            } else {
                if (!n.rangeWithin90days) {
                    if (e < QZFL.string.timeFormatString(comm.getTime() - 76896e5, "{Y}-{M}-{d}")) {
                        comm.showMsgbox("抱歉，只提供最近90天的数据", 5);
                        return false
                    }
                } else {
                    if (Math.abs(new Date(t.replace(/-/g, "/")) - new Date(e.replace(/-/g, "/"))) > 76896e5) {
                        comm.showMsgbox("抱歉，一次查询时间段最长为90天", 5);
                        return false
                    }
                }
            }
            return true
        },
        timeFilterWithAutocorrect: function (e, t, n) {
            function i(e, t) {
                var n = new RegExp("W?" + t + "W?");
                return n.test(e)
            }

            var a = QZFL.string.timeFormatString(comm.getTime(), "{Y}-{M}-{d}");
            var r = {rangeWithin90days: QZFL.string.timeFormatString(comm.getTime() - 76896e5, "{Y}-{M}-{d}")};
            var o = null;
            $.each(r, function (t, n) {
                if (i(e, t)) {
                    o = n
                }
            });
            var s = a;
            if (!i(e, "includeToday")) {
                s = QZFL.string.timeFormatString(comm.getTime() - 60 * 60 * 24 * 1e3, "{Y}-{M}-{d}")
            }
            util.log("hasit", i(e, "includeToday"), s, n);
            var l = false;
            if (t > n) {
                l = true;
                t = n
            }
            if (t < o) {
                l = true;
                t = o
            }
            if (n < o) {
                l = true;
                n = o
            }
            if (t > s) {
                l = true;
                t = s
            }
            if (n > s) {
                l = true;
                n = s
            }
            return {hasBeenCorrected: l, sdate: t, edate: n}
        },
        trimcut: function (e, t) {
            t = t || 8;
            var n = comm.getRealLen(e);
            if (n > t) {
                e = $.cut(e, t - 2, "...")
            }
            return e
        },
        getAppUrl: function (e, t) {
            var n, i;
            n = {
                qzone: "http://rc.qzone.qq.com/myhome/{APPID}",
                pengyou: "http://www.pengyou.com/index.php?mod=appmanager&act=openapp&type=qzone&appid={APPID}",
                im: "javascript:void(0);"
            };
            i = n[{1: "qzone", 8: "pengyou", 9: "im"}[t.siteset]];
            i = i ? i : n.qzone;
            var a = i.replace(/\{APPID}/g, e);
            return a
        },
        isBqq: function (e) {
            if (!e) {
                return false
            }
            var t = [[115399e4, 1153999999], [1495e6, 1496999999]];
            e = parseInt(e, 10);
            if (isNaN(e)) {
                return false
            }
            var n = t.length;
            for (var i = 0; i < n; i++) {
                if (e >= t[i][0] && e <= t[i][1]) {
                    return true
                }
            }
            return false
        },
        simpleAlert: function (e, t, n, i) {
            if (typeof n == "object") {
                i = n;
                n = $.noop
            }
            n = $.isFunction(n) ? n : $.noop;
            i = i || {};
            var a = i.width || 380;
            var r = ['<div class="pop_notice_two" style="padding: 20px;">', '<div class="pop_notice_main clearfix">', '<i class="icon_notice"></i>', '<div class="pop_notice_txt">', "<p>" + t + "</p>", "</div>", "</div>", "</div>"].join("\n");
            var o = comm.dialog(e, r, {
                width: a, height: 120, showMask: true, onLoad: function () {
                }, onBeforeUnload: function (e) {
                    if (typeof i.onBeforeUnload == "function") {
                        return i.onBeforeUnload(e)
                    }
                    return true
                }, buttonConfig: [{
                    type: comm.dialog.BUTTON_TYPE.Confirm, text: "确定", clickFn: function () {
                        n()
                    }
                }]
            });
            return o
        },
        confirm: function (e) {
            var t = {
                title: "",
                content: "",
                icontype: "warn",
                type: QZFL.widget.Confirm.TYPE.OK_NO,
                hastitle: true,
                height: 140,
                width: 380,
                desc: "",
                tips: ["确定", "取消"],
                onConfirm: function () {
                },
                onNo: function () {
                },
                onAfter: function () {
                }
            };
            t = $.extend(t, e);
            var n = new QZFL.widget.Confirm(t.title, t.content, t);
            n.onConfirm = t.onConfirm;
            n.onNo = t.onNo;
            n.show();
            setTimeout(function () {
                t.onAfter()
            }, 70);
            return n
        },
        simpleConfirm: function (e, t, n, i, a) {
            a = a || {};
            var r = a.width || 380, o = a.height || 105;
            var s = ['<div class="pop_notice_two" style="padding: 20px;">', '<div class="pop_notice_main clearfix">', '<i class="icon_notice"></i>', '<div class="pop_notice_txt">', "<p>" + t + "</p>", "</div>", "</div>", "</div>"].join("\n");
            var l = [{
                type: comm.dialog.BUTTON_TYPE.Confirm,
                text: a.confirmBtnLabel || "确定",
                clickFn: n,
                preventDefault: a.confirmDontCloseWindow
            }];
            if (typeof a.haveCancelBtn == "undefined" || a.haveCancelBtn) {
                l.push({type: comm.dialog.BUTTON_TYPE.Cancel, text: a.cancelBtnLabel || "取消", clickFn: i})
            }
            a.noCloseButton = typeof a.noCloseButton == "undefined" || a.noCloseButton ? true : false;
            var c = comm.dialog(e, s, {
                width: r,
                height: o,
                showMask: true,
                noCloseButton: a.noCloseButton,
                buttonConfig: l
            });
            return c
        },
        explain: function (e, t) {
            var n = t.htmlStr || "", i = t.afterOpenFn, a = t.width || "auto", r = t.height || "auto", o = t.lastTime || 200;
            var s = ['<span class="explain none _explain">', '<i class="bor-c"><span class="bor-i"></span></i>', '<div class="explain-con" style="width:{width};height:{height}">', "{htmlStr}", "</div>", "</span>"].join("");

            function l() {
                var e = s.replace(/\{htmlStr\}/g, n).replace(/\{width\}/g, a + "px").replace(/\{height\}/g, r + "px");
                return e
            }

            function c() {
                var t = null, n = "none", a = l(), r = $(a), s = e.find(".explain");
                if (s.length > 0) {
                    s.remove()
                }
                e.append(r);
                e.on("mouseenter", function () {
                    clearTimeout(t);
                    r.removeClass(n)
                }).on("mouseleave", function () {
                    t = setTimeout(function () {
                        r.addClass(n)
                    }, o)
                });
                if (i) {
                    i(r)
                }
            }

            c()
        },
        modifier: {
            layer: function (e, t) {
                var n, i;
                if (e) {
                    e = $(e);
                    n = e.offset();
                    i = document.createElement("div");
                    i.innerHTML = t;
                    i.style.position = "absolute";
                    i.style.left = n.left + "px";
                    i.style.top = n.top - e.outerHeight() / 2 + "px";
                    document.body.appendChild(i)
                }
                return i
            }, slab: function (e, t, n, i) {
                var a, r, o, s = parseInt($(window).width()) || screen.width;
                a = '<div class="s-btnline">' + '<a href="javascript:;" class="queding s-button-right _ok">确定</a>' + '<a href="javascript:;" class="quxiao s-button-back _cancel">取消</a></div>';
                var l = ['<div class="txt">', '<p class="form-inline">', t, "</p>", '<p class="edit-price-tip _price" style="display: none"></p>', '<p class="c-tx3 _tip" style="display: none"></p>', "</div>", a].join("");
                r = comm.modifier.layer(e, l);
                o = $(r);
                o.addClass("edit-price");
                if (o.offset().left + o.width() > s) {
                    o.css("left", s - o.width() - 10 + "px")
                }
                $("._ok", r).bind("click", function () {
                    var e;
                    e = n($("._val", r).val(), r);
                    e !== false && r.parentNode.removeChild(r)
                });
                $("._cancel", r).bind("click", function () {
                    r.parentNode.removeChild(r);
                    r = null;
                    return false
                });
                $.isFunction(i) && i(r)
            }, droplist: function (e, t, n, i) {
                var a, r, o;
                a = comm.modifier.layer(e, t + r);
                o = $(e).position();
                $(a).offset({left: o.left + 1, top: o.top + o.height});
                $(a).bind("click", function (e) {
                    n($("._val", e.target.parentNode).val());
                    a.parentNode.removeChild(a);
                    a = null
                });
                $.isFunction(i) && i(a);
                comm.docClickEvent({
                    unload: function () {
                        if (a) {
                            a.parentNode.removeChild(a);
                            a = null
                        }
                    }
                })
            }
        },
        revertFormatNumber: function (e) {
            return Number($.trim((e + "").replace(/\,/g, "")))
        },
        reportPV: function (e) {
            util.stat.monitorPV.report("gdt.qq.com", e)
        },
        reportHottag: function (e, t) {
            util.stat.monitorClick.report(e, t || "gdt.qq.com");
            SPAMonitor.click({
                data: {
                    owner: adUser.aduid,
                    clicksystem: "atlas",
                    clicktype: "hottag",
                    clickid: e,
                    invoice_id: modUuid.get()
                }, batchReport: true, useSendBeacon: true
            })
        },
        pageSpeed: {
            _instance: {},
            pointMapping: {
                performance: ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"],
                common: ["headStart", "cssStart", "cssEnd", "bodyStart", "bodyEnd", "jsStart", "jsEnd", "renderEnd"],
                custom: ["headStart", "customStep1End", "customStep2End", "customStep3End", "customStep4End", "customCommitEnd"]
            },
            report: function () {
                var e = GDT.timepot || {}, t, n, i, a, r, o, s, l, c = false, u = comm.pageSpeed.pointMapping.performance, d = comm.pageSpeed.pointMapping.common, f = comm.pageSpeed.pointMapping.custom, p, m, g;
                t = e.id;
                if (!t) {
                    return
                }
                n = t.split("-");
                i = comm.pageSpeed._instance[t];
                if (i) {
                    return
                }
                i = util.stat.monitorPage.create(t, n);
                comm.pageSpeed._instance[t] = i;
                m = d[0];
                g = f[0];
                o = window.performance || window.webkitPerformance;
                if (o && (s = o.timing)) {
                    p = u[0];
                    for (a = 1, r = u.length; a < r; a++) {
                        l = s[u[a]] - s[p];
                        i.mark(a, l > 0 ? l : 0);
                        c = true
                    }
                }
                $.each(d, function (t, n) {
                    if (t > 0 && e[m] && e[n]) {
                        l = e[n] - e[m];
                        i.mark(20 + t - 1, l > 0 ? l : 0);
                        c = true
                    }
                });
                $.each(f, function (t, n) {
                    if (t > 0 && e[g] && e[n]) {
                        l = e[n] - e[g];
                        i.mark(27 + t - 1, l > 0 ? l : 0);
                        c = true
                    }
                });
                c && i.report()
            }
        },
        localStorage: {
            getItem: function (e) {
                var t;
                try {
                    t = localStorage.getItem(e)
                } catch (n) {
                    t = util.storage.get(e, "local")
                }
                return t
            }, setItem: function (e, t, n) {
                n = $.extend({media: "local", expire: -1}, n);
                try {
                    localStorage.setItem(e, t, n)
                } catch (i) {
                    util.storage.set(e, t, n)
                }
            }, removeItem: function (e) {
                var t;
                try {
                    t = localStorage.removeItem(e)
                } catch (n) {
                    t = util.storage.removeItem(e, "local")
                }
                return t
            }
        },
        genHash: function (e) {
            var t = 5381;
            e = e || "";
            for (var n = 0, i = e.length; n < i; ++n) {
                t += (t << 5) + e.charAt(n).charCodeAt(0)
            }
            return t & 2147483647
        },
        dialog: function (e, t, n) {
            var i = {width: 300, height: 400, noCloseButton: false, showMask: true};
            $.extend(i, n);
            return QZFL.dialog.create(e, t, i)
        },
        listdataFormater: function (e) {
            var t = [], n = confReport.showHandler, i = confReport.tableFields;
            $.each(e, function (e, a) {
                var r = a;
                $.each(i, function (e, t) {
                    if (t in n) {
                        r[t] = n[t].call(null, a)
                    }
                });
                t.push(r)
            });
            return t
        },
        chartdataFormater: function (e) {
            e = $.extend(true, {}, e);
            var t = [], n = QZFL.string.timeFormatString(comm.getTime(), "{Y}-{M}-{d}");
            $.each(e, function (e, i) {
                var a = {};
                a = i;
                $.each(i, function (e, t) {
                    isNaN(t) && (t = t.replace(/,/g, "").replace("%", ""));
                    (t < 0 || t == "-") && (t = 0);
                    a[e] = t
                });
                if (a.statsdate == n) {
                    "clicktraderate"in a && (a.clicktraderate = -1);
                    "tradecount"in a && (a.tradecount = -1)
                }
                t.push(a)
            });
            return t
        },
        getTotal: function (e, t) {
            var n = {}, i = confReport.sumFields, a = confReport.calFields, r = confReport.calculHandler;
            QZFL.each(e, function (e) {
                QZFL.each(i, function (t) {
                    var i = e[t];
                    i = i == undefined ? "-" : typeof i === "string" ? i.replace(/,/g, "").replace("%", "") : i;
                    if (isNaN(i)) {
                        !(t in n) && (n[t] = "-")
                    } else {
                        !(t in n) || isNaN(n[t]) && (n[t] = 0);
                        (t == "cost" || t == "turnover" || t == "orgcost") && (i *= 100);
                        i = Number(i);
                        n[t] = t in n ? n[t] + i : i
                    }
                })
            });
            QZFL.each(a, function (e) {
                if (e in r) {
                    n[e] = r[e].call(null, n)
                }
            });
            if (t != "number") {
                n = comm.listdataFormater([n]).pop()
            }
            return n
        },
        getReportSumData: function (e, t, n) {
            t = t || {};
            var i = t.format || "", a = comm.getTotal(e, i);
            n && n(a)
        },
        getRealLen: function (e, t) {
            var n = /[^\x00-\xFF]/g, i = /[\x00-\xFF]/g;
            if (typeof e != "string") {
                return 0
            }
            if (!t) {
                return e.replace(n, "**").length
            } else {
                var a = e.replace(i, "");
                return e.length - a.length + encodeURI(a).length / 3
            }
        },
        getCsrfToken: function () {
            return $.getACSRFToken()
        },
        getACSRFToken: function () {
            return $.getACSRFToken()
        },
        imgLoad: function (e, t, n) {
            if (!e) {
                return
            }
            if (e.complete) {
                t();
                return
            }
            e.onload = function () {
                t();
                e.onload = null
            };
            if (n) {
                e.onerror = function () {
                    n();
                    e.onerror = null
                }
            }
        },
        getWXQrcode: function (e, t) {
            var n = "http://mp.e.qq.com/abc/qrcode", i = adUser.aduid, a = new Image, r = n + "?uid=" + i + "&g_tk=" + comm.getACSRFToken() + "&fans_code=" + t + "&timestamp=" + +new Date;
            a.src = r;
            comm.imgLoad(a, function () {
                if (a.complete) {
                    e.attr("src", r)
                }
            })
        },
        addTokenToUrl: function (e) {
            var t, n;
            e = e || "";
            if (!e) {
                return
            }
            if (e.indexOf("/ec/api.php") < 0) {
                return e
            }
            if (e.indexOf("?") > 0) {
                n = "&"
            } else {
                n = "?"
            }
            t = e + (n + "g_tk=" + comm.getCsrfToken() + "&owner=" + adUser.aduid);
            return t
        },
        replaceWithObject: function (e, t, n) {
            if (!t || typeof e != "string")return e;
            return e.replace(/\{([^\{},:=!]+)}(?!})/g, function () {
                var e = arguments[1]in t ? t[arguments[1]] : "";
                if (e && n !== true) {
                    e = typeof $ != "undefined" ? $("<div></div>").text(e).html() : e
                }
                return e
            })
        },
        scaleVal: function (e, t) {
            var n, i, a, r;
            i = e < t.threshold ? t.lv1 : t.lv2;
            n = Math.floor(e / i);
            a = e % i;
            if (a >= i / 2) {
                n = n + 1
            }
            if (n === 0) {
                r = t.min || Math.pow(i, n)
            } else {
                r = n * i
            }
            return r
        },
        getFileFullpath: function (e, t) {
            var n = false;
            t = t || "js";
            var i = t == "js" ? verMap.jsFiles : verMap.cssFiles, a, r;
            try {
                a = t == "js" ? ENV.jsdomain : ENV.cssdomain;
                n = ENV.env == "develop"
            } catch (o) {
                a = "qzonestyle.gtimg.cn"
            }
            if (e.indexOf("http://") > -1) {
                r = e
            } else if (t == "js") {
                r = /*"http://" + */a + "/qzone/biz/gdt/atlas_v2/" + e.replace("js/", "") + (i[e] && !n ? "." + i[e] : "") + ".js"
            } else {
                r = /*"http://" + */a + "/open_proj/proj-gdt-toufang/" + e + (i[e] && !n ? "-" + i[e] : "") + ".css"
            }
            return r
        },
        setPrice: function (e) {
            var t = $.extend(true, {
                event: null, price: 0, ok: function () {
                }, cancel: function () {
                }
            }, e);
            t.price = parseFloat(t.price) || 0;
            if (!t.event) {
                return false
            }
            var n;
            var i = function (e) {
                $(e).css("zIndex", 100);
                $("body").off("click", "#root").on("click", "#root", function (e) {
                    if ($(".editPriceWrap").length > 0 && t.event.target != e.target && !$.contains(n, e.target)) {
                        $(n).length > 0 && $(n).remove();
                        n = null
                    }
                })
            };
            $(".editPriceWrap").length > 0 ? $(".editPriceWrap").find("_cancel").trigger("click") : "";
            var a = ['<div class="edit-price editPriceWrap">', '<div class="txt">', '<p class="form-inline">价格 <input type="text" class="_val _editprice form-control price-in " value="' + t.price + '" data-edittype="single"><span class="c-tx3">元</span></p>', '<p class="edit-price-tip _tips none"></p>', '<p class="c-tx3 _tip" style="display: none"></p>', "</div>", '<div class="s-btnline">', '<a href="javascript:;" class="_ok queding s-button-right">确定</a>', '<a href="javascript:;" class="_cancel quxiao s-button-back">取消</a>', "</div>", "</div>"].join("");
            n = comm.modifier.layer(t.event.target, a);
            $("._ok", n).bind("click", function () {
                t.ok($("._val", n).val(), n)
            });
            $("._cancel", n).bind("click", function () {
                $(n).remove();
                n = null;
                t.cancel(n);
                return false
            });
            i(n);
            return false
        },
        initQZFL: function () {
            QZFL.config.gbEncoderPath = "http://qzs.qq.com/qzone/v5/toolpages/";
            QZFL.config.FSHelperPage = "http://qzs.qq.com/qzone/v5/toolpages/fp_gbk.html";
            QZFL.config.defaultShareObject = "http://qzs.qq.com/qzone/v5/toolpages/getset.swf";
            QZFL.config.staticServer = "http://qzs.qq.com/ac/qzone/qzfl/lc/";
            QZFL.config.DCCookieDomain = window.mDomain || document.domain;
            QZFL.widget.msgbox.cssPath = document.baseURI+"css/msgbox.css";
            QZFL.dialog.cssPath = ""
        },
        bind: function (e, t) {
            var n = Array.prototype.slice, i = n.call(arguments, 2);
            return function () {
                e = e || this;
                t = typeof t == "string" ? e[t] : t;
                t = typeof t == "function" ? t : QZFL.emptyFn;
                return t.apply(e, i.concat(n.call(arguments, 0)))
            }
        },
        mouseColor: function (e, t) {
            var n = $(e);
            var i = function () {
                n.addClass(t)
            };
            var a = function () {
                n.removeClass(t)
            };
            n.on("mouseover", i).on("mouseout", a)
        },
        clearMouseColor: function (e) {
            $(e).off("mouseover").off("mouseout");
            return false
        },
        log: function () {
            util.log.apply(util, arguments)
        },
        codeReport: function (e, t) {
            var n = ["http://c.isdspeed.qq.com/code.cgi?domain=", t && t.domain || "e.qq.com", "&key=cgi,type,code,time,rate"].join(""), i = [], $ = jQuery, a = $.type(e);
            if (a == "array") {
                $.each(e, function (e, t) {
                    i.push(r(e, t))
                });
                i.join("&")
            } else if (a == "object") {
                i = r(1, e)
            }
            function r(e, t) {
                return [e + "_1=" + encodeURIComponent(t.cgi), e + "_2=" + t.type, e + "_3=" + t.code, e + "_4=" + t.time, e + "_5=" + t.rate].join("&")
            }

            (new Image).src = n + "&" + i
        },
        getIEVersion: function () {
            var e = navigator.userAgent.toLowerCase(), t;
            t = parseInt((/msie (\d+)/.exec(e) || [])[1]);
            if (isNaN(t)) {
                t = parseInt((/trident\/.*; rv:(\d+)/.exec(e) || [])[1])
            }
            if (isNaN(t)) {
                t = -1
            }
            return t
        },
        trimWithoutPreEmSpace: function (e) {
            if (typeof e != "string") {
                return e
            }
            var t = "[	\n\f\r   ᠎             \u2028\u2029﻿]";
            var n = new RegExp("^" + t + "+|" + t + "+$", "g");
            return e.replace(n, "")
        },
        autoFixCenterWithEmSpace: function (e, t) {
            e = $.trim(e);
            t = isNaN(t) ? e.length : t;
            if (typeof e != "string" || e.length >= t) {
                return e
            }
            var n = e.length;
            var i = Math.floor((t - n) / 2);
            var a = "";
            while (i--) {
                a += "　"
            }
            if ((t - n) % 2 !== 0) {
                a += " "
            }
            e = a + e;
            i = t - e.length;
            a = "";
            while (i--) {
                a += "　"
            }
            return e + a
        },
        nl2br: function (e) {
            return (e + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br>")
        },
        getNlSize: function (e) {
            e = (e + "").replace(/\s+$/g, "");
            var t = e.match(/\r\n|\n\r|\r|\n/g);
            return $.isArray(t) ? t.length : 0
        },
        reportMaterial: function (e) {
            e = e || {};
            var t = ["uploadpic", "ctx", "flashtool", "imgtool"];
            var n = function () {
                var t = adUser.aduid || "", n = adUser.status || "";
                new modReport.WriteLog({invoice_id: "" + Math.floor((new Date).getTime() / 1e3) + t}).send({
                    action_flag: 2,
                    operate_type: 9,
                    btnid: e.btnid || "",
                    width: parseInt(e.width) || "",
                    height: parseInt(e.height) || "",
                    status: n,
                    page_type: e.type || ""
                })
            };
            if ($.inArray(e.type, t) > -1 && e.btnid && e.width && e.height) {
                n()
            }
        },
        clickButton: function (e) {
            var t = adUser.aduid || "", n = $.extend(true, {
                owner: t,
                action_flag: 1,
                operate_type: 205,
                clickid: "",
                clicktype: "",
                clicksystem: "atlas",
                clickresult: "",
                clickcontent: ""
            }, e);
            new modReport.WriteLog({invoice_id: "" + Math.floor((new Date).getTime() / 1e3) + t}).send(n)
        },
        addOwnerParam: function (e) {
            var t, n = "owner";
            e = e || "";
            if (e.indexOf("?") > 0) {
                t = "&"
            } else {
                t = "?"
            }
            if (e.indexOf("/phoenix/api.php") > -1) {
                n = "advertiser_id"
            }
            return e + t + n + "=" + adUser.aduid
        },
        getMediaContentPreviewUrlById: function (e, t) {
            t = t || "image";
            e = $.isArray(e) ? e[0] || "" : e;
            var n = location.protocol + "//" + location.host + "/ec/api.php?mod=resource&act=show&resource_type=" + t + "&resource_id=" + e;
            if (comm.isValidUrl(e)) {
                n = e
            }
            return comm.addTokenToUrl(comm.addOwnerParam(n))
        },
        isValidUrl: function (e) {
            var t = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i;
            return t.test(e)
        },
        resizeMainDivHeightToMatchWin: function () {
            var e, t, n = $(document.body);
            e = n.outerHeight();
            t = e - $("header").outerHeight(true);
            $("#main").css({height: t + "px", overflow: "auto"})
        }
    };
    comm.dialog.BUTTON_TYPE = QZFL.dialog.BUTTON_TYPE;
    window.GDT = window.GDT || {};
    window.GDT.util = comm;
    comm.initQZFL();
    return comm
});
define("js/modules/monitor", ["require", "jquery", "js/services/common"], function (require) {
    var $ = require("jquery"), e = require("js/services/common"), t = e.loader, n = e.sender;

    function i(e, i) {
        var e = typeof e == "string" ? e : "", a = $.extend(true, {
            wait: 3e3,
            retry: 0,
            method: "GET",
            ok: function (e) {
                var e = e || {};
                if (typeof e.ret != "undefined" && e.ret == 0) {
                    return true
                } else {
                    return false
                }
            }
        }, i);
        a.wait = parseInt(a.wait) || 1e3;
        a.retry = parseInt(a.retry) || 0;
        a.method = a.method ? a.method.toLowerCase() : "get";
        if (e) {
            if (a.method == "get") {
                this.cgiFunction = t(true, true, {base: e})
            } else {
                this.cgiFunction = n(true, true, {base: e})
            }
        } else {
            this.cgiFunction = false
        }
        this.config = a;
        this._event = {open: [], success: [], error: [], close: []};
        this.times = 0;
        this.sendTime = 0;
        this.timeout = null;
        this.isClose = false
    }

    i.prototype.on = function (e, t) {
        var n = this._event, e = e || "", i = n[e] || false, t = t || function () {
            };
        i && i.push(t)
    };
    i.prototype.trigger = function (e, t) {
        var n = this._event, e = e || "", i = n[e] || false, t = t || "";
        if (i) {
            for (var a = 0, r = i.length; a < r; a++) {
                i[a].call(this, t)
            }
        }
    };
    i.prototype.send = function (e) {
        var t = this, n = t.config || {}, e = e || {};
        if (t.cgiFunction) {
            var i = function (e) {
                t.times = 0;
                t.trigger("success", e)
            };
            var a = function (i) {
                var a = +new Date, r = n.wait || 0, o = n.retry || 0;
                t.trigger("error", i);
                if ((o < 1 || t.times < o) && !t.isClose) {
                    if (a - t.sendTime > r) {
                        t.send(e)
                    } else {
                        t.timeout = setTimeout(function () {
                            t.send(e)
                        }, r - a + t.sendTime)
                    }
                }
            };
            try {
                clearTimeout(t.timeout)
            } catch (r) {
            }
            t.isClose = false;
            t.times++;
            t.trigger("open", t.times);
            t.sendTime = +new Date;
            t.cgiFunction(function (e) {
                var e = e || {};
                if (n.ok(e)) {
                    i(e)
                } else {
                    a(e)
                }
            }, {
                data: e, error: function (e) {
                    a(e)
                }
            })
        } else {
            t.trigger("error", {code: -1, msg: "缺少监听url"})
        }
    };
    i.prototype.close = function () {
        try {
            clearTimeout(this.timeout)
        } catch (e) {
        }
        this.trigger("close", this.times);
        this.isClose = true;
        this.times = 0
    };
    return i
});
define("js/modules/report", ["require", "jquery", "js/services/common", "aduser"], function (require) {
    var $ = require("jquery"), e = require("js/services/common"), t = e.sender, n = "/ec/api.php?mod={mod}&act={act}", i = require("aduser");

    function a(e) {
        this.startTime = (new Date).getTime();
        this.invoice_id = e.invoice_id || ""
    }

    $.extend(a.prototype, {
        _getParamsByActionFlag: function (e) {
            var t = ["req_url", "error_code", "req_body", "rsp_body"], n = e.action_flag, i = {};
            if (!n) {
                return false
            }
            switch (Number(n)) {
                case 1:
                    $.each(t, function (t, n) {
                        i[n] = e[n] || ""
                    });
                    break;
                case 2:
                    $.each(t, function (e, t) {
                        i[t] = ""
                    });
                    break
            }
            return i
        }, getSpentTime: function (e) {
            return Math.floor((e - this.startTime) / 1e3)
        }, send: function (e) {
            var a = (new Date).getTime(), r = {}, o, s = $.Deferred();
            r.create_time = Math.floor(a / 1e3);
            r.spent_time = this.getSpentTime(a);
            r.invoice_id = this.invoice_id;
            r.owner = i.aduid || "";
            $.extend(r, e, this._getParamsByActionFlag(e));
            o = t("monitor", "rpttdbank", {base: n});
            o(function () {
            }, {
                data: r, success: function () {
                    s.resolve()
                }, error: function () {
                    s.reject()
                }
            });
            return s
        }
    });
    return {WriteLog: a}
});
define("js/config/comm", ["require", "js/modules/account", "aduser", "js/config/env", "js/config/report", "js/modules/atlasdomflag"], function (require) {
    "use strict";
    var e = require("js/modules/account"), t = require("aduser"), n = require("js/config/env"), i = require("js/config/report"), a = require("js/modules/atlasdomflag"), r = {};
    r = {
        ENV: n,
        REPORT: i,
        navHeader: [["首 页", "index", "ico-home"], ["推 广", "report/campaign", "ico-generalize", [["广告", "report/order"], ["标的物", "report/producttype"]]], ["报 表", "report/analytic", "ico-sheet", [["整体报表", "report/report"], ["推广计划", "report/campaignlist"], ["点击来源", "report/source"], ["广告", "report/orderdetail", 1], ["自定义报表", "report/custom", function () {
            return e.checkPrivilege("customrpt")
        }], ["创建自定义报表", "report/customrule", 5], ["结算数据", "report/settlement", function () {
            var t = e.isYYBKAAduser(), n = $("#settlement");
            if (n.length > 0) {
                if (t) {
                    n.removeClass("none");
                    GDT.atlasDomFlag.set("settlement")
                } else {
                    n.addClass("none");
                    GDT.atlasDomFlag.remove("settlement")
                }
            }
            return t
        }]]], ["财 务", "account/info", "ico-finance", [["财务信息", "account/info"], ["账户转账", "account/transfer", function () {
            var n = t.mp_bound_status === 1 && !e.isYYBKAAduser();
            if (n) {
                a.set("accountTransfer")
            } else {
                a.remove("accountTransfer")
            }
            return n
        }], ["财务记录", "account/list"], ["发票开具", "account/invoice", function () {
            var t = e.checkPrivilege("invoice_enabled");
            if (t) {
                a.set("accountInvoice")
            } else {
                a.remove("accountInvoice")
            }
            return t
        }]]], ["工具箱", "tool/index", "ico-tool", ['<li class="goback"><a href="index"><i></i></a></li>', ["协作者管理", "tool/privilege", function () {
            var t = e.checkPrivilege("collaborator");
            if (t) {
                a.set("toolPrivilege")
            } else {
                a.remove("toolPrivilege")
            }
            return t
        }, "group1"], ["通知提醒", "tool/notice", null, "group1"], ["账号中心", "tool/profile", null, "group1"], ["广告资质", "tool/portraits", null, "group1"], ["操作记录", "tool/oplog", null, "group3"], ["定向包管理", "tool/targetpackmanage", function () {
            a.set("toolTargetpackmanage");
            return true
        }, "group2"], ["自定义人群管理", "tool/rulelist", function () {
            var t = n.apiVersion() > 1 && !e.isYYBKAAduser();
            if (t) {
                a.set("toolRulelist")
            } else {
                a.remove("toolRulelist")
            }
            return t
        }, "group2"], ["自定义人群管理", "tool/yybdmp", function () {
            var t = n.apiVersion() > 1 && e.isYYBKAAduser() && e.checkPrivilege("YYB_Targeting");
            if (t) {
                a.set("toolYybdmp")
            } else {
                a.remove("toolYybdmp")
            }
            return t
        }, "group2"], ["创意制作", "tool/mediamaker", null, "group2"], ["落地页制作", "tool/landingpage", null, "group2"], ["Flash创意制作", "tool/flashmaker", null, "group2"], ["应用宝落地页", "tool/yybpages", function () {
            var e = !!GDT.privilege.myapp_landing_page_tool;
            if (e) {
                a.set("yybPages")
            } else {
                a.remove("yybPages")
            }
            return e
        }, "group2"], ["好文广告制作工具", "tool/blindadpage", function () {
            var e = !!GDT.privilege.qqbrowser_rw;
            if (e) {
                a.set("qqbrowser_rw")
            } else {
                a.remove("qqbrowser_rw")
            }
            return e
        }, "group2"], ["联盟媒体定向工具", "tool/mediaoptimizer", function () {
            var t = !e.isYYBKAAduser() && e.checkPrivilege("Anmediatarget");
            if (t) {
                a.set("toolMediaOptimizer")
            } else {
                a.remove("toolMediaOptimizer")
            }
            return t
        }, "group2"], ["移动应用转化跟踪", "tool/tracking", function () {
            var t = !e.isYYBKAAduser();
            if (t) {
                a.set("toolTracking")
            } else {
                a.remove("toolTracking")
            }
            return t
        }, "group4"], ["网页转化跟踪", "tool/webtracking", function () {
            var t = !e.isYYBKAAduser();
            if (t) {
                a.set("toolWebtracking")
            } else {
                a.remove("toolWebtracking")
            }
            return t
        }, "group4"], ["联盟流量优化", "tool/mediumshield", function () {
            var t = !e.isYYBKAAduser() && e.checkPrivilege("use_medium_shield");
            if (t) {
                a.set("toolMediumshield")
            } else {
                a.remove("toolMediumshield")
            }
            return t
        }, "group4"], ["账户绑定", "tool/wxbound", null, "group5"]]]],
        cpt_navHeader: [["订 单", "cpt/index", "ico-order"], ["财 务", "account/info", "ico-finance", [["财务信息", "account/info"], ["账户转账", "account/transfer", function () {
            var n = t.mp_bound_status === 1 && !e.isYYBKAAduser();
            if (n) {
                a.set("accountTransfer")
            } else {
                a.remove("accountTransfer")
            }
            return n
        }], ["财务记录", "account/list"], ["发票开具", "account/invoice", function () {
            var t = e.checkPrivilege("invoice_enabled");
            if (t) {
                a.set("accountInvoice")
            } else {
                a.remove("accountInvoice")
            }
            return t
        }]]]],
        dateRangerDefaultOptions: {
            format: "YYYY-MM-DD",
            alwaysShowCalendars: true,
            separator: " 至 ",
            locale: {
                applyLabel: "确认",
                cancelLabel: "取消",
                fromLabel: "从",
                toLabel: "到",
                customRangeLabel: "",
                daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
                monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                firstDay: 0
            },
            showDropdowns: true
        },
        supportPlatform: {atlas: "微信公众号管理平台", CPD: "应用宝-CPD", CPT: "应用宝-CPT"},
        confLinkType: {
            LINK: "1",
            SELLER: "2",
            BQQ: "3",
            RZ: "4",
            RZ_BLOG: "5",
            RZ_IFRAME: "6",
            APP: "7",
            QQGROUP: "8",
            LIVE_VIDEO_ROOM: "9",
            APP_TASK: "10",
            MOB_TASK: "20",
            PC_APP: "11",
            QZONE_GIFT: "12",
            QZONE_SIGN: "13",
            ITUNES_APP: "15",
            MOBILE_APP: "17",
            MOBILE_ALLIANCE_APP: "37",
            EXCHANGE_APP_DOWNLOAD_FOR_MYAPP: "16",
            WECHAT: "18",
            DP_SHOP: "21",
            DP_COUPON: "22",
            DP_TUAN: "23",
            WECHAT_ARTICLE: "24",
            WECHAT_SHOP: "25",
            WECHAT_URL: "26",
            TENCENT_KE: "30",
            MYAPP_PROMOTION: "31",
            BLIND_AD: "41"
        },
        confTargeting: function () {
            var e = ["visittype", "age", "gender", "scene", "education", "vip", "yellow", "os", "isp", "connectiontype", "userstatus", "payment", "ans", "climate", "makeupindex", "uvindex", "dressindex"], t = {};
            for (var i = e.length - 1; i >= 0; i--) {
                var a = e[i];
                t[a] = n[a]
            }
            t.appaction_object_type = {3: "按APP", 4: "按分类"};
            t.appaction_object_type = {100000: "活跃", 100001: "付费"};
            t.appuser = {1: "未安装该应用的用户", 2: "已安装该应用的用户"};
            return t
        }(),
        confCrttype: {
            TEXT: 1,
            IMAGE: 2,
            TEXT_AND_IMAGE: 3,
            FLASH: 4,
            FLASH_TEXT: 5,
            DUAL_IMAGE: 6,
            TEXT_AND_IMAGE_DESC: 7,
            INTERACTION_IMAGE_TEXT: 8,
            NULL: 9,
            RICHMEDIA: 9,
            FLV: 10,
            PRIMITIVE: 11,
            TIPS_HASIMAGE: 12,
            TIPS_ONLYWORDS: 13,
            VIDEO_AND_IMAGE: 15,
            VIDEO_AND_IMAGE_TEXT: 16,
            VIDEO_WITH_TEXT_AND_IMAGE: 20,
            TWO_IMAGE_AND_TEXT: 21
        },
        confShowType: {DYNAMIC_CREATIVE: 3, SEARCH_CREATIVE: 4},
        confCampaignType: {CAMPAIGN_TYPE_DISPLAY: 2, CAMPAIGN_TYPE_SEARCH: 1},
        getCosttypeName: function (e) {
            var t = ["", "CPC", "CPA", "CPS", "CPM", "CPD"];
            e = Number(e);
            return e > 0 && e < t.length ? t[e] : ""
        }
    };
    r.confCrtBigType = {dynamic: [r.confShowType.DYNAMIC_CREATIVE]};
    r.confCrttypeNameMapping = function () {
        var e = r.confCrttype, t = {};
        t[e.TEXT] = "文字链";
        t[e.IMAGE] = "图片";
        t[e.TEXT_AND_IMAGE] = "图文";
        t[e.FLASH] = "Flash";
        t[e.FLASH_TEXT] = "Flash文字";
        t[e.DUAL_IMAGE] = "大小图";
        t[e.TEXT_AND_IMAGE_DESC] = "图文描述";
        t[e.INTERACTION_IMAGE_TEXT] = "消息流";
        t[e.NULL] = "富媒体";
        t[e.RICHMEDIA] = "富媒体";
        t[e.FLV] = "视频";
        t[e.PRIMITIVE] = "原生广告";
        t[e.TIPS_ONLYWORDS] = "三文文字链";
        t[e.TIPS_HASIMAGE] = "一图三文";
        t[e.VIDEO_AND_IMAGE] = "视频图片广告";
        t[e.VIDEO_AND_IMAGE_TEXT] = "视频图片文案广告";
        t[e.VIDEO_WITH_TEXT_AND_IMAGE] = "视频图片文案广告";
        t[e.TWO_IMAGE_AND_TEXT] = "两图一文";
        return t
    }();
    r.servicePhone = "400-900-5050";
    r.privilege = {
        operatorPermissionMap: {1: "管理员", 2: "观察者", 3: "操作者", 4: "财务员", 10: "主账号"},
        opAbleToBe: [1, 2, 3, 4],
        needAuthConfirm: 6,
        statusIsCurrent: 1
    };
    return r
});
define("js/config/env", ["require", "env"], function (require) {
    "use strict";
    var e = location.host, t, n, i, a = require("env"), r = {}, o;
    e = /\.qq\.com$/.test(e) ? e : "";
    for (o in a) {
        r[o] = a[o]
    }
    n = /^\/atlas\/([0-9]{4,20})/;
    if (n.test(location.pathname)) {
        i = n.exec(location.pathname)[1];
        t = "http://" + e + "/_hNav" + i + "/"
    } else {
        t = "http://" + e + "/atlas/"
    }
    r.PORTAL_PAGE = e ? "http://" + e + "/" : "";
    r.ROOT = t;
    r.OPACITY_DARK = .6;
    r.apiVersion = function () {
        return a.version || 1
    };
    r.ACCOUNT_ALERT_AMOUNT = 200;
    r.USER_STATUS_DEF = {prepare: 19, validating: 2, invalidate: 3};
    r.TARGETTYPE_DEF = {
        PAIPAI_ITEM: 1,
        PAIPAI_SHOP: 2,
        PAIPAI_SEARCH: 3,
        QQ_TUAN: 4,
        QQ_FANLI: 5,
        TENPAY: 6,
        PAIPAI_OPERATOR: 7,
        RENZHENG_TUI_GUANG: 8,
        QQ_DIANYING: 9,
        "51BUY": 10,
        INNER_APP: 11,
        QZONE_PAGE: 12,
        LONG_TAIL: 13,
        OPEN_PLATFORM_APP: 14,
        QQ_LVYOU: 15,
        QQ_CAIBEI: 16,
        ZTC_ZHITOU: 17,
        QZONE_FARM: 18,
        QQ_BUY: 19,
        QQ_MEISHI: 20,
        QQ_VIP: 21,
        QZONE: 22,
        TUAN_AGENCY: 23,
        BRAND_GIFT: 24,
        BRAND: 25,
        ZTC_OPERATOR: 26,
        QQ_CAIBEI_SHOP: 27,
        APP_TASK: 28,
        OMG_CPD: 29
    };
    r.STATUS_NORMAL = 1;
    r.STATUS_PENDING = 2;
    r.STATUS_DENIED = 3;
    r.STATUS_FROZEN = 4;
    r.STATUS_ENABLE = 5;
    r.STATUS_SUSPEND = 10;
    r.STATUS_CANCEL = 17;
    r.STATUS_PREPARE_OK = 18;
    r.STATUS_PREPARE = 19;
    r.STATUS_DELETED = 20;
    r.PRODUCTTYPE_DEF = {
        PAIPAI_ITEM: 1,
        PAIPAI_SHOP: 2,
        QZONE_PAGE: 3,
        OPEN_PLATFORM_APP: 4,
        MYAPP: 5,
        QQ_GROUP: 6,
        QQ_BUSINESS: 7,
        B_QQ: 8,
        "51BUY": 9,
        QQ_TUAN: 10,
        TASK: 11,
        OPEN_PLATFORM_APP_MOB: 12,
        FEEDS: 13,
        PAIPAI_SHOP_URL: 14,
        LIVE_VIDEO_ROOM: 15,
        QZONE_GIFT: 16,
        QZONE_SIGN: 17,
        APPLE_APP_STORE: 19,
        EXCHANGE_APP_FOR_MYAPP: 20,
        QQ_MP: 37,
        UNION_APP: 38,
        QZONE_VIDEO_PAGE: 40,
        MYAPP_PROMOTION: 35
    };
    r.LINKTYPE_DEF = {
        LINK: "1",
        SELLER: "2",
        BQQ: "3",
        RZ: "4",
        RZ_BLOG: "5",
        RZ_IFRAME: "6",
        APP: "7",
        QQGROUP: "8",
        LIVE_VIDEO_ROOM: "9",
        APP_TASK: "10",
        MOB_TASK: "20",
        PC_APP: "11",
        QZONE_GIFT: "12",
        QZONE_SIGN: "13",
        ITUNES_APP: "15",
        MOBILE_APP: "17",
        EXCHANGE_APP_DOWNLOAD_FOR_MYAPP: "16",
        WECHAT: "18",
        DP_SHOP: "21",
        DP_COUPON: "22",
        DP_TUAN: "23",
        WECHAT_ARTICLE: "24",
        WECHAT_SHOP: "25",
        WECHAT_URL: "26",
        TENCENT_KE: "30",
        MYAPP_PROMOTION: "31",
        QQ_MP: "35",
        UNION_APP: "37",
        QZONE_VIDEO_PAGE: "39",
        STORE_AD: "40",
        BLIND_AD: "41"
    };
    r.userStatusPrepare = 19;
    r.userStatusValidating = 2;
    r.userStatusInvalidate = 3;
    var s = function () {
        var n = {
            BRAND_ADUSER: 25,
            LONGTAIL_ADUSER: 13,
            PRICE_MIN: .01,
            PRICE_MAX: 1e3,
            CPMPRICE_MIN: 1.5,
            CORE_POSITION_MIN: 1.5,
            CORE_POSITION_MAX: 100,
            CPC_PRICE_WARNING: 10,
            CPM_PRICE_WARNING: 70,
            AGE_BINARY_STRING_STATIC_LENGTH: 128,
            AGE_MAX: 127,
            AGE_MIN: 0,
            SINGLE_AGE_SELECT_MIN: 5,
            SINGLE_AGE_SELECT_MAX: 60,
            SINGLE_AGE_SELECT_DEFAULT: [18, 50],
            SINGLE_AGE_SLIDER_SIZE: 300,
            AGELOWBOUND: 0,
            AGEHIGHTBOUND: 999,
            DAYSECONDS: 86400,
            HOURSECONDS: 3600,
            MAXORDERRULENUM: 5,
            MAX_RULENUM_SHOPPINGINTEREST: 5,
            CPC: 1,
            CPA: 2,
            CPM: 4,
            OCPA: 999,
            DAYBUDGET_CPC_MIN: 30,
            DAYBUDGET_CPM_MIN: 1e3,
            DAYBUDGET_MAX: 1e6,
            DEFAULTDAYBUDGET_CPC: 1e3,
            DEFAULTDAYBUDGET_CPM: 1e4,
            OPACAITY_GREENHAND: .7,
            OPACITY_DARK: .6,
            OPACITY_LIGHT: .3,
            CAMPAIGN_NORMAL_STATUS: 1,
            CAMPAIGN_PAUSE_STATUS: 10,
            ADTYPE_NORMAL: 1,
            ADTYPE_INTERACTIVE: 3,
            CAMPAIGNNAMEMAXLEN: 40,
            FORMID_WAP: 29,
            ACCOUNT_ALERT_AMOUNT: 200,
            MINSCROLLTOP: 150,
            NONEEDTOCLEANFULLSPACE_CRTSIZE_ARR: [127, 128, 129, 130, 131, 132, 151, 152, 158, 159, 160, 161, 162, 163, 164, 165],
            TITLENEEDAUTOFIXCENTER_CRTSIZE_ARR: [131, 132, 158, 159, 160, 161, 162, 163],
            PREVIEWNEEDNLTOBR_CRTSIZE_ARR: [127, 128, 129, 130, 131, 132, 151, 152, 158, 159, 160, 161, 162, 163, 164, 165],
            JDTIPS_CRTSIZE_ARR: [127, 128, 129, 130, 131, 132, 151, 152, 158, 159, 160, 161, 162, 163, 164, 165],
            userStatusPrepare: 19,
            userStatusValidating: 2,
            userStatusInvalidate: 3,
            pagesize: 12,
            maxtagnum: 200,
            ordernameMaxLeng: 40,
            createtiveNameMaxLeng: 40,
            orderlinkMaxLen: 1024,
            orderIframeLinkMaxLen: 1024,
            campaignWarningNum: 190,
            billorderlist: {2: "现金优先", 1: "虚拟优先"},
            typelist: {1: "搜索广告", 2: "展示广告"},
            statecnlist: {1: "statu_on", 2: "statu_pause", 3: "statu_stop"},
            operatorlist: {1: "包含", 2: "不包含", 3: "等于", 4: "不等于"},
            visittype: {1: "到访定向", 2: "未到访定向"},
            age: ["18岁以下", "18-23岁", "24-30岁", "31-40岁", "41-50岁", "50岁以上"],
            gender: ["全部性别", "男", "女"],
            scene: ["未知", "公共场所", "家庭", "公司", "学校"],
            education: ["未知", "博士", "硕士", "本科", "高中", "初中", "小学"],
            vip: ["非会员", "会员LV1", "会员LV2", "会员LV3", "会员LV4", "会员LV5", "会员LV6", "会员LV7"],
            yellow: ["非黄钻", "黄钻LV1", "黄钻LV2", "黄钻LV3", "黄钻LV4", "黄钻LV5", "黄钻LV6", "黄钻LV7"],
            mobileprice: ["未知", "1500元以下", "1500~2500元", "2500元以上"],
            os: ["iOS", "Android", "Windows", "Symbian", "Java", "未知"],
            isp: ["未知", "移动", "联通", "电信"],
            connectiontype: ["未知", "WIFI", "2G", "3G", "4G"],
            userstatus: {1: "未知", 2: "育儿", 4: "新婚", 8: "单身", 9: "已婚"},
            living_status: {1: "在校大学生"},
            payment: ["虚拟付费用户", "已有电商付费"],
            fans: ["非认证空间粉丝", "认证空间粉丝"],
            consumption_ability: {1: "未知", 2: "高消费", 3: "低消费"},
            climate: {101: "晴天", 102: "阴天", 103: "雨天", 104: "雾", 105: "雪", 106: "沙尘"},
            makeupindex: {1: "保湿防龟裂", 2: "保湿", 3: "控油", 4: "防晒"},
            uvindex: {1: "弱", 2: "偏弱", 3: "中等", 4: "偏强", 5: "强"},
            dressindex: {1: "炎热", 2: "热舒适", 3: "舒适", 4: "凉舒适", 5: "温凉", 6: "凉", 7: "冷", 8: "寒冷"},
            statelist: {
                0: {disable: 0, cn: "statu_on", label: "全部状态", olist: [10, 20]},
                1: {disable: 0, cn: "statu_on", label: "启用中", olist: [10, 20]},
                2: {disable: 0, cn: "statu_noexam", label: "审核中", olist: [20]},
                3: {disable: 0, cn: "statu_nopass", label: "审核不通过", olist: [20]},
                4: {disable: 0, cn: "statu_nopass", label: "冻结", olist: []},
                11: {disable: 0, cn: "statu_on", label: "未到投放时间", olist: [10, 20]},
                12: {disable: 0, cn: "statu_on", label: "投放中", olist: [10, 20]},
                10: {disable: 0, cn: "statu_pause", label: "暂停中", olist: [1, 20]},
                13: {disable: 0, cn: "statu_stop", label: "投放结束", olist: [20]},
                20: {disable: 0, cn: "statu_stop", label: "已删除"},
                999: {disable: 0, cn: "statu_stop", label: "所有未删除"},
                31: {disable: 1, cn: "statu_pause", label: "暂停", showtitle: 1},
                32: {disable: 1, cn: "statu_pause", label: "暂停", showtitle: 1},
                33: {disable: 1, cn: "statu_pause", label: "暂停", showtitle: 1},
                34: {disable: 1, cn: "statu_pause", label: "暂停", showtitle: 1},
                35: {disable: 1, cn: "statu_pause", label: "暂停", showtitle: 1},
                36: {disable: 0, cn: "statu_waitput", label: "投放中(计划暂停)", showtitle: 1, olist: [10, 20]},
                37: {disable: 0, cn: "statu_waitput", label: "未到投放时间(计划暂停)", showtitle: 1, olist: [10, 20]},
                38: {disable: 0, cn: "statu_waitput", label: "投放中(账户暂停)", showtitle: 1, olist: [10, 20]},
                39: {disable: 0, cn: "statu_waitput", label: "未到投放时间(账户暂停)", showtitle: 1, olist: [10, 20]},
                41: {disable: 0, cn: "statu_waitput", label: "未投放(广告暂停)", showtitle: 1, olist: [10, 20]},
                42: {disable: 0, cn: "statu_waitput", label: "未投放(广告暂停)", showtitle: 1, olist: [10, 20]},
                43: {disable: 0, cn: "statu_waitput", label: "未投放(广告暂停)", showtitle: 1, olist: [10, 20]},
                44: {disable: 0, cn: "statu_waitput", label: "未投放(广告暂停)", showtitle: 1, olist: [10, 20]},
                45: {disable: 0, cn: "statu_waitput", label: "未投放(广告暂停)", showtitle: 1, olist: [10, 20]}
            },
            campaignStatusIsOn: [1, 11, 12],
            crtStatusMap: {
                0: "全部状态",
                1: "启用中",
                2: "审核中",
                3: "审核不通过",
                4: "冻结",
                11: "未到投放时间",
                12: "启用中",
                10: "暂停中",
                13: "投放结束",
                20: "删除",
                31: "暂停",
                32: "暂停",
                33: "暂停",
                34: "暂停",
                35: "暂停",
                36: "投放中(计划暂停)",
                37: "未到投放时间(计划暂停)",
                38: "投放中(账户暂停)",
                39: "未到投放时间(账户暂停)",
                41: "未投放(广告暂停)",
                42: "未投放(广告暂停)",
                43: "未投放(广告暂停)",
                44: "未投放(广告暂停)",
                45: "未投放(广告暂停)"
            },
            statusCanPause: [1, 11, 12],
            statusCanContinue: [10],
            statusShowDisabledContinue: [31, 32, 33, 34, 35],
            osearchstate: [999, 0, 1, 10, 2, 3, 13],
            osearchstatetext: ["所有未删除", "所有广告", "启用中", "暂停中", "审核中", "审核不通过", "投放结束"],
            csearchstate: [999, 0, 1, 10],
            csearchstatetext: ["所有未删除", "所有计划", "启用中", "暂停中"],
            delstat: 20,
            ostatetip: {
                31: "因账户冻结暂停",
                32: "因账户余额不足暂停",
                33: "账户消耗达日限额暂停",
                34: "推广计划消耗达日限额暂停",
                35: "所属推广计划已暂停",
                36: "所属推广计划暂停或达到限额",
                37: "所属推广计划暂停或达到限额",
                38: "账户达限额或账户余额不足",
                39: "账户达限额或账户余额不足",
                41: "账户冻结",
                42: "账户余额不足",
                43: "账户达日限额",
                44: "计划达日限额",
                45: "计划暂停"
            },
            cstatetip: {31: "账户冻结", 32: "账户余额不足", 33: "账户达日限额", 34: "计划达日限额", 38: "账户达限额或账户余额不足", 39: "账户达限额或账户余额不足"},
            nodatatip: "无匹配结果"
        };
        n.DAYBUDGET_MIN = 0;
        n.DEFAULTDAYBUDGET = n.DEFAULTDAYBUDGET_CPC;
        var i = {};
        i[n.CPC] = "CPC";
        i[n.CPM] = "CPM";
        n.feetypelist = i;
        n.formtypedict = {
            1: "文字链",
            2: "图片",
            3: "图文",
            4: "Flash",
            5: "Flash文字",
            6: "大小图",
            7: "图文描述",
            8: "消息流",
            9: "富媒体",
            10: "视频广告",
            11: "两图两文",
            12: "一图三文",
            13: "三文文字链",
            15: "视频图片广告"
        };
        n.typefield = {
            orderimg: [2, 3, 4, 6, 7, 8],
            img2: [6],
            orderdetail: [7],
            orderdesc: [1, 3, 7, 8],
            orderflash: [4, 5]
        };
        n.premap = {
            2: {orderimg: [180, 180]},
            3: {orderimg: [180, 180]},
            4: {orderflash: [180, 180], orderimg: [180, 180]},
            6: {orderimg: [180, 180], img2: [100, 100]},
            7: {orderimg: [140, 140]}
        };
        n.stateHtml = '<ul class="pop_list" style="top:0;left:0;">{li}</ul>';
        n.typeHtml = '<ul class="pop_list" style="top:0;left:0;"><li><a href="javascript:;" title="" aid="2">展示广告</a></li></ul>';
        n.ordertypelist = {1: "文字", 2: "图片", 4: "flash", 3: "图文", 6: "大小图", 7: "图文描述", 8: "消息流"};
        n.MOS = {1: "iOS", 2: "Android", 4: "Windows", 8: "Symbian", 16: "Java", 32: "其他"};
        n.dm = location.host;
        n.path = "http://" + n.dm;
        n.charset = "GB2312";
        n.domain = n.dm.split(".").slice(1, 3).join(".");
        n.HOST = e;
        n.ROOT = t;
        n.highchartsLinesColor = ["#f0c236", "#5a93ce", "#e98f2e", "#4c59aa"];
        n.highchartsHideYaxisTitle = true;
        n.TARGETPACKQUOTA = 60;
        n.TARGETPACKQUOTA_RED = 55;
        n.confPriceUnitMap = {};
        n.confPriceUnitMap[n.CPC] = "点击";
        n.confPriceUnitMap[n.CPA] = "下载";
        n.confPriceUnitMap[n.CPM] = "千次曝光";
        n.confOptimizationGoalTypeDef = {104: "激活"};
        return n
    }();
    for (o in s) {
        r[o] = s[o]
    }
    r.FORMTYPETXT = 1;
    r.FORMTYPE_TXT = 1;
    r.FORMTYPE_EXPANDABLE = 6;
    r.FORMTYPE_FEEDS = 8;
    r.OSANDROID = 2;
    r.CATE_APP = 3;
    r.CRTSIZE_APPWALL = 50;
    r.CRTSIZE_BANNER_72 = 69;
    r.CRTSIZE_INTERSTITIAL_72 = 70;
    r.CRTSIZE_BANNER_TXT = 71;
    r.CRTSIZE_INTERSTITIAL_120 = 90;
    r.CRTSIZE_APPDETAIL_72 = 115;
    r.CRTSIZE_QQSHOW_140x140_AND_140x200 = 143;
    r.STATUS_NORMAL = 1;
    r.STATUS_PENDING = 2;
    r.STATUS_DENIED = 3;
    r.STATUS_FROZEN = 4;
    r.STATUS_ENABLE = 5;
    r.STATUS_SUSPEND = 10;
    r.STATUS_CANCEL = 17;
    r.STATUS_PREPARE_OK = 18;
    r.STATUS_PREPARE = 19;
    r.STATUS_DELETED = 20;
    r.SELECTOR_KEY_KEY = "+";
    r.SELECTOR_KEY_VAL = "-";
    r.DOWNLOAD_REPORT_LIMIT = 2e3;
    r.DOWNLOAD_REPORT_REQUIRE = {
        cam_order: [],
        prodtype_prod_order: ["product_type_name", "pname", "product_id"],
        order: [],
        prodtype_prod: ["product_type_name"],
        prodtype_prod_prodEffect: ["product_type_name", "product_id"],
        prodtype_prod_ptEffect: ["product_type_name"],
        cam_order_camEffect: ["campaignid"],
        cam_order_orderEffect: ["campaignid", "campaignname", "ordername", "orderid", "tid", "tname"],
        campaign: [],
        reportEffect: [],
        cam_order_camHuman: [],
        cam_order_ordHuman: [],
        product: [],
        settlement: []
    };
    r.APIPATH = a.apidomian ? "http://" + a.apidomian + "/ec" : "";
    r.datapath = r.APIPATH || "";
    r.HTMLPATH = t;
    r.PORTAL_PAGE = e ? "http://" + e + "/" : "";
    r.SURPPORT_PAGE = "http://support.qq.com/write.shtml?fid=922&ADPUBNO=";
    r.FLV_PLAYER = "http://qzs.qq.com/qzone/biz/res/qvplayerforatlas.swf";
    r.statusMap = {
        NORMAL: 1,
        PENDING: 2,
        DENIED: 3,
        FROZEN: 4,
        ENABLE: 5,
        SUSPEND: 10,
        CANCEL: 17,
        PREPARE_OK: 18,
        PREPARE: 19,
        DELETED: 20
    };
    r.createtiveNameMaxLeng = 40;
    r.FLV_PLAYER = "http://qzs.qq.com/qzone/biz/res/qvplayerforatlas.swf";
    r.NUMBERPACKET_MIN_NUMBER = 5e3;
    r.NUMBERPACKET_MIN_LOOKALIKE_NUMBER = 5e3;
    r.NUMBERPACKET_MAX_LOOKALIKE_NUMBER = 5e3;
    r.NUMBERPACKET_TYPEDEF = {
        7: "网址",
        8: "QQ号",
        15: "QQ群号",
        14: "IMEI号",
        16: "IFA号",
        17: "CookieID",
        18: "网址包",
        19: "网址",
        20: "网址",
        21: "QQ号",
        22: "Cookie",
        23: "IMEI",
        24: "IFA",
        28: "lookalike",
        29: "QQ群号",
        32: "IMEI号-MD5包",
        33: "IFA号-MD5包",
        dmp: "DMP"
    };
    r.CONVERSION_STATUS_ENABLED = 1;
    r.CONVERSION_STATUS_DISABLED = 2;
    r.CONVERSION_STATUS_SUSPEND = 10;
    r.CONVERSION_STATUS_DELETED = 20;
    r.CONVERSION_PLATFORM_PC = 1;
    r.CONVERSION_PLATFORM_MOBILE = 2;
    r.CONVERSION_TYPE_ACTIVATED = 1;
    r.CONVERSION_TYPE_REGISTERED = 2;
    r.CONVERSION_TYPE_PAID = 3;
    r.CONVERSION_TYPE_ORDER = 4;
    r.CONVERSION_TYPE_VIEW_PAGE = 5;
    r.CONVERSION_TYPE_ADD_TO_CART = 6;
    r.CONVERSION_TYPE_WEB_COBNSULTING = 7;
    r.CONVERSION_TYPE_TELEPHONE_DIRECT = 8;
    r.CONVERSION_TYPE_TELEPHONE_CALLBACK = 9;
    r.CONVERSION_TYPE_FORM_BOOKING = 10;
    r.CONVERSION_TYPE_START = 11;
    r.CONVERSION_TYPE_AWAKE = 12;
    r.CONVERSION_TYPE_RETENTION_2 = 13;
    r.CONVERSION_TYPE_RETENTION_3 = 14;
    r.CONVERSION_TYPE_RETENTION_7 = 15;
    r.CONVERSION_TYPE_SCORE = 16;
    r.CONVERSION_TYPE_SEARCH = 17;
    r.WEB_CONVERSION_STATUS_TO_BE_VERIFIED = 1;
    r.WEB_CONVERSION_STATUS_ALREADY_INSTALLED = 2;
    r.WEB_CONVERSION_STATUS_VERIFIED_FAILED = 3;
    r.CONVERSION_COUNT_MODE_UNIQUE = 1;
    r.CONVERSION_COUNT_MODE_ALL = 2;
    r.CONVERSION_RELATIONSHIP_AND = 1;
    r.CONVERSION_RELATIONSHIP_OR = 2;
    r.SITESET_DEF = {
        MOBILE: "15",
        MOBILE_INNER: "25",
        QQCLIENT: "9",
        QZONE: "1",
        PENGYOU: "8",
        WECHAT: "21",
        YINGYONGBAO_MOBILE: "22"
    };
    r.ieVersion = function () {
        var e = navigator.userAgent.toLowerCase(), t;
        t = parseInt((/msie (\d+)/.exec(e) || [])[1]);
        if (isNaN(t)) {
            t = parseInt((/trident\/.*; rv:(\d+)/.exec(e) || [])[1])
        }
        if (isNaN(t)) {
            t = -1
        }
        return t
    }();
    r.sizemap = {20: "20条", 50: "50条", 100: "100条"};
    r.appIdDef = {atlas: 293716, phoenix: 3004360};
    r.phoenixOrderEditPage = t + "ad/edit";
    r.phoenixOrderCreatePage = t + "ad/create";
    return r
});
define("js/config/accounttype", function () {
    var e = {
        0: {clsPrefix: "cash", fontCls: "c-red", key: "CASH"},
        1: {clsPrefix: "virtual", fontCls: "c-gre", key: "VIRTUAL"},
        2: {key: "SHARE"},
        3: {
            clsPrefix: "swop",
            fontCls: "c-yellow",
            tips: '只用于”应用宝换量应用”这种推广标的物的消耗，且推广"应用宝换量应用"时，优先消耗该账户的资金。',
            key: "MYAPP_CHARGE"
        },
        4: {
            clsPrefix: "swop",
            fontCls: "c-yellow",
            tips: '只用于”应用宝换量应用”这种推广标的物的消耗，且推广"应用宝换量应用"时，优先消耗该账户的资金。',
            key: "MYAPP_CONSUME"
        },
        5: {clsPrefix: "overdraft", fontCls: "c-yellow", tips: "当现金、虚拟账户中均没有余额后，消耗该账户的资金", key: "CREDIT"},
        6: {key: "PRIVILEGE"},
        7: {clsPrefix: "redsea", fontCls: "c-palered", tips: "只用于红海广告位的投放消耗，且投放红海广告位时，优先消耗该账户的资金。", key: "RED"},
        8: {clsPrefix: "bluesea", fontCls: "c-blue", tips: "只用于蓝海广告位的投放消耗，且投放蓝海广告位时，优先消耗该账户的资金。", key: "BLUE"},
        9: {
            clsPrefix: "cash",
            fontCls: "c-red",
            tips: "只用于微信／移动feeds广告位的投放消耗，且投放微信／移动feeds广告位时，优先消耗该账户的资金",
            key: "MOBILE_CASH"
        },
        10: {
            clsPrefix: "cash",
            fontCls: "c-red",
            tips: "只用于微信／移动feeds广告位的投放消耗，且投放微信／移动feeds广告位时，优先消耗该账户的资金",
            key: "MOBILE_PRIVILEGE"
        },
        11: {clsPrefix: "cash", fontCls: "c-red", tips: "只用于微信／移动feeds广告位的投放消耗，且投放微信／移动feeds广告位时，优先消耗该账户的资金"},
        15: {clsPrefix: "cash", fontCls: "c-red", tips: "CPD（按下载付费）广告，只能消耗该账户的资金", key: "CPD"},
        18: {
            clsPrefix: "appaccount",
            fontCls: "c-blue",
            tips: "只用于移动联盟站点的投放消耗，且投放移动联盟站点时，优先消耗该账户的资金",
            key: "MOBILE_ALLIANCE"
        },
        19: {clsPrefix: "yyzh", fontCls: "c-gre", tips: "只用于运营广告位的投放消耗，且投放运营广告位时，优先消耗该账户的资金"},
        20: {key: "SPONOR_CASH"},
        21: {key: "SPONOR_VIRTUAL"},
        22: {key: "SPONOR_SHARE"},
        23: {clsPrefix: "virtual", fontCls: "c-gre", key: "CPDVIRTUAL"},
        33: {clsPrefix: "xyj"},
        34: {clsPrefix: "roulette", fontCls: "c-blue"},
        42: {clsPrefix: "xyj"},
        100: {clsPrefix: "cash", fontCls: "c-red", tips: "CPT（按展示付费）广告，在消耗完现金账户资金后，也可消耗CPD可用金额", key: "CPT"},
        101: {clsPrefix: "virtual", fontCls: "c-gre", key: "CPTVIRTUAL"}
    }, t = {};
    for (var n in e) {
        if (e[n] && e[n]["key"]) {
            t[e[n]["key"]] = n
        }
    }
    return {accountTypeConfig: e, accountTypeDef: t}
});
define("js/config/lang", ["require", "js/modules/account", "jquery"], function (require) {
    "use strict";
    var e = require("js/modules/account"), $ = require("jquery");
    var t = {};
    t.index = {
        cashAccount: "广告主使用财付通充值的真实货币账户。",
        appAccount: "系统分配给每个广告主的虚拟货币账户，该账户内的虚拟货币由系统派发。",
        viewcount: "<strong>曝光量：</strong>广告被用户看到的次数<br /><strong>点击量：</strong>排除恶意点击后，广告被用户点击的次数",
        cost: "用户点击广告后产生的扣费",
        tradecount: "<strong>下单量：</strong>用户通过该广告链接到商品并产生下单行为的次数<br /><strong>成交量：</strong>用户通过该广告链接到商品并成功交易的次数",
        ctr: "有效点击量/曝光量",
        daybudget: "您可以为您的账户设置每日消费限额，用来控制广告预算。当您的广告当天消耗达到该限额时，广告将暂停投放。该限额为对现金账户及虚拟账户总消耗的限额。<br />消费限额修改后半小时方可生效。"
    };
    t.profile = {portrait: "若您的广告使用了明星肖像，需要在此上传“免责声明”或“明星形象使用授权书”", qualification: "除营业执照外，个别行业还需上传相关行业资质，如需要请在此上传。"};
    t.report = t.repoprt = {
        clickcount: "排除恶意点击后，广告被用户点击的次数",
        ordercount: "<strong>下单量：</strong>用户通过该广告链接到商品并产生下单行为的次数",
        turnover: "<strong>成交额：</strong>用户通过该广告链接到商品并成功交易的交易金额",
        ordertraderate: "成交量/下单量",
        daybudget: "为该推广计划下所有广告当日最高花费。当广告消耗超过限额后，将暂停该推广计划下的广告。",
        campaignStatus: "推广计划的当前状态说明。推广计划可能的状态包括：<br /><strong>启用</strong>：推广计划正常使用中<br /><strong>暂停</strong>：推广计划暂停使用，广告不可见",
        orderStatus: "广告的当前状态说明。广告可能的状态包括：<br /><strong>审核中</strong>：广告审核中，审核通过后才会获得展现<br /><strong>审核不通过</strong>：广告审核未通过，请修改广告内容或素材，重新审核<br /><strong>未到投放时间</strong>：审核已通过，广告将在指定投放时间进行投放<br /><strong>投放中</strong>：广告正常投放中<br /><strong>暂停</strong>：广告暂停投放<br /><strong>投放结束</strong>：广告投放结束",
        crulename: "自定义报表规则的名称，用于区分识别各不同报表规则。",
        rpttype: "报告类型用于指定要生成的报告基本信息类型，目前我们提供如下报告类型：<br /><strong>效果统计报告</strong>：用于基础的效果统计分析及汇总<br /><strong>人口学分析报告</strong>：用于分析广告点击人群的画像数据，方便您更好的使用定向条件，优化广告效果",
        dataobject: "数据纬度是指报表数据的最小汇总纬度，您可以选择要查看的最小数据纬度。<br />例如您只需要知道您的账户目前的总体推广情况，那么可以选择“账户”作为报表的数据纬度；<br />如果您需要知道每个推广计划的效果数据，那么您需要选择“推广计划”作为报表的数据纬度。",
        datetype: "日期范围是指报表包含的数据日期限定，包括：<br /><strong>昨天</strong>：报表生成日期前一天的数据；<br /><strong>最近一周</strong>：报表生成日期前一周的数据（不含当天）；<br /><strong>最近一个月</strong>：报表生成日期前一个月的数据（不含当天）；<br /><strong>自定义</strong>：自定义时间周期范围。",
        groupbytime: "时间粒度是指您查看报表的最小时间粒度，包括：<br /><strong>全段加和</strong>：把所有数据按照报表选定的日期范围加和展示；<br /><strong>按天查看</strong>：以天为粒度，汇总数据；<br /><strong>按小时查看</strong>：以小时为粒度，汇总数据。",
        period: "运行周期是指报表固定运行的时间，包括：<br /><strong>手动</strong>：规则不自动运行，需要手动触发运行；<br /><strong>每天</strong>：每天自动运行该规则；<br /><strong>每周一</strong>：每周一自动运行；<br /><strong>每月1号</strong>：每月的1号自动运行。",
        viewfield: "数据视图为生成报表的数据项构成。您可以根据需要选择您所需要的数据项进行展现。",
        condition: "筛选条件是指报表数据过滤条件，我们将为您过滤符合指定条件的数据进行加工处理。",
        emaillist: "请填写接收该报表规则生成报表的邮箱地址，同一报表规则最多支持5个接收邮箱。",
        usercityreport: "每天早上10点可查看前一天的数据，部分数据可能无法识别到市级，系统会显示到省级或“未知”",
        userreport: "每天早上9点可查看前一天的数据",
        viewcount: "广告被受众看到的次数",
        validclickcount: "排除了恶意点击后，广告被受众点击的次数",
        ctr: "点击率=点击量/曝光量*100%",
        middle_page_view_count: "落地页被受众看到的次数",
        middle_page_click_count: "排除了恶意点击后，落地页被受众点击的次数",
        middle_page_ctr: "落地页点击率=落地页曝光量/落地页点击量*100%",
        cpc: "点击均价=花费/有效点击量",
        download: ['受众通过该广告链接到APP产生下载并下载完成的行为数量，<a href="http://e.qq.com/faq/list054.html" target="_blank" class="view_more">了解更多</a>', {timeout: 2e3}],
        downloadrate: "下载率=下载量/有效点击量*100%",
        yyb_download_rate: "下载率=下载量/曝光量*100%",
        normalized_download_rate: "受众在该条广告上的客观下载率，反映广告的真实效果，屏蔽了一些由于场景曝光概率问题对下载率的影响",
        cost_per_download: "下载均价=花费/下载量",
        followcnt: ['受众通过该广告点击“关注”的行为数量，<a href="http://e.qq.com/faq/list054.html" target="_blank" class="view_more">了解更多</a>', {timeout: 2e3}],
        tradecount: ['依据不同的标的物类型，转化量的含义均不一样（对APP而言，安装量即为转化量），<a href="http://e.qq.com/faq/list054.html" target="_blank" class="view_more">了解更多</a>', {timeout: 2e3}],
        clicktraderate: "安装率（转化率）=安装量（转化量）/有效点击量*100%",
        cpt: "安装（转化）均价=花费/安装量（转化量）",
        activated_count: ['受众通过该广告链接到APP完成激活的行为数量，其中激活行为定义为APP在联网环境下的首次打开。<a href="http://bbs.e.qq.com/forum.php?mod=viewthread&tid=1404" target="_blank" class="view_more">了解更多</a>', {timeout: 2e3}],
        activated_rate: "下载激活率=激活量/下载量*100%",
        click_activated_rate: "点击激活率=激活量/点击量*100%",
        activated_price: "激活均价=花费/激活量",
        amount_cart: "产生加入购物车行为时，购物车中货品的总金额",
        amount_paid: "产生付费行为时，付费的总金额",
        cost: ['广告曝光，点击或转化后产生的扣费。<a href="http://e.qq.com/faq/list023.html" target="_blank" class="view_more">为什么同一时间段的广告花费和财务记录支出可能不一样？</a>', {timeout: 2e3}],
        navigation_count: "用户点击页面中导航按钮的数量",
        spent: ['<a href="http://e.qq.com/faq/list023.html" target="_blank" class="view_more">为什么同一时间段的广告花费和财务记录支出可能不一样？</a>', {timeout: 2e3}],
        viewcounttop: "曝光量排行榜是您所选时间范围内，曝光量排名前五位的广告，其中曝光占比是指该广告曝光量与账户曝光量之比",
        validclickcounttop: "点击量排行榜是您所选时间范围内，点击量排名前五位的广告，其中点击占比是指该广告点击量与账户点击量之比",
        ctrtop: "点击率排行榜是您所选时间范围内，点击率排名前五位的广告",
        costtop: "花费排行榜是您所选时间范围内，花费排名前五位的广告，其中消耗占比是指该广告花费与账户整体花费之比",
        praisecount: "广告被受众点赞的数量",
        commentcount: "广告被受众评论、回复的数量",
        forward_count: "广告被受众转发的数量",
        read_count: "广告被受众阅读的数量",
        key_page_view_count: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户访问了某一关键页面的转化行为数，即记为关键页面浏览量。",
        register_count: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户发生注册的转化行为数，即记为注册量。",
        add_to_car_count: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户将待买的商品加入购物车的转化行为数，即记为加入购物车量。",
        web_trade_count: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户下单但未完成交易的转化行为数，即记为下单量。",
        checkout_count: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户完成订单产生支付的转化行为数，即记为成交量。",
        page_consult: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户通过网页或唤起在线客户对话窗口进行咨询的转化行为数，即记为网页咨询量。",
        page_phone_call_direct: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户通过页面点击直接呼起电话拨打的转化行为数，即记为电话直拨量。",
        page_phone_call_back: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户在网页提交自己电话等待广告主回拨的转化行为数，即记为电话回拨量。",
        page_reservation: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户在网页上完成表单填写提交预约申请的转化行为数，即记为表单预约量。",
        app_register_count: ['受众通过该广告链接到APP内完成注册的行为数量。<a href="http://bbs.e.qq.com/forum.php?mod=viewthread&tid=1404" target="_blank" class="view_more">了解更多</a>', {timeout: 2e3}],
        app_add_to_car_count: ['受众通过该广告链接到APP内发起购买而未完成付费的行为数量。<a href="http://bbs.e.qq.com/forum.php?mod=viewthread&tid=1404" target="_blank" class="view_more">了解更多</a>', {timeout: 2e3}],
        app_checkout_count: ['受众通过该广告链接到APP内进行付费，完成交易的行为数量。<a href="http://bbs.e.qq.com/forum.php?mod=viewthread&tid=1404" target="_blank" class="view_more">了解更多</a>', {timeout: 2e3}],
        core_pos_ad_exposure: "此数据为该广告在核心广告位中的实际投放情况，从该条广告总量数据中分离得来。总量数据是核心广告位及非核心广告位总和。",
        core_pos_ad_download: "此数据为该广告在核心广告位中的实际投放情况，从该条广告总量数据中分离得来。总量数据是核心广告位及非核心广告位总和。",
        core_pos_ad_download_rate: "此数据为该广告在核心广告位中的实际投放情况，从该条广告总量数据中分离得来。总量数据是核心广告位及非核心广告位总和。"
    };
    t.order = {
        adtype: "广告形式包括普通广告、互动广告；互动广告支持用户直接完成互动操作",
        campaignid: "推广计划是广告的合集，类似电脑中的文件夹功能。您可以将推广平台、预算限额等条件相同的广告放入同一个推广计划中。<br/>目前，腾讯社交广告投放管理平台中，每个广告主最多可以设置500个推广计划。请根据账户推广计划数量限制，合理规划您的推广计划。",
        campaignname: "推广计划名称用来对您的推广计划进行标识，不会对外展示。",
        siteset: "投放平台：广告要投放的平台，例：Qzone、朋友网",
        daybudget: "投放限额：该推广计划下所有广告的预算控制。当消耗达限额所有广告自动暂停。",
        ordername: "广告的名称，用来对广告进行标识，不会对外展示。",
        linktype: "是您想要推广的目标，以及想呈现给用户的页面。请根据实际推广目标选择推广标的物。",
        orderlink: "为了统计更准确的效果信息，系统可能会自动在URL后添加安全无害的效果统计参数。",
        orderlink_weixin_url: "此商品广告展示在微信平台，点击跳转到微信外部的品牌页面；目前仅支持部分外部链接投放。",
        crtsize: ['<a href="http://e.qq.com/faq/list003.html" target="_blank" class="view_more">查看所有广告位</a>', {timeout: 2e3}],
        area: "投放区域：用户当前登录IP所在区域。",
        areaRestrict: "投放区域：用户当前登录IP所在区域。",
        age: "选择年龄定向区间，设置受众年龄的上下限。<br />由于国家政策，若投放酒类广告，系统只会向18岁以上受众展示。",
        ageseg: "选择年龄定向区间，设置受众年龄的上下限。<br />由于国家政策，若投放酒类广告，系统只会向18岁以上受众展示。",
        userstatus: "“已婚”结婚超过一年的用户；<br/>“单身”没有恋爱的对象处于单身状态的用户；<br/>“新婚”从有结婚计划（订婚等）行为开始至结婚一年以内的用户；<br/>“育儿”从有生育计划开始至小孩3岁以内的用户。",
        fee: "出价是指您对当前广告单次点击的最高出价，广告实际扣费将不会高于您设置的出价。",
        CPC: "按每次点击付费",
        CPA: "按每次下载付费",
        CPM: "按每千次曝光付费",
        oCPA: "您可以选择特定优化目标（例如：移动应用的激活），并提供期望平均转化成本，系统会根据您上报的转化数据，预估每一次展示的转化价值，自动出价，按照点击扣费。",
        connectiontype: "温馨提示：若您投放wap文字链广告，请不要选择此定向，会导致没有曝光",
        mobile: "选择投放到移动终端的操作系统，当此定向包应用到移动终端广告时，【不限】视为不进行过滤，否则，【不限】视为此项定向无意义。",
        ispother: '"其他"是指无法识别运营商的设备',
        targetpkg: "使用快捷定向，系统将按照所选定向包中的设置自动完成定向条件的选择",
        appuser: "您可以选择该广告的目标应用用户群体。",
        sitegroup: "如果您勾选“同时投放到第三方流量”复选框，系统将智能的将你的广告展示在相匹配的第三方流量站点上，为您获取更多的曝光和点击。",
        numberpackageinclude: "您的广告将仅投放到选定的人或目标场景中",
        numberpackageexclude: "排除用户：您的广告将不会投放到选定的人或目标场景中",
        consumption_ability: "“高消费”具有较强的经济实力，能够支付较高数额的费用（如汽车购买、房产等）的头部用户群体；<br/>“低消费”较低的经济能力，购物追求价格低廉，不追求品质。",
        weather: "通过选择最适合您商品推广的气象条件定位播放广告的定向，广告系统将为您优先推荐全国最适合您商品营销的地域播放广告。",
        dressindex: "根据自然环境对人体感觉温度影响最主要的天空状况、气温、湿度及风等气象条件，对人们适宜穿着的服装进行分级。您可以根据不同的指数对不同季节的服装推广。",
        makeupindex: "根据气象条件对人的皮肤的影响制定出来的指数，主要影响有温度、湿度、风速、紫外线强度，您可以根据不同的影响因素选择最适合您化妆品的化妆指数。",
        airqualityindex: "根据空气质量指数(AQI指数)对空气质量进行分级，空气质量按照空气质量指数大小分为六级，一级优，二级良，三级轻度污染，四级中度污染，五级重度污染，六级严重污染。您可以针对特定空气质量地区的用户进行推广",
        speedmode: "<strong>选择标准投放(推荐)</strong>，我们会优化您的广告的投放，让您的预算在设定的投放时段内较为平稳的消耗；<br /><strong>选择加速投放</strong>，广告会以较快的速度获得曝光，选择加速投放可能会导致您的预算较快的消耗尽。",
        campaignststus: "您对当前推广计划的操作，包括启用和暂停。但推广计划实际状态受账户余额及推广计划限额等的影响",
        campaignoperationtip: "您对当前推广计划的操作，包括启用和暂停",
        orderoperationtip: "您对当前广告的操作，包括启用和暂停。当广告处于审核中，审核不通过，投放结束等状态时，您不可对广告进行操作",
        campaignstatus: ['当前推广计划的实际状态，受账户限额，账户余额，推广计划限额等因素的影响。比如，当账户余额不足时，即使您人为开启推广计划，受余额不足的影响，计划实际上不会投放。<a href="http://e.qq.com/faq/list027.html" target="_blank">查看更多详情</a>', {timeout: 2e3}],
        orderstatus: ['广告的实际状态，受账户余额，账户限额，推广计划限额等因素的影响。比如，账户余额不足时，即使您人为开启广告，受余额不足影响，广告实际上不会投放。<a href="http://e.qq.com/faq/list027.html" target="_blank">查看更多详情</a>', {timeout: 2e3}],
        estimateUsercount: "基于当前定向条件，能覆盖的最大用户数。实际覆盖用户数还会受到出价和竞争格局影响。",
        estimateViewcount: "基于当前定向条件，能获得的最大曝光量。实际日曝光量还会受到出价和竞争格局影响。",
        suggestPrice: "推荐出价是广告基于当前定向条件，获得大概率展现所需要的出价。另外，当出价已具有较强竞争力时，系统将不再提供推荐价格。",
        keyword: "对指定关键词感兴趣的人群，在其浏览您指定的投放站点时进行投放。",
        keywordContext: "根据用户当前浏览页面内容对应的关键词进行定向投放",
        keywordUser: "根据用户最近浏览页面内容等信息，判断用户兴趣，定向投放到对指定关键词主题感兴趣的人群",
        exchange: ['“换量合作”是指开发者和腾讯互相利用资源优势推广对方移动端APP的合作模式。 开发者帮助腾讯公司推广腾讯公司 应用宝、手机QQ等软件，腾讯公司通过应用宝平台帮助开发者获取用户。<a href="http://wiki.open.qq.com/wiki/%E6%96%B0%E6%8D%A2%E9%87%8F%E4%BB%8B%E7%BB%8D" target="_blank">了解更多</a>', {timeout: 2e4}],
        industry_id: "请谨慎选择广告分类，否则会影响广告曝光。",
        sub_product_id: "渠道包用于管理移动应用的推广渠道，系统只显示渠道包版本不低于主线包版本的渠道包",
        addcreative: ['<a href="http://e.qq.com/faq/list086.html" target="_blank" class="view_more">点击了解多创意及多创意相关策略</a>', {timeout: 2e3}],
        watermark: "推广品牌形象、用户活动请选择“活动推广”；推广可在线交易的商品请选择“商品推广”",
        customer_define_invoke_url: ['<a href="http://e.qq.com/ads/faq/createad/015" target="_blank" title="了解应用直达">点击了解应用直达</a>', {timeout: 2e3}],
        smartOptimizer: "广告累积激活量＞100时，才可以使用。<br>系统为您提供自动优化效果的策略，请选择您的优化目标，并提供此模板的期望转化成本，按照点击扣费。",
        smartOptimizerTarget: "选择您期望优化的转化行为，系统会优先将您的广告展示给最有可能发生此转化行为的用户。",
        smartOptimizerPriceUnit: "提供您期望的平均激活成本，该出价用来跟其他的广告主进行竞价，出价高低会影响广告最终能够竞得的目标用户量，但并不是最终的扣费。",
        CORPORATE: "商标是帮助识别您产品或企业的形象标志，将与广告创意一起展示在您的广告上！",
        trackingUrl: "若落地页中已包含302跳转点击监测链接，则建议不要重复填写后台上报点击监测链接。否则会造成点击数据偏高。",
        core_position: "您需要填写获取这些用户的出价上限，系统会在出价上限内以动态合理的价格获取用户，以降低您的成本。您设置的出价上限越高，获取到的精准用户越多。",
        core_position_suggest_price: "建议出价为系统为您分析的合适价格，您可进行修改。"
    };
    t.linktypes = {
        1: "推广一个网站",
        2: "QQ商家资料卡是商家在QQ上免费展示商品、服务以及活动的信息页。广告主通过推广QQ商家资料卡，可以不用建站，就可以向目标用户传达丰富信息，并实现即时会话沟通",
        3: "营销QQ资料卡是企业在QQ上免费展示商品、服务以及活动的信息页。广告主通过推广企业QQ资料卡，可以不用建站，就可以向目标用户传达丰富信息，并实现即时会话沟通",
        4: "推广认证空间，包括首页、日志页、嵌入页等",
        8: "QQ群资料卡是广告主所推广群的介绍页面。广告主通过推广群资料卡，可以将目标用户引导加群，群聚客户实现高效转化，并达到口碑传播的效果。",
        9: "用于推广齐齐互动视频中的视频直播",
        10: "任务集市是针对开放平台APP设计的分发系统。广告主通过任务集市投放“自定义任务”，系统将任务曝光给匹配用户，引导用户进入应用完成该“任务”，并给完成“任务”的用户发放奖励。产品可有效帮助广告主在较短的时间内以可控的成本集中获得大量高质用户，很好的满足开服需求。",
        11: "推广在开放平台上架的PC APP",
        12: "推广在QQ空间送礼模块中上架的品牌定制的礼物",
        13: "推广在QQ空间签到模块中上架的品牌定制的签到",
        15: "推广在苹果应用市场App Store上架的App",
        16: ['“换量合作”是指开发者和腾讯互相利用资源优势推广对方移动端APP的合作模式。 开发者帮助腾讯公司推广腾讯公司 应用宝、手机QQ等软件，腾讯公司通过应用宝平台帮助开发者获取用户。<a href="http://wiki.open.qq.com/wiki/%E6%96%B0%E6%8D%A2%E9%87%8F%E4%BB%8B%E7%BB%8D" target="_blank">了解更多</a>', {timeout: 2e3}],
        17: "推广在腾讯开放平台上架的移动App",
        20: "任务集市是针对开放平台APP设计的分发系统。广告主通过任务集市投放“自定义任务”，系统将任务曝光给匹配用户，引导用户进入应用完成该“任务”，并给完成“任务”的用户发放奖励。产品可有效帮助广告主在较短的时间内以可控的成本集中获得大量高质用户，很好的满足开服需求。",
        26: "在微信流量上推广您的网站，选择相应推广类型，推广您的品牌活动或实物产品",
        30: "推广腾讯课堂，输入课堂ID号",
        35: "推广一条QQ消息",
        37: "仅在移动联盟流量上推广的App",
        40: "推广一个门店",
        41: "推广一篇文章"
    };
    t.remarketing = {
        visittype: ["<strong>到访定向</strong><br />简介：使当前广告只对那些在设定时间段内看过您网站指定页面的客户展现。<br /><br />注意事项：<br />1. 到访定向只能覆盖访问过您网站的指定人群，其曝光数量较低，建议只对单独新建的到访定向广告使用；<br />2. 到访定向与未到访定向为互斥关系，即一个广告不得同时选择到访定向和未到访定向；<br /><br /><a href='http://e.qq.com/help/guide_visit.html' target='_blank'>了解详情</a>", {timeout: 2e3}],
        unvisittype: ["<strong>未到访定向</strong><br /><br />简介：使当前广告只对那些在一定时间段内没有访问过您网站的客户投放。<br /><br />注意事项：<br /> 1. 该定向功能只有在安装完成访客定向标记代码成功后才能生效；<br />2. 未到访定向与到访定向为互斥关系，即一个广告不得同时选择到访定向和未到访定向；<br /><br /><a href='http://e.qq.com/help/guide_unvisit.html' target='_blank'>了解详情</a>", {timeout: 2e3}],
        pv: "<strong>网址定向页面PV数</strong><br /><br />该统计PV数为昨日访问过您安装了网址定向代码页面的人数，如果与您页面实际访问PV数差距较大，建议您检查网址定向标记代码是否正确安装。",
        url: "按网址添加将为您圈定访问过该网址的访客用户群",
        imgroup: "按QQ群号添加将限定您的广告投放至相应群中的广告位",
        imei: "按IMEI设备号添加将限定您的广告投放至相应手机设备场景中",
        xiangsudaima: "即对腾讯分析上报站点和统计时生成像素点的代码形式。为了保证统计数据的准确，请将腾讯分析统计代码放在其他代码之前，请将代码添加到网站全部页面的标签之前；若网站为框架式网站，请在框架集页面和子框架页面均安装统计代码，框架集页面中，请安装在标签前",
        rule_type: "说明：<br>IMEI号是安卓设备的设备ID，格式为15位的数字串，示例：355065053311001。IFA号为苹果设备的设备ID，格式为32位数字+字母串，用“—”杠分隔，示例：49E2084A-290C-41EF-AD20-E540CD6AE841。Cookie包为与广点通做cookie mapping后获得的cookie id号",
        lookalike: "<strong>1.智能扩展</strong><br>选择现有广告的点击/转化用户作为样本，广点通平台将分析用户特征，智能扩展出更多与之相似的人群，精准的人群能更有效地助您提升广告效果和曝光量。<br><strong>2.提取已有用户群</strong><br>选择创建已有计划中的（种子用户）<br>",
        recentclick: "使用中的已保存点击人群会每天自动更新为最新30天的数据",
        recenttranslate: "使用中的已保存转化人群会每天自动更新为最新90天的数据",
        chosenseednum: "为了提升扩展效果，用于扩展的种子人群覆盖数量不能少于5000人。少于5000人的种子将不会显示在该列表中。",
        lookalikenum: "最终生成的实际扩展结果可能与预估人数略有误差。扩展人群不包含种子。",
        estimateseednum: "保存人群需不少于5000人"
    };
    t.privilege = {
        admin: "拥有所有权限",
        observer: "可查看社交广告内所有数据",
        operator: "可查看社交广告内所有数据，进行广告投放相关的操作",
        treasurer: "可查看社交广告内所有数据，进行财务类操作"
    };
    t.targetPack = {
        use: ["<strong>简介：</strong>使用快捷定向，系统将按照所选定向包中的设置自动完成定向条件的选择" + "<br/>", "<strong>注意事项：</strong>使用快捷定向，将会将此广告与所选定向包关联：", "1.修改定向包中的设置，将会同步到与此定向相关联的所有广告中", "2.修改此广告的定向条件，将会解除与此定向包的关联，【快捷定向】将会重置为【不使用】状态 "].join("<br/>"),
        noPack: ["您目前没有可使用的定向包，可通过以下2种方式创建并使用定向包：", "1. 点击【定向管理】创建新定向包", "2. 在本页设置定向条件后点击【保存并关联以上定向】"].join("<br/>"),
        quickSave: "保存当前设置的定向为一个定向包，下次创建广告时您可以直接调用定向包，提高效率",
        "new": ["<strong>创建新定向：</strong>创建新的定向包。", "<strong>编辑：</strong>编辑修改定向包中的设置，将会同步到与此定向相关联的所有广告中。", "<strong>删除：</strong>删除操作将自动解除广告与此定向包的关联，广告状态以及广告的定向条件不变（删除定向包不能影响广告的状态，不能通过定向包来管理广告）。", "<strong>应用到广告：</strong>所选广告将使用并关联到此定向包。"].join("<br/><br/>")
    };
    t.targets = {
        userstatus2: "从有生育计划开始至小孩3岁以内的用户",
        userstatus4: "从有结婚计划（订婚等）行为开始至结婚一年以内的用户",
        userstatus8: "没有恋爱的对象处于单身状态的用户",
        userstatus9: "结婚超过一年的用户",
        userstatus10: "从有生育计划至小孩即将出生的用户",
        userstatus11: "家里有小孩，且小孩年龄在0-6个月的用户",
        userstatus12: "家里有小孩，且小孩年龄在6-12个月的用户",
        userstatus13: "家里有小孩，且小孩年龄在1-2岁的用户",
        userstatus14: "家里有小孩，且小孩年龄在2-3岁的用户",
        living_status2: "因工作需要而经常出差的商务人群",
        area_type1: "当前位置在该区域的人",
        area_type2: "长期居住在该区域的人",
        area_type3: "旅游或者出差来到该区域的人，并且常住地不在这里",
        lbs_type1: "近期位置在该区域的人",
        lbs_type4: "曾经出现在该位置的人",
        payment0: "指Q币充值，游戏付费等在线消费行为"
    };
    t.bubbleReport = {switchmode: ["这里可以切换到数据态，查看多个指标", {direction: "left", expire: -1}]};
    t.bubbleOrder = {switchpanel: ["想参照其他广告的文案？试试收起面板，已填写的内容不会被抹掉噢", {direction: "right", expire: -1, offsetY: 60}]};
    t.bubbleIndex = {
        switchsite: ["这里可以切换至任务集市系统", {
            direction: "bottom",
            expire: -1,
            offsetX: 50,
            condition: function () {
                return e.isTaskAduser()
            }
        }],
        qqkefu: ["有疑问？点击这里可以直接在线咨询企业QQ小伙伴哦", {
            direction: "right",
            doNotScrollWithPage: true,
            expire: -1,
            offsetY: 0,
            getInsertNode: function () {
                return $("#__extraAside").size() == 1
            }
        }]
    };
    t.message = {setup: "自定义对不同的消息类型设置邮箱，短信的接收方式"};
    t.account = {invoice_amount: "填写的发票金额需要满足以下条件：发票金额<=充值总额 -退款总额 -已开票金额 -已申请但未开票金额（以上均为所选充值月份的数据）"};
    t.dynamiccreative = {
        databases: "请选择一个您要推广的产品库",
        label: "可以选择多个标签，来筛选出您本次要推广的产品；标签之间取并集；",
        pageurl: "当您的广告需要使用监测参数来监测不同情况下的广告效果时，请使用该字段，并保证填写的参数中包含%%lpurl%%。填写完成后请务必点击“点击预览”按钮来确认参数的合法性。",
        title: "您可以自行输入文案，也可从产品库字段列表中选取一个或多个产品字段作为占位符。<br/>系统将根据广告实际展示的产品，拉取相应产品字段的值来替换占位符。<br/>如：最新款式，只售{{price}}元！"
    };
    return t
});
define("js/modules/tips", ["require", "js/config/lang", "jquery", "js/modules/common", "utils", "js/modules/route", "js/modules/account", "js/modules/sideslide", "js/modules/beautyui", "aduser", "js/modules/jquery.plugin"], function (require) {
    "use strict";
    var e = require("js/config/lang"), $ = require("jquery"), t = require("js/modules/common"), n = require("utils"), i = require("js/modules/route"), a = require("js/modules/account"), r = require("js/modules/sideslide"), o = require("js/modules/beautyui"), s = require("aduser"), l = {}, c = {}, u, d, f, p = 0;
    var m = 1e3, g = m + 1;
    require("js/modules/jquery.plugin");
    l.survey = function () {
        var e = t.getTime(), i = new Date(e).getDate(), a, o;
        if (e >= 14381856e5) {
            return false
        }
        if (n.storage.get("notice.surveyLink", "local") == i || n.storage.get("notice.surveyLink_off", "local")) {
            return false
        }
        n.storage.set("notice.surveyLink", i, {media: "local", expire: 864e5});
        a = '<div class="v2explain3">            <h2>邀请函</h2>            <span class="v2explain3-close __close">关闭</span>            <div class="v2explain3-main">                尊敬的客户，您好：                <p>为了提升广点通的产品与服务体验，我们诚挚邀请您参加2015年上半年客户满意度有奖调研，将您对广点通的意见和建议告诉我们。请您点击链接完成调研问卷：                <br><a href="http://exp.qq.com/ur/?urid=23074" target="_blank" id="surveyLink" data-hottag="atlas.notice.surveyLink_click">http://exp.qq.com/ur/?urid=23074</a>，精美大奖等您带走！</p>                <p>我们非常重视您的宝贵意见，也将为您在本次问卷中所提供的任何个人信息保密，真诚期待您的参与。</p>                <p style="text-align: right; margin-top: -10px;">腾讯社交与效果广告团队</p>            </div>        </div>';
        o = $(a);
        o.appendTo(document.body);
        r.maskLayout(m, document, {opacity: .7});
        o.find(".__close").bind("click", function () {
            o.remove();
            r.maskLayout.remove()
        });
        o.find("#surveyLink").bind("click", function () {
            n.storage.set("notice.surveyLink_off", 1, {media: "local", expire: 864e6})
        });
        t.reportHottag("atlas.notice.surveyLink_show");
        return true
    };
    c.locallock = function (e, t) {
        var i;
        try {
            i = localStorage.getItem(e)
        } catch (a) {
            i = n.storage.get(e, "local")
        }
        return i === t
    };
    c.locallock.update = function (e, t) {
        try {
            localStorage.setItem(e, t)
        } catch (i) {
            n.storage.set(e, t, {media: "local", expire: -1})
        }
    };
    c.firstTimeTip = function () {
        var e = $.cookie.get("firsttime"), t = false;
        e = parseInt(e, 10);
        if (e !== 0) {
            $.cookie.set("firsttime", 0, "e.qq.com", "/", 24 * 60);
            t = true
        }
        return t
    };
    /*c.init = function (e) {
     var n = e || {}, i = "", o = "", s, u, d = t.getTime(), f = 14467392e5, p = n.isIndex || false;
     if (!a.isYYBKAAduser()) {
     i = ['<div style="z-index: ' + g + '">', '<div class="guide-02 __step" rel="0">', '<div class="header">', "<p><strong>欢迎您登录腾讯社交广告投放管理平台！</strong></p>", "<p>经过以下步骤，即可开始投放广告</p>", "</div>", '<div class="body"></div>', '<div class="ft">', '<button class="btn btn-primary __over __toAccountEdit">开始补全账户资料</button>', '<button class="btn btn-default __next">暂时忽略，开始使用系统</button>', "</div>", "</div>", '<div class="guide">', '<div class="step1 none __step" rel="1"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="step2 topStep none __step" rel="2"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="step3 none __step" style="top:111px" rel="3"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="step4 none __step" rel="4"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="step5 none __step" rel="5"><a href="javascript:;" class="__next" alt="继续"></a></div>', '<a href="javascript:;" alt="开始体验》" rel="5" class="step4-2 __step __last __next" id="guide-step42" style="display:none">马上开始体验&nbsp;>></a>', "</div>", "</div>"].join("\r\n")
     } else {
     i = ['<div style="z-index: ' + g + '">', '<div class="guide-02 __step" rel="0">', '<div class="header">', "<p><strong>欢迎您登录腾讯社交广告投放管理平台！</strong></p>", "<p>经过以下步骤，即可开始投放广告</p>", "</div>", '<div class="body"></div>', '<div class="ft">', '<button class="btn btn-primary __over __toAccountEdit">开始补全账户资料</button>', '<button class="btn btn-default __next">暂时忽略，开始使用系统</button>', "</div>", "</div>", '<div class="guide">', '<div class="step1 none __step" rel="1"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="step3 none __step" style="top:111px" rel="2"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="step4 none __step" rel="3"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="step5 none __step" rel="4"><a href="javascript:;" class="__next" alt="继续"></a></div>', '<a href="javascript:;" alt="开始体验》" rel="4" class="step4-2 __step __last __next" id="guide-step42" style="display:none">马上开始体验&nbsp;>></a>', "</div>", "</div>"].join("\r\n")
     }
     if (!a.isYYBKAAduser()) {
     o = ['<div style="z-index: ' + g + '">', '<div class="guide">', '<div class="new-step1 topStep none __step" rel="0"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="new-step2 none __step" rel="1"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="new-step3 none __step" style="top:111px" rel="2"><a href="javascript:;" class="__next" alt="继续"></a></div>', '<a href="javascript:;" alt="开始体验》" rel="2" class="step4-2 __step __last __next" id="guide-step42" style="display:none">马上开始体验&nbsp;>></a>', "</div>", "</div>"].join("\r\n")
     } else {
     o = ['<div style="z-index: ' + g + '">', '<div class="guide">', '<div class="new-step2 none __step" rel="0"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="new-step3 none __step" style="top:111px" rel="1"><a href="javascript:;" class="__next" alt="继续"></a></div>', '<a href="javascript:;" alt="开始体验》" rel="1" class="step4-2 __step __last __next" id="guide-step42" style="display:none">马上开始体验&nbsp;>></a>', "</div>", "</div>"].join("\r\n")
     }
     s = !c.locallock("greenhand", "0");
     u = !c.locallock("indexhand", "0");
     if (p && s && self == parent) {
     var h;
     r.maskLayout(m, null, {opacity: .7});
     h = $(i);
     h.attr("id", c.id);
     h.appendTo(document.body);
     c.bindevent();
     c.showstep(0);
     c.locallock.update("greenhand", "0");
     c.locallock.update("indexhand", "0");
     return true
     } else if (p && u && d < f && self == parent) {
     var h;
     r.maskLayout(m, null, {opacity: .7});
     h = $(o);
     h.attr("id", c.id);
     h.appendTo(document.body);
     c.bindevent();
     c.showstep(0);
     setTimeout(function () {
     c.setStepTop(0)
     }, 300);
     c.locallock.update("indexhand", "0");
     return true
     } else {
     return l.survey()
     }
     };*/
    c.id = "__gdt_greenhand";
    c.showstep = function (e) {
        var t = $("#" + c.id);
        t.find(".__step").addClass("none");
        t.find("[rel=" + e + "]").removeClass("none");
        if (e === 1) {
            $("#main").css({height: "100%", overflow: "inherit"})
        }
    };
    c.setStepTop = function (e) {
        var t = $("#orderofWrap"), n = 0;
        if (t.length > 0 && (e == 0 || e == 1)) {
            n = parseInt(t.offset().top) || 0;
            if (n > 120) {
                $("#" + c.id).find(".topStep").css({top: n - 120})
            }
        }
    };
    c.bindevent = function () {
        var e = $("#" + c.id);
        e.delegate(".__next", "click", function (e) {
            c.nextstep(e.target)
        });
        e.delegate(".__over", "click", function (e) {
            c.clear()
        });
        e.delegate(".__toAccountEdit", "click", function (e) {
            i.toPage("tool/profile?act=edit")
        })
    };
    c.nextstep = function (e) {
        var t;
        e = $(e);
        if (!e.hasClass("__step")) {
            e = e.parents(".__step")
        }
        t = e.attr("rel");
        c.setStepTop(t);
        if (e.hasClass("__last")) {
            c.clear()
        } else {
            t++;
            c.showstep(t);
            $("#guide-step42").show()
        }
    };
    c.clear = function () {
        r.maskLayout.remove();
        $("#" + c.id).remove();
        t.resizeMainDivHeightToMatchWin()
    };
    d = function () {
        return true
    };
    u = function ($) {
        var e = t.getTime(), i = new Date(e).getDate(), a = new Date("2017-1-1 00:00:00").getTime(), o = new Date("2017-1-20 23:59:59").getTime(), l;

        function c() {
            if (e >= o || e <= a) {
                return false
            }
            if (s.agid != 0) {
                return false
            }
            if (n.storage.get("notice.letterTips", "local") == i) {
                return false
            }
            u();
            return true
        }

        function u() {
            var e = '<div style="height:430px" class="v2explain">                            <p class="lace"></p>                            <div style="height:370px" class="main">                            <h3 style="width:120px">尊敬的广告主：</h3>                            <p class="line2" style="text-indent:2em">您好，由于腾讯社交广告业务的所属公司——北京腾讯文化传媒有限公司将于2017年进行税号更换，请务</p>                            <p class="line2">必在1月15日前提前完成发票申请，谢谢！</p>                            <p class="line2" style="text-indent:2em">本次税号更换的影响如下，请广告主注意：</p>                            <p class="line2">（1）自2017年1月15日起暂停开具发票，直至变更税号完毕；</p>                            <p class="line2">（2）1月15日以后申请的发票，将会在税号变更完毕后启用新税号进行开具；</p>                            <p class="line2">（3）1月15日之前已开出发票请广告主收到发票后，务必及时在1月31日前进行认证，逾期有可能腾讯侧的税号已经变更，原发票无法认证；</p>                            <p class="line2">（4）税号变更成功的日期目前无法确认，预计待税号变更成功后再另行通知。</p>                            <p class="line2"><br/></p>                            <p class="line2" style="text-align:right">腾讯社交与效果广告平台</p>                            <p class="line2" style="text-align:right">2017年1月1日</p>                            <a href="javascript:;" class="nod _js_goprofile" style="width:200px;margin:5px auto 0 auto;" data-link="tool/profile">我知道了</a>                            </div>                            <p class="lace"></p>                        </div>';
            l = $(e);
            l.appendTo(document.body);
            r.maskLayout(m, document, {opacity: .7});
            l.on("click", "._js_goprofile", function () {
                n.storage.set("notice.letterTips", i, {media: "local", expire: 3600 * 24 * 1e3});
                t.reportHottag("atlas.notice.gotoprofile");
                l.remove();
                r.maskLayout.remove()
            })
        }

        return c
    }($);
    function h(t) {
        t = t || document.body;
        var i = $("._bubble", t);
        if (i.length < 1 && p < 40) {
            p++;
            setTimeout(function () {
                h(t)
            }, 500)
        } else {
            i.each(function (t, i) {
                var a = this.getAttribute("rel") || "", r, s, l, c;
                if (n.storage.get(a, "local")) {
                    return
                }
                r = a.split(".");
                c = e[r[0]][r[1]];
                if ($.type(c) == "array") {
                    s = c[0];
                    l = c[1] || {}
                } else {
                    s = c
                }
                if (l.condition && !l.condition()) {
                    return
                }
                l.buttonEvt = function (e) {
                    return function () {
                        n.storage.set(e, 1, {media: "local", expire: -1})
                    }
                }(a);
                l.oninit = function () {
                    if (!l.doNotScrollWithPage) {
                        this.setAttribute("data-top", this.style.top);
                        $("#main").bind("scroll", function (e) {
                            return function () {
                                var t = parseInt(e.getAttribute("data-top"), 10);
                                e.style.top = t - this.scrollTop + "px";
                                n.log(e.getAttribute("data-top"), t, e.style.top)
                            }
                        }(this))
                    }
                };
                l.insertNode = l.getInsertNode && l.getInsertNode() || $("#main").get(0) || document.body;
                o.showBubble(i, s, l)
            })
        }
    }

    function v(n) {
        var i = n.attr("rel"), a = n.attr("data-tip"), r, o, s, l, c, u, d = null, p, m;
        if (i || a) {
            if (a) {
                s = a;
                c = n.attr("data-tip-timeout") ? n.attr("data-tip-timeout") : -1
            } else {
                r = i.split(".");
                o = e[r[0]][r[1]];
                if ($.type(o) == "array") {
                    s = o[0];
                    l = o[1] || {}
                } else {
                    s = o
                }
                c = l && l.timeout ? l.timeout : -1
            }
            if (f) {
                f = null
            }
            p = function (e) {
                var e = e || "";
                if (!e) {
                    return false
                }
                try {
                    clearTimeout(d)
                } catch (t) {
                }
                d = setTimeout(function () {
                    var t = $("#" + e + "_contain"), n = t.find(".bubble_help"), i = 0, a = 0;
                    if (t.length > 0 && n.length > 0) {
                        i = parseInt(t.height()) || 0;
                        a = parseInt(n.height()) || 0;
                        if (a - i >= 4) {
                            t.css("height", a)
                        }
                    }
                }, 30)
            };
            u = c > 0 ? function (e) {
                n.bind("mouseout", function () {
                    f = e;
                    setTimeout(function () {
                        t.hideBubble(e)
                    }, c)
                });
                p(e)
            } : function (e) {
                n.bind("mouseout", function () {
                    t.hideBubble(e)
                });
                p(e)
            };
            m = c > 0 ? false : true;
            t.showBubble(n.get(0), '<div class="bubble_help">' + s + "</div>", {
                timeout: -1,
                onLoad: u,
                noCloseButton: m,
                noQueue: true
            })
        }
    }

    return {
        Greenhand_id: c.id, init: function (e) {
            if (d()) {
                //if (!c.init(e)) {
                //    u()
                //}
                h();
                this.initYellowHint()
            }
        }, initPageBubble: h, initYellowHint: function (e) {
            $(e || document.body).on("mouseover", ".ico-help,._yellowtip,.ico-strongwarn", function (e) {
                v($(e.currentTarget));
                return false
            })
        }
    }
});
define("js/modules/beautyui", ["require", "jquery"], function (require) {
    var e = "loading-bg", t = {}, $ = require("jquery");
    t.showLoading = function (n, i) {
        i = i || {};
        typeof n === "string" && (n = $("#" + n));
        $(n).addClass(e);
        i.minHeight && $(n).css("min-height", i.minHeight);
        i.timeout && setTimeout(function () {
            t.hideLoading(n)
        }, i.timeout)
    };
    t.hideLoading = function (t) {
        typeof t === "string" && (t = $("#" + t));
        $(t).removeClass(e)
    };
    t.showBubble = function (e, t, n) {
        var i, a, r, o, s, l, c, u, d, f, p, m, g, h = 34, v = 28, _ = {}, y, b, w = [];
        typeof e === "string" && (e = $(e));
        n = n || {};
        u = n.direction || "left";
        p = n.buttonTxt || "我知道了";
        m = n.buttonEvt || function () {
            };
        o = typeof n.top !== "undefined" ? n.top : "inherit";
        s = typeof n.left !== "undefined" ? n.left : "inherit";
        c = typeof n.bottom !== "undefined" ? n.bottom : "inherit";
        l = typeof n.right !== "undefined" ? n.right : "inherit";
        d = n.offsetY || 0;
        f = n.offsetX || 0;
        g = n.insertNode || document.body;
        b = n.position || "fixed";
        y = function () {
            var e = [], n = _[u] || {css: "", top: 0, left: 0};
            e.push('<div class="_bubbleWrap b-hint ' + n.css + '" style="z-index:1000000;position:' + b + ";top:" + n.top + "px;left:" + n.left + 'px;">');
            e.push("<p>" + t + "</p>");
            e.push('<a href="javascript:;" onclick="return false" class="nod s-button-right _btn">' + p + "</a>");
            e.push('<i class="b-hint-arrow"></i>');
            e.push("</div>");
            return e.join("")
        };
        i = e.getBoundingClientRect();
        var A = $(y()).css({visibility: "hidden", position: "absolute", left: "-999em"}).appendTo(document.body);
        a = A.get(0).getBoundingClientRect();
        A.remove();
        _ = {
            top: {css: "b-hint-t", top: i.top - a.height - h - d, left: i.left + f},
            right: {css: "b-hint-r", top: i.top + d, left: i.right + v + f},
            bottom: {css: "b-hint-b", top: i.bottom + h + d, left: i.left + f},
            left: {css: "b-hint-l", top: i.top + d, left: i.left - a.width - v - f}
        };
        w = y();
        r = $(w);
        r.appendTo(g).find("._btn").bind("click", function (e) {
            $(this).parents("._bubbleWrap").remove();
            m.call(this)
        });
        n.oninit && n.oninit.call(r.get(0))
    };
    t.hideBubble = function (e) {
    };
    t.showLoadError = function (e, t, n) {
        e = $.type(e) === "string" ? $("#" + e) : e;
        e.html('<p class="loadfail">信息加载失败，点击<a href="javascript:;" onclick="return false" class="_retry">重试</a><p>');
        t = t || function () {
            };
        e.find("._retry").bind("click", function () {
            t();
            return false
        })
    };
    return t
});
define("hermes/cgi/comm", ["jquery", "utils", "widget/cookie"], function ($, e) {
    function t(e) {
        var e = $.cookie("skey"), t = 5381;
        if (!!e) {
            for (var n = 0, i = e.length; n < i; ++n) {
                t += (t << 5) + e.charCodeAt(n)
            }
        }
        return t & 2147483647
    }

    function n(e, n, i) {
        var a, r, o;
        i = i || {};
        i.base = i.base || "/hermes/api.php?mod={mod}&act={act}";
        a = i.base;
        if (!(e && n)) {
            o = "/hemers/api.php?"
        } else {
            a = a.replace(/\{mod\}/g, e).replace(/\{act\}/g, n);
            r = [];
            if ($.type(i.extr) === "object") {
                $.each(i.extr, function (e, t) {
                    r.push(e + "=" + encodeURIComponent(t.toString()))
                });
                if (r.length > 0) {
                    a += "&" + r.join("&")
                }
            }
            o = a
        }
        if (!i.noCommParams) {
            o = o + "&unicode=true&g_tk=" + t()
        }
        if ($.type(i.handler) === "function") {
            o = i.handler(o)
        }
        return o
    }

    function i() {
        var e = arguments[1] || "";
        typeof console != "undefined" && console && console.log(e)
    }

    function a(t, a, r) {
        var o = n(t, a, r);
        return function (s, l) {
            var c = {
                url: o,
                data: {},
                success: s,
                error: i,
                report: {cgi: n(t, a, {noCommParams: true, base: r && r.base ? r.base : ""})}
            };
            $.extend(c, l);
            e.io.get(c)
        }
    }

    function r(t, a, r) {
        var o = n(t, a, r);
        return function (s, l) {
            var c = {
                url: o,
                data: {},
                success: s,
                error: i,
                report: {cgi: n(t, a, {noCommParams: true, base: r && r.base ? r.base : ""})}
            };
            $.extend(c, l);
            e.io.post(c)
        }
    }

    return {getURL: n, loader: a, sender: r, fallback: i, csrfToken: t}
});
define("js/services/common", ["require", "aduser", "hermes/cgi/comm", "js/config/env", "jquery", "utils", "js/modules/uuid", "spa.monitor"], function (require) {
    "use strict";
    var e = require("aduser"), t = require("hermes/cgi/comm"), n = require("js/config/env"), i = e.aduid, $ = require("jquery"), a = $.extend({}, t), r = {
        cid: "campaignid",
        cname: "campaignname",
        ctype: "campaigntype",
        day_budget: "daybudget",
        mid: "mid",
        asiteset_str: "sitesetstr",
        aid: "orderid",
        aname: "ordername",
        asiteset: "siteset",
        link_target_frozen: "linktarget",
        link_type_frozen: "linktype",
        meta_class: "metaclass",
        third_id: "third_id",
        cost_type: "feetype",
        cost_price: "feeprice",
        dest_url: "orderlink",
        atimeset_frozen: "timeset"
    }, o = "/ec/api.php?mod={mod}&act={act}", s = require("utils"), l = require("js/modules/uuid"), c = require("spa.monitor");

    function u() {
        var e = arguments[1] || "";
        s.log(e)
    }

    function d(e) {
        //c.cgi({
        //    data: {
        //        owner: i || "",
        //        source: "atlas",
        //        cgi: e.cgiUrl,
        //        method: e.type || "",
        //        params: e.data,
        //        responsetext: e.response,
        //        ret: e.response && typeof e.response.ret != "undefined" ? e.response.ret : "",
        //        time: e.spentTime,
        //        content: e.mod && e.act ? "mod=" + e.mod + "&act=" + e.act : "",
        //        invoice_id: l.get()
        //    }, batchReport: true, useSendBeacon: true
        //})
    }

    function f(e, t, n) {
        var i = a.getURL(e, t, n);
        return function (n, a) {
            var r = {url: i, data: {}, success: n, error: u};
            var o = (new Date).getTime();
            $.extend(r, a);
            var l = s.io.get(r);
            l.always(function (n) {
                n = n || {};
                d({
                    cgiUrl: i,
                    type: "post",
                    data: r.data,
                    spentTime: Math.ceil((new Date).getTime() - o),
                    response: n,
                    mod: e,
                    act: t
                })
            });
            return l
        }
    }

    function p(e, t, n) {
        var i = a.getURL(e, t, n);
        return function (n, a) {
            var r = {url: i, data: {}, success: n, error: u};
            $.extend(r, a);
            var o = (new Date).getTime();
            var l = s.io.post(r);
            l.always(function (n) {
                n = n || {};
                d({
                    cgiUrl: i,
                    type: "get",
                    data: r.data,
                    spentTime: Math.ceil((new Date).getTime() - o),
                    response: n,
                    mod: e,
                    act: t
                })
            });
            return l
        }
    }

    //$.each(["loader", "sender"], function (e, n) {
    //    a[n] = function (e, a, r) {
    //        r = r || {};
    //        r.base = r.base || o;
    //        if (r.base && i && r.base.indexOf("owner=") == -1) {
    //            r.base += (r.base.indexOf("?") > 0 ? "&" : "?") + "owner=" + i
    //        }
    //        var s = n == "sender" ? p(e, a, r) : f(e, a, r);
    //        var l;
    //        if (n == "sender") {
    //            l = function (i, o) {
    //                o = o || {};
    //                var s = o.data || {}, l, c = $.extend({}, r);
    //                if (s.post_format == "json") {
    //                    $.extend(o, {data: JSON.stringify(s), contentType: "application/json", dataType: "json"})
    //                }
    //                c.base += (c.base.indexOf("?") > 0 ? "&" : "?") + "post_format=json";
    //                l = t[n](e, a, c);
    //                l(i, o)
    //            }
    //        }
    //        return l || s
    //    }
    //});
    a.transformFromCgi = function (e) {
        var t = r, i = {}, a = [];
        e = $.extend(true, {}, e);
        $.each(t, function (e, t) {
            i[t] = e
        });
        $.each(e, function (t, n) {
            var a;
            a = i[t];
            if (a) {
                e[a] = n
            }
        });
        $.each(e, function (n, i) {
            var a, r;
            r = n.replace(/\[\d{1,3}\]/, "[{CRTSIZE}]");
            if (r in t) {
                a = t[r];
                e[a] = i
            }
        });
        $.each(e.creatives || {}, function (t, i) {
            a.push(t);
            if (!e.crt_type) {
                $.each(i, function (t, i) {
                    if (i.status == n.STATUS_DELETED) {
                        return
                    }
                    e.crt_type = i.crt_type;
                    return false
                })
            }
        });
        e.crt_size = a.join("-");
        return e
    };
    a.getURL = function (e, n, a) {
        a = a || {};
        a.base = a.base || o;
        a.base += (a.base.indexOf("?") > 0 ? "&" : "?") + $.param({owner: i});
        return t.getURL(e, n, a)
    };
    a.setTimeRpt = function (e, t) {
        e = e || {};
        t = t || false;
        var n = e.selected_list || [], i = $.inArray("time", n);
        if (e.sdate && e.edate) {
            if (e.sdate == e.edate) {
                e.time_rpt = 1
            } else {
                e.time_rpt = 0
            }
            if (t) {
                e.time_rpt = 0
            }
        }
        if (e && !e.time_rpt && e.format == "xls" && i > -1) {
            e.selected_list.splice(i, 1, "statsdate")
        }
        return e
    };
    return a
});
define("js/services/account", ["require", "jquery", "hermes/comm/formater", "js/config/accounttype", "js/services/common", "js/modules/account"], function (require) {
    "use strict";
    var $ = require("jquery"), e = require("hermes/comm/formater"), t = require("js/config/accounttype"), n = require("js/services/common"), i = require("js/modules/account"), a = {};
    var r = t.accountTypeDef;
    var o = "/ec/api.php?mod={mod}&act={act}", s = {
        parseData: function (t) {
            if (t && $.isArray(t.accounts) && !t.hasParse) {
                t.hasParse = true;
                t.day_budget = e.scientific(t.day_budget / 100);
                t.daily_cost = e.scientific(t.daily_cost / 100);
                t.cpd_day_budget = e.scientific(t.cpd_day_budget / 100);
                t.cashAccount = {};
                t.virtualAccount = {};
                $.each(t.accounts, function (e, n) {
                    if (n && n.app_id == r.CASH) {
                        t.cashAccount = n
                    } else if (n && n.app_id == r.VIRTUAL) {
                        t.virtualAccount = n
                    }
                    if (n) {
                        n.daily_cost = parseFloat((n.daily_cost / 100).toFixed(2));
                        n.balance = parseFloat((n.balance / 100).toFixed(2))
                    }
                })
            }
            return t
        },
        isAmountEnough: function (e) {
            var t = e || {};
            return !t.fund_not_enough
        },
        didReachLimit: function (e) {
            return e && e.reach_day_budget
        },
        isNearLimit: function (e) {
            return e && e.day_budget_alarm_flag
        },
        setDaybudget: n.sender("account", "setdaybudget", {base: o}),
        setCPADaybudget: n.sender("account", "setcpadaybudget", {base: o}),
        transferToWX: n.sender("account", "mpboundtransfer", {base: o}),
        charge: n.sender("account", "charge", {base: o}),
        codecharge: n.sender("account", "wechatcodecharge", {base: o}),
        midasCharge: n.sender("account", "midascharge", {base: o}),
        setBillorder: n.sender("account", "setbillorder", {base: o}),
        getDashboard: function (e, t) {
            var i = e || function () {
                }, r = $.extend(true, {
                cache: true,
                cacheMedia: "memory",
                cacheExpire: 6e4,
                ozid: 400400
            }, t), s = n.loader("account", "dashboard", {base: o});
            if (r.reload || $.isEmptyObject(a)) {
                delete r.reload;
                s(function (e) {
                    var e = e || {};
                    i(e);
                    if (e.ret == 0) {
                        a = $.extend(true, {}, e)
                    }
                }, r)
            } else {
                i($.extend(true, {}, a))
            }
        }
    };
    return s
});
define("js/services/message", ["require", "js/services/common", "jquery"], function (require) {
    "use strict";
    var e = require("js/services/common"), $ = require("jquery");
    var t = "/ec/api.php?mod={mod}&act={act}", n = e.loader("message", "list", {base: t}), i = e.sender("message", "setread", {base: t}), a = e.sender("message", "del", {base: t}), r = e.sender("aduser", "acceptservice", {base: t}), o = 1, s = 0, l = 0, c, u;

    function d(e, t, i) {
        var a;
        e = e || {};
        a = {page: 1, pagesize: 10};
        $.extend(a, e);
        return n(t, {data: a, error: i})
    }

    u = {
        getCurSel: function () {
            return {status: l, cate: s}
        }, changeStatus: function (e, t) {
            l = e;
            u.getList(0, s, t)
        }, getList: function (e, t, n) {
            var i;
            n = n || $.noop;
            e = e || 0;
            o = e ? o : 1;
            t = s = t || s || 0;
            i = o = o + e;
            d({status: l, cateid: t, page: i, pagesize: 9}, function (e) {
                if (e.ret === 0) {
                    var i = e.data, a = {};
                    $.each(i.list, function (e, t) {
                        a[t.msgid] = t
                    });
                    c = a
                }
                n(e, t)
            })
        }, getNewMessage: function (e, t) {
            e = e || 0;
            t = t || $.noop;
            d({status: 1, cateid: e, page: 1, pagesize: 10}, function (e) {
                t(e)
            })
        }, read: function (e, t) {
            i(function (n) {
                if (n.ret === 0) {
                    c[e].status = 2;
                    t()
                }
            }, {data: {msgid: e}})
        }, getMsgDataById: function (e) {
            return c && c[e] ? c[e] : ""
        }, deleMsgById: function (e, t, n) {
            if (e) {
                a(function (e) {
                    if (e && e.ret == 0) {
                        t()
                    } else {
                        n(e)
                    }
                }, {data: {msgid: e}, error: n})
            }
        }, acceptService: function (e, t, n) {
            if (e) {
                r(function (e) {
                    if (e && e.ret == 0) {
                        t()
                    } else {
                        n(e)
                    }
                }, {data: {verifier: e || ""}, error: n})
            }
        }
    };
    return u
});
define("js/services/user", ["require", "js/services/common", "jquery"], function (require) {
    "use strict";
    var e = require("js/services/common"), $ = require("jquery");
    var t = e.loader;
    var n = e.sender;
    var i = "/ec/api.php?mod={mod}&act={act}", a = "aduser", r = null;
    return {
        getRegistInfo: function (e, n, o) {
            o = o || false;
            var s, l;
            n = n || {};
            l = n.error || e;
            if (!r || o) {
                r = $.Deferred();
                s = t(a, "reginfo", {base: i});
                s(function (e) {
                    r.resolve(e)
                }, $.extend({}, n, {
                    error: function (e) {
                        r.reject(e)
                    }
                }))
            }
            r.done(e).fail(l)
        },
        getIndustryList: t("utilities", "getadvertiserindustryconf", {base: i}),
        getQualificationConf: t("utilities", "getqualificationconf", {base: i}),
        getRzName: t("order", "getrzname", {base: i}),
        editClientAtlas: n(a, "modify", {noDefErr: 1, base: i}),
        getQuotaLimit: t(a, "getquota", {base: i}),
        modifyIdentity: n(a, "modifyidentity", {noDefErr: 1, base: i}),
        getInfo: t(a, "info", {base: i})
    }
});
define("js/config/report", ["require", "exports", "hermes/comm/formater", "aduser"], function (require, e) {
    var t = require("hermes/comm/formater"), n = require("aduser"), i = false;
    try {
        if (n.privilege.ka_advertiser) {
            i = true
        }
    } catch (a) {
    }
    e = {};
    e.fields = {
        campaignname: {label: "计划名称"},
        campaignid: {label: "计划ID"},
        ordername: {label: "广告名称"},
        orderid: {label: "广告ID"},
        pname: {label: "标的物名称"},
        product_id: {label: "标的物ID"},
        statsdate: {label: "时间"},
        area: {label: "地区"},
        city: {label: "城市"},
        gender: {label: "性别"},
        age: {label: "年龄"},
        medium_id: {label: "媒体ID"},
        ad_position_id: {label: "广告位ID"},
        status: {label: "状态", isPercent: false, canSum: false},
        operation: {label: "操作", isPercent: false, canSum: false},
        statstime: {
            label: "日期", formatHandler: function (e) {
                return t.timerange(e.statsdate)
            }
        },
        viewcount: {
            label: "曝光量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.viewcount, 0)
            }
        },
        validclickcount: {
            label: "点击量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.validclickcount, 0)
            }
        },
        ctr: {
            label: "点击率", isPercent: true, sumHandler: function (e) {
                var n = "-";
                if (e.validclickcount != "-" && e.viewcount != "-") {
                    n = t.divide(e.validclickcount, e.viewcount, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.ctr, 2)
            }
        },
        middle_page_view_count: {
            label: "落地页曝光量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.middle_page_view_count, 0)
            }
        },
        middle_page_click_count: {
            label: "落地页点击量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.middle_page_click_count, 0)
            }
        },
        middle_page_ctr: {
            label: "落地页点击率", isPercent: true, sumHandler: function (e) {
                var n = "-";
                if (e.middle_page_click_count != "-" && e.middle_page_view_count != "-") {
                    n = t.divide(e.middle_page_click_count, e.middle_page_view_count, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.middle_page_ctr, 2)
            }
        },
        orgcost: {
            label: "应扣额", canSum: true, formatHandler: function (e) {
                return t.scientific(t.divide(e.orgcost, 100, 2))
            }
        },
        cost: {
            label: "花费", canSum: true, formatHandler: function (e) {
                return t.scientific(t.divide(e.cost, 100, 2))
            }
        },
        cpc: {
            label: "点击均价", sumHandler: function (e) {
                var n = "-";
                if (e.cost != "-" && e.validclickcount != "-") {
                    n = t.divide(e.cost, e.validclickcount, 2)
                }
                return n
            }, formatHandler: function (e) {
                return t.scientific(t.divide(e.cpc, 100, 2))
            }
        },
        daybudget: {
            label: "限额", formatHandler: function (e) {
                return t.scientific(t.divide(e.daybudget, 100, 0))
            }
        },
        price: {
            label: "出价", formatHandler: function (e) {
                return t.scientific(t.divide(e.price, 100, 2))
            }
        },
        bid_amount: {
            label: "出价", formatHandler: function (e) {
                return t.scientific(t.divide(e.bid_amount, 100, 2))
            }
        },
        clicktraderate: {
            label: "安装率（转化率）", isPercent: true, canSum: true, sumHandler: function (e) {
                var n = "-";
                if (e.tradecount != "-" && e.validclickcount != "-") {
                    n = t.divide(e.tradecount, e.validclickcount, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.clicktraderate, 2)
            }
        },
        activated_count: {
            label: "激活总量", isPercent: false, canSum: true, formatHandler: function (e) {
                return t.scientific(e.activated_count, 0)
            }
        },
        activated_rate: {
            label: "下载激活率", isPercent: true, canSum: true, sumHandler: function (e) {
                var n = "-";
                if (e.activated_count != "-" && e.download != "-") {
                    n = t.divide(e.activated_count, e.download, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.activated_rate, 2)
            }
        },
        click_activated_rate: {
            label: "点击激活率", isPercent: true, canSum: true, sumHandler: function () {
                return "-"
            }, formatHandler: function (e) {
                return t.percent(e.click_activated_rate, 2)
            }
        },
        activated_price: {
            label: "激活均价", isPercent: false, canSum: true, sumHandler: function (e) {
                var n = "-";
                if (e.cost != "-" && e.activated_count != "-") {
                    n = t.divide(e.cost, e.activated_count, 2)
                }
                return n
            }, formatHandler: function (e) {
                return t.scientific(t.divide(e.activated_price, 100, 2))
            }
        },
        cpt: {
            label: "安装（转化）均价", sumHandler: function (e) {
                var n = "-";
                if (e.cost != "-" && e.tradecount != "-") {
                    n = t.divide(e.cost, e.tradecount, 2)
                }
                return n
            }, formatHandler: function (e) {
                return t.scientific(t.divide(e.cpt, 100, 2))
            }
        },
        ordercount: {
            label: "下单量", formatHandler: function (e) {
                return t.scientific(e.ordercount, 0)
            }
        },
        ordertraderate: {
            label: "下单成交率", isPercent: true, sumHandler: function (e) {
                var n = "-";
                if (e.tradecount != "-" && e.ordercount != "-") {
                    n = t.divide(e.tradecount, e.ordercount, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.ordertraderate, 2)
            }
        },
        tradecount: {
            label: "安装量（转化量）", canSum: true, formatHandler: function (e) {
                return t.scientific(e.tradecount, 0)
            }
        },
        turnover: {
            label: "成交额", formatHandler: function (e) {
                return t.scientific(t.divide(e.turnover, 100, 2))
            }
        },
        cost_per_download: {
            label: "下载均价", sumHandler: function (e) {
                var n = "-";
                if (e.cost != "-" && e.download != "-") {
                    n = t.divide(e.cost, e.download, 2)
                }
                return n
            }, formatHandler: function (e) {
                return t.scientific(t.divide(e.cost_per_download, 100, 2))
            }
        },
        frontend_cpa: {label: "转化均价"},
        frontend_cpm: {label: "千次曝光均价"},
        frontend_cvr: {label: "转化率"},
        download: {
            label: "下载量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.download, 0)
            }
        },
        downloadrate: {
            label: "下载率", isPercent: true, canSum: true, sumHandler: function (e) {
                var n = "-";
                if (e.download != "-" && e.validclickcount != "-") {
                    n = t.divide(e.download, e.validclickcount, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.downloadrate, 2)
            }
        },
        yyb_download_rate: {
            label: "下载率", isPercent: true, canSum: true, sumHandler: function (e) {
                var n = "-";
                if (e.download != "-" && e.viewcount != "-") {
                    n = t.divide(e.download, e.viewcount, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.yyb_download_rate, 2)
            }
        },
        normalized_download_rate: {
            label: "归一化下载率", isPercent: true, canSum: false, formatHandler: function (e) {
                return t.percent(e.normalized_download_rate, 2)
            }
        },
        core_pos_ad_exposure: {
            label: "核心广告位曝光量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.core_pos_ad_exposure, 0)
            }
        },
        core_pos_ad_download: {
            label: "核心广告位下载量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.core_pos_ad_download, 0)
            }
        },
        core_pos_ad_download_rate: {
            label: "核心广告位下载率", isPercent: true, canSum: true, sumHandler: function (e) {
                var n = "-";
                if (e.core_pos_ad_download != "-" && e.core_pos_ad_exposure != "-") {
                    n = t.divide(e.core_pos_ad_download, e.core_pos_ad_exposure, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.core_pos_ad_download_rate, 2)
            }
        },
        app_register_count: {
            label: "注册量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.register_count, 0)
            }
        },
        app_add_to_car_count: {
            label: "加入购物车量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.add_to_car_count, 0)
            }
        },
        app_checkout_count: {
            label: "付费行为量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.checkout_count, 0)
            }
        },
        amount_cart: {
            label: "加入购物车金额", isPercent: false, canSum: true, formatHandler: function (e) {
                return t.scientific(t.divide(e.amount_cart, 100, 2))
            }
        },
        amount_paid: {
            label: "付费金额", isPercent: false, canSum: true, formatHandler: function (e) {
                return t.scientific(t.divide(e.amount_paid, 100, 2))
            }
        },
        key_page_view_count: {
            label: "关键页面浏览量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.key_page_view_count, 0)
            }
        },
        register_count: {
            label: "注册量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.register_count, 0)
            }
        },
        add_to_car_count: {
            label: "加入购物车量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.add_to_car_count, 0)
            }
        },
        web_trade_count: {
            label: "下单量（转化量）", canSum: true, formatHandler: function (e) {
                return t.scientific(e.tradecount, 0)
            }
        },
        page_consult: {
            label: "网页咨询量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.page_consult, 0)
            }
        },
        page_phone_call_direct: {
            label: "电话直拨量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.page_phone_call_direct, 0)
            }
        },
        page_phone_call_back: {
            label: "电话回拨量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.page_phone_call_back, 0)
            }
        },
        page_reservation: {
            label: "表单预约量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.page_reservation, 0)
            }
        },
        checkout_count: {
            label: "成交量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.checkout_count, 0)
            }
        },
        followcnt: {
            label: "关注量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.followcnt, 0)
            }
        },
        praisecount: {
            label: "点赞量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.praisecount, 0)
            }
        },
        commentcount: {
            label: "评论量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.commentcount, 0)
            }
        },
        forward_count: {
            label: "转发量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.forward_count, 0)
            }
        },
        read_count: {
            label: "阅读量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.read_count, 0)
            }
        },
        navigation_count: {
            label: "导航量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.navigation_count, 0)
            }
        },
        product_type_name: {label: "标的物类型"}
    };
    e.revertOriginalField = function (e) {
        var t = e || [], n = [], i = "";
        var a = {
            web_trade_count: "tradecount",
            app_register_count: "register_count",
            app_add_to_car_count: "add_to_car_count",
            app_checkout_count: "checkout_count"
        };
        for (var r = 0, o = t.length; r < o; r++) {
            i = t[r];
            if (i && a[i]) {
                i = a[i]
            }
            if ($.inArray(i, n) < 0) {
                n.push(i)
            }
        }
        return n
    };
    e.fieldsNameMapping = {};
    e.percentFields = [];
    e.sumFields = [];
    e.calFields = [];
    e.showHandler = {};
    e.calculHandler = {};
    (function () {
        for (var t in e.fields) {
            var n = e.fields[t];
            e.fieldsNameMapping[t] = n.label;
            n.isPercent && e.percentFields.push(t);
            n.canSum && e.sumFields.push(t);
            n.formatHandler && (e.showHandler[t] = n.formatHandler);
            if (n.sumHandler) {
                e.calFields.push(t);
                e.calculHandler[t] = n.sumHandler
            }
        }
    })();
    e.YYBKA_Fields = ["viewcount", "download"];
    e.YYBKA_Order_Fields = ["viewcount", "download", "yyb_download_rate", "core_pos_ad_exposure", "core_pos_ad_download", "core_pos_ad_download_rate", "normalized_download_rate"];
    e.YYBKA_Order_Producttype_Fields = ["viewcount", "download", "yyb_download_rate", "core_pos_ad_exposure", "core_pos_ad_download", "core_pos_ad_download_rate"];
    e.YYBKA_Producttype_Detail_Fields = ["viewcount", "download", "yyb_download_rate", "core_pos_ad_exposure", "core_pos_ad_download", "core_pos_ad_download_rate"];
    e.YYBKA_Analytic_Fields = ["viewcount", "download", "yyb_download_rate"];
    e.YYBKA_Campaign_Fields = ["viewcount", "download", "yyb_download_rate"];
    e.YYBKA_defaultFields = ["viewcount", "download"];
    e.YYBKA_Order_defaultFields = ["viewcount", "validclickcount"];
    e.commonFields = ["viewcount", "validclickcount", "ctr", "cpc", "tradecount", "clicktraderate", "cpt", "cost"];
    e.commonYYBFields = ["middle_page_view_count", "middle_page_click_count", "middle_page_ctr", "core_pos_ad_exposure", "core_pos_ad_download", "core_pos_ad_download_rate", "normalized_download_rate", "yyb_download_rate"];
    e.appEffectFields = ["download", "downloadrate", "cost_per_download", "activated_count", "activated_rate", "click_activated_rate", "activated_price", "app_register_count", "app_add_to_car_count", "amount_cart", "app_checkout_count", "amount_paid"];
    e.webpageEffectFields = ["key_page_view_count", "register_count", "add_to_car_count", "web_trade_count", "checkout_count", "page_consult", "page_phone_call_direct", "page_phone_call_back", "page_reservation", "navigation_count"];
    e.socialFields = ["followcnt", "praisecount", "commentcount", "forward_count", "read_count"];
    e.getChartFields = function (t) {
        t = t || false;
        var n = [];
        if (i) {
            n = e.YYBKA_Fields;
            if (t) {
                n = e.YYBKA_Order_Fields
            }
        } else {
            n = [].concat(e.commonFields).concat(e.appEffectFields).concat(e.socialFields)
        }
        return n
    };
    e.getChartDefaultFields = function (t) {
        t = t || false;
        if (i) {
            if (t) {
                return e.YYBKA_Order_defaultFields
            }
            return e.YYBKA_defaultFields
        } else {
            return ["viewcount", "ctr"]
        }
    };
    e.tableFields = function () {
        var t = [], n = ["price", "statstime", "daybudget", "bid_amount"], a = [], r = {};
        if (i) {
            a = e.YYBKA_Fields.concat(n).concat(e.YYBKA_Order_Fields);
            for (var o = 0, s = a.length; o < s; o++) {
                (function (e) {
                    var n = a[e] || false;
                    if (n && !r[n]) {
                        t.push(n);
                        r[n] = true
                    }
                })(o)
            }
        } else {
            t = [].concat(e.commonFields).concat(e.appEffectFields);
            t = t.concat(e.socialFields).concat(n)
        }
        return t
    }();
    e.campaignSearchStatusMapArray = [{status: 999, label: "所有未删除"}, {status: 0, label: "所有计划"}, {
        status: 1,
        label: "启用中"
    }, {status: 10, label: "暂停中"}];
    return e
});
define("js/modules/chart", ["require", "jquery", "widget/highcharts", "js/config/env", "js/config/report", "js/modules/common"], function (require) {
    var $ = require("jquery"), e = require("widget/highcharts"), t = require("js/config/env"), n = require("js/config/report"), i = require("js/modules/common"), a = {}, r = {};
    var o = {}, s = null;
    (function () {
        var e = Highcharts.Pointer.prototype.runPointActions;
        Highcharts.Pointer.prototype.runPointActions = function (t) {
            var n = this, i = Math, a = i.max, r = i.min, o = i.abs, s = n.chart, l = s.series, c = s.tooltip, u, d, f = s.hoverPoint, p = s.hoverSeries, m, g, h = s.chartWidth, v = n.getIndex(t), _;
            if (c && n.options.tooltip.shared && !(p && p.noSharedTooltip)) {
                d = [];
                m = l.length;
                for (g = 0; g < m; g++) {
                    if (l[g].visible && l[g].options.enableMouseTracking !== false && !l[g].noSharedTooltip && l[g].tooltipPoints.length) {
                        u = l[g].tooltipPoints[v];
                        if (u.series) {
                            u._dist = o(v - u.clientX);
                            h = r(h, u._dist);
                            d.push(u)
                        }
                    }
                }
                m = d.length;
                while (m--) {
                    if (d[m]._dist > h) {
                        d.splice(m, 1)
                    }
                }
                if (d.length && d[0].clientX !== n.hoverX) {
                    d[0].firePointEvent("mouseOver")
                }
            }
            e.call(this, t)
        }
    })();
    $.extend(a, {
        create: function (e, i) {
            i.showFields = i.showFields || i.showFileds;
            i.xAxisField = i.xAxisField || i.xAxisFiled || "statsdate";
            i = $.extend({
                target: null,
                dataType: "一个位置的多指标图",
                type: "line",
                showFields: null,
                showFieldsOpts: null,
                xAxisField: "statsdate",
                baseField: "",
                title: "",
                subTitle: "",
                pieDesc: "数量",
                fieldNameMap: null,
                colorMap: {},
                colors: null,
                legend: null,
                percentFields: [],
                percentFieldsNeedMultiply100: true,
                startDate: null,
                endDate: null,
                disableLegendForSingleSeries: true,
                yaxisMin: 0,
                extraHighchartsOptions: null,
                pointMouseOver: null,
                dataLabelsEnabled: true,
                markerEnabled: true
            }, i);
            var a = i;
            a.target.get && (a.target = a.target.get(0));
            var r = function (e, t) {
                this.data = e;
                this.options = t;
                this.chart = null
            };
            r.prototype.destroy = function () {
                this.chart.destroy()
            };
            r.prototype.init = function () {
                Highcharts.setOptions({global: {useUTC: false}})
            };
            r.prototype.showFields = function (e, i) {
                var a = [];
                if ($.isArray(e)) {
                    $.each(e, function (e, t) {
                        if ($.inArray(t, a) === -1)a.push(t)
                    });
                    e = a
                }
                var r = null;
                var o = {};
                var s = {};
                var l = this.data, c = this.options, u = c, d = c.type;
                var f = new Date;
                var p = {};

                function m(e, t) {
                    var n;
                    if ($.inArray(e, c.percentFields) > -1) {
                        if (u.percentFieldsNeedMultiply100) {
                            n = parseFloat(t) * 100
                        } else {
                            n = parseFloat(t)
                        }
                    } else {
                        n = parseFloat(t)
                    }
                    if (!(e in p)) {
                        p[e] = true
                    }
                    if (t != 0) {
                        p[e] = false
                    }
                    return n
                }

                function g(e, t, n) {
                    var i = /^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}$/;
                    var a = /^[0-9]{8}$/;
                    var o = /^[0-9]{2}\:[0-9]{2}$/;
                    var s = /^[0-9]{1,2}$/;
                    var l;
                    var n = n || c.startDate;
                    var u, d, p;
                    if (n) {
                        var m = n.replace(/-/g, "/").split("/");
                        u = parseInt(m[0], 10);
                        d = parseInt(m[1], 10) - 1;
                        p = parseInt(m[2], 10)
                    } else {
                        u = f.getFullYear();
                        d = f.getMonth();
                        p = f.getDate()
                    }
                    if (i.test(t)) {
                        r = true;
                        l = Date.parse(t.replace(/-/g, "/"))
                    } else if (a.test(t)) {
                        r = true;
                        l = new Date(parseInt(t.substring(0, 4), 10), parseInt(t.substring(4, 6), 10) - 1, parseInt(t.substring(6, 8), 10)).getTime()
                    } else if (o.test(t)) {
                        var g = t.split(":");
                        r = false;
                        l = new Date(u, d, p, parseInt(g[0], 10), parseInt(g[1], 10)).getTime()
                    } else if (s.test(t)) {
                        r = false;
                        l = new Date(u, d, p, parseInt(t, 10), 0).getTime()
                    } else {
                        throw"can not recognize the date formate: " + t
                    }
                    return l
                }

                if (d == "line") {
                    if (u.dataType == "一个位置的多指标图") {
                        $.each(l.list, function (t, n) {
                            $.each([c.xAxisField].concat(e), function (t, i) {
                                var a = n[i];
                                if (!(i == u.xAxisField || $.inArray(i, e) > -1)) {
                                    return
                                }
                                if (!(i in o)) {
                                    o[i] = []
                                }
                                if (i != u.xAxisField) {
                                    o[i].push(m(i, a))
                                } else {
                                    o[i].push(g(i, a))
                                }
                            })
                        })
                    } else if (u.dataType == "一个位置的多指标对比图") {
                        var h = function (e) {
                            var t = false, n = false, i = "", a = [], r = [];
                            var o = function (e) {
                                var t = e;
                                if (typeof t["ctr"] != "undefined") {
                                    t["ctr"] = t["viewcount"] ? Math.round(t["validclickcount"] / t["viewcount"] * 1e6) : 0;
                                    if (t["ctr"] > 0) {
                                        t["ctr"] = t["ctr"] / 1e4;
                                        t["ctr"] = t["ctr"].toFixed(2)
                                    }
                                }
                                if (typeof t["clicktraderate"] != "undefined") {
                                    t["clicktraderate"] = t["validclickcount"] ? Math.round(t["tradecount"] / t["validclickcount"] * 1e6) : 0;
                                    if (t["clicktraderate"] > 0) {
                                        t["clicktraderate"] = t["clicktraderate"] / 1e4;
                                        t["clicktraderate"] = t["clicktraderate"].toFixed(2)
                                    }
                                }
                                if (typeof t["activated_rate"] != "undefined") {
                                    t["activated_rate"] = t["activated_count"] ? Math.round(t["activated_count"] / t["download"] * 1e6) : 0;
                                    if (t["activated_rate"] > 0) {
                                        t["activated_rate"] = t["activated_rate"] / 1e4;
                                        t["activated_rate"] = t["activated_rate"].toFixed(2)
                                    }
                                }
                                if (typeof t["cpc"] != "undefined") {
                                    t["cpc"] = t["validclickcount"] ? t["cost"] / t["validclickcount"] : 0
                                }
                                if (typeof t["cpt"] != "undefined") {
                                    t["cpt"] = t["tradecount"] ? t["cost"] / t["tradecount"] : 0
                                }
                                if (typeof t["downloadrate"] != "undefined") {
                                    t["downloadrate"] = t["validclickcount"] ? Math.round(t["download"] / t["validclickcount"] * 1e6) : 0;
                                    if (t["downloadrate"] > 0) {
                                        t["downloadrate"] = t["downloadrate"] / 1e4;
                                        t["downloadrate"] = t["downloadrate"].toFixed(2)
                                    }
                                }
                                if (typeof t["yyb_download_rate"] != "undefined") {
                                    t["yyb_download_rate"] = t["viewcount"] ? Math.round(t["download"] / t["viewcount"] * 1e6) : 0;
                                    if (t["yyb_download_rate"] > 0) {
                                        t["yyb_download_rate"] = t["yyb_download_rate"] / 1e4;
                                        t["yyb_download_rate"] = t["yyb_download_rate"].toFixed(2)
                                    }
                                }
                                if (typeof t["cost_per_download"] != "undefined") {
                                    t["cost_per_download"] = t["download"] ? t["cost"] / t["download"] : 0
                                }
                                if (typeof t["activated_price"] != "undefined") {
                                    t["activated_price"] = t["activated_count"] ? t["cost"] / t["activated_count"] : 0
                                }
                                return t
                            };
                            var s = function (e) {
                                var t = {};
                                for (var n = 0, i = e.length; n < i; n++) {
                                    for (var a in e[n]) {
                                        if (typeof t[a] == "undefined") {
                                            t[a] = 0
                                        }
                                        t[a] += Number(e[n][a]) || 0
                                    }
                                }
                                return o(t)
                            };
                            $.each(e, function (e, o) {
                                if (typeof o.sdate != "undefined" && typeof o.edate != "undefined") {
                                    if (o.sdate != o.edate) {
                                        t = true
                                    } else if (o.sdate == o.edate) {
                                        n = true;
                                        i = e;
                                        a = o;
                                        sameData = o.data
                                    }
                                }
                                r[e] = o
                            });
                            if (t && n) {
                                sameData = s(sameData);
                                sameData.statsdate = a.sdate;
                                r[i].data = [sameData];
                                c.xAxisField = "statsdate";
                                return r
                            } else {
                                return e
                            }
                        };
                        l = h(l);
                        $.each(l, function (t, n) {
                            var i = n.data, a = n.sdate;
                            o = {};
                            $.each(i, function (t, n) {
                                $.each([c.xAxisField].concat(e), function (t, i) {
                                    var r = n[i];
                                    if (!(i == u.xAxisField || $.inArray(i, e) > -1)) {
                                        return
                                    }
                                    if (!(i in o)) {
                                        o[i] = []
                                    }
                                    if (i != u.xAxisField) {
                                        o[i].push(m(i, r))
                                    } else {
                                        o[i].push(g(i, r, a))
                                    }
                                })
                            });
                            s[t] = o
                        })
                    } else if (u.dataType == "多个位置的单指标图") {
                        $.each(l, function (e, t) {
                            if ($.inArray(e, i.tids) < 0) {
                                return
                            }
                            var n = t.name;
                            var a = t.data;
                            o = {_name: n, _tid: e, _color: t.color};
                            $.each(a, function (e, t) {
                                $.each([c.xAxisField, i.field], function (e, n) {
                                    var i = t[n];
                                    if (!(n in o)) {
                                        o[n] = []
                                    }
                                    if (n != u.xAxisField) {
                                        o[n].push(m(n, i))
                                    } else {
                                        o[n].push(g(n, i))
                                    }
                                })
                            });
                            s[e] = o
                        })
                    } else if (u.dataType == "多个位置的多指标图") {
                        $.each(l, function (t, n) {
                            if ($.inArray(t, i.tids) < 0) {
                                return
                            }
                            var a = n.name;
                            var r = n.data;
                            o = {_name: a, _tid: t, _color: n.color};
                            $.each(r, function (t, n) {
                                $.each([c.xAxisField].concat(e), function (e, t) {
                                    var i = n[t];
                                    if (!(t in o)) {
                                        o[t] = []
                                    }
                                    if (t != u.xAxisField) {
                                        o[t].push(m(t, i))
                                    } else {
                                        o[t].push(g(t, i))
                                    }
                                })
                            });
                            s[t] = o
                        })
                    }
                } else if (d == "pie") {
                    if (c.showFields.length > 1) {
                        throw"pie chart can only show one field,check showFields option"
                    }
                    $.each(l.list, function (e, t) {
                        var n = c.baseField;
                        var i = c.showFields[0];
                        var a = t[n];
                        var r = parseFloat(t[i]);
                        o[a] = r
                    })
                } else if (d == "column") {
                    $.each(l.list, function (e, t) {
                        var n = c.baseField;
                        var i = c.showFields[0];
                        var a = t[n];
                        var r = parseFloat(t[i]);
                        o[a] = r
                    })
                }
                var v = false;
                $.each(p, function (e, t) {
                    if (t == true) {
                        v = true;
                        return false
                    }
                });
                var _ = [];
                var y = [];
                var b = [];
                var w = 0;
                var A = 24 * 3600 * 1e3;
                var T, E;

                function x(e, n, i, a, r, o, s, l, d) {
                    var f = {};
                    f.name = n;
                    f.data = i;
                    var p = l.length;
                    for (var m = 0; m < p; m++) {
                        f.data[m] = [l[m], f.data[m]]
                    }
                    f.yAxis = a;
                    f.tooltip = {
                        valueSuffix: $.inArray(e, c.percentFields) > -1 ? "%" : null,
                        valueDecimals: $.inArray(e, c.percentFields) > -1 ? 2 : null
                    };
                    f.color = r;
                    E && (f.pointRange = E);
                    o.push(f);
                    !d && s.push({
                        title: {text: t && t.highchartsHideYaxisTitle ? null : f.name},
                        opposite: a != 0,
                        min: u.yaxisMin,
                        minRange: v ? 1 : null,
                        labels: {
                            formatter: function () {
                                if (this.value < 0) {
                                    return null
                                } else {
                                    if ($.inArray(e, c.percentFields) > -1) {
                                        return this.value + " %"
                                    } else {
                                        return this.value
                                    }
                                }
                            }
                        }
                    })
                }

                if (d == "line") {
                    if (u.dataType == "一个位置的多指标图") {
                        if (!o[c.xAxisField]) {
                            throw"IN highchart :no data 没有数据（至少没有X轴数据），请检查"
                        }
                        if (!r) {
                            A = 3600 * 1e3
                        }
                        if (o[c.xAxisField].length > 1) {
                            A = o[c.xAxisField][1] - o[c.xAxisField][0];
                            T = null;
                            E = null
                        } else {
                            A = null;
                            T = 24 * 3600 * 1e3;
                            E = 24 * 3600 * 1e3
                        }
                        var P = null;
                        if (t && t.highchartsLinesColor) {
                            P = t.highchartsLinesColor
                        }
                        if (u.colors) {
                            P = u.colors
                        }
                        w = 0;
                        $.each(o, function (e, t) {
                            if (e == u.xAxisField) {
                                _ = t
                            } else {
                                x(e, u.fieldNameMap ? u.fieldNameMap[e] || e : e, t, w, P && P[w] ? P[w] : null, b, y, o[c.xAxisField]);
                                w += 1
                            }
                        })
                    } else if (u.dataType == "一个位置的多指标对比图") {
                        var C = [], S = 0;
                        var k = 0;
                        $.each(s, function (e, t) {
                            if (t[u.xAxisField].length > k) {
                                k = t[u.xAxisField].length
                            }
                        });
                        $.each(s, function (e, t) {
                            var n = t[u.xAxisField].length, i = {};
                            if (n < k) {
                                $.each(t, function (e, t) {
                                    if (e == u.xAxisField) {
                                        var a = t[1] - t[0] || 1e3 * 60 * 60 * 24;
                                        for (var r = n; r < k; r++) {
                                            t.push(t[r - 1] + a)
                                        }
                                    } else {
                                        for (var r = n; r < k; r++) {
                                            t.push(null)
                                        }
                                    }
                                    i[e] = t
                                });
                                s[e] = i
                            }
                        });
                        $.each(s, function (e, n) {
                            if (!n[c.xAxisField]) {
                                throw"IN highchart :no data 没有数据（至少没有X轴数据），请检查"
                            }
                            if (!r) {
                                A = 3600 * 1e3
                            }
                            if (n[c.xAxisField].length > 1) {
                                A = n[c.xAxisField][1] - n[c.xAxisField][0];
                                T = null;
                                E = null
                            } else {
                                A = null;
                                T = 24 * 3600 * 1e3;
                                E = 24 * 3600 * 1e3
                            }
                            var i = null;
                            if (t && t.highchartsLinesColor) {
                                i = t.highchartsLinesColor
                            }
                            if (u.colors) {
                                i = u.colors
                            }
                            w = 0;
                            $.each(n, function (t, a) {
                                var r = "", o = "", s = "";
                                if (typeof l[e].sdate != "undefined" && typeof l[e].edate != "undefined") {
                                    o = l[e].sdate;
                                    s = l[e].edate;
                                    if (o == s) {
                                        r = o + " " + (u.fieldNameMap ? u.fieldNameMap[t] || t : t)
                                    } else {
                                        r = o + "至" + s + " " + (u.fieldNameMap ? u.fieldNameMap[t] || t : t)
                                    }
                                } else {
                                    r = u.fieldNameMap ? u.fieldNameMap[t] || t : t
                                }
                                if (t == u.xAxisField) {
                                    _ = a;
                                    C.push(_)
                                } else {
                                    x(t, r, a, w, i && i[S] ? i[S] : null, b, y, n[c.xAxisField]);
                                    w += 1;
                                    S += 1
                                }
                            })
                        })
                    } else if (u.dataType == "多个位置的单指标图") {
                        var I = false;
                        w = 0;
                        $.each(s, function (e, t) {
                            $.each(t, function (e, n) {
                                if (e.charAt(0) == "_") {
                                    return
                                } else if (e == u.xAxisField) {
                                    _ = n;
                                    if (n.length > 1) {
                                        A = n[1] - n[0];
                                        T = null;
                                        E = null
                                    } else {
                                        A = null;
                                        T = 24 * 3600 * 1e3;
                                        E = 24 * 3600 * 1e3
                                    }
                                } else {
                                    x(e, "" + t._name + "-" + (u.fieldNameMap ? u.fieldNameMap[e] || e : e), n, 0, t._color || null, b, y, o[c.xAxisField], I);
                                    if (!I) {
                                        I = true
                                    }
                                    w += 1
                                }
                            })
                        })
                    } else if (u.dataType == "多个位置的多指标图") {
                        var I = false, N = u.showFields || [""], j = 0;
                        w = 0;
                        $.each(s, function (e, t) {
                            j = 0;
                            $.each(t, function (e, n) {
                                if (e.charAt(0) == "_") {
                                    return
                                } else if (e == u.xAxisField) {
                                    _ = n;
                                    if (n.length > 1) {
                                        A = n[1] - n[0];
                                        T = null;
                                        E = null
                                    } else {
                                        A = null;
                                        T = 24 * 3600 * 1e3;
                                        E = 24 * 3600 * 1e3
                                    }
                                } else {
                                    x(e, "" + t._name + "-" + (u.fieldNameMap ? u.fieldNameMap[e] || e : e), n, j, t._color || null, b, y, o[c.xAxisField], I);
                                    w += 1;
                                    j += 1;
                                    if (!I && j >= N.length) {
                                        I = true
                                    }
                                }
                            })
                        })
                    }
                } else if (d == "pie") {
                    b = [{type: "pie", name: c.pieDesc, data: []}];
                    $.each(o, function (e, t) {
                        var n = {};
                        n.type = "pie";
                        n.name = u.fieldNameMap ? u.fieldNameMap[e] || e : e;
                        n.y = t;
                        c.colorMap[e] && (n.color = c.colorMap[e]);
                        b[0].data.push(n)
                    })
                } else if (d == "column") {
                    b = [{type: "column", data: []}];
                    $.each(o, function (e, t) {
                        var n = {};
                        n.type = "column";
                        n.name = u.fieldNameMap ? u.fieldNameMap[e] || e : e;
                        _.push(u.fieldNameMap ? u.fieldNameMap[e] || e : e);
                        if (typeof u.fieldFormat === "function") {
                            n.y = u.fieldFormat(t)
                        } else {
                            n.y = t
                        }
                        if (c.colorMap[e]) {
                            n.color = c.colorMap[e]
                        }
                        b[0].data.push(n)
                    })
                }
                if (d == "line") {
                    if (u.dataType == "一个位置的多指标对比图") {
                        var O = [], L = parseInt(b.length / C.length) || 1;
                        for (var F = 0, D = C.length; F < D; F++) {
                            if ((F + 2) % 2 == 0) {
                                O.push({
                                    type: "datetime",
                                    minRange: T,
                                    dateTimeLabelFormats: {
                                        millisecond: "%Y-%m-%d",
                                        second: "%Y-%m-%d",
                                        minute: "%Y-%m-%d",
                                        hour: "%H:%M",
                                        day: "%m-%d",
                                        week: "%m-%d",
                                        month: "%Y-%m-%d",
                                        year: "%Y-%m-%d"
                                    },
                                    labels: {
                                        formatter: function () {
                                            var e = Highcharts.dateFormat(this.dateTimeLabelFormat, this.value);
                                            if (r && e.indexOf(":") > -1) {
                                                return null
                                            } else {
                                                return e
                                            }
                                        }
                                    }
                                })
                            } else {
                                O.push({
                                    type: "datetime",
                                    minRange: T,
                                    dateTimeLabelFormats: {
                                        millisecond: "%Y-%m-%d",
                                        second: "%Y-%m-%d",
                                        minute: "%Y-%m-%d",
                                        hour: "%H:%M",
                                        day: "%m-%d",
                                        week: "%m-%d",
                                        month: "%Y-%m-%d",
                                        year: "%Y-%m-%d"
                                    },
                                    lineWidth: 0,
                                    tickWidth: 0,
                                    labels: {
                                        enabled: false, formatter: function () {
                                            var e = Highcharts.dateFormat(this.dateTimeLabelFormat, this.value);
                                            if (r && e.indexOf(":") > -1) {
                                                return null
                                            } else {
                                                return e
                                            }
                                        }
                                    }
                                })
                            }
                        }
                        for (var F = 0, D = b.length; F < D; F++) {
                            b[F].xAxis = parseInt(F / L)
                        }
                        function R(e) {
                            var t = [], n = true;
                            for (var i = 0, a = e.length; i < a; i++) {
                                if (i + L < a && e[i].name != e[i + L].name) {
                                    n = false;
                                    break
                                }
                            }
                            if (n) {
                                for (var i = 0; i < L; i++) {
                                    t.push(e[i])
                                }
                                return t
                            } else {
                                return e
                            }
                        }

                        b = R(b);
                        var M = function () {
                            var e = n.fieldsNameMapping, t = {};
                            for (var i in e) {
                                t[e[i]] = i
                            }
                            return t
                        }();
                        var q = {
                            chart: {type: "line", renderTo: u.target, marginBottom: 60},
                            title: {text: u.title},
                            subtitle: {text: u.subTitle},
                            xAxis: O,
                            yAxis: y.length > 2 ? y.splice(0, 2) : y,
                            tooltip: {
                                dateTimeLabelFormats: {
                                    millisecond: "%Y-%m-%d",
                                    second: "%Y-%m-%d",
                                    minute: "%Y-%m-%d",
                                    hour: "%Y-%m-%d %H:%M",
                                    day: "%Y-%m-%d",
                                    week: "%Y-%m-%d",
                                    month: "%Y-%m-%d",
                                    year: "%Y-%m-%d"
                                },
                                style: {fontSize: "12px", padding: "8px"},
                                shared: true,
                                crosshairs: true,
                                useHTML: true,
                                formatter: function (e) {
                                    var t = this.points, n = 0, i = "", a = false, o = 0, s = "", l = "", u = [];
                                    for (var d = 0, f = t.length; d < f; d++) {
                                        if (typeof t[d].point.y == "undefined") {
                                            continue
                                        }
                                        if (d - L >= 0 && t[d].key == t[d - L].key && typeof t[d].point.y != "undefined" && typeof t[d - L].point.y != "undefined") {
                                            continue
                                        }
                                        u = t[d].series.name.split(" ");
                                        l = u[u.length - 1];
                                        s = M[l] || "";
                                        if (s == "viewcount" || s == "validclickcount" || s == "download" || s == "followcnt" || s == "tradecount" || s == "activated_count") {
                                            o = 0
                                        } else {
                                            o = 2
                                        }
                                        if ($.inArray(s, c.percentFields) > -1) {
                                            a = true
                                        } else {
                                            a = false
                                        }
                                        if (d == 0 || d % L == 0) {
                                            if (r) {
                                                i += "<small>" + Highcharts.dateFormat("%Y-%m-%d", t[d].key) + "</small><table>"
                                            } else {
                                                i += "<small>" + Highcharts.dateFormat("%Y-%m-%d %H:%M", t[d].key) + "</small><table>"
                                            }
                                        }
                                        i += '<tr><td style="color: ' + t[d].series.color + '">' + l + ": </td><td><b>" + (a ? t[d].point.y + "%" : Highcharts.numberFormat(t[d].point.y, o)) + "</b></td></tr>";
                                        if ((d + 1) % L == 0) {
                                            i += "</table>"
                                        }
                                    }
                                    return i
                                }
                            },
                            legend: u.legend || {
                                align: "center",
                                verticalAlign: "bottom",
                                x: 10,
                                y: 15,
                                floating: true,
                                width: 580,
                                itemWidth: 290,
                                borderWidth: 0,
                                enabled: true
                            },
                            series: b,
                            credits: {enabled: false},
                            plotOptions: {
                                line: {
                                    events: {
                                        legendItemClick: function (e) {
                                            if (w < 2) {
                                                return false
                                            } else {
                                                return true
                                            }
                                        }
                                    }, marker: {enabled: u.markerEnabled}
                                }, series: {point: {events: {mouseOver: u.pointMouseOver || null}}}
                            }
                        };
                        q = $.extend(true, q, u.extraHighchartsOptions);
                        this.chart = new Highcharts.Chart(q)
                    } else {
                        var q = {
                            chart: {type: "line", renderTo: u.target, marginBottom: 25},
                            title: {text: u.title},
                            subtitle: {text: u.subTitle},
                            xAxis: {
                                type: "datetime",
                                minRange: T,
                                dateTimeLabelFormats: {
                                    millisecond: "%Y-%m-%d",
                                    second: "%Y-%m-%d",
                                    minute: "%Y-%m-%d",
                                    hour: "%H:%M",
                                    day: "%m-%d",
                                    week: "%m-%d",
                                    month: "%Y-%m-%d",
                                    year: "%Y-%m-%d"
                                },
                                labels: {
                                    formatter: function () {
                                        if ($.inArray(this.value, o[c.xAxisField]) > -1) {
                                            return Highcharts.dateFormat(this.dateTimeLabelFormat, this.value)
                                        } else {
                                            return null
                                        }
                                    }
                                }
                            },
                            yAxis: y,
                            tooltip: {
                                dateTimeLabelFormats: {
                                    millisecond: "%Y-%m-%d",
                                    second: "%Y-%m-%d",
                                    minute: "%Y-%m-%d",
                                    hour: "%Y-%m-%d %H:%M",
                                    day: "%Y-%m-%d",
                                    week: "%Y-%m-%d",
                                    month: "%Y-%m-%d",
                                    year: "%Y-%m-%d"
                                }, style: {fontSize: "12px", padding: "8px"}
                            },
                            legend: u.legend || {
                                align: "right",
                                verticalAlign: "top",
                                layout: "vertical",
                                x: -40,
                                y: 10,
                                floating: true,
                                enabled: u.disableLegendForSingleSeries && e.length == 1 ? false : true
                            },
                            series: b,
                            credits: {enabled: false},
                            plotOptions: {
                                line: {
                                    events: {
                                        legendItemClick: function (e) {
                                            if (w < 2) {
                                                return false
                                            } else {
                                                return true
                                            }
                                        }
                                    }, marker: {enabled: u.markerEnabled}
                                }, series: {point: {events: {mouseOver: u.pointMouseOver || null}}}
                            }
                        };
                        q = $.extend(true, q, u.extraHighchartsOptions);
                        this.chart = new Highcharts.Chart(q)
                    }
                } else if (d == "column") {
                    var q = {
                        chart: {type: "column", renderTo: u.target},
                        credits: {enabled: false},
                        plotOptions: {
                            series: {
                                shadow: false,
                                borderWidth: 3,
                                dataLabels: {
                                    enabled: u.dataLabelsEnabled, formatter: function () {
                                        return "<b>" + this.y.toFixed(2) + "%</b>"
                                    }
                                }
                            }
                        },
                        title: {text: u.title},
                        tooltip: {pointFormat: "<b>{point.y}" + u.suffix + "</b>", percentageDecimals: 1},
                        xAxis: {categories: _},
                        yAxis: {title: {text: ""}},
                        legend: {enabled: false},
                        series: b
                    };
                    q = $.extend(true, q, u.extraHighchartsOptions);
                    this.chart = new Highcharts.Chart(q)
                } else if (d == "pie") {
                    var q = {
                        chart: {type: "pie", renderTo: u.target},
                        title: {text: u.title},
                        tooltip: {
                            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>，占比：<b>{point.percentage:.2f}%</b>',
                            percentageDecimals: 1
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: "pointer",
                                shadow: true,
                                borderWidth: 3,
                                dataLabels: {
                                    enabled: false,
                                    color: "#000000",
                                    connectorColor: "#000000",
                                    format: "<b>{point.name}</b>: {point.percentage:.1f} %"
                                },
                                showInLegend: true,
                                point: {
                                    events: {
                                        legendItemClick: function (e) {
                                            return false
                                        }
                                    }
                                }
                            }
                        },
                        series: b,
                        credits: {enabled: false}
                    };
                    q = $.extend(true, q, u.extraHighchartsOptions);
                    this.chart = new Highcharts.Chart(q)
                }
            };
            var o = new r(e, i);
            o.init();
            o.showFields(i.showFields, i.showFieldsOpts);
            return o
        }
    });
    $.extend(r, {
        swfPath: "/qzone/biz/gdt/castcomm/chart.swf", get: function (e) {
            return o[e || s]
        }, insertTo: function (e, t) {
            var n = e, i, a, r, l, c;
            if (typeof e === "string") {
                n = $(e)
            }
            if (n.nodeType !== 1) {
                return false
            }
            t = t || {};
            do {
                i = Math.ceil(Math.random() * 100)
            } while (typeof o[i] !== "undefined");
            l = t.width || "100%";
            c = t.height || "350";
            n.innerHTML = QZFL.media.getFlashHtml({
                src: a.swfPath,
                width: l,
                height: c,
                allowScriptAccess: "always",
                allowFullScreen: "false",
                flashVars: "loadType=js&readyCallBack=noCallBack",
                quality: "high",
                bgcolor: t.bgcolor || "#ffffff",
                scaleMode: "noScale",
                id: "_GDT_CHART" + i,
                name: "_GDT_CHART" + i,
                wmode: "opaque"
            });
            a = $("_GDT_CHART" + i);
            o[i] = a;
            s = i;
            return a
        }, loadJsonData: function (e, t) {
            t = t || t.get();
            if (t && t.loadJsonObject) {
                try {
                    t.loadJsonObject(e)
                } catch (n) {
                    i.showMsgbox("Flash图表加载数据出错")
                }
            } else {
                var a = arguments, r = a.callee, o;
                o = setInterval(function () {
                    if (t && t.loadJsonObject) {
                        clearInterval(o);
                        r.apply(t, Array.prototype.slice.call(a))
                    }
                }, 200)
            }
        }
    });
    return {highchart: a, chart: r}
});
define("js/modules/ageRangeCommon", ["require", "jquery", "js/config/comm"], function (require) {
    var $ = require("jquery"), e = require("js/config/comm");
    var t = e.ENV;
    var n = t.AGE_BINARY_STRING_STATIC_LENGTH, i = t.AGE_MAX, a = t.AGE_MIN, r = {};
    r.originalBinaryString_To_multiRange = function (e) {
        if (!e) {
            return null
        }
        var t = e;
        var i = e.length, a;
        for (a = i; a < n; a++) {
            t += "0"
        }
        var r = [];
        var o = [];
        var s = false;
        for (a = 0; a < n; a++) {
            if (t.charAt(a) === "1" && !s) {
                s = true;
                o.push(a)
            } else if (t.charAt(a) === "0" && s) {
                s = false;
                o.push(a - 1);
                r.push(o);
                o = []
            }
        }
        if (s) {
            s = false;
            o.push(n - 1);
            r.push(o);
            o = []
        }
        return r
    };
    r.multiRange_To_originalBinaryString = function (e) {
        if (!e) {
            return null
        }
        e = e || [];
        var t = [], r, o, s;
        var l = e.length;
        for (r = 0; r < n; r++) {
            t[r] = "0"
        }
        for (r = 0; r < l; r++) {
            s = e[r];
            for (o = s[0]; o <= s[1]; o++) {
                var c = o;
                o >= a && o <= i && (t[c] = "1")
            }
        }
        return t.join("")
    };
    r.getAgeStringForRead = function (e) {
        if (typeof e == "string") {
            return r.getAgeStringForRead(r.originalBinaryString_To_multiRange(e))
        }
        if (!e) {
            return null
        }
        var t = e.length, n, o = [];
        for (n = 0; n < t; n++) {
            var s = e[n];
            if (s[0] <= a && s[1] >= i) {
                return null
            } else if (s[0] <= a) {
                o.push(s[1] + "岁及以下")
            } else if (s[1] >= i) {
                o.push(s[0] + "岁及以上")
            } else {
                if (s[0] === s[1]) {
                    o.push(s[0] + "岁")
                } else {
                    o.push(s[0] + "岁到" + s[1] + "岁")
                }
            }
        }
        return o.join(" 和 ")
    };
    return r
});
define("js/modules/helper", ["require", "jquery", "js/config/comm", "js/modules/account", "js/modules/ageRangeCommon"], function (require) {
    var $ = require("jquery"), e = require("js/config/comm"), t = require("js/modules/account"), n = require("js/modules/ageRangeCommon"), i = {};

    function a(e) {
        var t = 0, n;
        for (n in e) {
            if (e.hasOwnProperty(n))t++
        }
        return t
    }

    i = {
        getShowText: function (e, t) {
            var e, n = [];
            e = $.isArray(e) ? e : !$.isPlainObject(e) && isNaN(e) ? (e || "").split(",") : parseInt(e, 10);
            if (t) {
                if ($.isPlainObject(t) && !isNaN(e)) {
                    e += "";
                    n.push(t[e])
                } else if ($.isArray(t) && !isNaN(e)) {
                    var i = e.toString(2).split("").reverse();
                    $.each(i, function (e, i) {
                        if (parseInt(i, 10)) {
                            n.push(t[e])
                        }
                    })
                } else {
                    $.isArray(e) && $.each(e, function (e, i) {
                        t[i] && n.push(t[i])
                    })
                }
            }
            return n.join(",")
        }, getAgesegStr: function (t) {
            if (t.age_origin) {
                return n.getAgeStringForRead(t.age_origin)
            }
            var i = parseInt(t.ageStart, 10), a = parseInt(t.ageEnd, 10), r = "";
            if (i == e.ENV.AGELOWBOUND && a == e.ENV.AGEHIGHTBOUND) {
                r = ""
            } else if (i == e.ENV.AGELOWBOUND) {
                r = a + "岁以下"
            } else if (a == e.ENV.AGEHIGHTBOUND) {
                r = i + "岁以上"
            } else if (i == a) {
                r = i + "岁"
            } else {
                r = i + "岁至" + a + "岁"
            }
            return r
        }, getMobilepriceStrList: function (t) {
            if (!t) {
                return false
            }
            var n = [];
            if (!$.isArray(t)) {
                t = t.split(",")
            }
            $.each(t, function (t, i) {
                n.push(e.ENV.mobileprice[parseInt(i, 10) - 1])
            });
            return n
        }, getOrderTargetStr: function (r, o, s) {
            var l = {}, c, u, d = r;
            $.each(d, function (t, n) {
                l[t + "str"] = i.getShowText(n, e.ENV[t] || e.confTargeting[t])
            });
            l.professionstr = d.professionstr;
            if (!l.professionstr) {
                d.profession = ""
            }
            u = [];
            d.area && $.each(d.area, function (e, t) {
                var n = QBL.AreaSelector && QBL.AreaSelector.getNameById(t);
                n && u.push(n.replace(/[A-Z\s]/, ""))
            });
            l.areastr = u.join(",");
            var f = ["gender", "scene"];
            if (d.age_origin) {
                var p = n.getAgeStringForRead(d.age_origin);
                p && (l.age_originstr = p);
                f.push("age_origin")
            } else {
                d.ageseg && (l.agesegstr = i.getAgesegStr({ageStart: d.ageseg[0], ageEnd: d.ageseg[1]}));
                f.push("ageseg")
            }
            l.genderstr = l.genderstr || "";
            l.genderstr = l.genderstr == e.ENV.gender[0] ? "" : l.genderstr;
            if (o) {
                o(d, l)
            }
            function m(e) {
                var t = [];
                $.each(e, function (e, n) {
                    if (d[n] && l[n + "str"]) {
                        t.push(l[n + "str"])
                    }
                });
                return t
            }

            var g = "";
            u = m(f);
            if (u.length > 0) {
                g = "<li>" + u.join(" ; ") + " 的用户</li>"
            }
            if (l.areastr) {
                g += "<li>在 " + l["areastr"] + " 地区的用户</li>"
            }
            if (d.imgroup && d.imgroup.length > 0) {
                g += "<li>指定群分类的用户</li>"
            }
            if (!J.isEmptyObject(d.lbsdetail)) {
                var h = [];
                $.each(d.lbsdetail, function (e, t) {
                    h.push(t.name)
                });
                g += "<li>在LBS定向 " + h.join("、") + " 区域中的用户</li>"
            } else if (d.locationdetail && $.type(d.locationdetail) == "object" && a(d.locationdetail) > 0) {
                var v = [];
                $.each(d.locationdetail, function (e, t) {
                    v.push(t.name)
                });
                g += "<li>在LBS定向 " + v.join("、") + " 区域中的用户</li>"
            }
            if (l.appuserstr) {
                g += "<li> " + l.appuserstr + "</li>"
            }
            if (d.appaction_object_type > 0) {
                g += "<li>指定APP行为定向的用户</li>"
            }
            c = [];
            u = m(["education"]);
            if (u.length > 0) {
                c.push(u.join(";") + " 学历")
            }
            if (c.length > 0) {
                g += "<li>" + c.join(" ; ") + " 的用户</li>"
            }
            u = m(["payment", "fans"]);
            if (u.length > 0) {
                g += "<li>" + u.join(" ; ") + " 的用户</li>"
            }
            u = m(["userstatus"]);
            if (u.length > 0) {
                g += "<li>处于 " + u.join(" ; ") + "  的状态</li>"
            }
            u = m(["living_status"]);
            if (u.length > 0) {
                g += "<li>" + u.join(" ; ") + "  的用户</li>"
            }
            u = i.getMobilepriceStrList(d.mobileprice);
            if (u && u.length > 0) {
                g += "<li>设备价格为 " + u.join(" ; ") + "  的用户</li>"
            }
            u = m(["os"]);
            if (u.length > 0) {
                g += "<li>移动终端系统为 " + u.join(" ; ") + "  的用户</li>"
            }
            u = m(["isp"]);
            if (u.length > 0) {
                g += "<li>移动运营商为 " + u.join(" ; ") + "  的用户</li>"
            }
            u = m(["connectiontype"]);
            if (u.length > 0) {
                g += "<li>联网方式为 " + u.join(" ; ") + "  的用户</li>"
            }
            if (d.rruleidlist && d.rruleidlist.length > 0 && (d.visittype || d.enable_remarketing)) {
                var _ = e.ENV.visittype[d.visittype || d.enable_remarketing] || "";
                _ && (_ = "(" + _ + ")", g += "<li>访客定向为" + _ + "</li>")
            }
            if (d.numberpackage && d.numberpackage.length > 0) {
                typeof d.numberpackage === "string" && (d.numberpackage = d.numberpackage.split(","));
                g += "<li>使用了" + d.numberpackage.length + "个自定义人群</li>"
            }
            if (d.dmp && d.dmp.length > 0) {
                typeof d.dmp === "string" && (d.dmp = d.dmp.split(","));
                g += "<li>使用了" + d.dmp.length + "个DMP人群</li>"
            }
            if (d.shoppinginterest && d.shoppinginterest.length > 0) {
                typeof d.shoppinginterest === "string" && (d.shoppinginterest = d.shoppinginterest.split(","));
                g += "<li>使用了" + d.shoppinginterest.length + "个用户购物兴趣</li>"
            }
            if (d.businessinterest && d.businessinterest.length > 0) {
                typeof d.businessinterest === "string" && (d.businessinterest = d.businessinterest.split(","));
                g += "<li>使用了" + d.businessinterest.length + "个用户商业兴趣</li>"
            }
            if (d.wechatflowclass && d.wechatflowclass.length > 0) {
                typeof d.wechatflowclass === "string" && (d.wechatflowclass = d.wechatflowclass.split(","));
                g += "<li>使用了" + d.wechatflowclass.length + "个流量分类</li>"
            }
            if (d.keyword && d.keyword.length > 0) {
                typeof d.keyword === "string" && (d.keyword = d.keyword.split(","));
                g += "<li>使用了" + d.keyword.length + "个关键词</li>"
            }
            u = m(["dressindex"]);
            if (u.length > 0) {
                g += "<li>穿衣指数为 " + u.join(" ; ") + "</li>"
            }
            u = m(["uvindex"]);
            if (u.length > 0) {
                g += "<li>紫外线指数为 " + u.join(" ; ") + "</li>"
            }
            u = m(["makeupindex"]);
            if (u.length > 0) {
                g += "<li>化妆指数为 " + u.join(" ; ") + "</li>"
            }
            u = m(["climate"]);
            if (u.length > 0) {
                g += "<li>气象为 " + u.join(" ; ") + "</li>"
            }
            if (d.temperature && a(d.temperature) > 0) {
                var y = (d.temperature + "").split(/[~,]/);
                y[0] && (y[0] = y[0] - 273);
                y[1] && (y[1] = y[1] - 273);
                g += "<li>温度为 " + y.join("~") + " °C </li>"
            }
            if (d.resident_community_price && a(d.resident_community_price) > 0) {
                var b = (d.resident_community_price + "").split(/[~,]/);
                g += "<li>居住社区价格为 " + b.join("~") + "元/平方米</li>"
            }
            if (d.player_consupt && a(d.player_consupt) > 0) {
                var w = (d.player_consupt + "").split(/[~,]/);
                g += "<li>游戏消费能力为 " + w.join("~") + "元/月</li>"
            }
            if (t.isConsumption() || t.isLowConsumption()) {
                u = m(["consumption_ability"]);
                if (u.length > 0) {
                    g += "<li>处于 " + u.join(" ; ") + "  的状态</li>"
                }
            }
            return g ? g : s.linktype == e.confLinkType.APP_TASK || s.linktype == e.confLinkType.MOB_TASK ? "-" : "<li>全量用户</li>"
        }
    };
    return i
});
define("js/modules/timeutil", ["require", "jquery"], function (require) {
    var $ = require("jquery"), e = $.each;
    var t = {
        makeFullTimeStr: function () {
            return new Array(336 + 1).join("1")
        }, timeArrToReadable: function (e) {
            var t = [], n, i;
            var a = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
            if (!e || !e.length) {
                e = [];
                for (n = 0, i = 7; n < i; n++) {
                    e.push([])
                }
            }
            for (n = 0; n < e.length; n++) {
                var r = [];
                var o = e[n];
                if (o.length > 0) {
                    for (var s = 0; s < o.length; s++) {
                        var l = o[s];
                        var c = parseInt(l.start, 10);
                        var u = parseInt(l.end, 10);
                        r.push("<span>" + c + (l.start > c ? ":30" : ":00") + "-" + u + (l.end > u ? ":30" : ":00") + "</span>");
                        if (s < o.length - 1) {
                            r.push(", ")
                        }
                    }
                }
                if (r.length > 0) {
                    t.push(a[n] + ":" + r.join(""))
                }
            }
            return t
        }, timeStrToArr: function (e) {
            e = e ? e : "";
            var t = 0, n = 0, i, a, r;
            var o = [];
            for (a = 0, r = 7; a < r; a++) {
                o.push([])
            }
            var s = function (e, t) {
                e = (e - 1) % 48 / 2;
                t = ((t - 1) % 48 + 1) / 2;
                var n = {start: e, end: t};
                return n
            };
            for (a = 0, r = e.length; a < r; a++) {
                var l = e.slice(a, a + 1);
                if (l == 1 && t == 0) {
                    t = n = a + 1;
                    continue
                }
                if (l == 1 && t != 0) {
                    n = a + 1
                }
                if (l == 0 && t != 0 || a == r - 1 && t != 0 || (a + 1) % 48 == 0 && t != 0) {
                    i = parseInt((t - 1) / 48, 10);
                    o[i].push(s(t, n));
                    t = 0;
                    n = 0;
                    continue
                }
            }
            if (t != 0) {
                i = parseInt((t - 1) / 48, 10);
                o[i].push(s(t, n))
            }
            return o
        }, timeArrToBitStr: function (e) {
            e = e ? e : [];
            var t = 0, n;
            var i = {};
            for (n = 0; n < e.length; n++) {
                var a = e[n];
                if (a.length > 0) {
                    for (var r = 0; r < a.length; r++) {
                        var o = a[r];
                        var s = o.start;
                        var l = o.end;
                        s *= 2;
                        l *= 2;
                        for (var c = s; c < l; c++) {
                            i[t + c + 1] = 1
                        }
                    }
                }
                t += 48
            }
            var u = "";
            for (n = 0; n < 336; n++) {
                var d = i[n + 1] ? "1" : "0";
                u += d
            }
            u = u.replace(/0*$/, "");
            return u
        }, timeArrSelColumn: function (t) {
            var n = true, i;
            n = n && t.length == 7;
            if (n) {
                e(t, function (e, t) {
                    t = t.substring(t.indexOf(":") + 1);
                    if (e == 0) {
                        i = t;
                        n = n && !/:30/.test(i)
                    } else {
                        n = n && i == t
                    }
                    return n
                })
            }
            i && i.split(",").length >= 2 && (n = false);
            if (n) {
                n = i.match(/\d+:\d+/g)
            }
            return n
        }, getTimeReadArr: function (e) {
            var n = t.timeArrToReadable(e), i = false, a;
            i = t.timeArrSelColumn(n);
            if (i) {
                a = n[0];
                n = [a.substring(a.indexOf(":") + 1)]
            }
            return n
        }, setFlashTimeData: function (e, n) {
            var i = document.getElementById(e);
            if (i && i.loadData) {
                window._dateRangeCallBack(n);
                i.loadData(n)
            } else {
                setTimeout(function () {
                    t.setFlashTimeData(e, n)
                }, 50)
            }
        }
    };
    return t
});
define("js/modules/helpbar", ["require", "jquery", "js/modules/common", "js/modules/atlasdomflag"], function (require) {
    var $ = require("jquery"), e = require("js/modules/common"), t = require("js/modules/atlasdomflag"), n = "hiddenNewHelpIcon";

    function i() {
        var t = $("#js_gdtWXQrcode"), n = "ATLAS-2000";
        e.getWXQrcode(t, n)
    }

    function a() {
        var a = $("#gHelpWrap"), r = a.find(".inner").eq(0), o = a.find(".new-more");
        i();
        r.addClass("current");
        e.localStorage.setItem(n, true);
        o.addClass("none");
        t.remove("newmore")
    }

    function r() {
        var e = $("#gHelpWrap"), t = e.find(".inner").eq(0);
        t.removeClass("current")
    }

    var o = function () {
        var o = $("#gHelpWrap"), s = o.find(".inner").eq(0), l = $("#showHelplist"), c = o.find(".new-more");
        l.on("click", function (e) {
            if (s.hasClass("current")) {
                r()
            } else {
                a()
            }
        });
        o.on("click", "#js_gdtWXQrcode", i);
        o.on("click", ".closepop", function () {
            r()
        });
        $(document.body).on("click", function (e) {
            var t = e.target;
            if ($(t).parents("#gHelpWrap").length === 0) {
                r()
            }
        });
        if (!e.localStorage.getItem(n)) {
            c.removeClass("none");
            t.set("newmore")
        }
    };
    return {init: o}
});
define("js/modules/form", ["require", "jquery"], function (require) {
    var e = {}, $ = require("jquery");

    function t(e) {
        var t;
        t = e ? function (t) {
            return $(t, e)
        } : $;
        return t
    }

    e.setFieldValue = function (t, n, i) {
        var a, r;
        $.each(t, function (t, o) {
            a = o;
            if ($.isArray(o)) {
                a = typeof o[1] == "undefined" ? o[0] : o[1]
            }
            r = n[a];
            e.setVal(o, r, i)
        })
    };
    e.setVal = function (i, a, r) {
        var o, s, l, c = t(r);
        if ($.isArray(i)) {
            l = typeof a != "undefined" ? a : "";
            c("#" + i[0]).val(l)
        } else {
            o = c("#" + i);
            if (o.size() < 1) {
                o = c("[name=" + i + "]")
            }
            s = o.attr("type");
            l = typeof a != "undefined" ? a : "";
            if (n[i]) {
                var u = e.datadeal[n[i]];
                if (u) {
                    l = u.disbuild(l)
                }
            }
            if (s == "radio") {
                c("[name=" + i + "][value=" + l + "]").prop("checked", "checked")
            } else if (s == "checkbox") {
                var d = {};
                if ($.isArray(l)) {
                    $.each(l, function (e, t) {
                        d[t + ""] = 1
                    })
                } else {
                    d[l + ""] = 1
                }
                c("[name=" + i + "]").each(function (e, t) {
                    var n = c(t), i = t.value;
                    var a = !!d[i + ""];
                    n.prop("checked", a)
                })
            } else {
                o.each(function (e, t) {
                    if (t.tagName.toUpperCase() === "SELECT") {
                        $(t).val(l)
                    } else {
                        o.val(l)
                    }
                })
            }
        }
    };
    var n = {};
    e.setFieldBuilder = function (t, i) {
        if (e.datadeal[i]) {
            n[t] = i
        }
    };
    e.datadeal = {
        binary_plus: {
            build: function (e) {
                var t = 0;
                $.each(e, function (e, n) {
                    t += parseInt(n, 10)
                });
                return t
            }, disbuild: function (e) {
                var t = [];
                var n = e.toString(2).split("").reverse();
                $.each(n, function (e, n) {
                    if (parseInt(n, 10)) {
                        t.push(1 << e)
                    }
                });
                return t
            }
        }, array: {
            build: function (e) {
                return e.join(",")
            }, disbuild: function (e) {
                return e.split(",")
            }
        }
    };
    e.clearFieldValue = function (e, n) {
        var i = t(n);
        $.each(e, function (e, t) {
            i("#" + t).val("")
        })
    };
    e.setFieldsAttr = function (e, n, i, a) {
        var r = t(a);
        $.each(e, function (e, t) {
            r("#" + t).attr(n, i)
        })
    };
    e.getFieldsData = function (n, i) {
        var a = t(i);
        var r = {};
        var o, s, l, c;
        for (var u = 0, d = n.length; u < d; u++) {
            var f = n[u];
            if ($.isArray(f)) {
                c = f[0];
                l = f[1];
                if (l == "check") {
                    $.each(c, function (t, n) {
                        r[n] = e.getFieldData(n, i)
                    })
                }
            } else {
                o = a("#" + f);
                l = o.attr("type");
                s = o.attr("name");
                if (o.size() < 1) {
                    o = a("[name=" + f + "]")
                }
                s = s || f;
                r[s] = e.getFieldData(f, i)
            }
        }
        return r
    };
    e.getFieldData = function (i, a) {
        var r = t(a);
        var o, s, l, c, u;
        c = "";
        var d = i;
        o = r("#" + d);
        if (o.size() < 1) {
            o = r("[name=" + d + "]")
        }
        l = o.attr("type");
        s = o.attr("name");
        s = s || d;
        if (l == "radio") {
            c = r("[name=" + s + "]:checked").val()
        } else if (l == "checkbox") {
            u = [];
            r("[name=" + s + "]:checked").each(function (e, t) {
                u.push(t.value)
            });
            c = u
        } else {
            c = o.size() > 0 ? o.val() : ""
        }
        if (n[d]) {
            var f = e.datadeal[n[d]];
            if (f) {
                c = f.build(c)
            }
        }
        return c
    };
    e.setValue = e.setFieldData = e.setVal;
    e.setFieldsData = e.setFieldValue;
    e.getValue = e.getFieldData;
    e.setFieldAsso = function (n, i, a, r, o) {
        o = o || {};
        var s = t(o.cnt);
        var l = function () {
            var t = e.getFieldData(n);
            var o = $.inArray(t, i) >= 0;
            a && s("#" + a)[o ? "show" : "hide"]();
            if (r) {
                r(o)
            }
        };
        var c, u, d;
        e._fieldAsso[n] = e._fieldAsso[n] || [];
        e._fieldAsso[n].push(l);
        c = s("#" + n);
        if (c.size() < 1) {
            c = s("[name=" + n + "]")
        }
        if (c.size() < 1) {
            return
        }
        u = c.attr("type").toLowerCase();
        d = c.prop("tagName").toLowerCase();
        if (d == "select") {
            c.bind("change", l)
        } else if (u == "radio") {
            s("[name=" + n + "]").bind("click", l)
        }
    };
    e._fieldAsso = {};
    e.fireFieldAsso = function (t) {
        var n = e._fieldAsso[t];
        if (n) {
            $.each(n, function (e, t) {
                t()
            })
        }
    };
    e.uploadid = 0;
    e.uploadImg = function (e, t, n, i, a, r) {
        n = typeof n == "object" ? n : $(n);
        t["_file"] = {1: n};
        QBL.uploader(e, t, a, {callbackName: i, onError: r})
    };
    return e
});
define("js/modules/validator", ["require", "jquery", "js/modules/common", "js/modules/form", "js/config/comm"], function (require) {
    var e = {}, $ = require("jquery"), t = require("js/modules/common"), n = require("js/modules/form"), i = require("js/config/comm");
    $.extend(e, function () {
        var e = {}, a = $.each;
        e._fieldDict = {};
        e.valFields = function (t) {
            var n = true;
            var i;
            a(t, function (t, a) {
                var r = e.valField(a);
                if (r) {
                    if (!i) {
                        var o = $(a).top - 70;
                        scrollTo(0, o);
                        i = true
                    }
                    n = false
                }
            });
            return n
        };
        e.onceValFinish = function (e) {
        };
        e.valField = function (t) {
            var n = e.fieldValidate[t];
            if (n) {
                var i = n(t);
                if (i) {
                    e.showFieldErr(t, i);
                    e._fieldDict[t] = false
                } else {
                    e.clearFieldErr(t);
                    e._fieldDict[t] = true
                }
            }
            e.onceValFinish(e._fieldDict);
            return i
        };
        e.clearFieldErr = function (e) {
            $("#" + e + "ErrTip").hide()
        };
        e.showFieldErr = function (e, t) {
            var n = $("#" + e + "ErrTip");
            if (n.size() > 0) {
                n.html('<span class="ico_warring">警告：</span>' + t + '<span class="ico_arrow">&nbsp;</span>').show();
                return
            }
            var i = document.createElement("div");
            i.className = "errorbox";
            i.id = e + "ErrTip";
            i.innerHTML = '<span class="ico_warring">警告：</span>' + t + '<span class="ico_arrow">&nbsp;</span>';
            $("#" + e).parents("[adrow]").append(i)
        };
        e.dependents = function (e) {
            var t = true, i, r = [], o = {};
            if (e && $.type(e) == "array") {
                a(e, function (e, t) {
                    if ($.isArray(t)) {
                        i = t[0];
                        r.push(i);
                        o[i] = t
                    }
                });
                var s = n.getFieldsData(r);
                a(e, function (e, n) {
                    if ($.isFunction(n)) {
                        t = n()
                    } else {
                        i = n[0];
                        var a = n[1];
                        var r = s[i];
                        if (n[2] == "int") {
                            r = parseInt(r, 10)
                        }
                        if (r != a) {
                            t = false
                        }
                    }
                    return t
                })
            }
            return t
        };
        e.setVal = function (t) {
            var i = function (t) {
                var i = t.field, r = t.valfun, o = t.type, s = t.tip, l = t.deps, c = t.args;
                if (!o && !r) {
                    return
                }
                e.fieldValidate[i] = function (t) {
                    var u = true, d = false, f = "";
                    var p = e.dependents(l);
                    var m = e.valfun[o];
                    if (r) {
                        u = r(i);
                        d = !u;
                        f = u || s
                    } else if (o && m) {
                        var g = n.getFieldData(i);
                        var h = [g];
                        var v = e._fieldargs[o];
                        if (v && c) {
                            a(v, function (e, t) {
                                var n = typeof c[t] != "undefined" ? c[t] : null;
                                h.push(n)
                            })
                        }
                        d = m.apply(null, h);
                        f = s
                    }
                    if (p && !d) {
                        return f
                    }
                }
            };
            if ($.isArray(t)) {
                a(t, function (e, t) {
                    var n = t[0], r = t[1];
                    if ($.isArray(r)) {
                        a(r, function (e, t) {
                            var a = [t[0], n, t[1]];
                            i(a)
                        })
                    } else {
                        i(t)
                    }
                })
            }
        };
        e.actionValField = function (t) {
            a(t, function (t, n) {
                var i = n;
                var a = n;
                if ($.isArray(n)) {
                    a = n[0];
                    i = n[1]
                }
                var r = function () {
                    e.valField(i)
                };
                var o = $("#" + a);
                if (o.size() < 1) {
                    o = $("[name=" + a + "]")
                }
                if (o.size() < 1) {
                    return
                }
                var s = o.prop("tagName").toLowerCase();
                var l = (o.attr("type") || "").toLowerCase();
                if (s == "input" && (l == "checkbox" || l == "radio")) {
                    $("[name=" + a + "]").bind("click", r)
                }
                var c = "";
                if (s == "select") {
                    c = "change"
                }
                if (s == "input" || s == "textarea") {
                    c = "keyup"
                }
                $("#" + a).bind(c, r)
            })
        };
        e.fieldValidate = {};
        e._fieldargs = {txt: ["min", "max", "isByteLen", "isUTF8"], num: ["min", "max"], checkbox: ["min", "max"]};
        e.valfun = {
            empty: function (e) {
                if (!e) {
                    return false
                } else {
                    return true
                }
            }, isnum: function (e) {
                if (/^\d+$/.test(e)) {
                    return true
                } else {
                    return false
                }
            }, qq: function (e) {
                if (/^\d{4,11}$/.test(e)) {
                    return true
                } else {
                    return false
                }
            }, price: function (e) {
                return /^\d+(\.\d{1,2})?$/.test(e + "")
            }, txt: function (e, n, i, a, r) {
                var r = r || false, o;
                if (!a) {
                    o = e.length
                } else {
                    o = t.getRealLen($.trim(e), r)
                }
                return o >= n && o <= i ? true : false
            }, num: function (e, t, n) {
                var i = Number(e);
                if (isNaN(i)) {
                    return false
                }
                return i >= t && i <= n ? true : false
            }, mail: function (e) {
                var t = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, n = $.trim(e);
                return t.test(n) ? true : false
            }, phone: function (e) {
                var t = /^(0[0-9]{2,3}(\-)?)?([2-9][0-9]{6,7})(\-[0-9]{1,4})?$/, n = /^1\d{10}$/, i = $.trim(e);
                return t.test(i) || n.test(i) ? true : false
            }, mobile: function (e) {
                var t = /^1\d{10}|\+\d{6,13}$/, n = $.trim(e);
                return t.test(n) ? true : false
            }, url: function (e) {
                var t = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i, n = $.trim(e);
                return t.test(n) ? true : false
            }, qqurl: function (e) {
                var t = /^https?\:\/\/[\w\-\.]+\.qq\.com(?:\/|$)/i, n = $.trim(e);
                return t.test(n) ? true : false
            }, post: function (e) {
                var t = /^\d{6}$/, n = $.trim(e);
                return t.test(n) ? true : false
            }
        };
        e.emptyValidate = function (t) {
            var i = n.getFieldData(t);
            return e.valfun.empty(i)
        };
        e.numValidate = function (t) {
            var i = n.getFieldData(t);
            return e.valfun.isnum(i)
        };
        e.limitValidate = function (t) {
            var n = true;
            if (!e.valfun.isnum(t)) {
                n = {type: "error", msg: "请输入合法的日限额，必须为整数"}
            } else if (t > 1 && t.toString().substring(0, 1) === "0") {
                n = {type: "error", msg: "请输入合法的日限额，必须为整数"}
            }
            return n
        };
        e.priceValidate = function (t, n, a) {
            var r = i.ENV.PRICE_MIN, o = i.ENV.PRICE_MAX, s = true, l = i.ENV.CPMPRICE_MIN;
            if (a && a.minprice > 0 && a.maxprice > 0) {
                r = a.minprice;
                o = a.maxprice
            }
            if (n == i.ENV.OCPA && a && a.optimization_goal_max_price > 0 && a.optimization_goal_min_price > 0) {
                r = a.optimization_goal_min_price;
                o = a.optimization_goal_max_price
            }
            if (!e.valfun.price(t)) {
                s = {type: "error", msg: "出价错误，支持两位小数"}
            } else if (t > 1 && t.toString().substring(0, 1) === "0") {
                s = {type: "warning", msg: "当前输入为" + parseFloat(t, 10) + "元，请确定是否符合您的预期"}
            } else if (t < r || t > o) {
                s = {type: "error", msg: "请正确输入广告出价，有效范围为" + [r, o].join("-") + "元"}
            } else if (t > i.ENV.CPC_PRICE_WARNING) {
                s = {type: "warning", msg: "当前输入为" + t + "元，请确定是否符合您的预期"}
            } else if (n == i.ENV.CPM && t < l) {
                s = {type: "error", msg: "请正确输入出价，最少出价为" + l + "元"}
            }
            return s
        };
        e.cpmFreqValidate = function (t) {
            var n = true, i = e.valfun.num, a = /\./, r = t.min_impression_include || "", o = t.max_impression_include || "";
            if (isNaN(r) || isNaN(o) || a.test(r) || a.test(o)) {
                n = false
            } else {
                r = parseInt(r, 10);
                o = parseInt(o, 10);
                if (r > 1e3 || o > 1e3) {
                    n = {type: "error", msg: "曝光限额不能超过1000"}
                } else if (r <= 0 || o <= 0) {
                    n = false
                } else if (o < r) {
                    n = {type: "error", msg: "广告曝光下限应该小于或等于上限值"}
                } else if (!(i(r, 1, 1e3) || i(o, 1, 1e3))) {
                    n = false
                }
            }
            if (n === false) {
                n = {type: "error", msg: "请正确填写频次控制，要求为1000以内的正整数"}
            }
            return n
        };
        return e
    }());
    e.validate = function (e, t) {
        var n, i, a = {
            url: function (e) {
                var t = /^https?:\/\/([a-zA-Z0-9\-]+\.)+([a-zA-Z]{2,4})([\/|\?|\#][a-zA-Z0-9`~!@#%&_=;\$\^\*\(\)\-\+\{\}\[\]\:\,\.\?\/\|]*)?$/;
                return t.test(e)
            }, tencent: function (e) {
                var t = /^tencent:\/\//;
                return t.test(e)
            }, uin: function (e) {
                return /^\d{5,11}$/.test(e)
            }, opappid: function (e) {
                return /^[0-9]+$/.test(e)
            }, myappid: function (e) {
                return /^[0-9]+$/.test(e)
            }, itunesappid: function (e) {
                return /^[0-9]+$/.test(e)
            }, taskid: function (e) {
                return !!e
            }, tel: function (e) {
                var t = /^\+?([0-9]{2,3})?\-?[0-9]{3,4}\-?[0-9]{6,8}(\-[0-9]{1,8})?$/, n = /^\+?[0-9]{6,13}$/, i = QZFL.string.trim(e);
                return t.test(i) || n.test(i) ? true : false
            }, weixin: function (e) {
                var t = /^weixin:\/\//;
                return t.test(e)
            }, wechathttp: function (e) {
                var t = /^https?:\/\/mp.weixin.qq.com\/s/, n = /^https?:\/\/mp.weixin.qq.com\/mp/;
                return t.test(e) || n.test(e)
            }
        };
        typeof t === "undefined" && (t = this);
        if (typeof t === "undefined") {
            return null
        }
        if (t.nodeType && t.nodeType == 1) {
            i = t.value
        } else {
            i = t
        }
        if (e in a) {
            n = a[e].call(t, i)
        } else {
            n = true
        }
        return n
    };
    return e
});
define("js/filter/string", ["require", "angular", "js/modules/common"], function (require) {
    var e = "filter.string", t = require("angular"), n = require("js/modules/common"), i = t.module(e, []), a = {};
    t.extend(a, {
        cutString: function (e, t, i) {
            e = String(e);
            t -= 0;
            i = i || "";
            if (isNaN(t)) {
                return e
            }
            var a = e.length, r = Math.min(Math.floor(t / 2), a), o = n.getRealLen(e.slice(0, r));
            for (; r < a && o < t; r++) {
                o += 1 + (e.charCodeAt(r) > 255)
            }
            return e.slice(0, o > t ? r - 1 : r) + (r < a ? i : "")
        }
    });
    t.forEach(a, function (e, t) {
        i.filter(t, function () {
            return e
        })
    });
    i.filter("trustedHtml", ["$sce", function (e) {
        return function (t) {
            return e.trustAsHtml(t)
        }
    }]);
    return e
});
define("js/modules/jquery.plugin", ["require", "jquery"], function (require) {
    "use strict";
    require("jquery");
    (function () {
        var e = {}, t = "qq.com";
        var n = {
            ua: function () {
                var e = {}, t = navigator.userAgent;
                if (window.ActiveXObject) {
                    e.ie = 6;
                    (window.XMLHttpRequest || t.indexOf("MSIE 7.0") > -1) && (e.ie = 7);
                    (window.XDomainRequest || t.indexOf("Trident/4.0") > -1) && (e.ie = 8);
                    t.indexOf("Trident/5.0") > -1 && (e.ie = 9);
                    t.indexOf("Trident/6.0") > -1 && (e.ie = 10);
                    e.isBeta = navigator.appMinorVersion && navigator.appMinorVersion.toLowerCase().indexOf("beta") > -1;
                    if (e.ie < 7) {
                        try {
                            document.execCommand("BackgroundImageCache", false, true)
                        } catch (n) {
                        }
                    }
                } else if (document.getBoxObjectFor || typeof window.mozInnerScreenX != "undefined") {
                    var i = /(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+)/i;
                    e.firefox = parseFloat(i.exec(t)[1], 10)
                } else if (!navigator.taintEnabled) {
                    var a = /AppleWebKit.(\d+\.\d+)/i.exec(t);
                    e.webkit = a ? parseFloat(a[1], 10) : document.evaluate ? document.querySelector ? 525 : 420 : 419;
                    if ((a = /Chrome.(\d+\.\d+)/i.exec(t)) || window.chrome) {
                        e.chrome = a ? parseFloat(a[1], 10) : "2.0"
                    } else if ((a = /Version.(\d+\.\d+)/i.exec(t)) || window.safariHandler) {
                        e.safari = a ? parseFloat(a[1], 10) : "3.3"
                    }
                    e.air = t.indexOf("AdobeAIR") > -1 ? 1 : 0;
                    e.isiPod = t.indexOf("iPod") > -1;
                    e.isiPad = t.indexOf("iPad") > -1;
                    e.isiPhone = t.indexOf("iPhone") > -1
                } else if (window.opera) {
                    e.opera = parseFloat(window.opera.version(), 10)
                } else {
                    e.ie = 6
                }
                if (!(e.macs = t.indexOf("Mac OS X") > -1)) {
                    e.windows = (a = /Windows.+?(\d+\.\d+)/i.exec(t), a && parseFloat(a[1], 10));
                    e.linux = t.indexOf("Linux") > -1;
                    e.android = t.indexOf("Android") > -1
                }
                e.iOS = t.indexOf("iPhone OS") > -1;
                !e.iOS && (a = /OS (\d+(?:_\d+)*) like Mac OS X/i.exec(t), e.iOS = a && a[1] ? true : false);
                return e
            }(), setScrollTop: function (e, t) {
                $("html, body").animate({scrollTop: e || 0}, t || 500)
            }, insertCSSLink: function (t, i) {
                var a, r, o, s, l;
                if (e[t]) {
                    return
                }
                if (typeof i == "string") {
                    a = i
                }
                i = typeof i == "object" ? i : {};
                a = i.linkID || a;
                r = i.doc || document;
                l = r.getElementsByTagName("head")[0];
                s = (o = r.getElementById(a)) && o.nodeName == "LINK" ? o : null;
                if (!s) {
                    s = r.createElement("link");
                    a && (s.id = a);
                    s.rel = s.rev = "stylesheet";
                    s.type = "text/css";
                    s.media = i.media || "screen";
                    l.appendChild(s)
                }
                try {
                    t && (s.href = t)
                } catch (c) {
                }
                e[t] = true;
                return n.ua.ie < 9 && s.sheet || s
            }, escHTML: function (e) {
                var t = {"&amp;": /&/g, "&lt;": /</g, "&gt;": />/g, "&#039;": /\x27/g, "&quot;": /\x22/g};
                for (var n in t) {
                    e = e.replace(t[n], n)
                }
                return e
            }, restXHTML: function (e) {
                var t = {"<": /&lt;/g, ">": /&gt;/g, "'": /&(?:apos|#0?39);/g, '"': /&quot;/g, "&": /&amp;/g};
                for (var n in t) {
                    e = e.replace(t[n], n)
                }
                return e
            }, format: function (e, t) {
                var n = /\{([\w\.]*)\}/g;
                return e.replace(n, function (e, n) {
                    var i = n.split("."), a = t[i.shift()];
                    if (a) {
                        a = typeof $ != "undefined" ? $("<div></div>").text(a).html() : a
                    }
                    $.each(i, function () {
                        a = a[this]
                    });
                    return a === null || a === undefined ? "" : a
                })
            }, cut: function (e, t, i) {
                e = String(e);
                t -= 0;
                i = i || "";
                if (isNaN(t)) {
                    return e
                }
                var a = e.length, r = Math.min(Math.floor(t / 2), a), o = n.getRealLen(e.slice(0, r));
                for (; r < a && o < t; r++) {
                    o += 1 + (e.charCodeAt(r) > 255)
                }
                return e.slice(0, o > t ? r - 1 : r) + (r < a ? i : "")
            }, getRealLen: function (e, t) {
                var n = /[^\x00-\xFF]/g, i = /[\x00-\xFF]/g;
                if (typeof e != "string") {
                    return 0
                }
                if (!t) {
                    return e.replace(n, "**").length
                } else {
                    var a = e.replace(i, "");
                    return e.length - a.length + encodeURI(a).length / 3
                }
            }, cookie: function () {
                var e = function (t) {
                    if (arguments.length > 1) {
                        return e.set.apply(e, arguments)
                    } else {
                        return e.get(t)
                    }
                };
                e.set = function (e, n, i, a, r) {
                    var o, s;
                    if (r) {
                        o = new Date;
                        o.setTime(o.getTime() + 36e5 * r)
                    } else if (typeof i == "object") {
                        s = i;
                        i = s.domain;
                        a = s.path;
                        o = s.expires
                    }
                    document.cookie = e + "=" + n + "; " + (r ? "expires=" + o.toGMTString() + "; " : "") + (a ? "path=" + a + "; " : "path=/; ") + (i ? "domain=" + i + ";" : "domain=" + t + ";");
                    return true
                };
                e.get = function (e) {
                    var t = new RegExp("(?:^|;+|\\s+)" + e + "=([^;]*)"), n = document.cookie.match(t);
                    return !n ? "" : n[1]
                };
                e.del = function (e, n, i) {
                    document.cookie = e + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (i ? "path=" + i + "; " : "path=/; ") + (n ? "domain=" + n + ";" : "domain=" + t + ";")
                };
                return e
            }(), getACSRFToken: function () {
                var e = 5381, t = n.cookie.get("skey");
                for (var i = 0, a = t.length; i < a; ++i) {
                    e += (e << 5) + t.charCodeAt(i)
                }
                return e & 2147483647
            }, formPost: function (e, t, i) {
                function a(e) {
                    var t = {};
                    if (typeof e == "string" && (e = e.split("&"))) {
                        for (var n = 0; n < e.length; n++) {
                            var i = e[n].split("=");
                            t[i[0]] = i[1]
                        }
                    } else {
                        t = e
                    }
                    return t
                }

                var r = {
                    callback: function () {
                    }, onerror: function () {
                    }, charset: "utf-8", url: e, pIstanceKey: "pid" + Math.floor(Math.random() * 1e5)
                };
                if (typeof i == "undefined") {
                    i = t
                }
                if (typeof t == "function") {
                    i = t;
                    t = ""
                }
                $.extend(r, typeof i == "function" ? {callback: i} : i);
                var o = document.createElement("iframe"), s = n.ua.ie, l, c;
                c = '<!DOCTYPE html><html lang="zh-cn"><head><meta http-equiv="content-type" content="text/html; charset=' + r.charset + '" /><meta charset="' + r.charset + '" />';
                if (s) {
                    l = 'javascript:document.open();document.domain="' + document.domain + '";var me=parent["' + r.pIstanceKey + '"];document.write(me.ifrHTML);document.close();'
                }
                c = c + '<script type="text/javascript">' + (s && 'document.charset="' + r.charset + '"' || "") + ';document.domain="' + document.domain + '";frameElement.submited=void(0);frameElement.state="sending";</script></head><body>';
                c = c + '<form action="' + e + (e.indexOf("?") > -1 ? "&" : "?") + "g_tk=" + n.getACSRFToken() + '" accept-charset="' + r.charset + '" id="p" enctype="application/x-www-form-urlencoded;charset=' + r.charset + '" method="post">';
                c = c + '<input type="hidden" name="qzreferrer" id="qzreferrer" />';
                for (var u in t) {
                    c = c + '<input type="hidden" name="' + u + '" id="' + u + '" value="" />'
                }
                c = c + '</form><script type="text/javascript">var me=parent["' + r.pIstanceKey + '"];doc=document,f=doc.getElementById("p"),d=me.jsonData;';
                c = c + 'for(var i in d){doc.getElementById(i).value=decodeURIComponent(d[i]);}doc.getElementById("qzreferrer").value=parent.location.href;f.submit();me.postTime=+new Date;frameElement.submited=true;frameElement.state="sended";</script></body></html>';
                window[r.pIstanceKey] = r.ifrInfo = {
                    ifrHTML: c,
                    ifrurl: l,
                    startTime: +new Date,
                    postTime: 0,
                    endTime: 0,
                    ifr: o,
                    jsonData: a(t)
                };
                o.style.cssText = "width:0;height:0;border-width:0;display:none;";
                function d(e) {
                    e.ifr.parentNode == document.body && document.body.removeChild(e.ifr);
                    e.ifr.onload = e.ifr.onreadystatechange = null
                }

                o.callback = function (e) {
                    return function () {
                        e.ifrInfo.endTime = +new Date;
                        e.callback.apply(e, arguments);
                        d(e.ifrInfo)
                    }
                }(r);
                document.body.appendChild(o);
                o.onload = o.onreadystatechange = function (e) {
                    return function () {
                        if (this.readyState == "complete" || typeof this.readyState == "undefined") {
                            if ("sended".indexOf(this.state) > -1) {
                                e.ifrInfo.endTime = +new Date;
                                e.onerror.call(e, e);
                                d(e.ifrInfo)
                            }
                        }
                    }
                }(r);
                o.state = "initing";
                s ? setTimeout(function (e) {
                    return function () {
                        e.ifrInfo.ifr.state = "inited";
                        e.ifrInfo.ifr.src = e.ifrInfo.ifrurl
                    }
                }(r), 10) : o.src = "javascript:;";
                if (!s) {
                    var f = o.contentDocument || o.contentWindow.document;
                    if (f) {
                        f.open();
                        f.write(r.ifrInfo.ifrHTML);
                        f.close()
                    }
                }
            }, timeFormatString: function (e, t, i) {
                try {
                    e = e.getTime ? e : new Date(e)
                } catch (a) {
                    return ""
                }
                var r = {
                    y: ["getYear", 31104e6],
                    Y: ["getFullYear", 31104e6, "年前"],
                    M: ["getMonth", 2592e6, "个月前"],
                    d: ["getDate", 864e5, "天前"],
                    h: ["getHours", 36e5, "小时前"],
                    m: ["getMinutes", 6e4, "分钟前"],
                    s: ["getSeconds", 1e3, "秒前"]
                }, o = ["Y", "M", "d", "h", "m", "s"], s = false, l, c, u;
                if (!t) {
                    i = i || (window.g_NowTime ? new Date(window.g_NowTime * 1e3) : new Date);
                    c = Math.abs(e - i);
                    for (var d = 0, f = o.length; d < f; ++d) {
                        l = r[o[d]];
                        if (c > l[1]) {
                            return Math.floor(c / l[1]) + l[2]
                        }
                    }
                    return "刚刚"
                } else {
                    return t.replace(/\{([_yYMdhms]{1,2})(?:\:([\d\w\s]))?\}/g, function (t, a, o) {
                        (s = a.charAt(0) == "_") && (a = a.charAt(1));
                        if (!r[a]) {
                            return t
                        }
                        if (!s) {
                            u = e[r[a][0]]();
                            a == "y" && (u %= 100);
                            a == "M" && u++;
                            return u < 10 ? n.fillLength(u, 2, o) : u.toString()
                        } else {
                            return Math.floor(Math.abs(e - i) / r[a][1])
                        }
                    })
                }
            }, fillLength: function (e, t, n, i) {
                if ((e = String(e)).length < t) {
                    var a = new Array(t - e.length);
                    a[i ? "unshift" : "push"](e);
                    e = a.join(n || "0")
                }
                return e
            }
        };
        $.extend(n)
    })()
});
define("js/modules/platform", ["require", "exports", "module", "jquery", "js/config/comm", "js/modules/account", "js/modules/jquery.plugin"], function (require, e, t) {
    "use strict";
    var $ = require("jquery"), n = require("js/config/comm"), i = require("js/modules/account"), a = {};
    require("js/modules/jquery.plugin");
    a = {
        getPlatform: function () {
            var e = "atlas_platform", t = "atlas", r = $.cookie.get(e) || "";
            if (location.href.indexOf("/cpt/") > -1) {
                return a.setPlatform("CPT")
            }
            if (i.isYYBKAAduser()) {
                t = "CPD"
            }
            if (!r || !n.supportPlatform[r] || r == "atlas" && i.isYYBKAAduser() || r == "CPD" && !i.isYYBKAAduser() || r == "CPT" && !i.isYYBAppAduser() && !i.isYYBKAAduser()) {
                r = t;
                a.setPlatform(r)
            }
            return r
        }, setPlatform: function (e) {
            var t = "atlas_platform";
            if (e && n.supportPlatform[e]) {
                $.cookie.set(t, e, "e.qq.com", "/");
                return e
            } else {
                return false
            }
        }
    };
    return a
});
define("js/modules/simulateui", ["require", "exports", "module", "jquery", "js/modules/common", "chosen/pinyin", "chosen/chosen.jquery"], function (require, e, t) {
    "use strict";
    var $ = require("jquery"), n = require("js/modules/common"), i = require("chosen/pinyin"), a = require("chosen/chosen.jquery");
    var r = n.getIEVersion() || -1;
    e.showChosenSelect = function (e, t) {
        var n = $(e), i = $.extend(true, {disable_search_threshold: 50}, t), a = false, r = 30;
        if (typeof i.alwaysChosen != "undefined" && i.alwaysChosen) {
            try {
                a = n.chosen(i);
                a.trigger("chosen:updated")
            } catch (o) {
                a = n.chosen(i)
            }
        } else if (i.forceShow) {
            a = n.chosen(i)
        } else if (n.length > 0 && n.is(":visible")) {
            a = n.chosen(i)
        }
        if (a && t.height && t.height < n.find("option").size() * r) {
            n.next().find(".chosen-results").css("height", t.height + "px")
        }
        return a
    };
    e.digestChosen = function (e, t) {
        var e = e || "", n = e ? e + "_chosen" : "", i = $(e), a = $(n), t = t || function () {
            };
        if (r == 8 && !!i.attr("ng-options")) {
            return false
        }
        if (i.length > 0 && a.length > 0) {
            a.on("click", "li", function () {
                var e = i.val(), n = e ? e.split(":") : [], a = n.length > 1 ? n[1] : n;
                t(a)
            })
        }
    }
});
define("js/modules/dialog", ["require", "exports", "module", "jquery", "js/lib/bootstrap/bootstrap"], function (require, e, t) {
    "use strict";
    var $ = require("jquery"), n = require("js/lib/bootstrap/bootstrap");
    var i = ["0", "0", "0", "0", "0", "0", "0"], a = function () {
        var e = i.length;
        var t;
        while (e) {
            e--;
            t = i[e].charCodeAt(0);
            if (t == 57) {
                i[e] = "A";
                return i.join("")
            }
            if (t == 90) {
                i[e] = "0"
            } else {
                i[e] = String.fromCharCode(t + 1);
                return i.join("")
            }
        }
        i.unshift("0");
        return i.join("")
    };
    var r = function (e) {
        var t = {
            on: function () {
                var e = Array.prototype.slice.call(arguments, 0);
                $("#" + this.id).on(e[0], e[1]);
                return this
            }, off: function () {
                var e = Array.prototype.slice.call(arguments, 0);
                $("#" + this.id).off(e[0], e[1]);
                return this
            }, trigger: function () {
                var e = Array.prototype.slice.call(arguments, 0);
                $("#" + this.id).trigger(e[0], e[1]);
                return this
            }, center: function () {
                var e = this.id;
                var t = $("#" + e), n = t.find(".modal-dialog"), i = 0, a = parseInt($(window).height()) || 0;
                if (n.length > 0) {
                    i = parseInt(n.height()) || 0
                }
                if (i < 1 || a < 1) {
                    return this
                }
                n.css({"margin-top": a / 2 - i / 2, "margin-bottom": 0, "margin-left": "auto", "margin-right": "auto"});
                return this
            }, destroy: function () {
                var e = this.id, t = $("#" + e), n = t.closest(".tipspop");
                if (n.length > 0) {
                    setTimeout(function () {
                        n.remove()
                    }, 2e3)
                }
                return this
            }, close: function () {
                var e = this.id;
                $("#" + e).modal("toggle");
                this.destroy();
                this.trigger("close");
                return this
            }
        }, e = e || {};
        for (var n in t) {
            e[n] = t[n]
        }
        return e
    };
    var o = function (e) {
        var t = $.extend({
            header: "",
            title: "",
            content: "",
            width: 329,
            buttons: [{label: "取消", "class": "btn-default", type: "cancel"}, {
                label: "确认",
                "class": "btn-primary",
                type: "confirm"
            }],
            modal: {backdrop: ""},
            render: function () {
            }
        }, e);
        t.title = t.title + "";
        t.content = t.content + "";
        t.width = parseInt(t.width) || 329;
        if (t.content.length < 1) {
            throw"内容不能为空";
            return false
        }
        this.setting = t;
        this.id = "GDTDialog_" + a();
        this.render()
    };
    r(o.prototype);
    o.prototype.render = function () {
        var e = this.setting || {}, t = this.id;
        var n = "", i = e.buttons || [], a = i.length, r = e.header || "", o = "";
        if (r) {
            r = '<h4 class="modal-title">' + r + "</h4>"
        }
        if (a > 0) {
            for (var s = 0; s < a; s++) {
                if (i[s]) {
                    o = i[s]["type"] ? i[s]["type"] : "";
                    n += '<button type="button" class="btn ' + i[s]["class"] + '" data-type="' + o + '">' + i[s]["label"] + "</button>"
                }
            }
        }
        var l = ['<div class="tipspop">', '<div class="modal fade" tabindex="-1" role="dialog" id="' + t + '">', '<div class="modal-dialog" style="width:' + e.width + 'px;">', '<div class="modal-content modal-width-ft">', '<div class="modal-header">', '<button type="button" class="close"><span aria-hidden="true">&times;</span></button>', r, "</div>", '<div class="modal-body">', e.title ? '<p class="s-tit"><strong>' + e.title + "</strong></p>" : "", '<div class="nor-line">', e.content, "</div>", "</div>", '<div class="modal-footer">', n, "</div>", "</div>", "</div>", "</div>", "</div>"].join("");
        $("body").append(l);
        $("#" + t).modal(e.modal);
        e.render && e.render(t);
        this.center();
        this.bindEvent()
    };
    o.prototype.bindEvent = function () {
        var e = this, t = this.setting, n = this.id;
        $("#" + n).on("click", "button.close", function () {
            e.close()
        }).on("click", ".modal-footer button", function () {
            var n = $(this), i = n.attr("data-type") || "";
            if (i == "cancel") {
                if (t.cancel) {
                    if (t.cancel(e)) {
                        e.close();
                        e.trigger("cancel")
                    }
                } else {
                    e.cancel()
                }
            } else if (i == "confirm") {
                if (t.confirm) {
                    if (t.confirm(e)) {
                        e.close();
                        e.trigger("confirm")
                    }
                } else {
                    e.confirm()
                }
            } else {
                e.trigger(i)
            }
        });
        $(window).on("resize", function () {
            e.center()
        })
    };
    o.prototype.cancel = function () {
        this.close();
        this.trigger("cancel")
    };
    o.prototype.confirm = function () {
        this.close();
        this.trigger("confirm")
    };
    var s = function (e) {
        var t = $.extend(true, {
            title: "",
            message: "",
            width: 329,
            time: 1500,
            type: "warn",
            autohide: true,
            modal: {backdrop: ""},
            render: function () {
            }
        }, e);
        t.title = t.title + "";
        t.message = t.message + "";
        t.width = parseInt(t.width) || 329;
        t.time = parseInt(t.time) || 5e3;
        this.typeClass = {
            strongwarn: "ico-strongwarn-mid",
            warn: "ico-warn-mid",
            success: "ico-success-mid",
            wrong: "ico-wrong-mid",
            confirm: "ico-confirm-mid",
            tips: "ico-tips-mid",
            loading: "ico-loading"
        };
        if (t.title.length < 1 || !t.type || !this.typeClass[t.type]) {
            throw"标题不能为空";
            return false
        }
        this.setting = t;
        this.id = "GDTDialog_" + a();
        this.timeout = null;
        this.render()
    };
    r(s.prototype);
    s.prototype.render = function () {
        var e = this, t = this.setting || {}, n = this.id;
        var i = ['<div class="tipspop">', '<div class="modal fade" tabindex="-1" role="dialog" id="' + n + '">', '<div class="modal-dialog" style="width:' + t.width + 'px;">', '<div class="modal-content">', '<div class="modal-body">', '<div class="modal-body-single">', '<p class="s-tit"><i class="icon ' + this.typeClass[t.type] + '"><i></i></i><strong>' + t.title + "</strong></p>", t.message ? '<p class="nor-line">' + t.message + "</p>" : "", "</div>", "</div>", "</div>", "</div>", "</div>", "</div>"].join("");
        $("body").append(i);
        $("#" + n).modal(t.modal);
        t.render && t.render(n);
        this.center();
        $(window).on("resize", function () {
            e.center()
        });
        if (t.autohide) {
            try {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(function () {
                    e.close()
                }, this.setting.time)
            } catch (a) {
            }
        }
    };
    return {
        show: function (e) {
            return new o(e)
        }, tip: function (e) {
            return new s(e)
        }, tip_strongwarn: function (e) {
            e.type = "strongwarn";
            return new s(e)
        }, tip_warn: function (e) {
            e.type = "warn";
            return new s(e)
        }, tip_success: function (e) {
            e.type = "success";
            return new s(e)
        }, tip_wrong: function (e) {
            e.type = "wrong";
            return new s(e)
        }, tip_confirm: function (e) {
            e.type = "confirm";
            return new s(e)
        }, tip_tips: function (e) {
            e.type = "tips";
            return new s(e)
        }, tip_loading: function (e) {
            e.type = "loading";
            return new s(e)
        }
    }
});
define("js/modules/atlasdomflag", ["require", "exports", "module", "jquery", "js/modules/jquery.plugin"], function (require, e, t) {
    "use strict";
    var $ = require("jquery"), n = "atlasdomflag";
    require("js/modules/jquery.plugin");
    $.cookie.del(n, "e.qq.com", "/");
    function i() {
        var e = $.cookie.get(n) || "";
        return e.split(",") || []
    }

    function a(e) {
        var t = e || "";
        if (t) {
            $.cookie.set(n, t, "e.qq.com", "/atlas/")
        } else {
            $.cookie.del(n, "e.qq.com", "/atlas/")
        }
    }

    e.set = function (e) {
        var e = e || "", t = i();
        if (e && $.inArray(e, t) < 0) {
            t.push(e);
            a(t.join(","));
            return true
        } else {
            return false
        }
    };
    e.remove = function (e) {
        var e = e || "", t = i();
        if (e) {
            for (var n = 0, r = t.length; n < r; n++) {
                if (t[n] == e) {
                    t.splice(n, 1);
                    break
                }
            }
            a(t.join(","))
        } else {
            a()
        }
        return true
    }
});
define("js/modules/atlasdominfo", ["require", "exports", "module", "jquery", "js/modules/jquery.plugin"], function (require, e, t) {
    "use strict";
    var $ = require("jquery"), n = "atlasdominfo";
    require("js/modules/jquery.plugin");
    $.cookie.del(n, "e.qq.com", "/");
    $.cookie.del(n, "e.qq.com", "/atlas/");
    function i() {
        var e = $.cookie.get(n) || "";
        return e.split(",") || []
    }

    function a(e) {
        var t = e || "";
        if (t) {
            $.cookie.set(n, t, "e.qq.com", "/atlas/")
        } else {
            $.cookie.del(n, "e.qq.com", "/atlas/")
        }
    }

    e.set = function (e, t) {
        var e = e || "", t = t || "", n = i(), r = "";
        r = e + "=" + encodeURIComponent(t);
        if (e && t && $.inArray(r, n) < 0) {
            n.push(r);
            a(n.join(","));
            return true
        } else {
            return false
        }
    };
    e.remove = function (e) {
        var e = e || "", t = i(), n = "", r = [];
        if (e) {
            for (var o = 0, s = t.length; o < s; o++) {
                n = t[o];
                r = n.split("=");
                if (r[0] == e) {
                    t.splice(o, 1);
                    break
                }
            }
            a(t.join(","))
        } else {
            a()
        }
        return true
    }
});
define("js/modules/jsonp", ["require", "modules/network", "js/modules/common", "aduser"], function (require) {
    var e = require("modules/network"), t = require("js/modules/common"), n = require("aduser");
    var i = function () {
        var t = Array.prototype.slice.call(arguments);
        t.length < 2 && (t[1] = {});
        t.length < 3 && (t[2] = function () {
        });
        t.length < 4 && (t[3] = {});
        !t[3] && (t[3] = {});
        !t[3].onError && t[3].errcbFn && (t[3].onError = t[3].errcbFn);
        t[3].charset = "utf-8";
        if (t && t[1] && typeof t[1]["owner"] == "undefined") {
            t[1]["owner"] = n.aduid
        }
        return e.poster.apply(null, t)
    };
    var a = function () {
        var a = Array.prototype.slice.call(arguments), r;
        a.length < 2 && (a[2] = {});
        a.length < 3 && (a[2] = function () {
        });
        a.length < 4 && (a[3] = {});
        !a[3] && (a[3] = {});
        !a[3].onError && a[3].errcbFn && (a[3].onError = a[3].errcbFn);
        a[3].charset = "utf-8";
        r = a[1];
        if (r && r.format && r.format === "xls") {
            var o = a[0];
            var s = t.parseUrl(o).search || {};
            r = $.extend({}, r, s);
            a[1] = r;
            i.apply(null, a);
            return false
        }
        if (a && a[1] && typeof a[1]["owner"] == "undefined") {
            a[1]["owner"] = n.aduid
        }
        return e.getter.apply(null, a)
    };
    return {poster: i, getter: a}
});
define("js/modules/uuid", function () {
    var e = "";

    function t() {
        function e() {
            return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1)
        }

        return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    }

    return {
        gen: t, get: function () {
            if (!e) {
                e = t()
            }
            return e
        }
    }
});define("js/pages/common", ["require", "jquery", "aduser", "utils", "js/modules/route", "js/modules/sideslide", "js/modules/message", "js/modules/accountstat", "js/modules/helpbar", "js/modules/common", "js/modules/account", "js/config/comm", "js/config/env", "js/modules/tips", "js/modules/platform", "js/modules/sideslide", "js/modules/atlasdomflag", "js/modules/atlasdominfo", "js/modules/report", "js/modules/jquery.plugin"], function (require) {
    "use strict";
    var $ = require("jquery"), e = require("aduser"), t = require("utils"), n = require("js/modules/route"), i = require("js/modules/sideslide"), a = require("js/modules/message"), r = require("js/modules/accountstat"), o = require("js/modules/helpbar"), s = require("js/modules/common"), l = require("js/modules/account"), c = require("js/config/comm"), u = require("js/config/env"), d = require("js/modules/tips"), f = require("js/modules/platform"), p = require("js/modules/sideslide"), m = require("js/modules/atlasdomflag"), g = require("js/modules/atlasdominfo"), h = require("js/modules/report");
    require("js/modules/jquery.plugin");
    function v() {
        $(window).bind("resize", function () {
            var e = $("#" + d.Greenhand_id);
            if (!e.length) {
                s.resizeMainDivHeightToMatchWin()
            }
        });
        s.resizeMainDivHeightToMatchWin()
    }

    function _() {
        N();
        y();
        E();
        I();
        j();
        O();
        L();
        F()
    }

    function y() {
        var t = e, i = $("#headerAccountInfo"), s = $("#gUserBar");
        //i.find("._accountname").text(t.logname || t.nickname).attr("title", t.logname);
        //var c = [$("<span></span>").text("QQ:" + t.loguid), $("<span></span>").text("帐户ID:" + t.aduid)];
        //i.find("._accountid").empty().append(c);
        i.click(function () {
            var e = $(this);
            l.privilegeElementShow($("#headerAccountInfo"));
            if (e.hasClass("user-logon")) {
                e.removeClass("user-logon")
            } else {
                e.addClass("user-logon")
            }
        });
        $("#logout").click(function () {
            T(u.PORTAL_PAGE);
            m.remove();
            g.remove()
        });
        $(document.body).bind("click.showAcctInfo", function (e) {
            var t = e.target;
            if ($(t).parents("#headerAccountInfo").length === 0) {
                i.removeClass("user-logon")
            }
        }).on("click", "._relateLink", function (e) {
            e.preventDefault();
            n.toPage(this.getAttribute("data-link"))
        });
        (function () {
            var e = function () {
                if (document.activeElement && document.activeElement.tagName == "IFRAME") {
                    i.removeClass("user-logon")
                }
                setTimeout(e, 500)
            };
            e()
        })();
        s.on("click", "#_logout", function () {
            T(u.PORTAL_PAGE);
            m.remove();
            g.remove()
        });
        a.init();
        r.init();
        o.init();
        if (l.checkPrivilege("phoenix")) {
            s.append('<div class="user-logon-list"><a href="javascript:;" data-hottag="Click.Entrance.PhoenixNew.All.NewAd" target="_blank" class="js_ordercreatebutton" data-version="new">新版本（内测）</a><a href="javascript:;" data-hottag="Click.Entrance.AtlasNew.All.NewAd" target="_blank" class="js_ordercreatebutton" data-version="old">老版本</a></div>').on({
                mouseleave: function () {
                    s.removeClass("on");
                    $('.__controller[data-hottag="atlas.sideslide.collapse"]').show()
                }, mouseover: function (e) {
                    var t = $('.__controller[data-hottag="atlas.sideslide.collapse"]');
                    if (e.target.id == "_logout" || e.target.id == "gUserBar") {
                        s.removeClass("on");
                        t.show()
                    } else if (!s.hasClass("on")) {
                        s.addClass("on");
                        t.hide()
                    }
                }
            });
            s.on("click", ".js_ordercreatebutton", function (t) {
                var i = $(this).data("version");
                if ($.inArray(e.status, [u.userStatusPrepare, u.userStatusInvalidate]) > -1) {
                    w(function () {
                        if (e.status == u.userStatusPrepare) {
                            n.toPage("tool/profile?act=edit")
                        } else {
                            n.toPage("tool/profile")
                        }
                    }, function () {
                        b(i)
                    })
                } else {
                    b(i)
                }
                t.preventDefault()
            })
        } else {
            /*s.on("click", "#createorder", function () {
             if ($.inArray(e.status, [u.userStatusPrepare, u.userStatusInvalidate]) > -1) {
             w(function () {
             if (e.status == u.userStatusPrepare) {
             n.toPage("tool/profile?act=edit")
             } else {
             n.toPage("tool/profile")
             }
             }, b)
             } else {
             b()
             }
             })*/
        }
    }

    function b(e) {
        var a = t.URIParams.get("search", "cid"), r;
        e = e || "old";
        if (e == "new") {
            window.open(n.genRealUrl("ad/create"))
        } else {
            r = u.ROOT + "order/edit";
            if (a) {
                r += "?cid=" + a
            }
            i.sideslide(r, {iframe: true})
        }
    }

    function w(t, i, a) {
        a = a || "index";
        var r = a == "index" ? "请立即前往账号中心修改资料，审核通过，才可以正常投放广告。" : "请立即前往账号中心修改资料，账户资料审核通过后即可充值。";
        var o = ['<div class="qz_dialog_layer_cont">', '    <div class="overdraw-result">', '        <h3 class="overdraw-result-tip"><i class="qz-dialog-icon dialog-icon-warning"></i>很抱歉，您提交的开户资料尚未通过审核！</h3>', "        <p>" + r + "</p>", '        <p>如有疑问可参考《<a href="http://e.qq.com/faq/list011.html" target="_blank">开户审核中常见拒绝原因及修改指引</a>》</p>', "    </div>", "</div>"].join(""), l = "前往修改", c = 500, d = 200, f = "atlas.userstatustips.invalidate";
        if (e.status == u.userStatusPrepare) {
            l = "立即补充";
            f = "atlas.userstatustips.prepare"
        }
        t = t || function () {
                if (e.status == u.userStatusPrepare) {
                    n.toPage("tool/profile?act=edit")
                } else {
                    n.toPage("tool/profile")
                }
            };
        i = i || $.noop;
        if (e.status == u.userStatusPrepare) {
            A(t, i, f);
            return
        }
        s.dialog("", o, {
            buttonConfig: [{
                type: s.dialog.BUTTON_TYPE.Confirm, text: l, clickFn: function () {
                    s.reportHottag("atlas.userstatustips.ok");
                    setTimeout(function () {
                        t()
                    }, 50)
                }
            }, {
                type: s.dialog.BUTTON_TYPE.Cancel, text: "暂时忽略", clickFn: function () {
                    i();
                    s.reportHottag(f)
                }
            }], onLoad: function (e) {
                $("#" + e.headId).find(".qz_dialog_btn_close").click(function () {
                    i();
                    s.reportHottag(f)
                })
            }, noCloseButton: true, width: c, height: d
        })
    }

    function A(e, t, n) {
        var i = ['<div id="prepare_pop" class="qz_dialog_layer width_448" style="z-index: 9999;position: absolute;right: auto;bottom: auto;left: 50%;top: 50%;margin: -197px 0 0 -225px;">' + '<div class="qz_dialog_layer_main">' + '<div class="qz_dialog_layer_cont _cont-banner">' + '<img src="img/gdt-wxguanzhu1.jpg" alt="">' + '<div class="qrcode">' + '<img id="qr_prepare" alt="">' + "</div>" + "</div>" + '<div class="qz_dialog_layer_cont">' + '<div class="overdraw-result">' + '<h3 class="overdraw-result-tip"><i class="qz-dialog-icon dialog-icon-warning"></i>您尚未完成开户流程</h3>' + "<p>请您尽快补全资质以便我们进行开户审核</p>" + '<p class="c-yellow">您也可以扫描上方二维码关注服务号后，直接用手机拍照补全资质。</p>' + "</div>" + "</div>" + '<div class="qz_dialog_layer_ft">' + '<div class="qz_dialog_layer_op"><a href="javascript:;" title="点击这里补全" class="qz_dialog_layer_btn qz_dialog_layer_sub _confirm"><span>立即补全</span></a><a href="javascript:;" title="点击这里取消" class="qz_dialog_layer_btn qz_dialog_layer_nor _cancel"><span>暂时忽略</span></a></div>' + "</div>" + "</div>" + "</div>"].join("");
        $(i).appendTo($("body"));
        QZFL.maskLayout(999, null, {opacity: .7});
        s.getWXQrcode($("#qr_prepare"), "ATALS-2001");
        $("#prepare_pop").on("click", "._confirm", function () {
            s.reportHottag("atlas.userstatustips.ok");
            setTimeout(function () {
                e()
            }, 50)
        }).on("click", "._cancel", function () {
            $("#prepare_pop").remove();
            QZFL.maskLayout.remove();
            s.reportHottag(n);
            t()
        })
    }

    function T(n) {
        $.each(["uin", "skey", "zzpaneluin", "zzpanelkey", "atlas_aduid" + e.aduid], function (e, t) {
            $.cookie.del(t, "qq.com", "/")
        });
        $.each(["elogininfo", "gdt_elogin"], function (e, t) {
            $.cookie.del(t, "e.qq.com", "/")
        });
        t.storage.del("oLCD_lastUrl", "local");
        sessionStorage.removeItem("register_uid");
        n ? top.location.href = n : top.location.reload()
    }

    function E() {
        var e = c.navHeader, t = [], i, a, r = 0, o = ['<li style="width:56px"></li>'], s = false, l, d, p, m = u.ROOT, g = f.getPlatform(), h = 5, v = false;
        if (g == "CPT") {
            e = c.cpt_navHeader
        }
        p = n.getCurrentPageName() || "index";
        for (l = 0, d = e.length; l < d; l++) {
            s = false;
            r = -1;
            e[l][1] == p && (s = true);
            a = e[l][3];
            $.isArray(a) && $.each(a, function (e, t) {
                if (t[1] == p) {
                    s = true;
                    r = e;
                    return false
                }
            });
            i = e[l];
            if (i[2]) {
                t.push('<a href="' + m + i[1] + '" class="menu ' + (s ? "current" : "") + '"><span class="currentline"></span><i class="ico ' + i[2] + '"></i><p>' + i[0] + "</p></a>")
            }
            if (r > -1) {
                $.each(a, function (e, t) {
                    var n = [];
                    var i = a[r][3];
                    if (typeof t == "string") {
                        o.push(t)
                    } else {
                        if (r == e) {
                            n.push("on");
                            if (o.length > h + 1) {
                                v = o.length + 1
                            }
                        }
                        r == e && n.push("on");
                        if ($.isFunction(t[2]) && t[2]() === false) {
                            return
                        } else if (i && t[3] && i != t[3]) {
                            return
                        }
                        o.push("<li " + (n.length ? ' class="' + n.join(" ") + '"' : "") + '><a href="' + m + t[1] + '">' + t[0] + "</a></li>")
                    }
                })
            }
            if (v) {
                o.splice(2, v - h - 2)
            }
        }
        t = '<div class="inner">' + t.join("") + "</div>";
        o = o.length ? "<ul>" + o.join("") + "</ul>" : "";
        /*$("#_hNav").html(t);*/
        //$("#_hSubNav").html(o);
        if (p == "order.html" || p == "rulepackedit.html") {
            $("#_pageTip, #_hNav>div").addClass("none")
        } else {
            $("#_pageTip, #_hNav>div").removeClass("none");
            $("#_pageTip>div")[p == "index.html" ? "addClass" : "removeClass"]("index_top_hint_inner")
        }
    }

    function x() {
        $(document).on("click", "[data-hottag]", function () {
            s.reportHottag(this.getAttribute("data-hottag"))
        })
    }

    function P() {
        setTimeout(function () {
            $(document).off("click", "[data-action]").on("click", "[data-action]", function () {
                var t = $(this), n = t.attr("data-action") || "", i = t.attr("data-href") || t.attr("href") || "";
                var a = function (t) {
                    var n = e.loguid || "", a = e.aduid || "", r = e.status || "";
                    t = t || "";
                    if (!n || !a || !i || !t) {
                        return false
                    }
                    new h.WriteLog({invoice_id: "" + Math.floor((new Date).getTime() / 1e3) + a}).send({
                        action_flag: 1,
                        operate_type: 7,
                        loguid: n,
                        request_url: encodeURIComponent(i),
                        status: r,
                        page_type: t
                    })
                };
                switch (n) {
                    case"help":
                        a(n);
                        break;
                    case"consultation":
                        a(n);
                        break
                }
            })
        }, 200)
    }

    function C() {
        setTimeout(function () {
            $(document).off("click", "[data-material]").on("click", "[data-material]", function () {
                var e = $(this), t = e.attr("data-material") || "";
                var n = t.split(","), i = [], a = {};
                for (var r = 0, o = n.length; r < o; r++) {
                    i = n[r].split("=");
                    if (i.length == 2) {
                        a[i[0]] = i[1]
                    }
                }
                s.reportMaterial(a)
            })
        }, 200)
    }

    function S() {
        var e = "showMPQrcode", t = $("#" + e), n = ['<div class="pop-gz-gdt" id="' + e + '">', '<a href="javascript:;" class="close"></a>', '<p class="gdt-wx-erweima"><img src="http://ctc.imgcache.qq.com/open_proj/proj-gdt-toufang/img/showqrcode2.png" alt="腾讯广点通服务平台" width="270" height="270"></p>', '<p class="wline"><span>扫码关注公众账号，第一时间获知审核结果。</span></p>', "</div>"].join("");
        var i = function () {
            t.remove();
            QZFL.maskLayout.remove()
        };
        if (t.length > 0) {
            i()
        } else {
            $("body").append(n);
            QZFL.maskLayout(999, null, {opacity: .7});
            t = $("#" + e);
            s.getWXQrcode(t.find("img"), "ATLAS-2000");
            t.off("click").on("click", ".close", function () {
                i()
            }).on("click", "img", function () {
                s.getWXQrcode(t.find("img"), "ATLAS-2000")
            })
        }
    }

    function k() {
        setTimeout(function () {
            $(document).off("click", "[data-showmpqrcode]").on("click", "[data-showmpqrcode]", function () {
                S();
                return false
            })
        }, 200)
    }

    function I() {
        var t = $("#_switch_site"), i = $("#platform-control"), a = [], r = !l.checkPrivilege("market_block_user") && (l.isTaskAduser() || l.isOpenPlatformAppAduser() || l.isMyAppExchangeAduser() || e.targettype == u.TARGETTYPE_DEF.INNER_APP), o = l.checkPrivilege("dmp_user"), s = l.checkPrivilege("cpt_page"), d = l.isYYBKAAduser() || l.isYYBAppAduser(), p = f.getPlatform();
        var g = function (e) {
            if (e && c.supportPlatform[e]) {
                return '<a class="platform-task selectPlatform" data-platform="' + e + '" href="javascript:;"><span>' + c.supportPlatform[e] + "</span></a>"
            } else {
                return ""
            }
        };
        var h = function () {
            t.find(".switchicon").show();
            m.set("platformlist")
        };
        var v = function () {
            t.find(".switchicon").hide();
            m.remove("platformlist")
        };
        i.html(c.supportPlatform[p]).removeClass("none");
        if (l.isYYBKAAduser()) {
            $("#root").addClass("tcappstore");
            m.set("tcappstore")
        } else {
            $("#root").removeClass("tcappstore");
            m.remove("tcappstore")
        }
        if (r || o || s || d && p == "CPT") {
            h();
            t.find(".switchbutton").click(function () {
                var e = $("body");
                if (t.hasClass("platform-sel-hov")) {
                    t.removeClass("platform-sel-hov");
                    e.unbind("click.switchsite")
                } else {
                    t.addClass("platform-sel-hov");
                    e.bind("click.switchsite", function () {
                        t.removeClass("platform-sel-hov");
                        e.unbind("click.switchsite")
                    })
                }
                return false
            });
            if (r && !l.isYYBKAAduser()) {
                a.push(['<a class="platform-task" href="', l.getTaskLink(), '"><span>任务集市</span></a>'].join(""))
            }
            if (o) {
                a.push(['<a class="platform-task" href="http://de.qq.com/dmp/prometheus/3" target="_blank"><span>DMP平台</span></a>'].join(""))
            }
            if (d && p == "CPT") {
                if (l.isYYBKAAduser()) {
                    a.push([g("CPD")].join(""))
                } else if (l.isYYBAppAduser()) {
                    a.push([g("atlas")].join(""))
                }
            }
            if (s && p != "CPT") {
                a.push([g("CPT")].join(""))
            }
            t.find("#_switch_site_list").append(a.join(""));
            if (t.find(".selectPlatform").length > 0) {
                t.find(".selectPlatform").off("click").on("click", function () {
                    var e = $(this), t = e.attr("data-platform") || "atlas", i = {
                        CPD: "index",
                        atlas: "index",
                        CPT: "cpt/index"
                    }, a = false;
                    a = f.setPlatform(t);
                    if (a) {
                        n.toPage(i[t] || "index")
                    }
                })
            }
        } else {
            t.find(".switchbutton").css("cursor", "default");
            v()
        }
    }

    function N() {
        var e = location.href || "", t = [], n = [], i = "", a = u.ROOT, r = f.getPlatform() || "", o = false;
        if (!e) {
            return false
        }
        if (r == "CPT") {
            t = c.cpt_navHeader || [];
            for (var s = 0, d = t.length; s < d; s++) {
                n = t[s][3] || [];
                i = t[s][1] || "";
                if (e.indexOf(a + i) > -1) {
                    o = true;
                    break
                }
                if (!o && n.length > 0) {
                    for (var p = 0, m = n.length; p < m; p++) {
                        i = n[p][1] || "";
                        if (e.indexOf(a + i) > -1) {
                            o = true;
                            break
                        }
                    }
                }
            }
            if (!o) {
                if (l.isYYBKAAduser()) {
                    f.setPlatform("CPD")
                } else {
                    f.setPlatform("atlas")
                }
            }
        }
    }

    function j() {
        var e = f.getPlatform(), t = $("#createorder");
        if (e == "CPT") {
            t.addClass("none")
        } else {
            t.removeClass("none")
        }
    }

    function O() {
        var e = t.storage.get("oLCD_lastUrl", "local") || "", n = f.getPlatform();
        if (e && location.pathname.indexOf("/order/edit") < 0 && n != "CPT") {
            p.sideslide(e, {iframe: true, noexpand: true})
        }
    }

    function L() {
        var e = GDT.gAduser || {}, t = e.logname || e.nickname || "", n = e.loguid || "", i = e.aduid || "";
        g.remove("loguid");
        if (n) {
            g.set("loguid", n)
        }
        g.remove("aduid");
        if (i) {
            g.set("aduid", i)
        }
        g.remove("nickname");
        if (t) {
            g.set("nickname", t)
        }
    }

    function F() {
        var e = t.URIParams.get("search", "sub_url_need_open") || "", n = f.getPlatform();
        if (typeof e == "string" && e.indexOf(location.host) > -1 && location.pathname.indexOf("/order/edit") < 0 && n != "CPT") {
            p.sideslide(e, {iframe: true})
        }
    }

    return {
        initPage: function (t) {
            GDT.timepot.jsEnd = +new Date;
            t = t || {};
            //if (t.autoReportPV !== false) {
            //    s.reportPV()
            //}
            //if (t.autoReportSpeed !== false) {
            //    s.pageSpeed.report()
            //}
            if (!t.noNeedHeader) {
                _()
            }
            //x();
            P();
            C();
            k();
            v();
            //if ($.inArray(e.status, [u.userStatusPrepare]) > -1 && !$.cookie.get("atlas_aduid" + e.aduid)) {
            //    if (!t.isProfile) {
            //        $.cookie.set("atlas_aduid" + e.aduid, e.aduid, "qq.com", "/");
            //        this.showAccountNoReadyTips(false, function () {
            //            d.init(t)
            //        })
            //    }
            //} else if ($.inArray(e.status, [u.userStatusInvalidate]) > -1 && t.isIndex) {
            //    this.showAccountNoReadyTips(false, function () {
            //        d.init(t)
            //    })
            //} else {
            d.init(t)
            //}
            l.privilegeElementShow();
            $(".js_ng_hide").removeClass("none")
        }, logout: T, sideslide: i.sideslide, maskLayout: i.maskLayout/*, showAccountNoReadyTips: w*/
    }
});
define("js/modules/account", ["require", "js/config/env", "js/modules/common", "aduser", "privilege", "jquery", "utils"], function (require) {
    "use strict";
    var e = require("js/config/env"), t = require("js/modules/common"), n = require("aduser"), i = require("privilege"), $ = require("jquery"), a = require("utils"), r = {
        getLoguin: function (e) {
            var t = e || n, i;
            i = t && t.loguid;
            return i
        }, getOwneruin: function (e) {
            var t = e || n, i;
            i = t && t.aduid;
            return i
        }, getTaskLink: function () {
            return ["/task", r.getOwneruin(), "index"].join("/")
        }, setUserData: function (e) {
            n = e
        }, isBoss: function (e) {
            var t = e || n;
            return t && t.isboss ? true : false
        }, isQqBiz: function (e) {
            var t = e || n;
            return t && t.is_qq_biz ? true : false
        }, isInteractive: function (e) {
            return true
        }, isCPM: function () {
            return i.cpm ? true : false
        }, isBrand: function (t) {
            var i = t || n;
            return i && i.targettype == e.BRAND_ADUSER ? true : false
        }, isLongTail: function (t) {
            var i = t || n;
            return i && i.targettype == e.LONGTAIL_ADUSER ? true : false
        }, isShoppinginterest: function (e) {
            var t = e || n;
            return t && t.privilege && t.privilege.shoppinginterest ? true : false
        }, isConsumption: function (e) {
            var t = e || n;
            return t && t.privilege && t.privilege.highconsumption ? true : false
        }, isLowConsumption: function (e) {
            var t = e || n;
            return t && t.privilege && t.privilege.lowconsumption ? true : false
        }, isO2o: function (e) {
            var t = e || n;
            return t && t.privilege && t.privilege.limitation_1000 ? true : false
        }, isBqq: function (e) {
            var n = r.getOwneruin(), i = false;
            return t.isBqq(n)
        }, canCharge: function (e) {
            var t = e || n;
            return t && t.can_charge && !r.isLongTail(e) ? true : false
        }, canUseSellerQqType: function (e) {
            var t = e || n;
            return t && t.privilege && t.privilege.merchant_qq ? true : false
        }, canUseIframe: function () {
            var e = n;
            return e && e.privilege && e.privilege.renzheng_embed ? true : false
        }, checkPrivilege: function (e) {
            var t = n;
            var i = (e + "").split(/\s+/);
            for (var a = 0, r = i.length; a < r; a++) {
                if (t && t.privilege && t.privilege[i[a]]) {
                    return true
                }
            }
            return false
        }, isFormalEnvirment: function () {
            return e.env === "formal"
        }, isDevEnvirment: function () {
            return e.env === "develop"
        }, isTestEnvirment: function () {
            return e.env === "testidc"
        }, isGrayEnvirment: function () {
            return e.env === "gray"
        }, isPrepareStatus: function () {
            return $.inArray(n.status, [e.USER_STATUS_DEF.prepare, e.USER_STATUS_DEF.validating, e.USER_STATUS_DEF.invalidate]) > -1
        }, isTaskAduser: function () {
            return n.targettype === 28
        }, isMyAppExchangeAduser: function () {
            return n.aduser_type ? true : false
        }, isYYBKAAduser: function () {
            return r.checkPrivilege("ka_advertiser")
        }, isYYBAppAduser: function () {
            return r.checkPrivilege("myapppromotion")
        }, isPlanTypeAduser: function () {
            return r.checkPrivilege("tsa_search")
        }, isLocalAdUser: function () {
            return r.checkPrivilege("Local_ads")
        }, isOpenPlatformAppAduser: function () {
            return n.targettype == e.TARGETTYPE_DEF.OPEN_PLATFORM_APP
        }, isInnerAppAduser: function () {
            return n.targettype == e.TARGETTYPE_DEF.INNER_APP
        }, isGroupSearch: function () {
            return r.checkPrivilege("group_search")
        }, isWechatAduser: function () {
            return r.checkPrivilege("weixin_ex_link")
        }, privilegeElementShow: function (t, n) {
            var i, a, o;
            if (t) {
                i = $("._privilege", t)
            } else {
                i = $("._privilege")
            }
            i.each(function () {
                var t = $(this);
                a = t.attr("data-apiversionlimit");
                o = t.attr("data-privilege");
                if (t.attr("data-notshowaduser")) {
                    var i = t.attr("data-notshowaduser"), s = i.split(",");
                    if ($.inArray("KA", s) > -1 && r.isYYBKAAduser()) {
                        n ? t.remove() : t.hide()
                    } else {
                        t.show()
                    }
                } else if (a && e.apiVersion() == a) {
                    t.show()
                } else if (t.attr("data-cancharge") && r.canCharge()) {
                    if (r.isPrepareStatus()) {
                        t.hide()
                    } else {
                        t.show()
                    }
                } else if (t.attr("data-needboss")) {
                    if (r.isBoss()) {
                        t.show()
                    } else {
                        n ? t.remove() : t.hide()
                    }
                } else if (o && r.checkPrivilege(o)) {
                    t.show()
                } else {
                    n ? t.remove() : t.hide()
                }
            })
        }, isNotFirstCreateAd: function () {
            var e = r.getOwneruin(), t = "isnotfirstcreatead_" + e;
            return a.storage.get(t, "local") == 1 ? true : false
        }, setNotFirstCreateAdSign: function () {
            var e = r.getOwneruin(), t = "isnotfirstcreatead_" + e;
            a.storage.set(t, 1, {media: "local", expire: 864e5 * 1e4})
        }
    };
    return r
});
define("js/modules/route", ["require", "js/config/comm"], function (require) {
    "use strict";
    var e = require("js/config/comm");
    var t = "__subpage__", n = null, i;
    i = {
        getIframe: function () {
            return document.getElementById(t)
        }, toPage: function (e) {
            var t = i.genRealUrl(e);
            i.toUrl(t)
        }, toUrl: function (e) {
            window.location.href = e
        }, getCurrentPageName: function () {
            var e = "", t;
            try {
                e = location.pathname
            } catch (n) {
            }
            var i = /^\/atlas\/([0-9]{4,20})/;
            if (i.test(location.pathname)) {
                t = e.match(/\/([\w\.]+)\/([0-9]{4,20})\/{1,}(.*)/);
                return t && t.length ? t[3] : ""
            } else {
                t = e.match(/\/([\w\.]+)\/{1,}(.*)/);
                return t && t.length ? t[2] : ""
            }
        }, setPageHash: function (e) {
            var t = [], i = "gdtpath=" + e, a = n.contentWindow.location, r, o;
            t.push(i);
            try {
                r = a.search.slice(1);
                o = a.hash.slice(1)
            } catch (s) {
            }
            o && (t = t.concat(o.split("&")));
            r && (t = t.concat(r.split("&")));
            t = $.unique(t);
            location.hash = t.join("&")
        }, passSubFrameWH: function () {
            try {
                n.height = Math.max(i.getScrollHeight(n), 450)
            } catch (e) {
            }
        }, genVirtualUrl: function () {
        }, genRealUrl: function (t) {
            var n, a, r, o;
            if (t) {
                o = t
            } else {
                n = i.getParameter("gdtpath");
                if (a = n.match(/^(\w+\/)*(\w+)$/)) {
                    r = a.length > 2 ? a[1] ? a[1] : r : r;
                    o = a[2] || a[1]
                }
            }
            o = o || "index";
            return [e.ENV.ROOT, o].join("")
        }, getParameter: function (e, t) {
            var n = new RegExp("(\\?|#|&)" + e + "=([^&#]*)(&|#|$)");
            var i = location.href.match(n);
            if ((!i || i == "") && !t) {
                i = top.location.href.match(n)
            }
            return !i ? "" : i[2]
        }, getScrollHeight: function (e) {
            var t = 0;
            if (!window.opera) {
                if (e.contentDocument && e.contentDocument.body.offsetHeight) {
                    t = e.contentDocument.body.offsetHeight + 20
                } else if (e.Document && e.Document.body.scrollHeight) {
                    t = e.Document.body.scrollHeight + 10
                }
            } else {
                if (e.contentWindow.document && e.contentWindow.document.body.scrollHeight) {
                    t = e.contentWindow.document.body.scrollHeight
                }
            }
            t = t || e.contentDocument.body.offsetHeight + 20;
            return t
        }, getScrollWidth: function (e) {
            var t = e || document;
            return Math.max(t.documentElement.scrollWidth, t.body.scrollWidth)
        }
    };
    return i
});
define("js/modules/sideslide", ["require", "jquery", "js/modules/report", "js/modules/account", "js/config/comm", "utils"], function (require) {
    "use strict";
    var $ = require("jquery"), e = require("js/modules/report"), t = require("js/modules/account"), n = require("js/config/comm"), i = require("utils");
    var a = function () {
        var e = null, t = 0, n = function (n, i, a) {
            ++t;
            if (e) {
                return t
            }
            n = n || 5e3;
            i = i || document;
            a = a || {};
            var r = parseFloat(a.opacity);
            a.opacity = isNaN(r) ? .3 : r;
            r = parseFloat(a.top);
            a.top = isNaN(r) ? 0 : r;
            r = parseFloat(a.left);
            a.left = isNaN(r) ? 0 : r;
            e = $('<div class="gdt-mask" unselectable="on">').appendTo(i.body).get(0);
            e.style.cssText = 'background-color:#000;-ms-filter:"alpha(opacity=20)";#filter:alpha(opacity=' + 100 * a.opacity + ");opacity:" + a.opacity + "; position:fixed;_position:absolute;left:" + a.left + "px;top:" + a.top + "px;z-index:" + n + ";width:100%;height:" + i.body.clientHeight + "px;";
            return t
        };
        n.setOpacity = function (t) {
            if (e && t) {
                $(e).css("opacity", t)
            }
        };
        n.getRef = function () {
            return e
        };
        n.remove = function (n) {
            t = Math.max(--t, 0);
            if (!t || n) {
                $(e).remove();
                e = null;
                n && (t = 0)
            }
        };
        return n.create = n
    }();
    var r = function () {
        var e = {};
        e.collapse = function (e, t) {
            var n = t || function () {
                };
            e = e || "_sider";
            $("#" + e).animate({width: "0"}, 600, n).css({overflow: "visible"})
        };
        e.expand = function (e, t, n) {
            var i = n || function () {
                };
            e = e || "_sider";
            t = t || 750;
            $("#" + e).css("background", "#fff").animate({width: t + "px"}, 600, i).css({overflow: "visible"})
        };
        return e
    }();
    var o = function (e, t, n) {
        var i, a, r;
        t = t || {};
        i = t.info ? "info" : "edit";
        a = o.instances[i];
        a && a.clear && a.clear() && (o.instances[i] = null);
        t.getDimensions = o.getDimensions;
        r = new s(e, t, n);
        o.instances[i] = r
    };
    o.instances = {};
    o.getDimensions = function () {
        var e, t, n = $(document.body), i, a = Math.max($(document).width() * .7, 996);
        e = n.outerHeight();
        t = 0;
        i = e - t;
        return {top: t, width: a, height: i}
    };
    o.getInstance = function (e) {
        var t, n;
        e = e || {};
        t = e.info ? "info" : "edit";
        n = o.instances[t];
        return n
    };
    o.collapse = function (e) {
        var t = o.getInstance(e);
        t && t.collapse(e)
    };
    o.expand = function (e) {
        var t = o.getInstance(e);
        t && t.expand(e)
    };
    var s = function (n, a, r) {
        var o, l = this, c, u = $(document.body), d, f, p, m = "", g, h, v = "auto", _;
        a = a || {};
        l.id = c = s.id + s.instancenum;
        s.instancenum++;
        l.opts = a;
        l.getDimensions = a.getDimensions || function () {
                return {}
            };
        h = l.getDimensions();
        d = a.width || 0;
        if (!d) {
            d = h.width
        }
        l.width = d;
        f = h.height;
        p = h.top;
        l.zindex = a.zindex || s.zindex;
        if (a.info) {
            m = s.classmap.info
        } else {
            m = s.classmap.expand
        }
        u.css("overflow-y", "hidden");
        if (a.iframe) {
            _ = n = '<iframe src="' + n + '" frameBorder="0" allowTransparency="true" marginWidth="0" marginHeight="0" style="width: 100%; height: ' + f + 'px;"></iframe>';
            v = "hidden"
        }
        if (a.noexpand) {
            n = ""
        }
        o = ['<div id="' + c + '" style="position: fixed; top: ' + p + "px; right: 0px; width:0px; height: " + f + "px; z-index: " + l.zindex + '; box-shadow: 10px  rgb(0,0,0); ">', '<div class="layer-container __container" style="width:' + d + 'px;height: 100%;">', '<div class="slide-layer" style="overflow: ' + v + '; height: 100%;">', '<div class="controller __controller ' + m + '" style="cursor: pointer;"></div>', n, "</div>", "</div>", "</div>"].join("");
        g = "expand";
        var y = $("#" + c);
        if (y.size() > 0) {
            y.remove()
        }
        $(document.body).append(o);
        if (!a.noexpand) {
            l.expand({id: c, width: d})
        } else {
            g = "collapse";
            l.setControllerIcon(g)
        }
        $("#" + c + " .__controller").bind("click", function () {
            var n = g == "expand" ? "collapse" : "expand";
            if (a.info) {
                n = "collapse"
            }
            if (n == "expand" && a.noexpand && $("#" + c + " iframe").size() < 1 && _) {
                $(_).insertAfter($("#" + c + " .__controller"))
            }
            l[n]();
            g = n;
            if (a.info) {
                setTimeout(function () {
                    i.log("sideid to remove", c);
                    $("#" + c).remove()
                }, 600)
            } else {
                setTimeout(function () {
                    l.setControllerIcon(n)
                }, 100)
            }
            if (!$.isEmptyObject(s.monitorMsg)) {
                new e.WriteLog({invoice_id: "" + Math.floor((new Date).getTime() / 1e3) + t.getOwneruin()}).send($.extend({
                    action_flag: 2,
                    operate_type: "204"
                }, s.monitorMsg))
            }
        }).bind("mouseenter", function () {
            $(this).addClass("controller-spread-h")
        }).bind("mouseleave", function () {
            $(this).removeClass("controller-spread-h")
        });
        l._resizefn = function () {
            l._winresize()
        };
        $(window).bind("resize", l._resizefn);
        r && r();
        return l
    };
    s.prototype.setControllerIcon = function (e, t) {
        var n = e == "expand" ? "collapse" : "expand", i, a, r;
        t = t || {};
        r = this.id;
        i = s.classmap[e];
        a = s.classmap[n];
        $("#" + r + " .__controller").removeClass(a).addClass(i).attr("data-hottag", "atlas.sideslide." + e)
    };
    s.prototype.expand = function (e) {
        var t = this.id, i;
        e = e || {};
        i = e.width || this.width;
        $(document.body).css("overflow-y", "hidden");
        a.create(this.zindex - 1, null, {opacity: n.ENV.OPACITY_DARK});
        r.expand(t, i)
    };
    s.prototype.collapse = function (e) {
        var t = this.id;
        e = e || {};
        r.collapse(t, function () {
            $(document.body).css("overflow-y", "auto");
            a.remove()
        });
        setTimeout(function () {
            $(document.body).css("overflow-y", "auto");
            a.remove()
        }, 600);
        if (e.remove) {
            setTimeout(function () {
                $("#" + t).fadeOut("slow").remove()
            }, 800);
            this._resizefn && $(window).unbind("resize", o._winresize) && (this._resizefn = null)
        }
    };
    s.prototype._winresize = function () {
        var e = this, t = this.getDimensions();
        i.log("dim size:", t);
        var r = function (i) {
            var r;
            if (i.size() === 0) {
                return
            }
            r = i.width();
            i.height(t.height);
            if (r > 0) {
                i.width(t.width);
                a.remove();
                a.create(e.zindex - 1, null, {opacity: n.ENV.OPACITY_DARK})
            }
            e.width = t.width;
            i.find(".__container").width(t.width);
            i.find("iframe").height(t.height)
        };
        r($("#" + e.id))
    };
    s.prototype.clear = function () {
        var e = this.id, t, n;
        t = $("#" + e);
        if (t.size() > 0) {
            t.find("iframe").attr("src", "about:blank");
            setTimeout(function () {
                n = t.get(0);
                n.removeNode ? n.removeNode(true) : n.parentNode && n.parentNode.removeChild(n);
                n = null
            }, 30)
        }
    };
    s.classmap = {info: "controller-close", expand: "controller-packup", collapse: "controller-spread"};
    s.monitorMsg = {};
    s.id = "__gdtsider";
    s.instancenum = 0;
    s.zindex = 1e3;
    window.GDT.sideslide = o;
    window.addEventListener("message", function (e) {
        var t, n, i, a;
        t = e.origin.split("://");
        i = /^http|https$/.test(t[0]);
        a = /^e\.qq\.com/.test(t[1]);
        if (i && a) {
            if (e.data == "collapse") {
                o.collapse({remove: true})
            } else if (e.data != "") {
                n = JSON.parse(e.data);
                if (n.type == "stepCondition") {
                    s.monitorMsg = n
                }
            }
        }
    }, true);
    return {sideslide: o, maskLayout: a, sideBar: r}
});
define("js/modules/message", ["require", "jquery", "utils", "js/config/comm", "js/services/message", "js/modules/beautyui", "js/modules/common", "js/modules/simulateui", "js/modules/sideslide", "js/modules/route", "js/modules/atlasdomflag", "js/modules/atlasdominfo"], function (require) {
    "use strict";
    var $ = require("jquery"), e = require("utils"), t = require("js/config/comm"), n = require("js/services/message"), i = require("js/modules/beautyui"), a = require("js/modules/common"), r = require("js/modules/simulateui"), o = require("js/modules/sideslide"), s = require("js/modules/route"), l = require("js/modules/atlasdomflag"), c = require("js/modules/atlasdominfo");
    var u = {0: "全部", 1: "未读", 2: "已读"}, d = {}, f, p = null;
    d.init = function () {
        var t = $("#gMessageWrap"), i = t.find(".inner").eq(0), a = $("#showMsglist"), r;
        a.on("click", function (e) {
            if (i.hasClass("current")) {
                d.removePopup()
            } else {
                d.popup()
            }
        });
        $(document.body).bind("click.hideAccountStat", function (e) {
            var t = e.target;
            if ($(t).parents("#gMessageWrap, .qz_dialog_layer").length === 0) {
                d.removePopup()
            }
        });
        (function () {
            var e = function () {
                if (document.activeElement && document.activeElement.tagName == "IFRAME") {
                    d.removePopup()
                }
                setTimeout(e, 500)
            };
            e()
        })();
        r = e.URIParams.get("search", "message") == 1;
        if (r) {
            d.popup()
        }
        //n.getNewMessage(0, d.newMessageStat)
    };
    d.bodyclick = function (e) {
        if (!f) {
            return true
        }
        var t = e.target;
        if (!$.contains(f.get(0), t) && $(t).parents(".qz_dialog_layer").size() < 1 && $(t).parents(".layer-container").size() < 1) {
            d.removePopup()
        }
    };
    d.newMessageStat = function (e) {
        var t = "hide", n = $("#_js_newmsg");
        if (e.ret === 0 && e.data && e.data.conf && e.data.conf.totalnum > 0) {
            t = "show";
            var i = e.data.conf.totalnum > 99 ? 99 : e.data.conf.totalnum;
            if (i > 9) {
                n.addClass("mail-num2")
            } else {
                n.removeClass("mail-num2")
            }
            n.text(i);
            c.remove("messagenumber");
            if (i) {
                c.set("messagenumber", i)
            }
        }
        n[t]();
        if (t == "hide") {
            l.remove("newmsg")
        } else {
            l.set("newmsg")
        }
    };
    d.popup = function () {
        var e = $("#gMessageWrap"), t = e.find(".inner").eq(0);
        var i, a, r;
        try {
            clearTimeout(p);
            if (f) {
                $(f).remove();
                f = null
            }
        } catch (o) {
        }
        d.showPopup();
        i = n.getCurSel();
        a = i.status;
        r = i.cate;
        $("._js_status", f).val(a);
        n.getList(0, r, function (e) {
            d.showList(e, r);
            d.updateCat(r)
        });
        t.addClass("current")
    };
    d.removePopup = function () {
        var e = $("#gMessageWrap"), t = e.find(".inner").eq(0);
        t.removeClass("current");
        p = setTimeout(function () {
            $(f).remove();
            f = null
        }, 250)
    };
    d.showPopup = function (e) {
        var t = ['<div class="poparea  pop-xiaoxi">', '<div class="pop chlearfix" style="display:;">', '<div class="tpline">', '<div class="del-all" style="width:124px">', '<label class="none"><input class="checkbox" value="" type="checkbox">全选</label>', '<span class="btndel none"><a href="#">删除</a></span>', '<span class="message-set"><a href="' + s.genRealUrl("tool/notice") + '">消息设置</a><i class="icon ico-help" rel="message.setup"><i></i></i></span>', "</div>", '<ul class="typebtn" id="_wrapCate"></ul>', '<div class="chosen-model r" style="padding-top:10px"><select class="select _js_status" id="messageStatus"></select></div>', "</div>", '<ul class="list" id="__messageList"></ul>', '<div class="btline">', '<p class="tips"></p>', '<span id="_messagePager"></span>', "</div>", "</div>", "</div>"].join("");
        if (f) {
            return
        }
        var o;
        f = $(t);
        f.appendTo($("#gMessageWrap ._js_inner"));
        i.showLoading("__messageList", {minHeight: "60px"});
        $("#__messageList").on("click", "li", function (e) {
            var t = $(e.currentTarget), n = $(e.target), i, a;
            a = t.attr("rel");
            if (n.hasClass("_del")) {
                a = n.attr("rel");
                d.del(a);
                return false
            }
            i = t.find("._js_ext");
            if (i.size() > 0 && $.contains(i.get(0), n.get(0))) {
                var r = n.prop("tagName"), o = n.attr("href");
                if (r.toLowerCase() == "a" && o) {
                    return d.dealMessageLink(o)
                }
                return
            }
            d.read(a);
            return false
        });
        $("#_wrapCate").on("click", "a", function (e) {
            var t = $(e.currentTarget), i;
            i = t.attr("rel");
            n.getList(0, i, function (e) {
                d.showList(e, i);
                d.updateCat(i)
            });
            return false
        });
        o = $("._js_status", f);
        a.initMapSelect(o[0], u, null, {noempty: true});
        o.on("change", function () {
            var e = $(this).val();
            n.changeStatus(e, d.showList)
        });
        r.showChosenSelect("#messageStatus", {width: "70px"})
    };
    d.dealMessageLink = function (e) {
        var n = e.match(/gdtpath=orderdetail&oid=(\d+)/), i, a;
        if (n && n[1]) {
            i = n[1];
            a = t.ENV.ROOT + "order/edit?oid=" + i;
            o.sideslide(a, {iframe: true});
            return false
        }
    };
    d.updateCat = function (e) {
        var t = ["全部", "系统消息", "审核消息", "账户消息", "财务消息"], n = [], i;
        i = t.length;
        $.each(t, function (t, a) {
            n.push('<li class="' + (t == i - 1 ? "last" : "") + '""><a href="javascript:;" class="tablink ' + (t != e ? "" : "tablink-on disable") + '" rel="' + t + '" style="' + (t != e ? "cursor:pointer" : "") + '">' + a + "</a></li>")
        });
        $("#_wrapCate").html(n.join(""))
    };
    d._tpl_messageList = ["<%var i=0,len=list.length;if(len<1){%>", "<li><label>无消息</label></li>", "<%}%>", "<%for(;i<len;i++){var row=list[i];%>", '<li class="_read <%=row.status==2? \'\':\'enread\'%>" rel="<%=row.msgid%>" id="_msgrow_<%=row.msgid%>">', "<label>", "<i class=\"icon <%=row.status==2? 'ico-xiaoxi-ed':'ico-xiaoxi' %> _js_icon\" rel=\"<%=row.msgid%>\"><i></i></i>", '<span class="info"><%=row.catename%></span>', '<span class="stit"><%=row.title%></span>', '<span class="time"><%=row.date%></span>', "</label>", '<div class="information none _js_ext" id="_content_<%=row.msgid%>" style="cursor: default;">', "<%=QZFL.string.restHTML(row.content)%>", '<p class="xiugai"><a href="javascript:;" class="_del" rel="<%=row.msgid%>">删除</a></p>', "</div>", "</li>", "<%}%>"].join("");
    d.showList = function (t) {
        var r = $("#__messageList");
        i.hideLoading("__messageList");
        if (t.ret === 0) {
            var o = t.data;
            r.html(e.tmpl(d._tpl_messageList, o));
            $("li", r).bind("mouseover", function () {
                !$(this).hasClass("extend") && $(this).addClass("hover")
            }).bind("mouseout", function () {
                !$(this).hasClass("extend") && $(this).removeClass("hover")
            });
            o.conf.simpleStyle = true;
            o.conf.pageNav = true;
            o.conf.arrow = true;
            o.conf.jumpPageFn = function (e) {
                n.getList(e, null, function (e) {
                    d.showList(e)
                })
            };
            a.pager("_messagePager", o.conf)
        } else {
            r.html('<li><label>获取消息列表失败，点击<a href="javascript:;">重试</a></label></li>').off("click").on("click", "a", function () {
                n.getList();
                return false
            })
        }
    };
    d.read = function (e) {
        var t = "_content_" + e, i = $("#" + t), a;
        $("li ._js_ext[id!=" + t + "]").addClass("none");
        i.toggleClass("none");
        if (!i.hasClass("none")) {
            a = n.getMsgDataById(e);
            if (a && a.status == 1) {
                n.read(e, function () {
                    d.setread(e);
                    n.getNewMessage(null, d.newMessageStat)
                })
            }
        }
    };
    d.setread = function (e) {
        var t = "_msgrow_" + e, n;
        n = $("#" + t);
        n.removeClass("enread");
        $("._js_icon", n).removeClass("ico-xiaoxi").addClass("ico-xiaoxi-ed")
    };
    d.del = function (e) {
        a.simpleConfirm("确认删除", "<strong>您确认删除此消息吗？</strong>", function () {
            n.deleMsgById(e, function () {
                a.showMsgbox("删除成功", 4);
                n.getList(0, null, d.showList)
            }, function (e) {
                e = e || {};
                a.showMsgbox(e.msg || "删除消息失败，请稍后再试")
            })
        })
    };
    d.acceptService = function (e) {
        a.simpleConfirm("邀请确认", "<strong>您确认接受邀请吗？</strong>", function () {
            n.acceptService(e, function (e) {
                a.showMsgbox("接受邀请成功", 4);
                n.getList(0, null, d.showList)
            }, function (e) {
                e = e || {};
                a.showMsgbox(e.msg || "接受邀请失败，请稍候再试")
            })
        })
    };
    GDT.viewMessage = d;
    return d
});
define("js/modules/accountstat", ["require", "exports", "jquery", "utils", "aduser", "js/services/user", "js/services/account", "js/modules/account", "js/modules/common", "js/modules/route", "js/modules/atlasdomflag"], function (require, e) {
    "use strict";
    var $ = require("jquery"), t = require("utils"), n = require("aduser"), i = require("js/services/user"), a = require("js/services/account"), r = require("js/modules/account"), o = require("js/modules/common"), s = require("js/modules/route"), l = require("js/modules/atlasdomflag");
    e.init = function () {
        var n = $("#gAccountWrap"), i = $("#showAccountStat"), r;
        i.on("click", function () {
            if (n.hasClass("current")) {
                e.popup(false)
            } else {
                e.popup(true)
            }
        });
        $(document.body).bind("click.hideAccountStat", function (t) {
            var n = t.target;
            if ($(n).parents("#gAccountWrap, .edit-price").length === 0) {
                e.popup(false)
            }
        });
        (function () {
            var t = function () {
                if (document.activeElement && document.activeElement.tagName == "IFRAME") {
                    e.popup(false)
                }
                setTimeout(t, 500)
            };
            t()
        })();
        if (i.size() > 0) {
            $('<div id="gAccountStat" class="poparea pop-zhanghu"></div>').appendTo($("#gAccountWrap"))
        }
        r = t.URIParams.get("search", "finance") == 1;
        if (r) {
            e.popup(true)
        }
        e._accountloading = true;
        //a.getDashboard(function (t) {
        //    var n = t.data || {};
        //    e._accountloading = false;
        //    if (t.ret == 0) {
        //        n = a.parseData(t.data);
        //        e.accountLoaded(n);
        //        e.showTips(n)
        //    }
        //})
    };
    e.accountLoaded = function (t) {
        var i = $("#gAccountWrap ._js_accountmsg");
        e._accountloading = false;
        if ((!a.isAmountEnough(t) || a.isNearLimit(t)) && n.status == 1) {
            i.removeClass("none");
            l.set("accountmsg")
        } else {
            i.addClass("none");
            l.remove("accountmsg")
        }
        e._accountLoaded = true;
        e._accountdata = t;
        e.renderAccount(t)
    };
    e.popup = function (t) {
        if (e._accountLoaded || e._accountloading) {
            e.showPopup(t)
        } else {
            e._accountloading = true
        }
    };
    var c = ['<div class="virtual">', "<h3><%=virtualAccount.account_name%></h3>", '<p><span class="c-red"><%=virtualAccount.balance%></span>元</p>', "</div>"].join(""), u = '<p id="_daybudget">日限额<span id="_ori_daybudget" class="_account_daybudget"></span>元/天 <i class="icon ico-edit" opt="daybudget"><i></i></i></p>';
    e._tpl_myaccount = ['<div class="pop clearfix">', '<div class="tips-normal none _s_accountAlert"></div>', '<div class="zhanghu-num clearfix">', '<div class="cash">', "<h3><%=cashAccount.account_name%></h3>", '<p><span class="c-red"><%=cashAccount.balance%></span>元</p>', '<p class="none" id="chargeCnt"><a class="btn-recharge" href="ACCOUNT_INFO_URL" data-hottag="atlas.chargeentry.topbar">充值</a></p>', "</div>", r.isYYBKAAduser() ? "" : c, '<div class="cost">', '<h3>今日消耗<span class="cft-attention c-tx3">（实时消耗）</span></h3>', '<p><span class="c-red"><%=daily_cost%></span>元</p>', u, "</div>", "</div>", "</div>"].join("").replace("ACCOUNT_INFO_URL", s.genRealUrl("account/info"));
    e._accountLoaded = false;
    e._accountdata;
    e._accountloading = false;
    var d;
    e.showPopup = function (e) {
        var t = $("#gAccountWrap");
        if (d == e) {
            return
        }
        d = e;
        if (e) {
            t.addClass("current")
        } else {
            t.removeClass("current")
        }
    };
    e.bodyclick = function (t) {
        var n = t.target;
        if (!$.contains($("#gAccountStat").get(0), n) && $(n).parents(".edit-price").size() < 1 || $("#gAccountStat").get(0) == n) {
            e.showPopup(false)
        }
    };
    e.showDaybudget = function (n) {
        n = n || e._accountdata.day_budget;
        var i = '日限额<span id="_ori_daybudget" class="_account_daybudget"><%=day_budget%></span>元/天 <i class="icon ico-edit" opt="daybudget"><i></i></i>';
        var r = '<i class="icon ico-warning"><i></i></i>已达<span id="_ori_daybudget" class="_account_daybudget"><%=day_budget%></span>元日限额<i class="icon ico-edit" opt="daybudget"><i></i></i>';
        var o = i, s = "removeClass";
        $.extend(e._accountdata, {day_budget: n});
        if (a.didReachLimit(e._accountdata)) {
            o = r;
            s = "addClass"
        }
        $("#_daybudget").html(t.tmpl(o, e._accountdata));
        $("#_daybudget")[s]("c-red")
    };
    e.showCPDDaybudget = function (n) {
        n = n || e._accountdata.cpd_day_budget;
        var i = 'CPD日限额<span id="_ori_daybudget" class="_account_daybudget"><%=cpd_day_budget%></span>元/天 <i class="icon ico-edit" opt="daybudget"><i></i></i>';
        var r = '<i class="icon ico-warning"><i></i></i>已达<span id="_ori_daybudget" class="_account_daybudget"><%=cpd_day_budget%></span>元CPD日限额<i class="icon ico-edit" opt="daybudget"><i></i></i>';
        var o = i, s = "removeClass";
        $.extend(e._accountdata, {cpd_day_budget: n});
        if (a.didReachLimit(e._accountdata)) {
            o = r;
            s = "addClass"
        }
        $("#_daybudget").html(t.tmpl(o, e._accountdata));
        $("#_daybudget")[s]("c-red")
    };
    e.showAccountNumbers = function (i) {
        var o = $("#gAccountStat");
        i = i || e._accountdata;
        e._accountdata = i;
        o.html(t.tmpl(e._tpl_myaccount, i));
        r.isYYBKAAduser() ? e.showCPDDaybudget() : e.showDaybudget();
        if (r.canCharge() && !r.isPrepareStatus()) {
            $("#chargeCnt").removeClass("none")
        }
        var s = [];
        if (!a.isAmountEnough(i) && n.status == 1) {
            s.push('<p>您的账户<strong class="c-red">余额不足</strong>，为保证广告投放，请尽快充值</p>')
        }
        if (a.didReachLimit(i)) {
            s.push('<p>您账户今日的消耗<strong class="c-red">已到达日限额</strong>，推广计划和广告已暂停</p>');
            $(".cost", o).addClass("cost-limit")
        } else if (a.isNearLimit(i)) {
            s.push('<p>您账户今日的消耗<strong class="c-red">已接近日限额</strong>，为不影响广告投放，请及时上调日限额</p>')
        }
        if (s.length > 0) {
            $("._s_accountAlert", o).html(s.join(" ")).removeClass("none")
        }
        r.isYYBKAAduser() ? e.bindSetDaybudget("_daybudget", "", "setCPADaybudget", false) : e.bindSetDaybudget("gAccountStat")
    };
    e.resetAccountInfo = function (n) {
        var i = $("#gAccountStat");
        n = n || e._accountdata;
        e._accountdata = n;
        i.html(t.tmpl(e._tpl_myaccount, n))
    };
    e.bindSetDaybudget = function (t, n, r, s) {
        r = r || "setDaybudget";
        if (typeof s == "undefined") {
            s = true
        }
        n = n || "_account_daybudget";
        t = t || "_daybudget";
        $("#" + t).off("click", "[opt=daybudget]").on("click", "[opt=daybudget]", function (l) {
            var c = function (i) {
                i = o.revertFormatNumber(i) + "";
                if (isNaN(i) || parseInt(i, 10).toString().length != i.length) {
                    o.showMsgbox("请输入合法的日限额");
                    return false
                }
                if (i == o.revertFormatNumber(f)) {
                    return
                }
                if (a[r]) {
                    a[r](function (i) {
                        if (i.ret === 0) {
                            $.extend(e._accountdata, {daybudget: i.data.budget});
                            e.showAccountNumbers();
                            o.showMsgbox("修改限额成功", 4);
                            i.data.budget && $("#" + t + " ." + n).html(i.data.budget);
                            $(p).remove()
                        } else {
                            o.showMsgbox(i.msg || "设置日限额失败");
                            return false
                        }
                    }, {
                        data: {daybudget: i}, error: function () {
                            o.showMsgbox("设置日限额失败")
                        }
                    })
                }
                return false
            };
            var u = function (e) {
                var t = e.target;
                if (!p) {
                    $(document.body).unbind("click", u);
                    return
                }
                if (!$.contains(p, t)) {
                    $(p).remove();
                    p = null;
                    $(document.body).unbind("click", u)
                }
            };
            var d = function (e) {
                $(e).css("zIndex", 1003);
                $(document.body).bind("click", u);
                if (s) {
                    i.getQuotaLimit(function (t) {
                        var n;
                        var i = [];
                        if (t.ret === 0) {
                            n = t.data;
                            n.budgeteditlimit = parseInt(n.budgeteditlimit, 10);
                            n.budgeteditused = parseInt(n.budgeteditused, 10);
                            if (n.budgeteditused / n.budgeteditlimit >= .8) {
                                i.push("消费限额每天最多修改" + n.budgeteditlimit + "次");
                                i.push("当前已修改<strong>" + n.budgeteditused + "</strong>次")
                            }
                            if (n.budgetovercost) {
                                i.push("最低额度是账户的今日消耗加上" + n.budgetovercost + "元。")
                            }
                            $("._tip", e).html(i.join("，"))
                        }
                    })
                }
            };
            var f = $("#" + t + " ." + n).html(), p;
            var m = ['<div class="edit-price" style="top:0;left:0px; width:220px;">', '<div class="txt">', '<p class="form-inline"><input type="text" class="_val form-control" value="' + f + '"><span class="c-tx3">元/天</span></p>', '<p class="c-tx3 _tip"></p>', "</div>", '<div class="s-btnline">', '<a href="javascript:void(0)" class="queding s-button-right _ok">确定</a>', '<a href="javascript:void(0)" class="quxiao s-button-back _cancel">取消</a>', "</div>", "</div>"].join("");
            p = o.modifier.layer(l.target, m);
            $("._ok", p).bind("click", function () {
                var e;
                e = c($("._val", p).val(), p);
                e !== false && $(p).remove() && (p = null)
            });
            $("._cancel", p).bind("click", function () {
                $(p).remove();
                p = null;
                return false
            });
            d(p);
            return false
        })
    }, e.renderAccount = function (t) {
        e._accountdata = t;
        e.showAccountNumbers()
    };
    e.getReginfo = function (e, t) {
        i.getRegistInfo(e, {error: t})
    };
    e.showTips = function (i) {
        var r = $("#headerAccountInfoErrorStatusTips"), o = $("#ErrorStatusTipsHolder"), s = o.height(), c = n, u = [], d = "indexHiddenTips_" + c.aduid, f = ["t1", "t2", "t3", "t4", "t5", "t6", "t7", "t8"], p = (new Date).getDate(), m, g = location.pathname || "", h = false;
        if (g.indexOf("/tool/profile") > -1) {
            h = true
        }
        var v = function (e) {
            var e = e || "";
            r.removeClass("none");
            o.removeClass("none");
            l.set("errorstatustips");
            $("#main").height($("#main").height() + s);
            $("#root").addClass("width-account-tips");
            $(window).trigger("resize");
            for (var t = 0, n = f.length; t < n; t++) {
                l.remove(f[t])
            }
            l.set(e)
        }, _ = function () {
            r.addClass("none");
            o.addClass("none");
            l.remove("errorstatustips");
            $("#main").height($("#main").height() + s);
            $("#root").removeClass("width-account-tips");
            $(window).trigger("resize");
            for (var e = 0, t = f.length; e < t; e++) {
                l.remove(f[e])
            }
        };
        r.on("click", "a.close", function () {
            var e = this.getAttribute("data-msgtype"), n;
            n = t.storage.get(d, "local") || {};
            n[e] = p;
            t.storage.set(d, n, {media: "local", expire: 1728e5});
            _()
        });
        e.getReginfo(function (e) {
            m = t.storage.get(d, "local") || {};
            if (m[f[0]] != p && e && e.ret == 0 && e.data.status == 19) {
                u.push(f[0])
            }
            if (m[f[5]] != p && e && e.ret == 0 && e.data.status == 2) {
                if (c.identity_padding_tag == 2) {
                    if (e.data.customer_registration_type == 3) {
                        u.push(f[7])
                    } else {
                        u.push(f[6])
                    }
                } else {
                    u.push(f[5])
                }
            }
            if (m[f[1]] != p && c && c.status == "3") {
                u.push(f[1])
            }
            if (!i.remain_r) {
                i.remain_r = i.remain || 0
            }
            if (m[f[2]] != p && !a.isAmountEnough(i) && e && e.ret == 0 && e.data.status == 1) {
                u.push(f[2])
            }
            if (m[f[3]] != p && a.didReachLimit(i)) {
                u.push(f[3])
            } else if (m[f[4]] != p && a.isNearLimit(i)) {
                u.push(f[4])
            }
            if (u.length === 0) {
                _();
                return
            }
            if (h && $.inArray(u[0], [f[0], f[1], f[5], f[6], f[7]]) > -1) {
                _();
                return
            }
            r.find("p").addClass("none").parent().find("p." + u[0]).removeClass("none");
            v(u[0])
        })
    }
});
define("js/modules/common", ["require", "jquery", "utils", "js/config/env", "js/config/report", "QZFL", "verMap", "aduser", "js/modules/report", "js/modules/uuid", "spa.monitor", "js/modules/jquery.plugin"], function (require) {
    "use strict";
    var $ = require("jquery"), util = require("utils"), ENV = require("js/config/env"), confReport = require("js/config/report"), QZFL = require("QZFL"), verMap = require("verMap"), adUser = require("aduser"), modReport = require("js/modules/report"), modUuid = require("js/modules/uuid"), SPAMonitor = require("spa.monitor");
    var _nodeCache = {}, _crid;
    require("js/modules/jquery.plugin");
    var comm = {
        adjustSize: function (e, t, n) {
            e.onload = null;
            if (t <= 0 || n <= 0) {
                return
            }
            comm.scaleImage(e, t, n)
        },
        _imglist: [],
        scaleImage: function (e, t, n) {
            var i = $(e).get(0);
            if (!i || i.src == "javascript:;") {
                util.log("warn: scaleImage: element not found");
                return false
            }
            var a = comm._imglist, r = a.length;
            a[r] = new Image;
            a[r].onload = function (e, t, n, i, a) {
                return function () {
                    var r = e[t];
                    r.onload = null;
                    var o = comm.scaleSize([r.width, r.height], [i, a]);
                    n.style.width = o[0] + "px";
                    n.style.height = o[1] + "px";
                    e[t] = null;
                    delete e[t]
                }
            }(a, r, i, t, n);
            a[r].src = i.src
        },
        scaleSize: function (e, t) {
            var n = e[0], i = e[1], a = t[0], r = t[1], o, s;
            if (n / i > a / r) {
                if (n > a) {
                    o = a;
                    s = a * (i / n)
                } else {
                    o = n;
                    s = i
                }
            } else {
                if (i > r) {
                    s = r;
                    o = r * (n / i)
                } else {
                    o = n;
                    s = i
                }
            }
            return [o, s]
        },
        fixImgSize: function (e, t, n, i) {
            e.onload = null;
            if (t <= 0 || n <= 0) {
                return
            }
            var a = new Image;
            a.src = e.src;
            var r = a.width, o = a.height, s = false;
            if (r / o > t / n) {
                e.style.width = t + "px";
                e.style.height = t * (o / r) + "px";
                s = true
            } else {
                e.style.height = n + "px";
                e.style.width = n * (r / o) + "px";
                s = true
            }
            if (i && s) {
                e.style.cursor = "pointer";
                e.title = "点击预览原图";
                e.onclick = function () {
                    window.open(e.src)
                }
            }
        },
        calposion: function (e, t) {
            $(t).unbind("click");
            $(t).on("click", function (n) {
                comm.setCalendarPos($(t), e, n)
            });
            $(t).on("keydown", function (n) {
                var i = n.which;
                if (i == QZFL.event.KEYS.DELETE || i == QZFL.event.KEYS.BACKSPACE) {
                    $(t).value = "";
                    e.hide()
                }
                n.preventDefault()
            })
        },
        setCalendarPos: function (e, t) {
            var n = t;
            e = $(e);
            var i = e.position();
            var a = n._self;
            a.style.left = i.left + "px";
            a.style.top = i.top + e.height() + 10 + "px";
            a.style.zIndex = 10
        },
        hashManage: function () {
            var e = o(), t = s();

            function n(e, n) {
                t[e] = n;
                r()
            }

            function i(e) {
                t = s();
                var n = t;
                if (e) {
                    n = t[e] || ""
                }
                return n
            }

            function a(e) {
                t[e] = null;
                r()
            }

            function r() {
                var n = [];
                for (var i in t) {
                    if (!i || t[i] === null) {
                        continue
                    }
                    n.push(i + "=" + t[i])
                }
                location.href = e + "#" + n.join("&")
            }

            function o(e) {
                var t = e || location.href, n = t.indexOf("#");
                return t.substring(0, n >= 0 ? n : t.length)
            }

            function s() {
                var e = {}, t = location.hash.substring(1).split("&"), n, i;
                for (n in t) {
                    i = t[n].split("=");
                    if (i.length) {
                        e[i[0]] = i.slice(1).join("=")
                    }
                }
                return e
            }

            function l(e, t) {
                var n = {};
                var a = Object.prototype.toString.call(t).slice(8, -1).toLowerCase();
                var r = a == "array" ? t : [t];
                for (var o = 0, s = r.length; o < s; o++) {
                    var l = r[o];
                    n[l] = i(l)
                }
                var c = function () {
                    var t = false;
                    for (var a in n) {
                        var r = n[a];
                        var o = i(a);
                        if (o != r) {
                            n[a] = o;
                            t = true
                        }
                    }
                    if (t) {
                        e()
                    }
                };
                if ("onhashchange"in window && (!document.documentMode || document.documentMode > 7)) {
                    window.onhashchange = c
                } else {
                    setInterval(c, 100)
                }
            }

            return {setHash: n, getHash: i, delHash: a, onhashchange: l}
        }(),
        FuncQueue: function () {
            function e() {
                this.queue = [];
                this.cbbuff = {};
                this.curNum = 0;
                this.callnum = 0;
                this.cn = 0
            }

            e.prototype.add = function () {
                var e = Array.prototype.slice.call(arguments);
                this.queue.push(e)
            };
            e.prototype._execCallback = function (e, t, n) {
                var i = this;
                i.cbbuff[e] = [t, n];
                if (e == i.curNum) {
                    while (i.curNum < i.callnum) {
                        if (i.cbbuff[i.curNum]) {
                            var a = i.cbbuff[i.curNum];
                            a[1].apply(null, a[0]);
                            delete i.cbbuff[i.curNum];
                            i.curNum++
                        } else {
                            break
                        }
                    }
                }
            };
            e.prototype.exec = function () {
                var e = this;
                e.callnum += e.queue.length;
                while (e.queue.length > 0) {
                    var t = e.queue.shift();
                    if (!t[1]) {
                        var n = function () {
                        };
                        t[0]();
                        e._execCallback(e.cn, [], n)
                    } else {
                        var i = function (t, n) {
                            return function () {
                                var i = Array.prototype.slice.call(arguments);
                                e._execCallback(t, i, n)
                            }
                        }(e.cn, t[1]);
                        t[0](i)
                    }
                    e.cn++
                }
            };
            return e
        }(),
        setNameFieldValue: function (e, t) {
            var n, i;
            $.each(e, function (e, a) {
                if ($.isArray(a)) {
                    n = typeof a[1] == "undefined" ? a[0] : a[1];
                    i = a[0]
                } else {
                    n = i = a
                }
                var r = $("[name=" + i + "]").attr("type");
                if (r == "radio") {
                    $("[name=" + i + "]").each(function (e, i) {
                        i.checked = t[n] + "" == i.value
                    })
                } else {
                    var o = t[n];
                    comm.setMultiCheck($("[name=" + i + "]"), o)
                }
            })
        },
        setMultiCheck: function (e, t) {
            t = parseInt(t, 10);
            e.each(function (e, n) {
                var i = parseInt($(n).val(), 10);
                n.checked = !!(i & t)
            })
        },
        clearSelect: function (e) {
            var t = $(e);
            if (t === undefined || t.tagName.toUpperCase() != "SELECT") {
                return false
            }
            for (var n = t.options.length; n >= 0; n--) {
                t.options[n] = null
            }
            return true
        },
        addSelectItem: function (e, t, n, i) {
            var a;
            a = $.type(e) == "string" ? $("#" + e)[0] : $(e)[0];
            if (a === undefined || a.tagName.toUpperCase() != "SELECT") {
                return false
            }
            i = i || false;
            var r = new Option(t, n, false, false);
            a.options[a.options.length] = r;
            r.selected = i;
            return true
        },
        mapToArrList: function (e) {
            var t = [];
            for (var n in e) {
                var i = {id: n, name: e[n]};
                t.push(i)
            }
            return t
        },
        initMapSelect: function (e, t, n, i) {
            var a = comm.mapToArrList(t);
            i = i || {};
            if (!i.noempty) {
                a.unshift({id: "", name: "请选择"})
            }
            comm.initselect(e, a, "id", "name", n, i)
        },
        initselect: function (e, t, n, i, a, r) {
            r = r || {};
            if ($.type(t) == "array") {
                $.each(t, function (t, o) {
                    var s = typeof a != "undefined" && o[n] == a ? true : false;
                    comm.addSelectItem(e, o[i], o[n], s, r)
                })
            } else {
                $.each(t, function (t, n) {
                    var i = a && n == a ? true : false;
                    comm.addSelectItem(e, n, t, i, r)
                })
            }
        },
        getParameter: function (e, t) {
            var n = new RegExp("(\\?|#|&)" + e + "=([^&#]*)(&|#|$)");
            var i = location.href.match(n);
            if ((!i || i == "") && !t) {
                i = top.location.href.match(n)
            }
            return !i ? "" : i[2]
        },
        setRadioAsso: function (e, t, n, i) {
            var a = function (e) {
                var a = e.target;
                var r = a.checked === true;
                var o = a.value;
                var s = false;
                if (r && $.inArray(o, t) >= 0) {
                    if (n) {
                        $(n).style.display = ""
                    }
                    s = true
                } else {
                    if (n) {
                        $(n).style.display = "none"
                    }
                }
                if (i) {
                    i(s)
                }
            };
            var r = document.getElementsByName(e);
            for (var o = 0, s = r.length; o < s; o++) {
                var l = r[o];
                $(l).on("click", a)
            }
        },
        radioSeachClick: function (e) {
            var t = document.getElementsByName(e);
            for (var n = 0, i = t.length; n < i; n++) {
                var a = t[n];
                if (a.checked) {
                    a.click()
                }
            }
        },
        selectAsso: function () {
            function e(t, n, i, a) {
                var r = function () {
                    var e = $("#" + t).elements[0].value;
                    var r = $.inArray(e, n) >= 0;
                    if (i) {
                        if (r) {
                            $("#" + i).hide()
                        } else {
                            $("#" + i).show()
                        }
                    }
                    if (a) {
                        a(!r)
                    }
                };
                e.flist[t] = e.flist[t] || [];
                e.flist[t].push(r);
                $("#" + t).bind("change", r)
            }

            e.flist = {};
            e.fireAsso = function (t) {
                var n = e.flist[t];
                if (n) {
                    $.each(n, function (e, t) {
                        t()
                    })
                }
            };
            return e
        }(),
        goPage: function (curPage, enterPage, totalPage, linkFormat) {
            var re = new RegExp("^\\s*[1-9]\\d*\\s*$");
            if (!re.test(enterPage)) {
                alert("输入页码必须为正整数");
                return false
            }
            enterPage = parseInt(enterPage, 10);
            if (enterPage > totalPage || enterPage <= 0) {
                alert("输入页码范围不正确");
                return false
            }
            if (curPage == enterPage) {
                return false
            }
            var reg = new RegExp("{no}", "g");
            linkFormat = linkFormat.replace(reg, enterPage);
            if (linkFormat.indexOf("javascript") != -1) {
                var sFun = linkFormat.split(":");
                if (sFun.length > 0) {
                    eval(sFun[1])
                }
                return
            } else {
                location.href = linkFormat;
                return
            }
        },
        showPageList: function (e, t, n, i, a, r, o) {
            e = Number(e);
            o = o || 5;
            var s = {};
            var l = $.each;
            typeof r === "object" && (s = r, r = "");
            if (e < 1 || t <= 1 || e > t)return "";
            if (!a) {
                a = {};
                a.textClass = "pg_having";
                a.preClass = "";
                a.nextClass = "";
                a.curPageClass = "hit";
                a.otherPageClass = "";
                a.jumpClass = "page_form";
                a.inputClass = "text-input";
                a.pageClass = "page_page";
                a.submitClass = "bt_submit"
            }
            if (!r)r = " ";
            var c = [];
            var u = e > 1 ? e - 1 : 1;
            var d = e < t ? e + 1 : t;
            var f = new RegExp("{no}", "g");
            var p;
            var m;
            if (!s.arrow) {
                c.push('<div class="inner">')
            }
            if (s.changePagesize) {
                p = i.replace(f, 1).replace("javascript:", "");
                var g = ENV.sizemap || {}, h = [];
                l(g, function (e, t) {
                    h.push('<option value="' + e + '"' + (n == e ? ' selected="selected"' : "") + ">" + t + "</option>")
                });
                c.push('<label><span class="txt">每页显示条数</span><select onchange="' + p.replace("{pagesize}", "this.value") + '" class="_setPageSizeSeletor">' + h.join("") + "</select></label> ");
                i = i.replace(",{pagesize}", "")
            }
            if (!s.arrow) {
            }
            if (a !== true) {
                if (1 == e) {
                    c[c.length] = '<span class="current">上一页</span>'
                } else {
                    p = i.replace(f, u);
                    c[c.length] = '<a href="' + p + '" title="上一页" class="c_tx">上一页</a>'
                }
                var v = false;
                var _ = false;
                var y = false;
                var b = false;
                if (t <= o) {
                    var w = 1;
                    var A = t
                } else {
                    var T = parseInt((o - 2) / 2, 10);
                    w = e - T;
                    A = e + T;
                    if (w >= 3) {
                        v = true
                    }
                    if (w >= 2) {
                        y = true
                    }
                    if (A < t) {
                        b = true
                    }
                    if (A + 1 < t) {
                        _ = true
                    }
                    if (w <= 1) {
                        w = 1;
                        A = o - 1
                    }
                    if (A >= t) {
                        w = t - o + 2;
                        A = t
                    }
                }
                if (y) {
                    p = i.replace(f, 1);
                    if (1 == e) {
                        c[c.length] = '<span class="current">' + 1 + "</span>"
                    } else {
                        c[c.length] = '<a  title="' + m + '" href="' + p + '" class="c_tx">' + 1 + "</a>"
                    }
                }
                if (v) {
                    c[c.length] = '<span class="ellipsis">…</span>'
                }
                for (m = w; m <= A; m++) {
                    p = i.replace(f, m);
                    if (m == e) {
                        c[c.length] = '<span class="current">' + m + "</span>"
                    } else {
                        c[c.length] = '<a  title="' + m + '" href="' + p + '" class="c_tx">' + m + "</a>"
                    }
                }
                if (_) {
                    c[c.length] = '<span class="ellipsis">…</span>'
                }
                if (b) {
                    if (A != t) {
                        m = t;
                        p = i.replace(f, m);
                        if (m == e) {
                            c[c.length] = '<span class="current">' + m + "</span>"
                        } else {
                            c[c.length] = '<a  title="' + m + '" href="' + p + '" class="c_tx">' + m + "</a>"
                        }
                    }
                }
                if (t == e) {
                    c[c.length] = '<span class="current">下一页</span>'
                } else {
                    p = i.replace(f, d);
                    c[c.length] = '<a href="' + p + '" title="下一页" class="c_tx">下一页</a>'
                }
                c.push("</div")
            } else {
                if (!s.arrow) {
                    if (1 == e) {
                        c[c.length] = '<span class="current">上一页</span>'
                    } else {
                        c[c.length] = '<a href="' + i.replace(f, -1) + '" title="上一页" class="c_tx">上一页</a>'
                    }
                    if (s.pageNav) {
                        c[c.length] = '<span class="mod_pagenav_count">' + e + "/" + t + "</span>"
                    }
                    if (t == e) {
                        c[c.length] = '<span class="current">下一页</span>'
                    } else {
                        c[c.length] = '<a href="' + i.replace(f, 1) + '" title="下一页" class="c_tx">下一页</a>'
                    }
                } else {
                    c[c.length] = '<div class="mod-page-s"><div class="mod-page-inner">';
                    if (1 == e) {
                        c[c.length] = '<a href="javascript:;" class="before btn-before-disable"></a>'
                    } else {
                        c[c.length] = '<a href="' + i.replace(f, -1) + '" class="before"></a>'
                    }
                    if (s.pageNav) {
                        c[c.length] = '<span class="num"><span class="now">' + e + "</span>/" + t + "</span>"
                    }
                    if (t == e) {
                        c[c.length] = '<a href="javascript:;" class="after btn-after-disable"></a> <span></span>'
                    } else {
                        c[c.length] = '<a href="' + i.replace(f, 1) + '" class="after"></a>'
                    }
                    c[c.length] = "</div></div>"
                }
            }
            return c.join("")
        },
        getCheckgroupValue: function (e, t) {
            var n = 0;
            t = t || "checkbox";
            var i = e.substring(0, 1) == "#" ? e : "#" + e;
            $(i + " input:checked[type=" + t + "]").each(function (e, t) {
                n += parseInt(t.value, 10)
            });
            return n
        },
        setFrameHeight: function () {
            setTimeout(function () {
                var e = document.body.offsetWidth || document.documentElement.offsetWidth;
                var t = document.body.offsetHeight || document.documentElement.offsetHeight;
                QZFL.FP.resizePopupDialog(e, t)
            }, 300)
        },
        inputFocus: function (e, t) {
            if (e.setSelectionRange) {
                e.focus();
                e.setSelectionRange(t, t)
            } else if (e.createTextRange) {
                var n = e.createTextRange();
                n.collapse(true);
                n.moveEnd("character", t);
                n.moveStart("character", t);
                n.select()
            }
        },
        docClickEvent: function (e, t) {
            var n = function (i) {
                var a = i.target;
                if (a != $(e.id) && !$.contains($(e.id), a) && !(t && t(i))) {
                    e.unload();
                    $(document).off("click", n)
                }
            };
            setTimeout(function () {
                $(document).on("click", n)
            }, 100)
        },
        _dockeyup: null,
        docKeyupEvent: function (e) {
            var t = comm;
            if (t._dockeyup) {
                t._dockeyup = e;
                return
            }
            t._dockeyup = e;
            $(document).on("keyup", function (e) {
                if (e.which == 13) {
                    t._dockeyup()
                }
            })
        },
        inherit: function (e, t) {
            var n = function () {
                var n = Array.prototype.slice.call(arguments);
                this._super = e;
                t.apply(this, n)
            };
            $.extend(n.prototype, e.prototype);
            return n
        },
        getTime: function () {
            return ENV.servertime > 0 ? ENV.servertime * 1e3 : (new Date).getTime()
        },
        setTime: function (e) {
            ENV.servertime = e
        },
        showMsgbox: function () {
            var e = Array.prototype.slice.call(arguments);
            if (e.length < 3 || !e[2]) {
                e.length < 2 && (e[1] = 1);
                e[2] = 2e3
            }
            QZFL.widget.msgbox.show.apply(null, e)
        },
        hideMsgbox: QZFL.widget.msgbox.hide,
        showBubble: function (e, t, n) {
            var i = null, a;
            i = setTimeout(p, 100);
            $(e).bind("mouseout", function () {
                clearTimeout(i)
            });
            var r = $(document).scrollHeight;
            var o = $(e).position().top;
            var s = o / r > .5;
            var l = document.createElement("div");
            l.style.cssText = "position:absolute;padding:6px;bottom:7px;width:188px;" + "left:-5000px;line-height:20px;text-align: left;visibility:hidden;";
            var c = $(l);
            c.appendTo($("body"));
            c.html(t);
            var u = c.height();
            u = u || 100;
            c.remove();
            a = {
                id: null,
                x: -15,
                y: s ? -10 : 10,
                timeout: 5e3,
                height: u,
                width: 200,
                arrowEdge: s ? 3 : 1,
                arrowPoint: s ? 4 : 1,
                arrowType: 2,
                noCloseButton: true,
                onLoad: null
            };
            var d = parseInt($(e).offset().left + a.width) || 0, f = parseInt($(window).width()) || 0;
            if (d > f) {
                a.x = 15;
                a.arrowPoint = s ? 4 : 2
            }
            $.extend(a, n);
            navigator.appVersion.indexOf("MSIE") > -1 && (a.noShadow = true);
            function p() {
                var n;
                QZFL.widget.bubble.useTween = false;
                n = QZFL.widget.bubble.show(e, "", t, a);
                !a.onLoad && (a.onLoad = function (t) {
                    $(e).bind("mouseout", function () {
                        QZFL.widget.bubble.hide(t)
                    })
                });
                a.onLoad(n);
                a = null
            }
        },
        hideBubble: function (e) {
            QZFL.widget.bubble.hide(e)
        },
        parseUrl: function (e) {
            var t = e.length, n = e.indexOf("?"), i = e.indexOf("#"), a = "", r = "", o = {};
            n < 0 && (n = t);
            i < 0 && (i = t);
            n < t && (a = e.substring(n + 1, i));
            i < t && (r = e.substring(i + 1));
            if (a) {
                o.search = {};
                $.each(a.split("&"), function (e, t) {
                    var n = t.split("=");
                    o.search[n[0]] = n[1]
                })
            }
            if (r) {
                o.hash = {};
                $.each(r.split("&"), function (e, t) {
                    var n = t.split("=");
                    o.hash[n[0]] = n[1]
                })
            }
            return o
        },
        setCalender: function (e, t) {
            var n = QZFL.widget.calendar.bind(e, 0), i = {
                yearPattern: "-",
                monthPattern: "-",
                datePattern: "",
                connectString: ""
            };
            $.extend(n, i);
            if (typeof t === "function") {
                var a = n.onDateSelected;
                n.onDateSelected = function (e) {
                    a(e);
                    t.apply(n, [e])
                }
            }
            return n
        },
        getDomGetter: function (e) {
            var t;
            t = e ? function (t) {
                return $(t, e)
            } : $;
            return t
        },
        getFormData: function (e, t) {
            var n = {}, i, a = document;
            t = t || {};
            if (e.nodeType && e.nodeType == 1) {
                a = e
            } else if (typeof e === "string") {
                a = $(e)
            } else if ($.type(e) === "object" && $.isArray(e.elements)) {
                i = e
            }
            i = i || $("input, textarea, select", a);
            i.each(function (e, i) {
                var a = i.type == "checkbox" ? 1 : 0, r = i.type == "radio" ? 1 : 0, o = i.type == "file" ? 1 : 0, s = false, l = i.name || i.id || "", c = $.trim(i.value);
                if (i.disabled && !t.includeDisabled) {
                    return
                }
                if (l.substr(l.length - 2, 2) === "[]") {
                    l = l.slice(0, -2);
                    s = true
                }
                if (o) {
                    if (c) {
                        n._file = n._file || [];
                        n._file.push(i.id)
                    }
                } else {
                    if (a || r) {
                        c == "on" && (c = 1)
                    }
                    if (s) {
                        n[l] = n[l] || [];
                        if (!(r || a) || i.checked) {
                            n[l].push(c)
                        }
                    } else {
                        if (!(r || a) || i.checked) {
                            n[l] = c
                        }
                    }
                }
            });
            return n
        },
        replaceNode: function (e, t) {
            var n, i;
            if (e.nodeType !== 1) {
                return false
            }
            e.style.display = "none";
            do {
                i = Math.ceil(Math.random() * 100)
            } while (typeof _nodeCache[i] !== "undefined");
            n = document.createElement("span");
            n.id = "_GDT_REPLACE_NODE_" + i;
            n.className = "fn_editbox";
            n.innerHTML = t;
            e.parentNode.insertBefore(n, e);
            _nodeCache[i] = e;
            _crid = i;
            return i
        },
        restoreNode: function (e) {
            typeof e === "undefined" && (e = _crid);
            $("#_GDT_REPLACE_NODE_" + e).remove();
            _nodeCache[e].style.display = "";
            delete _nodeCache[e];
            _nodeCache[e] = null
        },
        pager: function (e, t) {
            var n = {
                page: 1,
                totalpage: 1,
                pagesize: 10,
                changePagesize: false,
                simpleStyle: false,
                hideSecondCount: false,
                hideJump: false,
                useOnclick: false
            }, i = null, a, r, o;
            $.extend(n, t);
            n.simpleStyle && (i = true);
            r = "goPageFn" + $.now();
            window[r] = function (e, t) {
                n.jumpPageFn = $.isFunction(n.jumpPageFn) ? n.jumpPageFn : $.noop;
                if (typeof t == "undefined" && n.changePagesize) {
                    t = o.find("select._setPageSizeSeletor").val()
                }
                n.jumpPageFn(e, t)
            };
            if (typeof e == "string") {
                o = $("#" + e)
            } else {
                o = $(e)
            }
            if (n.useOnclick) {
                a = 'javascript:;" onclick="' + r + (n.changePagesize ? "({no},{pagesize});" : "({no});") + "return false;"
            } else {
                a = "javascript:" + r + (n.changePagesize ? "({no},{pagesize})" : "({no})")
            }
            if (o) {
                if (n.totalpage > 1) {
                    o.html(comm.showPageList(n.page, n.totalpage, n.pagesize, a, i, {
                        changePagesize: n.changePagesize,
                        pageNav: n.pageNav,
                        arrow: n.arrow,
                        hideSecondCount: n.hideSecondCount,
                        hideJump: n.hideJump
                    }, 8)).show()
                } else {
                    o.empty().hide()
                }
            }
        },
        timeFilter: function (e, t, n) {
            var i = QZFL.string.timeFormatString(comm.getTime(), "{Y}-{M}-{d}");
            n = n || {};
            util.log("time filter", e, t, n);
            if (n.both && (!e || !t)) {
                comm.showMsgbox("请选择完整的查询时间段", 5);
                return false
            }
            if (e && t && e > t) {
                comm.showMsgbox("查询的开始时间必须早于结束时间", 5);
                return false
            }
            if (n.futureEnable) {
            } else if (n.todayInclude && (e > i || t > i)) {
                comm.showMsgbox("只能查询今天及今天之前的数据", 5);
                return false
            } else if (!n.todayInclude && (e >= i || t >= i)) {
                comm.showMsgbox("只能查询今天之前的数据", 5);
                return false
            }
            if (n.include2Year) {
                if (e < QZFL.string.timeFormatString(comm.getTime() - 63072e6, "{Y}-{M}-{d}")) {
                    comm.showMsgbox("抱歉，只提供最近两年内的数据", 5);
                    return false
                }
            } else {
                if (!n.rangeWithin90days) {
                    if (e < QZFL.string.timeFormatString(comm.getTime() - 76896e5, "{Y}-{M}-{d}")) {
                        comm.showMsgbox("抱歉，只提供最近90天的数据", 5);
                        return false
                    }
                } else {
                    if (Math.abs(new Date(t.replace(/-/g, "/")) - new Date(e.replace(/-/g, "/"))) > 76896e5) {
                        comm.showMsgbox("抱歉，一次查询时间段最长为90天", 5);
                        return false
                    }
                }
            }
            return true
        },
        timeFilterWithAutocorrect: function (e, t, n) {
            function i(e, t) {
                var n = new RegExp("W?" + t + "W?");
                return n.test(e)
            }

            var a = QZFL.string.timeFormatString(comm.getTime(), "{Y}-{M}-{d}");
            var r = {rangeWithin90days: QZFL.string.timeFormatString(comm.getTime() - 76896e5, "{Y}-{M}-{d}")};
            var o = null;
            $.each(r, function (t, n) {
                if (i(e, t)) {
                    o = n
                }
            });
            var s = a;
            if (!i(e, "includeToday")) {
                s = QZFL.string.timeFormatString(comm.getTime() - 60 * 60 * 24 * 1e3, "{Y}-{M}-{d}")
            }
            util.log("hasit", i(e, "includeToday"), s, n);
            var l = false;
            if (t > n) {
                l = true;
                t = n
            }
            if (t < o) {
                l = true;
                t = o
            }
            if (n < o) {
                l = true;
                n = o
            }
            if (t > s) {
                l = true;
                t = s
            }
            if (n > s) {
                l = true;
                n = s
            }
            return {hasBeenCorrected: l, sdate: t, edate: n}
        },
        trimcut: function (e, t) {
            t = t || 8;
            var n = comm.getRealLen(e);
            if (n > t) {
                e = $.cut(e, t - 2, "...")
            }
            return e
        },
        getAppUrl: function (e, t) {
            var n, i;
            n = {
                qzone: "http://rc.qzone.qq.com/myhome/{APPID}",
                pengyou: "http://www.pengyou.com/index.php?mod=appmanager&act=openapp&type=qzone&appid={APPID}",
                im: "javascript:void(0);"
            };
            i = n[{1: "qzone", 8: "pengyou", 9: "im"}[t.siteset]];
            i = i ? i : n.qzone;
            var a = i.replace(/\{APPID}/g, e);
            return a
        },
        isBqq: function (e) {
            if (!e) {
                return false
            }
            var t = [[115399e4, 1153999999], [1495e6, 1496999999]];
            e = parseInt(e, 10);
            if (isNaN(e)) {
                return false
            }
            var n = t.length;
            for (var i = 0; i < n; i++) {
                if (e >= t[i][0] && e <= t[i][1]) {
                    return true
                }
            }
            return false
        },
        simpleAlert: function (e, t, n, i) {
            if (typeof n == "object") {
                i = n;
                n = $.noop
            }
            n = $.isFunction(n) ? n : $.noop;
            i = i || {};
            var a = i.width || 380;
            var r = ['<div class="pop_notice_two" style="padding: 20px;">', '<div class="pop_notice_main clearfix">', '<i class="icon_notice"></i>', '<div class="pop_notice_txt">', "<p>" + t + "</p>", "</div>", "</div>", "</div>"].join("\n");
            var o = comm.dialog(e, r, {
                width: a, height: 120, showMask: true, onLoad: function () {
                }, onBeforeUnload: function (e) {
                    if (typeof i.onBeforeUnload == "function") {
                        return i.onBeforeUnload(e)
                    }
                    return true
                }, buttonConfig: [{
                    type: comm.dialog.BUTTON_TYPE.Confirm, text: "确定", clickFn: function () {
                        n()
                    }
                }]
            });
            return o
        },
        confirm: function (e) {
            var t = {
                title: "",
                content: "",
                icontype: "warn",
                type: QZFL.widget.Confirm.TYPE.OK_NO,
                hastitle: true,
                height: 140,
                width: 380,
                desc: "",
                tips: ["确定", "取消"],
                onConfirm: function () {
                },
                onNo: function () {
                },
                onAfter: function () {
                }
            };
            t = $.extend(t, e);
            var n = new QZFL.widget.Confirm(t.title, t.content, t);
            n.onConfirm = t.onConfirm;
            n.onNo = t.onNo;
            n.show();
            setTimeout(function () {
                t.onAfter()
            }, 70);
            return n
        },
        simpleConfirm: function (e, t, n, i, a) {
            a = a || {};
            var r = a.width || 380, o = a.height || 105;
            var s = ['<div class="pop_notice_two" style="padding: 20px;">', '<div class="pop_notice_main clearfix">', '<i class="icon_notice"></i>', '<div class="pop_notice_txt">', "<p>" + t + "</p>", "</div>", "</div>", "</div>"].join("\n");
            var l = [{
                type: comm.dialog.BUTTON_TYPE.Confirm,
                text: a.confirmBtnLabel || "确定",
                clickFn: n,
                preventDefault: a.confirmDontCloseWindow
            }];
            if (typeof a.haveCancelBtn == "undefined" || a.haveCancelBtn) {
                l.push({type: comm.dialog.BUTTON_TYPE.Cancel, text: a.cancelBtnLabel || "取消", clickFn: i})
            }
            a.noCloseButton = typeof a.noCloseButton == "undefined" || a.noCloseButton ? true : false;
            var c = comm.dialog(e, s, {
                width: r,
                height: o,
                showMask: true,
                noCloseButton: a.noCloseButton,
                buttonConfig: l
            });
            return c
        },
        explain: function (e, t) {
            var n = t.htmlStr || "", i = t.afterOpenFn, a = t.width || "auto", r = t.height || "auto", o = t.lastTime || 200;
            var s = ['<span class="explain none _explain">', '<i class="bor-c"><span class="bor-i"></span></i>', '<div class="explain-con" style="width:{width};height:{height}">', "{htmlStr}", "</div>", "</span>"].join("");

            function l() {
                var e = s.replace(/\{htmlStr\}/g, n).replace(/\{width\}/g, a + "px").replace(/\{height\}/g, r + "px");
                return e
            }

            function c() {
                var t = null, n = "none", a = l(), r = $(a), s = e.find(".explain");
                if (s.length > 0) {
                    s.remove()
                }
                e.append(r);
                e.on("mouseenter", function () {
                    clearTimeout(t);
                    r.removeClass(n)
                }).on("mouseleave", function () {
                    t = setTimeout(function () {
                        r.addClass(n)
                    }, o)
                });
                if (i) {
                    i(r)
                }
            }

            c()
        },
        modifier: {
            layer: function (e, t) {
                var n, i;
                if (e) {
                    e = $(e);
                    n = e.offset();
                    i = document.createElement("div");
                    i.innerHTML = t;
                    i.style.position = "absolute";
                    i.style.left = n.left + "px";
                    i.style.top = n.top - e.outerHeight() / 2 + "px";
                    document.body.appendChild(i)
                }
                return i
            }, slab: function (e, t, n, i) {
                var a, r, o, s = parseInt($(window).width()) || screen.width;
                a = '<div class="s-btnline">' + '<a href="javascript:;" class="queding s-button-right _ok">确定</a>' + '<a href="javascript:;" class="quxiao s-button-back _cancel">取消</a></div>';
                var l = ['<div class="txt">', '<p class="form-inline">', t, "</p>", '<p class="edit-price-tip _price" style="display: none"></p>', '<p class="c-tx3 _tip" style="display: none"></p>', "</div>", a].join("");
                r = comm.modifier.layer(e, l);
                o = $(r);
                o.addClass("edit-price");
                if (o.offset().left + o.width() > s) {
                    o.css("left", s - o.width() - 10 + "px")
                }
                $("._ok", r).bind("click", function () {
                    var e;
                    e = n($("._val", r).val(), r);
                    e !== false && r.parentNode.removeChild(r)
                });
                $("._cancel", r).bind("click", function () {
                    r.parentNode.removeChild(r);
                    r = null;
                    return false
                });
                $.isFunction(i) && i(r)
            }, droplist: function (e, t, n, i) {
                var a, r, o;
                a = comm.modifier.layer(e, t + r);
                o = $(e).position();
                $(a).offset({left: o.left + 1, top: o.top + o.height});
                $(a).bind("click", function (e) {
                    n($("._val", e.target.parentNode).val());
                    a.parentNode.removeChild(a);
                    a = null
                });
                $.isFunction(i) && i(a);
                comm.docClickEvent({
                    unload: function () {
                        if (a) {
                            a.parentNode.removeChild(a);
                            a = null
                        }
                    }
                })
            }
        },
        revertFormatNumber: function (e) {
            return Number($.trim((e + "").replace(/\,/g, "")))
        },
        reportPV: function (e) {
            util.stat.monitorPV.report("gdt.qq.com", e)
        },
        reportHottag: function (e, t) {
            util.stat.monitorClick.report(e, t || "gdt.qq.com");
            SPAMonitor.click({
                data: {
                    owner: adUser.aduid,
                    clicksystem: "atlas",
                    clicktype: "hottag",
                    clickid: e,
                    invoice_id: modUuid.get()
                }, batchReport: true, useSendBeacon: true
            })
        },
        pageSpeed: {
            _instance: {},
            pointMapping: {
                performance: ["navigationStart", "unloadEventStart", "unloadEventEnd", "redirectStart", "redirectEnd", "fetchStart", "domainLookupStart", "domainLookupEnd", "connectStart", "connectEnd", "requestStart", "responseStart", "responseEnd", "domLoading", "domInteractive", "domContentLoadedEventStart", "domContentLoadedEventEnd", "domComplete", "loadEventStart", "loadEventEnd"],
                common: ["headStart", "cssStart", "cssEnd", "bodyStart", "bodyEnd", "jsStart", "jsEnd", "renderEnd"],
                custom: ["headStart", "customStep1End", "customStep2End", "customStep3End", "customStep4End", "customCommitEnd"]
            },
            report: function () {
                var e = GDT.timepot || {}, t, n, i, a, r, o, s, l, c = false, u = comm.pageSpeed.pointMapping.performance, d = comm.pageSpeed.pointMapping.common, f = comm.pageSpeed.pointMapping.custom, p, m, g;
                t = e.id;
                if (!t) {
                    return
                }
                n = t.split("-");
                i = comm.pageSpeed._instance[t];
                if (i) {
                    return
                }
                i = util.stat.monitorPage.create(t, n);
                comm.pageSpeed._instance[t] = i;
                m = d[0];
                g = f[0];
                o = window.performance || window.webkitPerformance;
                if (o && (s = o.timing)) {
                    p = u[0];
                    for (a = 1, r = u.length; a < r; a++) {
                        l = s[u[a]] - s[p];
                        i.mark(a, l > 0 ? l : 0);
                        c = true
                    }
                }
                $.each(d, function (t, n) {
                    if (t > 0 && e[m] && e[n]) {
                        l = e[n] - e[m];
                        i.mark(20 + t - 1, l > 0 ? l : 0);
                        c = true
                    }
                });
                $.each(f, function (t, n) {
                    if (t > 0 && e[g] && e[n]) {
                        l = e[n] - e[g];
                        i.mark(27 + t - 1, l > 0 ? l : 0);
                        c = true
                    }
                });
                c && i.report()
            }
        },
        localStorage: {
            getItem: function (e) {
                var t;
                try {
                    t = localStorage.getItem(e)
                } catch (n) {
                    t = util.storage.get(e, "local")
                }
                return t
            }, setItem: function (e, t, n) {
                n = $.extend({media: "local", expire: -1}, n);
                try {
                    localStorage.setItem(e, t, n)
                } catch (i) {
                    util.storage.set(e, t, n)
                }
            }, removeItem: function (e) {
                var t;
                try {
                    t = localStorage.removeItem(e)
                } catch (n) {
                    t = util.storage.removeItem(e, "local")
                }
                return t
            }
        },
        genHash: function (e) {
            var t = 5381;
            e = e || "";
            for (var n = 0, i = e.length; n < i; ++n) {
                t += (t << 5) + e.charAt(n).charCodeAt(0)
            }
            return t & 2147483647
        },
        dialog: function (e, t, n) {
            var i = {width: 300, height: 400, noCloseButton: false, showMask: true};
            $.extend(i, n);
            return QZFL.dialog.create(e, t, i)
        },
        listdataFormater: function (e) {
            var t = [], n = confReport.showHandler, i = confReport.tableFields;
            $.each(e, function (e, a) {
                var r = a;
                $.each(i, function (e, t) {
                    if (t in n) {
                        r[t] = n[t].call(null, a)
                    }
                });
                t.push(r)
            });
            return t
        },
        chartdataFormater: function (e) {
            e = $.extend(true, {}, e);
            var t = [], n = QZFL.string.timeFormatString(comm.getTime(), "{Y}-{M}-{d}");
            $.each(e, function (e, i) {
                var a = {};
                a = i;
                $.each(i, function (e, t) {
                    isNaN(t) && (t = t.replace(/,/g, "").replace("%", ""));
                    (t < 0 || t == "-") && (t = 0);
                    a[e] = t
                });
                if (a.statsdate == n) {
                    "clicktraderate"in a && (a.clicktraderate = -1);
                    "tradecount"in a && (a.tradecount = -1)
                }
                t.push(a)
            });
            return t
        },
        getTotal: function (e, t) {
            var n = {}, i = confReport.sumFields, a = confReport.calFields, r = confReport.calculHandler;
            QZFL.each(e, function (e) {
                QZFL.each(i, function (t) {
                    var i = e[t];
                    i = i == undefined ? "-" : typeof i === "string" ? i.replace(/,/g, "").replace("%", "") : i;
                    if (isNaN(i)) {
                        !(t in n) && (n[t] = "-")
                    } else {
                        !(t in n) || isNaN(n[t]) && (n[t] = 0);
                        (t == "cost" || t == "turnover" || t == "orgcost") && (i *= 100);
                        i = Number(i);
                        n[t] = t in n ? n[t] + i : i
                    }
                })
            });
            QZFL.each(a, function (e) {
                if (e in r) {
                    n[e] = r[e].call(null, n)
                }
            });
            if (t != "number") {
                n = comm.listdataFormater([n]).pop()
            }
            return n
        },
        getReportSumData: function (e, t, n) {
            t = t || {};
            var i = t.format || "", a = comm.getTotal(e, i);
            n && n(a)
        },
        getRealLen: function (e, t) {
            var n = /[^\x00-\xFF]/g, i = /[\x00-\xFF]/g;
            if (typeof e != "string") {
                return 0
            }
            if (!t) {
                return e.replace(n, "**").length
            } else {
                var a = e.replace(i, "");
                return e.length - a.length + encodeURI(a).length / 3
            }
        },
        getCsrfToken: function () {
            return $.getACSRFToken()
        },
        getACSRFToken: function () {
            return $.getACSRFToken()
        },
        imgLoad: function (e, t, n) {
            if (!e) {
                return
            }
            if (e.complete) {
                t();
                return
            }
            e.onload = function () {
                t();
                e.onload = null
            };
            if (n) {
                e.onerror = function () {
                    n();
                    e.onerror = null
                }
            }
        },
        getWXQrcode: function (e, t) {
            var n = "http://mp.e.qq.com/abc/qrcode", i = adUser.aduid, a = new Image, r = n + "?uid=" + i + "&g_tk=" + comm.getACSRFToken() + "&fans_code=" + t + "&timestamp=" + +new Date;
            a.src = r;
            comm.imgLoad(a, function () {
                if (a.complete) {
                    e.attr("src", r)
                }
            })
        },
        addTokenToUrl: function (e) {
            var t, n;
            e = e || "";
            if (!e) {
                return
            }
            if (e.indexOf("/ec/api.php") < 0) {
                return e
            }
            if (e.indexOf("?") > 0) {
                n = "&"
            } else {
                n = "?"
            }
            t = e + (n + "g_tk=" + comm.getCsrfToken() + "&owner=" + adUser.aduid);
            return t
        },
        replaceWithObject: function (e, t, n) {
            if (!t || typeof e != "string")return e;
            return e.replace(/\{([^\{},:=!]+)}(?!})/g, function () {
                var e = arguments[1]in t ? t[arguments[1]] : "";
                if (e && n !== true) {
                    e = typeof $ != "undefined" ? $("<div></div>").text(e).html() : e
                }
                return e
            })
        },
        scaleVal: function (e, t) {
            var n, i, a, r;
            i = e < t.threshold ? t.lv1 : t.lv2;
            n = Math.floor(e / i);
            a = e % i;
            if (a >= i / 2) {
                n = n + 1
            }
            if (n === 0) {
                r = t.min || Math.pow(i, n)
            } else {
                r = n * i
            }
            return r
        },
        getFileFullpath: function (e, t) {
            var n = false;
            t = t || "js";
            var i = t == "js" ? verMap.jsFiles : verMap.cssFiles, a, r;
            try {
                a = t == "js" ? ENV.jsdomain : ENV.cssdomain;
                n = ENV.env == "develop"
            } catch (o) {
                a = "qzonestyle.gtimg.cn"
            }
            if (e.indexOf("http://") > -1) {
                r = e
            } else if (t == "js") {
                r = /*"http://" + */a + "/qzone/biz/gdt/atlas_v2/" + e.replace("js/", "") + (i[e] && !n ? "." + i[e] : "") + ".js"
            } else {
                r = /*"http://" + */a + "/open_proj/proj-gdt-toufang/" + e + (i[e] && !n ? "-" + i[e] : "") + ".css"
            }
            return r
        },
        setPrice: function (e) {
            var t = $.extend(true, {
                event: null, price: 0, ok: function () {
                }, cancel: function () {
                }
            }, e);
            t.price = parseFloat(t.price) || 0;
            if (!t.event) {
                return false
            }
            var n;
            var i = function (e) {
                $(e).css("zIndex", 100);
                $("body").off("click", "#root").on("click", "#root", function (e) {
                    if ($(".editPriceWrap").length > 0 && t.event.target != e.target && !$.contains(n, e.target)) {
                        $(n).length > 0 && $(n).remove();
                        n = null
                    }
                })
            };
            $(".editPriceWrap").length > 0 ? $(".editPriceWrap").find("_cancel").trigger("click") : "";
            var a = ['<div class="edit-price editPriceWrap">', '<div class="txt">', '<p class="form-inline">价格 <input type="text" class="_val _editprice form-control price-in " value="' + t.price + '" data-edittype="single"><span class="c-tx3">元</span></p>', '<p class="edit-price-tip _tips none"></p>', '<p class="c-tx3 _tip" style="display: none"></p>', "</div>", '<div class="s-btnline">', '<a href="javascript:;" class="_ok queding s-button-right">确定</a>', '<a href="javascript:;" class="_cancel quxiao s-button-back">取消</a>', "</div>", "</div>"].join("");
            n = comm.modifier.layer(t.event.target, a);
            $("._ok", n).bind("click", function () {
                t.ok($("._val", n).val(), n)
            });
            $("._cancel", n).bind("click", function () {
                $(n).remove();
                n = null;
                t.cancel(n);
                return false
            });
            i(n);
            return false
        },
        initQZFL: function () {
            QZFL.config.gbEncoderPath = "http://qzs.qq.com/qzone/v5/toolpages/";
            QZFL.config.FSHelperPage = "http://qzs.qq.com/qzone/v5/toolpages/fp_gbk.html";
            QZFL.config.defaultShareObject = "http://qzs.qq.com/qzone/v5/toolpages/getset.swf";
            QZFL.config.staticServer = "http://qzs.qq.com/ac/qzone/qzfl/lc/";
            QZFL.config.DCCookieDomain = window.mDomain || document.domain;
            QZFL.widget.msgbox.cssPath = document.baseURI+"css/msgbox.css";
            QZFL.dialog.cssPath = ""
        },
        bind: function (e, t) {
            var n = Array.prototype.slice, i = n.call(arguments, 2);
            return function () {
                e = e || this;
                t = typeof t == "string" ? e[t] : t;
                t = typeof t == "function" ? t : QZFL.emptyFn;
                return t.apply(e, i.concat(n.call(arguments, 0)))
            }
        },
        mouseColor: function (e, t) {
            var n = $(e);
            var i = function () {
                n.addClass(t)
            };
            var a = function () {
                n.removeClass(t)
            };
            n.on("mouseover", i).on("mouseout", a)
        },
        clearMouseColor: function (e) {
            $(e).off("mouseover").off("mouseout");
            return false
        },
        log: function () {
            util.log.apply(util, arguments)
        },
        codeReport: function (e, t) {
            var n = ["http://c.isdspeed.qq.com/code.cgi?domain=", t && t.domain || "e.qq.com", "&key=cgi,type,code,time,rate"].join(""), i = [], $ = jQuery, a = $.type(e);
            if (a == "array") {
                $.each(e, function (e, t) {
                    i.push(r(e, t))
                });
                i.join("&")
            } else if (a == "object") {
                i = r(1, e)
            }
            function r(e, t) {
                return [e + "_1=" + encodeURIComponent(t.cgi), e + "_2=" + t.type, e + "_3=" + t.code, e + "_4=" + t.time, e + "_5=" + t.rate].join("&")
            }

            (new Image).src = n + "&" + i
        },
        getIEVersion: function () {
            var e = navigator.userAgent.toLowerCase(), t;
            t = parseInt((/msie (\d+)/.exec(e) || [])[1]);
            if (isNaN(t)) {
                t = parseInt((/trident\/.*; rv:(\d+)/.exec(e) || [])[1])
            }
            if (isNaN(t)) {
                t = -1
            }
            return t
        },
        trimWithoutPreEmSpace: function (e) {
            if (typeof e != "string") {
                return e
            }
            var t = "[	\n\f\r   ᠎             \u2028\u2029﻿]";
            var n = new RegExp("^" + t + "+|" + t + "+$", "g");
            return e.replace(n, "")
        },
        autoFixCenterWithEmSpace: function (e, t) {
            e = $.trim(e);
            t = isNaN(t) ? e.length : t;
            if (typeof e != "string" || e.length >= t) {
                return e
            }
            var n = e.length;
            var i = Math.floor((t - n) / 2);
            var a = "";
            while (i--) {
                a += "　"
            }
            if ((t - n) % 2 !== 0) {
                a += " "
            }
            e = a + e;
            i = t - e.length;
            a = "";
            while (i--) {
                a += "　"
            }
            return e + a
        },
        nl2br: function (e) {
            return (e + "").replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, "$1<br>")
        },
        getNlSize: function (e) {
            e = (e + "").replace(/\s+$/g, "");
            var t = e.match(/\r\n|\n\r|\r|\n/g);
            return $.isArray(t) ? t.length : 0
        },
        reportMaterial: function (e) {
            e = e || {};
            var t = ["uploadpic", "ctx", "flashtool", "imgtool"];
            var n = function () {
                var t = adUser.aduid || "", n = adUser.status || "";
                new modReport.WriteLog({invoice_id: "" + Math.floor((new Date).getTime() / 1e3) + t}).send({
                    action_flag: 2,
                    operate_type: 9,
                    btnid: e.btnid || "",
                    width: parseInt(e.width) || "",
                    height: parseInt(e.height) || "",
                    status: n,
                    page_type: e.type || ""
                })
            };
            if ($.inArray(e.type, t) > -1 && e.btnid && e.width && e.height) {
                n()
            }
        },
        clickButton: function (e) {
            var t = adUser.aduid || "", n = $.extend(true, {
                owner: t,
                action_flag: 1,
                operate_type: 205,
                clickid: "",
                clicktype: "",
                clicksystem: "atlas",
                clickresult: "",
                clickcontent: ""
            }, e);
            new modReport.WriteLog({invoice_id: "" + Math.floor((new Date).getTime() / 1e3) + t}).send(n)
        },
        addOwnerParam: function (e) {
            var t, n = "owner";
            e = e || "";
            if (e.indexOf("?") > 0) {
                t = "&"
            } else {
                t = "?"
            }
            if (e.indexOf("/phoenix/api.php") > -1) {
                n = "advertiser_id"
            }
            return e + t + n + "=" + adUser.aduid
        },
        getMediaContentPreviewUrlById: function (e, t) {
            t = t || "image";
            e = $.isArray(e) ? e[0] || "" : e;
            var n = location.protocol + "//" + location.host + "/ec/api.php?mod=resource&act=show&resource_type=" + t + "&resource_id=" + e;
            if (comm.isValidUrl(e)) {
                n = e
            }
            return comm.addTokenToUrl(comm.addOwnerParam(n))
        },
        isValidUrl: function (e) {
            var t = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i;
            return t.test(e)
        },
        resizeMainDivHeightToMatchWin: function () {
            var e, t, n = $(document.body);
            e = n.outerHeight();
            t = e - $("header").outerHeight(true);
            $("#main").css({height: t + "px", overflow: "auto"})
        }
    };
    comm.dialog.BUTTON_TYPE = QZFL.dialog.BUTTON_TYPE;
    window.GDT = window.GDT || {};
    window.GDT.util = comm;
    comm.initQZFL();
    return comm
});
define("js/modules/monitor", ["require", "jquery", "js/services/common"], function (require) {
    var $ = require("jquery"), e = require("js/services/common"), t = e.loader, n = e.sender;

    function i(e, i) {
        var e = typeof e == "string" ? e : "", a = $.extend(true, {
            wait: 3e3,
            retry: 0,
            method: "GET",
            ok: function (e) {
                var e = e || {};
                if (typeof e.ret != "undefined" && e.ret == 0) {
                    return true
                } else {
                    return false
                }
            }
        }, i);
        a.wait = parseInt(a.wait) || 1e3;
        a.retry = parseInt(a.retry) || 0;
        a.method = a.method ? a.method.toLowerCase() : "get";
        if (e) {
            if (a.method == "get") {
                this.cgiFunction = t(true, true, {base: e})
            } else {
                this.cgiFunction = n(true, true, {base: e})
            }
        } else {
            this.cgiFunction = false
        }
        this.config = a;
        this._event = {open: [], success: [], error: [], close: []};
        this.times = 0;
        this.sendTime = 0;
        this.timeout = null;
        this.isClose = false
    }

    i.prototype.on = function (e, t) {
        var n = this._event, e = e || "", i = n[e] || false, t = t || function () {
            };
        i && i.push(t)
    };
    i.prototype.trigger = function (e, t) {
        var n = this._event, e = e || "", i = n[e] || false, t = t || "";
        if (i) {
            for (var a = 0, r = i.length; a < r; a++) {
                i[a].call(this, t)
            }
        }
    };
    i.prototype.send = function (e) {
        var t = this, n = t.config || {}, e = e || {};
        if (t.cgiFunction) {
            var i = function (e) {
                t.times = 0;
                t.trigger("success", e)
            };
            var a = function (i) {
                var a = +new Date, r = n.wait || 0, o = n.retry || 0;
                t.trigger("error", i);
                if ((o < 1 || t.times < o) && !t.isClose) {
                    if (a - t.sendTime > r) {
                        t.send(e)
                    } else {
                        t.timeout = setTimeout(function () {
                            t.send(e)
                        }, r - a + t.sendTime)
                    }
                }
            };
            try {
                clearTimeout(t.timeout)
            } catch (r) {
            }
            t.isClose = false;
            t.times++;
            t.trigger("open", t.times);
            t.sendTime = +new Date;
            t.cgiFunction(function (e) {
                var e = e || {};
                if (n.ok(e)) {
                    i(e)
                } else {
                    a(e)
                }
            }, {
                data: e, error: function (e) {
                    a(e)
                }
            })
        } else {
            t.trigger("error", {code: -1, msg: "缺少监听url"})
        }
    };
    i.prototype.close = function () {
        try {
            clearTimeout(this.timeout)
        } catch (e) {
        }
        this.trigger("close", this.times);
        this.isClose = true;
        this.times = 0
    };
    return i
});
define("js/modules/report", ["require", "jquery", "js/services/common", "aduser"], function (require) {
    var $ = require("jquery"), e = require("js/services/common"), t = e.sender, n = "/ec/api.php?mod={mod}&act={act}", i = require("aduser");

    function a(e) {
        this.startTime = (new Date).getTime();
        this.invoice_id = e.invoice_id || ""
    }

    $.extend(a.prototype, {
        _getParamsByActionFlag: function (e) {
            var t = ["req_url", "error_code", "req_body", "rsp_body"], n = e.action_flag, i = {};
            if (!n) {
                return false
            }
            switch (Number(n)) {
                case 1:
                    $.each(t, function (t, n) {
                        i[n] = e[n] || ""
                    });
                    break;
                case 2:
                    $.each(t, function (e, t) {
                        i[t] = ""
                    });
                    break
            }
            return i
        }, getSpentTime: function (e) {
            return Math.floor((e - this.startTime) / 1e3)
        }, send: function (e) {
            var a = (new Date).getTime(), r = {}, o, s = $.Deferred();
            r.create_time = Math.floor(a / 1e3);
            r.spent_time = this.getSpentTime(a);
            r.invoice_id = this.invoice_id;
            r.owner = i.aduid || "";
            $.extend(r, e, this._getParamsByActionFlag(e));
            o = t("monitor", "rpttdbank", {base: n});
            o(function () {
            }, {
                data: r, success: function () {
                    s.resolve()
                }, error: function () {
                    s.reject()
                }
            });
            return s
        }
    });
    return {WriteLog: a}
});
define("js/config/comm", ["require", "js/modules/account", "aduser", "js/config/env", "js/config/report", "js/modules/atlasdomflag"], function (require) {
    "use strict";
    var e = require("js/modules/account"), t = require("aduser"), n = require("js/config/env"), i = require("js/config/report"), a = require("js/modules/atlasdomflag"), r = {};
    r = {
        ENV: n,
        REPORT: i,
        navHeader: [["首 页", "index", "ico-home"], ["推 广", "report/campaign", "ico-generalize", [["广告", "report/order"], ["标的物", "report/producttype"]]], ["报 表", "report/analytic", "ico-sheet", [["整体报表", "report/report"], ["推广计划", "report/campaignlist"], ["点击来源", "report/source"], ["广告", "report/orderdetail", 1], ["自定义报表", "report/custom", function () {
            return e.checkPrivilege("customrpt")
        }], ["创建自定义报表", "report/customrule", 5], ["结算数据", "report/settlement", function () {
            var t = e.isYYBKAAduser(), n = $("#settlement");
            if (n.length > 0) {
                if (t) {
                    n.removeClass("none");
                    GDT.atlasDomFlag.set("settlement")
                } else {
                    n.addClass("none");
                    GDT.atlasDomFlag.remove("settlement")
                }
            }
            return t
        }]]], ["财 务", "account/info", "ico-finance", [["财务信息", "account/info"], ["账户转账", "account/transfer", function () {
            var n = t.mp_bound_status === 1 && !e.isYYBKAAduser();
            if (n) {
                a.set("accountTransfer")
            } else {
                a.remove("accountTransfer")
            }
            return n
        }], ["财务记录", "account/list"], ["发票开具", "account/invoice", function () {
            var t = e.checkPrivilege("invoice_enabled");
            if (t) {
                a.set("accountInvoice")
            } else {
                a.remove("accountInvoice")
            }
            return t
        }]]], ["工具箱", "tool/index", "ico-tool", ['<li class="goback"><a href="index"><i></i></a></li>', ["协作者管理", "tool/privilege", function () {
            var t = e.checkPrivilege("collaborator");
            if (t) {
                a.set("toolPrivilege")
            } else {
                a.remove("toolPrivilege")
            }
            return t
        }, "group1"], ["通知提醒", "tool/notice", null, "group1"], ["账号中心", "tool/profile", null, "group1"], ["广告资质", "tool/portraits", null, "group1"], ["操作记录", "tool/oplog", null, "group3"], ["定向包管理", "tool/targetpackmanage", function () {
            a.set("toolTargetpackmanage");
            return true
        }, "group2"], ["自定义人群管理", "tool/rulelist", function () {
            var t = n.apiVersion() > 1 && !e.isYYBKAAduser();
            if (t) {
                a.set("toolRulelist")
            } else {
                a.remove("toolRulelist")
            }
            return t
        }, "group2"], ["自定义人群管理", "tool/yybdmp", function () {
            var t = n.apiVersion() > 1 && e.isYYBKAAduser() && e.checkPrivilege("YYB_Targeting");
            if (t) {
                a.set("toolYybdmp")
            } else {
                a.remove("toolYybdmp")
            }
            return t
        }, "group2"], ["创意制作", "tool/mediamaker", null, "group2"], ["落地页制作", "tool/landingpage", null, "group2"], ["Flash创意制作", "tool/flashmaker", null, "group2"], ["应用宝落地页", "tool/yybpages", function () {
            var e = !!GDT.privilege.myapp_landing_page_tool;
            if (e) {
                a.set("yybPages")
            } else {
                a.remove("yybPages")
            }
            return e
        }, "group2"], ["好文广告制作工具", "tool/blindadpage", function () {
            var e = !!GDT.privilege.qqbrowser_rw;
            if (e) {
                a.set("qqbrowser_rw")
            } else {
                a.remove("qqbrowser_rw")
            }
            return e
        }, "group2"], ["联盟媒体定向工具", "tool/mediaoptimizer", function () {
            var t = !e.isYYBKAAduser() && e.checkPrivilege("Anmediatarget");
            if (t) {
                a.set("toolMediaOptimizer")
            } else {
                a.remove("toolMediaOptimizer")
            }
            return t
        }, "group2"], ["移动应用转化跟踪", "tool/tracking", function () {
            var t = !e.isYYBKAAduser();
            if (t) {
                a.set("toolTracking")
            } else {
                a.remove("toolTracking")
            }
            return t
        }, "group4"], ["网页转化跟踪", "tool/webtracking", function () {
            var t = !e.isYYBKAAduser();
            if (t) {
                a.set("toolWebtracking")
            } else {
                a.remove("toolWebtracking")
            }
            return t
        }, "group4"], ["联盟流量优化", "tool/mediumshield", function () {
            var t = !e.isYYBKAAduser() && e.checkPrivilege("use_medium_shield");
            if (t) {
                a.set("toolMediumshield")
            } else {
                a.remove("toolMediumshield")
            }
            return t
        }, "group4"], ["账户绑定", "tool/wxbound", null, "group5"]]]],
        cpt_navHeader: [["订 单", "cpt/index", "ico-order"], ["财 务", "account/info", "ico-finance", [["财务信息", "account/info"], ["账户转账", "account/transfer", function () {
            var n = t.mp_bound_status === 1 && !e.isYYBKAAduser();
            if (n) {
                a.set("accountTransfer")
            } else {
                a.remove("accountTransfer")
            }
            return n
        }], ["财务记录", "account/list"], ["发票开具", "account/invoice", function () {
            var t = e.checkPrivilege("invoice_enabled");
            if (t) {
                a.set("accountInvoice")
            } else {
                a.remove("accountInvoice")
            }
            return t
        }]]]],
        dateRangerDefaultOptions: {
            format: "YYYY-MM-DD",
            alwaysShowCalendars: true,
            separator: " 至 ",
            locale: {
                applyLabel: "确认",
                cancelLabel: "取消",
                fromLabel: "从",
                toLabel: "到",
                customRangeLabel: "",
                daysOfWeek: ["日", "一", "二", "三", "四", "五", "六"],
                monthNames: ["一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"],
                firstDay: 0
            },
            showDropdowns: true
        },
        supportPlatform: {atlas: "投放管理平台", CPD: "应用宝-CPD", CPT: "应用宝-CPT"},
        confLinkType: {
            LINK: "1",
            SELLER: "2",
            BQQ: "3",
            RZ: "4",
            RZ_BLOG: "5",
            RZ_IFRAME: "6",
            APP: "7",
            QQGROUP: "8",
            LIVE_VIDEO_ROOM: "9",
            APP_TASK: "10",
            MOB_TASK: "20",
            PC_APP: "11",
            QZONE_GIFT: "12",
            QZONE_SIGN: "13",
            ITUNES_APP: "15",
            MOBILE_APP: "17",
            MOBILE_ALLIANCE_APP: "37",
            EXCHANGE_APP_DOWNLOAD_FOR_MYAPP: "16",
            WECHAT: "18",
            DP_SHOP: "21",
            DP_COUPON: "22",
            DP_TUAN: "23",
            WECHAT_ARTICLE: "24",
            WECHAT_SHOP: "25",
            WECHAT_URL: "26",
            TENCENT_KE: "30",
            MYAPP_PROMOTION: "31",
            BLIND_AD: "41"
        },
        confTargeting: function () {
            var e = ["visittype", "age", "gender", "scene", "education", "vip", "yellow", "os", "isp", "connectiontype", "userstatus", "payment", "ans", "climate", "makeupindex", "uvindex", "dressindex"], t = {};
            for (var i = e.length - 1; i >= 0; i--) {
                var a = e[i];
                t[a] = n[a]
            }
            t.appaction_object_type = {3: "按APP", 4: "按分类"};
            t.appaction_object_type = {100000: "活跃", 100001: "付费"};
            t.appuser = {1: "未安装该应用的用户", 2: "已安装该应用的用户"};
            return t
        }(),
        confCrttype: {
            TEXT: 1,
            IMAGE: 2,
            TEXT_AND_IMAGE: 3,
            FLASH: 4,
            FLASH_TEXT: 5,
            DUAL_IMAGE: 6,
            TEXT_AND_IMAGE_DESC: 7,
            INTERACTION_IMAGE_TEXT: 8,
            NULL: 9,
            RICHMEDIA: 9,
            FLV: 10,
            PRIMITIVE: 11,
            TIPS_HASIMAGE: 12,
            TIPS_ONLYWORDS: 13,
            VIDEO_AND_IMAGE: 15,
            VIDEO_AND_IMAGE_TEXT: 16,
            VIDEO_WITH_TEXT_AND_IMAGE: 20,
            TWO_IMAGE_AND_TEXT: 21
        },
        confShowType: {DYNAMIC_CREATIVE: 3, SEARCH_CREATIVE: 4},
        confCampaignType: {CAMPAIGN_TYPE_DISPLAY: 2, CAMPAIGN_TYPE_SEARCH: 1},
        getCosttypeName: function (e) {
            var t = ["", "CPC", "CPA", "CPS", "CPM", "CPD"];
            e = Number(e);
            return e > 0 && e < t.length ? t[e] : ""
        }
    };
    r.confCrtBigType = {dynamic: [r.confShowType.DYNAMIC_CREATIVE]};
    r.confCrttypeNameMapping = function () {
        var e = r.confCrttype, t = {};
        t[e.TEXT] = "文字链";
        t[e.IMAGE] = "图片";
        t[e.TEXT_AND_IMAGE] = "图文";
        t[e.FLASH] = "Flash";
        t[e.FLASH_TEXT] = "Flash文字";
        t[e.DUAL_IMAGE] = "大小图";
        t[e.TEXT_AND_IMAGE_DESC] = "图文描述";
        t[e.INTERACTION_IMAGE_TEXT] = "消息流";
        t[e.NULL] = "富媒体";
        t[e.RICHMEDIA] = "富媒体";
        t[e.FLV] = "视频";
        t[e.PRIMITIVE] = "原生广告";
        t[e.TIPS_ONLYWORDS] = "三文文字链";
        t[e.TIPS_HASIMAGE] = "一图三文";
        t[e.VIDEO_AND_IMAGE] = "视频图片广告";
        t[e.VIDEO_AND_IMAGE_TEXT] = "视频图片文案广告";
        t[e.VIDEO_WITH_TEXT_AND_IMAGE] = "视频图片文案广告";
        t[e.TWO_IMAGE_AND_TEXT] = "两图一文";
        return t
    }();
    r.servicePhone = "400-900-5050";
    r.privilege = {
        operatorPermissionMap: {1: "管理员", 2: "观察者", 3: "操作者", 4: "财务员", 10: "主账号"},
        opAbleToBe: [1, 2, 3, 4],
        needAuthConfirm: 6,
        statusIsCurrent: 1
    };
    return r
});
define("js/config/env", ["require", "env"], function (require) {
    "use strict";
    var e = location.host, t, n, i, a = require("env"), r = {}, o;
    e = /\.qq\.com$/.test(e) ? e : "";
    for (o in a) {
        r[o] = a[o]
    }
    n = /^\/atlas\/([0-9]{4,20})/;
    if (n.test(location.pathname)) {
        i = n.exec(location.pathname)[1];
        t = "http://" + e + "/_hNav" + i + "/"
    } else {
        t = "http://" + e + "/atlas/"
    }
    r.PORTAL_PAGE = e ? "http://" + e + "/" : "";
    r.ROOT = t;
    r.OPACITY_DARK = .6;
    r.apiVersion = function () {
        return a.version || 1
    };
    r.ACCOUNT_ALERT_AMOUNT = 200;
    r.USER_STATUS_DEF = {prepare: 19, validating: 2, invalidate: 3};
    r.TARGETTYPE_DEF = {
        PAIPAI_ITEM: 1,
        PAIPAI_SHOP: 2,
        PAIPAI_SEARCH: 3,
        QQ_TUAN: 4,
        QQ_FANLI: 5,
        TENPAY: 6,
        PAIPAI_OPERATOR: 7,
        RENZHENG_TUI_GUANG: 8,
        QQ_DIANYING: 9,
        "51BUY": 10,
        INNER_APP: 11,
        QZONE_PAGE: 12,
        LONG_TAIL: 13,
        OPEN_PLATFORM_APP: 14,
        QQ_LVYOU: 15,
        QQ_CAIBEI: 16,
        ZTC_ZHITOU: 17,
        QZONE_FARM: 18,
        QQ_BUY: 19,
        QQ_MEISHI: 20,
        QQ_VIP: 21,
        QZONE: 22,
        TUAN_AGENCY: 23,
        BRAND_GIFT: 24,
        BRAND: 25,
        ZTC_OPERATOR: 26,
        QQ_CAIBEI_SHOP: 27,
        APP_TASK: 28,
        OMG_CPD: 29
    };
    r.STATUS_NORMAL = 1;
    r.STATUS_PENDING = 2;
    r.STATUS_DENIED = 3;
    r.STATUS_FROZEN = 4;
    r.STATUS_ENABLE = 5;
    r.STATUS_SUSPEND = 10;
    r.STATUS_CANCEL = 17;
    r.STATUS_PREPARE_OK = 18;
    r.STATUS_PREPARE = 19;
    r.STATUS_DELETED = 20;
    r.PRODUCTTYPE_DEF = {
        PAIPAI_ITEM: 1,
        PAIPAI_SHOP: 2,
        QZONE_PAGE: 3,
        OPEN_PLATFORM_APP: 4,
        MYAPP: 5,
        QQ_GROUP: 6,
        QQ_BUSINESS: 7,
        B_QQ: 8,
        "51BUY": 9,
        QQ_TUAN: 10,
        TASK: 11,
        OPEN_PLATFORM_APP_MOB: 12,
        FEEDS: 13,
        PAIPAI_SHOP_URL: 14,
        LIVE_VIDEO_ROOM: 15,
        QZONE_GIFT: 16,
        QZONE_SIGN: 17,
        APPLE_APP_STORE: 19,
        EXCHANGE_APP_FOR_MYAPP: 20,
        QQ_MP: 37,
        UNION_APP: 38,
        QZONE_VIDEO_PAGE: 40,
        MYAPP_PROMOTION: 35
    };
    r.LINKTYPE_DEF = {
        LINK: "1",
        SELLER: "2",
        BQQ: "3",
        RZ: "4",
        RZ_BLOG: "5",
        RZ_IFRAME: "6",
        APP: "7",
        QQGROUP: "8",
        LIVE_VIDEO_ROOM: "9",
        APP_TASK: "10",
        MOB_TASK: "20",
        PC_APP: "11",
        QZONE_GIFT: "12",
        QZONE_SIGN: "13",
        ITUNES_APP: "15",
        MOBILE_APP: "17",
        EXCHANGE_APP_DOWNLOAD_FOR_MYAPP: "16",
        WECHAT: "18",
        DP_SHOP: "21",
        DP_COUPON: "22",
        DP_TUAN: "23",
        WECHAT_ARTICLE: "24",
        WECHAT_SHOP: "25",
        WECHAT_URL: "26",
        TENCENT_KE: "30",
        MYAPP_PROMOTION: "31",
        QQ_MP: "35",
        UNION_APP: "37",
        QZONE_VIDEO_PAGE: "39",
        STORE_AD: "40",
        BLIND_AD: "41"
    };
    r.userStatusPrepare = 19;
    r.userStatusValidating = 2;
    r.userStatusInvalidate = 3;
    var s = function () {
        var n = {
            BRAND_ADUSER: 25,
            LONGTAIL_ADUSER: 13,
            PRICE_MIN: .01,
            PRICE_MAX: 1e3,
            CPMPRICE_MIN: 1.5,
            CORE_POSITION_MIN: 1.5,
            CORE_POSITION_MAX: 100,
            CPC_PRICE_WARNING: 10,
            CPM_PRICE_WARNING: 70,
            AGE_BINARY_STRING_STATIC_LENGTH: 128,
            AGE_MAX: 127,
            AGE_MIN: 0,
            SINGLE_AGE_SELECT_MIN: 5,
            SINGLE_AGE_SELECT_MAX: 60,
            SINGLE_AGE_SELECT_DEFAULT: [18, 50],
            SINGLE_AGE_SLIDER_SIZE: 300,
            AGELOWBOUND: 0,
            AGEHIGHTBOUND: 999,
            DAYSECONDS: 86400,
            HOURSECONDS: 3600,
            MAXORDERRULENUM: 5,
            MAX_RULENUM_SHOPPINGINTEREST: 5,
            CPC: 1,
            CPA: 2,
            CPM: 4,
            OCPA: 999,
            DAYBUDGET_CPC_MIN: 30,
            DAYBUDGET_CPM_MIN: 1e3,
            DAYBUDGET_MAX: 1e6,
            DEFAULTDAYBUDGET_CPC: 1e3,
            DEFAULTDAYBUDGET_CPM: 1e4,
            OPACAITY_GREENHAND: .7,
            OPACITY_DARK: .6,
            OPACITY_LIGHT: .3,
            CAMPAIGN_NORMAL_STATUS: 1,
            CAMPAIGN_PAUSE_STATUS: 10,
            ADTYPE_NORMAL: 1,
            ADTYPE_INTERACTIVE: 3,
            CAMPAIGNNAMEMAXLEN: 40,
            FORMID_WAP: 29,
            ACCOUNT_ALERT_AMOUNT: 200,
            MINSCROLLTOP: 150,
            NONEEDTOCLEANFULLSPACE_CRTSIZE_ARR: [127, 128, 129, 130, 131, 132, 151, 152, 158, 159, 160, 161, 162, 163, 164, 165],
            TITLENEEDAUTOFIXCENTER_CRTSIZE_ARR: [131, 132, 158, 159, 160, 161, 162, 163],
            PREVIEWNEEDNLTOBR_CRTSIZE_ARR: [127, 128, 129, 130, 131, 132, 151, 152, 158, 159, 160, 161, 162, 163, 164, 165],
            JDTIPS_CRTSIZE_ARR: [127, 128, 129, 130, 131, 132, 151, 152, 158, 159, 160, 161, 162, 163, 164, 165],
            userStatusPrepare: 19,
            userStatusValidating: 2,
            userStatusInvalidate: 3,
            pagesize: 12,
            maxtagnum: 200,
            ordernameMaxLeng: 40,
            createtiveNameMaxLeng: 40,
            orderlinkMaxLen: 1024,
            orderIframeLinkMaxLen: 1024,
            campaignWarningNum: 190,
            billorderlist: {2: "现金优先", 1: "虚拟优先"},
            typelist: {1: "搜索广告", 2: "展示广告"},
            statecnlist: {1: "statu_on", 2: "statu_pause", 3: "statu_stop"},
            operatorlist: {1: "包含", 2: "不包含", 3: "等于", 4: "不等于"},
            visittype: {1: "到访定向", 2: "未到访定向"},
            age: ["18岁以下", "18-23岁", "24-30岁", "31-40岁", "41-50岁", "50岁以上"],
            gender: ["全部性别", "男", "女"],
            scene: ["未知", "公共场所", "家庭", "公司", "学校"],
            education: ["未知", "博士", "硕士", "本科", "高中", "初中", "小学"],
            vip: ["非会员", "会员LV1", "会员LV2", "会员LV3", "会员LV4", "会员LV5", "会员LV6", "会员LV7"],
            yellow: ["非黄钻", "黄钻LV1", "黄钻LV2", "黄钻LV3", "黄钻LV4", "黄钻LV5", "黄钻LV6", "黄钻LV7"],
            mobileprice: ["未知", "1500元以下", "1500~2500元", "2500元以上"],
            os: ["iOS", "Android", "Windows", "Symbian", "Java", "未知"],
            isp: ["未知", "移动", "联通", "电信"],
            connectiontype: ["未知", "WIFI", "2G", "3G", "4G"],
            userstatus: {1: "未知", 2: "育儿", 4: "新婚", 8: "单身", 9: "已婚"},
            living_status: {1: "在校大学生"},
            payment: ["虚拟付费用户", "已有电商付费"],
            fans: ["非认证空间粉丝", "认证空间粉丝"],
            consumption_ability: {1: "未知", 2: "高消费", 3: "低消费"},
            climate: {101: "晴天", 102: "阴天", 103: "雨天", 104: "雾", 105: "雪", 106: "沙尘"},
            makeupindex: {1: "保湿防龟裂", 2: "保湿", 3: "控油", 4: "防晒"},
            uvindex: {1: "弱", 2: "偏弱", 3: "中等", 4: "偏强", 5: "强"},
            dressindex: {1: "炎热", 2: "热舒适", 3: "舒适", 4: "凉舒适", 5: "温凉", 6: "凉", 7: "冷", 8: "寒冷"},
            statelist: {
                0: {disable: 0, cn: "statu_on", label: "全部状态", olist: [10, 20]},
                1: {disable: 0, cn: "statu_on", label: "启用中", olist: [10, 20]},
                2: {disable: 0, cn: "statu_noexam", label: "审核中", olist: [20]},
                3: {disable: 0, cn: "statu_nopass", label: "审核不通过", olist: [20]},
                4: {disable: 0, cn: "statu_nopass", label: "冻结", olist: []},
                11: {disable: 0, cn: "statu_on", label: "未到投放时间", olist: [10, 20]},
                12: {disable: 0, cn: "statu_on", label: "投放中", olist: [10, 20]},
                10: {disable: 0, cn: "statu_pause", label: "暂停中", olist: [1, 20]},
                13: {disable: 0, cn: "statu_stop", label: "投放结束", olist: [20]},
                20: {disable: 0, cn: "statu_stop", label: "已删除"},
                999: {disable: 0, cn: "statu_stop", label: "所有未删除"},
                31: {disable: 1, cn: "statu_pause", label: "暂停", showtitle: 1},
                32: {disable: 1, cn: "statu_pause", label: "暂停", showtitle: 1},
                33: {disable: 1, cn: "statu_pause", label: "暂停", showtitle: 1},
                34: {disable: 1, cn: "statu_pause", label: "暂停", showtitle: 1},
                35: {disable: 1, cn: "statu_pause", label: "暂停", showtitle: 1},
                36: {disable: 0, cn: "statu_waitput", label: "投放中(计划暂停)", showtitle: 1, olist: [10, 20]},
                37: {disable: 0, cn: "statu_waitput", label: "未到投放时间(计划暂停)", showtitle: 1, olist: [10, 20]},
                38: {disable: 0, cn: "statu_waitput", label: "投放中(账户暂停)", showtitle: 1, olist: [10, 20]},
                39: {disable: 0, cn: "statu_waitput", label: "未到投放时间(账户暂停)", showtitle: 1, olist: [10, 20]},
                41: {disable: 0, cn: "statu_waitput", label: "未投放(广告暂停)", showtitle: 1, olist: [10, 20]},
                42: {disable: 0, cn: "statu_waitput", label: "未投放(广告暂停)", showtitle: 1, olist: [10, 20]},
                43: {disable: 0, cn: "statu_waitput", label: "未投放(广告暂停)", showtitle: 1, olist: [10, 20]},
                44: {disable: 0, cn: "statu_waitput", label: "未投放(广告暂停)", showtitle: 1, olist: [10, 20]},
                45: {disable: 0, cn: "statu_waitput", label: "未投放(广告暂停)", showtitle: 1, olist: [10, 20]}
            },
            campaignStatusIsOn: [1, 11, 12],
            crtStatusMap: {
                0: "全部状态",
                1: "启用中",
                2: "审核中",
                3: "审核不通过",
                4: "冻结",
                11: "未到投放时间",
                12: "启用中",
                10: "暂停中",
                13: "投放结束",
                20: "删除",
                31: "暂停",
                32: "暂停",
                33: "暂停",
                34: "暂停",
                35: "暂停",
                36: "投放中(计划暂停)",
                37: "未到投放时间(计划暂停)",
                38: "投放中(账户暂停)",
                39: "未到投放时间(账户暂停)",
                41: "未投放(广告暂停)",
                42: "未投放(广告暂停)",
                43: "未投放(广告暂停)",
                44: "未投放(广告暂停)",
                45: "未投放(广告暂停)"
            },
            statusCanPause: [1, 11, 12],
            statusCanContinue: [10],
            statusShowDisabledContinue: [31, 32, 33, 34, 35],
            osearchstate: [999, 0, 1, 10, 2, 3, 13],
            osearchstatetext: ["所有未删除", "所有广告", "启用中", "暂停中", "审核中", "审核不通过", "投放结束"],
            csearchstate: [999, 0, 1, 10],
            csearchstatetext: ["所有未删除", "所有计划", "启用中", "暂停中"],
            delstat: 20,
            ostatetip: {
                31: "因账户冻结暂停",
                32: "因账户余额不足暂停",
                33: "账户消耗达日限额暂停",
                34: "推广计划消耗达日限额暂停",
                35: "所属推广计划已暂停",
                36: "所属推广计划暂停或达到限额",
                37: "所属推广计划暂停或达到限额",
                38: "账户达限额或账户余额不足",
                39: "账户达限额或账户余额不足",
                41: "账户冻结",
                42: "账户余额不足",
                43: "账户达日限额",
                44: "计划达日限额",
                45: "计划暂停"
            },
            cstatetip: {31: "账户冻结", 32: "账户余额不足", 33: "账户达日限额", 34: "计划达日限额", 38: "账户达限额或账户余额不足", 39: "账户达限额或账户余额不足"},
            nodatatip: "无匹配结果"
        };
        n.DAYBUDGET_MIN = 0;
        n.DEFAULTDAYBUDGET = n.DEFAULTDAYBUDGET_CPC;
        var i = {};
        i[n.CPC] = "CPC";
        i[n.CPM] = "CPM";
        n.feetypelist = i;
        n.formtypedict = {
            1: "文字链",
            2: "图片",
            3: "图文",
            4: "Flash",
            5: "Flash文字",
            6: "大小图",
            7: "图文描述",
            8: "消息流",
            9: "富媒体",
            10: "视频广告",
            11: "两图两文",
            12: "一图三文",
            13: "三文文字链",
            15: "视频图片广告"
        };
        n.typefield = {
            orderimg: [2, 3, 4, 6, 7, 8],
            img2: [6],
            orderdetail: [7],
            orderdesc: [1, 3, 7, 8],
            orderflash: [4, 5]
        };
        n.premap = {
            2: {orderimg: [180, 180]},
            3: {orderimg: [180, 180]},
            4: {orderflash: [180, 180], orderimg: [180, 180]},
            6: {orderimg: [180, 180], img2: [100, 100]},
            7: {orderimg: [140, 140]}
        };
        n.stateHtml = '<ul class="pop_list" style="top:0;left:0;">{li}</ul>';
        n.typeHtml = '<ul class="pop_list" style="top:0;left:0;"><li><a href="javascript:;" title="" aid="2">展示广告</a></li></ul>';
        n.ordertypelist = {1: "文字", 2: "图片", 4: "flash", 3: "图文", 6: "大小图", 7: "图文描述", 8: "消息流"};
        n.MOS = {1: "iOS", 2: "Android", 4: "Windows", 8: "Symbian", 16: "Java", 32: "其他"};
        n.dm = location.host;
        n.path = "http://" + n.dm;
        n.charset = "GB2312";
        n.domain = n.dm.split(".").slice(1, 3).join(".");
        n.HOST = e;
        n.ROOT = t;
        n.highchartsLinesColor = ["#f0c236", "#5a93ce", "#e98f2e", "#4c59aa"];
        n.highchartsHideYaxisTitle = true;
        n.TARGETPACKQUOTA = 60;
        n.TARGETPACKQUOTA_RED = 55;
        n.confPriceUnitMap = {};
        n.confPriceUnitMap[n.CPC] = "点击";
        n.confPriceUnitMap[n.CPA] = "下载";
        n.confPriceUnitMap[n.CPM] = "千次曝光";
        n.confOptimizationGoalTypeDef = {104: "激活"};
        return n
    }();
    for (o in s) {
        r[o] = s[o]
    }
    r.FORMTYPETXT = 1;
    r.FORMTYPE_TXT = 1;
    r.FORMTYPE_EXPANDABLE = 6;
    r.FORMTYPE_FEEDS = 8;
    r.OSANDROID = 2;
    r.CATE_APP = 3;
    r.CRTSIZE_APPWALL = 50;
    r.CRTSIZE_BANNER_72 = 69;
    r.CRTSIZE_INTERSTITIAL_72 = 70;
    r.CRTSIZE_BANNER_TXT = 71;
    r.CRTSIZE_INTERSTITIAL_120 = 90;
    r.CRTSIZE_APPDETAIL_72 = 115;
    r.CRTSIZE_QQSHOW_140x140_AND_140x200 = 143;
    r.STATUS_NORMAL = 1;
    r.STATUS_PENDING = 2;
    r.STATUS_DENIED = 3;
    r.STATUS_FROZEN = 4;
    r.STATUS_ENABLE = 5;
    r.STATUS_SUSPEND = 10;
    r.STATUS_CANCEL = 17;
    r.STATUS_PREPARE_OK = 18;
    r.STATUS_PREPARE = 19;
    r.STATUS_DELETED = 20;
    r.SELECTOR_KEY_KEY = "+";
    r.SELECTOR_KEY_VAL = "-";
    r.DOWNLOAD_REPORT_LIMIT = 2e3;
    r.DOWNLOAD_REPORT_REQUIRE = {
        cam_order: [],
        prodtype_prod_order: ["product_type_name", "pname", "product_id"],
        order: [],
        prodtype_prod: ["product_type_name"],
        prodtype_prod_prodEffect: ["product_type_name", "product_id"],
        prodtype_prod_ptEffect: ["product_type_name"],
        cam_order_camEffect: ["campaignid"],
        cam_order_orderEffect: ["campaignid", "campaignname", "ordername", "orderid", "tid", "tname"],
        campaign: [],
        reportEffect: [],
        cam_order_camHuman: [],
        cam_order_ordHuman: [],
        product: [],
        settlement: []
    };
    r.APIPATH = a.apidomian ? "http://" + a.apidomian + "/ec" : "";
    r.datapath = r.APIPATH || "";
    r.HTMLPATH = t;
    r.PORTAL_PAGE = e ? "http://" + e + "/" : "";
    r.SURPPORT_PAGE = "http://support.qq.com/write.shtml?fid=922&ADPUBNO=";
    r.FLV_PLAYER = "http://qzs.qq.com/qzone/biz/res/qvplayerforatlas.swf";
    r.statusMap = {
        NORMAL: 1,
        PENDING: 2,
        DENIED: 3,
        FROZEN: 4,
        ENABLE: 5,
        SUSPEND: 10,
        CANCEL: 17,
        PREPARE_OK: 18,
        PREPARE: 19,
        DELETED: 20
    };
    r.createtiveNameMaxLeng = 40;
    r.FLV_PLAYER = "http://qzs.qq.com/qzone/biz/res/qvplayerforatlas.swf";
    r.NUMBERPACKET_MIN_NUMBER = 5e3;
    r.NUMBERPACKET_MIN_LOOKALIKE_NUMBER = 5e3;
    r.NUMBERPACKET_MAX_LOOKALIKE_NUMBER = 5e3;
    r.NUMBERPACKET_TYPEDEF = {
        7: "网址",
        8: "QQ号",
        15: "QQ群号",
        14: "IMEI号",
        16: "IFA号",
        17: "CookieID",
        18: "网址包",
        19: "网址",
        20: "网址",
        21: "QQ号",
        22: "Cookie",
        23: "IMEI",
        24: "IFA",
        28: "lookalike",
        29: "QQ群号",
        32: "IMEI号-MD5包",
        33: "IFA号-MD5包",
        dmp: "DMP"
    };
    r.CONVERSION_STATUS_ENABLED = 1;
    r.CONVERSION_STATUS_DISABLED = 2;
    r.CONVERSION_STATUS_SUSPEND = 10;
    r.CONVERSION_STATUS_DELETED = 20;
    r.CONVERSION_PLATFORM_PC = 1;
    r.CONVERSION_PLATFORM_MOBILE = 2;
    r.CONVERSION_TYPE_ACTIVATED = 1;
    r.CONVERSION_TYPE_REGISTERED = 2;
    r.CONVERSION_TYPE_PAID = 3;
    r.CONVERSION_TYPE_ORDER = 4;
    r.CONVERSION_TYPE_VIEW_PAGE = 5;
    r.CONVERSION_TYPE_ADD_TO_CART = 6;
    r.CONVERSION_TYPE_WEB_COBNSULTING = 7;
    r.CONVERSION_TYPE_TELEPHONE_DIRECT = 8;
    r.CONVERSION_TYPE_TELEPHONE_CALLBACK = 9;
    r.CONVERSION_TYPE_FORM_BOOKING = 10;
    r.CONVERSION_TYPE_START = 11;
    r.CONVERSION_TYPE_AWAKE = 12;
    r.CONVERSION_TYPE_RETENTION_2 = 13;
    r.CONVERSION_TYPE_RETENTION_3 = 14;
    r.CONVERSION_TYPE_RETENTION_7 = 15;
    r.CONVERSION_TYPE_SCORE = 16;
    r.CONVERSION_TYPE_SEARCH = 17;
    r.WEB_CONVERSION_STATUS_TO_BE_VERIFIED = 1;
    r.WEB_CONVERSION_STATUS_ALREADY_INSTALLED = 2;
    r.WEB_CONVERSION_STATUS_VERIFIED_FAILED = 3;
    r.CONVERSION_COUNT_MODE_UNIQUE = 1;
    r.CONVERSION_COUNT_MODE_ALL = 2;
    r.CONVERSION_RELATIONSHIP_AND = 1;
    r.CONVERSION_RELATIONSHIP_OR = 2;
    r.SITESET_DEF = {
        MOBILE: "15",
        MOBILE_INNER: "25",
        QQCLIENT: "9",
        QZONE: "1",
        PENGYOU: "8",
        WECHAT: "21",
        YINGYONGBAO_MOBILE: "22"
    };
    r.ieVersion = function () {
        var e = navigator.userAgent.toLowerCase(), t;
        t = parseInt((/msie (\d+)/.exec(e) || [])[1]);
        if (isNaN(t)) {
            t = parseInt((/trident\/.*; rv:(\d+)/.exec(e) || [])[1])
        }
        if (isNaN(t)) {
            t = -1
        }
        return t
    }();
    r.sizemap = {20: "20条", 50: "50条", 100: "100条"};
    r.appIdDef = {atlas: 293716, phoenix: 3004360};
    r.phoenixOrderEditPage = t + "ad/edit";
    r.phoenixOrderCreatePage = t + "ad/create";
    return r
});
define("js/config/accounttype", function () {
    var e = {
        0: {clsPrefix: "cash", fontCls: "c-red", key: "CASH"},
        1: {clsPrefix: "virtual", fontCls: "c-gre", key: "VIRTUAL"},
        2: {key: "SHARE"},
        3: {
            clsPrefix: "swop",
            fontCls: "c-yellow",
            tips: '只用于”应用宝换量应用”这种推广标的物的消耗，且推广"应用宝换量应用"时，优先消耗该账户的资金。',
            key: "MYAPP_CHARGE"
        },
        4: {
            clsPrefix: "swop",
            fontCls: "c-yellow",
            tips: '只用于”应用宝换量应用”这种推广标的物的消耗，且推广"应用宝换量应用"时，优先消耗该账户的资金。',
            key: "MYAPP_CONSUME"
        },
        5: {clsPrefix: "overdraft", fontCls: "c-yellow", tips: "当现金、虚拟账户中均没有余额后，消耗该账户的资金", key: "CREDIT"},
        6: {key: "PRIVILEGE"},
        7: {clsPrefix: "redsea", fontCls: "c-palered", tips: "只用于红海广告位的投放消耗，且投放红海广告位时，优先消耗该账户的资金。", key: "RED"},
        8: {clsPrefix: "bluesea", fontCls: "c-blue", tips: "只用于蓝海广告位的投放消耗，且投放蓝海广告位时，优先消耗该账户的资金。", key: "BLUE"},
        9: {
            clsPrefix: "cash",
            fontCls: "c-red",
            tips: "只用于微信／移动feeds广告位的投放消耗，且投放微信／移动feeds广告位时，优先消耗该账户的资金",
            key: "MOBILE_CASH"
        },
        10: {
            clsPrefix: "cash",
            fontCls: "c-red",
            tips: "只用于微信／移动feeds广告位的投放消耗，且投放微信／移动feeds广告位时，优先消耗该账户的资金",
            key: "MOBILE_PRIVILEGE"
        },
        11: {clsPrefix: "cash", fontCls: "c-red", tips: "只用于微信／移动feeds广告位的投放消耗，且投放微信／移动feeds广告位时，优先消耗该账户的资金"},
        15: {clsPrefix: "cash", fontCls: "c-red", tips: "CPD（按下载付费）广告，只能消耗该账户的资金", key: "CPD"},
        18: {
            clsPrefix: "appaccount",
            fontCls: "c-blue",
            tips: "只用于移动联盟站点的投放消耗，且投放移动联盟站点时，优先消耗该账户的资金",
            key: "MOBILE_ALLIANCE"
        },
        19: {clsPrefix: "yyzh", fontCls: "c-gre", tips: "只用于运营广告位的投放消耗，且投放运营广告位时，优先消耗该账户的资金"},
        20: {key: "SPONOR_CASH"},
        21: {key: "SPONOR_VIRTUAL"},
        22: {key: "SPONOR_SHARE"},
        23: {clsPrefix: "virtual", fontCls: "c-gre", key: "CPDVIRTUAL"},
        33: {clsPrefix: "xyj"},
        34: {clsPrefix: "roulette", fontCls: "c-blue"},
        42: {clsPrefix: "xyj"},
        100: {clsPrefix: "cash", fontCls: "c-red", tips: "CPT（按展示付费）广告，在消耗完现金账户资金后，也可消耗CPD可用金额", key: "CPT"},
        101: {clsPrefix: "virtual", fontCls: "c-gre", key: "CPTVIRTUAL"}
    }, t = {};
    for (var n in e) {
        if (e[n] && e[n]["key"]) {
            t[e[n]["key"]] = n
        }
    }
    return {accountTypeConfig: e, accountTypeDef: t}
});
define("js/config/lang", ["require", "js/modules/account", "jquery"], function (require) {
    "use strict";
    var e = require("js/modules/account"), $ = require("jquery");
    var t = {};
    t.index = {
        cashAccount: "广告主使用财付通充值的真实货币账户。",
        appAccount: "系统分配给每个广告主的虚拟货币账户，该账户内的虚拟货币由系统派发。",
        viewcount: "<strong>曝光量：</strong>广告被用户看到的次数<br /><strong>点击量：</strong>排除恶意点击后，广告被用户点击的次数",
        cost: "用户点击广告后产生的扣费",
        tradecount: "<strong>下单量：</strong>用户通过该广告链接到商品并产生下单行为的次数<br /><strong>成交量：</strong>用户通过该广告链接到商品并成功交易的次数",
        ctr: "有效点击量/曝光量",
        daybudget: "您可以为您的账户设置每日消费限额，用来控制广告预算。当您的广告当天消耗达到该限额时，广告将暂停投放。该限额为对现金账户及虚拟账户总消耗的限额。<br />消费限额修改后半小时方可生效。"
    };
    t.profile = {portrait: "若您的广告使用了明星肖像，需要在此上传“免责声明”或“明星形象使用授权书”", qualification: "除营业执照外，个别行业还需上传相关行业资质，如需要请在此上传。"};
    t.report = t.repoprt = {
        clickcount: "排除恶意点击后，广告被用户点击的次数",
        ordercount: "<strong>下单量：</strong>用户通过该广告链接到商品并产生下单行为的次数",
        turnover: "<strong>成交额：</strong>用户通过该广告链接到商品并成功交易的交易金额",
        ordertraderate: "成交量/下单量",
        daybudget: "为该推广计划下所有广告当日最高花费。当广告消耗超过限额后，将暂停该推广计划下的广告。",
        campaignStatus: "推广计划的当前状态说明。推广计划可能的状态包括：<br /><strong>启用</strong>：推广计划正常使用中<br /><strong>暂停</strong>：推广计划暂停使用，广告不可见",
        orderStatus: "广告的当前状态说明。广告可能的状态包括：<br /><strong>审核中</strong>：广告审核中，审核通过后才会获得展现<br /><strong>审核不通过</strong>：广告审核未通过，请修改广告内容或素材，重新审核<br /><strong>未到投放时间</strong>：审核已通过，广告将在指定投放时间进行投放<br /><strong>投放中</strong>：广告正常投放中<br /><strong>暂停</strong>：广告暂停投放<br /><strong>投放结束</strong>：广告投放结束",
        crulename: "自定义报表规则的名称，用于区分识别各不同报表规则。",
        rpttype: "报告类型用于指定要生成的报告基本信息类型，目前我们提供如下报告类型：<br /><strong>效果统计报告</strong>：用于基础的效果统计分析及汇总<br /><strong>人口学分析报告</strong>：用于分析广告点击人群的画像数据，方便您更好的使用定向条件，优化广告效果",
        dataobject: "数据纬度是指报表数据的最小汇总纬度，您可以选择要查看的最小数据纬度。<br />例如您只需要知道您的账户目前的总体推广情况，那么可以选择“账户”作为报表的数据纬度；<br />如果您需要知道每个推广计划的效果数据，那么您需要选择“推广计划”作为报表的数据纬度。",
        datetype: "日期范围是指报表包含的数据日期限定，包括：<br /><strong>昨天</strong>：报表生成日期前一天的数据；<br /><strong>最近一周</strong>：报表生成日期前一周的数据（不含当天）；<br /><strong>最近一个月</strong>：报表生成日期前一个月的数据（不含当天）；<br /><strong>自定义</strong>：自定义时间周期范围。",
        groupbytime: "时间粒度是指您查看报表的最小时间粒度，包括：<br /><strong>全段加和</strong>：把所有数据按照报表选定的日期范围加和展示；<br /><strong>按天查看</strong>：以天为粒度，汇总数据；<br /><strong>按小时查看</strong>：以小时为粒度，汇总数据。",
        period: "运行周期是指报表固定运行的时间，包括：<br /><strong>手动</strong>：规则不自动运行，需要手动触发运行；<br /><strong>每天</strong>：每天自动运行该规则；<br /><strong>每周一</strong>：每周一自动运行；<br /><strong>每月1号</strong>：每月的1号自动运行。",
        viewfield: "数据视图为生成报表的数据项构成。您可以根据需要选择您所需要的数据项进行展现。",
        condition: "筛选条件是指报表数据过滤条件，我们将为您过滤符合指定条件的数据进行加工处理。",
        emaillist: "请填写接收该报表规则生成报表的邮箱地址，同一报表规则最多支持5个接收邮箱。",
        usercityreport: "每天早上10点可查看前一天的数据，部分数据可能无法识别到市级，系统会显示到省级或“未知”",
        userreport: "每天早上9点可查看前一天的数据",
        viewcount: "广告被受众看到的次数",
        validclickcount: "排除了恶意点击后，广告被受众点击的次数",
        ctr: "点击率=点击量/曝光量*100%",
        middle_page_view_count: "落地页被受众看到的次数",
        middle_page_click_count: "排除了恶意点击后，落地页被受众点击的次数",
        middle_page_ctr: "落地页点击率=落地页曝光量/落地页点击量*100%",
        cpc: "点击均价=花费/有效点击量",
        download: ['受众通过该广告链接到APP产生下载并下载完成的行为数量，<a href="http://e.qq.com/faq/list054.html" target="_blank" class="view_more">了解更多</a>', {timeout: 2e3}],
        downloadrate: "下载率=下载量/有效点击量*100%",
        yyb_download_rate: "下载率=下载量/曝光量*100%",
        normalized_download_rate: "受众在该条广告上的客观下载率，反映广告的真实效果，屏蔽了一些由于场景曝光概率问题对下载率的影响",
        cost_per_download: "下载均价=花费/下载量",
        followcnt: ['受众通过该广告点击“关注”的行为数量，<a href="http://e.qq.com/faq/list054.html" target="_blank" class="view_more">了解更多</a>', {timeout: 2e3}],
        tradecount: ['依据不同的标的物类型，转化量的含义均不一样（对APP而言，安装量即为转化量），<a href="http://e.qq.com/faq/list054.html" target="_blank" class="view_more">了解更多</a>', {timeout: 2e3}],
        clicktraderate: "安装率（转化率）=安装量（转化量）/有效点击量*100%",
        cpt: "安装（转化）均价=花费/安装量（转化量）",
        activated_count: ['受众通过该广告链接到APP完成激活的行为数量，其中激活行为定义为APP在联网环境下的首次打开。<a href="http://bbs.e.qq.com/forum.php?mod=viewthread&tid=1404" target="_blank" class="view_more">了解更多</a>', {timeout: 2e3}],
        activated_rate: "下载激活率=激活量/下载量*100%",
        click_activated_rate: "点击激活率=激活量/点击量*100%",
        activated_price: "激活均价=花费/激活量",
        amount_cart: "产生加入购物车行为时，购物车中货品的总金额",
        amount_paid: "产生付费行为时，付费的总金额",
        cost: ['广告曝光，点击或转化后产生的扣费。<a href="http://e.qq.com/faq/list023.html" target="_blank" class="view_more">为什么同一时间段的广告花费和财务记录支出可能不一样？</a>', {timeout: 2e3}],
        navigation_count: "用户点击页面中导航按钮的数量",
        spent: ['<a href="http://e.qq.com/faq/list023.html" target="_blank" class="view_more">为什么同一时间段的广告花费和财务记录支出可能不一样？</a>', {timeout: 2e3}],
        viewcounttop: "曝光量排行榜是您所选时间范围内，曝光量排名前五位的广告，其中曝光占比是指该广告曝光量与账户曝光量之比",
        validclickcounttop: "点击量排行榜是您所选时间范围内，点击量排名前五位的广告，其中点击占比是指该广告点击量与账户点击量之比",
        ctrtop: "点击率排行榜是您所选时间范围内，点击率排名前五位的广告",
        costtop: "花费排行榜是您所选时间范围内，花费排名前五位的广告，其中消耗占比是指该广告花费与账户整体花费之比",
        praisecount: "广告被受众点赞的数量",
        commentcount: "广告被受众评论、回复的数量",
        forward_count: "广告被受众转发的数量",
        read_count: "广告被受众阅读的数量",
        key_page_view_count: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户访问了某一关键页面的转化行为数，即记为关键页面浏览量。",
        register_count: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户发生注册的转化行为数，即记为注册量。",
        add_to_car_count: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户将待买的商品加入购物车的转化行为数，即记为加入购物车量。",
        web_trade_count: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户下单但未完成交易的转化行为数，即记为下单量。",
        checkout_count: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户完成订单产生支付的转化行为数，即记为成交量。",
        page_consult: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户通过网页或唤起在线客户对话窗口进行咨询的转化行为数，即记为网页咨询量。",
        page_phone_call_direct: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户通过页面点击直接呼起电话拨打的转化行为数，即记为电话直拨量。",
        page_phone_call_back: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户在网页提交自己电话等待广告主回拨的转化行为数，即记为电话回拨量。",
        page_reservation: "根据您在创建网页转化跟踪时填写的信息，进行转化量的统计。用户在网页上完成表单填写提交预约申请的转化行为数，即记为表单预约量。",
        app_register_count: ['受众通过该广告链接到APP内完成注册的行为数量。<a href="http://bbs.e.qq.com/forum.php?mod=viewthread&tid=1404" target="_blank" class="view_more">了解更多</a>', {timeout: 2e3}],
        app_add_to_car_count: ['受众通过该广告链接到APP内发起购买而未完成付费的行为数量。<a href="http://bbs.e.qq.com/forum.php?mod=viewthread&tid=1404" target="_blank" class="view_more">了解更多</a>', {timeout: 2e3}],
        app_checkout_count: ['受众通过该广告链接到APP内进行付费，完成交易的行为数量。<a href="http://bbs.e.qq.com/forum.php?mod=viewthread&tid=1404" target="_blank" class="view_more">了解更多</a>', {timeout: 2e3}],
        core_pos_ad_exposure: "此数据为该广告在核心广告位中的实际投放情况，从该条广告总量数据中分离得来。总量数据是核心广告位及非核心广告位总和。",
        core_pos_ad_download: "此数据为该广告在核心广告位中的实际投放情况，从该条广告总量数据中分离得来。总量数据是核心广告位及非核心广告位总和。",
        core_pos_ad_download_rate: "此数据为该广告在核心广告位中的实际投放情况，从该条广告总量数据中分离得来。总量数据是核心广告位及非核心广告位总和。"
    };
    t.order = {
        adtype: "广告形式包括普通广告、互动广告；互动广告支持用户直接完成互动操作",
        campaignid: "推广计划是广告的合集，类似电脑中的文件夹功能。您可以将推广平台、预算限额等条件相同的广告放入同一个推广计划中。<br/>目前，腾讯社交广告投放管理平台中，每个广告主最多可以设置500个推广计划。请根据账户推广计划数量限制，合理规划您的推广计划。",
        campaignname: "推广计划名称用来对您的推广计划进行标识，不会对外展示。",
        siteset: "投放平台：广告要投放的平台，例：Qzone、朋友网",
        daybudget: "投放限额：该推广计划下所有广告的预算控制。当消耗达限额所有广告自动暂停。",
        ordername: "广告的名称，用来对广告进行标识，不会对外展示。",
        linktype: "是您想要推广的目标，以及想呈现给用户的页面。请根据实际推广目标选择推广标的物。",
        orderlink: "为了统计更准确的效果信息，系统可能会自动在URL后添加安全无害的效果统计参数。",
        orderlink_weixin_url: "此商品广告展示在微信平台，点击跳转到微信外部的品牌页面；目前仅支持部分外部链接投放。",
        crtsize: ['<a href="http://e.qq.com/faq/list003.html" target="_blank" class="view_more">查看所有广告位</a>', {timeout: 2e3}],
        area: "投放区域：用户当前登录IP所在区域。",
        areaRestrict: "投放区域：用户当前登录IP所在区域。",
        age: "选择年龄定向区间，设置受众年龄的上下限。<br />由于国家政策，若投放酒类广告，系统只会向18岁以上受众展示。",
        ageseg: "选择年龄定向区间，设置受众年龄的上下限。<br />由于国家政策，若投放酒类广告，系统只会向18岁以上受众展示。",
        userstatus: "“已婚”结婚超过一年的用户；<br/>“单身”没有恋爱的对象处于单身状态的用户；<br/>“新婚”从有结婚计划（订婚等）行为开始至结婚一年以内的用户；<br/>“育儿”从有生育计划开始至小孩3岁以内的用户。",
        fee: "出价是指您对当前广告单次点击的最高出价，广告实际扣费将不会高于您设置的出价。",
        CPC: "按每次点击付费",
        CPA: "按每次下载付费",
        CPM: "按每千次曝光付费",
        oCPA: "您可以选择特定优化目标（例如：移动应用的激活），并提供期望平均转化成本，系统会根据您上报的转化数据，预估每一次展示的转化价值，自动出价，按照点击扣费。",
        connectiontype: "温馨提示：若您投放wap文字链广告，请不要选择此定向，会导致没有曝光",
        mobile: "选择投放到移动终端的操作系统，当此定向包应用到移动终端广告时，【不限】视为不进行过滤，否则，【不限】视为此项定向无意义。",
        ispother: '"其他"是指无法识别运营商的设备',
        targetpkg: "使用快捷定向，系统将按照所选定向包中的设置自动完成定向条件的选择",
        appuser: "您可以选择该广告的目标应用用户群体。",
        sitegroup: "如果您勾选“同时投放到第三方流量”复选框，系统将智能的将你的广告展示在相匹配的第三方流量站点上，为您获取更多的曝光和点击。",
        numberpackageinclude: "您的广告将仅投放到选定的人或目标场景中",
        numberpackageexclude: "排除用户：您的广告将不会投放到选定的人或目标场景中",
        consumption_ability: "“高消费”具有较强的经济实力，能够支付较高数额的费用（如汽车购买、房产等）的头部用户群体；<br/>“低消费”较低的经济能力，购物追求价格低廉，不追求品质。",
        weather: "通过选择最适合您商品推广的气象条件定位播放广告的定向，广告系统将为您优先推荐全国最适合您商品营销的地域播放广告。",
        dressindex: "根据自然环境对人体感觉温度影响最主要的天空状况、气温、湿度及风等气象条件，对人们适宜穿着的服装进行分级。您可以根据不同的指数对不同季节的服装推广。",
        makeupindex: "根据气象条件对人的皮肤的影响制定出来的指数，主要影响有温度、湿度、风速、紫外线强度，您可以根据不同的影响因素选择最适合您化妆品的化妆指数。",
        airqualityindex: "根据空气质量指数(AQI指数)对空气质量进行分级，空气质量按照空气质量指数大小分为六级，一级优，二级良，三级轻度污染，四级中度污染，五级重度污染，六级严重污染。您可以针对特定空气质量地区的用户进行推广",
        speedmode: "<strong>选择标准投放(推荐)</strong>，我们会优化您的广告的投放，让您的预算在设定的投放时段内较为平稳的消耗；<br /><strong>选择加速投放</strong>，广告会以较快的速度获得曝光，选择加速投放可能会导致您的预算较快的消耗尽。",
        campaignststus: "您对当前推广计划的操作，包括启用和暂停。但推广计划实际状态受账户余额及推广计划限额等的影响",
        campaignoperationtip: "您对当前推广计划的操作，包括启用和暂停",
        orderoperationtip: "您对当前广告的操作，包括启用和暂停。当广告处于审核中，审核不通过，投放结束等状态时，您不可对广告进行操作",
        campaignstatus: ['当前推广计划的实际状态，受账户限额，账户余额，推广计划限额等因素的影响。比如，当账户余额不足时，即使您人为开启推广计划，受余额不足的影响，计划实际上不会投放。<a href="http://e.qq.com/faq/list027.html" target="_blank">查看更多详情</a>', {timeout: 2e3}],
        orderstatus: ['广告的实际状态，受账户余额，账户限额，推广计划限额等因素的影响。比如，账户余额不足时，即使您人为开启广告，受余额不足影响，广告实际上不会投放。<a href="http://e.qq.com/faq/list027.html" target="_blank">查看更多详情</a>', {timeout: 2e3}],
        estimateUsercount: "基于当前定向条件，能覆盖的最大用户数。实际覆盖用户数还会受到出价和竞争格局影响。",
        estimateViewcount: "基于当前定向条件，能获得的最大曝光量。实际日曝光量还会受到出价和竞争格局影响。",
        suggestPrice: "推荐出价是广告基于当前定向条件，获得大概率展现所需要的出价。另外，当出价已具有较强竞争力时，系统将不再提供推荐价格。",
        keyword: "对指定关键词感兴趣的人群，在其浏览您指定的投放站点时进行投放。",
        keywordContext: "根据用户当前浏览页面内容对应的关键词进行定向投放",
        keywordUser: "根据用户最近浏览页面内容等信息，判断用户兴趣，定向投放到对指定关键词主题感兴趣的人群",
        exchange: ['“换量合作”是指开发者和腾讯互相利用资源优势推广对方移动端APP的合作模式。 开发者帮助腾讯公司推广腾讯公司 应用宝、手机QQ等软件，腾讯公司通过应用宝平台帮助开发者获取用户。<a href="http://wiki.open.qq.com/wiki/%E6%96%B0%E6%8D%A2%E9%87%8F%E4%BB%8B%E7%BB%8D" target="_blank">了解更多</a>', {timeout: 2e4}],
        industry_id: "请谨慎选择广告分类，否则会影响广告曝光。",
        sub_product_id: "渠道包用于管理移动应用的推广渠道，系统只显示渠道包版本不低于主线包版本的渠道包",
        addcreative: ['<a href="http://e.qq.com/faq/list086.html" target="_blank" class="view_more">点击了解多创意及多创意相关策略</a>', {timeout: 2e3}],
        watermark: "推广品牌形象、用户活动请选择“活动推广”；推广可在线交易的商品请选择“商品推广”",
        customer_define_invoke_url: ['<a href="http://e.qq.com/ads/faq/createad/015" target="_blank" title="了解应用直达">点击了解应用直达</a>', {timeout: 2e3}],
        smartOptimizer: "广告累积激活量＞100时，才可以使用。<br>系统为您提供自动优化效果的策略，请选择您的优化目标，并提供此模板的期望转化成本，按照点击扣费。",
        smartOptimizerTarget: "选择您期望优化的转化行为，系统会优先将您的广告展示给最有可能发生此转化行为的用户。",
        smartOptimizerPriceUnit: "提供您期望的平均激活成本，该出价用来跟其他的广告主进行竞价，出价高低会影响广告最终能够竞得的目标用户量，但并不是最终的扣费。",
        CORPORATE: "商标是帮助识别您产品或企业的形象标志，将与广告创意一起展示在您的广告上！",
        trackingUrl: "若落地页中已包含302跳转点击监测链接，则建议不要重复填写后台上报点击监测链接。否则会造成点击数据偏高。",
        core_position: "您需要填写获取这些用户的出价上限，系统会在出价上限内以动态合理的价格获取用户，以降低您的成本。您设置的出价上限越高，获取到的精准用户越多。",
        core_position_suggest_price: "建议出价为系统为您分析的合适价格，您可进行修改。"
    };
    t.linktypes = {
        1: "推广一个网站",
        2: "QQ商家资料卡是商家在QQ上免费展示商品、服务以及活动的信息页。广告主通过推广QQ商家资料卡，可以不用建站，就可以向目标用户传达丰富信息，并实现即时会话沟通",
        3: "营销QQ资料卡是企业在QQ上免费展示商品、服务以及活动的信息页。广告主通过推广企业QQ资料卡，可以不用建站，就可以向目标用户传达丰富信息，并实现即时会话沟通",
        4: "推广认证空间，包括首页、日志页、嵌入页等",
        8: "QQ群资料卡是广告主所推广群的介绍页面。广告主通过推广群资料卡，可以将目标用户引导加群，群聚客户实现高效转化，并达到口碑传播的效果。",
        9: "用于推广齐齐互动视频中的视频直播",
        10: "任务集市是针对开放平台APP设计的分发系统。广告主通过任务集市投放“自定义任务”，系统将任务曝光给匹配用户，引导用户进入应用完成该“任务”，并给完成“任务”的用户发放奖励。产品可有效帮助广告主在较短的时间内以可控的成本集中获得大量高质用户，很好的满足开服需求。",
        11: "推广在开放平台上架的PC APP",
        12: "推广在QQ空间送礼模块中上架的品牌定制的礼物",
        13: "推广在QQ空间签到模块中上架的品牌定制的签到",
        15: "推广在苹果应用市场App Store上架的App",
        16: ['“换量合作”是指开发者和腾讯互相利用资源优势推广对方移动端APP的合作模式。 开发者帮助腾讯公司推广腾讯公司 应用宝、手机QQ等软件，腾讯公司通过应用宝平台帮助开发者获取用户。<a href="http://wiki.open.qq.com/wiki/%E6%96%B0%E6%8D%A2%E9%87%8F%E4%BB%8B%E7%BB%8D" target="_blank">了解更多</a>', {timeout: 2e3}],
        17: "推广在腾讯开放平台上架的移动App",
        20: "任务集市是针对开放平台APP设计的分发系统。广告主通过任务集市投放“自定义任务”，系统将任务曝光给匹配用户，引导用户进入应用完成该“任务”，并给完成“任务”的用户发放奖励。产品可有效帮助广告主在较短的时间内以可控的成本集中获得大量高质用户，很好的满足开服需求。",
        26: "在微信流量上推广您的网站，选择相应推广类型，推广您的品牌活动或实物产品",
        30: "推广腾讯课堂，输入课堂ID号",
        35: "推广一条QQ消息",
        37: "仅在移动联盟流量上推广的App",
        40: "推广一个门店",
        41: "推广一篇文章"
    };
    t.remarketing = {
        visittype: ["<strong>到访定向</strong><br />简介：使当前广告只对那些在设定时间段内看过您网站指定页面的客户展现。<br /><br />注意事项：<br />1. 到访定向只能覆盖访问过您网站的指定人群，其曝光数量较低，建议只对单独新建的到访定向广告使用；<br />2. 到访定向与未到访定向为互斥关系，即一个广告不得同时选择到访定向和未到访定向；<br /><br /><a href='http://e.qq.com/help/guide_visit.html' target='_blank'>了解详情</a>", {timeout: 2e3}],
        unvisittype: ["<strong>未到访定向</strong><br /><br />简介：使当前广告只对那些在一定时间段内没有访问过您网站的客户投放。<br /><br />注意事项：<br /> 1. 该定向功能只有在安装完成访客定向标记代码成功后才能生效；<br />2. 未到访定向与到访定向为互斥关系，即一个广告不得同时选择到访定向和未到访定向；<br /><br /><a href='http://e.qq.com/help/guide_unvisit.html' target='_blank'>了解详情</a>", {timeout: 2e3}],
        pv: "<strong>网址定向页面PV数</strong><br /><br />该统计PV数为昨日访问过您安装了网址定向代码页面的人数，如果与您页面实际访问PV数差距较大，建议您检查网址定向标记代码是否正确安装。",
        url: "按网址添加将为您圈定访问过该网址的访客用户群",
        imgroup: "按QQ群号添加将限定您的广告投放至相应群中的广告位",
        imei: "按IMEI设备号添加将限定您的广告投放至相应手机设备场景中",
        xiangsudaima: "即对腾讯分析上报站点和统计时生成像素点的代码形式。为了保证统计数据的准确，请将腾讯分析统计代码放在其他代码之前，请将代码添加到网站全部页面的标签之前；若网站为框架式网站，请在框架集页面和子框架页面均安装统计代码，框架集页面中，请安装在标签前",
        rule_type: "说明：<br>IMEI号是安卓设备的设备ID，格式为15位的数字串，示例：355065053311001。IFA号为苹果设备的设备ID，格式为32位数字+字母串，用“—”杠分隔，示例：49E2084A-290C-41EF-AD20-E540CD6AE841。Cookie包为与广点通做cookie mapping后获得的cookie id号",
        lookalike: "<strong>1.智能扩展</strong><br>选择现有广告的点击/转化用户作为样本，广点通平台将分析用户特征，智能扩展出更多与之相似的人群，精准的人群能更有效地助您提升广告效果和曝光量。<br><strong>2.提取已有用户群</strong><br>选择创建已有计划中的（种子用户）<br>",
        recentclick: "使用中的已保存点击人群会每天自动更新为最新30天的数据",
        recenttranslate: "使用中的已保存转化人群会每天自动更新为最新90天的数据",
        chosenseednum: "为了提升扩展效果，用于扩展的种子人群覆盖数量不能少于5000人。少于5000人的种子将不会显示在该列表中。",
        lookalikenum: "最终生成的实际扩展结果可能与预估人数略有误差。扩展人群不包含种子。",
        estimateseednum: "保存人群需不少于5000人"
    };
    t.privilege = {
        admin: "拥有所有权限",
        observer: "可查看社交广告内所有数据",
        operator: "可查看社交广告内所有数据，进行广告投放相关的操作",
        treasurer: "可查看社交广告内所有数据，进行财务类操作"
    };
    t.targetPack = {
        use: ["<strong>简介：</strong>使用快捷定向，系统将按照所选定向包中的设置自动完成定向条件的选择" + "<br/>", "<strong>注意事项：</strong>使用快捷定向，将会将此广告与所选定向包关联：", "1.修改定向包中的设置，将会同步到与此定向相关联的所有广告中", "2.修改此广告的定向条件，将会解除与此定向包的关联，【快捷定向】将会重置为【不使用】状态 "].join("<br/>"),
        noPack: ["您目前没有可使用的定向包，可通过以下2种方式创建并使用定向包：", "1. 点击【定向管理】创建新定向包", "2. 在本页设置定向条件后点击【保存并关联以上定向】"].join("<br/>"),
        quickSave: "保存当前设置的定向为一个定向包，下次创建广告时您可以直接调用定向包，提高效率",
        "new": ["<strong>创建新定向：</strong>创建新的定向包。", "<strong>编辑：</strong>编辑修改定向包中的设置，将会同步到与此定向相关联的所有广告中。", "<strong>删除：</strong>删除操作将自动解除广告与此定向包的关联，广告状态以及广告的定向条件不变（删除定向包不能影响广告的状态，不能通过定向包来管理广告）。", "<strong>应用到广告：</strong>所选广告将使用并关联到此定向包。"].join("<br/><br/>")
    };
    t.targets = {
        userstatus2: "从有生育计划开始至小孩3岁以内的用户",
        userstatus4: "从有结婚计划（订婚等）行为开始至结婚一年以内的用户",
        userstatus8: "没有恋爱的对象处于单身状态的用户",
        userstatus9: "结婚超过一年的用户",
        userstatus10: "从有生育计划至小孩即将出生的用户",
        userstatus11: "家里有小孩，且小孩年龄在0-6个月的用户",
        userstatus12: "家里有小孩，且小孩年龄在6-12个月的用户",
        userstatus13: "家里有小孩，且小孩年龄在1-2岁的用户",
        userstatus14: "家里有小孩，且小孩年龄在2-3岁的用户",
        living_status2: "因工作需要而经常出差的商务人群",
        area_type1: "当前位置在该区域的人",
        area_type2: "长期居住在该区域的人",
        area_type3: "旅游或者出差来到该区域的人，并且常住地不在这里",
        lbs_type1: "近期位置在该区域的人",
        lbs_type4: "曾经出现在该位置的人",
        payment0: "指Q币充值，游戏付费等在线消费行为"
    };
    t.bubbleReport = {switchmode: ["这里可以切换到数据态，查看多个指标", {direction: "left", expire: -1}]};
    t.bubbleOrder = {switchpanel: ["想参照其他广告的文案？试试收起面板，已填写的内容不会被抹掉噢", {direction: "right", expire: -1, offsetY: 60}]};
    t.bubbleIndex = {
        switchsite: ["这里可以切换至任务集市系统", {
            direction: "bottom",
            expire: -1,
            offsetX: 50,
            condition: function () {
                return e.isTaskAduser()
            }
        }],
        qqkefu: ["有疑问？点击这里可以直接在线咨询企业QQ小伙伴哦", {
            direction: "right",
            doNotScrollWithPage: true,
            expire: -1,
            offsetY: 0,
            getInsertNode: function () {
                return $("#__extraAside").size() == 1
            }
        }]
    };
    t.message = {setup: "自定义对不同的消息类型设置邮箱，短信的接收方式"};
    t.account = {invoice_amount: "填写的发票金额需要满足以下条件：发票金额<=充值总额 -退款总额 -已开票金额 -已申请但未开票金额（以上均为所选充值月份的数据）"};
    t.dynamiccreative = {
        databases: "请选择一个您要推广的产品库",
        label: "可以选择多个标签，来筛选出您本次要推广的产品；标签之间取并集；",
        pageurl: "当您的广告需要使用监测参数来监测不同情况下的广告效果时，请使用该字段，并保证填写的参数中包含%%lpurl%%。填写完成后请务必点击“点击预览”按钮来确认参数的合法性。",
        title: "您可以自行输入文案，也可从产品库字段列表中选取一个或多个产品字段作为占位符。<br/>系统将根据广告实际展示的产品，拉取相应产品字段的值来替换占位符。<br/>如：最新款式，只售{{price}}元！"
    };
    return t
});
define("js/modules/tips", ["require", "js/config/lang", "jquery", "js/modules/common", "utils", "js/modules/route", "js/modules/account", "js/modules/sideslide", "js/modules/beautyui", "aduser", "js/modules/jquery.plugin"], function (require) {
    "use strict";
    var e = require("js/config/lang"), $ = require("jquery"), t = require("js/modules/common"), n = require("utils"), i = require("js/modules/route"), a = require("js/modules/account"), r = require("js/modules/sideslide"), o = require("js/modules/beautyui"), s = require("aduser"), l = {}, c = {}, u, d, f, p = 0;
    var m = 1e3, g = m + 1;
    require("js/modules/jquery.plugin");
    l.survey = function () {
        var e = t.getTime(), i = new Date(e).getDate(), a, o;
        if (e >= 14381856e5) {
            return false
        }
        if (n.storage.get("notice.surveyLink", "local") == i || n.storage.get("notice.surveyLink_off", "local")) {
            return false
        }
        n.storage.set("notice.surveyLink", i, {media: "local", expire: 864e5});
        a = '<div class="v2explain3">            <h2>邀请函</h2>            <span class="v2explain3-close __close">关闭</span>            <div class="v2explain3-main">                尊敬的客户，您好：                <p>为了提升广点通的产品与服务体验，我们诚挚邀请您参加2015年上半年客户满意度有奖调研，将您对广点通的意见和建议告诉我们。请您点击链接完成调研问卷：                <br><a href="http://exp.qq.com/ur/?urid=23074" target="_blank" id="surveyLink" data-hottag="atlas.notice.surveyLink_click">http://exp.qq.com/ur/?urid=23074</a>，精美大奖等您带走！</p>                <p>我们非常重视您的宝贵意见，也将为您在本次问卷中所提供的任何个人信息保密，真诚期待您的参与。</p>                <p style="text-align: right; margin-top: -10px;">腾讯社交与效果广告团队</p>            </div>        </div>';
        o = $(a);
        o.appendTo(document.body);
        r.maskLayout(m, document, {opacity: .7});
        o.find(".__close").bind("click", function () {
            o.remove();
            r.maskLayout.remove()
        });
        o.find("#surveyLink").bind("click", function () {
            n.storage.set("notice.surveyLink_off", 1, {media: "local", expire: 864e6})
        });
        t.reportHottag("atlas.notice.surveyLink_show");
        return true
    };
    c.locallock = function (e, t) {
        var i;
        try {
            i = localStorage.getItem(e)
        } catch (a) {
            i = n.storage.get(e, "local")
        }
        return i === t
    };
    c.locallock.update = function (e, t) {
        try {
            localStorage.setItem(e, t)
        } catch (i) {
            n.storage.set(e, t, {media: "local", expire: -1})
        }
    };
    c.firstTimeTip = function () {
        var e = $.cookie.get("firsttime"), t = false;
        e = parseInt(e, 10);
        if (e !== 0) {
            $.cookie.set("firsttime", 0, "e.qq.com", "/", 24 * 60);
            t = true
        }
        return t
    };
    /*c.init = function (e) {
     var n = e || {}, i = "", o = "", s, u, d = t.getTime(), f = 14467392e5, p = n.isIndex || false;
     if (!a.isYYBKAAduser()) {
     i = ['<div style="z-index: ' + g + '">', '<div class="guide-02 __step" rel="0">', '<div class="header">', "<p><strong>欢迎您登录腾讯社交广告投放管理平台！</strong></p>", "<p>经过以下步骤，即可开始投放广告</p>", "</div>", '<div class="body"></div>', '<div class="ft">', '<button class="btn btn-primary __over __toAccountEdit">开始补全账户资料</button>', '<button class="btn btn-default __next">暂时忽略，开始使用系统</button>', "</div>", "</div>", '<div class="guide">', '<div class="step1 none __step" rel="1"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="step2 topStep none __step" rel="2"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="step3 none __step" style="top:111px" rel="3"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="step4 none __step" rel="4"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="step5 none __step" rel="5"><a href="javascript:;" class="__next" alt="继续"></a></div>', '<a href="javascript:;" alt="开始体验》" rel="5" class="step4-2 __step __last __next" id="guide-step42" style="display:none">马上开始体验&nbsp;>></a>', "</div>", "</div>"].join("\r\n")
     } else {
     i = ['<div style="z-index: ' + g + '">', '<div class="guide-02 __step" rel="0">', '<div class="header">', "<p><strong>欢迎您登录腾讯社交广告投放管理平台！</strong></p>", "<p>经过以下步骤，即可开始投放广告</p>", "</div>", '<div class="body"></div>', '<div class="ft">', '<button class="btn btn-primary __over __toAccountEdit">开始补全账户资料</button>', '<button class="btn btn-default __next">暂时忽略，开始使用系统</button>', "</div>", "</div>", '<div class="guide">', '<div class="step1 none __step" rel="1"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="step3 none __step" style="top:111px" rel="2"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="step4 none __step" rel="3"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="step5 none __step" rel="4"><a href="javascript:;" class="__next" alt="继续"></a></div>', '<a href="javascript:;" alt="开始体验》" rel="4" class="step4-2 __step __last __next" id="guide-step42" style="display:none">马上开始体验&nbsp;>></a>', "</div>", "</div>"].join("\r\n")
     }
     if (!a.isYYBKAAduser()) {
     o = ['<div style="z-index: ' + g + '">', '<div class="guide">', '<div class="new-step1 topStep none __step" rel="0"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="new-step2 none __step" rel="1"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="new-step3 none __step" style="top:111px" rel="2"><a href="javascript:;" class="__next" alt="继续"></a></div>', '<a href="javascript:;" alt="开始体验》" rel="2" class="step4-2 __step __last __next" id="guide-step42" style="display:none">马上开始体验&nbsp;>></a>', "</div>", "</div>"].join("\r\n")
     } else {
     o = ['<div style="z-index: ' + g + '">', '<div class="guide">', '<div class="new-step2 none __step" rel="0"><a href="javascript:;" class="__next" alt="继续"></a><a href="javascript:;" class="tuic __over">跳过</a></div>', '<div class="new-step3 none __step" style="top:111px" rel="1"><a href="javascript:;" class="__next" alt="继续"></a></div>', '<a href="javascript:;" alt="开始体验》" rel="1" class="step4-2 __step __last __next" id="guide-step42" style="display:none">马上开始体验&nbsp;>></a>', "</div>", "</div>"].join("\r\n")
     }
     s = !c.locallock("greenhand", "0");
     u = !c.locallock("indexhand", "0");
     if (p && s && self == parent) {
     var h;
     r.maskLayout(m, null, {opacity: .7});
     h = $(i);
     h.attr("id", c.id);
     h.appendTo(document.body);
     c.bindevent();
     c.showstep(0);
     c.locallock.update("greenhand", "0");
     c.locallock.update("indexhand", "0");
     return true
     } else if (p && u && d < f && self == parent) {
     var h;
     r.maskLayout(m, null, {opacity: .7});
     h = $(o);
     h.attr("id", c.id);
     h.appendTo(document.body);
     c.bindevent();
     c.showstep(0);
     setTimeout(function () {
     c.setStepTop(0)
     }, 300);
     c.locallock.update("indexhand", "0");
     return true
     } else {
     return l.survey()
     }
     };*/
    c.id = "__gdt_greenhand";
    c.showstep = function (e) {
        var t = $("#" + c.id);
        t.find(".__step").addClass("none");
        t.find("[rel=" + e + "]").removeClass("none");
        if (e === 1) {
            $("#main").css({height: "100%", overflow: "inherit"})
        }
    };
    c.setStepTop = function (e) {
        var t = $("#orderofWrap"), n = 0;
        if (t.length > 0 && (e == 0 || e == 1)) {
            n = parseInt(t.offset().top) || 0;
            if (n > 120) {
                $("#" + c.id).find(".topStep").css({top: n - 120})
            }
        }
    };
    c.bindevent = function () {
        var e = $("#" + c.id);
        e.delegate(".__next", "click", function (e) {
            c.nextstep(e.target)
        });
        e.delegate(".__over", "click", function (e) {
            c.clear()
        });
        e.delegate(".__toAccountEdit", "click", function (e) {
            i.toPage("tool/profile?act=edit")
        })
    };
    c.nextstep = function (e) {
        var t;
        e = $(e);
        if (!e.hasClass("__step")) {
            e = e.parents(".__step")
        }
        t = e.attr("rel");
        c.setStepTop(t);
        if (e.hasClass("__last")) {
            c.clear()
        } else {
            t++;
            c.showstep(t);
            $("#guide-step42").show()
        }
    };
    c.clear = function () {
        r.maskLayout.remove();
        $("#" + c.id).remove();
        t.resizeMainDivHeightToMatchWin()
    };
    d = function () {
        return true
    };
    u = function ($) {
        var e = t.getTime(), i = new Date(e).getDate(), a = new Date("2017-1-1 00:00:00").getTime(), o = new Date("2017-1-20 23:59:59").getTime(), l;

        function c() {
            if (e >= o || e <= a) {
                return false
            }
            if (s.agid != 0) {
                return false
            }
            if (n.storage.get("notice.letterTips", "local") == i) {
                return false
            }
            u();
            return true
        }

        function u() {
            var e = '<div style="height:430px" class="v2explain">                            <p class="lace"></p>                            <div style="height:370px" class="main">                            <h3 style="width:120px">尊敬的广告主：</h3>                            <p class="line2" style="text-indent:2em">您好，由于腾讯社交广告业务的所属公司——北京腾讯文化传媒有限公司将于2017年进行税号更换，请务</p>                            <p class="line2">必在1月15日前提前完成发票申请，谢谢！</p>                            <p class="line2" style="text-indent:2em">本次税号更换的影响如下，请广告主注意：</p>                            <p class="line2">（1）自2017年1月15日起暂停开具发票，直至变更税号完毕；</p>                            <p class="line2">（2）1月15日以后申请的发票，将会在税号变更完毕后启用新税号进行开具；</p>                            <p class="line2">（3）1月15日之前已开出发票请广告主收到发票后，务必及时在1月31日前进行认证，逾期有可能腾讯侧的税号已经变更，原发票无法认证；</p>                            <p class="line2">（4）税号变更成功的日期目前无法确认，预计待税号变更成功后再另行通知。</p>                            <p class="line2"><br/></p>                            <p class="line2" style="text-align:right">腾讯社交与效果广告平台</p>                            <p class="line2" style="text-align:right">2017年1月1日</p>                            <a href="javascript:;" class="nod _js_goprofile" style="width:200px;margin:5px auto 0 auto;" data-link="tool/profile">我知道了</a>                            </div>                            <p class="lace"></p>                        </div>';
            l = $(e);
            l.appendTo(document.body);
            r.maskLayout(m, document, {opacity: .7});
            l.on("click", "._js_goprofile", function () {
                n.storage.set("notice.letterTips", i, {media: "local", expire: 3600 * 24 * 1e3});
                t.reportHottag("atlas.notice.gotoprofile");
                l.remove();
                r.maskLayout.remove()
            })
        }

        return c
    }($);
    function h(t) {
        t = t || document.body;
        var i = $("._bubble", t);
        if (i.length < 1 && p < 40) {
            p++;
            setTimeout(function () {
                h(t)
            }, 500)
        } else {
            i.each(function (t, i) {
                var a = this.getAttribute("rel") || "", r, s, l, c;
                if (n.storage.get(a, "local")) {
                    return
                }
                r = a.split(".");
                c = e[r[0]][r[1]];
                if ($.type(c) == "array") {
                    s = c[0];
                    l = c[1] || {}
                } else {
                    s = c
                }
                if (l.condition && !l.condition()) {
                    return
                }
                l.buttonEvt = function (e) {
                    return function () {
                        n.storage.set(e, 1, {media: "local", expire: -1})
                    }
                }(a);
                l.oninit = function () {
                    if (!l.doNotScrollWithPage) {
                        this.setAttribute("data-top", this.style.top);
                        $("#main").bind("scroll", function (e) {
                            return function () {
                                var t = parseInt(e.getAttribute("data-top"), 10);
                                e.style.top = t - this.scrollTop + "px";
                                n.log(e.getAttribute("data-top"), t, e.style.top)
                            }
                        }(this))
                    }
                };
                l.insertNode = l.getInsertNode && l.getInsertNode() || $("#main").get(0) || document.body;
                o.showBubble(i, s, l)
            })
        }
    }

    function v(n) {
        var i = n.attr("rel"), a = n.attr("data-tip"), r, o, s, l, c, u, d = null, p, m;
        if (i || a) {
            if (a) {
                s = a;
                c = n.attr("data-tip-timeout") ? n.attr("data-tip-timeout") : -1
            } else {
                r = i.split(".");
                o = e[r[0]][r[1]];
                if ($.type(o) == "array") {
                    s = o[0];
                    l = o[1] || {}
                } else {
                    s = o
                }
                c = l && l.timeout ? l.timeout : -1
            }
            if (f) {
                f = null
            }
            p = function (e) {
                var e = e || "";
                if (!e) {
                    return false
                }
                try {
                    clearTimeout(d)
                } catch (t) {
                }
                d = setTimeout(function () {
                    var t = $("#" + e + "_contain"), n = t.find(".bubble_help"), i = 0, a = 0;
                    if (t.length > 0 && n.length > 0) {
                        i = parseInt(t.height()) || 0;
                        a = parseInt(n.height()) || 0;
                        if (a - i >= 4) {
                            t.css("height", a)
                        }
                    }
                }, 30)
            };
            u = c > 0 ? function (e) {
                n.bind("mouseout", function () {
                    f = e;
                    setTimeout(function () {
                        t.hideBubble(e)
                    }, c)
                });
                p(e)
            } : function (e) {
                n.bind("mouseout", function () {
                    t.hideBubble(e)
                });
                p(e)
            };
            m = c > 0 ? false : true;
            t.showBubble(n.get(0), '<div class="bubble_help">' + s + "</div>", {
                timeout: -1,
                onLoad: u,
                noCloseButton: m,
                noQueue: true
            })
        }
    }

    return {
        Greenhand_id: c.id, init: function (e) {
            if (d()) {
                //if (!c.init(e)) {
                //    u()
                //}
                h();
                this.initYellowHint()
            }
        }, initPageBubble: h, initYellowHint: function (e) {
            $(e || document.body).on("mouseover", ".ico-help,._yellowtip,.ico-strongwarn", function (e) {
                v($(e.currentTarget));
                return false
            })
        }
    }
});
define("js/modules/beautyui", ["require", "jquery"], function (require) {
    var e = "loading-bg", t = {}, $ = require("jquery");
    t.showLoading = function (n, i) {
        i = i || {};
        typeof n === "string" && (n = $("#" + n));
        $(n).addClass(e);
        i.minHeight && $(n).css("min-height", i.minHeight);
        i.timeout && setTimeout(function () {
            t.hideLoading(n)
        }, i.timeout)
    };
    t.hideLoading = function (t) {
        typeof t === "string" && (t = $("#" + t));
        $(t).removeClass(e)
    };
    t.showBubble = function (e, t, n) {
        var i, a, r, o, s, l, c, u, d, f, p, m, g, h = 34, v = 28, _ = {}, y, b, w = [];
        typeof e === "string" && (e = $(e));
        n = n || {};
        u = n.direction || "left";
        p = n.buttonTxt || "我知道了";
        m = n.buttonEvt || function () {
            };
        o = typeof n.top !== "undefined" ? n.top : "inherit";
        s = typeof n.left !== "undefined" ? n.left : "inherit";
        c = typeof n.bottom !== "undefined" ? n.bottom : "inherit";
        l = typeof n.right !== "undefined" ? n.right : "inherit";
        d = n.offsetY || 0;
        f = n.offsetX || 0;
        g = n.insertNode || document.body;
        b = n.position || "fixed";
        y = function () {
            var e = [], n = _[u] || {css: "", top: 0, left: 0};
            e.push('<div class="_bubbleWrap b-hint ' + n.css + '" style="z-index:1000000;position:' + b + ";top:" + n.top + "px;left:" + n.left + 'px;">');
            e.push("<p>" + t + "</p>");
            e.push('<a href="javascript:;" onclick="return false" class="nod s-button-right _btn">' + p + "</a>");
            e.push('<i class="b-hint-arrow"></i>');
            e.push("</div>");
            return e.join("")
        };
        i = e.getBoundingClientRect();
        var A = $(y()).css({visibility: "hidden", position: "absolute", left: "-999em"}).appendTo(document.body);
        a = A.get(0).getBoundingClientRect();
        A.remove();
        _ = {
            top: {css: "b-hint-t", top: i.top - a.height - h - d, left: i.left + f},
            right: {css: "b-hint-r", top: i.top + d, left: i.right + v + f},
            bottom: {css: "b-hint-b", top: i.bottom + h + d, left: i.left + f},
            left: {css: "b-hint-l", top: i.top + d, left: i.left - a.width - v - f}
        };
        w = y();
        r = $(w);
        r.appendTo(g).find("._btn").bind("click", function (e) {
            $(this).parents("._bubbleWrap").remove();
            m.call(this)
        });
        n.oninit && n.oninit.call(r.get(0))
    };
    t.hideBubble = function (e) {
    };
    t.showLoadError = function (e, t, n) {
        e = $.type(e) === "string" ? $("#" + e) : e;
        e.html('<p class="loadfail">信息加载失败，点击<a href="javascript:;" onclick="return false" class="_retry">重试</a><p>');
        t = t || function () {
            };
        e.find("._retry").bind("click", function () {
            t();
            return false
        })
    };
    return t
});
define("hermes/cgi/comm", ["jquery", "utils", "widget/cookie"], function ($, e) {
    function t(e) {
        var e = $.cookie("skey"), t = 5381;
        if (!!e) {
            for (var n = 0, i = e.length; n < i; ++n) {
                t += (t << 5) + e.charCodeAt(n)
            }
        }
        return t & 2147483647
    }

    function n(e, n, i) {
        var a, r, o;
        i = i || {};
        i.base = i.base || "/hermes/api.php?mod={mod}&act={act}";
        a = i.base;
        if (!(e && n)) {
            o = "/hemers/api.php?"
        } else {
            a = a.replace(/\{mod\}/g, e).replace(/\{act\}/g, n);
            r = [];
            if ($.type(i.extr) === "object") {
                $.each(i.extr, function (e, t) {
                    r.push(e + "=" + encodeURIComponent(t.toString()))
                });
                if (r.length > 0) {
                    a += "&" + r.join("&")
                }
            }
            o = a
        }
        if (!i.noCommParams) {
            o = o + "&unicode=true&g_tk=" + t()
        }
        if ($.type(i.handler) === "function") {
            o = i.handler(o)
        }
        return o
    }

    function i() {
        var e = arguments[1] || "";
        typeof console != "undefined" && console && console.log(e)
    }

    function a(t, a, r) {
        var o = n(t, a, r);
        return function (s, l) {
            var c = {
                url: o,
                data: {},
                success: s,
                error: i,
                report: {cgi: n(t, a, {noCommParams: true, base: r && r.base ? r.base : ""})}
            };
            $.extend(c, l);
            e.io.get(c)
        }
    }

    function r(t, a, r) {
        var o = n(t, a, r);
        return function (s, l) {
            var c = {
                url: o,
                data: {},
                success: s,
                error: i,
                report: {cgi: n(t, a, {noCommParams: true, base: r && r.base ? r.base : ""})}
            };
            $.extend(c, l);
            e.io.post(c)
        }
    }

    return {getURL: n, loader: a, sender: r, fallback: i, csrfToken: t}
});
define("js/services/common", ["require", "aduser", "hermes/cgi/comm", "js/config/env", "jquery", "utils", "js/modules/uuid", "spa.monitor"], function (require) {
    "use strict";
    var e = require("aduser"), t = require("hermes/cgi/comm"), n = require("js/config/env"), i = e.aduid, $ = require("jquery"), a = $.extend({}, t), r = {
        cid: "campaignid",
        cname: "campaignname",
        ctype: "campaigntype",
        day_budget: "daybudget",
        mid: "mid",
        asiteset_str: "sitesetstr",
        aid: "orderid",
        aname: "ordername",
        asiteset: "siteset",
        link_target_frozen: "linktarget",
        link_type_frozen: "linktype",
        meta_class: "metaclass",
        third_id: "third_id",
        cost_type: "feetype",
        cost_price: "feeprice",
        dest_url: "orderlink",
        atimeset_frozen: "timeset"
    }, o = "/ec/api.php?mod={mod}&act={act}", s = require("utils"), l = require("js/modules/uuid"), c = require("spa.monitor");

    function u() {
        var e = arguments[1] || "";
        s.log(e)
    }

    function d(e) {
        //c.cgi({
        //    data: {
        //        owner: i || "",
        //        source: "atlas",
        //        cgi: e.cgiUrl,
        //        method: e.type || "",
        //        params: e.data,
        //        responsetext: e.response,
        //        ret: e.response && typeof e.response.ret != "undefined" ? e.response.ret : "",
        //        time: e.spentTime,
        //        content: e.mod && e.act ? "mod=" + e.mod + "&act=" + e.act : "",
        //        invoice_id: l.get()
        //    }, batchReport: true, useSendBeacon: true
        //})
    }

    function f(e, t, n) {
        var i = a.getURL(e, t, n);
        return function (n, a) {
            var r = {url: i, data: {}, success: n, error: u};
            var o = (new Date).getTime();
            $.extend(r, a);
            var l = s.io.get(r);
            l.always(function (n) {
                n = n || {};
                d({
                    cgiUrl: i,
                    type: "post",
                    data: r.data,
                    spentTime: Math.ceil((new Date).getTime() - o),
                    response: n,
                    mod: e,
                    act: t
                })
            });
            return l
        }
    }

    function p(e, t, n) {
        var i = a.getURL(e, t, n);
        return function (n, a) {
            var r = {url: i, data: {}, success: n, error: u};
            $.extend(r, a);
            var o = (new Date).getTime();
            var l = s.io.post(r);
            l.always(function (n) {
                n = n || {};
                d({
                    cgiUrl: i,
                    type: "get",
                    data: r.data,
                    spentTime: Math.ceil((new Date).getTime() - o),
                    response: n,
                    mod: e,
                    act: t
                })
            });
            return l
        }
    }

    //$.each(["loader", "sender"], function (e, n) {
    //    a[n] = function (e, a, r) {
    //        r = r || {};
    //        r.base = r.base || o;
    //        if (r.base && i && r.base.indexOf("owner=") == -1) {
    //            r.base += (r.base.indexOf("?") > 0 ? "&" : "?") + "owner=" + i
    //        }
    //        var s = n == "sender" ? p(e, a, r) : f(e, a, r);
    //        var l;
    //        if (n == "sender") {
    //            l = function (i, o) {
    //                o = o || {};
    //                var s = o.data || {}, l, c = $.extend({}, r);
    //                if (s.post_format == "json") {
    //                    $.extend(o, {data: JSON.stringify(s), contentType: "application/json", dataType: "json"})
    //                }
    //                c.base += (c.base.indexOf("?") > 0 ? "&" : "?") + "post_format=json";
    //                l = t[n](e, a, c);
    //                l(i, o)
    //            }
    //        }
    //        return l || s
    //    }
    //});
    a.transformFromCgi = function (e) {
        var t = r, i = {}, a = [];
        e = $.extend(true, {}, e);
        $.each(t, function (e, t) {
            i[t] = e
        });
        $.each(e, function (t, n) {
            var a;
            a = i[t];
            if (a) {
                e[a] = n
            }
        });
        $.each(e, function (n, i) {
            var a, r;
            r = n.replace(/\[\d{1,3}\]/, "[{CRTSIZE}]");
            if (r in t) {
                a = t[r];
                e[a] = i
            }
        });
        $.each(e.creatives || {}, function (t, i) {
            a.push(t);
            if (!e.crt_type) {
                $.each(i, function (t, i) {
                    if (i.status == n.STATUS_DELETED) {
                        return
                    }
                    e.crt_type = i.crt_type;
                    return false
                })
            }
        });
        e.crt_size = a.join("-");
        return e
    };
    a.getURL = function (e, n, a) {
        a = a || {};
        a.base = a.base || o;
        a.base += (a.base.indexOf("?") > 0 ? "&" : "?") + $.param({owner: i});
        return t.getURL(e, n, a)
    };
    a.setTimeRpt = function (e, t) {
        e = e || {};
        t = t || false;
        var n = e.selected_list || [], i = $.inArray("time", n);
        if (e.sdate && e.edate) {
            if (e.sdate == e.edate) {
                e.time_rpt = 1
            } else {
                e.time_rpt = 0
            }
            if (t) {
                e.time_rpt = 0
            }
        }
        if (e && !e.time_rpt && e.format == "xls" && i > -1) {
            e.selected_list.splice(i, 1, "statsdate")
        }
        return e
    };
    return a
});
define("js/services/account", ["require", "jquery", "hermes/comm/formater", "js/config/accounttype", "js/services/common", "js/modules/account"], function (require) {
    "use strict";
    var $ = require("jquery"), e = require("hermes/comm/formater"), t = require("js/config/accounttype"), n = require("js/services/common"), i = require("js/modules/account"), a = {};
    var r = t.accountTypeDef;
    var o = "/ec/api.php?mod={mod}&act={act}", s = {
        parseData: function (t) {
            if (t && $.isArray(t.accounts) && !t.hasParse) {
                t.hasParse = true;
                t.day_budget = e.scientific(t.day_budget / 100);
                t.daily_cost = e.scientific(t.daily_cost / 100);
                t.cpd_day_budget = e.scientific(t.cpd_day_budget / 100);
                t.cashAccount = {};
                t.virtualAccount = {};
                $.each(t.accounts, function (e, n) {
                    if (n && n.app_id == r.CASH) {
                        t.cashAccount = n
                    } else if (n && n.app_id == r.VIRTUAL) {
                        t.virtualAccount = n
                    }
                    if (n) {
                        n.daily_cost = parseFloat((n.daily_cost / 100).toFixed(2));
                        n.balance = parseFloat((n.balance / 100).toFixed(2))
                    }
                })
            }
            return t
        },
        isAmountEnough: function (e) {
            var t = e || {};
            return !t.fund_not_enough
        },
        didReachLimit: function (e) {
            return e && e.reach_day_budget
        },
        isNearLimit: function (e) {
            return e && e.day_budget_alarm_flag
        },
        setDaybudget: n.sender("account", "setdaybudget", {base: o}),
        setCPADaybudget: n.sender("account", "setcpadaybudget", {base: o}),
        transferToWX: n.sender("account", "mpboundtransfer", {base: o}),
        charge: n.sender("account", "charge", {base: o}),
        codecharge: n.sender("account", "wechatcodecharge", {base: o}),
        midasCharge: n.sender("account", "midascharge", {base: o}),
        setBillorder: n.sender("account", "setbillorder", {base: o}),
        getDashboard: function (e, t) {
            var i = e || function () {
                }, r = $.extend(true, {
                cache: true,
                cacheMedia: "memory",
                cacheExpire: 6e4,
                ozid: 400400
            }, t), s = n.loader("account", "dashboard", {base: o});
            if (r.reload || $.isEmptyObject(a)) {
                delete r.reload;
                s(function (e) {
                    var e = e || {};
                    i(e);
                    if (e.ret == 0) {
                        a = $.extend(true, {}, e)
                    }
                }, r)
            } else {
                i($.extend(true, {}, a))
            }
        }
    };
    return s
});
define("js/services/message", ["require", "js/services/common", "jquery"], function (require) {
    "use strict";
    var e = require("js/services/common"), $ = require("jquery");
    var t = "/ec/api.php?mod={mod}&act={act}", n = e.loader("message", "list", {base: t}), i = e.sender("message", "setread", {base: t}), a = e.sender("message", "del", {base: t}), r = e.sender("aduser", "acceptservice", {base: t}), o = 1, s = 0, l = 0, c, u;

    function d(e, t, i) {
        var a;
        e = e || {};
        a = {page: 1, pagesize: 10};
        $.extend(a, e);
        return n(t, {data: a, error: i})
    }

    u = {
        getCurSel: function () {
            return {status: l, cate: s}
        }, changeStatus: function (e, t) {
            l = e;
            u.getList(0, s, t)
        }, getList: function (e, t, n) {
            var i;
            n = n || $.noop;
            e = e || 0;
            o = e ? o : 1;
            t = s = t || s || 0;
            i = o = o + e;
            d({status: l, cateid: t, page: i, pagesize: 9}, function (e) {
                if (e.ret === 0) {
                    var i = e.data, a = {};
                    $.each(i.list, function (e, t) {
                        a[t.msgid] = t
                    });
                    c = a
                }
                n(e, t)
            })
        }, getNewMessage: function (e, t) {
            e = e || 0;
            t = t || $.noop;
            d({status: 1, cateid: e, page: 1, pagesize: 10}, function (e) {
                t(e)
            })
        }, read: function (e, t) {
            i(function (n) {
                if (n.ret === 0) {
                    c[e].status = 2;
                    t()
                }
            }, {data: {msgid: e}})
        }, getMsgDataById: function (e) {
            return c && c[e] ? c[e] : ""
        }, deleMsgById: function (e, t, n) {
            if (e) {
                a(function (e) {
                    if (e && e.ret == 0) {
                        t()
                    } else {
                        n(e)
                    }
                }, {data: {msgid: e}, error: n})
            }
        }, acceptService: function (e, t, n) {
            if (e) {
                r(function (e) {
                    if (e && e.ret == 0) {
                        t()
                    } else {
                        n(e)
                    }
                }, {data: {verifier: e || ""}, error: n})
            }
        }
    };
    return u
});
define("js/services/user", ["require", "js/services/common", "jquery"], function (require) {
    "use strict";
    var e = require("js/services/common"), $ = require("jquery");
    var t = e.loader;
    var n = e.sender;
    var i = "/ec/api.php?mod={mod}&act={act}", a = "aduser", r = null;
    return {
        getRegistInfo: function (e, n, o) {
            o = o || false;
            var s, l;
            n = n || {};
            l = n.error || e;
            if (!r || o) {
                r = $.Deferred();
                s = t(a, "reginfo", {base: i});
                s(function (e) {
                    r.resolve(e)
                }, $.extend({}, n, {
                    error: function (e) {
                        r.reject(e)
                    }
                }))
            }
            r.done(e).fail(l)
        },
        getIndustryList: t("utilities", "getadvertiserindustryconf", {base: i}),
        getQualificationConf: t("utilities", "getqualificationconf", {base: i}),
        getRzName: t("order", "getrzname", {base: i}),
        editClientAtlas: n(a, "modify", {noDefErr: 1, base: i}),
        getQuotaLimit: t(a, "getquota", {base: i}),
        modifyIdentity: n(a, "modifyidentity", {noDefErr: 1, base: i}),
        getInfo: t(a, "info", {base: i})
    }
});
define("js/config/report", ["require", "exports", "hermes/comm/formater", "aduser"], function (require, e) {
    var t = require("hermes/comm/formater"), n = require("aduser"), i = false;
    try {
        if (n.privilege.ka_advertiser) {
            i = true
        }
    } catch (a) {
    }
    e = {};
    e.fields = {
        campaignname: {label: "计划名称"},
        campaignid: {label: "计划ID"},
        ordername: {label: "广告名称"},
        orderid: {label: "广告ID"},
        pname: {label: "标的物名称"},
        product_id: {label: "标的物ID"},
        statsdate: {label: "时间"},
        area: {label: "地区"},
        city: {label: "城市"},
        gender: {label: "性别"},
        age: {label: "年龄"},
        medium_id: {label: "媒体ID"},
        ad_position_id: {label: "广告位ID"},
        status: {label: "状态", isPercent: false, canSum: false},
        operation: {label: "操作", isPercent: false, canSum: false},
        statstime: {
            label: "日期", formatHandler: function (e) {
                return t.timerange(e.statsdate)
            }
        },
        viewcount: {
            label: "曝光量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.viewcount, 0)
            }
        },
        validclickcount: {
            label: "点击量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.validclickcount, 0)
            }
        },
        ctr: {
            label: "点击率", isPercent: true, sumHandler: function (e) {
                var n = "-";
                if (e.validclickcount != "-" && e.viewcount != "-") {
                    n = t.divide(e.validclickcount, e.viewcount, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.ctr, 2)
            }
        },
        middle_page_view_count: {
            label: "落地页曝光量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.middle_page_view_count, 0)
            }
        },
        middle_page_click_count: {
            label: "落地页点击量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.middle_page_click_count, 0)
            }
        },
        middle_page_ctr: {
            label: "落地页点击率", isPercent: true, sumHandler: function (e) {
                var n = "-";
                if (e.middle_page_click_count != "-" && e.middle_page_view_count != "-") {
                    n = t.divide(e.middle_page_click_count, e.middle_page_view_count, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.middle_page_ctr, 2)
            }
        },
        orgcost: {
            label: "应扣额", canSum: true, formatHandler: function (e) {
                return t.scientific(t.divide(e.orgcost, 100, 2))
            }
        },
        cost: {
            label: "花费", canSum: true, formatHandler: function (e) {
                return t.scientific(t.divide(e.cost, 100, 2))
            }
        },
        cpc: {
            label: "点击均价", sumHandler: function (e) {
                var n = "-";
                if (e.cost != "-" && e.validclickcount != "-") {
                    n = t.divide(e.cost, e.validclickcount, 2)
                }
                return n
            }, formatHandler: function (e) {
                return t.scientific(t.divide(e.cpc, 100, 2))
            }
        },
        daybudget: {
            label: "限额", formatHandler: function (e) {
                return t.scientific(t.divide(e.daybudget, 100, 0))
            }
        },
        price: {
            label: "出价", formatHandler: function (e) {
                return t.scientific(t.divide(e.price, 100, 2))
            }
        },
        bid_amount: {
            label: "出价", formatHandler: function (e) {
                return t.scientific(t.divide(e.bid_amount, 100, 2))
            }
        },
        clicktraderate: {
            label: "安装率（转化率）", isPercent: true, canSum: true, sumHandler: function (e) {
                var n = "-";
                if (e.tradecount != "-" && e.validclickcount != "-") {
                    n = t.divide(e.tradecount, e.validclickcount, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.clicktraderate, 2)
            }
        },
        activated_count: {
            label: "激活总量", isPercent: false, canSum: true, formatHandler: function (e) {
                return t.scientific(e.activated_count, 0)
            }
        },
        activated_rate: {
            label: "下载激活率", isPercent: true, canSum: true, sumHandler: function (e) {
                var n = "-";
                if (e.activated_count != "-" && e.download != "-") {
                    n = t.divide(e.activated_count, e.download, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.activated_rate, 2)
            }
        },
        click_activated_rate: {
            label: "点击激活率", isPercent: true, canSum: true, sumHandler: function () {
                return "-"
            }, formatHandler: function (e) {
                return t.percent(e.click_activated_rate, 2)
            }
        },
        activated_price: {
            label: "激活均价", isPercent: false, canSum: true, sumHandler: function (e) {
                var n = "-";
                if (e.cost != "-" && e.activated_count != "-") {
                    n = t.divide(e.cost, e.activated_count, 2)
                }
                return n
            }, formatHandler: function (e) {
                return t.scientific(t.divide(e.activated_price, 100, 2))
            }
        },
        cpt: {
            label: "安装（转化）均价", sumHandler: function (e) {
                var n = "-";
                if (e.cost != "-" && e.tradecount != "-") {
                    n = t.divide(e.cost, e.tradecount, 2)
                }
                return n
            }, formatHandler: function (e) {
                return t.scientific(t.divide(e.cpt, 100, 2))
            }
        },
        ordercount: {
            label: "下单量", formatHandler: function (e) {
                return t.scientific(e.ordercount, 0)
            }
        },
        ordertraderate: {
            label: "下单成交率", isPercent: true, sumHandler: function (e) {
                var n = "-";
                if (e.tradecount != "-" && e.ordercount != "-") {
                    n = t.divide(e.tradecount, e.ordercount, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.ordertraderate, 2)
            }
        },
        tradecount: {
            label: "安装量（转化量）", canSum: true, formatHandler: function (e) {
                return t.scientific(e.tradecount, 0)
            }
        },
        turnover: {
            label: "成交额", formatHandler: function (e) {
                return t.scientific(t.divide(e.turnover, 100, 2))
            }
        },
        cost_per_download: {
            label: "下载均价", sumHandler: function (e) {
                var n = "-";
                if (e.cost != "-" && e.download != "-") {
                    n = t.divide(e.cost, e.download, 2)
                }
                return n
            }, formatHandler: function (e) {
                return t.scientific(t.divide(e.cost_per_download, 100, 2))
            }
        },
        frontend_cpa: {label: "转化均价"},
        frontend_cpm: {label: "千次曝光均价"},
        frontend_cvr: {label: "转化率"},
        download: {
            label: "下载量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.download, 0)
            }
        },
        downloadrate: {
            label: "下载率", isPercent: true, canSum: true, sumHandler: function (e) {
                var n = "-";
                if (e.download != "-" && e.validclickcount != "-") {
                    n = t.divide(e.download, e.validclickcount, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.downloadrate, 2)
            }
        },
        yyb_download_rate: {
            label: "下载率", isPercent: true, canSum: true, sumHandler: function (e) {
                var n = "-";
                if (e.download != "-" && e.viewcount != "-") {
                    n = t.divide(e.download, e.viewcount, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.yyb_download_rate, 2)
            }
        },
        normalized_download_rate: {
            label: "归一化下载率", isPercent: true, canSum: false, formatHandler: function (e) {
                return t.percent(e.normalized_download_rate, 2)
            }
        },
        core_pos_ad_exposure: {
            label: "核心广告位曝光量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.core_pos_ad_exposure, 0)
            }
        },
        core_pos_ad_download: {
            label: "核心广告位下载量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.core_pos_ad_download, 0)
            }
        },
        core_pos_ad_download_rate: {
            label: "核心广告位下载率", isPercent: true, canSum: true, sumHandler: function (e) {
                var n = "-";
                if (e.core_pos_ad_download != "-" && e.core_pos_ad_exposure != "-") {
                    n = t.divide(e.core_pos_ad_download, e.core_pos_ad_exposure, 4)
                }
                return n
            }, formatHandler: function (e) {
                return t.percent(e.core_pos_ad_download_rate, 2)
            }
        },
        app_register_count: {
            label: "注册量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.register_count, 0)
            }
        },
        app_add_to_car_count: {
            label: "加入购物车量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.add_to_car_count, 0)
            }
        },
        app_checkout_count: {
            label: "付费行为量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.checkout_count, 0)
            }
        },
        amount_cart: {
            label: "加入购物车金额", isPercent: false, canSum: true, formatHandler: function (e) {
                return t.scientific(t.divide(e.amount_cart, 100, 2))
            }
        },
        amount_paid: {
            label: "付费金额", isPercent: false, canSum: true, formatHandler: function (e) {
                return t.scientific(t.divide(e.amount_paid, 100, 2))
            }
        },
        key_page_view_count: {
            label: "关键页面浏览量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.key_page_view_count, 0)
            }
        },
        register_count: {
            label: "注册量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.register_count, 0)
            }
        },
        add_to_car_count: {
            label: "加入购物车量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.add_to_car_count, 0)
            }
        },
        web_trade_count: {
            label: "下单量（转化量）", canSum: true, formatHandler: function (e) {
                return t.scientific(e.tradecount, 0)
            }
        },
        page_consult: {
            label: "网页咨询量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.page_consult, 0)
            }
        },
        page_phone_call_direct: {
            label: "电话直拨量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.page_phone_call_direct, 0)
            }
        },
        page_phone_call_back: {
            label: "电话回拨量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.page_phone_call_back, 0)
            }
        },
        page_reservation: {
            label: "表单预约量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.page_reservation, 0)
            }
        },
        checkout_count: {
            label: "成交量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.checkout_count, 0)
            }
        },
        followcnt: {
            label: "关注量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.followcnt, 0)
            }
        },
        praisecount: {
            label: "点赞量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.praisecount, 0)
            }
        },
        commentcount: {
            label: "评论量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.commentcount, 0)
            }
        },
        forward_count: {
            label: "转发量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.forward_count, 0)
            }
        },
        read_count: {
            label: "阅读量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.read_count, 0)
            }
        },
        navigation_count: {
            label: "导航量", canSum: true, formatHandler: function (e) {
                return t.scientific(e.navigation_count, 0)
            }
        },
        product_type_name: {label: "标的物类型"}
    };
    e.revertOriginalField = function (e) {
        var t = e || [], n = [], i = "";
        var a = {
            web_trade_count: "tradecount",
            app_register_count: "register_count",
            app_add_to_car_count: "add_to_car_count",
            app_checkout_count: "checkout_count"
        };
        for (var r = 0, o = t.length; r < o; r++) {
            i = t[r];
            if (i && a[i]) {
                i = a[i]
            }
            if ($.inArray(i, n) < 0) {
                n.push(i)
            }
        }
        return n
    };
    e.fieldsNameMapping = {};
    e.percentFields = [];
    e.sumFields = [];
    e.calFields = [];
    e.showHandler = {};
    e.calculHandler = {};
    (function () {
        for (var t in e.fields) {
            var n = e.fields[t];
            e.fieldsNameMapping[t] = n.label;
            n.isPercent && e.percentFields.push(t);
            n.canSum && e.sumFields.push(t);
            n.formatHandler && (e.showHandler[t] = n.formatHandler);
            if (n.sumHandler) {
                e.calFields.push(t);
                e.calculHandler[t] = n.sumHandler
            }
        }
    })();
    e.YYBKA_Fields = ["viewcount", "download"];
    e.YYBKA_Order_Fields = ["viewcount", "download", "yyb_download_rate", "core_pos_ad_exposure", "core_pos_ad_download", "core_pos_ad_download_rate", "normalized_download_rate"];
    e.YYBKA_Order_Producttype_Fields = ["viewcount", "download", "yyb_download_rate", "core_pos_ad_exposure", "core_pos_ad_download", "core_pos_ad_download_rate"];
    e.YYBKA_Producttype_Detail_Fields = ["viewcount", "download", "yyb_download_rate", "core_pos_ad_exposure", "core_pos_ad_download", "core_pos_ad_download_rate"];
    e.YYBKA_Analytic_Fields = ["viewcount", "download", "yyb_download_rate"];
    e.YYBKA_Campaign_Fields = ["viewcount", "download", "yyb_download_rate"];
    e.YYBKA_defaultFields = ["viewcount", "download"];
    e.YYBKA_Order_defaultFields = ["viewcount", "validclickcount"];
    e.commonFields = ["viewcount", "validclickcount", "ctr", "cpc", "tradecount", "clicktraderate", "cpt", "cost"];
    e.commonYYBFields = ["middle_page_view_count", "middle_page_click_count", "middle_page_ctr", "core_pos_ad_exposure", "core_pos_ad_download", "core_pos_ad_download_rate", "normalized_download_rate", "yyb_download_rate"];
    e.appEffectFields = ["download", "downloadrate", "cost_per_download", "activated_count", "activated_rate", "click_activated_rate", "activated_price", "app_register_count", "app_add_to_car_count", "amount_cart", "app_checkout_count", "amount_paid"];
    e.webpageEffectFields = ["key_page_view_count", "register_count", "add_to_car_count", "web_trade_count", "checkout_count", "page_consult", "page_phone_call_direct", "page_phone_call_back", "page_reservation", "navigation_count"];
    e.socialFields = ["followcnt", "praisecount", "commentcount", "forward_count", "read_count"];
    e.getChartFields = function (t) {
        t = t || false;
        var n = [];
        if (i) {
            n = e.YYBKA_Fields;
            if (t) {
                n = e.YYBKA_Order_Fields
            }
        } else {
            n = [].concat(e.commonFields).concat(e.appEffectFields).concat(e.socialFields)
        }
        return n
    };
    e.getChartDefaultFields = function (t) {
        t = t || false;
        if (i) {
            if (t) {
                return e.YYBKA_Order_defaultFields
            }
            return e.YYBKA_defaultFields
        } else {
            return ["viewcount", "ctr"]
        }
    };
    e.tableFields = function () {
        var t = [], n = ["price", "statstime", "daybudget", "bid_amount"], a = [], r = {};
        if (i) {
            a = e.YYBKA_Fields.concat(n).concat(e.YYBKA_Order_Fields);
            for (var o = 0, s = a.length; o < s; o++) {
                (function (e) {
                    var n = a[e] || false;
                    if (n && !r[n]) {
                        t.push(n);
                        r[n] = true
                    }
                })(o)
            }
        } else {
            t = [].concat(e.commonFields).concat(e.appEffectFields);
            t = t.concat(e.socialFields).concat(n)
        }
        return t
    }();
    e.campaignSearchStatusMapArray = [{status: 999, label: "所有未删除"}, {status: 0, label: "所有计划"}, {
        status: 1,
        label: "启用中"
    }, {status: 10, label: "暂停中"}];
    return e
});
define("js/modules/chart", ["require", "jquery", "widget/highcharts", "js/config/env", "js/config/report", "js/modules/common"], function (require) {
    var $ = require("jquery"), e = require("widget/highcharts"), t = require("js/config/env"), n = require("js/config/report"), i = require("js/modules/common"), a = {}, r = {};
    var o = {}, s = null;
    (function () {
        var e = Highcharts.Pointer.prototype.runPointActions;
        Highcharts.Pointer.prototype.runPointActions = function (t) {
            var n = this, i = Math, a = i.max, r = i.min, o = i.abs, s = n.chart, l = s.series, c = s.tooltip, u, d, f = s.hoverPoint, p = s.hoverSeries, m, g, h = s.chartWidth, v = n.getIndex(t), _;
            if (c && n.options.tooltip.shared && !(p && p.noSharedTooltip)) {
                d = [];
                m = l.length;
                for (g = 0; g < m; g++) {
                    if (l[g].visible && l[g].options.enableMouseTracking !== false && !l[g].noSharedTooltip && l[g].tooltipPoints.length) {
                        u = l[g].tooltipPoints[v];
                        if (u.series) {
                            u._dist = o(v - u.clientX);
                            h = r(h, u._dist);
                            d.push(u)
                        }
                    }
                }
                m = d.length;
                while (m--) {
                    if (d[m]._dist > h) {
                        d.splice(m, 1)
                    }
                }
                if (d.length && d[0].clientX !== n.hoverX) {
                    d[0].firePointEvent("mouseOver")
                }
            }
            e.call(this, t)
        }
    })();
    $.extend(a, {
        create: function (e, i) {
            i.showFields = i.showFields || i.showFileds;
            i.xAxisField = i.xAxisField || i.xAxisFiled || "statsdate";
            i = $.extend({
                target: null,
                dataType: "一个位置的多指标图",
                type: "line",
                showFields: null,
                showFieldsOpts: null,
                xAxisField: "statsdate",
                baseField: "",
                title: "",
                subTitle: "",
                pieDesc: "数量",
                fieldNameMap: null,
                colorMap: {},
                colors: null,
                legend: null,
                percentFields: [],
                percentFieldsNeedMultiply100: true,
                startDate: null,
                endDate: null,
                disableLegendForSingleSeries: true,
                yaxisMin: 0,
                extraHighchartsOptions: null,
                pointMouseOver: null,
                dataLabelsEnabled: true,
                markerEnabled: true
            }, i);
            var a = i;
            a.target.get && (a.target = a.target.get(0));
            var r = function (e, t) {
                this.data = e;
                this.options = t;
                this.chart = null
            };
            r.prototype.destroy = function () {
                this.chart.destroy()
            };
            r.prototype.init = function () {
                Highcharts.setOptions({global: {useUTC: false}})
            };
            r.prototype.showFields = function (e, i) {
                var a = [];
                if ($.isArray(e)) {
                    $.each(e, function (e, t) {
                        if ($.inArray(t, a) === -1)a.push(t)
                    });
                    e = a
                }
                var r = null;
                var o = {};
                var s = {};
                var l = this.data, c = this.options, u = c, d = c.type;
                var f = new Date;
                var p = {};

                function m(e, t) {
                    var n;
                    if ($.inArray(e, c.percentFields) > -1) {
                        if (u.percentFieldsNeedMultiply100) {
                            n = parseFloat(t) * 100
                        } else {
                            n = parseFloat(t)
                        }
                    } else {
                        n = parseFloat(t)
                    }
                    if (!(e in p)) {
                        p[e] = true
                    }
                    if (t != 0) {
                        p[e] = false
                    }
                    return n
                }

                function g(e, t, n) {
                    var i = /^[0-9]{4}\-[0-9]{1,2}\-[0-9]{1,2}$/;
                    var a = /^[0-9]{8}$/;
                    var o = /^[0-9]{2}\:[0-9]{2}$/;
                    var s = /^[0-9]{1,2}$/;
                    var l;
                    var n = n || c.startDate;
                    var u, d, p;
                    if (n) {
                        var m = n.replace(/-/g, "/").split("/");
                        u = parseInt(m[0], 10);
                        d = parseInt(m[1], 10) - 1;
                        p = parseInt(m[2], 10)
                    } else {
                        u = f.getFullYear();
                        d = f.getMonth();
                        p = f.getDate()
                    }
                    if (i.test(t)) {
                        r = true;
                        l = Date.parse(t.replace(/-/g, "/"))
                    } else if (a.test(t)) {
                        r = true;
                        l = new Date(parseInt(t.substring(0, 4), 10), parseInt(t.substring(4, 6), 10) - 1, parseInt(t.substring(6, 8), 10)).getTime()
                    } else if (o.test(t)) {
                        var g = t.split(":");
                        r = false;
                        l = new Date(u, d, p, parseInt(g[0], 10), parseInt(g[1], 10)).getTime()
                    } else if (s.test(t)) {
                        r = false;
                        l = new Date(u, d, p, parseInt(t, 10), 0).getTime()
                    } else {
                        throw"can not recognize the date formate: " + t
                    }
                    return l
                }

                if (d == "line") {
                    if (u.dataType == "一个位置的多指标图") {
                        $.each(l.list, function (t, n) {
                            $.each([c.xAxisField].concat(e), function (t, i) {
                                var a = n[i];
                                if (!(i == u.xAxisField || $.inArray(i, e) > -1)) {
                                    return
                                }
                                if (!(i in o)) {
                                    o[i] = []
                                }
                                if (i != u.xAxisField) {
                                    o[i].push(m(i, a))
                                } else {
                                    o[i].push(g(i, a))
                                }
                            })
                        })
                    } else if (u.dataType == "一个位置的多指标对比图") {
                        var h = function (e) {
                            var t = false, n = false, i = "", a = [], r = [];
                            var o = function (e) {
                                var t = e;
                                if (typeof t["ctr"] != "undefined") {
                                    t["ctr"] = t["viewcount"] ? Math.round(t["validclickcount"] / t["viewcount"] * 1e6) : 0;
                                    if (t["ctr"] > 0) {
                                        t["ctr"] = t["ctr"] / 1e4;
                                        t["ctr"] = t["ctr"].toFixed(2)
                                    }
                                }
                                if (typeof t["clicktraderate"] != "undefined") {
                                    t["clicktraderate"] = t["validclickcount"] ? Math.round(t["tradecount"] / t["validclickcount"] * 1e6) : 0;
                                    if (t["clicktraderate"] > 0) {
                                        t["clicktraderate"] = t["clicktraderate"] / 1e4;
                                        t["clicktraderate"] = t["clicktraderate"].toFixed(2)
                                    }
                                }
                                if (typeof t["activated_rate"] != "undefined") {
                                    t["activated_rate"] = t["activated_count"] ? Math.round(t["activated_count"] / t["download"] * 1e6) : 0;
                                    if (t["activated_rate"] > 0) {
                                        t["activated_rate"] = t["activated_rate"] / 1e4;
                                        t["activated_rate"] = t["activated_rate"].toFixed(2)
                                    }
                                }
                                if (typeof t["cpc"] != "undefined") {
                                    t["cpc"] = t["validclickcount"] ? t["cost"] / t["validclickcount"] : 0
                                }
                                if (typeof t["cpt"] != "undefined") {
                                    t["cpt"] = t["tradecount"] ? t["cost"] / t["tradecount"] : 0
                                }
                                if (typeof t["downloadrate"] != "undefined") {
                                    t["downloadrate"] = t["validclickcount"] ? Math.round(t["download"] / t["validclickcount"] * 1e6) : 0;
                                    if (t["downloadrate"] > 0) {
                                        t["downloadrate"] = t["downloadrate"] / 1e4;
                                        t["downloadrate"] = t["downloadrate"].toFixed(2)
                                    }
                                }
                                if (typeof t["yyb_download_rate"] != "undefined") {
                                    t["yyb_download_rate"] = t["viewcount"] ? Math.round(t["download"] / t["viewcount"] * 1e6) : 0;
                                    if (t["yyb_download_rate"] > 0) {
                                        t["yyb_download_rate"] = t["yyb_download_rate"] / 1e4;
                                        t["yyb_download_rate"] = t["yyb_download_rate"].toFixed(2)
                                    }
                                }
                                if (typeof t["cost_per_download"] != "undefined") {
                                    t["cost_per_download"] = t["download"] ? t["cost"] / t["download"] : 0
                                }
                                if (typeof t["activated_price"] != "undefined") {
                                    t["activated_price"] = t["activated_count"] ? t["cost"] / t["activated_count"] : 0
                                }
                                return t
                            };
                            var s = function (e) {
                                var t = {};
                                for (var n = 0, i = e.length; n < i; n++) {
                                    for (var a in e[n]) {
                                        if (typeof t[a] == "undefined") {
                                            t[a] = 0
                                        }
                                        t[a] += Number(e[n][a]) || 0
                                    }
                                }
                                return o(t)
                            };
                            $.each(e, function (e, o) {
                                if (typeof o.sdate != "undefined" && typeof o.edate != "undefined") {
                                    if (o.sdate != o.edate) {
                                        t = true
                                    } else if (o.sdate == o.edate) {
                                        n = true;
                                        i = e;
                                        a = o;
                                        sameData = o.data
                                    }
                                }
                                r[e] = o
                            });
                            if (t && n) {
                                sameData = s(sameData);
                                sameData.statsdate = a.sdate;
                                r[i].data = [sameData];
                                c.xAxisField = "statsdate";
                                return r
                            } else {
                                return e
                            }
                        };
                        l = h(l);
                        $.each(l, function (t, n) {
                            var i = n.data, a = n.sdate;
                            o = {};
                            $.each(i, function (t, n) {
                                $.each([c.xAxisField].concat(e), function (t, i) {
                                    var r = n[i];
                                    if (!(i == u.xAxisField || $.inArray(i, e) > -1)) {
                                        return
                                    }
                                    if (!(i in o)) {
                                        o[i] = []
                                    }
                                    if (i != u.xAxisField) {
                                        o[i].push(m(i, r))
                                    } else {
                                        o[i].push(g(i, r, a))
                                    }
                                })
                            });
                            s[t] = o
                        })
                    } else if (u.dataType == "多个位置的单指标图") {
                        $.each(l, function (e, t) {
                            if ($.inArray(e, i.tids) < 0) {
                                return
                            }
                            var n = t.name;
                            var a = t.data;
                            o = {_name: n, _tid: e, _color: t.color};
                            $.each(a, function (e, t) {
                                $.each([c.xAxisField, i.field], function (e, n) {
                                    var i = t[n];
                                    if (!(n in o)) {
                                        o[n] = []
                                    }
                                    if (n != u.xAxisField) {
                                        o[n].push(m(n, i))
                                    } else {
                                        o[n].push(g(n, i))
                                    }
                                })
                            });
                            s[e] = o
                        })
                    } else if (u.dataType == "多个位置的多指标图") {
                        $.each(l, function (t, n) {
                            if ($.inArray(t, i.tids) < 0) {
                                return
                            }
                            var a = n.name;
                            var r = n.data;
                            o = {_name: a, _tid: t, _color: n.color};
                            $.each(r, function (t, n) {
                                $.each([c.xAxisField].concat(e), function (e, t) {
                                    var i = n[t];
                                    if (!(t in o)) {
                                        o[t] = []
                                    }
                                    if (t != u.xAxisField) {
                                        o[t].push(m(t, i))
                                    } else {
                                        o[t].push(g(t, i))
                                    }
                                })
                            });
                            s[t] = o
                        })
                    }
                } else if (d == "pie") {
                    if (c.showFields.length > 1) {
                        throw"pie chart can only show one field,check showFields option"
                    }
                    $.each(l.list, function (e, t) {
                        var n = c.baseField;
                        var i = c.showFields[0];
                        var a = t[n];
                        var r = parseFloat(t[i]);
                        o[a] = r
                    })
                } else if (d == "column") {
                    $.each(l.list, function (e, t) {
                        var n = c.baseField;
                        var i = c.showFields[0];
                        var a = t[n];
                        var r = parseFloat(t[i]);
                        o[a] = r
                    })
                }
                var v = false;
                $.each(p, function (e, t) {
                    if (t == true) {
                        v = true;
                        return false
                    }
                });
                var _ = [];
                var y = [];
                var b = [];
                var w = 0;
                var A = 24 * 3600 * 1e3;
                var T, E;

                function x(e, n, i, a, r, o, s, l, d) {
                    var f = {};
                    f.name = n;
                    f.data = i;
                    var p = l.length;
                    for (var m = 0; m < p; m++) {
                        f.data[m] = [l[m], f.data[m]]
                    }
                    f.yAxis = a;
                    f.tooltip = {
                        valueSuffix: $.inArray(e, c.percentFields) > -1 ? "%" : null,
                        valueDecimals: $.inArray(e, c.percentFields) > -1 ? 2 : null
                    };
                    f.color = r;
                    E && (f.pointRange = E);
                    o.push(f);
                    !d && s.push({
                        title: {text: t && t.highchartsHideYaxisTitle ? null : f.name},
                        opposite: a != 0,
                        min: u.yaxisMin,
                        minRange: v ? 1 : null,
                        labels: {
                            formatter: function () {
                                if (this.value < 0) {
                                    return null
                                } else {
                                    if ($.inArray(e, c.percentFields) > -1) {
                                        return this.value + " %"
                                    } else {
                                        return this.value
                                    }
                                }
                            }
                        }
                    })
                }

                if (d == "line") {
                    if (u.dataType == "一个位置的多指标图") {
                        if (!o[c.xAxisField]) {
                            throw"IN highchart :no data 没有数据（至少没有X轴数据），请检查"
                        }
                        if (!r) {
                            A = 3600 * 1e3
                        }
                        if (o[c.xAxisField].length > 1) {
                            A = o[c.xAxisField][1] - o[c.xAxisField][0];
                            T = null;
                            E = null
                        } else {
                            A = null;
                            T = 24 * 3600 * 1e3;
                            E = 24 * 3600 * 1e3
                        }
                        var P = null;
                        if (t && t.highchartsLinesColor) {
                            P = t.highchartsLinesColor
                        }
                        if (u.colors) {
                            P = u.colors
                        }
                        w = 0;
                        $.each(o, function (e, t) {
                            if (e == u.xAxisField) {
                                _ = t
                            } else {
                                x(e, u.fieldNameMap ? u.fieldNameMap[e] || e : e, t, w, P && P[w] ? P[w] : null, b, y, o[c.xAxisField]);
                                w += 1
                            }
                        })
                    } else if (u.dataType == "一个位置的多指标对比图") {
                        var C = [], S = 0;
                        var k = 0;
                        $.each(s, function (e, t) {
                            if (t[u.xAxisField].length > k) {
                                k = t[u.xAxisField].length
                            }
                        });
                        $.each(s, function (e, t) {
                            var n = t[u.xAxisField].length, i = {};
                            if (n < k) {
                                $.each(t, function (e, t) {
                                    if (e == u.xAxisField) {
                                        var a = t[1] - t[0] || 1e3 * 60 * 60 * 24;
                                        for (var r = n; r < k; r++) {
                                            t.push(t[r - 1] + a)
                                        }
                                    } else {
                                        for (var r = n; r < k; r++) {
                                            t.push(null)
                                        }
                                    }
                                    i[e] = t
                                });
                                s[e] = i
                            }
                        });
                        $.each(s, function (e, n) {
                            if (!n[c.xAxisField]) {
                                throw"IN highchart :no data 没有数据（至少没有X轴数据），请检查"
                            }
                            if (!r) {
                                A = 3600 * 1e3
                            }
                            if (n[c.xAxisField].length > 1) {
                                A = n[c.xAxisField][1] - n[c.xAxisField][0];
                                T = null;
                                E = null
                            } else {
                                A = null;
                                T = 24 * 3600 * 1e3;
                                E = 24 * 3600 * 1e3
                            }
                            var i = null;
                            if (t && t.highchartsLinesColor) {
                                i = t.highchartsLinesColor
                            }
                            if (u.colors) {
                                i = u.colors
                            }
                            w = 0;
                            $.each(n, function (t, a) {
                                var r = "", o = "", s = "";
                                if (typeof l[e].sdate != "undefined" && typeof l[e].edate != "undefined") {
                                    o = l[e].sdate;
                                    s = l[e].edate;
                                    if (o == s) {
                                        r = o + " " + (u.fieldNameMap ? u.fieldNameMap[t] || t : t)
                                    } else {
                                        r = o + "至" + s + " " + (u.fieldNameMap ? u.fieldNameMap[t] || t : t)
                                    }
                                } else {
                                    r = u.fieldNameMap ? u.fieldNameMap[t] || t : t
                                }
                                if (t == u.xAxisField) {
                                    _ = a;
                                    C.push(_)
                                } else {
                                    x(t, r, a, w, i && i[S] ? i[S] : null, b, y, n[c.xAxisField]);
                                    w += 1;
                                    S += 1
                                }
                            })
                        })
                    } else if (u.dataType == "多个位置的单指标图") {
                        var I = false;
                        w = 0;
                        $.each(s, function (e, t) {
                            $.each(t, function (e, n) {
                                if (e.charAt(0) == "_") {
                                    return
                                } else if (e == u.xAxisField) {
                                    _ = n;
                                    if (n.length > 1) {
                                        A = n[1] - n[0];
                                        T = null;
                                        E = null
                                    } else {
                                        A = null;
                                        T = 24 * 3600 * 1e3;
                                        E = 24 * 3600 * 1e3
                                    }
                                } else {
                                    x(e, "" + t._name + "-" + (u.fieldNameMap ? u.fieldNameMap[e] || e : e), n, 0, t._color || null, b, y, o[c.xAxisField], I);
                                    if (!I) {
                                        I = true
                                    }
                                    w += 1
                                }
                            })
                        })
                    } else if (u.dataType == "多个位置的多指标图") {
                        var I = false, N = u.showFields || [""], j = 0;
                        w = 0;
                        $.each(s, function (e, t) {
                            j = 0;
                            $.each(t, function (e, n) {
                                if (e.charAt(0) == "_") {
                                    return
                                } else if (e == u.xAxisField) {
                                    _ = n;
                                    if (n.length > 1) {
                                        A = n[1] - n[0];
                                        T = null;
                                        E = null
                                    } else {
                                        A = null;
                                        T = 24 * 3600 * 1e3;
                                        E = 24 * 3600 * 1e3
                                    }
                                } else {
                                    x(e, "" + t._name + "-" + (u.fieldNameMap ? u.fieldNameMap[e] || e : e), n, j, t._color || null, b, y, o[c.xAxisField], I);
                                    w += 1;
                                    j += 1;
                                    if (!I && j >= N.length) {
                                        I = true
                                    }
                                }
                            })
                        })
                    }
                } else if (d == "pie") {
                    b = [{type: "pie", name: c.pieDesc, data: []}];
                    $.each(o, function (e, t) {
                        var n = {};
                        n.type = "pie";
                        n.name = u.fieldNameMap ? u.fieldNameMap[e] || e : e;
                        n.y = t;
                        c.colorMap[e] && (n.color = c.colorMap[e]);
                        b[0].data.push(n)
                    })
                } else if (d == "column") {
                    b = [{type: "column", data: []}];
                    $.each(o, function (e, t) {
                        var n = {};
                        n.type = "column";
                        n.name = u.fieldNameMap ? u.fieldNameMap[e] || e : e;
                        _.push(u.fieldNameMap ? u.fieldNameMap[e] || e : e);
                        if (typeof u.fieldFormat === "function") {
                            n.y = u.fieldFormat(t)
                        } else {
                            n.y = t
                        }
                        if (c.colorMap[e]) {
                            n.color = c.colorMap[e]
                        }
                        b[0].data.push(n)
                    })
                }
                if (d == "line") {
                    if (u.dataType == "一个位置的多指标对比图") {
                        var O = [], L = parseInt(b.length / C.length) || 1;
                        for (var F = 0, D = C.length; F < D; F++) {
                            if ((F + 2) % 2 == 0) {
                                O.push({
                                    type: "datetime",
                                    minRange: T,
                                    dateTimeLabelFormats: {
                                        millisecond: "%Y-%m-%d",
                                        second: "%Y-%m-%d",
                                        minute: "%Y-%m-%d",
                                        hour: "%H:%M",
                                        day: "%m-%d",
                                        week: "%m-%d",
                                        month: "%Y-%m-%d",
                                        year: "%Y-%m-%d"
                                    },
                                    labels: {
                                        formatter: function () {
                                            var e = Highcharts.dateFormat(this.dateTimeLabelFormat, this.value);
                                            if (r && e.indexOf(":") > -1) {
                                                return null
                                            } else {
                                                return e
                                            }
                                        }
                                    }
                                })
                            } else {
                                O.push({
                                    type: "datetime",
                                    minRange: T,
                                    dateTimeLabelFormats: {
                                        millisecond: "%Y-%m-%d",
                                        second: "%Y-%m-%d",
                                        minute: "%Y-%m-%d",
                                        hour: "%H:%M",
                                        day: "%m-%d",
                                        week: "%m-%d",
                                        month: "%Y-%m-%d",
                                        year: "%Y-%m-%d"
                                    },
                                    lineWidth: 0,
                                    tickWidth: 0,
                                    labels: {
                                        enabled: false, formatter: function () {
                                            var e = Highcharts.dateFormat(this.dateTimeLabelFormat, this.value);
                                            if (r && e.indexOf(":") > -1) {
                                                return null
                                            } else {
                                                return e
                                            }
                                        }
                                    }
                                })
                            }
                        }
                        for (var F = 0, D = b.length; F < D; F++) {
                            b[F].xAxis = parseInt(F / L)
                        }
                        function R(e) {
                            var t = [], n = true;
                            for (var i = 0, a = e.length; i < a; i++) {
                                if (i + L < a && e[i].name != e[i + L].name) {
                                    n = false;
                                    break
                                }
                            }
                            if (n) {
                                for (var i = 0; i < L; i++) {
                                    t.push(e[i])
                                }
                                return t
                            } else {
                                return e
                            }
                        }

                        b = R(b);
                        var M = function () {
                            var e = n.fieldsNameMapping, t = {};
                            for (var i in e) {
                                t[e[i]] = i
                            }
                            return t
                        }();
                        var q = {
                            chart: {type: "line", renderTo: u.target, marginBottom: 60},
                            title: {text: u.title},
                            subtitle: {text: u.subTitle},
                            xAxis: O,
                            yAxis: y.length > 2 ? y.splice(0, 2) : y,
                            tooltip: {
                                dateTimeLabelFormats: {
                                    millisecond: "%Y-%m-%d",
                                    second: "%Y-%m-%d",
                                    minute: "%Y-%m-%d",
                                    hour: "%Y-%m-%d %H:%M",
                                    day: "%Y-%m-%d",
                                    week: "%Y-%m-%d",
                                    month: "%Y-%m-%d",
                                    year: "%Y-%m-%d"
                                },
                                style: {fontSize: "12px", padding: "8px"},
                                shared: true,
                                crosshairs: true,
                                useHTML: true,
                                formatter: function (e) {
                                    var t = this.points, n = 0, i = "", a = false, o = 0, s = "", l = "", u = [];
                                    for (var d = 0, f = t.length; d < f; d++) {
                                        if (typeof t[d].point.y == "undefined") {
                                            continue
                                        }
                                        if (d - L >= 0 && t[d].key == t[d - L].key && typeof t[d].point.y != "undefined" && typeof t[d - L].point.y != "undefined") {
                                            continue
                                        }
                                        u = t[d].series.name.split(" ");
                                        l = u[u.length - 1];
                                        s = M[l] || "";
                                        if (s == "viewcount" || s == "validclickcount" || s == "download" || s == "followcnt" || s == "tradecount" || s == "activated_count") {
                                            o = 0
                                        } else {
                                            o = 2
                                        }
                                        if ($.inArray(s, c.percentFields) > -1) {
                                            a = true
                                        } else {
                                            a = false
                                        }
                                        if (d == 0 || d % L == 0) {
                                            if (r) {
                                                i += "<small>" + Highcharts.dateFormat("%Y-%m-%d", t[d].key) + "</small><table>"
                                            } else {
                                                i += "<small>" + Highcharts.dateFormat("%Y-%m-%d %H:%M", t[d].key) + "</small><table>"
                                            }
                                        }
                                        i += '<tr><td style="color: ' + t[d].series.color + '">' + l + ": </td><td><b>" + (a ? t[d].point.y + "%" : Highcharts.numberFormat(t[d].point.y, o)) + "</b></td></tr>";
                                        if ((d + 1) % L == 0) {
                                            i += "</table>"
                                        }
                                    }
                                    return i
                                }
                            },
                            legend: u.legend || {
                                align: "center",
                                verticalAlign: "bottom",
                                x: 10,
                                y: 15,
                                floating: true,
                                width: 580,
                                itemWidth: 290,
                                borderWidth: 0,
                                enabled: true
                            },
                            series: b,
                            credits: {enabled: false},
                            plotOptions: {
                                line: {
                                    events: {
                                        legendItemClick: function (e) {
                                            if (w < 2) {
                                                return false
                                            } else {
                                                return true
                                            }
                                        }
                                    }, marker: {enabled: u.markerEnabled}
                                }, series: {point: {events: {mouseOver: u.pointMouseOver || null}}}
                            }
                        };
                        q = $.extend(true, q, u.extraHighchartsOptions);
                        this.chart = new Highcharts.Chart(q)
                    } else {
                        var q = {
                            chart: {type: "line", renderTo: u.target, marginBottom: 25},
                            title: {text: u.title},
                            subtitle: {text: u.subTitle},
                            xAxis: {
                                type: "datetime",
                                minRange: T,
                                dateTimeLabelFormats: {
                                    millisecond: "%Y-%m-%d",
                                    second: "%Y-%m-%d",
                                    minute: "%Y-%m-%d",
                                    hour: "%H:%M",
                                    day: "%m-%d",
                                    week: "%m-%d",
                                    month: "%Y-%m-%d",
                                    year: "%Y-%m-%d"
                                },
                                labels: {
                                    formatter: function () {
                                        if ($.inArray(this.value, o[c.xAxisField]) > -1) {
                                            return Highcharts.dateFormat(this.dateTimeLabelFormat, this.value)
                                        } else {
                                            return null
                                        }
                                    }
                                }
                            },
                            yAxis: y,
                            tooltip: {
                                dateTimeLabelFormats: {
                                    millisecond: "%Y-%m-%d",
                                    second: "%Y-%m-%d",
                                    minute: "%Y-%m-%d",
                                    hour: "%Y-%m-%d %H:%M",
                                    day: "%Y-%m-%d",
                                    week: "%Y-%m-%d",
                                    month: "%Y-%m-%d",
                                    year: "%Y-%m-%d"
                                }, style: {fontSize: "12px", padding: "8px"}
                            },
                            legend: u.legend || {
                                align: "right",
                                verticalAlign: "top",
                                layout: "vertical",
                                x: -40,
                                y: 10,
                                floating: true,
                                enabled: u.disableLegendForSingleSeries && e.length == 1 ? false : true
                            },
                            series: b,
                            credits: {enabled: false},
                            plotOptions: {
                                line: {
                                    events: {
                                        legendItemClick: function (e) {
                                            if (w < 2) {
                                                return false
                                            } else {
                                                return true
                                            }
                                        }
                                    }, marker: {enabled: u.markerEnabled}
                                }, series: {point: {events: {mouseOver: u.pointMouseOver || null}}}
                            }
                        };
                        q = $.extend(true, q, u.extraHighchartsOptions);
                        this.chart = new Highcharts.Chart(q)
                    }
                } else if (d == "column") {
                    var q = {
                        chart: {type: "column", renderTo: u.target},
                        credits: {enabled: false},
                        plotOptions: {
                            series: {
                                shadow: false,
                                borderWidth: 3,
                                dataLabels: {
                                    enabled: u.dataLabelsEnabled, formatter: function () {
                                        return "<b>" + this.y.toFixed(2) + "%</b>"
                                    }
                                }
                            }
                        },
                        title: {text: u.title},
                        tooltip: {pointFormat: "<b>{point.y}" + u.suffix + "</b>", percentageDecimals: 1},
                        xAxis: {categories: _},
                        yAxis: {title: {text: ""}},
                        legend: {enabled: false},
                        series: b
                    };
                    q = $.extend(true, q, u.extraHighchartsOptions);
                    this.chart = new Highcharts.Chart(q)
                } else if (d == "pie") {
                    var q = {
                        chart: {type: "pie", renderTo: u.target},
                        title: {text: u.title},
                        tooltip: {
                            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.y}</b>，占比：<b>{point.percentage:.2f}%</b>',
                            percentageDecimals: 1
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: "pointer",
                                shadow: true,
                                borderWidth: 3,
                                dataLabels: {
                                    enabled: false,
                                    color: "#000000",
                                    connectorColor: "#000000",
                                    format: "<b>{point.name}</b>: {point.percentage:.1f} %"
                                },
                                showInLegend: true,
                                point: {
                                    events: {
                                        legendItemClick: function (e) {
                                            return false
                                        }
                                    }
                                }
                            }
                        },
                        series: b,
                        credits: {enabled: false}
                    };
                    q = $.extend(true, q, u.extraHighchartsOptions);
                    this.chart = new Highcharts.Chart(q)
                }
            };
            var o = new r(e, i);
            o.init();
            o.showFields(i.showFields, i.showFieldsOpts);
            return o
        }
    });
    $.extend(r, {
        swfPath: "/qzone/biz/gdt/castcomm/chart.swf", get: function (e) {
            return o[e || s]
        }, insertTo: function (e, t) {
            var n = e, i, a, r, l, c;
            if (typeof e === "string") {
                n = $(e)
            }
            if (n.nodeType !== 1) {
                return false
            }
            t = t || {};
            do {
                i = Math.ceil(Math.random() * 100)
            } while (typeof o[i] !== "undefined");
            l = t.width || "100%";
            c = t.height || "350";
            n.innerHTML = QZFL.media.getFlashHtml({
                src: a.swfPath,
                width: l,
                height: c,
                allowScriptAccess: "always",
                allowFullScreen: "false",
                flashVars: "loadType=js&readyCallBack=noCallBack",
                quality: "high",
                bgcolor: t.bgcolor || "#ffffff",
                scaleMode: "noScale",
                id: "_GDT_CHART" + i,
                name: "_GDT_CHART" + i,
                wmode: "opaque"
            });
            a = $("_GDT_CHART" + i);
            o[i] = a;
            s = i;
            return a
        }, loadJsonData: function (e, t) {
            t = t || t.get();
            if (t && t.loadJsonObject) {
                try {
                    t.loadJsonObject(e)
                } catch (n) {
                    i.showMsgbox("Flash图表加载数据出错")
                }
            } else {
                var a = arguments, r = a.callee, o;
                o = setInterval(function () {
                    if (t && t.loadJsonObject) {
                        clearInterval(o);
                        r.apply(t, Array.prototype.slice.call(a))
                    }
                }, 200)
            }
        }
    });
    return {highchart: a, chart: r}
});
define("js/modules/ageRangeCommon", ["require", "jquery", "js/config/comm"], function (require) {
    var $ = require("jquery"), e = require("js/config/comm");
    var t = e.ENV;
    var n = t.AGE_BINARY_STRING_STATIC_LENGTH, i = t.AGE_MAX, a = t.AGE_MIN, r = {};
    r.originalBinaryString_To_multiRange = function (e) {
        if (!e) {
            return null
        }
        var t = e;
        var i = e.length, a;
        for (a = i; a < n; a++) {
            t += "0"
        }
        var r = [];
        var o = [];
        var s = false;
        for (a = 0; a < n; a++) {
            if (t.charAt(a) === "1" && !s) {
                s = true;
                o.push(a)
            } else if (t.charAt(a) === "0" && s) {
                s = false;
                o.push(a - 1);
                r.push(o);
                o = []
            }
        }
        if (s) {
            s = false;
            o.push(n - 1);
            r.push(o);
            o = []
        }
        return r
    };
    r.multiRange_To_originalBinaryString = function (e) {
        if (!e) {
            return null
        }
        e = e || [];
        var t = [], r, o, s;
        var l = e.length;
        for (r = 0; r < n; r++) {
            t[r] = "0"
        }
        for (r = 0; r < l; r++) {
            s = e[r];
            for (o = s[0]; o <= s[1]; o++) {
                var c = o;
                o >= a && o <= i && (t[c] = "1")
            }
        }
        return t.join("")
    };
    r.getAgeStringForRead = function (e) {
        if (typeof e == "string") {
            return r.getAgeStringForRead(r.originalBinaryString_To_multiRange(e))
        }
        if (!e) {
            return null
        }
        var t = e.length, n, o = [];
        for (n = 0; n < t; n++) {
            var s = e[n];
            if (s[0] <= a && s[1] >= i) {
                return null
            } else if (s[0] <= a) {
                o.push(s[1] + "岁及以下")
            } else if (s[1] >= i) {
                o.push(s[0] + "岁及以上")
            } else {
                if (s[0] === s[1]) {
                    o.push(s[0] + "岁")
                } else {
                    o.push(s[0] + "岁到" + s[1] + "岁")
                }
            }
        }
        return o.join(" 和 ")
    };
    return r
});
define("js/modules/helper", ["require", "jquery", "js/config/comm", "js/modules/account", "js/modules/ageRangeCommon"], function (require) {
    var $ = require("jquery"), e = require("js/config/comm"), t = require("js/modules/account"), n = require("js/modules/ageRangeCommon"), i = {};

    function a(e) {
        var t = 0, n;
        for (n in e) {
            if (e.hasOwnProperty(n))t++
        }
        return t
    }

    i = {
        getShowText: function (e, t) {
            var e, n = [];
            e = $.isArray(e) ? e : !$.isPlainObject(e) && isNaN(e) ? (e || "").split(",") : parseInt(e, 10);
            if (t) {
                if ($.isPlainObject(t) && !isNaN(e)) {
                    e += "";
                    n.push(t[e])
                } else if ($.isArray(t) && !isNaN(e)) {
                    var i = e.toString(2).split("").reverse();
                    $.each(i, function (e, i) {
                        if (parseInt(i, 10)) {
                            n.push(t[e])
                        }
                    })
                } else {
                    $.isArray(e) && $.each(e, function (e, i) {
                        t[i] && n.push(t[i])
                    })
                }
            }
            return n.join(",")
        }, getAgesegStr: function (t) {
            if (t.age_origin) {
                return n.getAgeStringForRead(t.age_origin)
            }
            var i = parseInt(t.ageStart, 10), a = parseInt(t.ageEnd, 10), r = "";
            if (i == e.ENV.AGELOWBOUND && a == e.ENV.AGEHIGHTBOUND) {
                r = ""
            } else if (i == e.ENV.AGELOWBOUND) {
                r = a + "岁以下"
            } else if (a == e.ENV.AGEHIGHTBOUND) {
                r = i + "岁以上"
            } else if (i == a) {
                r = i + "岁"
            } else {
                r = i + "岁至" + a + "岁"
            }
            return r
        }, getMobilepriceStrList: function (t) {
            if (!t) {
                return false
            }
            var n = [];
            if (!$.isArray(t)) {
                t = t.split(",")
            }
            $.each(t, function (t, i) {
                n.push(e.ENV.mobileprice[parseInt(i, 10) - 1])
            });
            return n
        }, getOrderTargetStr: function (r, o, s) {
            var l = {}, c, u, d = r;
            $.each(d, function (t, n) {
                l[t + "str"] = i.getShowText(n, e.ENV[t] || e.confTargeting[t])
            });
            l.professionstr = d.professionstr;
            if (!l.professionstr) {
                d.profession = ""
            }
            u = [];
            d.area && $.each(d.area, function (e, t) {
                var n = QBL.AreaSelector && QBL.AreaSelector.getNameById(t);
                n && u.push(n.replace(/[A-Z\s]/, ""))
            });
            l.areastr = u.join(",");
            var f = ["gender", "scene"];
            if (d.age_origin) {
                var p = n.getAgeStringForRead(d.age_origin);
                p && (l.age_originstr = p);
                f.push("age_origin")
            } else {
                d.ageseg && (l.agesegstr = i.getAgesegStr({ageStart: d.ageseg[0], ageEnd: d.ageseg[1]}));
                f.push("ageseg")
            }
            l.genderstr = l.genderstr || "";
            l.genderstr = l.genderstr == e.ENV.gender[0] ? "" : l.genderstr;
            if (o) {
                o(d, l)
            }
            function m(e) {
                var t = [];
                $.each(e, function (e, n) {
                    if (d[n] && l[n + "str"]) {
                        t.push(l[n + "str"])
                    }
                });
                return t
            }

            var g = "";
            u = m(f);
            if (u.length > 0) {
                g = "<li>" + u.join(" ; ") + " 的用户</li>"
            }
            if (l.areastr) {
                g += "<li>在 " + l["areastr"] + " 地区的用户</li>"
            }
            if (d.imgroup && d.imgroup.length > 0) {
                g += "<li>指定群分类的用户</li>"
            }
            if (!J.isEmptyObject(d.lbsdetail)) {
                var h = [];
                $.each(d.lbsdetail, function (e, t) {
                    h.push(t.name)
                });
                g += "<li>在LBS定向 " + h.join("、") + " 区域中的用户</li>"
            } else if (d.locationdetail && $.type(d.locationdetail) == "object" && a(d.locationdetail) > 0) {
                var v = [];
                $.each(d.locationdetail, function (e, t) {
                    v.push(t.name)
                });
                g += "<li>在LBS定向 " + v.join("、") + " 区域中的用户</li>"
            }
            if (l.appuserstr) {
                g += "<li> " + l.appuserstr + "</li>"
            }
            if (d.appaction_object_type > 0) {
                g += "<li>指定APP行为定向的用户</li>"
            }
            c = [];
            u = m(["education"]);
            if (u.length > 0) {
                c.push(u.join(";") + " 学历")
            }
            if (c.length > 0) {
                g += "<li>" + c.join(" ; ") + " 的用户</li>"
            }
            u = m(["payment", "fans"]);
            if (u.length > 0) {
                g += "<li>" + u.join(" ; ") + " 的用户</li>"
            }
            u = m(["userstatus"]);
            if (u.length > 0) {
                g += "<li>处于 " + u.join(" ; ") + "  的状态</li>"
            }
            u = m(["living_status"]);
            if (u.length > 0) {
                g += "<li>" + u.join(" ; ") + "  的用户</li>"
            }
            u = i.getMobilepriceStrList(d.mobileprice);
            if (u && u.length > 0) {
                g += "<li>设备价格为 " + u.join(" ; ") + "  的用户</li>"
            }
            u = m(["os"]);
            if (u.length > 0) {
                g += "<li>移动终端系统为 " + u.join(" ; ") + "  的用户</li>"
            }
            u = m(["isp"]);
            if (u.length > 0) {
                g += "<li>移动运营商为 " + u.join(" ; ") + "  的用户</li>"
            }
            u = m(["connectiontype"]);
            if (u.length > 0) {
                g += "<li>联网方式为 " + u.join(" ; ") + "  的用户</li>"
            }
            if (d.rruleidlist && d.rruleidlist.length > 0 && (d.visittype || d.enable_remarketing)) {
                var _ = e.ENV.visittype[d.visittype || d.enable_remarketing] || "";
                _ && (_ = "(" + _ + ")", g += "<li>访客定向为" + _ + "</li>")
            }
            if (d.numberpackage && d.numberpackage.length > 0) {
                typeof d.numberpackage === "string" && (d.numberpackage = d.numberpackage.split(","));
                g += "<li>使用了" + d.numberpackage.length + "个自定义人群</li>"
            }
            if (d.dmp && d.dmp.length > 0) {
                typeof d.dmp === "string" && (d.dmp = d.dmp.split(","));
                g += "<li>使用了" + d.dmp.length + "个DMP人群</li>"
            }
            if (d.shoppinginterest && d.shoppinginterest.length > 0) {
                typeof d.shoppinginterest === "string" && (d.shoppinginterest = d.shoppinginterest.split(","));
                g += "<li>使用了" + d.shoppinginterest.length + "个用户购物兴趣</li>"
            }
            if (d.businessinterest && d.businessinterest.length > 0) {
                typeof d.businessinterest === "string" && (d.businessinterest = d.businessinterest.split(","));
                g += "<li>使用了" + d.businessinterest.length + "个用户商业兴趣</li>"
            }
            if (d.wechatflowclass && d.wechatflowclass.length > 0) {
                typeof d.wechatflowclass === "string" && (d.wechatflowclass = d.wechatflowclass.split(","));
                g += "<li>使用了" + d.wechatflowclass.length + "个流量分类</li>"
            }
            if (d.keyword && d.keyword.length > 0) {
                typeof d.keyword === "string" && (d.keyword = d.keyword.split(","));
                g += "<li>使用了" + d.keyword.length + "个关键词</li>"
            }
            u = m(["dressindex"]);
            if (u.length > 0) {
                g += "<li>穿衣指数为 " + u.join(" ; ") + "</li>"
            }
            u = m(["uvindex"]);
            if (u.length > 0) {
                g += "<li>紫外线指数为 " + u.join(" ; ") + "</li>"
            }
            u = m(["makeupindex"]);
            if (u.length > 0) {
                g += "<li>化妆指数为 " + u.join(" ; ") + "</li>"
            }
            u = m(["climate"]);
            if (u.length > 0) {
                g += "<li>气象为 " + u.join(" ; ") + "</li>"
            }
            if (d.temperature && a(d.temperature) > 0) {
                var y = (d.temperature + "").split(/[~,]/);
                y[0] && (y[0] = y[0] - 273);
                y[1] && (y[1] = y[1] - 273);
                g += "<li>温度为 " + y.join("~") + " °C </li>"
            }
            if (d.resident_community_price && a(d.resident_community_price) > 0) {
                var b = (d.resident_community_price + "").split(/[~,]/);
                g += "<li>居住社区价格为 " + b.join("~") + "元/平方米</li>"
            }
            if (d.player_consupt && a(d.player_consupt) > 0) {
                var w = (d.player_consupt + "").split(/[~,]/);
                g += "<li>游戏消费能力为 " + w.join("~") + "元/月</li>"
            }
            if (t.isConsumption() || t.isLowConsumption()) {
                u = m(["consumption_ability"]);
                if (u.length > 0) {
                    g += "<li>处于 " + u.join(" ; ") + "  的状态</li>"
                }
            }
            return g ? g : s.linktype == e.confLinkType.APP_TASK || s.linktype == e.confLinkType.MOB_TASK ? "-" : "<li>全量用户</li>"
        }
    };
    return i
});
define("js/modules/timeutil", ["require", "jquery"], function (require) {
    var $ = require("jquery"), e = $.each;
    var t = {
        makeFullTimeStr: function () {
            return new Array(336 + 1).join("1")
        }, timeArrToReadable: function (e) {
            var t = [], n, i;
            var a = ["星期一", "星期二", "星期三", "星期四", "星期五", "星期六", "星期日"];
            if (!e || !e.length) {
                e = [];
                for (n = 0, i = 7; n < i; n++) {
                    e.push([])
                }
            }
            for (n = 0; n < e.length; n++) {
                var r = [];
                var o = e[n];
                if (o.length > 0) {
                    for (var s = 0; s < o.length; s++) {
                        var l = o[s];
                        var c = parseInt(l.start, 10);
                        var u = parseInt(l.end, 10);
                        r.push("<span>" + c + (l.start > c ? ":30" : ":00") + "-" + u + (l.end > u ? ":30" : ":00") + "</span>");
                        if (s < o.length - 1) {
                            r.push(", ")
                        }
                    }
                }
                if (r.length > 0) {
                    t.push(a[n] + ":" + r.join(""))
                }
            }
            return t
        }, timeStrToArr: function (e) {
            e = e ? e : "";
            var t = 0, n = 0, i, a, r;
            var o = [];
            for (a = 0, r = 7; a < r; a++) {
                o.push([])
            }
            var s = function (e, t) {
                e = (e - 1) % 48 / 2;
                t = ((t - 1) % 48 + 1) / 2;
                var n = {start: e, end: t};
                return n
            };
            for (a = 0, r = e.length; a < r; a++) {
                var l = e.slice(a, a + 1);
                if (l == 1 && t == 0) {
                    t = n = a + 1;
                    continue
                }
                if (l == 1 && t != 0) {
                    n = a + 1
                }
                if (l == 0 && t != 0 || a == r - 1 && t != 0 || (a + 1) % 48 == 0 && t != 0) {
                    i = parseInt((t - 1) / 48, 10);
                    o[i].push(s(t, n));
                    t = 0;
                    n = 0;
                    continue
                }
            }
            if (t != 0) {
                i = parseInt((t - 1) / 48, 10);
                o[i].push(s(t, n))
            }
            return o
        }, timeArrToBitStr: function (e) {
            e = e ? e : [];
            var t = 0, n;
            var i = {};
            for (n = 0; n < e.length; n++) {
                var a = e[n];
                if (a.length > 0) {
                    for (var r = 0; r < a.length; r++) {
                        var o = a[r];
                        var s = o.start;
                        var l = o.end;
                        s *= 2;
                        l *= 2;
                        for (var c = s; c < l; c++) {
                            i[t + c + 1] = 1
                        }
                    }
                }
                t += 48
            }
            var u = "";
            for (n = 0; n < 336; n++) {
                var d = i[n + 1] ? "1" : "0";
                u += d
            }
            u = u.replace(/0*$/, "");
            return u
        }, timeArrSelColumn: function (t) {
            var n = true, i;
            n = n && t.length == 7;
            if (n) {
                e(t, function (e, t) {
                    t = t.substring(t.indexOf(":") + 1);
                    if (e == 0) {
                        i = t;
                        n = n && !/:30/.test(i)
                    } else {
                        n = n && i == t
                    }
                    return n
                })
            }
            i && i.split(",").length >= 2 && (n = false);
            if (n) {
                n = i.match(/\d+:\d+/g)
            }
            return n
        }, getTimeReadArr: function (e) {
            var n = t.timeArrToReadable(e), i = false, a;
            i = t.timeArrSelColumn(n);
            if (i) {
                a = n[0];
                n = [a.substring(a.indexOf(":") + 1)]
            }
            return n
        }, setFlashTimeData: function (e, n) {
            var i = document.getElementById(e);
            if (i && i.loadData) {
                window._dateRangeCallBack(n);
                i.loadData(n)
            } else {
                setTimeout(function () {
                    t.setFlashTimeData(e, n)
                }, 50)
            }
        }
    };
    return t
});
define("js/modules/helpbar", ["require", "jquery", "js/modules/common", "js/modules/atlasdomflag"], function (require) {
    var $ = require("jquery"), e = require("js/modules/common"), t = require("js/modules/atlasdomflag"), n = "hiddenNewHelpIcon";

    function i() {
        var t = $("#js_gdtWXQrcode"), n = "ATLAS-2000";
        e.getWXQrcode(t, n)
    }

    function a() {
        var a = $("#gHelpWrap"), r = a.find(".inner").eq(0), o = a.find(".new-more");
        i();
        r.addClass("current");
        e.localStorage.setItem(n, true);
        o.addClass("none");
        t.remove("newmore")
    }

    function r() {
        var e = $("#gHelpWrap"), t = e.find(".inner").eq(0);
        t.removeClass("current")
    }

    var o = function () {
        var o = $("#gHelpWrap"), s = o.find(".inner").eq(0), l = $("#showHelplist"), c = o.find(".new-more");
        l.on("click", function (e) {
            if (s.hasClass("current")) {
                r()
            } else {
                a()
            }
        });
        o.on("click", "#js_gdtWXQrcode", i);
        o.on("click", ".closepop", function () {
            r()
        });
        $(document.body).on("click", function (e) {
            var t = e.target;
            if ($(t).parents("#gHelpWrap").length === 0) {
                r()
            }
        });
        if (!e.localStorage.getItem(n)) {
            c.removeClass("none");
            t.set("newmore")
        }
    };
    return {init: o}
});
define("js/modules/form", ["require", "jquery"], function (require) {
    var e = {}, $ = require("jquery");

    function t(e) {
        var t;
        t = e ? function (t) {
            return $(t, e)
        } : $;
        return t
    }

    e.setFieldValue = function (t, n, i) {
        var a, r;
        $.each(t, function (t, o) {
            a = o;
            if ($.isArray(o)) {
                a = typeof o[1] == "undefined" ? o[0] : o[1]
            }
            r = n[a];
            e.setVal(o, r, i)
        })
    };
    e.setVal = function (i, a, r) {
        var o, s, l, c = t(r);
        if ($.isArray(i)) {
            l = typeof a != "undefined" ? a : "";
            c("#" + i[0]).val(l)
        } else {
            o = c("#" + i);
            if (o.size() < 1) {
                o = c("[name=" + i + "]")
            }
            s = o.attr("type");
            l = typeof a != "undefined" ? a : "";
            if (n[i]) {
                var u = e.datadeal[n[i]];
                if (u) {
                    l = u.disbuild(l)
                }
            }
            if (s == "radio") {
                c("[name=" + i + "][value=" + l + "]").prop("checked", "checked")
            } else if (s == "checkbox") {
                var d = {};
                if ($.isArray(l)) {
                    $.each(l, function (e, t) {
                        d[t + ""] = 1
                    })
                } else {
                    d[l + ""] = 1
                }
                c("[name=" + i + "]").each(function (e, t) {
                    var n = c(t), i = t.value;
                    var a = !!d[i + ""];
                    n.prop("checked", a)
                })
            } else {
                o.each(function (e, t) {
                    if (t.tagName.toUpperCase() === "SELECT") {
                        $(t).val(l)
                    } else {
                        o.val(l)
                    }
                })
            }
        }
    };
    var n = {};
    e.setFieldBuilder = function (t, i) {
        if (e.datadeal[i]) {
            n[t] = i
        }
    };
    e.datadeal = {
        binary_plus: {
            build: function (e) {
                var t = 0;
                $.each(e, function (e, n) {
                    t += parseInt(n, 10)
                });
                return t
            }, disbuild: function (e) {
                var t = [];
                var n = e.toString(2).split("").reverse();
                $.each(n, function (e, n) {
                    if (parseInt(n, 10)) {
                        t.push(1 << e)
                    }
                });
                return t
            }
        }, array: {
            build: function (e) {
                return e.join(",")
            }, disbuild: function (e) {
                return e.split(",")
            }
        }
    };
    e.clearFieldValue = function (e, n) {
        var i = t(n);
        $.each(e, function (e, t) {
            i("#" + t).val("")
        })
    };
    e.setFieldsAttr = function (e, n, i, a) {
        var r = t(a);
        $.each(e, function (e, t) {
            r("#" + t).attr(n, i)
        })
    };
    e.getFieldsData = function (n, i) {
        var a = t(i);
        var r = {};
        var o, s, l, c;
        for (var u = 0, d = n.length; u < d; u++) {
            var f = n[u];
            if ($.isArray(f)) {
                c = f[0];
                l = f[1];
                if (l == "check") {
                    $.each(c, function (t, n) {
                        r[n] = e.getFieldData(n, i)
                    })
                }
            } else {
                o = a("#" + f);
                l = o.attr("type");
                s = o.attr("name");
                if (o.size() < 1) {
                    o = a("[name=" + f + "]")
                }
                s = s || f;
                r[s] = e.getFieldData(f, i)
            }
        }
        return r
    };
    e.getFieldData = function (i, a) {
        var r = t(a);
        var o, s, l, c, u;
        c = "";
        var d = i;
        o = r("#" + d);
        if (o.size() < 1) {
            o = r("[name=" + d + "]")
        }
        l = o.attr("type");
        s = o.attr("name");
        s = s || d;
        if (l == "radio") {
            c = r("[name=" + s + "]:checked").val()
        } else if (l == "checkbox") {
            u = [];
            r("[name=" + s + "]:checked").each(function (e, t) {
                u.push(t.value)
            });
            c = u
        } else {
            c = o.size() > 0 ? o.val() : ""
        }
        if (n[d]) {
            var f = e.datadeal[n[d]];
            if (f) {
                c = f.build(c)
            }
        }
        return c
    };
    e.setValue = e.setFieldData = e.setVal;
    e.setFieldsData = e.setFieldValue;
    e.getValue = e.getFieldData;
    e.setFieldAsso = function (n, i, a, r, o) {
        o = o || {};
        var s = t(o.cnt);
        var l = function () {
            var t = e.getFieldData(n);
            var o = $.inArray(t, i) >= 0;
            a && s("#" + a)[o ? "show" : "hide"]();
            if (r) {
                r(o)
            }
        };
        var c, u, d;
        e._fieldAsso[n] = e._fieldAsso[n] || [];
        e._fieldAsso[n].push(l);
        c = s("#" + n);
        if (c.size() < 1) {
            c = s("[name=" + n + "]")
        }
        if (c.size() < 1) {
            return
        }
        u = c.attr("type").toLowerCase();
        d = c.prop("tagName").toLowerCase();
        if (d == "select") {
            c.bind("change", l)
        } else if (u == "radio") {
            s("[name=" + n + "]").bind("click", l)
        }
    };
    e._fieldAsso = {};
    e.fireFieldAsso = function (t) {
        var n = e._fieldAsso[t];
        if (n) {
            $.each(n, function (e, t) {
                t()
            })
        }
    };
    e.uploadid = 0;
    e.uploadImg = function (e, t, n, i, a, r) {
        n = typeof n == "object" ? n : $(n);
        t["_file"] = {1: n};
        QBL.uploader(e, t, a, {callbackName: i, onError: r})
    };
    return e
});
define("js/modules/validator", ["require", "jquery", "js/modules/common", "js/modules/form", "js/config/comm"], function (require) {
    var e = {}, $ = require("jquery"), t = require("js/modules/common"), n = require("js/modules/form"), i = require("js/config/comm");
    $.extend(e, function () {
        var e = {}, a = $.each;
        e._fieldDict = {};
        e.valFields = function (t) {
            var n = true;
            var i;
            a(t, function (t, a) {
                var r = e.valField(a);
                if (r) {
                    if (!i) {
                        var o = $(a).top - 70;
                        scrollTo(0, o);
                        i = true
                    }
                    n = false
                }
            });
            return n
        };
        e.onceValFinish = function (e) {
        };
        e.valField = function (t) {
            var n = e.fieldValidate[t];
            if (n) {
                var i = n(t);
                if (i) {
                    e.showFieldErr(t, i);
                    e._fieldDict[t] = false
                } else {
                    e.clearFieldErr(t);
                    e._fieldDict[t] = true
                }
            }
            e.onceValFinish(e._fieldDict);
            return i
        };
        e.clearFieldErr = function (e) {
            $("#" + e + "ErrTip").hide()
        };
        e.showFieldErr = function (e, t) {
            var n = $("#" + e + "ErrTip");
            if (n.size() > 0) {
                n.html('<span class="ico_warring">警告：</span>' + t + '<span class="ico_arrow">&nbsp;</span>').show();
                return
            }
            var i = document.createElement("div");
            i.className = "errorbox";
            i.id = e + "ErrTip";
            i.innerHTML = '<span class="ico_warring">警告：</span>' + t + '<span class="ico_arrow">&nbsp;</span>';
            $("#" + e).parents("[adrow]").append(i)
        };
        e.dependents = function (e) {
            var t = true, i, r = [], o = {};
            if (e && $.type(e) == "array") {
                a(e, function (e, t) {
                    if ($.isArray(t)) {
                        i = t[0];
                        r.push(i);
                        o[i] = t
                    }
                });
                var s = n.getFieldsData(r);
                a(e, function (e, n) {
                    if ($.isFunction(n)) {
                        t = n()
                    } else {
                        i = n[0];
                        var a = n[1];
                        var r = s[i];
                        if (n[2] == "int") {
                            r = parseInt(r, 10)
                        }
                        if (r != a) {
                            t = false
                        }
                    }
                    return t
                })
            }
            return t
        };
        e.setVal = function (t) {
            var i = function (t) {
                var i = t.field, r = t.valfun, o = t.type, s = t.tip, l = t.deps, c = t.args;
                if (!o && !r) {
                    return
                }
                e.fieldValidate[i] = function (t) {
                    var u = true, d = false, f = "";
                    var p = e.dependents(l);
                    var m = e.valfun[o];
                    if (r) {
                        u = r(i);
                        d = !u;
                        f = u || s
                    } else if (o && m) {
                        var g = n.getFieldData(i);
                        var h = [g];
                        var v = e._fieldargs[o];
                        if (v && c) {
                            a(v, function (e, t) {
                                var n = typeof c[t] != "undefined" ? c[t] : null;
                                h.push(n)
                            })
                        }
                        d = m.apply(null, h);
                        f = s
                    }
                    if (p && !d) {
                        return f
                    }
                }
            };
            if ($.isArray(t)) {
                a(t, function (e, t) {
                    var n = t[0], r = t[1];
                    if ($.isArray(r)) {
                        a(r, function (e, t) {
                            var a = [t[0], n, t[1]];
                            i(a)
                        })
                    } else {
                        i(t)
                    }
                })
            }
        };
        e.actionValField = function (t) {
            a(t, function (t, n) {
                var i = n;
                var a = n;
                if ($.isArray(n)) {
                    a = n[0];
                    i = n[1]
                }
                var r = function () {
                    e.valField(i)
                };
                var o = $("#" + a);
                if (o.size() < 1) {
                    o = $("[name=" + a + "]")
                }
                if (o.size() < 1) {
                    return
                }
                var s = o.prop("tagName").toLowerCase();
                var l = (o.attr("type") || "").toLowerCase();
                if (s == "input" && (l == "checkbox" || l == "radio")) {
                    $("[name=" + a + "]").bind("click", r)
                }
                var c = "";
                if (s == "select") {
                    c = "change"
                }
                if (s == "input" || s == "textarea") {
                    c = "keyup"
                }
                $("#" + a).bind(c, r)
            })
        };
        e.fieldValidate = {};
        e._fieldargs = {txt: ["min", "max", "isByteLen", "isUTF8"], num: ["min", "max"], checkbox: ["min", "max"]};
        e.valfun = {
            empty: function (e) {
                if (!e) {
                    return false
                } else {
                    return true
                }
            }, isnum: function (e) {
                if (/^\d+$/.test(e)) {
                    return true
                } else {
                    return false
                }
            }, qq: function (e) {
                if (/^\d{4,11}$/.test(e)) {
                    return true
                } else {
                    return false
                }
            }, price: function (e) {
                return /^\d+(\.\d{1,2})?$/.test(e + "")
            }, txt: function (e, n, i, a, r) {
                var r = r || false, o;
                if (!a) {
                    o = e.length
                } else {
                    o = t.getRealLen($.trim(e), r)
                }
                return o >= n && o <= i ? true : false
            }, num: function (e, t, n) {
                var i = Number(e);
                if (isNaN(i)) {
                    return false
                }
                return i >= t && i <= n ? true : false
            }, mail: function (e) {
                var t = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/, n = $.trim(e);
                return t.test(n) ? true : false
            }, phone: function (e) {
                var t = /^(0[0-9]{2,3}(\-)?)?([2-9][0-9]{6,7})(\-[0-9]{1,4})?$/, n = /^1\d{10}$/, i = $.trim(e);
                return t.test(i) || n.test(i) ? true : false
            }, mobile: function (e) {
                var t = /^1\d{10}|\+\d{6,13}$/, n = $.trim(e);
                return t.test(n) ? true : false
            }, url: function (e) {
                var t = /^(?:ht|f)tp(?:s)?\:\/\/(?:[\w\-\.]+)\.\w+/i, n = $.trim(e);
                return t.test(n) ? true : false
            }, qqurl: function (e) {
                var t = /^https?\:\/\/[\w\-\.]+\.qq\.com(?:\/|$)/i, n = $.trim(e);
                return t.test(n) ? true : false
            }, post: function (e) {
                var t = /^\d{6}$/, n = $.trim(e);
                return t.test(n) ? true : false
            }
        };
        e.emptyValidate = function (t) {
            var i = n.getFieldData(t);
            return e.valfun.empty(i)
        };
        e.numValidate = function (t) {
            var i = n.getFieldData(t);
            return e.valfun.isnum(i)
        };
        e.limitValidate = function (t) {
            var n = true;
            if (!e.valfun.isnum(t)) {
                n = {type: "error", msg: "请输入合法的日限额，必须为整数"}
            } else if (t > 1 && t.toString().substring(0, 1) === "0") {
                n = {type: "error", msg: "请输入合法的日限额，必须为整数"}
            }
            return n
        };
        e.priceValidate = function (t, n, a) {
            var r = i.ENV.PRICE_MIN, o = i.ENV.PRICE_MAX, s = true, l = i.ENV.CPMPRICE_MIN;
            if (a && a.minprice > 0 && a.maxprice > 0) {
                r = a.minprice;
                o = a.maxprice
            }
            if (n == i.ENV.OCPA && a && a.optimization_goal_max_price > 0 && a.optimization_goal_min_price > 0) {
                r = a.optimization_goal_min_price;
                o = a.optimization_goal_max_price
            }
            if (!e.valfun.price(t)) {
                s = {type: "error", msg: "出价错误，支持两位小数"}
            } else if (t > 1 && t.toString().substring(0, 1) === "0") {
                s = {type: "warning", msg: "当前输入为" + parseFloat(t, 10) + "元，请确定是否符合您的预期"}
            } else if (t < r || t > o) {
                s = {type: "error", msg: "请正确输入广告出价，有效范围为" + [r, o].join("-") + "元"}
            } else if (t > i.ENV.CPC_PRICE_WARNING) {
                s = {type: "warning", msg: "当前输入为" + t + "元，请确定是否符合您的预期"}
            } else if (n == i.ENV.CPM && t < l) {
                s = {type: "error", msg: "请正确输入出价，最少出价为" + l + "元"}
            }
            return s
        };
        e.cpmFreqValidate = function (t) {
            var n = true, i = e.valfun.num, a = /\./, r = t.min_impression_include || "", o = t.max_impression_include || "";
            if (isNaN(r) || isNaN(o) || a.test(r) || a.test(o)) {
                n = false
            } else {
                r = parseInt(r, 10);
                o = parseInt(o, 10);
                if (r > 1e3 || o > 1e3) {
                    n = {type: "error", msg: "曝光限额不能超过1000"}
                } else if (r <= 0 || o <= 0) {
                    n = false
                } else if (o < r) {
                    n = {type: "error", msg: "广告曝光下限应该小于或等于上限值"}
                } else if (!(i(r, 1, 1e3) || i(o, 1, 1e3))) {
                    n = false
                }
            }
            if (n === false) {
                n = {type: "error", msg: "请正确填写频次控制，要求为1000以内的正整数"}
            }
            return n
        };
        return e
    }());
    e.validate = function (e, t) {
        var n, i, a = {
            url: function (e) {
                var t = /^https?:\/\/([a-zA-Z0-9\-]+\.)+([a-zA-Z]{2,4})([\/|\?|\#][a-zA-Z0-9`~!@#%&_=;\$\^\*\(\)\-\+\{\}\[\]\:\,\.\?\/\|]*)?$/;
                return t.test(e)
            }, tencent: function (e) {
                var t = /^tencent:\/\//;
                return t.test(e)
            }, uin: function (e) {
                return /^\d{5,11}$/.test(e)
            }, opappid: function (e) {
                return /^[0-9]+$/.test(e)
            }, myappid: function (e) {
                return /^[0-9]+$/.test(e)
            }, itunesappid: function (e) {
                return /^[0-9]+$/.test(e)
            }, taskid: function (e) {
                return !!e
            }, tel: function (e) {
                var t = /^\+?([0-9]{2,3})?\-?[0-9]{3,4}\-?[0-9]{6,8}(\-[0-9]{1,8})?$/, n = /^\+?[0-9]{6,13}$/, i = QZFL.string.trim(e);
                return t.test(i) || n.test(i) ? true : false
            }, weixin: function (e) {
                var t = /^weixin:\/\//;
                return t.test(e)
            }, wechathttp: function (e) {
                var t = /^https?:\/\/mp.weixin.qq.com\/s/, n = /^https?:\/\/mp.weixin.qq.com\/mp/;
                return t.test(e) || n.test(e)
            }
        };
        typeof t === "undefined" && (t = this);
        if (typeof t === "undefined") {
            return null
        }
        if (t.nodeType && t.nodeType == 1) {
            i = t.value
        } else {
            i = t
        }
        if (e in a) {
            n = a[e].call(t, i)
        } else {
            n = true
        }
        return n
    };
    return e
});
define("js/filter/string", ["require", "angular", "js/modules/common"], function (require) {
    var e = "filter.string", t = require("angular"), n = require("js/modules/common"), i = t.module(e, []), a = {};
    t.extend(a, {
        cutString: function (e, t, i) {
            e = String(e);
            t -= 0;
            i = i || "";
            if (isNaN(t)) {
                return e
            }
            var a = e.length, r = Math.min(Math.floor(t / 2), a), o = n.getRealLen(e.slice(0, r));
            for (; r < a && o < t; r++) {
                o += 1 + (e.charCodeAt(r) > 255)
            }
            return e.slice(0, o > t ? r - 1 : r) + (r < a ? i : "")
        }
    });
    t.forEach(a, function (e, t) {
        i.filter(t, function () {
            return e
        })
    });
    i.filter("trustedHtml", ["$sce", function (e) {
        return function (t) {
            return e.trustAsHtml(t)
        }
    }]);
    return e
});
define("js/modules/jquery.plugin", ["require", "jquery"], function (require) {
    "use strict";
    require("jquery");
    (function () {
        var e = {}, t = "qq.com";
        var n = {
            ua: function () {
                var e = {}, t = navigator.userAgent;
                if (window.ActiveXObject) {
                    e.ie = 6;
                    (window.XMLHttpRequest || t.indexOf("MSIE 7.0") > -1) && (e.ie = 7);
                    (window.XDomainRequest || t.indexOf("Trident/4.0") > -1) && (e.ie = 8);
                    t.indexOf("Trident/5.0") > -1 && (e.ie = 9);
                    t.indexOf("Trident/6.0") > -1 && (e.ie = 10);
                    e.isBeta = navigator.appMinorVersion && navigator.appMinorVersion.toLowerCase().indexOf("beta") > -1;
                    if (e.ie < 7) {
                        try {
                            document.execCommand("BackgroundImageCache", false, true)
                        } catch (n) {
                        }
                    }
                } else if (document.getBoxObjectFor || typeof window.mozInnerScreenX != "undefined") {
                    var i = /(?:Firefox|GranParadiso|Iceweasel|Minefield).(\d+\.\d+)/i;
                    e.firefox = parseFloat(i.exec(t)[1], 10)
                } else if (!navigator.taintEnabled) {
                    var a = /AppleWebKit.(\d+\.\d+)/i.exec(t);
                    e.webkit = a ? parseFloat(a[1], 10) : document.evaluate ? document.querySelector ? 525 : 420 : 419;
                    if ((a = /Chrome.(\d+\.\d+)/i.exec(t)) || window.chrome) {
                        e.chrome = a ? parseFloat(a[1], 10) : "2.0"
                    } else if ((a = /Version.(\d+\.\d+)/i.exec(t)) || window.safariHandler) {
                        e.safari = a ? parseFloat(a[1], 10) : "3.3"
                    }
                    e.air = t.indexOf("AdobeAIR") > -1 ? 1 : 0;
                    e.isiPod = t.indexOf("iPod") > -1;
                    e.isiPad = t.indexOf("iPad") > -1;
                    e.isiPhone = t.indexOf("iPhone") > -1
                } else if (window.opera) {
                    e.opera = parseFloat(window.opera.version(), 10)
                } else {
                    e.ie = 6
                }
                if (!(e.macs = t.indexOf("Mac OS X") > -1)) {
                    e.windows = (a = /Windows.+?(\d+\.\d+)/i.exec(t), a && parseFloat(a[1], 10));
                    e.linux = t.indexOf("Linux") > -1;
                    e.android = t.indexOf("Android") > -1
                }
                e.iOS = t.indexOf("iPhone OS") > -1;
                !e.iOS && (a = /OS (\d+(?:_\d+)*) like Mac OS X/i.exec(t), e.iOS = a && a[1] ? true : false);
                return e
            }(), setScrollTop: function (e, t) {
                $("html, body").animate({scrollTop: e || 0}, t || 500)
            }, insertCSSLink: function (t, i) {
                var a, r, o, s, l;
                if (e[t]) {
                    return
                }
                if (typeof i == "string") {
                    a = i
                }
                i = typeof i == "object" ? i : {};
                a = i.linkID || a;
                r = i.doc || document;
                l = r.getElementsByTagName("head")[0];
                s = (o = r.getElementById(a)) && o.nodeName == "LINK" ? o : null;
                if (!s) {
                    s = r.createElement("link");
                    a && (s.id = a);
                    s.rel = s.rev = "stylesheet";
                    s.type = "text/css";
                    s.media = i.media || "screen";
                    l.appendChild(s)
                }
                try {
                    t && (s.href = t)
                } catch (c) {
                }
                e[t] = true;
                return n.ua.ie < 9 && s.sheet || s
            }, escHTML: function (e) {
                var t = {"&amp;": /&/g, "&lt;": /</g, "&gt;": />/g, "&#039;": /\x27/g, "&quot;": /\x22/g};
                for (var n in t) {
                    e = e.replace(t[n], n)
                }
                return e
            }, restXHTML: function (e) {
                var t = {"<": /&lt;/g, ">": /&gt;/g, "'": /&(?:apos|#0?39);/g, '"': /&quot;/g, "&": /&amp;/g};
                for (var n in t) {
                    e = e.replace(t[n], n)
                }
                return e
            }, format: function (e, t) {
                var n = /\{([\w\.]*)\}/g;
                return e.replace(n, function (e, n) {
                    var i = n.split("."), a = t[i.shift()];
                    if (a) {
                        a = typeof $ != "undefined" ? $("<div></div>").text(a).html() : a
                    }
                    $.each(i, function () {
                        a = a[this]
                    });
                    return a === null || a === undefined ? "" : a
                })
            }, cut: function (e, t, i) {
                e = String(e);
                t -= 0;
                i = i || "";
                if (isNaN(t)) {
                    return e
                }
                var a = e.length, r = Math.min(Math.floor(t / 2), a), o = n.getRealLen(e.slice(0, r));
                for (; r < a && o < t; r++) {
                    o += 1 + (e.charCodeAt(r) > 255)
                }
                return e.slice(0, o > t ? r - 1 : r) + (r < a ? i : "")
            }, getRealLen: function (e, t) {
                var n = /[^\x00-\xFF]/g, i = /[\x00-\xFF]/g;
                if (typeof e != "string") {
                    return 0
                }
                if (!t) {
                    return e.replace(n, "**").length
                } else {
                    var a = e.replace(i, "");
                    return e.length - a.length + encodeURI(a).length / 3
                }
            }, cookie: function () {
                var e = function (t) {
                    if (arguments.length > 1) {
                        return e.set.apply(e, arguments)
                    } else {
                        return e.get(t)
                    }
                };
                e.set = function (e, n, i, a, r) {
                    var o, s;
                    if (r) {
                        o = new Date;
                        o.setTime(o.getTime() + 36e5 * r)
                    } else if (typeof i == "object") {
                        s = i;
                        i = s.domain;
                        a = s.path;
                        o = s.expires
                    }
                    document.cookie = e + "=" + n + "; " + (r ? "expires=" + o.toGMTString() + "; " : "") + (a ? "path=" + a + "; " : "path=/; ") + (i ? "domain=" + i + ";" : "domain=" + t + ";");
                    return true
                };
                e.get = function (e) {
                    var t = new RegExp("(?:^|;+|\\s+)" + e + "=([^;]*)"), n = document.cookie.match(t);
                    return !n ? "" : n[1]
                };
                e.del = function (e, n, i) {
                    document.cookie = e + "=; expires=Mon, 26 Jul 1997 05:00:00 GMT; " + (i ? "path=" + i + "; " : "path=/; ") + (n ? "domain=" + n + ";" : "domain=" + t + ";")
                };
                return e
            }(), getACSRFToken: function () {
                var e = 5381, t = n.cookie.get("skey");
                for (var i = 0, a = t.length; i < a; ++i) {
                    e += (e << 5) + t.charCodeAt(i)
                }
                return e & 2147483647
            }, formPost: function (e, t, i) {
                function a(e) {
                    var t = {};
                    if (typeof e == "string" && (e = e.split("&"))) {
                        for (var n = 0; n < e.length; n++) {
                            var i = e[n].split("=");
                            t[i[0]] = i[1]
                        }
                    } else {
                        t = e
                    }
                    return t
                }

                var r = {
                    callback: function () {
                    }, onerror: function () {
                    }, charset: "utf-8", url: e, pIstanceKey: "pid" + Math.floor(Math.random() * 1e5)
                };
                if (typeof i == "undefined") {
                    i = t
                }
                if (typeof t == "function") {
                    i = t;
                    t = ""
                }
                $.extend(r, typeof i == "function" ? {callback: i} : i);
                var o = document.createElement("iframe"), s = n.ua.ie, l, c;
                c = '<!DOCTYPE html><html lang="zh-cn"><head><meta http-equiv="content-type" content="text/html; charset=' + r.charset + '" /><meta charset="' + r.charset + '" />';
                if (s) {
                    l = 'javascript:document.open();document.domain="' + document.domain + '";var me=parent["' + r.pIstanceKey + '"];document.write(me.ifrHTML);document.close();'
                }
                c = c + '<script type="text/javascript">' + (s && 'document.charset="' + r.charset + '"' || "") + ';document.domain="' + document.domain + '";frameElement.submited=void(0);frameElement.state="sending";</script></head><body>';
                c = c + '<form action="' + e + (e.indexOf("?") > -1 ? "&" : "?") + "g_tk=" + n.getACSRFToken() + '" accept-charset="' + r.charset + '" id="p" enctype="application/x-www-form-urlencoded;charset=' + r.charset + '" method="post">';
                c = c + '<input type="hidden" name="qzreferrer" id="qzreferrer" />';
                for (var u in t) {
                    c = c + '<input type="hidden" name="' + u + '" id="' + u + '" value="" />'
                }
                c = c + '</form><script type="text/javascript">var me=parent["' + r.pIstanceKey + '"];doc=document,f=doc.getElementById("p"),d=me.jsonData;';
                c = c + 'for(var i in d){doc.getElementById(i).value=decodeURIComponent(d[i]);}doc.getElementById("qzreferrer").value=parent.location.href;f.submit();me.postTime=+new Date;frameElement.submited=true;frameElement.state="sended";</script></body></html>';
                window[r.pIstanceKey] = r.ifrInfo = {
                    ifrHTML: c,
                    ifrurl: l,
                    startTime: +new Date,
                    postTime: 0,
                    endTime: 0,
                    ifr: o,
                    jsonData: a(t)
                };
                o.style.cssText = "width:0;height:0;border-width:0;display:none;";
                function d(e) {
                    e.ifr.parentNode == document.body && document.body.removeChild(e.ifr);
                    e.ifr.onload = e.ifr.onreadystatechange = null
                }

                o.callback = function (e) {
                    return function () {
                        e.ifrInfo.endTime = +new Date;
                        e.callback.apply(e, arguments);
                        d(e.ifrInfo)
                    }
                }(r);
                document.body.appendChild(o);
                o.onload = o.onreadystatechange = function (e) {
                    return function () {
                        if (this.readyState == "complete" || typeof this.readyState == "undefined") {
                            if ("sended".indexOf(this.state) > -1) {
                                e.ifrInfo.endTime = +new Date;
                                e.onerror.call(e, e);
                                d(e.ifrInfo)
                            }
                        }
                    }
                }(r);
                o.state = "initing";
                s ? setTimeout(function (e) {
                    return function () {
                        e.ifrInfo.ifr.state = "inited";
                        e.ifrInfo.ifr.src = e.ifrInfo.ifrurl
                    }
                }(r), 10) : o.src = "javascript:;";
                if (!s) {
                    var f = o.contentDocument || o.contentWindow.document;
                    if (f) {
                        f.open();
                        f.write(r.ifrInfo.ifrHTML);
                        f.close()
                    }
                }
            }, timeFormatString: function (e, t, i) {
                try {
                    e = e.getTime ? e : new Date(e)
                } catch (a) {
                    return ""
                }
                var r = {
                    y: ["getYear", 31104e6],
                    Y: ["getFullYear", 31104e6, "年前"],
                    M: ["getMonth", 2592e6, "个月前"],
                    d: ["getDate", 864e5, "天前"],
                    h: ["getHours", 36e5, "小时前"],
                    m: ["getMinutes", 6e4, "分钟前"],
                    s: ["getSeconds", 1e3, "秒前"]
                }, o = ["Y", "M", "d", "h", "m", "s"], s = false, l, c, u;
                if (!t) {
                    i = i || (window.g_NowTime ? new Date(window.g_NowTime * 1e3) : new Date);
                    c = Math.abs(e - i);
                    for (var d = 0, f = o.length; d < f; ++d) {
                        l = r[o[d]];
                        if (c > l[1]) {
                            return Math.floor(c / l[1]) + l[2]
                        }
                    }
                    return "刚刚"
                } else {
                    return t.replace(/\{([_yYMdhms]{1,2})(?:\:([\d\w\s]))?\}/g, function (t, a, o) {
                        (s = a.charAt(0) == "_") && (a = a.charAt(1));
                        if (!r[a]) {
                            return t
                        }
                        if (!s) {
                            u = e[r[a][0]]();
                            a == "y" && (u %= 100);
                            a == "M" && u++;
                            return u < 10 ? n.fillLength(u, 2, o) : u.toString()
                        } else {
                            return Math.floor(Math.abs(e - i) / r[a][1])
                        }
                    })
                }
            }, fillLength: function (e, t, n, i) {
                if ((e = String(e)).length < t) {
                    var a = new Array(t - e.length);
                    a[i ? "unshift" : "push"](e);
                    e = a.join(n || "0")
                }
                return e
            }
        };
        $.extend(n)
    })()
});
define("js/modules/platform", ["require", "exports", "module", "jquery", "js/config/comm", "js/modules/account", "js/modules/jquery.plugin"], function (require, e, t) {
    "use strict";
    var $ = require("jquery"), n = require("js/config/comm"), i = require("js/modules/account"), a = {};
    require("js/modules/jquery.plugin");
    a = {
        getPlatform: function () {
            var e = "atlas_platform", t = "atlas", r = $.cookie.get(e) || "";
            if (location.href.indexOf("/cpt/") > -1) {
                return a.setPlatform("CPT")
            }
            if (i.isYYBKAAduser()) {
                t = "CPD"
            }
            if (!r || !n.supportPlatform[r] || r == "atlas" && i.isYYBKAAduser() || r == "CPD" && !i.isYYBKAAduser() || r == "CPT" && !i.isYYBAppAduser() && !i.isYYBKAAduser()) {
                r = t;
                a.setPlatform(r)
            }
            return r
        }, setPlatform: function (e) {
            var t = "atlas_platform";
            if (e && n.supportPlatform[e]) {
                $.cookie.set(t, e, "e.qq.com", "/");
                return e
            } else {
                return false
            }
        }
    };
    return a
});
define("js/modules/simulateui", ["require", "exports", "module", "jquery", "js/modules/common", "chosen/pinyin", "chosen/chosen.jquery"], function (require, e, t) {
    "use strict";
    var $ = require("jquery"), n = require("js/modules/common"), i = require("chosen/pinyin"), a = require("chosen/chosen.jquery");
    var r = n.getIEVersion() || -1;
    e.showChosenSelect = function (e, t) {
        var n = $(e), i = $.extend(true, {disable_search_threshold: 50}, t), a = false, r = 30;
        if (typeof i.alwaysChosen != "undefined" && i.alwaysChosen) {
            try {
                a = n.chosen(i);
                a.trigger("chosen:updated")
            } catch (o) {
                a = n.chosen(i)
            }
        } else if (i.forceShow) {
            a = n.chosen(i)
        } else if (n.length > 0 && n.is(":visible")) {
            a = n.chosen(i)
        }
        if (a && t.height && t.height < n.find("option").size() * r) {
            n.next().find(".chosen-results").css("height", t.height + "px")
        }
        return a
    };
    e.digestChosen = function (e, t) {
        var e = e || "", n = e ? e + "_chosen" : "", i = $(e), a = $(n), t = t || function () {
            };
        if (r == 8 && !!i.attr("ng-options")) {
            return false
        }
        if (i.length > 0 && a.length > 0) {
            a.on("click", "li", function () {
                var e = i.val(), n = e ? e.split(":") : [], a = n.length > 1 ? n[1] : n;
                t(a)
            })
        }
    }
});
define("js/modules/dialog", ["require", "exports", "module", "jquery", "js/lib/bootstrap/bootstrap"], function (require, e, t) {
    "use strict";
    var $ = require("jquery"), n = require("js/lib/bootstrap/bootstrap");
    var i = ["0", "0", "0", "0", "0", "0", "0"], a = function () {
        var e = i.length;
        var t;
        while (e) {
            e--;
            t = i[e].charCodeAt(0);
            if (t == 57) {
                i[e] = "A";
                return i.join("")
            }
            if (t == 90) {
                i[e] = "0"
            } else {
                i[e] = String.fromCharCode(t + 1);
                return i.join("")
            }
        }
        i.unshift("0");
        return i.join("")
    };
    var r = function (e) {
        var t = {
            on: function () {
                var e = Array.prototype.slice.call(arguments, 0);
                $("#" + this.id).on(e[0], e[1]);
                return this
            }, off: function () {
                var e = Array.prototype.slice.call(arguments, 0);
                $("#" + this.id).off(e[0], e[1]);
                return this
            }, trigger: function () {
                var e = Array.prototype.slice.call(arguments, 0);
                $("#" + this.id).trigger(e[0], e[1]);
                return this
            }, center: function () {
                var e = this.id;
                var t = $("#" + e), n = t.find(".modal-dialog"), i = 0, a = parseInt($(window).height()) || 0;
                if (n.length > 0) {
                    i = parseInt(n.height()) || 0
                }
                if (i < 1 || a < 1) {
                    return this
                }
                n.css({"margin-top": a / 2 - i / 2, "margin-bottom": 0, "margin-left": "auto", "margin-right": "auto"});
                return this
            }, destroy: function () {
                var e = this.id, t = $("#" + e), n = t.closest(".tipspop");
                if (n.length > 0) {
                    setTimeout(function () {
                        n.remove()
                    }, 2e3)
                }
                return this
            }, close: function () {
                var e = this.id;
                $("#" + e).modal("toggle");
                this.destroy();
                this.trigger("close");
                return this
            }
        }, e = e || {};
        for (var n in t) {
            e[n] = t[n]
        }
        return e
    };
    var o = function (e) {
        var t = $.extend({
            header: "",
            title: "",
            content: "",
            width: 329,
            buttons: [{label: "取消", "class": "btn-default", type: "cancel"}, {
                label: "确认",
                "class": "btn-primary",
                type: "confirm"
            }],
            modal: {backdrop: ""},
            render: function () {
            }
        }, e);
        t.title = t.title + "";
        t.content = t.content + "";
        t.width = parseInt(t.width) || 329;
        if (t.content.length < 1) {
            throw"内容不能为空";
            return false
        }
        this.setting = t;
        this.id = "GDTDialog_" + a();
        this.render()
    };
    r(o.prototype);
    o.prototype.render = function () {
        var e = this.setting || {}, t = this.id;
        var n = "", i = e.buttons || [], a = i.length, r = e.header || "", o = "";
        if (r) {
            r = '<h4 class="modal-title">' + r + "</h4>"
        }
        if (a > 0) {
            for (var s = 0; s < a; s++) {
                if (i[s]) {
                    o = i[s]["type"] ? i[s]["type"] : "";
                    n += '<button type="button" class="btn ' + i[s]["class"] + '" data-type="' + o + '">' + i[s]["label"] + "</button>"
                }
            }
        }
        var l = ['<div class="tipspop">', '<div class="modal fade" tabindex="-1" role="dialog" id="' + t + '">', '<div class="modal-dialog" style="width:' + e.width + 'px;">', '<div class="modal-content modal-width-ft">', '<div class="modal-header">', '<button type="button" class="close"><span aria-hidden="true">&times;</span></button>', r, "</div>", '<div class="modal-body">', e.title ? '<p class="s-tit"><strong>' + e.title + "</strong></p>" : "", '<div class="nor-line">', e.content, "</div>", "</div>", '<div class="modal-footer">', n, "</div>", "</div>", "</div>", "</div>", "</div>"].join("");
        $("body").append(l);
        $("#" + t).modal(e.modal);
        e.render && e.render(t);
        this.center();
        this.bindEvent()
    };
    o.prototype.bindEvent = function () {
        var e = this, t = this.setting, n = this.id;
        $("#" + n).on("click", "button.close", function () {
            e.close()
        }).on("click", ".modal-footer button", function () {
            var n = $(this), i = n.attr("data-type") || "";
            if (i == "cancel") {
                if (t.cancel) {
                    if (t.cancel(e)) {
                        e.close();
                        e.trigger("cancel")
                    }
                } else {
                    e.cancel()
                }
            } else if (i == "confirm") {
                if (t.confirm) {
                    if (t.confirm(e)) {
                        e.close();
                        e.trigger("confirm")
                    }
                } else {
                    e.confirm()
                }
            } else {
                e.trigger(i)
            }
        });
        $(window).on("resize", function () {
            e.center()
        })
    };
    o.prototype.cancel = function () {
        this.close();
        this.trigger("cancel")
    };
    o.prototype.confirm = function () {
        this.close();
        this.trigger("confirm")
    };
    var s = function (e) {
        var t = $.extend(true, {
            title: "",
            message: "",
            width: 329,
            time: 1500,
            type: "warn",
            autohide: true,
            modal: {backdrop: ""},
            render: function () {
            }
        }, e);
        t.title = t.title + "";
        t.message = t.message + "";
        t.width = parseInt(t.width) || 329;
        t.time = parseInt(t.time) || 5e3;
        this.typeClass = {
            strongwarn: "ico-strongwarn-mid",
            warn: "ico-warn-mid",
            success: "ico-success-mid",
            wrong: "ico-wrong-mid",
            confirm: "ico-confirm-mid",
            tips: "ico-tips-mid",
            loading: "ico-loading"
        };
        if (t.title.length < 1 || !t.type || !this.typeClass[t.type]) {
            throw"标题不能为空";
            return false
        }
        this.setting = t;
        this.id = "GDTDialog_" + a();
        this.timeout = null;
        this.render()
    };
    r(s.prototype);
    s.prototype.render = function () {
        var e = this, t = this.setting || {}, n = this.id;
        var i = ['<div class="tipspop">', '<div class="modal fade" tabindex="-1" role="dialog" id="' + n + '">', '<div class="modal-dialog" style="width:' + t.width + 'px;">', '<div class="modal-content">', '<div class="modal-body">', '<div class="modal-body-single">', '<p class="s-tit"><i class="icon ' + this.typeClass[t.type] + '"><i></i></i><strong>' + t.title + "</strong></p>", t.message ? '<p class="nor-line">' + t.message + "</p>" : "", "</div>", "</div>", "</div>", "</div>", "</div>", "</div>"].join("");
        $("body").append(i);
        $("#" + n).modal(t.modal);
        t.render && t.render(n);
        this.center();
        $(window).on("resize", function () {
            e.center()
        });
        if (t.autohide) {
            try {
                clearTimeout(this.timeout);
                this.timeout = setTimeout(function () {
                    e.close()
                }, this.setting.time)
            } catch (a) {
            }
        }
    };
    return {
        show: function (e) {
            return new o(e)
        }, tip: function (e) {
            return new s(e)
        }, tip_strongwarn: function (e) {
            e.type = "strongwarn";
            return new s(e)
        }, tip_warn: function (e) {
            e.type = "warn";
            return new s(e)
        }, tip_success: function (e) {
            e.type = "success";
            return new s(e)
        }, tip_wrong: function (e) {
            e.type = "wrong";
            return new s(e)
        }, tip_confirm: function (e) {
            e.type = "confirm";
            return new s(e)
        }, tip_tips: function (e) {
            e.type = "tips";
            return new s(e)
        }, tip_loading: function (e) {
            e.type = "loading";
            return new s(e)
        }
    }
});
define("js/modules/atlasdomflag", ["require", "exports", "module", "jquery", "js/modules/jquery.plugin"], function (require, e, t) {
    "use strict";
    var $ = require("jquery"), n = "atlasdomflag";
    require("js/modules/jquery.plugin");
    $.cookie.del(n, "e.qq.com", "/");
    function i() {
        var e = $.cookie.get(n) || "";
        return e.split(",") || []
    }

    function a(e) {
        var t = e || "";
        if (t) {
            $.cookie.set(n, t, "e.qq.com", "/atlas/")
        } else {
            $.cookie.del(n, "e.qq.com", "/atlas/")
        }
    }

    e.set = function (e) {
        var e = e || "", t = i();
        if (e && $.inArray(e, t) < 0) {
            t.push(e);
            a(t.join(","));
            return true
        } else {
            return false
        }
    };
    e.remove = function (e) {
        var e = e || "", t = i();
        if (e) {
            for (var n = 0, r = t.length; n < r; n++) {
                if (t[n] == e) {
                    t.splice(n, 1);
                    break
                }
            }
            a(t.join(","))
        } else {
            a()
        }
        return true
    }
});
define("js/modules/atlasdominfo", ["require", "exports", "module", "jquery", "js/modules/jquery.plugin"], function (require, e, t) {
    "use strict";
    var $ = require("jquery"), n = "atlasdominfo";
    require("js/modules/jquery.plugin");
    $.cookie.del(n, "e.qq.com", "/");
    $.cookie.del(n, "e.qq.com", "/atlas/");
    function i() {
        var e = $.cookie.get(n) || "";
        return e.split(",") || []
    }

    function a(e) {
        var t = e || "";
        if (t) {
            $.cookie.set(n, t, "e.qq.com", "/atlas/")
        } else {
            $.cookie.del(n, "e.qq.com", "/atlas/")
        }
    }

    e.set = function (e, t) {
        var e = e || "", t = t || "", n = i(), r = "";
        r = e + "=" + encodeURIComponent(t);
        if (e && t && $.inArray(r, n) < 0) {
            n.push(r);
            a(n.join(","));
            return true
        } else {
            return false
        }
    };
    e.remove = function (e) {
        var e = e || "", t = i(), n = "", r = [];
        if (e) {
            for (var o = 0, s = t.length; o < s; o++) {
                n = t[o];
                r = n.split("=");
                if (r[0] == e) {
                    t.splice(o, 1);
                    break
                }
            }
            a(t.join(","))
        } else {
            a()
        }
        return true
    }
});
define("js/modules/jsonp", ["require", "modules/network", "js/modules/common", "aduser"], function (require) {
    var e = require("modules/network"), t = require("js/modules/common"), n = require("aduser");
    var i = function () {
        var t = Array.prototype.slice.call(arguments);
        t.length < 2 && (t[1] = {});
        t.length < 3 && (t[2] = function () {
        });
        t.length < 4 && (t[3] = {});
        !t[3] && (t[3] = {});
        !t[3].onError && t[3].errcbFn && (t[3].onError = t[3].errcbFn);
        t[3].charset = "utf-8";
        if (t && t[1] && typeof t[1]["owner"] == "undefined") {
            t[1]["owner"] = n.aduid
        }
        return e.poster.apply(null, t)
    };
    var a = function () {
        var a = Array.prototype.slice.call(arguments), r;
        a.length < 2 && (a[2] = {});
        a.length < 3 && (a[2] = function () {
        });
        a.length < 4 && (a[3] = {});
        !a[3] && (a[3] = {});
        !a[3].onError && a[3].errcbFn && (a[3].onError = a[3].errcbFn);
        a[3].charset = "utf-8";
        r = a[1];
        if (r && r.format && r.format === "xls") {
            var o = a[0];
            var s = t.parseUrl(o).search || {};
            r = $.extend({}, r, s);
            a[1] = r;
            i.apply(null, a);
            return false
        }
        if (a && a[1] && typeof a[1]["owner"] == "undefined") {
            a[1]["owner"] = n.aduid
        }
        return e.getter.apply(null, a)
    };
    return {poster: i, getter: a}
});
define("js/modules/uuid", function () {
    var e = "";

    function t() {
        function e() {
            return Math.floor((1 + Math.random()) * 65536).toString(16).substring(1)
        }

        return e() + e() + "-" + e() + "-" + e() + "-" + e() + "-" + e() + e() + e()
    }

    return {
        gen: t, get: function () {
            if (!e) {
                e = t()
            }
            return e
        }
    }
});