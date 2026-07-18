// 脚本名称: WDD_Unlock.js
// 匹配 URL: ^https:\/\/api\.qufaquan\.cn\/zwyd\/(grant\/cancel\/upgrade|user\/member)

let body = $response.body;
if (body) {
    let obj = JSON.parse(body);
    
    // 根据抓包分析，VIP 相关字段如下
    if (obj.data) {
        obj.data.isVip = 1;
        obj.data.is_vip = 1;
        obj.data.vipStatus = 1;
        obj.data.vipLevel = 99;
        obj.data.is_premium = 1;
        obj.data.isForEverVip = true;
        obj.data.vip_expire_time = "2099-12-31 23:59:59";
        obj.data.expireTime = "2099-12-31 23:59:59";
        obj.data.endTime = "2099-12-31 23:59:59";
    }
    
    body = JSON.stringify(obj);
    $done({ body });
} else {
    $done({});
}
