/*
脚本功能：歪点点 VIP 通用解锁
*/
const body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);

        // 穷举并覆盖国内 App 常用的所有 VIP 验证字段
        const vipData = {
            "isVip": 1,
            "is_vip": 1,
            "vipLevel": 99,
            "vip_type": 1,
            "vipStatus": 1,
            "is_premium": 1,
            "vip_expire_time": "2099-12-31 23:59:59",
            "expireTime": "2099-12-31 23:59:59",
            "endTime": "2099-12-31 23:59:59",
            "isForeverVip": true
        };

        // 尝试在主目录和常见的嵌套目录下注入
        if (obj.data) {
            Object.assign(obj.data, vipData);
            if (obj.data.userInfo) {
                Object.assign(obj.data.userInfo, vipData);
            }
            if (obj.data.user) {
                Object.assign(obj.data.user, vipData);
            }
        } else {
            Object.assign(obj, vipData);
        }

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        $done({});
    }
} else {
    $done({});
}
