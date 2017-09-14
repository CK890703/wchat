<#import "common/spring.ftl" as s />
<!doctype html>
<html>
<head>
    <base id="contextPath" href="${request.contextPath}/">
    <style type="text/css">@charset "UTF-8";[ng\:cloak],[ng-cloak],[data-ng-cloak],[x-ng-cloak],.ng-cloak,.x-ng-cloak,.ng-hide:not(.ng-hide-animate){display:none !important;}ng\:form{display:block;}.ng-animate-shim{visibility:hidden;}.ng-anchor{position:absolute;}</style>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1">
    <title>微信公众号管理平台</title>
    <meta name="keywords" content="微信公众号管理平台"/>
    <meta name="description" content=""/>
    <link rel="shortcut icon" href="<@s.url '/img/favicon.ico'/>" type="image/x-icon">
    <link rel="stylesheet" type="text/css" href="<@s.url '/css/base-bts.css?max_age=31536000&amp;v=20160708?max_age=31536000&v=20160708'/>">
    <link rel="stylesheet" type="text/css" href="<@s.url '/css/module-2.2.4.css?max_age=31536000'/>">
    <link rel="stylesheet" type="text/css" href="<@s.url '/css/controls-reset-20170110_21328.css?max_age=31536000'/>">
    <link rel="stylesheet" type="text/css" href="<@s.url '/css/gdt-css-api-20160531_21263.css?max_age=31536000'/>">
    <link rel="stylesheet" type="text/css" href="<@s.url '/css/gdt-toufang-global-20170118_21329.css?max_age=31536000'/>">
    <link rel="stylesheet" type="text/css" href="<@s.url '/css/gdt-toufang-layout-20170118_21327.css?max_age=31536000'/>">
    <link rel="stylesheet" type="text/css" href="<@s.url '/css/gdt-mod-areaselect-20160614_21267.css?max_age=31536000'/>">
    <link rel="stylesheet" type="text/css" href="<@s.url '/css/gdt-toufang-pop-20170110_21328.css?max_age=31536000'/>">
    <link rel="stylesheet" type="text/css" href="<@s.url '/css/gdt-toufang-tool-20170228_21335.css?max_age=31536000'/>">
    <link rel="stylesheet" type="text/css" href="<@s.url '/css/gdt-toufang-account-20170328_21342.css?max_age=31536000'/>">
    <link rel="stylesheet" type="text/css" href="<@s.url '/css/gdt-toufang-public-20161025_213051.css?max_age=31536000'/>">
    <link rel="stylesheet" type="text/css" href="<@s.url '/css/gdt-toufang-tuiguang-20161115_21310.css?max_age=31536000'/>">
    <script>
        var contextPath = document.baseURI;
        document.createElement('header');
        document.createElement('aside');
        document.createElement('nav');
        document.createElement('footer');
        window.GDT = {};
        GDT.timepot = GDT.timepot || {};
        GDT.timepot.headStart = +new Date;
        GDT._openTime = (new Date()).getTime();
        GDT.owner = '';
        GDT.timepot.cssStart=+new Date;
    </script>
</head>
<body>
<div class="wrapper clearfix " id="root">
    <header class="clearfix">
        <div class="h-info clearfix">
            <i class="sp-bg"></i>
            <div class="logo-wrap">
                <div class="logo"><a href="index"></a></div>
                <div class="platform-sel _bubble" rel="bubbleIndex.switchsite" id="_switch_site">
                    <div class="platform-sel-cur switchbutton">
						<span class="platform-control" id="platform-control"></span>
                        <i class="platform-sel-tri switchicon" style="display: none;"></i>
                    </div>
                    <div class="platform-sel-list" id="_switch_site_list">
                    </div>
                </div>
            </div>

            <div class="user" id="headerAccountInfo">
                <div class="user-pic"></div>
                <div class="user-id">
                    <p class="company ellipsis _accountname" id="_accountname">
                        ${((user.realName)?length>0)?string((user.realName),user.userName)}
                    </p>
                    <p class="id _accountid">
                        <span>${user.email}</span>
                    </p>
                </div>
                <div class="user-logon-list">
                    <i class="trig-up"></i>
                    <a href="javascript:void(0);" onclick="gotoMenuUrl(this, '<@s.url '/user/userinfo'/>')">账号中心</a>
                    <a href="<@s.url '/logout'/>" id="logout">退出</a>
                </div>
            </div>
    </header>
    <div class="top" style="height:56px;;width:100%;"><!--顶部占位--></div>
    <div class="top none" style="height:31px;;width:100%;" id="ErrorStatusTipsHolder"><!--顶部小黄条占位--></div>