/*
脚本功能：小睡眠 VIP 解锁
脚本作者：Ayden
文件位置：XiaoShuiMian/xiaoshuimian.js
*/
const path = $request.url;
let body = $response.body;

if (body) {
    let obj = JSON.parse(body);

    // 定义 VIP 属性 (包含时间戳和布尔值)
    const vipData = {
        "is_vip": true,
        "vip_type": 1, 
        "vip_expire_time": 4092599349, // 2099年时间戳
        "expires_date": 4092599349,
        "is_life_vip": true,
        "status": 1
    };

    // 场景 A：直接在 data 层级 (常见于 user/info)
    if (obj.data) {
        Object.assign(obj.data, vipData);
        // 有时候用户信息在 data.user 里
        if (obj.data.user) {
            Object.assign(obj.data.user, vipData);
        }
    } 
    // 场景 B：直接在根目录
    else {
        Object.assign(obj, vipData);
    }

    $done({ body: JSON.stringify(obj) });
} else {
    $done({});
}