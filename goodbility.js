/*
脚本功能：GoodNotes 6 + Notability Plus 二合一解锁
逻辑更新：同时写入两款 App 的会员权益，互不冲突
*/

const obj = JSON.parse(typeof $response != "undefined" && $response.body || null);

// 通用的永久会员数据模板
const common_data = {
  "expires_date": "2099-09-09T09:09:09Z",
  "original_purchase_date": "2023-02-23T02:33:33Z",
  "purchase_date": "2023-02-23T02:33:33Z",
  "ownership_type": "PURCHASED",
  "store": "app_store"
};

if (obj && obj.subscriber) {
  // -----------------------
  // 1. GoodNotes 6 解锁部分
  // -----------------------
  const gn_id = "com.goodnotes.gn6_one_time_unlock_3999";
  
  // 注入 GN 权益
  obj.subscriber.entitlements["apple_access"] = Object.assign({}, common_data, {
    "product_identifier": gn_id
  });
  
  // 注入 GN 订阅状态
  obj.subscriber.subscriptions[gn_id] = Object.assign({}, common_data, {
    "period_type": "normal", // 消除 GN 试用条的关键
    "is_sandbox": false
  });

  // -----------------------
  // 2. Notability 解锁部分
  // -----------------------
  const nb_id = "com.gingerlabs.notability.premium_subscription";
  
  // 注入 Notability 权益 (通常权益名叫 plus_subscription)
  obj.subscriber.entitlements["plus_subscription"] = Object.assign({}, common_data, {
    "product_identifier": nb_id
  });
  
  // 注入 Notability 订阅状态
  obj.subscriber.subscriptions[nb_id] = Object.assign({}, common_data, {
    "period_type": "active", // Notability 通常用 active 或 normal
    "is_sandbox": false
  });
}

$done({body: JSON.stringify(obj)});