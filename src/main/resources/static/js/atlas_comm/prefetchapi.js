;(function(global,factory){if(typeof module==="object"&&module&&typeof module.exports==="object"){module.exports=global.document?factory(global,true):function(w){if(!w.document){throw new Error("requires a window with a document");}
    return factory(w);};}else if(typeof define==="function"){if(define.amd||define.cmd){define(function(){return factory(global,true);});}}else{factory(global);}})(typeof window!=="undefined"?window:this,function(window,noGlobal){try{var href=location.href||'',runDomain='e.qq.com',prefetchApi={startJsPrefetch:function(){}},ieVersion=-1,localstorageName='atlasPrefetchFiles';var getIEVersion=function(){var userAgent=(navigator.userAgent).toLowerCase(),ieVersion;ieVersion=parseInt((/msie (\d+)/.exec(userAgent)||[])[1]);if(isNaN(ieVersion)){ieVersion=parseInt((/trident\/.*; rv:(\d+)/.exec(userAgent)||[])[1]);}
    if(isNaN(ieVersion)){ieVersion=-1;}
    return ieVersion;}
    ieVersion=getIEVersion();if(!href||!(href.indexOf('http://'+runDomain)===0||href.indexOf('https://'+runDomain)===0)||(ieVersion>0&&ieVersion<11)){return prefetchApi;}
    var getCookie=function(name){var arr,reg=new RegExp("(^| )"+name+"=([^;]*)(;|$)");if(arr=document.cookie.match(reg)){return unescape(arr[2]);}else{return'';}}
    var setLocalStorage=function(value){var value=value||'';if(value&&localStorage&&typeof(localStorage.setItem)!='undefined'){localStorage.setItem(localstorageName+'_page',escape(value));localStorage.setItem(localstorageName+'_time',escape(+new Date()));}}
    var getLocalStorage=function(name){var value='';if(localStorage&&typeof(localStorage.getItem)!='undefined'){value=localStorage.getItem(name);value=value?value+'':'';return unescape(value);}
        return value;}
    var pageLocalStorageValue=getLocalStorage(localstorageName+'_page')||'',lastStorageTime=parseInt(getLocalStorage(localstorageName+'_time'))||0,pagesStorageArr=pageLocalStorageValue.split(';')||[],nowDate=+new Date();var inArray=function(value,arr){var value=value||'',arr=arr||[],result=-1;if(value&&arr.length>0){for(var i=0,len=arr.length;i<len;i++){if(arr[i]==value){result=i;break;}}}
        return result;}
    var isLong=function(url,arr){var arr=arr||[],url=url||false,result=false;if(url&&arr.length>0){for(var i=0,len=arr.length;i<len;i++){if(url.indexOf(arr[i])>-1){result=true;break;}}}
        return result;}
    var addMaxAgeForFile=function(fileUrl,atlasVermap,customMaxAge){var url=fileUrl||'',maxage=parseInt(customMaxAge)||0,vermapData=atlasVermap||{},cssFiles=vermapData.cssFiles||{},longMaxAge=31536000,shortMaxAge=302400,jsLongMaxAgeArr=['/atlas','/atlas_v2','jquery/jquery','lib/angular','qzfl/qzfl','requirejs/require','qbl/core','/lib/jquery','jquery/widget/highcharts','comm/jquery/chosen/'],cssLongMaxAgeArr=[];for(var key in cssFiles){cssLongMaxAgeArr.push(key);}
        if(url){if(url.slice(-3)=='.js'){if(maxage<1){if(isLong(url,jsLongMaxAgeArr)){maxage=longMaxAge;}else{maxage=shortMaxAge;}}
            url+='?max_age='+maxage;}else if(url.slice(-4)=='.css'){if(maxage<1){if(isLong(url,cssLongMaxAgeArr)){maxage=longMaxAge;}else{maxage=shortMaxAge;}}
            url+='?max_age='+maxage;}}
        return url;}
    var getPingUrl=function(pageName){var pingUrl='',pageName=pageName||'',pathname=location.pathname||'',rand=Math.random();if(pageName&&pathname){pageName=pageName.replace(/\./gi,'_');pingUrl='http://pinghot.qq.com/pingd?dm=gdt.qq.com.hot&url='+pathname+'&tt=-&hottag=atlas_jsprefetch.'+pageName+'&hotx=9999&hoty=9999&rand='+rand;}
        return pingUrl;}
    var pingid=0;var addPing=function(url){var img=new Image(),id='prefetchPing_'+pingid,url=url||'';if(!url){return false;}
        var clearPing=function(id){var $pingid=document.getElementById(id);$pingid?$pingid.parentNode.removeChild($pingid):'';}
        img.src=url;img.id=id;img.style.display='none';img.style.width=0;img.style.height=0;img.onload=function(){clearPing(id);}
        img.onerror=function(){clearPing(id);}
        document.getElementsByTagName('body')[0].appendChild(img);pingid++;}
    var addScript=function(opt){var config=opt||{},url=config.url||'',id=config.id||'',success=config.success||function(){},error=config.error||function(){},script=null;if(!url){return false;}
        script=document.createElement('script');script.type='text/javascript';id?script.id=id:'';script.onload=success;script.onerror=error;script.src=url;document.getElementsByTagName('body')[0].appendChild(script);}
    var jsonp=function(opt){var config=opt||{},url=config.url||'',data=config.data||{},success=config.success||function(){},id=config.id||'';var clearScript=function(id){setTimeout(function(){var jsonpScript=document.getElementById(id);jsonpScript?jsonpScript.parentNode.removeChild(jsonpScript):'';},1000)}
        window.getAtlasPrefetchFiles=success;addScript({url:url,id:id,success:function(){clearScript(id);},error:function(){clearScript(id);}});}
    var createLink=function(url,relType){var url=url||'',rel=relType||'prefetch',link=null;if(!url){return false;}
        link=document.createElement('link');link.rel=rel;link.href=url;document.getElementsByTagName('head')[0].appendChild(link);}
    var setPrefetch=function(url){createLink(url,'prefetch');}
    var setPrerender=function(url){createLink(url,'prerender');}
    var getUrlByAtlas=function(fileUrl,jsFilesVersionMap,serverEnv){var url=fileUrl||'',verMap=jsFilesVersionMap||{},env=serverEnv||'formal',verKey='',path='/qzone/biz/gdt/atlas/';var keyMap={'mod/listmanage':'listmanage','mod/report':'modreport','mod/accountstat':'modaccountstat','mod/message':'modmessage','view/accountstat':'viewaccountstat','view/message':'viewmessage','view/help':'viewhelp'}
        if(url){if(url.indexOf('/atlas/')>-1){if(url.indexOf('config/')>-1){verKey=url.replace(path+'config/','');}else if(url.indexOf('comm/')>-1){verKey=url.replace(path+'comm/','');}else if(url.indexOf('plugin/')>-1){verKey=url.replace(path+'plugin/','');}else{verKey=url.replace(path,'');verKey=keyMap[verKey]?keyMap[verKey]:verKey;}}
            if(url.indexOf('/qzone/biz/gdt/comm/utils')>-1){verKey='utils';}
            if(verKey&&verMap[verKey]){if(env=='develop'){url+='.source';}else{url+='.'+verMap[verKey];}}
            if(url.slice(-3)!='.js'){url+='.js';}}
        return url;}
    var getUrlByAtlasV2=function(fileUrl,jsFilesVersionMap,serverEnv){var url=fileUrl||'',verMap=jsFilesVersionMap||{},env=serverEnv||'formal',verKey='',path='/qzone/biz/gdt/atlas_v2/';if(url){if(url.indexOf('/atlas_v2/')>-1){verKey=url.replace(path,'js/');}
        if(verKey&&verMap[verKey]){url+='.'+verMap[verKey];}
        if(url.slice(-3)!='.js'){url+='.js';}}
        return url;}
    var addDomain=function(fileUrl,fileDomain){var url=fileUrl||'',domain=fileDomain||'';if(url&&domain&&url.indexOf('http://')<0){url='http://'+domain+url;}
        return url;}
    prefetchApi.startJsPrefetch=function(opt){var config=opt||[];if(config&&config.length<1){config.push({pageName:'index',atlasVersion:'atlasV2'})}
        var pageName='',atlasVersion='';var pageConfig=[];for(var i=0,len=config.length;i<len;i++){if(config[i]&&config[i]['pageName']&&inArray(config[i]['pageName'],pagesStorageArr)<0){pageConfig.push(config[i]);}}
        if(lastStorageTime>0&&nowDate-lastStorageTime<259200000&&pageConfig.length<1){return false;}
        var jsonpId='getAtlasPrefetchFiles',rand=Math.random();jsonp({url:document.baseURI+'js/content.js?rand='+rand,data:{},id:jsonpId,success:function(result){var result=result||{},env=result.env||{},atlasVermap=result.atlasVermap||{},atlasV2Vermap=result.atlasV2Vermap||{},atlasPrefetchFiles=result.atlasPrefetchFiles||{},atlasV2PrefetchFiles=result.atlasV2PrefetchFiles||{};var defaultCssDomain='qzonestyle.gtimg.cn',defaultJsDomainn='i.gtimg.cn',ptisp=getCookie('ptisp')||'';var cssdomian=env.data&&env.data.cssdomain?env.data.cssdomain:(ptisp?ptisp+'.'+defaultCssDomain:''),jsdomian=env.data&&env.data.jsdomian?env.data.jsdomian:(ptisp?ptisp+'.'+defaultJsDomainn:''),serverEnv=env.data&&env.data.env?env.data.env:'formal';if(!jsdomian){return false;}
            var atlasFiles=atlasVermap.list||{};var atlasV2JsFiles=atlasV2Vermap.jsFiles||{};var prefetchFiles=[];var prefetchDataFile={};var url='';var prefetchPageName=[];for(var i=0,len=pageConfig.length;i<len;i++){if(pageConfig[i]){pageName=pageConfig[i]['pageName']||'';atlasVersion=pageConfig[i]['atlasVersion']||'';if(pageName){if(atlasVersion=='atlas'){prefetchFiles=atlasPrefetchFiles[pageName];for(var j=0,jlen=prefetchFiles.length;j<jlen;j++){prefetchDataFile=prefetchFiles[j];url=prefetchDataFile['file']||'';if(url){url=getUrlByAtlas(prefetchDataFile['file'],atlasFiles,serverEnv);if(typeof(prefetchDataFile['maxage'])!='undefined'){if(prefetchDataFile['maxage']){url=addMaxAgeForFile(url,atlasFiles,prefetchDataFile['maxage']);}}else{url=addMaxAgeForFile(url,atlasFiles);}
                setPrefetch(addDomain(url,jsdomian));}}}else if(atlasVersion=='atlasV2'){prefetchFiles=atlasV2PrefetchFiles[pageName];for(var j=0,jlen=prefetchFiles.length;j<jlen;j++){prefetchDataFile=prefetchFiles[j];url=prefetchDataFile['file']||'';if(url){url=getUrlByAtlasV2(prefetchDataFile['file'],atlasV2JsFiles,serverEnv);if(typeof(prefetchDataFile['maxage'])!='undefined'){if(prefetchDataFile['maxage']){url=addMaxAgeForFile(url,atlasFiles,prefetchDataFile['maxage']);}}else{url=addMaxAgeForFile(url,atlasFiles);}
                setPrefetch(addDomain(url,jsdomian));}}}
                pagesStorageArr.push(pageName);if(prefetchFiles.length>0){prefetchPageName.push(pageName);}}}}
            setLocalStorage(pagesStorageArr.join(';'));for(var i=0,len=prefetchPageName.length;i<len;i++){addPing(getPingUrl(prefetchPageName[i]));}}})}
    if(typeof noGlobal===typeof undefined){setTimeout(function(){prefetchApi.startJsPrefetch();},5000)}
    return prefetchApi;}catch(e){}});