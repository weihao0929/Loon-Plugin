/*
脚本功能：小睡眠 VIP 暴力解锁 (全域遍历版)
脚本作者：Ayden
说明：自动递归解锁列表中的音频资源
*/
const url = $request.url;
let body = $response.body;

// 定义要注入的 VIP 核心数据
const vipMix = {
    "is_vip": true,
    "vip_type": 1,
    "vip_expire_time": 4092599349,
    "expires_date": 4092599349,
    "status": 1
};

// 递归解锁函数：专门寻找锁头并撬开
function traverseAndUnlock(obj) {
    if (typeof obj !== 'object' || obj === null) return;

    // 1. 如果对象里包含特定的“锁”字段，直接修改
    if (obj.hasOwnProperty('is_locked')) obj.is_locked = false;
    if (obj.hasOwnProperty('lock')) obj.lock = false;
    if (obj.hasOwnProperty('is_free')) obj.is_free = true;
    if (obj.hasOwnProperty('price')) obj.price = 0;
    
    // 2. 如果对象里本来就有 VIP 字段，强制覆盖为 true
    if (obj.hasOwnProperty('is_vip')) obj.is_vip = true;

    // 3. 继续深入遍历（处理数组和子对象）
    for (let key in obj) {
        traverseAndUnlock(obj[key]);
    }
}

if (body) {
    try {
        let obj = JSON.parse(body);

        // 执行全域解锁
        traverseAndUnlock(obj);

        // 针对用户信息接口的额外保底 (防止递归没覆盖到顶层)
        if (url.indexOf('user') !== -1 || url.indexOf('profile') !== -1 || url.indexOf('vip') !== -1) {
            if (obj.data && typeof obj.data === 'object') {
                Object.assign(obj.data, vipMix);
            } else {
                Object.assign(obj, vipMix);
            }
        }

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        // 如果不是 JSON 数据（比如音频文件本身），直接放行
        $done({});
    }
} else {
    $done({});
}