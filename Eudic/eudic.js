/*
脚本功能：每日英语听力/欧路词典 - 终身VIP + 去广告辅助
脚本作者：Ayden
更新时间：2026-01-11
*/
const url = $request.url;
let body = $response.body;

if (body) {
    let obj = JSON.parse(body);

    // 定义土豪数据：终身会员 + 永久过期
    const vipData = {
        "is_vip": true,
        "vip_type": 1, // 1 通常代表终身/高级
        "expire_date": "2099-09-09",
        "vip_expire_date": "2099-09-09",
        "is_audio_vip": true,
        "audio_vip_expire_date": "2099-09-09",
        "is_life_vip": true, // 每日英语听力特有
        "mega_vip_expire_date": "2099-09-09"
    };

    // 针对每日英语听力/欧路词典的两种数据结构
    if (obj) {
        // 情况A：数据在根目录 (常见于 get_user_info)
        Object.assign(obj, vipData);
        
        // 情况B：数据在 user 字段下 (常见于 v1/user/info)
        if (obj.user) {
            Object.assign(obj.user, vipData);
        }
    }

    $done({ body: JSON.stringify(obj) });
} else {
    $done({});
}