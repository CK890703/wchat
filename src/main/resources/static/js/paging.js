var PGU = (function (pgu) {
    var objURL = function (url) {
        this.ourl = url || window.location.href;
        this.href = ""; // ?前面部分
        this.params = {}; // url参数对象
        this.jing = ""; // #及后面部分
        this.init();
    }
    // 分析url,得到?前面存入this.href,参数解析为this.params对象，#号及后面存入this.jing
    objURL.prototype.init = function () {
        var str = this.ourl;
        var index = str.indexOf("#");
        if (index > 0) {
            this.jing = str.substr(index);
            str = str.substring(0, index);
        }
        index = str.indexOf("?");
        if (index > 0) {
            this.href = str.substring(0, index);
            str = str.substr(index + 1);
            var parts = str.split("&");
            for (var i = 0; i < parts.length; i++) {
                var kv = parts[i].split("=");
                this.params[kv[0]] = kv[1];
            }
        } else {
            this.href = this.ourl;
            this.params = {};
        }
    }
    // 只是修改this.params
    objURL.prototype.set = function (key, val) {
        this.params[key] = val;
    }
    // 只是设置this.params
    objURL.prototype.remove = function (key) {
        this.params[key] = undefined;
    }
    // 根据三部分组成操作后的url
    objURL.prototype.url = function () {
        var strurl = this.href;
        var objps = []; // 这里用数组组织,再做join操作
        for (var k in this.params) {
            if (this.params[k]) {
                objps.push(k + "=" + this.params[k]);
            }
        }
        if (objps.length > 0) {
            strurl += "?" + objps.join("&");
        }
        if (this.jing.length > 0) {
            strurl += this.jing;
        }
        return strurl;
    }
    // 得到参数值
    objURL.prototype.get = function (key) {
        return this.params[key];
    }
    pgu.URL = objURL;
    return pgu;
}(PGU || {}));

// 总记录数，页显示数目
function Paging(loadDataFunction, pageElement, totalRecord, currentPage, pageSize, extendPages, mustShowPages) {
    var pageHtml = '';
    var totalPageCount = 1;// 总页数
    var pretotal_item = pageElement.attr("totalrecord");
    if (loadDataFunction == undefined) {
        return;
    }
    if (pageElement == undefined) {
        pageElement = $('.paging');
    }
    if (totalRecord == undefined) {
        totalRecord = 0;
    }
    if (currentPage == undefined) {
        currentPage = getCurrentPage(pageElement);
        if (pretotal_item < totalRecord && totalRecord != 0 && pretotal_item != undefined) {
            currentPage = 1;
            $(pageElement).attr("currentPage", currentPage);
            loadDataFunction(1);
        }
    }
    if (pageSize == undefined) {
        pageSize = getPageSize(pageElement);
    }
    if (extendPages == undefined) {
        extendPages = 4; // 以当前页码为中心,两侧允许出现的最多页码数(包含[..]和固定页码),如:[1][2][..][50][51][52(中心)][53][54][..][98][99]
    }
    if (mustShowPages == undefined) {
        mustShowPages = 2; // 在首尾必须显示的页码数,如:[1][2]...[]...[98][99]
    }

    if ((currentPage - 1) * pageSize >= totalRecord && totalRecord != 0) {
        /*        while ((currentPage - 1) * pageSize >= totalRecord) {
         currentPage--;
         }*/
        currentPage = 1;
        $(pageElement).attr("currentPage", currentPage);
        loadDataFunction(1);
    }

    if (parseInt(totalRecord / pageSize) == 0) {
        totalPageCount = 1;
    } else if (totalRecord % pageSize == 0) {
        totalPageCount = parseInt(totalRecord / pageSize);
    } else {
        totalPageCount = parseInt(totalRecord / pageSize) + 1;
    }

    if (totalPageCount == 1) {
        $(pageElement).html('');
        return;
    }

    if (currentPage > totalPageCount) { // 如果当前页数大于总页数,调整为最后页
        currentPage = totalPageCount;
    }
    if (currentPage <= 0) { // 如果当前页数小于等于0,调整为第一页
        currentPage = 1;
    }
    var curRecordIndex = (currentPage - 1) * pageSize + 1;
    var endRecordIndex = curRecordIndex + pageSize - 1;
    if (endRecordIndex > totalRecord) {
        endRecordIndex = totalRecord;
    }

    if (currentPage > 1) {// 如果当前页不等于1则显示上一页
        pageHtml += '<a href="javascript:" num="' + (currentPage - 1)
        + '" class="J_toPage next">&lt;上一页</a>'
        + '<a href="javascript:void(0);" class="nextpage J_toFirstPage"><<</a>';

    } else {
        pageHtml += '<a href="javascript:" num="' + (currentPage - 1)
        + '" class="J_toPage next disabledNext">&lt;上一页</a>'
        + '<a href="javascript:void(0);" class="nextpage disabledNextpage"><<</a>';
    }

    /*	pageHtml += '<a href="javascript:" num="' + (currentPage - 1)
     + '" class="J_toPage next">&lt;上一页</a>';*/

    if (totalPageCount <= extendPages + 1) { // 如果总页数小于等于6则页数全部显示
        for (var i = 1; i <= totalPageCount; i++) {
            if (i == currentPage) {
                pageHtml += ' <a class="page selected" href="javascript:">' + i
                + '</a>';
            } else {
                pageHtml += ' <a  href="javascript:" num="' + i
                + '" class="page J_toPage">' + i + '</a>';
            }
        }
    } else { // 如果总页数大于6
        // 中间页码部位
        for (var i = 0; i <= extendPages * 2; i++) {
            var ipage = 1;
            if (i < mustShowPages || i > extendPages * 2 - mustShowPages)// 头尾页码
            {
                if ((i + 1 == currentPage && i < mustShowPages)
                    || (totalPageCount - extendPages * 2 + i == currentPage && i > extendPages
                    * 2 - mustShowPages))// 当前页
                {
                    //glj update
                    pageHtml += ' <a class="page ' + (currentPage > 9999 ? "selected-big" : "selected") + '" href="javascript:">'
                    + currentPage + '</a>';
                } else if (i < mustShowPages) {
                    ipage = i + 1;
                    //glj update
                    pageHtml += ' <a  href="javascript:" num="' + ipage
                    + '" class="J_toPage ' + (ipage > 9999 ? "page-big" : "page") + '">' + ipage + '</a>';
                } else if (i > extendPages * 2 - mustShowPages) {
                    ipage = totalPageCount - extendPages * 2 + i;
                    //glj update
                    pageHtml += ' <a  href="javascript:" num="' + ipage
                    + '" class="J_toPage ' + (ipage > 9999 ? "page-big" : "page") + '">' + ipage + '</a>';
                }
            } else if ((currentPage - extendPages + i > mustShowPages)
                && (currentPage - extendPages + i <= totalPageCount
                - mustShowPages))// 中部页码
            {
                if (i == extendPages)// 当前页
                {
                    //glj update
                    pageHtml += ' <a class="page ' + (currentPage > 9999 ? "selected-big" : "selected") + '" href="javascript:">'
                    + currentPage + '</a>';
                } else if ((i == mustShowPages && currentPage - 1 > extendPages)
                    || (i == extendPages * 2 - mustShowPages && totalPageCount
                    - currentPage > extendPages))// 可能是[...]/[页码]的特殊位置
                {
                    pageHtml += '...';
                } else {
                    ipage = currentPage - extendPages + i;
                    pageHtml += ' <a  href="javascript:" num="' + ipage
                    + '" class="J_toPage ' + (ipage > 9999 ? "page-big" : "page") + '">' + ipage + '</a>';
                }
            }
        }
    }
    if (currentPage != totalPageCount) { // 如果当前页不是最后一页,则出现下一页按钮
        pageHtml += '<a href="javascript:void(0);" class="nextpage J_toLastPage">>></a>'
        + '<a href="javascript:" num="' + (currentPage + 1)
        + '" class="J_toPage next">下一页&gt;</a>';
    } else {
        pageHtml += '<a href="javascript:void(0);" class="nextpage disabledNextpage">>></a>'
        + '<a href="javascript:" num="' + (currentPage + 1)
        + '" class="J_toPage next disabledNext">下一页&gt;</a>';
    }

    pageHtml += '<span class="ml10 mr10">共<span class="impo">' + totalRecord
    + '</span>条记录</span>';
    $(pageElement).html(pageHtml);
    $(pageElement).attr("currentPage", currentPage);
    $(pageElement).attr("totalRecord", totalRecord);
    $(pageElement).attr("pageSize", pageSize);
    $(pageElement).attr("extendPages", extendPages);
    $(pageElement).attr("mustShowPages", mustShowPages);

    $(pageElement).find('.J_toPage:not(.disabledNext)').click(function () {
        $(".J_CheckAll").attr("checked", false);
        currentPage = parseInt($(this).attr('num'));
        $(this).parent().attr("currentPage", currentPage);
        loadDataFunction(1);
    });

    $(pageElement).find('.J_toFirstPage').click(function () {
        $(".J_CheckAll").attr("checked", false);
        currentPage = 1;
        $(this).parent().attr("currentPage", currentPage);
        loadDataFunction(1);
    });

    $(pageElement).find('.J_toLastPage').click(function () {
        $(".J_CheckAll").attr("checked", false);
        var totalRecord = $(this).parent().attr("totalrecord");
        var pageSize = $(this).parent().attr("pagesize");
        var totalPageCount = 0;
        if (parseInt(totalRecord / pageSize) == 0) {
            totalPageCount = 1;
        } else if (totalRecord % pageSize == 0) {
            totalPageCount = parseInt(totalRecord / pageSize);
        } else {
            totalPageCount = parseInt(totalRecord / pageSize) + 1;
        }
        currentPage = totalPageCount;
        $(this).parent().attr("currentPage", currentPage);
        loadDataFunction(1);
    });

    /*$(pageElement).find('.btn').click(function(){
     var topageNum = $(pageElement).find('.J_pagenum_text').val();
     if (topageNum != '' && parseInt(topageNum) > 0 &&
     parseInt(topageNum) <= totalPageCount) {
     $(this).parent().attr("currentPage",topageNum);
     loadDataFunction();
     }
     });*/

    $(pageElement).find(".J_pagenum_text").keydown(function (e) {
        var ev = document.all ? window.event : e;
        if (ev.keyCode == 13) {
            $(pageElement).find('.btn').click();
        }
    });
}

function getCurrentPage(pageElement) {
    if (pageElement == undefined) {
        pageElement = $('.paging')
    }
    currentPage = $(pageElement).attr("currentPage");
    if (currentPage == undefined) {
        return 1;
    } else {
        return parseInt(currentPage);
    }
}

function setCurrentPage(currentPage, pageElement) {
    if (currentPage == undefined) {
        currentPage = 1;
    }
    if (pageElement == undefined) {
        pageElement = $('.paging');
    }
    $(pageElement).attr("currentPage", currentPage);
}

function setPageSize(pageSize, pageElement) {
    if (pageSize == undefined) {
        pageSize = 15;
    }
    if (pageElement == undefined) {
        pageElement = $('.paging');
    }
    $(pageElement).attr("pageSize", pageSize);
}

function getPageSize(pageElement) {
    if (pageElement == undefined) {
        pageElement = $('.paging')
    }
    pageSize = $(pageElement).attr("pageSize");
    if (pageSize == undefined) {
        return 15;
    } else {
        return parseInt(pageSize);
    }
}

function getPageStartNum(pageElement) {
    currentPage = getCurrentPage(pageElement);
    pageSize = getPageSize(pageElement);
    if (currentPage > 1) {
        return parseInt(pageSize * (currentPage - 1));
    } else {
        return 0;
    }
}

function getPageEndNum(pageElement) {
    currentPage = getCurrentPage(pageElement);
    pageSize = getPageSize(pageElement);
    return parseInt(currentPage * pageSize - 1);
}

