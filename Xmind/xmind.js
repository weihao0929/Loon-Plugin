/*
脚本功能：Xmind Pro+ 解锁 (全字段注入版)
脚本作者：chxm1023
修改人员：Ayden
文件名称：xmind.js
*/

const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

// 定义匹配正则 (覆盖旧版和新版接口)
const vipPath = /_res\/(devices|appstore\/sub)/;
const tokenPath = /_res\/token/;
const activePath = /_api\/appstore\/active/;

// 构造 Xmind Pro+ 数据
const vipData = {
  "license" : {
    "status" : "sub",
    "level" : "pro",         // 尝试匹配 Pro 级别
    "tier" : "pro_plus",     // 尝试匹配 Pro+ 级别
    "expireTime" : 4092599349000
  },
  "subscription": {          // 针对新版接口可能的结构
      "status": "active",
      "level": "pro",
      "expireTime": 4092599349000
  },
  "_code" : 200,
  // 必须带上这个旧版签名，虽然可能无效，但不带肯定不行
  "raw_data" : "GfxYgAqnrQ/ggD9UwqnZyAj6FKnopXzM8s5m3eZLOsmVr4FwCzv41qTmgi/u72cv+jpaAoljaEPti1twzOS7X7KUPY1KNJ2xalbS7SXbvFHSvs21QXjaUtIOkeJWAl4/vHl4IvMeHTBVqD8mFCXOmvnBPLRMAJEPgHEJYF1InvQ="
};

// 场景1：处理设备状态、订阅查询、Active接口
if (vipPath.test(url) || activePath.test(url)) {
    obj = vipData;
}

// 场景2：处理 Token
if (tokenPath.test(url)) {
    obj.expireDate = 4092599349000;
    obj.token = "f50633ea8eb04cbb85962b99c47045d7AjOobEGo";
}

$done({body : JSON.stringify(obj)});