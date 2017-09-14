$(function () {
    search(0);
    $("#J_BtnDel").click(function () {
        var ids = getAllId();
        if (ids.length > 0) {
            layer.confirm("确定删除所选择项吗？",
                function () {
                    var page = new pageBar();
                    del(page, ids);
                });
        }
        else {
            layer.alert('请选择要操作的选择项！', 9);
        }
    });

    $("#buttonSearch").click(function () {
        search(1);
    });

    $("#J_BtnFlush").click(function () {
        search(0);
    });

});

function search(ty) {
    var l = layer.load('正在加载数据......');
    var page = new pageBar();
    page.genparams();
    $.ajax({
        type: "POST",
        url: page.search_url,
        data: page.search_params,
        dataType: "json",
        success: function (data) {
            if (typeof data == "string") {
                data = $.parseJSON(data);
            }
            if (data.status == 'n') {
                layer.close(l);
                layer.msg(data.message, 1, 8);
                return;
            }
            loadHtml(page, data, ty);
            Paging(search, $('.paging'), data.paging.total_item, data.paging.current_page, data.paging.page_size);
            layer.close(l);
        },
        error: function () {
            layer.msg("加载列表信息错误", 1, 8);
        }
    });
}

function del(page, id, name) {
    var params = {};
    eval("params." + page.data_id_column + "=id;");
    $.ajax({
        type: "POST",
        url: page.delete_url,
        data: params,
        dataType: "json",
        success: function (data) {
            if (typeof data == "string") {
                data = $.parseJSON(data);
            }
            search(0);
            $(".J_CheckAll")[0].checked = false;
        }
    });
}

//显示列表
function pageBar() {
    this.search_params = {}; // ?前面部分
    this.genparams = function () {
        //组装查询参数对象
        var tmpsearch_param = {};
        jQuery("*[serachkey]").each(function () {
            if (jQuery(this).attr("serachkey") != '') {
                var value = "";
                if ($(this).attr("type") == "checkbox") {
                    if ($(this).attr("checked") == "checked") {
                        eval("value = tmpsearch_param." + jQuery(this).attr("serachkey") + ";");
                        if (value != null && value != "" && value != "undefined") {
                            value += "," + jQuery(this).val();
                        } else {
                            value = jQuery(this).val();
                        }
                        eval("tmpsearch_param." + jQuery(this).attr("serachkey") + "=value;");
                    }
                }
                else {
                    value = jQuery(this).val();
                    eval("tmpsearch_param." + jQuery(this).attr("serachkey") + "=value;");
                }
            }
        });
        //分页用参数
        tmpsearch_param.start = getPageStartNum($('.paging'));
        tmpsearch_param.end = getPageEndNum($('.paging'));
        this.search_params = tmpsearch_param;
    };
    pageBar.prototype.listInfoId = "#listInfo";
    pageBar.prototype.data_id_column = $("table[data-id-column]").attr("data-id-column");
    pageBar.prototype.data_name_column = $("table[data-name-column]").attr("data-name-column");
    pageBar.prototype.search_url = jQuery(this.listInfoId).attr("data-listAjax");
    pageBar.prototype.modify_url = jQuery(this.listInfoId).attr("data-modifyUrl");
    pageBar.prototype.delete_url = jQuery(this.listInfoId).attr("data-delAjax");
}

function loadHtml(page, data, ty) {
    var html = "";
    //var cols = jQuery("colgroup col").size();
    var cols = jQuery(".cgcol").size();
    if (data.statuscode == 10000) {
        var data_id = "";
        var data_name = "";
        $.each(data.data, function (i, v) {
            eval("data_id = v." + page.data_id_column + ";");
            if (page.data_name_column != '')
                eval("data_name =v." + page.data_name_column + ";");
            if (i % 2 == 1)
                html += "<tr class='tb-odd J_Con' ";
            else
                html += "<tr class='J_Con' ";
            html += " data-id='" + data_id + "' data-name='" + data_name + "'>";
            var uid = "";
            jQuery("*[data-type]").each(function () {
                var column_value = "";
                var spanclass_value = "J_tTxt";
                if (typeof(jQuery(this).attr("data-column")) != "undefined" && jQuery(this).attr("data-column") != null)
                    eval("column_value = v." + jQuery(this).attr("data-column"));
                switch (jQuery(this).attr("data-type")) {
                    case "checkbox":
                        html += "<td><input type='checkbox'  id='" + page.data_id_column + "' value='" + data_id + "'/></td>";
                        break;
                    case "value":
                        if (typeof(jQuery(this).attr("data-key")) != "undefined" && jQuery(this).attr("data-key") != null) {
                            uid = column_value;
                        }
                        //转义
                        if (typeof(jQuery(this).attr("data-escape")) != "undefined" && jQuery(this).attr("data-escape") != null) {
                            if (typeof(jQuery(this).attr("data-class")) != "undefined" && jQuery(this).attr("data-class") != null) {
                                var jsonclassdata = $.parseJSON(jQuery(this).attr("data-class"));
                                spanclass_value = jsonclassdata[column_value];
                            }
                            var jsondata = $.parseJSON(jQuery(this).attr("data-escape"));
                            column_value = jsondata[column_value] ? jsondata[column_value] : '--';
                        }

                        if (typeof(column_value) == 'undefined' || column_value == null || column_value == '' && column_value != '0')
                            column_value = "--";
                        html += "<td>";
                        if (String(column_value).indexOf('00:00:00') > 0) {
                            column_value = column_value.substr(0, column_value.indexOf('00:00:00'));
                        }
                        var span_value = '';
                        if (String(column_value).length > 30) {
                            span_value = column_value.substr(0, 30) + '...';
                        } else {
                            span_value = column_value;
                        }
                        html += "<span class='" + spanclass_value + "' title='" + column_value + "' >";
                        //自定义展示
                        if(typeof(jQuery(this).attr("data-con-type")) != "data-con-type" && jQuery(this).attr("data-con-type") != null){
                                switch (jQuery(this).attr("data-con-type")) {
                                    case "array":
                                        if(column_value != '--'){
                                            var data_array = column_value.split(",");
                                            $.each(data_array,function(n,value){
                                                html += "<span style='border: 1px solid #428bca;background-color: #51BD4F;' title='" + value + "' >";
                                                html += value;
                                                html += "</span>&nbsp;&nbsp;";
                                            });
                                        }else{
                                            html += span_value;
                                        }
                                        break;
                                    default:
                                        break;
                                }
                        }else{
                            if (typeof(jQuery(this).attr("data-url")) != "undefined" && jQuery(this).attr("data-url") != null) {
                                eval("var data_url_param = v." + jQuery(this).attr("data-url-param"));
                                html += "<a href='" + jQuery(this).attr("data-url") + "?" + jQuery(this).attr("data-url-param") + "=" + data_url_param + "' target='_blank'>";
                            }
                            html += span_value;
                            if (typeof(jQuery(this).attr("data-url")) != "undefined" && jQuery(this).attr("data-url") != null) {
                                html += "</a>";
                            }
                        }
                        html += "</span>";
                        html += "</td>";
                        break;
                    case "href":
                        html += "<td><a href='" + jQuery(this).attr("data-url") + "?" + page.data_id_column + "=" + data_id + "' class='J_Modi'>" + jQuery(this).attr("data-column-value") + "</a></td>";
                        break;
                    case "operate":
                        if (jQuery(this).attr("onrendering").length > 0) {
                            //执行外部js事件
                            var ret = eval(jQuery(this).attr("onrendering") + "(\"" + data_id + "\")");
                            html = html + ret;
                        }
                        break;
                    case "moreoperate":
                        if (jQuery(this).attr("onrendering").length > 0) {
                            var ret;
                            var data_col = jQuery(this).attr("data-cols");
                            if (data_col != null && data_col.length > 0) {
                                var funcStr = jQuery(this).attr("onrendering") + "('";
                                var cls = data_col.split(",");
                                $(cls).each(function (i, cl) {
                                    eval("funcStr+=v." + cl + ";");
                                    funcStr += "','";
                                });
                                funcStr = funcStr.substr(0, funcStr.length - 3);
                                funcStr += "')";
                                ret = eval(funcStr);
                            } else {
                                //执行外部js事件
                                ret = eval(jQuery(this).attr("onrendering") + "('" + JSON.stringify(v) + "')");
                            }
                            html = html + ret;
                        } else {
                            html += "<td></td>";
                        }
                        break;
                    case "urlValue":
                        if (typeof(jQuery(this).attr("data-escape")) != "undefined" && jQuery(this).attr("data-escape") != null) {
                            if (jQuery(this).attr("data-class") != "undefined" && jQuery(this).attr("data-class") != null) {
                                var jsonclassdata = $.parseJSON(jQuery(this).attr("data-class"));
                                spanclass_value = jsonclassdata[column_value];
                            }
                            var jsondata = $.parseJSON(jQuery(this).attr("data-escape"));
                            column_value = jsondata[column_value];
                        }
                        if (typeof(column_value) == 'undefined')
                            column_value = "";
                        html += "<td>";
                        html += "<span class='" + spanclass_value + "' title='" + column_value + "' >";
                        if (uid == "undefined" && uid == null) {
                            eval("var data_url_param = v." + jQuery(this).attr("data-url-param"));
                            html += "<a href='" + jQuery(this).attr("data-url") + "?" + jQuery(this).attr("data-url-param") + "=" + data_url_param + "' target='_blank'>";
                        } else {
                            html += "<a style='cursor:pointer;' href='javascript:void(0)' onclick='upforward(" + uid + ")'>";
                        }
                        var incr_param = jQuery(this).attr("incr_param");
                        if (typeof(incr_param) != 'undefined' && incr_param != null) {
                            html += column_value + incr_param;
                        } else {
                            html += column_value;
                        }
                        if (typeof(jQuery(this).attr("data-url")) != "undefined" && jQuery(this).attr("data-url") != null) {
                            html += "</a>";
                        }
                        html += "</span>";
                        html += "</td>";
                        break;
                    case "button":
                        html += "<td><input type='button'  data-column='' value='" + column_value + "' onclick='change(&apos;" + data_id + "&apos;);'/></td>";
                        break;
                    default:
                        break;
                }
            });
            html += "</tr>";
        });
        if (html == "") {
            html = "<tr class='nodata'><td colspan='" + cols + "'>";
            if (ty == 0) {
                html += "暂无数据。";
            }
            else {
                html += "没有找到相关数据，请重新输入条件进行查询。";
            }
            html += "</td></tr>";
        }
    } else {
        html = "<tr class='nodata'><td colspan='" + cols + "'>数据加载失败</td></tr>";
    }
    jQuery(page.listInfoId).html(html);
}

$(document).on('click', 'th input:checkbox', function () {
    var that = this;
    $(this).closest('table').find('tr > td:first-child input:checkbox').each(function () {
        this.checked = that.checked;
        $(this).closest('tr').toggleClass('selected');
    });
});

function getAllId() {
    var checkBox = $("#listInfo").find("input:checkbox");
    var Ids = "";
    $.each(checkBox, function (i, v) {
        if (v.checked) {
            Ids += v.value + ",";
        }
    });
    if (Ids.length > 0) {
        Ids = Ids.substring(0, Ids.length - 1);
    }
    return Ids;
}