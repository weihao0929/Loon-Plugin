/*
脚本功能：GoodNotes 6 解锁 (双保险增强版)
脚本作者：Ayden
说明：同时注入 GN6 和 GN5 权益，防止掉授权。
*/
const obj = JSON.parse(typeof $response != "undefined" && $response.body || null);

// 通用数据
const common_data = {
  "expires_date": "2099-09-09T09:09:09Z",
  "original_purchase_date": "2023-02-23T02:33:33Z",
  "purchase_date": "2023-02-23T02:33:33Z",
  "ownership_type": "PURCHASED",
  "store": "app_store"
};

if (obj && obj.subscriber) {
  // 1. 注入 GoodNotes 6 永久买断权益 (核心)
  const gn6_id = "com.goodnotes.gn6_one_time_unlock_3999";
  obj.subscriber.entitlements["apple_access"] = Object.assign({}, common_data, {
    "product_identifier": gn6_id
  });
  obj.subscriber.subscriptions[gn6_id] = Object.assign({}, common_data, {
    "period_type": "normal",
    "is_sandbox": false
  });

  // 2. 注入 GoodNotes 5 权益 (防御性注入，更稳)
  const gn5_id = "com.goodnotes.gn.full_unlock";
  obj.subscriber.entitlements["com.goodnotes.gn.full_unlock"] = Object.assign({}, common_data, {
    "product_identifier": gn5_id
  });
  obj.subscriber.subscriptions[gn5_id] = Object.assign({}, common_data, {
    "period_type": "normal",
    "is_sandbox": false
  });
}

$done({body: JSON.stringify(obj)});