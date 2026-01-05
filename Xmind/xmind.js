/*
脚本功能：Xmind Pro+ 解锁 (全字段注入版)
脚本作者：chxm1023
修改人员：Ayden
说明：尝试注入 level: pro 字段以匹配 Pro+ 权益
*/

const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

// 定义匹配正则
const vipPath = /_res\/(devices|appstore\/sub)/;
const tokenPath = /_res\/token/;
const activePath = /_api\/appstore\/active/;

// 构造 Xmind Pro+ 数据
// 关键：在 license 里增加了 level: pro
const vipData = {
  "license" : {
    "status" : "sub",
    "level" : "pro",         // 尝试匹配 Pro 级别
    "tier" : "pro_plus",     // 猜测性注入
    "expireTime" : 4092599349000
  },
  "subscription": {          // 针对新版可能的结构
      "status": "active",
      "level": "pro",
      "expireTime": 4092599349000
  },
  "_code" : 200,
  "raw_data" : "GfxYgAqnrQ/ggD9UwqnZyAj6FKnopXzM8s5m3eZLOsmVr4FwCzv41qTmgi/u72cv+jpaAoljaEPti1twzOS7X7KUPY1KNJ2xalbS7SXbvFHSvs21QXjaUtIOkeJWAl4/vHl4IvMeHTBVqD8mFCXOmvnBPLRMAJEPgHEJYF1InvQ="
};

// 场景1：处理设备/订阅查询接口
if (vipPath.test(url) || activePath.test(url)) {
    obj = vipData;
}

// 场景2：处理 Token
if (tokenPath.test(url)) {
    obj.expireDate = 4092599349000;
    obj.token = "f50633ea8eb04cbb85962b99c47045d7AjOobEGo";
}

$done({body : JSON.stringify(obj)});