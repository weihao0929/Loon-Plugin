/*
脚本功能：移除请求头中的缓存验证字段 (If-None-Match / If-Modified-Since)
作用：强制服务器返回 200 OK 和完整的 Body，防止返回 304 Not Modified (无 Body)
*/

// 获取当前请求头
const headers = $request.headers;

// 移除常见的缓存验证字段
// 注意：Loon/QX 中 headers 的 key 通常保留原大小写，为了保险起见，建议删除时兼顾一下
const keysToDelete = ["If-None-Match", "If-Modified-Since", "if-none-match", "if-modified-since"];

for (const key of keysToDelete) {
  if (headers[key]) {
    delete headers[key];
  }
}

// 结束脚本，返回修改后的 headers
$done({ headers });
