/*
脚本功能：Echo Loop (基于 RevenueCat 通用解锁)
脚本作者：Ayden
*/
const body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);

        // 如果是 RevenueCat 的用户数据接口
        if (obj && obj.subscriber) {
            obj.subscriber.subscriptions = obj.subscriber.subscriptions || {};
            obj.subscriber.entitlements = obj.subscriber.entitlements || {};
            
            // 穷举常见的 VIP 权限标识，进行全量注入
            const entitlement_names = ["pro", "vip", "premium", "Premium", "plus", "standard"];
            const mock_product_id = "echoloop_pro_lifetime"; // 伪造的商品ID
            
            // 1. 注入权限 (Entitlements)
            entitlement_names.forEach(ent => {
                obj.subscriber.entitlements[ent] = {
                    "expires_date": "2099-12-31T23:59:59Z",
                    "product_identifier": mock_product_id,
                    "purchase_date": "2023-01-01T00:00:00Z"
                };
            });
            
            // 2. 注入订阅记录 (Subscriptions)
            obj.subscriber.subscriptions[mock_product_id] = {
                "expires_date": "2099-12-31T23:59:59Z",
                "original_purchase_date": "2023-01-01T00:00:00Z",
                "purchase_date": "2023-01-01T00:00:00Z",
                "store": "app_store"
            };
            
            $done({ body: JSON.stringify(obj) });
        } else {
            $done({});
        }
    } catch (e) {
        $done({});
    }
} else {
    $done({});
}
