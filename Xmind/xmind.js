/*
脚本功能：Xmind Pro+ 解锁 (安全模式)
脚本作者：chxm1023
修改人员：Ayden
说明：移除了 Token 劫持逻辑，解决无法登录问题；仅尝试修改订阅状态。
*/

const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

// 匹配正则：只匹配设备和订阅接口，不再碰 Token
const vipPath = /_res\/(devices|appstore\/sub)/;
const activePath = /_api\/appstore\/active/;

// 构造 VIP 数据
const vipData = {
  "license" : {
    "status" : "sub",
    "level" : "pro",
    "tier" : "pro_plus",
    "expireTime" : 4092599349000
  },
  "subscription": {
      "status": "active",
      "level": "pro",
      "expireTime": 4092599349000
  },
  "_code" : 200,
  // 必须带上签名，否则 App 会报错
  "raw_data" : "GfxYgAqnrQ/ggD9UwqnZyAj6FKnopXzM8s5m3eZLOsmVr4FwCzv41qTmgi/u72cv+jpaAoljaEPti1twzOS7X7KUPY1KNJ2xalbS7SXbvFHSvs21QXjaUtIOkeJWAl4/vHl4IvMeHTBVqD8mFCXOmvnBPLRMAJEPgHEJYF1InvQ="
};

// 只有在查询会员状态时，才注入数据
if (vipPath.test(url) || activePath.test(url)) {
    obj = vipData;
}

$done({body : JSON.stringify(obj)});