define(["require", "exports", "module", "jquery", "hermes/cgi/comm"], function (require, exports, module) {
    'use strict';
    var $ = require('jquery');
    var GDT = window.GDT || {};
    var hermesComm = require('hermes/cgi/comm'), model = {}, location = window.location || {};
    var data = {}, pathname = location.pathname || '', owner = '', regexp = /\/atlas\/([0-9]*)/;
    var loader = function (mod, act, getURLopts) {
        var getURLopts = getURLopts || {}, baseUrl = 'ec/api?mod={mod}&act={act}';
        getURLopts.base = getURLopts.base || baseUrl;
        if (getURLopts.base && owner && getURLopts.base.indexOf('owner=') == -1) {
            getURLopts.base += (getURLopts.base.indexOf('?') > 0 ? '&' : '?') + 'owner=' + owner;
        }
        return hermesComm['loader'](mod, act, getURLopts);
    }
    if (pathname && regexp.test(pathname) && RegExp.$1) {
        data['owner'] = RegExp.$1;
        owner = RegExp.$1;
    }
    owner = owner || GDT.owner;
    model.getAduserInfo = loader('aduser', 'info');
    exports.run = function (cb) {
        var callback = cb || function () {
            }, errorCb = function (result) {
            var adUser = result || {};
            if (adUser.ret != 0) {

            }
        }
        model.getAduserInfo(function (result) {
            var env = GDT.g_env && GDT.g_env.data ? GDT.g_env.data : {};
            if (result && result.ret == 0 && result.data) {
                GDT.g_adUser = $.extend(true, {}, GDT.g_adUser, result);
                GDT.aduser = $.extend(true, {}, GDT.aduser, result.data);
                GDT.gAduser = $.extend(true, {}, GDT.gAduser, result.data);
                GDT.privilege = $.extend(true, {}, GDT.privilege, result.data.privilege);
                GDT.owner = result.data.aduid || owner;
                env.servertime = result.data.time ? result.data.time : (+new Date()) / 1000;
                env.env = result.data.env ? result.data.env : 'formal';
                GDT.env = $.extend(true, {}, GDT.env, env);
                window.GDT = GDT;
                define('env', GDT.env);
                define('aduser', GDT.aduser);
                define('privilege', GDT.privilege);
                callback(result);
            } else {
                errorCb(result);
            }
        }, {error: errorCb, data: data})
    }
});