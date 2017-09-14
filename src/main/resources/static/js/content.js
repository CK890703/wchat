
var contentId = parseInt(Math.random() * 10000);
var port = null;

//打日志函数
function log(text){
    window.console && console.log('[' + (Date()) +  '][content.js][ ' + contentId + ']' + text);
}

log('Enter content.js, contentId = ' + contentId);

//---------------------------------------content.js与网页交互---------------------------------------//
//监听网页事件
//eventMsg:{detail:{type:0, param:{cmd:"", param:{result:0, message:""}}}}
document.addEventListener("PageEvent", function(eventMsg) {
    var detail = eventMsg.detail;
    log('PageEvent: detail = ' + JSON.stringify(detail));

    if(detail.type == 0){
        switch(detail.param.cmd){
            case 'connect':
                connect(detail, function(result, message){
                    log('PageEvent:connect: result = ' + result + ', message = ' + JSON.stringify(message));
                    if(result){
                        dispatchPageEvent(message);
                    }else{
                        dispatchPageEvent({
                            type : 0,
                            param : {
                                cmd : 'connect_result',
                                param : {
                                    result : result,
                                    message : message
                                }
                            }
                        })
                    }
                });
                break;
            case 'disconnect':
                disconnect();
                break;
        }
    }else{
        //其他消息通通给background
        sendMessageToBackground(detail);
    }
}, false);
//触发网页事件
//eventMsg:{type:0, param:{cmd:"", param:{result:0, message:"", host:""}}}
function dispatchPageEvent(eventMsg){
    log('dispatchPageEvent: eventMsg.type = ' + eventMsg.type);

    var e = document.createEvent('CustomEvent');
    e.initCustomEvent('ContentEvent', true, true, eventMsg);
    document.dispatchEvent(e);
}


//---------------------------------------content.js与background.js交互---------------------------------------//
//连接background.js
function connect(msg, callbackFunc){
    log("connect: Enter")
    if(port){
        return;
    }

    //超时当作失败，联调中，先不设超时
    var timer;
    // timer = setTimeout(function(){
    // 	if(port){
    // 		port.disconnect();
    // 		port = null;
    // 	}
    // 	callbackFunc && callbackFunc(false, 'connect timeout');
    // },5000);

    //Attempts to connect to connect listeners within an extension/app (such as the background page), or other extensions/apps.
    port = chrome.runtime.connect({name: "port" + contentId});

    //监听连接断开事件
    port.onDisconnect.addListener(function() {
        log("connect:onDisconnect: Enter");

        //清空定时器
        if(timer){
            clearTimeout(timer);
            timer = null;
        }

        var connected = port.connected;
        port = null;

        if(connected){
            //连上又断开
            dispatchPageEvent({
                type : 0,
                param : {
                    cmd : 'closed',
                    param : {
                        message : chrome.runtime.lastError && chrome.runtime.lastError.message
                    }
                }
            });
        }else{
            //没连上
            callbackFunc && callbackFunc(false, 'connect error: '+(chrome.runtime.lastError && chrome.runtime.lastError.message));
        }
    });
    //监听background.js消息
    port.onMessage.addListener(function(message) {
        log("connect:onMessage: message = " + JSON.stringify(message));

        if(message.type == 0){
            //连接成功，不算正式消息
            log("connect:onMessage: connected succ");

            //清空定时器
            if(timer){
                clearTimeout(timer);
                timer = null;
            }

            port.connected = true;
            callbackFunc && callbackFunc(true, message);
        }else{
            dispatchPageEvent(message);
        }
    });

    //发连接消息到background.js
    sendMessageToBackground(msg);
}
//断开与background.js的连接
function disconnect(){
    log("connect:onMessage: Enter");
    if(!port){
        return;
    }

    port.disconnect();
    port = null;
}
//发送消息到background.js
function sendMessageToBackground(msg){
    log("sendMessageToBackground: Enter");
    if(!port){
        return;
    }

    port.postMessage(msg);
}
