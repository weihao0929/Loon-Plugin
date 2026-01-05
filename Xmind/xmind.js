/*
脚本功能：Xmind 解锁 (chxm1023 双重验证版)
脚本作者：chxm1023
修改人员：Ayden
使用说明：⚠️必须先在 App 内登录账号，然后点击“恢复购买”触发脚本。
*/

const url = $request.url;
let body = $response.body;
let obj = JSON.parse(body);

// 定义匹配正则
const vipPath = /_res\/devices/;
const tokenPath = /_res\/token/;

// 场景1：处理设备/会员状态
if (vipPath.test(url)) {
    obj = {
      "license" : {
        "status" : "sub",
        "expireTime" : 4092599349000
      },
      "_code" : 200,
      // 关键签名数据
      "raw_data" : "GfxYgAqnrQ/ggD9UwqnZyAj6FKnopXzM8s5m3eZLOsmVr4FwCzv41qTmgi/u72cv+jpaAoljaEPti1twzOS7X7KUPY1KNJ2xalbS7SXbvFHSvs21QXjaUtIOkeJWAl4/vHl4IvMeHTBVqD8mFCXOmvnBPLRMAJEPgHEJYF1InvQ="
    };
}

// 场景2：处理 Token 验证
if (tokenPath.test(url)) {
    obj.expireDate = 4092599349;
    obj.token = "f50633ea8eb04cbb85962b99c47045d7AjOobEGo";
}

$done({body : JSON.stringify(obj)});