/*
脚本功能：GoodNotes 6 + Notability Plus (精准解锁版)
逻辑修正：
1. GoodNotes: 保持已验证通过的逻辑
2. Notability: 针对 UI 上的 "Plus" 计划，精准注入 plus_subscription 权益
*/

const obj = JSON.parse(typeof $response != "undefined" && $response.body || null);

// 通用的永久会员数据
const common_data = {
  "expires_date": "2099-09-09T09:09:09Z",
  "original_purchase_date": "2023-02-23T02:33:33Z",
  "purchase_date": "2023-02-23T02:33:33Z",
  "ownership_type": "PURCHASED",
  "store": "app_store"
};

if (obj && obj.subscriber) {
  // ==========================================
  // 1. GoodNotes 6 解锁 (已验证)
  // ==========================================
  const gn_id = "com.goodnotes.gn6_one_time_unlock_3999";
  
  obj.subscriber.entitlements["apple_access"] = Object.assign({}, common_data, {
    "product_identifier": gn_id
  });
  
  obj.subscriber.subscriptions[gn_id] = Object.assign({}, common_data, {
    "period_type": "normal",
    "is_sandbox": false
  });

  // ==========================================
  // 2. Notability Plus 解锁 (修正)
  // ==========================================
  // 界面显示: Plus -> 代码对应 Entitlement: plus_subscription
  // 对应的内购商品ID (年费): com.gingerlabs.notability.premium_subscription
  
  const nb_id = "com.gingerlabs.notability.premium_subscription";

  // 精准注入 "plus_subscription" 权益
  obj.subscriber.entitlements["plus_subscription"] = Object.assign({}, common_data, {
    "product_identifier": nb_id
  });

  // 注入对应的订阅状态
  obj.subscriber.subscriptions[nb_id] = Object.assign({}, common_data, {
    "period_type": "active", // 这里必须是 active
    "is_sandbox": false
  });
}

$done({body: JSON.stringify(obj)});