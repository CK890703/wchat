require(["jquery", "angular", "js/pages/common", "js/controller/index", "utils", "prefetchapi", "performanceapi", "layer", "jquery.form"], function ($, e, t, a, i, r, o, l) {
    "use strict";
    i.stat.monitorPage.create("modIndex", [175, 384, 1]);
    $("#main").addClass("home");
    t.initPage({isIndex: true});
});
define("js/controller/index", ["require", "jquery", "angular", "js/config/comm", "js/config/accounttype", "js/services/index", "js/modules/beautyui", "js/modules/route", "aduser", "js/modules/common", "js/modules/account", "hermes/comm/formater", "js/filter/string", "js/controller/index.all", "js/controller/index.order", "env", "moment", "js/modules/route"], function (require) {
    var $ = require("jquery"), e = require("angular"), t = require("js/config/comm"),
        a = require("js/config/accounttype"), i = require("js/services/index"), r = require("js/modules/beautyui"),
        o = require("js/modules/route"), s = require("aduser"), n = require("js/modules/common"),
        d = require("js/modules/account"), c = require("hermes/comm/formater"), l = require("js/filter/string"),
        u = require("js/controller/index.all"), f = require("js/controller/index.order"), p = require("env"),
        g = require("moment"), m = "indexApp", h = require("js/modules/route"), v = e.module(m, [l, u, f]);
    var w = a.accountTypeDef;
    v.controller("mainController", ["$scope", function (e) {
        e.currentOrderId = "";
        e.isYYBKAAduser = d.isYYBKAAduser();
        e.$on("selectOrder", function (t, a) {
            a = a || "";
            e.currentOrderId = a;
            e.$broadcast("showOrder", a)
        });
        e.$on("getAccoutData", function (t, a) {
            e.$broadcast("getAccoutDataForTips", a)
        });
        e.$on("getOrdersData", function (t, a) {
            e.$broadcast("getOrdersDataForTips", a)
        })
    }]);
    v.controller("mainMenuController", ["$scope", function (e) {
        r.showLoading("orderlist", {minHeight: "700px"});
        e.selectOrder = function (t) {
            var a = $(t.currentTarget || t.target), i = a.attr("data-orderid") || "";
            e.$emit("selectOrder", i);
            n.reportHottag("index.tree")
        };
        i.loadOrderlist(function (t) {
            r.hideLoading("orderlist");
            var a = [];
            if (t.ret == 0) {
                e.list = t.data.list
            } else {
                e.list = a
            }
            e.$emit("getOrdersData", e.list);
            e.$digest();
            setTimeout(function () {
                var e = $(".main-menu").outerHeight();
                $(".main-container").css({"min-height": e, height: "auto"})
            }, 100)
        })
    }]);
    v.controller("mainContainerController", ["$scope", function (a) {
        var i = "今天:" + g(p.servertime * 1e3).format("YYYY-MM-DD");
        var r = [{period: 1, value: 30, name: "过去30天"}, {period: 2, value: 7, name: "过去7天"}, {
            period: 3,
            value: 1,
            name: "昨天"
        }, {period: 4, value: 0, name: i}], s = {}, l = 0;
        for (var u = 0, f = r.length; u < f; u++) {
            s[r[u]["value"]] = r[u]["period"]
        }
        a.ROOT = t.ENV.ROOT;
        a.confLinkType = t.confLinkType;
        a.route = o;
        a.scientific = c.scientific;
        a.accountTypeDef = w;
        a.dateList = r;
        l = parseInt(n.localStorage.getItem("indexDate")) || 0;
        if (l < 7 && d.isYYBKAAduser()) {
            l = 0;
            n.localStorage.setItem("indexDate", l)
        }
        var m = t.REPORT.getChartDefaultFields();
        a.selected = {date: l, axisLeft: m[0] || "viewcount", axisRight: m[1] || "ctr"};
        a.orderid = "";
        a.list = "";
        a.getParam = function (t) {
            var i = n.getTime(), r = 864e5, o = a.selected, d = o.axisLeft || "viewcount",
                c = o.axisRight || "viewcount", l = parseInt(o.date) || 0,
                u = QZFL.string.timeFormatString(i - r * (l > 0 ? 1 : 0), "{Y}-{M}-{d}"),
                f = QZFL.string.timeFormatString(i - r * l, "{Y}-{M}-{d}");
            var p = {
                orderid: a.orderid || "",
                format: "json",
                page: 1,
                pagesize: 10,
                sdate: f,
                edate: u,
                period: s[l],
                searchact: d + "|" + c,
                dimension: "viewcount"
            };
            e.extend(p, t);
            return p
        };
        function h(e) {
            e = $.extend(true, {}, e);
            n.getReportSumData(e, {format: "number"}, function (e) {
                var t = ["viewcount", "validclickcount", "download", "cost"], i;
                e = e || {};
                i = function (t) {
                    var a;
                    e[t + "Quantity"] = "";
                    a = e[t];
                    if (t == "cost") {
                        a = a / 100 || "-";
                        e[t] = a
                    }
                    if (a > 1e10) {
                        e[t] = (e[t] / 1e8).toFixed(2);
                        e[t + "Quantity"] = "亿"
                    }
                    if (a > 1e7) {
                        e[t] = parseInt(e[t] / 1e4);
                        e[t + "Quantity"] = "万"
                    }
                };
                $.each(t, function (e, t) {
                    i(t)
                });
                e = n.listdataFormater([e]).pop();
                a.total = e;
                a.$digest()
            })
        }

        a.$on("renderTotal", function (e, t) {
            h(t)
        });
        a.$on("resetTotal", function () {
            a.total = {}
        });
        a.$on("showOrder", function (e, t) {
            a.orderid = t || "";
            var i = a.getParam();
            a.sdate = i.sdate;
            a.edate = i.edate;
            $(".edit-price").remove()
        });
        a.$watch("selected.date", function (e, t) {
            if (e != t) {
                var i = a.getParam();
                a.sdate = i.sdate;
                a.edate = i.edate
            }
        })
    }]);
    v.controller("mainContainerQRcode", ["$scope", "$q", "$timeout", function (e, t, a) {
        var i = s.aduid || "", r = "congrat_passed_" + i, o = n.localStorage.getItem(r) || 0;
        if (o) {
            return
        }
        e.$watch("showQRcode", function (e, t) {
            if (e != t) {
                if (e) {
                    QZFL.maskLayout(999, null, {opacity: .7})
                } else {
                    QZFL.maskLayout.remove()
                }
            }
        });
        n.getWXQrcode($("#qr_tip_1st"), "ATALS-2001");
        var d = t.defer(), c = t.defer(), l = s.status == 1;
        t.all([d.promise, c.promise]).then(function (t) {
            if (t[0] == 0 && t[1] == 0 && l) {
                a(function () {
                    e.showQRcode = true;
                    n.localStorage.setItem(r, 1)
                }, 50)
            }
        });
        e.hideTips = function () {
            e.showQRcode = false
        };
        e.gotoPage = function (e) {
            h.toPage(e || "account/info")
        };
        e.$on("getAccoutDataForTips", function (e, t) {
            var a = t && t.accounts || [];
            var i = 0;
            a.slice(0, 2).forEach(function (e) {
                i += e.balance
            });
            d.resolve(i)
        });
        e.$on("getOrdersDataForTips", function (e, t) {
            c.resolve(t && t.length)
        })
    }]);
    return m
});
define("js/controller/index.all", ["require", "jquery", "angular", "js/config/comm", "utils", "js/config/comm", "js/modules/common", "js/modules/beautyui", "js/modules/chart", "js/modules/accountstat", "js/modules/simulateui", "js/modules/account", "js/services/index", "aduser", "js/modules/report", "js/config/report"], function (require) {
    var $ = require("jquery"), e = require("angular"), t = require("js/config/comm"), a = require("utils"),
        i = require("js/config/comm"), r = require("js/modules/common"), o = require("js/modules/beautyui"),
        s = require("js/modules/chart"), n = require("js/modules/accountstat"), d = require("js/modules/simulateui"),
        c = require("js/modules/account"), l = require("js/services/index"), u = require("aduser"),
        f = require("js/modules/report"), p = "indexAllApp", g = e.module(p, []), m = require("js/config/report");
    g.controller("allOrderController", ["$scope", function (e) {
        var p = t.REPORT.getChartFields(), g = t.REPORT.fields, h = [];
        for (var v = 0, w = p.length; v < w; v++) {
            h.push({value: p[v], name: g[p[v]].label})
        }
        e.reportList = h;
        if (c.isYYBKAAduser()) {
            e.tip = "（以下数据会有超过三十分钟的统计延迟）"
        } else {
            e.tip = "（以下数据有近三十分钟的统计延迟）"
        }
        var x = function () {
            $("#allOrderDate").removeClass("none");
            $("#allOrderAxisLeft").removeClass("none");
            $("#allOrderAxisRight").removeClass("none");
            d.showChosenSelect("#allOrderDate", {width: "140px", alwaysChosen: true});
            d.digestChosen("#allOrderDate", function (t) {
                t = parseInt(t) || 0;
                e.selected.date = t;
                e.$digest()
            });
            d.showChosenSelect("#allOrderAxisLeft", {width: "145px", alwaysChosen: true});
            d.digestChosen("#allOrderAxisLeft", function (t) {
                t = t + "";
                e.selected.axisLeft = t;
                e.$digest()
            });
            d.showChosenSelect("#allOrderAxisRight", {width: "145px", alwaysChosen: true});
            d.digestChosen("#allOrderAxisRight", function (t) {
                t = t + "";
                e.selected.axisRight = t;
                e.$digest()
            })
        };
        var b = function () {
            l.getAdstatic({}, function (t) {
                var a = {};
                if (t && t.ret === 0) {
                    a = t.data || {};
                    e.staticsData = a;
                    if (a.failedaudit > 0 || a.increment > 0 || a.onlinead > 0 || a.unaudit > 0) {
                        c.setNotFirstCreateAdSign()
                    }
                } else {
                    e.staticsData = {};
                    o.showLoadError("orderstatics", function () {
                        location.reload()
                    })
                }
                e.$digest()
            }, function () {
                o.showLoadError("orderstatics", function () {
                    location.reload()
                })
            })
        };
        var y = function () {
            e.diagnosisData = {};
            e.diagnosisData.is_show = false;
            l.getAddiagnosis(function (t) {
                if (t && t.ret === 0) {
                    e.diagnosisData = t.data;
                    new f.WriteLog({invoice_id: "" + Math.floor((new Date).getTime() / 1e3) + u.aduid}).send({
                        action_flag: 1,
                        operate_type: 6,
                        abnormal_ad_num: t.data.abnormal_aid_num || "",
                        potential_ad_num: t.data.potential_aid_num || ""
                    })
                } else {
                    e.diagnosisData = {};
                    e.diagnosisData.is_show = false
                }
                e.$digest()
            }, function () {
                e.diagnosisData = {};
                e.diagnosisData.is_show = false
            })
        };
        var A = function () {
            var t = [], a = function (e) {
                var a = false;
                e = e || "";
                for (var i = 0, r = t.length; i < r; i++) {
                    if (t[i] && t[i]["appid"] == e) {
                        a = t[i];
                        break
                    }
                }
                return a
            }, i = function (e) {
                var a = "";
                e = e || {};
                a = e["appid"] || "";
                if (!a) {
                    return t
                }
                for (var i = 0, r = t.length; i < r; i++) {
                    if (t[i] && t[i]["appid"] == a) {
                        t[i] = e;
                        break
                    }
                }
                return t
            };
            l.getKAAppList({}, function (a) {
                if (a && a.ret == 0) {
                    t = a.data && a.data.applist ? a.data.applist : [];
                    e.applist = t;
                    e.$digest();
                    if (t.length > 0) {
                        $("#datalist").off("mouseenter").on("mouseenter", "table tr", function () {
                            $(this).find("a.editbt").css("visibility", "visible")
                        }).off("mouseleave").on("mouseleave", "table tr", function () {
                            $(this).find("a.editbt").css("visibility", "hidden")
                        })
                    }
                } else {
                    r.showMsgbox(a.msg || "获取APP列表失败", 5)
                }
            }, function (e) {
                r.showMsgbox(e.msg || "获取APP列表失败", 5)
            });
            e.editPrice = function (t, o) {
                var s = 0, n = {};
                o = o || "";
                n = a(o);
                if (!o || !n) {
                    return false
                }
                s = n["price"];
                r.setPrice({
                    event: t, price: (s / 100).toFixed(2), ok: function (t, a) {
                        var d = parseFloat(t) || 0, c = 0, u = [];
                        u = t.match(/\./g) || [];
                        if (!/^[0-9|\.]+$/.test(t) || u.length > 1) {
                            r.showMsgbox("请输入合法的出价");
                            return false
                        }
                        if (d <= 0) {
                            r.showMsgbox("出价不能小于或等于0");
                            return false
                        }
                        if (d > 1e12) {
                            r.showMsgbox("出价过大");
                            return false
                        }
                        c = Math.round(d * 100) || 0;
                        if (c == s) {
                            r.showMsgbox("出价没有改变");
                            $(a).find("._cancel").trigger("click");
                            return false
                        }
                        l.setKAAppPrice({appid: o, price: c}, function (t) {
                            if (t && t.ret == 0) {
                                n["price"] = c;
                                e.applist = i(n);
                                e.$digest();
                                r.showMsgbox(t.data && t.data.msg || "出价成功", 4)
                            } else {
                                r.showMsgbox(t.msg || "设置App出价失败", 5)
                            }
                            $(a).find("._cancel").trigger("click")
                        }, function (e) {
                            $(a).find("._cancel").trigger("click");
                            r.showMsgbox(e.msg || "设置App出价失败", 5)
                        })
                    }, cancel: function () {
                    }
                });
                return false
            }
        };
        var C = function () {
            var t = e.getParam(), a = {};
            var i = function (e, t) {
                var a = [], i = [], o = 0, s = 0, n = 100, d = 0, c = 0;
                e = e || "";
                t = t || [];
                if (!e || t.length < 1) {
                    return a
                }
                d = 0;
                for (c = t.length; d < c; d++) {
                    o = parseFloat(t[d][e]) || 0;
                    i.push(o)
                }
                i = i.sort(function (e, t) {
                    return e > t ? -1 : 1
                });
                d = 0;
                for (c = i.length; d < c; d++) {
                    for (var l = 0, u = t.length; l < u; l++) {
                        o = parseFloat(t[l][e]) || 0;
                        if (o == i[d] && (typeof t[l]["isPushed"] == "undefined" || !t[l]["isPushed"])) {
                            a.push($.extend(true, {}, t[l]));
                            t[l]["isPushed"] = true;
                            break
                        }
                    }
                }
                var f = ["viewcount", "validclickcount", "cost"], p = function (t, a) {
                    var i = t, r = "";
                    if (i > 1e10) {
                        i = (i / 1e8).toFixed(2);
                        r = "亿"
                    }
                    if (i > 1e7) {
                        i = parseInt(i / 1e4);
                        r = "万"
                    }
                    a[e] = i;
                    a["Quantity"] = r
                };
                $.each(a, function (t, a) {
                    if ($.inArray(e, f) > -1) {
                        p(a[e], a)
                    }
                });
                a = r.listdataFormater(a);
                s = i[0];
                if (s == 0) {
                    a[0]["width"] = "0%"
                } else {
                    a[0]["width"] = n + "%"
                }
                d = 1;
                for (c = i.length; d < c; d++) {
                    a[d]["width"] = (parseFloat(i[d] / s * n) || 0).toFixed(2) + "%"
                }
                d = 0;
                for (c = a.length; d < c; d++) {
                    a[d]["value"] = a[d][e];
                    a[d]["keyvalue"] = i[d];
                    if (typeof a[d]["Quantity"] == "undefined") {
                        a[d]["Quantity"] = ""
                    }
                }
                return a
            };
            var s = function (e, a, r) {
                var o = "";
                e = e || "";
                a = a || [];
                r = r || {};
                if (a.length > 0) {
                    o = '<ul class="toplist ' + r.className + '">';
                    a = i(e, a);
                    for (var s = 0, n = a.length; s < n; s++) {
                        o += function (a) {
                            return ['<li data-keyvalue="' + a["keyvalue"] + '" data-key="' + e + '">', '<span class="name"><a href="report/order?oid=' + a["orderid"] + "&sdate=" + t.sdate + "&edate=" + t.edate + '" title="' + a["ordername"] + '" data-hottag="' + r.hottag + '">' + a["ordername"] + "</a></span>", '<span class="num ' + e + '" style="width:40%; background:none;">', '<span class="numbg" style="width:' + a["width"] + "; height:100%; display:inline-block; position:relative; background:" + r.bgColor + '">', '<span style="padding-left:8px;white-space:nowrap;">' + a["value"] + a["Quantity"] + "</span>", '<span class="numtips none"></span>', "</span>", "</span>", "</li>"].join("")
                        }(a[s])
                    }
                    o += "</ul>"
                } else {
                    o = '<p class="nodata"><i class="ico ico-data"><i></i></i>暂无数据</p>'
                }
                return o
            };
            var n = function (t) {
                e.viewcountList = s("viewcount", t.viewcount || [], {
                    className: "toplist-color-a",
                    bgColor: "#d3e7fb",
                    hottag: "homepage.ranking.view"
                });
                e.validclickcountList = s("validclickcount", t.validclickcount || [], {
                    className: "toplist-color-b",
                    bgColor: "#d3fbe5",
                    hottag: "homepage.ranking.click"
                });
                e.ctrList = s("ctr", t.ctr || [], {
                    className: "toplist-color-a",
                    bgColor: "#d3e7fb",
                    hottag: "homepage.ranking.clickrate"
                });
                e.costList = s("cost", t.cost || [], {
                    className: "toplist-color-b",
                    bgColor: "#d3fbe5",
                    hottag: "homepage.ranking.cost"
                });
                e.$digest();
                $("#orderofWrap").off("mouseover").on("mouseover", ".num", function () {
                    var e = $(this), t = e.find(".numtips"), a = $(window), i = e.closest("li"),
                        r = parseInt(i.attr("data-keyvalue")) || 0, o = i.attr("data-key") || "", s = T[o] || 0,
                        n = parseInt(e.offset().left) || 0, d = parseInt(e.find(".numbg").width()) || 0,
                        c = parseInt(a.width()) || 0, l = c - n - d, u = -105, f = 130, p = 0, g = "";
                    if (o == "ctr" || r <= 0 && s <= 0) {
                        return false
                    }
                    g = (Math.round(r / s * 1e3) || 0) / 10 + "%";
                    if (l < f) {
                        p = f - l + u
                    } else {
                        p = u
                    }
                    t.css({right: p}).html('<i class="bor-c"><span class="bor-i"></span></i>占比：' + g).removeClass("none")
                }).off("mouseout").on("mouseout", ".num", function () {
                    $(this).find(".numtips").addClass("none")
                })
            };
            var d = function () {
                var e = $("#orderofWrap .data-top5");
                e.find(".nodata, .toplist").addClass("none");
                o.showLoading("viewcountList", {minHeight: "200px"});
                o.showLoading("validclickcountList", {minHeight: "200px"});
                o.showLoading("ctrList", {minHeight: "200px"});
                o.showLoading("costList", {minHeight: "200px"})
            };
            var c = function () {
                var e = $("#orderofWrap .data-top5");
                e.find(".nodata, .toplist").removeClass("none");
                o.hideLoading("viewcountList", {minHeight: "200px"});
                o.hideLoading("validclickcountList", {minHeight: "200px"});
                o.hideLoading("ctrList", {minHeight: "200px"});
                o.hideLoading("costList", {minHeight: "200px"})
            };
            d();
            a = {pagesize: 5, sdate: t.sdate, edate: t.edate, format: t.format, period: t.period};
        };
        var j = null;
        var D = function () {
            var t = e.list || [], r = $.extend(true, {}, t), n = e.getParam(), d = n.searchact.split("|"), c;
            c = {
                title: "",
                showFileds: d,
                fieldNameMap: i.REPORT.fieldsNameMapping,
                percentFields: i.REPORT.percentFields,
                percentFieldsNeedMultiply100: false,
                target: $("#_allChartWrap"),
                startDate: n.sdate,
                pointMouseOver: function () {
                },
                extraHighchartsOptions: {tooltip: {shared: "true", crosshairs: "true"}}
            };
            try {
                clearTimeout(j);
                j = setTimeout(function () {
                    o.hideLoading("_allChartWrap", 3e3);
                    s.highchart.create({list: r}, c).chart;
                    $(window).trigger("resize")
                }, 200)
            } catch (u) {
            }
            if (!l._report.antiDouble) {
                a.stat.monitorPage.mark(2);
                l.checkReport();
                l._report.antiDouble = true
            }
        };
        var T = {};
        var k = function () {
            var t = e.getParam();
            $("#_allChartWrap").html("");
            o.showLoading("_allChartWrap", 3e3);
            e.$emit("resetTotal", {});
        };
        e.$watch("orderid", function (t) {
            if (!t) {
                var a = e.selected || {}, i = a.axisLeft || "", r = a.axisRight || "";
                if (c.isYYBKAAduser()) {
                    if (i && $.inArray(i, m.YYBKA_Fields) < 0) {
                        e.selected.axisLeft = m.YYBKA_Fields[0]
                    }
                    if (r && $.inArray(r, m.YYBKA_Fields) < 0) {
                        e.selected.axisRight = m.YYBKA_Fields[1]
                    }
                }
                //_();
                if (c.isYYBKAAduser()) {
                    A()
                }
                b();
                k();
                C();
                y()
            }
        });
        e.$watch("selected.date", function (t, a) {
            if (t != a && !e.orderid) {
                k();
                C();
                r.localStorage.setItem("indexDate", t)
            }
        });
        e.$watch("selected.axisLeft", function (t, a) {
            if (t != a && !e.orderid) {
                D()
            }
        });
        e.$watch("selected.axisRight", function (t, a) {
            if (t != a && !e.orderid) {
                D()
            }
        })
    }]);
    return p
});
define("js/controller/index.order", ["require", "jquery", "angular", "js/config/comm", "js/services/index", "js/modules/common", "js/modules/simulateui", "js/modules/beautyui", "js/modules/validator", "js/modules/chart", "utils", "js/modules/helper", "js/modules/timeutil", "js/config/report", "js/modules/sideslide", "js/modules/account", "js/config/env"], function (require) {
    var $ = require("jquery"), e = require("angular"), t = require("js/config/comm"), a = require("js/services/index"),
        i = require("js/modules/common"), r = require("js/modules/simulateui"), o = require("js/modules/beautyui"),
        s = require("js/modules/validator"), n = require("js/modules/chart"), d = require("utils"),
        c = require("js/modules/helper"), l = require("js/modules/timeutil"), u = require("js/config/report"),
        f = require("js/modules/sideslide"), p = require("js/modules/account"), g = require("js/config/env"),
        m = "indexOrderApp", h = e.module(m, []);
    h.controller("oneOrderController", ["$scope", function (e) {
        e.config = t;
        var m = t.REPORT.getChartFields(true), h = t.REPORT.fields, v = [];
        for (var w = 0, x = m.length; w < x; w++) {
            v.push({value: m[w], name: h[m[w]].label})
        }
        e.reportList = v;
        var _ = function () {
            var e = $("#effects"), t = e.find(".ad-detail"), a = e.find(".adtrend"), i = 0;
            if (a.length > 0) {
                i = parseInt(e.width() - t.outerWidth() - 2) || 0;
                if (i > 0) {
                    a.css("width", i)
                }
            }
        };
        $(window).on("resize", _);
        function b() {
            if (typeof e.orderData == "undefined") {
                return false
            }
            var t = e._orderInfo, a = e.confLinkType, i = e.orderData, r = i.edit_enabled, o = i.edit_price_enabled;
            var s = t.link_type != a.APP_TASK && t.link_type != a.MOB_TASK && t.status != 20;
            var n = typeof i.edit_price_enabled != "undefined" ? s && o : s && typeof r != "undefined" && r;
            return n
        }

        e.operaOrderStatus = function () {
            var r = e.orderInfo, o = {
                10: {label: "暂停", className: "", title: "点击启用"},
                1: {label: "启用", className: "status-btn-open", title: "点击暂停"}
            }, s = function (e, a) {
                e = e || 0;
                a = a || 0;
                var i = "";
                if (a == 10) {
                    i = "暂停中"
                } else {
                    i = t.ENV.ostatetip[e] ? (e >= 41 && e <= 45 ? "未投放" : "投放中") + "（" + t.ENV.ostatetip[e] + "）" : t.ENV.statelist[e]["label"]
                }
                return i
            }, n = function (e) {
                var t = e;
                if (t == 1) {
                    t = 10
                } else {
                    t = 1
                }
                return t
            };
            e.showOperaStatusBtn = !(r.status == 0 || r.status == 2 || r.status == 3 || r.status == 13 || r.status == 20) && (typeof r.edit_enabled != "undefined" && r.edit_enabled);
            e.statusParam = o;
            e.statusKey = r.raw_status == 1 ? 1 : 10;
            e.statusText = s(r.status, r.raw_status);
            e.operaStatus = function () {
                var t = e.statusKey;
                t = n(t);
                e.statusKey = t;
                a.setStatus({aid: r.orderid, status: t}, function (a) {
                    if (a && a.ret == 0) {
                        e.statusText = s(a.data.status, t)
                    } else {
                        e.statusKey = n(t);
                        i.showMsgbox(a.msg || "修改状态失败", 5)
                    }
                    e.$digest()
                }, function (a) {
                    e.statusKey = t;
                    e.$digest();
                    i.showMsgbox(a.msg || "修改状态失败", 5)
                })
            }
        };
        e.changePrice = function (t) {
            var r = e._orderInfo, o = r.optimization_goal > 0 && r.is_support_optimization_goal == 1,
                n = (o ? r.bid_amount : r.price) || "", d = e.orderid || "", c = "price_" + d,
                l = o ? g.confOptimizationGoalTypeDef[r.optimization_goal] : g.confPriceUnitMap[r.cost_type],
                u = '价格&nbsp;<input type="text" class="_val _editprice form-control price-in " id="' + c + '" value="' + (n + "").replace(/,/g, "") + '" data-editType="single"><span class="c-tx3">元/' + l + "</span>",
                f = "Click.QucikEdit.Atlas.HomePage.EditAdBid";
            if (e.orderData.phoenix_enabled) {
                f = f.replace("Atlas", "Phoenix")
            }
            i.modifier.slab(t.target, u, function () {
                var t = $("#" + c).val(), n = s.priceValidate(t, undefined), l = {settype: "feeprice", aid: d};
                if (n.msg && n.type != "warning") {
                    i.showMsgbox(n.msg, 5);
                    return false
                }
                if (o) {
                    l.settype = "bid_amount";
                    l.bid_amount = t
                } else {
                    l.settype = "feeprice";
                    l.feeprice = t
                }
                a.setInfo(l, function (a) {
                    if (a.ret === 0) {
                        if (o) {
                            r.bid_amount = t;
                            e.orderData.bid_amount = parseFloat(t) || 0
                        } else {
                            r.price = t;
                            e.orderData.feeprice = t;
                            e.orderData.cost_price = parseFloat(t) || 0
                        }
                        e._orderInfo = r;
                        i.showMsgbox("修改出价成功", 4)
                    } else {
                        e._orderInfo = r;
                        i.showMsgbox(a.msg || "修改出价失败", 5)
                    }
                    e.$digest()
                })
            }, function () {
            });
            $(document.body).on("click", function (e) {
                var t = e.target;
                if ($(t).parents(".edit-price").length === 0 && $(t).parents(".limit-inner").length === 0) {
                    $(".edit-price ._cancel").trigger("click")
                }
            });
            i.reportHottag(f)
        };
        e.editOrder = function () {
            var a = e.orderData || e.orderInfo || {}, r = parseInt(a.campaignid) || 0, o = r > 0 ? "&cid=" + r : "",
                s = t.ENV.ROOT + "order/edit?oid=" + e.orderid + o, n = "Click.Entrance.Atlas.HomePage.Edit";
            if (a.phoenix_enabled) {
                s = t.ENV.phoenixOrderEditPage + "?from=indexpage&id=" + e.orderid;
                window.open(s);
                n = n.replace("Atlas", "Phoenix")
            } else {
                f.sideslide(s, {iframe: true})
            }
            i.reportHottag(n);
            return false
        };
        function y(e) {
            var t;
            if (typeof e.parsed_target_def != "undefined") {
                if (e.parsed_target_def.length > 0) {
                    t = "<li>" + e.parsed_target_def.shift(0) + "</li>";
                    t += "<li>" + e.parsed_target_def.join("</li><li>") + "</li>"
                } else {
                    t = "<li>全量用户</li>"
                }
            } else {
                t = c.getOrderTargetStr($.extend({}, e, e.userrules), function () {
                }, e)
            }
            return t
        }

        function A(e) {
            if (e.timeset == l.makeFullTimeStr()) {
                return "<ul><li>全部时间点</li></ul>"
            } else {
                return ("<ul><li>" + l.getTimeReadArr(l.timeStrToArr(e.timeset)).join("</li><li>") + "</li></ul>").replace(/<span>/g, "").replace(/<\/span>/g, "")
            }
        }

        function C(e) {
            var t = "";
            var a = "";
            if (e.sdate == e.edate) {
                a = e.sdate.split("-");
                t = "日期：" + a[1] + "/" + a[2]
            } else {
                a = e.sdate.split("-");
                t = "日期：" + a[1] + "-" + a[2];
                a = e.edate.split("-");
                t += "到" + a[1] + "-" + a[2]
            }
            return t
        }

        function j(e) {
            if (e.linktype == 4) {
                e.orderlink = "http://user.qzone.qq.com/" + e.linktarget
            } else if (e.linktype == 3) {
                e.orderlink = null
            } else if (e.linktype == t.ENV.LINKTYPE_QQGROUP) {
                e.orderlink = 'javascript:;" onclick="return false'
            } else if (e.linktype == t.ENV.LINKTYPE_APP && e.linktarget) {
                e.orderlink = "http://www.myapp.com/appdetail/a/" + e.linktarget + "?"
            } else {
                e.orderlink = e.orderlink || e.pkgurl || e.linktarget
            }
        }

        function D(e) {
            var a = [], i = {};
            if (e.crt_version == 2) {
                return e.crt_name
            }
            if (e.crt_type) {
                i = e
            } else {
                $.each(e, function (e, a) {
                    if (a.status != t.ENV.STATUS_DELETED) {
                        i = a;
                        return false
                    }
                })
            }
            if (i.status == t.ENV.STATUS_DELETED) {
                return ""
            }
            if (!(i.crt_type && t.confCrttypeNameMapping[i.crt_type])) {
                return i.crt_name
            }
            if (i.img_width != 0) {
                a.push(i.img_width + "px × " + i.img_height + "px")
            }
            if ($.inArray(i.crt_type, [t.ENV.FORMTYPE_EXPANDABLE]) > -1 && i.ext_img_width) {
                a.push(" + ");
                a.push(i.ext_img_width + "px × " + i.ext_img_height + "px")
            }
            a.push(" " + t.confCrttypeNameMapping[i.crt_type]);
            return a.join(" ")
        }

        function T(e) {
            var t = [], a;
            if (e.creatives) {
                $.each(e.creatives, function (e, a) {
                    var i = D(a);
                    i && t.push(i)
                })
            } else {
                a = D(e);
                a && t.push(a)
            }
            return t.join("、")
        }

        function k() {
            $("#oneOrderDate").removeClass("none");
            $("#oneOrderAxisLeft").removeClass("none");
            $("#oneOrderAxisRight").removeClass("none");
            r.showChosenSelect("#oneOrderDate", {width: "140px", alwaysChosen: true});
            r.digestChosen("#oneOrderDate", function (t) {
                t = parseInt(t) || 0;
                e.selected.date = t;
                e.$digest()
            });
            r.showChosenSelect("#oneOrderAxisLeft", {width: "145px", alwaysChosen: true});
            r.digestChosen("#oneOrderAxisLeft", function (t) {
                t = t + "";
                e.selected.axisLeft = t;
                e.$digest()
            });
            r.showChosenSelect("#oneOrderAxisRight", {width: "145px", alwaysChosen: true});
            r.digestChosen("#oneOrderAxisRight", function (t) {
                t = t + "";
                e.selected.axisRight = t;
                e.$digest()
            })
        }

        function O(e) {
            var t = ["#697489", "#DF4B3B", "#7CAA14", "#327DB1", "#F28B33", "#A8CA1F", "#9C74FC", "#E4BC2D", "#6ACE9E", "#D98BFE", "#D6729F"];
            var a = t.length;
            return t[(e + 1) % a]
        }

        function L(e, t) {
            e = e || {};
            var a = 0, i = $("#picsize"), r = $("#effects");
            t = t || i.find("._sucaibuttons");
            if (e.creatives_rpt && e.creatives_rpt.length > 1) {
                $.each(e.creatives_rpt, function (e, i) {
                    var r = O(a);
                    var o = $("<li></li>").attr("data-color", r).attr("data-tid", i.tid);
                    var s = $("<a></a>").attr("href", "javascript:;").text(i.tname).css({
                        "word-wrap": "break-word",
                        "word-break": "break-all"
                    });
                    var n = $("<span></span>").addClass("choosesize-tri");
                    o.addClass("sucaiItemBtn");
                    o.append([s, n, $('<i class="ico-choosesize"></i>')]).appendTo(t);
                    a += 1
                });
                t.find("li").removeClass("on").removeClass("picsize1").eq(0).addClass("on").addClass("picsize1");
                t.show()
            } else {
                t.hide()
            }
            var o = r.find(".adtrend"), s = o.find(".chosen-container").length > 0 ? true : false;
            r.find(".ad-detail").css({"min-height": o.height() + (s ? 0 : 30)})
        }

        function S() {
            $("#picsize").find("._sucaibuttons li a").off("click").on("click", function () {
                $(this).closest("ul").find("li").removeClass("on").removeClass("picsize1");
                $(this).closest("li").addClass("on").addClass("picsize1");
                e.showSucaiChart()
            })
        }

        function F() {
            var e = [];
            $("#picsize").find("._sucaibuttons li.on").each(function () {
                e.push($(this).attr("data-tid"))
            });
            if (e.length < 1) {
                e.push("all")
            }
            return e
        }

        var P = null;
        e.showSucaiChart = function () {
            var r = e.getParam(), s = r.searchact.split("|"), c = F();
            window.charts = [];
            var l = {
                targetDom: $("#_oneChartWrap"),
                cgiParams: r,
                selectedTids: c,
                field: s[0],
                field2: s[1],
                orderid: r.orderid
            };
            var u = true, f = null;
            var g = l.selectedTids;
            var m = l.field;
            var h = l.targetDom;
            var v = l.cgiParams;
            var w = l.orderId || v.orderid;
            var x = a.getAllSucaiData();
            var b = [];
            var y = null;
            var A = {}, C = [];
            var j = function () {
                $("#_oneChartWrap").find(".highcharts-container").addClass("none");
                _();
                o.showLoading("_oneChartWrap", 3e3)
            };
            var D = function () {
                $("#_oneChartWrap").find(".highcharts-container").removeClass("none");
                _();
                o.hideLoading("_oneChartWrap", 3e3)
            };
            j();
            e.getTotal();
            $.each(g, function (e, t) {
                var i = "" + w + "_" + t;
                if (!a.getSucai(i)) {
                    f = t;
                    u = false;
                    return false
                }
            });
            v = v || r;
            $.each(g, function (e, t) {
                b.push("" + w + "_" + t)
            });
            y = h;
            C = x && x[b] ? x[b].data : [];
            A = {
                dataType: "一个位置的多指标图",
                target: y,
                showFileds: s,
                xAxisField: v.sdate == v.edate && !p.isYYBKAAduser() ? "time" : "statsdate",
                showFieldsOpts: {tids: b, field: m},
                fieldNameMap: t.REPORT.fieldsNameMapping,
                percentFields: t.REPORT.percentFields,
                percentFieldsNeedMultiply100: false,
                title: "",
                startDate: v.sdate,
                extraHighchartsOptions: {tooltip: {shared: "true", crosshairs: "true"}}
            };
            try {
                clearTimeout(P);
                P = setTimeout(function () {
                    D();
                    n.highchart.create({list: C}, A);
                    $(window).trigger("resize")
                }, 200)
            } catch (T) {
            }
            if (!a._report.antiDouble) {
                d.stat.monitorPage.mark(2);
                a.checkReport();
                a._report.antiDouble = true
            }
        };
        e.$watch("orderid", function (t, r) {
            if (t != r && t) {
                var o = e.selected || {}, s = o.axisLeft || "", n = o.axisRight || "";
                if (p.isYYBKAAduser()) {
                    if (s && $.inArray(s, u.YYBKA_Order_Fields) < 0) {
                        e.selected.axisLeft = u.YYBKA_Order_Fields[0]
                    }
                    if (n && $.inArray(n, u.YYBKA_Order_Fields) < 0) {
                        e.selected.axisRight = u.YYBKA_Order_Fields[1]
                    }
                }
                var d = t, c = a.getOrderInfo(d) || {}, l = $.extend(true, {}, c);
                e.orderInfo = c;
                e._orderInfo = i.listdataFormater([l])[0] || {};
                e.operaOrderStatus();
                e.getOrderInfoRule();
                e.getSucaiButton();
                e.showSucaiChart();
                e.getTotal();
                _()
            }
        });
        e.$watch("selected.date", function (t, r) {
            if (t != r && e.orderid) {
                i.localStorage.setItem("indexDate", t);
                a.clearAllSucaiData();
                e.showSucaiChart()
            }
        });
        e.$watch("selected.axisLeft", function (t, a) {
            if (t != a && e.orderid) {
                e.showSucaiChart()
            }
        });
        e.$watch("selected.axisRight", function (t, a) {
            if (t != a && e.orderid) {
                e.showSucaiChart()
            }
        });
        e.$watch("orderData", function (t, a) {
            if (t != a && e.orderid) {
                e.isEditPriceEnabled = b()
            }
        })
    }]);
    return m
});
define("js/services/index", ["require", "jquery", "angular", "utils", "js/config/accounttype", "js/modules/common", "js/services/common", "js/services/account"], function (require) {
    var $ = require("jquery"), e = require("angular"), t = require("utils"), a = require("js/config/accounttype"),
        i = require("js/modules/common"), r = require("js/services/common"), o = require("js/services/account"),
        s = r.loader, n = r.sender, d = {};
    var c = a.accountTypeConfig, l = a.accountTypeDef;
    var u = 6e4;
    var f = {
        getList: s("report", "adlist", {base: "/ec/api.php?mod={mod}&act={act}"}),
        getAdstatic: s("account", "adstatic", {base: "/ec/api.php?mod={mod}&act={act}", ozid: 400400}),
        getAddiagnosis: s("utilities", "getaddiag", {base: "/ec/api.php?mod={mod}&act={act}"}),
        getAdgroupdetail: s("report", "adgroupdetail", {base: "/ec/api.php?mod={mod}&act={act}", ozid: 400410}),
        getSummary: s("report", "summary", {base: "/ec/api.php?mod={mod}&act={act}", ozid: 400407}),
        getById: s("order", "info", {
            base: "/ec/api.php?mod={mod}&act={act}",
            cache: false,
            cacheMedia: "memory",
            cacheExpire: u,
            ozid: 400418
        }),
        setInfo: n("order", "setinfo", {base: "/ec/api.php?mod={mod}&act={act}", ozid: 400421}),
        setStatus: n("order", "setstatus", {base: "/ec/api.php?mod={mod}&act={act}", ozid: 400422}),
        getCrtall: s("report", "getcrt", {base: "/ec/api.php?mod={mod}&act={act}"}),
        getCrtone: s("report", "getcrtsizedetail", {base: "/ec/api.php?mod={mod}&act={act}"}),
        getadgrouptop: s("report", "getadgrouptop", {base: "/ec/api.php?mod={mod}&act={act}", ozid: 400407}),
        getkaapplist: s("product", "getkaapplist", {base: "/ec/api.php?mod={mod}&act={act}"}),
        setkaappprice: n("product", "setkaappprice", {base: "/ec/api.php?mod={mod}&act={act}"})
    };
    var p = {};
    d.indexOrder = function (t) {
        t = t || {};
        e.forEach(t, function (e) {
            p[e.orderid] = e
        })
    };
    d.getOrderInfo = function (e) {
        return p[e]
    };
    d.setOrderInfo = function (e, t) {
        t = t || {};
        var a = p[e] || false;
        if (a) {
            for (var i in t) {
                a[i] = t[i]
            }
        }
    };
    d.loadOrderlist = function (e, t) {
        var a = QZFL.string.timeFormatString(i.getTime(), "{Y}-{M}-{d}"), o = {
            status: 999,
            page: 1,
            sdate: a,
            edate: a,
            searchname: "",
            reportonly: 0,
            pagesize: 20,
            isHours: false
        };
        o = r.setTimeRpt(o);
        f.getList(function (t) {
            if (t.ret == 0) {
                d.indexOrder(t.data.list)
            }
            e(t)
        }, {data: o, error: t})
    };
    d.getAccountInfo = function (e, t) {
        o.getDashboard(function (t) {
            t = t || {};
            t.data = t.data || {};
            t.data.getClsPrefix = function (e) {
                return e in c ? c[e].clsPrefix : c[l.CASH].clsPrefix
            };
            t.data.getFontCls = function (e) {
                return e in c ? c[e].fontCls : c[l.CASH].fontCls
            };
            t.data.getTips = function (e) {
                return e in c ? c[e].tips : ""
            };
            t.data.isSpecialAccount = function (e) {
                return e == 2
            };
            e(t)
        }, {data: {}, loading: {container: "useraccount", timeout: 3e3}, error: t, reload: true})
    };
    d.getAdstatic = function (e, t, a) {
        e = e || {};
        f.getAdstatic(function (e) {
            t(e)
        }, {data: e, error: a})
    };
    d.getAddiagnosis = function (e, t) {
        f.getAddiagnosis(function (t) {
            e(t)
        }, {data: {}, error: t})
    };
    d.getAdgroupdetail = function (e, t, a) {
        e = r.setTimeRpt(e);
        f.getAdgroupdetail(function (e) {
            t(e)
        }, {data: e, error: a})
    };
    d.getSummary = function (e, t, a) {
        e = e || {};
        e = r.setTimeRpt(e);
        f.getSummary(function (e) {
            t(e)
        }, {data: e, error: a})
    };
    d.getadgrouptop = function (e, t, a) {
        e = r.setTimeRpt(e);
        f.getadgrouptop(function (e) {
            t(e)
        }, {data: e, error: a})
    };
    d.getKAAppList = function (e, t, a) {
        f.getkaapplist(function (e) {
            t(e)
        }, {data: e, error: a})
    };
    d.setKAAppPrice = function (e, t, a) {
        f.setkaappprice(function (e) {
            t(e)
        }, {data: e, error: a})
    };
    d._report = {count: 1, antiDouble: false};
    d.checkReport = function () {
        d._report.count++;
        if (d._report.count >= 2) {
            t.stat.monitorPage.report()
        }
    };
    d.getById = function (e, t, a) {
        f.getById(function (e) {
            var a;
            if (e.ret === 0) {
                a = e.data;
                if (a.rruleidlist && a.userrules) {
                    a.userrules.rruleidlist = a.rruleidlist;
                    a.userrules.visittype = a.visittype
                }
                if (a.interactive && a.interactive.interest) {
                    a.interactive.follow = a.interactive.interest
                }
                e.data = r.transformFromCgi(a)
            }
            t(e)
        }, {data: e, error: a})
    };
    d.setInfo = function (e, t, a) {
        e = e || {};
        var i = function () {
            var t = e.aid || 0, a = p[t] || false, i = parseFloat(e.feeprice) || 0;
            if (i > 0 && a) {
                i = i * 100;
                a["price"] = i
            }
        };
        f.setInfo(function (e) {
            t(e);
            if (e && e.ret == 0) {
                i()
            }
        }, {data: e, error: a})
    };
    d.setStatus = function (e, t, a) {
        e = e || {};
        var i = function (t) {
            t = t || {};
            var a = t.status || "", i = e.status || "", r = e.aid || 0, o = p[r] || false;
            if (a && r && o) {
                o["status"] = a;
                o["raw_status"] = i
            }
        };
        f.setStatus(function (e) {
            t(e);
            if (e && e.ret == 0) {
                i(e.data)
            }
        }, {data: e, error: a})
    };
    d.getCrtall = function (e, t, a) {
        e = r.setTimeRpt(e);
        f.getCrtall(function (e) {
            if (e.ret == 0) {
                var a = e.data;
                if (a.list && a.list.length > 0) {
                    a.creatives_rpt = i.listdataFormater(a.list)
                }
            }
            t(e)
        }, {data: e, error: a})
    };
    var g = {};

    function m(e, t, a, r, o) {
        var s = $("#picsize");
        var n = t;
        var d = $.extend(true, {}, n.data.list);
        d = i.listdataFormater(d);
        d = i.chartdataFormater(d);
        var c = r.orderId || o;
        var l = "" + c + "_" + e;
        g[l] = {
            name: s.find('._sucaibuttons li[data-tid="' + e + '"] a').text(),
            data: d,
            color: s.find('._sucaibuttons li[data-tid="' + e + '"]').attr("data-color")
        };
        a && a(r)
    }

    d.getsucaidata = function (e, t, a, i, o) {
        var s = {sdate: e.sdate, edate: e.edate, orderid: e.orderid};
        if (t != "all") {
            s.tid = t
        }
        s = r.setTimeRpt(s);
        f.getCrtone(function (e) {
            if (e.ret == 0) {
                m(t, e, a, i, s.orderid)
            } else {
                o(e)
            }
        }, {data: s})
    };
    d.getSucai = function (e) {
        return g[e] || false
    };
    d.getAllSucaiData = function () {
        return g
    };
    d.clearAllSucaiData = function () {
        g = {};
        return true
    };
    return d
});