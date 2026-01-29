/*
脚本功能：小睡眠 VIP 暴力解锁 (地毯式轰炸版)
脚本作者：Ayden
更新时间：2026-01-29
*/
const url = $request.url;
let body = $response.body;

// 递归修改函数：见到锁就砸，见到VIP就开
function bomb(obj) {
    if (typeof obj !== 'object' || obj === null) return;

    // --- 1. 砸开所有的锁 (常见字段全部覆盖) ---
    const lockFields = ['is_locked', 'locked', 'lock', 'need_vip', 'vip_only', 'preview'];
    lockFields.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            obj[key] = 0; // 统统设为 0 (false)
        }
    });

    // --- 2. 免费所有的价 (价格清零) ---
    const priceFields = ['price', 'original_price', 'discount_price'];
    priceFields.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            obj[key] = 0;
        }
    });

    // --- 3. 开启所有的权 (VIP权限) ---
    const vipFields = ['is_vip', 'is_life_vip', 'vip', 'is_free', 'free', 'download'];
    vipFields.forEach(key => {
        if (obj.hasOwnProperty(key)) {
            obj[key] = 1; // 统统设为 1 (true)
        }
    });

    // --- 4. 暴力修正 VIP 时间 ---
    if (obj.hasOwnProperty('vip_expire_time')) obj.vip_expire_time = 4092599349;
    if (obj.hasOwnProperty('expires_date')) obj.expires_date = 4092599349;

    // --- 5. 继续深入递归 ---
    for (let key in obj) {
        bomb(obj[key]);
    }
}

if (body) {
    try {
        let obj = JSON.parse(body);
        
        // 执行轰炸
        bomb(obj);

        // 针对 user/info 接口的额外保险
        if (url.indexOf('user/info') !== -1 || url.indexOf('user/profile') !== -1) {
             const vipMeta = {
                "is_vip": true,
                "vip_type": 1,
                "status": 1,
                "vip_expire_time": 4092599349
            };
            if (obj.data && typeof obj.data === 'object') {
                Object.assign(obj.data, vipMeta);
                if (obj.data.user) Object.assign(obj.data.user, vipMeta);
            }
        }

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        $done({});
    }
} else {
    $done({});
}