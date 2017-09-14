<script type="text/javascript">
    GDT.timepot.bodyStart = +new Date;
    GDT.timepot.id = '175-391-3';
    GDT.timepot.cssEnd = +new Date;
    GDT.timepot.bodyEnd = GDT.timepot.jsStart = +new Date;
    GDT.setAduserInfo = function(result) {
        try {
            /** 获取cookie */
            var getCookie = function(name) {
                var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"), valueReg = /^[a-z]+$/gi, value = '';
                if (arr = document.cookie.match(reg)) {
                    value = decodeURIComponent(arr[2]);
                    return value || '';
                } else {
                    return '';
                }
            }

            var getId = function(id) {
                return document.getElementById(id);
            }

            var setText = function(id, str) {
                var node = getId(id) || {}, str = str || '';
                node.textContent = str;
                node.innerText = str;
            }

            var atlasdominfo = getCookie('atlasdominfo') || '', atlasdominfoArr = [], itemArr = [], nickname = '';
            if (atlasdominfo) {
                atlasdominfoArr = atlasdominfo.split(',');
                for (var i = 0, len = atlasdominfoArr.length; i < len; i++) {
                    itemArr = atlasdominfoArr[i].split('=');
                    if (itemArr[0] == 'nickname') {
                        nickname = itemArr[1];
                        break;
                    }
                }
            }
            if (nickname) {
                setText('_accountname', nickname);
            }
        } catch (e) {
        }
    }
    GDT.setAduserInfo();

    function gotoMenuUrl(_this, u) {
        $(_this).parent().find("a").removeClass('current');
        $(_this).addClass('current');
        if(u.indexOf('?') >= 0){
            $('#mainController').html("<iframe src='" + u + "&m=" + Math.random() + "&name=frame_" + $(_this).attr('id') + "' id='frame_" + $(_this).attr('id') + "' name='frame_" + $(_this).attr('id') + "' frameborder='0' scrolling='auto' width='100%' height='99%'></iframe>");
        }else{
            $('#mainController').html("<iframe src='" + u + "?m=" + Math.random() + "&name=frame_" + $(_this).attr('id') + "' id='frame_" + $(_this).attr('id') + "' name='frame_" + $(_this).attr('id') + "' frameborder='0' scrolling='auto' width='100%' height='99%'></iframe>");
        }
    }

    function gotoSonMenuUrl(_this, u) {
        $(_this).parent().parent().find("a").removeClass('current');
        $(_this).addClass('current');
        if(u.indexOf('?') >= 0){
            $('#mainController').html("<iframe src='" + u + "&m=" + Math.random() + "&name=frame_" + $(_this).attr('id') + "' id='frame_" + $(_this).attr('id') + "' name='frame_" + $(_this).attr('id') + "' frameborder='0' scrolling='auto' width='100%' height='99%'></iframe>");
        }else{
            $('#mainController').html("<iframe src='" + u + "?m=" + Math.random() + "&name=frame_" + $(_this).attr('id') + "' id='frame_" + $(_this).attr('id') + "' name='frame_" + $(_this).attr('id') + "' frameborder='0' scrolling='auto' width='100%' height='99%'></iframe>");
        }
    }

    function displaySonMenu(_this) {
        $(_this).parent().find("a").removeClass('current');
        $(_this).addClass('current');
        if($(_this).parent().find('dl').is(':hidden')){//如果当前隐藏
            $(_this).parent().find('dl').show();//显示
        }else{//否则
            $(_this).parent().find('dl').hide();//隐藏
        }
    }
</script>
<script type="text/javascript" src='<@s.url '/js/require.js?max_age=31536000'/>'></script>
<script type="text/javascript">
    window.mDomain = parent.mDomain;
    (function() {
        var ptisp, operatorDomain = '';

        /** 获取cookie */
        var getCookie = function(name) {
            var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)"), valueReg = /^[a-z]+$/gi, value = '';
            if (arr = document.cookie.match(reg)) {
                value = unescape(arr[2]);
                return valueReg.test(value) ? value : '';
            } else {
                return '';
            }
        }

        ptisp = getCookie("ptisp") || "";
        operatorDomain = ptisp ? ptisp + "." : "";
        GDT.g_env = {
            "ret": 0,
            "msg": "",
            "data": {
                "cssdomain": operatorDomain + "qzonestyle.gtimg.cn",
                "jsdomain": "<@s.url ''/>",
                "qzdomain": operatorDomain + "qzs.qq.com",
                "channel": "ec",
                "env": "formal",
                "apidomian": "e.qq.com",
                "servertime": (+new Date()) / 1000,
                "version": 2
            }
        };


        GDT.g_vermap = {
            "_last": "20170314_21338",
            "_now": "20170314_10162",
            "jsFiles": {
                "js/directive/tool.accountinfo": "20160621_21268",
                "js/lib/angular": "20150310_21121",
                "js/pages/tool.accountinfo": "20170214_21333",
                "js/services/account": "20161220_21322",
                "js/services/user": "20160726_21277",
                "js/pages/common": "20170314_10162",
                "js/config/comm": "20170221_21336",
                "js/config/env": "20170110_21328",
                "js/config/lang": "20170307_21337",
                "js/controller/tool.wxbound": "20151201_21213",
                "js/modules/account": "20161229_21323",
                "js/modules/accountstat": "20161220_21322",
                "js/modules/beautyui": "20151201_21213",
                "js/modules/common": "20170314_10162",
                "js/modules/message": "20160621_21268",
                "js/modules/route": "20170221_21336",
                "js/modules/sideslide": "20161018_21302",
                "js/modules/tips": "20170228_21335",
                "js/pages/account.transfer": "20160315_21247",
                "js/pages/tool.wxbound": "20151207_21215",
                "js/services/message": "20151201_21213",
                "js/services/wxbound": "20151201_21213",
                "js/pages/common_all": "20170314_10162",
                "js/pages/tool.accountinfo_all": "20170214_21333",
                "js/lib/angular_1.2.9": "20150513_21145",
                "js/pages/account.list": "20160531_21263",
                "js/modules/tabler": "20170228_21335",
                "js/config/report": "20170228_21335",
                "js/pages/account.list_all": "20160531_21263",
                "js/services/account.list": "20160322_21248",
                "js/modules/simpledaterange": "20160322_21248",
                "js/pages/account.invoice": "20160419_21253",
                "js/services/account.invoice": "20151103_21203",
                "js/controller/account.info.charge": "20161101_21308",
                "js/pages/account.info": "20170118_21327",
                "js/controller/account.info.num": "20160809_21282",
                "js/controller/account.invoice.list": "20160726_21277",
                "js/controller/account.invoice.info": "20160726_21277",
                "js/controller/account.info_all": "20160105_21230",
                "js/controller/account.invoice_all": "20160105_21230",
                "js/services/common": "20170314_10162",
                "js/controller/index": "20170214_21333",
                "js/pages/index": "20160628_21270",
                "js/services/index": "20161018_21302",
                "js/controller/index.all": "20170314_10162",
                "js/controller/index.order": "20170314_10162",
                "js/filter/string": "20151021_21201",
                "js/modules/ageRangeCommon": "20151021_21201",
                "js/modules/chart": "20161025_21305",
                "js/modules/form": "20160726_21277",
                "js/modules/helpbar": "20160322_21248",
                "js/modules/helper": "20160329_21249",
                "js/modules/timeutil": "20160726_21277",
                "js/modules/validator": "20160927_21296",
                "js/pages/index_all": "20170314_10162",
                "js/modules/tcss": "20151201_21213",
                "js/modules/monitor": "20151117_21208",
                "js/modules/platform": "20160322_21248",
                "js/pages/cpt.index": "20151207_21215",
                "js/controller/tool.tracking": "20160628_21272",
                "js/pages/tool.tracking": "20161011_21299",
                "js/services/tool.tracking": "20151201_21213",
                "js/pages/tool.tracking_all": "20161101_21308",
                "js/config/dataConfig": "20151215_21217",
                "js/config/order.edit": "20170307_21337",
                "js/config/order.edit.linktypeconfig": "20170221_21334",
                "js/controller/order.edit.basic": "20170307_21337",
                "js/controller/order.edit.creative.child": "20170307_21337",
                "js/controller/order.edit.creative": "20170118_21329",
                "js/controller/order.edit.targeting.estimate": "20170306_11006",
                "js/controller/order.edit.targeting": "20170214_21333",
                "js/directive/blockSelector": "20160621_21268",
                "js/directive/dateRange": "20160426_21255",
                "js/directive/order.edit": "20170314_10162",
                "js/directive/radioList": "20160920_21295",
                "js/directive/rangeSlider": "20160224_21244",
                "js/filter/order": "20160726_21277",
                "js/lib/angular_1.4.4": "20151215_21217",
                "js/modules/associateBlockSelector": "20160621_21268",
                "js/modules/associateCheckbox": "20170307_213371",
                "js/modules/associateRangeSlider": "20160621_21268",
                "js/modules/basefield": "20161208_21318",
                "js/modules/jquery.plugin": "20160119_21234",
                "js/modules/order": "20170307_21337",
                "js/modules/rangeslider": "20160510_21257",
                "js/modules/slider": "20151215_21217",
                "js/ordertargeting/age": "20160621_21268",
                "js/ordertargeting/area": "20170306_11006",
                "js/ordertargeting/businessinterest": "20160224_21244",
                "js/ordertargeting/climate": "20160224_21244",
                "js/ordertargeting/dressindex": "20160224_21244",
                "js/ordertargeting/education": "20160224_21244",
                "js/ordertargeting/gender": "20160621_21268",
                "js/ordertargeting/keyword": "20161206_21316",
                "js/ordertargeting/living_status": "20170207_21332",
                "js/ordertargeting/makeupindex": "20160224_21244",
                "js/ordertargeting/resident_community_price": "20160224_21244",
                "js/ordertargeting/scene": "20160224_21244",
                "js/ordertargeting/targetpkg": "20160927_21296",
                "js/ordertargeting/temperature": "20160224_21244",
                "js/ordertargeting/userstatus": "20161025_21305",
                "js/ordertargeting/uvindex": "20160224_21244",
                "js/pages/order.edit.basic": "20161208_21318",
                "js/pages/order.edit.creative": "20170207_21332",
                "js/pages/order.edit": "20170314_10162",
                "js/pages/order.edit.targeting": "20170307_21337",
                "js/services/order.edit": "20170221_21336",
                "js/services/order": "20170314_21338",
                "js/all/hermes": "20160531_21263",
                "js/all/gdt_modules": "20160524_21262",
                "js/controller/tool.rulelist": "20170314_21338",
                "js/modules/listselector": "20170119_21330",
                "js/modules/orderselector": "20170119_21330",
                "js/modules/selectmanage": "20170119_21330",
                "js/pages/tool.rulelist": "20170314_21338",
                "js/services/tool.rulelist": "20170110_21328",
                "js/pages/tool.rulelist_all": "20170314_21338",
                "js/modules/performanceApi": "20160112_212321",
                "js/controller/tool.webtracking": "20160628_21272",
                "js/pages/tool.webtracking": "20161011_21299",
                "js/services/tool.webtracking": "20151229_21223",
                "js/widget/menutree": "20160224_21244",
                "js/pages/tool.webtracking_all": "20161101_21308",
                "js/pages/account.info_all": "20170118_21327",
                "js/pages/account.invoice_all": "20160726_21277",
                "js/modules/dialog": "20170119_21330",
                "js/modules/fileuploader": "20160531_21263",
                "js/modules/simulateui": "20161101_21308",
                "js/modules/tiny": "20170103_21326",
                "js/widget/bootstrap/bootstrap": "20160217_21238",
                "js/lib/bootstrap/bootstrap": "20160223_21240",
                "js/config/accounttype": "20170118_21327",
                "js/modules/atlasdomflag": "20160329_21249",
                "js/modules/atlasdominfo": "20160329_21249",
                "js/pages/init": "20160322_21248",
                "js/lib/ejs_2.3.4": "20160329_21249",
                "js/pages/order.preview": "20170314_21338",
                "js/config/order.edit.targeting": "20160224_21244",
                "js/controller/order.edit.preview": "20161115_21310",
                "js/directive/imagepop": "20160510_21257",
                "js/directive/order.edit.material": "20170228_21335",
                "js/directive/order.edit.uploadpicture": "20170228_21335",
                "js/directive/scaleimage": "20160224_21244",
                "js/lib/angular_1.5.3": "20160224_21244",
                "js/modules/areatreeselector": "20160628_21270",
                "js/modules/associateTreeSelector": "20170306_11006",
                "js/modules/countryselectdata": "20160224_21244",
                "js/modules/creativeuploader": "20160607_21266",
                "js/modules/lbsselector": "20161101_21308",
                "js/modules/order.cabinet": "20170221_213341",
                "js/modules/order.preview": "20170221_21336",
                "js/modules/resourcepool": "20161108_21309",
                "js/ordertargeting/appaction_object_type": "20170306_11006",
                "js/ordertargeting/appuser": "20160920_21295",
                "js/ordertargeting/connectiontype": "20160224_21244",
                "js/ordertargeting/consumption_ability": "20160224_21244",
                "js/ordertargeting/costprice": "20160927_21296",
                "js/ordertargeting/fans": "20160920_21295",
                "js/ordertargeting/feetype": "20170110_21328",
                "js/ordertargeting/imgroup": "20160224_21244",
                "js/ordertargeting/isp": "20160224_21244",
                "js/ordertargeting/media_industry": "20160224_21244",
                "js/ordertargeting/mobileprice": "20160224_21244",
                "js/ordertargeting/newtargetpack": "20160927_21296",
                "js/ordertargeting/new_device": "20160628_21270",
                "js/ordertargeting/numberpackage": "20170306_11006",
                "js/ordertargeting/os": "20160726_21277",
                "js/ordertargeting/payment": "20160224_21244",
                "js/ordertargeting/player_consupt": "20160607_21266",
                "js/ordertargeting/wechatflowclass": "20160224_21244",
                "js/pages/order.edit.preview": "20160712_21274",
                "js/services/lbs": "20161101_21308",
                "js/services/resourcepool": "20160726_21277",
                "js/widget/lbsselector_all": "20161101_21308",
                "js/pages/order.edit_all": "20170314_10162",
                "js/pages/order.edit.basic_all": "20170314_21338",
                "js/pages/order.edit.creative_all": "20170307_21337",
                "js/pages/order.edit.targeting_all": "20170307_21337",
                "js/pages/order.edit.preview_all": "20170221_21336",
                "js/order/targeting_all": "20170307_213371",
                "js/modules/report": "20170221_21336",
                "js/pages/tool.yybpages": "20161220_21322",
                "js/controller/order.edit.creative.dynamic": "20161213_21320",
                "js/modules/flashpool": "20160718_21275",
                "js/pages/tool.flashmaker": "20160510_21257",
                "js/modules/survey": "20160726_21277",
                "js/modules/enlarge": "20160517_21258",
                "js/widget/menutreev2": "20160517_21258",
                "js/config/tabler": "20170228_21335",
                "js/modules/formsender": "20170314_10162",
                "js/pages/report.producttype": "20170302_11005",
                "js/pages/tool.index": "20170221_21336",
                "js/pages/tool.mediumshield": "20170214_213332",
                "js/services/mediumshield": "20170214_213332",
                "js/services/report": "20160901_21293",
                "js/widget/tabler_all": "20170228_21335",
                "js/pages/report.producttype_all": "20170314_10162",
                "js/pages/tool.mediumshield_all": "20170214_213332",
                "js/controller/report.campaign": "20160712_21274",
                "js/controller/tool.notice": "20161129_21314",
                "js/pages/report.campaign": "20170214_21333",
                "js/pages/tool.notice": "20160614_21267",
                "js/services/tool.notice": "20161129_21314",
                "js/pages/tool.notice_all": "20161129_21314",
                "js/pages/report.campaign_all": "20170314_10162",
                "js/modules/jsonp": "20160621_21268",
                "js/modules/mpqrcode": "20161025_213051",
                "js/services/mp": "20160726_21277",
                "js/modules/dynamic": "20161213_21320",
                "js/modules/tagstextarea": "20170207_21332",
                "js/modules/txtCounter": "20170207_21332",
                "js/controller/tool.tracking.form": "20161101_21308",
                "js/directive/corporate": "20170119_213311",
                "js/pages/report.settlement": "20161116_21312",
                "js/modules/superpreview": "20161129_21314",
                "js/directive/placeholdertextarea": "20161227_21325",
                "js/modules/placeholdertextarea": "20170110_21328",
                "js/controller/tool.targetpackmanage": "20170214_21333",
                "js/pages/tool.targetpackmanage": "20170306_11006",
                "js/services/tool.targetpackmanage": "20161018_21302",
                "js/pages/tool.targetpackmanage_all": "20170306_11006",
                "js/ordertargeting/core_position": "20170214_21333",
                "js/controller/tool.privilege.action": "20161115_21310",
                "js/controller/tool.privilege": "20161115_21310",
                "js/modules/changeUserContactWay": "20161115_21310",
                "js/pages/tool.privilege": "20161115_21310",
                "js/services/tool.privilege": "20161115_21310",
                "js/pages/tool.privilege_all": "20161115_21310",
                "js/pages/tool.fengling": "20161229_21323",
                "js/pages/tool.mediamaker": "20161116_21312",
                "js/pages/tool.oplog": "20161116_21312",
                "js/pages/tool.portraits": "20161116_21312",
                "js/services/tool.oplog": "20161116_21312",
                "js/services/tool.profile": "20161129_21314",
                "js/controller/tool.yybdmp": "20160930_212981",
                "js/ordertargeting/yyb_numberpackage": "20160930_212981",
                "js/pages/tool.yybdmp": "20160930_212981",
                "js/ordertargeting/searchkeyword": "20161208_21318",
                "js/pages/tool.blindadpage": "20161220_21322",
                "js/controller/tool.appauthorize.list": "20170103_21326",
                "js/services/tool.appauthorize": "20170103_21326",
                "js/controller/tool.store.map": "20170314_21338",
                "js/modules/lbsstore": "20161229_21323",
                "js/pages/tool.storemanage": "20170314_21338",
                "js/services/store": "20170314_21338",
                "js/controller/account.info.credit": "20170118_21327",
                "js/directive/adPositionPackage": "20170228_21335",
                "js/modules/relateAds": "20170119_21330",
                "js/pages/tool.mediaoptimizer": "20170228_21335",
                "js/services/mediaoptimizer": "20170214_213332",
                "js/pages/tool.mediaoptimizer_all": "20170228_21335",
                "js/ordertargeting/ruledesc": "20170214_213331",
                "js/ordertargeting/rulename": "20170214_21333",
                "js/directive/myappLandingPageInfo": "20170221_21334",
                "js/pages/tool.landingpage": "20170221_21336",
                "js/ordertargeting/airqualityindex": "20170307_21337",
                "js/modules/uuid": "20170314_10162"
            },
            "cssFiles": {
                "css/gdt-toufang-edit": "20160304",
                "css/gdt-toufang-global": "20160304",
                "css/gdt-toufang-layout": "20160105",
                "css/gdt-toufang-pop": "20160321",
                "css/gdt-toufang-public": "20160304",
                "css/gdt-toufang-tool": "20170228",
                "css/gdt-toufang-tuiguang": "20160321",
                "css/account-frame": "20160128",
                "css/gdt-toufang-account": "20160325",
                "css/gdt-mod-areaselect": "20151221",
                "css/chosen": "20160128",
                "css/controls-reset": "20160304",
                "css/tipspop": "20160128",
                "Module/daterangepicker/timechoose-restyle": "20160128",
                "css/gdt-css-api": "20160304"
            },
            "_time": "Mon Mar 27 2017 10:42:33 GMT+0800 (CST)",
            "bundles": {
                "js/pages/common_all": [
                    "js/pages/common",
                    "js/modules/account",
                    "js/modules/route",
                    "js/modules/sideslide",
                    "js/modules/message",
                    "js/modules/accountstat",
                    "js/modules/common",
                    "js/modules/monitor",
                    "js/modules/report",
                    "js/config/comm",
                    "js/config/env",
                    "js/config/accounttype",
                    "js/config/lang",
                    "js/modules/tips",
                    "js/modules/beautyui",
                    "hermes/cgi/comm",
                    "js/services/common",
                    "js/services/account",
                    "js/services/message",
                    "js/services/user",
                    "js/config/report",
                    "js/modules/chart",
                    "js/modules/ageRangeCommon",
                    "js/modules/helper",
                    "js/modules/timeutil",
                    "js/modules/helpbar",
                    "js/modules/form",
                    "js/modules/validator",
                    "js/filter/string",
                    "js/modules/jquery.plugin",
                    "js/modules/platform",
                    "js/modules/simulateui",
                    "js/modules/dialog",
                    "js/modules/atlasdomflag",
                    "js/modules/atlasdominfo",
                    "js/modules/jsonp",
                    "js/modules/uuid"
                ],
                "js/pages/tool.accountinfo_all": [
                    "js/pages/tool.accountinfo",
                    "js/directive/tool.accountinfo",
                    "js/services/tool.profile",
                    "js/modules/survey"
                ],
                "js/pages/account.list_all": [
                    "js/modules/simpledaterange",
                    "js/services/account.list",
                    "js/pages/account.list"
                ],
                "js/pages/index_all": [
                    "js/pages/index",
                    "js/controller/index",
                    "js/controller/index.all",
                    "js/controller/index.order",
                    "js/services/index"
                ],
                "js/pages/account.info_all": [
                    "js/pages/account.info",
                    "js/controller/account.info.charge",
                    "js/controller/account.info.num"
                ],
                "js/pages/account.invoice_all": [
                    "js/pages/account.invoice",
                    "js/controller/account.invoice.info",
                    "js/controller/account.invoice.list",
                    "js/services/account.invoice"
                ],
                "js/all/hermes": [
                    "hermes/comm/formater",
                    "hermes/widgets/areadata",
                    "hermes/cgi/comm"
                ],
                "js/widget/lbsselector_all": [
                    "js/modules/lbsselector",
                    "js/services/lbs"
                ],
                "js/widget/tabler_all": [
                    "js/config/tabler",
                    "js/modules/tabler",
                    "modules/dropdowndialoghandler"
                ],
                "js/pages/tool.tracking_all": [
                    "js/controller/tool.tracking.form",
                    "js/controller/tool.tracking",
                    "js/services/tool.tracking",
                    "js/pages/tool.tracking"
                ],
                "js/pages/tool.rulelist_all": [
                    "js/controller/tool.rulelist",
                    "js/services/tool.rulelist",
                    "js/pages/tool.rulelist"
                ],
                "js/pages/tool.webtracking_all": [
                    "js/controller/tool.tracking.form",
                    "js/controller/tool.webtracking",
                    "js/services/tool.webtracking",
                    "js/pages/tool.webtracking"
                ],
                "js/pages/tool.targetpackmanage_all": [
                    "js/controller/tool.targetpackmanage",
                    "js/services/tool.targetpackmanage",
                    "js/pages/tool.targetpackmanage"
                ],
                "js/pages/tool.privilege_all": [
                    "js/controller/tool.privilege",
                    "js/controller/tool.privilege.action",
                    "js/services/tool.privilege",
                    "js/pages/tool.privilege"
                ],
                "js/pages/order.edit_all": [
                    "js/config/order.edit.targeting",
                    "js/config/order.edit",
                    "js/modules/order",
                    "js/modules/simpledaterange",
                    "js/modules/rangeslider",
                    "js/modules/slider",
                    "js/modules/order.cabinet",
                    "js/services/order",
                    "js/services/order.edit",
                    "js/directive/order.edit",
                    "js/directive/rangeSlider",
                    "js/directive/radioList",
                    "js/directive/blockSelector",
                    "js/directive/scaleimage",
                    "js/directive/dateRange",
                    "js/directive/order.edit.material",
                    "js/directive/order.edit.uploadpicture",
                    "js/directive/imagepop",
                    "js/directive/corporate",
                    "js/filter/order",
                    "js/pages/order.edit",
                    "js/modules/resourcepool",
                    "js/services/resourcepool"
                ],
                "js/pages/order.edit.basic_all": [
                    "js/modules/basefield",
                    "js/config/order.edit.linktypeconfig",
                    "js/controller/order.edit.basic",
                    "js/controller/tool.store.map",
                    "js/pages/order.edit.basic"
                ],
                "js/pages/order.edit.creative_all": [
                    "js/modules/dynamic",
                    "js/modules/tagstextarea",
                    "js/controller/order.edit.creative.child",
                    "js/controller/order.edit.creative.dynamic",
                    "js/controller/order.edit.creative",
                    "js/pages/order.edit.creative"
                ],
                "js/pages/order.edit.targeting_all": [
                    "js/controller/order.edit.targeting.estimate",
                    "js/controller/order.edit.targeting",
                    "js/pages/order.edit.targeting"
                ],
                "js/pages/order.edit.preview_all": [
                    "js/modules/order.preview",
                    "js/controller/order.edit.preview",
                    "js/pages/order.edit.preview"
                ],
                "js/order/targeting_all": [
                    "js/modules/associateRangeSlider",
                    "js/modules/associateCheckbox",
                    "js/modules/associateBlockSelector",
                    "js/modules/associateTreeSelector",
                    "js/ordertargeting/targetpkg",
                    "js/ordertargeting/area",
                    "js/ordertargeting/age",
                    "js/ordertargeting/gender",
                    "js/ordertargeting/scene",
                    "js/ordertargeting/education",
                    "js/ordertargeting/userstatus",
                    "js/ordertargeting/living_status",
                    "js/ordertargeting/imgroup",
                    "js/ordertargeting/businessinterest",
                    "js/ordertargeting/keyword",
                    "js/ordertargeting/new_device",
                    "js/ordertargeting/payment",
                    "js/ordertargeting/fans",
                    "js/ordertargeting/appaction_object_type",
                    "js/ordertargeting/appuser",
                    "js/ordertargeting/resident_community_price",
                    "js/ordertargeting/player_consupt",
                    "js/ordertargeting/consumption_ability",
                    "js/ordertargeting/dressindex",
                    "js/ordertargeting/uvindex",
                    "js/ordertargeting/makeupindex",
                    "js/ordertargeting/climate",
                    "js/ordertargeting/temperature",
                    "js/ordertargeting/mobileprice",
                    "js/ordertargeting/os",
                    "js/ordertargeting/connectiontype",
                    "js/ordertargeting/isp",
                    "js/ordertargeting/media_industry",
                    "js/ordertargeting/numberpackage",
                    "js/ordertargeting/yyb_numberpackage",
                    "js/ordertargeting/newtargetpack",
                    "js/ordertargeting/wechatflowclass",
                    "js/ordertargeting/feetype",
                    "js/ordertargeting/costprice",
                    "js/ordertargeting/core_position",
                    "js/ordertargeting/searchkeyword",
                    "js/ordertargeting/rulename",
                    "js/ordertargeting/ruledesc",
                    "js/ordertargeting/airqualityindex"
                ],
                "js/pages/report.producttype_all": [
                    "js/pages/report.producttype",
                    "js/modules/formsender",
                    "js/modules/simpledaterange",
                    "js/services/report"
                ],
                "js/pages/tool.mediumshield_all": [
                    "js/pages/tool.mediumshield",
                    "js/services/mediumshield",
                    "js/modules/simpledaterange"
                ],
                "js/pages/tool.mediaoptimizer_all": [
                    "js/pages/tool.mediaoptimizer",
                    "js/services/mediaoptimizer",
                    "js/modules/simpledaterange",
                    "js/directive/adPositionPackage"
                ],
                "js/pages/tool.notice_all": [
                    "js/pages/tool.notice",
                    "js/services/tool.notice",
                    "js/controller/tool.notice"
                ],
                "js/pages/report.campaign_all": [
                    "js/pages/report.campaign",
                    "js/controller/report.campaign",
                    "js/modules/formsender",
                    "js/modules/simpledaterange",
                    "js/services/report"
                ]
            }
        };


        //文件加载max_age
        GDT.addMaxAgeForFile = function(fileUrl, customMaxAge) {
            var url = fileUrl || '',
                    maxage = parseInt(customMaxAge) || 0,
                    vermapData = GDT.g_vermap || {},
                    cssFiles = vermapData.cssFiles || {},
                    long_maxage = 31536000,	//1年
                    short_maxage = 302400,	//3.5天
                    js_longMaxAgeArr = ['/atlas', '/atlas_v2', 'jquery/jquery', 'lib/angular', 'qzfl/qzfl', 'requirejs/require', 'qbl/core', '/lib/jquery', 'jquery/widget/highcharts', 'comm/jquery/chosen/'],
                    css_longMaxAgeArr = ['/css/bootstrap.css', '/css/gdt-css-api.css'];

            for (var key in cssFiles) {
                css_longMaxAgeArr.push(key);
            }

            var isLong = function(url, arr) {
                var arr = arr || [],
                        url = url || false,
                        result = false;

                if (url && arr.length > 0) {
                    for (var i = 0, len = arr.length; i < len; i++) {
                        if (url.indexOf(arr[i]) > -1) {
                            result = true;
                            break;
                        }
                    }
                }

                return result;
            }

            if (url) {

                if (url.slice(-3) == '.js') {
                    if (maxage < 1) {
                        if (isLong(url, js_longMaxAgeArr)) {
                            maxage = long_maxage;
                        } else {
                            maxage = short_maxage;
                        }
                    }
                    url += '?max_age=' + maxage;
                } else if (url.slice(-4) == '.css') {
                    if (maxage < 1) {
                        if (isLong(url, css_longMaxAgeArr)) {
                            maxage = long_maxage;
                        } else {
                            maxage = short_maxage;
                        }
                    }
                    url += '?max_age=' + maxage;
                }
            }

            return url;
        }

        GDT.g_getFileFullpath = function(filePath, type) {
            var isDev = false,
                    type = type || 'js',
                    maxage = 0,
                    verMap = (type == 'js') ? GDT.g_vermap.jsFiles : GDT.g_vermap.cssFiles,
                    domain,
                    fullPath;

            try {
                domain = (type == 'js') ? GDT.g_env.data.jsdomain : GDT.g_env.data.cssdomain;
                isDev = GDT.g_env.data.env == 'develop';
            } catch (e) {
                domain = 'qzonestyle.gtimg.cn';
            }

            if(filePath.indexOf('index_all') > 0){
                alert(filePath);
            }

            if (filePath.indexOf('http://') > -1) {
                fullPath = filePath;
            } else if (type == 'js') {
                fullPath = /*'http://' + */domain + '/qzone/biz/gdt/atlas_v2/' + filePath.replace('js/', '') + (verMap[filePath] && !isDev ? ('.' + verMap[filePath]) : '') + '.js';
            } else {
                if (filePath.indexOf('/') == 0) {
                    fullPath = /*'http://' + */domain + filePath + (verMap[filePath] && !isDev ? ('-' + verMap[filePath]) : '') + '.css';
                } else {
                    fullPath = /*'http://' + */domain + '/open_proj/proj-gdt-toufang/' + filePath + (verMap[filePath] && !isDev ? ('-' + verMap[filePath]) : '') + '.css';
                }
            }

            fullPath = typeof(GDT.addMaxAgeForFile) != 'undefined' ? GDT.addMaxAgeForFile(fullPath) : fullPath;
            return fullPath;
        }

    })();

    (function() {
        var docUri = '/atlas/index',
                jsPath = 'js/',
                env = GDT.g_env,
                devEnv = !(/^(formal|preview)$/.test(env.data && env.data.env)),
                baseUrl, jsName, pathArr, folderName, fileName, moduleName,
                nobundles = (window.localStorage && localStorage.getItem && localStorage.getItem('__nobundles') == 1),
                verMap = GDT.g_vermap.jsFiles || {};

        function getVerFileName(fileKey) {
            var mapKey = 'js/' + fileKey;
            return !nobundles && verMap[mapKey + '_all'] ? (fileKey + '_all.' + verMap[mapKey + '_all']) : (verMap[mapKey] ? (fileKey + '.' + verMap[mapKey]) : fileKey);
        }

        function getPathConfig() {
            var basePath = {	//路径
                        'js': jsPath,
                        'hermes': 'js/gdt/hermes/',
                        'modules': 'js/gdt/modules',
                        'rplugins': 'js/comm/requirejs/plugins',
                        'widget': 'js/comm/jquery/widget',
                        'commWidget': 'js/comm/widget',
                        'amd_widget': 'js/comm/amd_widget',
                        'jui': 'js/comm/jquery/jquery_ui_amd',
                        'chosen': 'js/comm/jquery/chosen',
                        'atlas_comm': 'js/atlas_comm',
                        'jquery-validation': 'js/jquery-validation',
                        'layer': 'js/layer'
                    },
                    baseJsFile = {	//文件
                        'jquery': (function() {
                            var p = 'js/comm/jquery/jquery-',
                                    v = '2.0.2',
                                    ua = navigator.userAgent.toLowerCase();
                            if (/msie [6|7|8]/.test(ua)) {
                                v = '1.10.2';
                            } else if (navigator.userAgent.toLowerCase().indexOf('trident/7') > 0) {
                                v = '2.1.4';
                            }
                            return baseUrl + p + v + '.js';
                        })(),
                        'utils': 'js/hermes/comm/' + (devEnv ? 'utils' : 'utils.all'),
                        'angular': document.documentMode <= 8 ? (jsPath + getVerFileName('lib/angular_1.2.9') + '.js') : (jsPath + getVerFileName('lib/angular_1.4.4') + '.js'),
                        'moment': 'js/bootstrap/moment',
                        'daterange': 'js/bootstrap/daterangepicker.20160112_21232',
                        'bxslider': 'js/comm/jquery/bxslider/jquery.bxslider',
                        'QZFL': /*'http://' + */( (env.data && env.data.jsdomain) || 'qzonestyle.gtimg.cn') + '/js/qzfl/stat.js',
                        'widget/cookie': basePath['widget'] + '/cookie',
                        'widget/highcharts': basePath['widget'] + '/highcharts',
                        'widget/pagination/simplePagination': basePath['widget'] + '/pagination/simplePagination',
                        'chosen/pinyin': basePath['chosen'] + '/pinyin',
                        'chosen/chosen.jquery': basePath['chosen'] + '/chosen.jquery',
                        'jui/position': basePath['jui'] + '/position',
                        'jui/widget': basePath['jui'] + '/widget',
                        'jui/others/notify': basePath['jui'] + '/others/notify',
                        'prefetchapi': basePath['atlas_comm'] + '/prefetchapi.js?max_age=600',
                        'performanceapi': basePath['atlas_comm'] + '/performanceapi.js?max_age=600',
                        'FileAPI': basePath['commWidget'] + '/fileapi/FileAPI.html5',
                        'orderTargetConfig': 'qzone/qzactStatics/gdt/data/149/config1.js?max_age=86400&version=' + GDT.g_vermap._now,
                        'enterpriseAPI': '//midas.gtimg.cn/enterprise/js/enterpriseAPI_v1.0.1',  //米大师API
                        'spa.monitor': 'js/spalib/spa-monitor/1.3.0/spa-monitor.min.js',
                        'jquery.form': 'js/jquery.form.js',
                        'layer': basePath['layer'] + '/layer.min.js'
                    },
                    baseConfig = {
                        tencentMap: 'http://map.qq.com/api/js?v=2.exp&callback=__sosoMapready'
                    },
                    url = '';

            for (var key in basePath) {
                baseConfig[key] = basePath[key];
            }

            //baseJsFile的是文件，会带上.js?max_age的
            for (var key in baseJsFile) {
                url = baseJsFile[key];

                if (url.indexOf('max_age=') < 0) {
                    if (url.slice(-3) != '.js') {
                        url += '.js';
                    }

                    url = typeof(GDT.addMaxAgeForFile) != 'undefined' ? GDT.addMaxAgeForFile(url) : url;
                }

                baseConfig[key] = url;
            }

            //加上max_age
            for (var key in verMap) {
                url = key.replace('js/', jsPath) + '.' + verMap[key] + '.js';
                if(url == 'qzone/biz/gdt/atlas_v2/pages/init.20160322_21248.js'){
                    url = '<@s.url '/js/pages/init.20160322_21248.js'/>';
                }else if(url.indexOf('index_all.20170314_10162.js') > 0){
                    url = '<@s.url '/js/pages/index_all.20170314_10162.js'/>';
                }else if(url == 'qzone/biz/gdt/atlas_v2/all/hermes.20160531_21263.js'){
                    url = '<@s.url '/js/all/hermes.20160531_21263.js'/>';
                }else if(url == 'qzone/biz/gdt/hermes/comm/utils.all.js'){
                    url = '<@s.url '/js/hermes/comm/utils.all.js'/>';
                }else if(url == 'qzone/biz/comm/jquery/widget/cookie.js'){
                    url = '<@s.url '/js/comm/jquery/widget/cookie.js'/>';
                }else if(url == 'qzone/biz/gdt/atlas_v2/pages/common_all.20170314_10162.js'){
                    url = '<@s.url '/js/pages/common_all.20170314_10162.js'/>';
                }else if(url == 'qzone/biz/ac/bootstrap/moment.js'){
                    url = '<@s.url '/js/bootstrap/moment.js'/>';
                }else if(url == 'qzone/biz/gdt/atlas_comm/prefetchapi.js'){
                    url = '<@s.url '/js/atlas_comm/prefetchapi.js'/>';
                }else if(url == 'qzone/biz/gdt/atlas_comm/performanceapi.js'){
                    url = '<@s.url '/js/atlas_comm/performanceapi.js'/>';
                }else if(url == 'qzone/biz/gdt/atlas_v2/lib/angular_1.4.4.20151215_21217.js'){
                    url = '<@s.url '/js/lib/angular_1.4.4.20151215_21217.js'/>';
                }else if(url == 'qzone/biz/comm/jquery/chosen/pinyin.js'){
                    url = '<@s.url '/js/comm/jquery/chosen/pinyin.js'/>';
                }else if(url == 'qzone/biz/comm/jquery/widget/highcharts.js'){
                    url = '<@s.url '/js/comm/jquery/widget/highcharts.js'/>';
                }else if(url == 'qzone/biz/gdt/spalib/spa-monitor/1.3.0/spa-monitor.min.js'){
                    url = '<@s.url '/js/spalib/spa-monitor/1.3.0/spa-monitor.min.js'/>';
                }else if(url == 'c/=/ac/qzone/qzfl/qzfl_v8_2.1.41.js,/ac/qzfl/stat.js'){
                    url = '<@s.url '/js/qzfl/stat.js'/>';
                }else if(url == 'qzone/biz/comm/jquery/chosen/chosen.jquery.js'){
                    url = '<@s.url '/js/comm/jquery/chosen/chosen.jquery.js'/>';
                }
                url = typeof(GDT.addMaxAgeForFile) != 'undefined' ? GDT.addMaxAgeForFile(url) : url;

                baseConfig[key] = url;
            }

            return baseConfig;
        }

        define('verMap', GDT.g_vermap);

        baseUrl = /*'http://' + */( (env.data && env.data.jsdomain) || 'qzonestyle.gtimg.cn') + '/';
        pathArr = docUri.split(/\/+/);

        fileName = pathArr[pathArr.length - 1] || 'index';
        folderName = pathArr.length >= 2 ? pathArr[pathArr.length - 2] : 'atlas';

        if (folderName === 'atlas' || folderName.match(/^\d+$/g)) {
            //前面是atlas或是为数字的，就不需要拼接文件夹了
            folderName = '';
        } else {
            folderName += '.';
        }

        if (fileName === 'atlas' || fileName.match(/^\d+$/g)) {
            //前面是atlas或是为数字的，就不需要拼接文件夹了
            fileName = 'index';
        }

        jsName =  (folderName + fileName) ;
        moduleName = 'js/pages/' + jsName + '_all';
        (function() {
            var k, commModules = {
                'js/pages/common_all': true,
                'js/controller/account.info_all': true,
                'js/controller/account.invoice_all': true,
                'js/all/hermes': true,
                'js/widget/lbsselector_all': true,
                'js/widget/tabler_all': true
            };
            if (moduleName == 'js/pages/order.edit_all') {
                // 广告投放页做特殊处理
                commModules['js/pages/order.edit.basic_all'] = true;
                commModules['js/pages/order.edit.creative_all'] = true;
                commModules['js/pages/order.edit.targeting_all'] = true;
                commModules['js/pages/order.edit.preview_all'] = true;
                commModules['js/order/targeting_all'] = true;
            }
            for (k in GDT.g_vermap.bundles) {
                if (k == moduleName || k in commModules) {
                    continue;
                }
                delete GDT.g_vermap.bundles[k];
            }
        })();
        // requirejs config
        require.config({
            baseUrl: baseUrl,
            shim: {
                'widget/cookie': ['jquery'],
                'widget/pagination/simplePagination': ['jquery'],
                'angular': {
                    'exports': 'angular'
                },
                'angularRoute': ['angular'],
                'angularMocks': {
                    deps: ['angular'],
                    'exports': 'angular.mock'
                },
                'angular_ui_utils': {
                    deps: ['angular']
                },
                'daterange': ['jquery', 'moment'],
                'bxslider': ['jquery'],
                'QZFL': {
                    'exports': 'QZFL'
                },
                'chosen/pinyin': {
                    'exports': 'pinyinSearch',
                    'deps': ['jquery']
                },
                'chosen/chosen.jquery': {
                    'exports': 'chosen',
                    'deps': ['jquery', 'chosen/pinyin']
                },
                'widget/highcharts': ['jquery'],
                'js/modules/chart': ['widget/highcharts'],
                'FileAPI': {
                    'exports': 'FileAPI'
                },
                'js/modules/creativeuploader': ['FileAPI', 'jquery'],
                'js/modules/fileuploader': ['FileAPI', 'jquery'],
                'js/lib/bootstrap/bootstrap': ['jquery'],
                'js/modules/dialog': ['jquery', 'js/lib/bootstrap/bootstrap'],
                'tencentMap': {
                    'exports': 'soso'
                },
                'commWidget/slider/slider': {
                    'deps': ['QZFL']
                },
                'spa.monitor': 'SPAMonitor'
            },
            bundleHost: baseUrl,
            paths: getPathConfig(),
            bundles: nobundles ? {} : GDT.g_vermap.bundles
        });

        require(['js/pages/init'], function(pageInit) {
            pageInit.run(function(result) {
                var mainJS = document.createElement('script');
                mainJS.src = typeof(GDT.addMaxAgeForFile) != 'undefined' ? GDT.addMaxAgeForFile(baseUrl + jsPath + getVerFileName('pages/' + jsName) + '.js') : baseUrl + jsPath + getVerFileName('pages/' + jsName) + '.js';
                document.body.appendChild(mainJS);
            });
        });

    })();
</script>
</body>
</html>
