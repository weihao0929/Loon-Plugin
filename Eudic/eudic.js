/*
脚本功能：每日英语听力 VIP (全方位注入版)
脚本作者：Ayden
*/
const url = $request.url;
let body = $response.body;

// 1. 如果是 VIP 介绍页，直接告诉 App "不用介绍了，我是会员" (尝试伪造状态)
if (url.indexOf('vipintroduce') !== -1) {
    // 这种接口通常不需要返回复杂 JSON，只要不报错即可，或者我们尝试注入一段成功代码
    // 但为了安全，主要还是靠修改 User Info。这里仅作 pass 处理。
}

// 2. 常规 JSON 注入 (核心逻辑)
// 只有当 Body 看起来像 JSON 时才处理
if (body && (body.indexOf('{') !== -1)) {
    try {
        let obj = JSON.parse(body);

        const vipData = {
            "is_vip": true,
            "vip_type": 1,
            "expire_date": "2099-09-09",
            "vip_expire_date": "2099-09-09",
            "is_audio_vip": true,
            "audio_vip_expire_date": "2099-09-09",
            "is_life_vip": true,
            "mega_vip_expire_date": "2099-09-09"
        };

        // 暴力注入：无论结构如何，只要有 user 字段或根对象，都塞进去
        if (obj) {
            Object.assign(obj, vipData);
            if (obj.user) {
                Object.assign(obj.user, vipData);
            }
            // 针对某些接口可能返回 {data: {user: ...}}
            if (obj.data && obj.data.user) {
                Object.assign(obj.data.user, vipData);
            }
        }
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        // 如果解析失败，原样返回
        $done({});
    }
} else {
    $done({});
}