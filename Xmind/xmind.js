/*
脚本功能：Xmind 旧版解锁逻辑 (2022版)
说明：针对新版可能已失效，仅作测试。
*/

// 解析响应体
let obj = JSON.parse($response.body);

// 如果存在 license 字段，则进行修改
if (obj.license) {
  // 修改状态为 'sub' (subscription)
  obj.license.status = 'sub';
  
  // 修改过期时间为 2030-01-11 (16进制 0x1b8d90e4000 转 10进制)
  obj.license.expireTime = 1894255534080;
}

// 重新打包并结束
$done({body: JSON.stringify(obj)});