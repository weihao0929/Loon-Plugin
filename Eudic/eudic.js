/*
脚本功能：每日英语听力/欧路词典 VIP (安全注入版)
脚本作者：Ayden
*/
const url = $request.url;
let body = $response.body;

// 过滤掉 CSS/HTML 等静态资源，只处理 JSON
if (body && body.indexOf('is_vip') !== -1 || body.indexOf('user') !== -1) {
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

        if (obj) {
            Object.assign(obj, vipData);
            if (obj.user) {
                Object.assign(obj.user, vipData);
            }
        }
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        // 如果解析 JSON 失败（比如抓到了 HTML），直接放行
        $done({});
    }
} else {
    $done({});
}