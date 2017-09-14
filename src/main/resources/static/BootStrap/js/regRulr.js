function encodeJson(str) {
    str = replaceAllEx(str, '\\', '\\\\');
    str = replaceAllEx(str, '\"', '\\\"');
    str = replaceAllEx(str, '/', '\\/');
    str = replaceAllEx(str, '\b', '\\b');
    str = replaceAllEx(str, '\f', '\\f');
    str = replaceAllEx(str, '\n', '\\n');
    str = replaceAllEx(str, '\r', '\\r');
    str = replaceAllEx(str, '\t', '\\t');
    str = replaceAllEx(str, '\'', '');
    var reg = '[。~!@#$%\^\+\*&\\\/\?\|:\.<>{}()\';="]';
    str.replace(reg,'');
    return str;
}
function encodeJson_News(str) {
    str = replaceAllEx(str, '\\', '\\\\');
    str = replaceAllEx(str, '\"', '\\\"');
    str = replaceAllEx(str, '/', '\\/');
    str = replaceAllEx(str, '\b', '\\b');
    str = replaceAllEx(str, '\f', '\\f');
    str = replaceAllEx(str, '\n', '\\n');
    str = replaceAllEx(str, '\r', '\\r');
    str = replaceAllEx(str, '\t', '\\t');
    var reg = '[。~!@#$%\^\+\*&\\\/\?\|:\.<>{}()\';="]';
    str.replace(reg, '');
    return str;
}
function encodeJson_Order(str) {
    str = replaceAllEx(str, '\\', '\\\\');
    str = replaceAllEx(str, '\"', '\\\"');
    str = replaceAllEx(str, '/', '\\/');
    str = replaceAllEx(str, '\b', '\\b');
    str = replaceAllEx(str, '\f', '\\f');
    str = replaceAllEx(str, '\n', '\\n');
    str = replaceAllEx(str, '\r', '\\r');
    str = replaceAllEx(str, '\t', '\\t');
    str = replaceAllEx(str, '\'', '\\\'');
    var reg = '[。~!@#$%\^\+\*&\\\/\?\|:\.<>{}()\';="]';
    str.replace(reg, '');
    return str;
}

function replaceAllEx(text, oldChar, newChar) {
    var index = text.indexOf(oldChar);

    var json = "";
    while (index != -1) {
        json = json + text.substring(0, index) + newChar;
        text = text.substring(index + 1, text.length);
        index = text.indexOf(oldChar);
    }
    json = json + text;
    return json;
}