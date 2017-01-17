/**
 * Created by Longder on 2017/1/17.
 */
/**
 * 请求信息
 * @type {{}}
 */
var requestBody = {
    desKey: "",
    md5Key: "",
    cagent: "",
    apiUrl: ""
};
/**
 * 初始化请求对象
 * @param desKey
 * @param md5Key
 * @param cagent
 * @param apiUrl
 */
function initRequestBody(desKey, md5Key, cagent, apiUrl) {
    requestBody.desKey = desKey;
    requestBody.md5Key = md5Key;
    requestBody.cagent = cagent;
    requestBody.apiUrl = apiUrl;
}
/**
 * 检查apiUrl
 * @returns {*}
 */
function checkRequestBody() {
    if (requestBody.desKey == "") {
        return {message: "desKey为空", status: false};
    } else if (requestBody.md5Key == "") {
        return {message: "md5Key为空", status: false};
    } else if (requestBody.cagent == "") {
        return {message: "cagent为空", status: false};
    } else if (requestBody.apiUrl == "") {
        return {message: "apiUrl为空", status: false};
    } else {
        return {message: "参数齐全", status: true};
    }
}
/**
 * 加密方法
 */
function encode(str) {
    return Base64.encode(strEnc(str, requestBody.desKey));
}

/**
 * 创建用户
 */
function create(username, password, acType) {
    var checkResult = checkRequestBody();
    if (!checkResult.status) {
        return checkResult.message;
    }
    var params = encode("cagent=" + requestBody.cagent + "/\\\\/loginname=" + username + "/\\\\/method=lg/\\\\/actype=" + acType + "/\\\\/password=" + password);
    var key = hex_md5(params + requestBody.md5Key);
    var url = requestBody.apiUrl + "business/creategameaccout/?params=" + params + "&key=" + key;
    $.get(url, function (result) {
        alert(result);
    });
}

$(function () {
    //初始化请求对象
    initRequestBody("", "", "", "");
});