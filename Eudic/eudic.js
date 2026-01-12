/*
脚本功能：每日英语听力/欧路词典 VIP 解锁
脚本作者：Ayden
文件位置：Eudic/eudic.js
*/
const url = $request.url;
const body = $response.body;

if (body) {
    let obj = JSON.parse(body);

    // 定义 VIP 属性
    const vipInfo = {
        "is_vip": true,
        "expire_date": "2099-09-09",
        "vip_expire_date": "2099-09-09",
        "is_audio_vip": true,  // 听力专用
        "audio_vip_expire_date": "2099-09-09"
    };

    // 针对不同接口结构进行注入
    // 每日英语听力通常直接在根对象，或者在 user 字段下
    if (typeof obj === "object") {
        Object.assign(obj, vipInfo);
        
        // 如果有 user 字段，也顺便改了
        if (obj.user) {
            Object.assign(obj.user, vipInfo);
        }
    }

    $done({ body: JSON.stringify(obj) });
} else {
    $done({});
}