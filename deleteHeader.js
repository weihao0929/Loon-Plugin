/* 公用头部清除脚本 */
const headers = $request.headers;
const keys = ["If-None-Match", "If-Modified-Since", "if-none-match", "if-modified-since"];
keys.forEach(key => delete headers[key]);
$done({headers});