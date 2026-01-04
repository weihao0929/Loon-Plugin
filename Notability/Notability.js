/*
脚本功能：Notability Plus 独立解锁
逻辑：伪装 2024 年新用户，强制解锁 Plus
*/
const obj = JSON.parse(typeof $response != "undefined" && $response.body || null);

const common_data = {
  "expires_date": "2099-09-09T09:09:09Z",
  "original_purchase_date": "2024-01-01T00:00:00Z", // 伪装成新用户
  "purchase_date": "2024-01-01T00:00:00Z",
  "ownership_type": "PURCHASED",
  "store": "app_store"
};

if (obj && obj.subscriber) {
  // 清空旧权益
  obj.subscriber.entitlements = {};
  obj.subscriber.subscriptions = {};
  obj.subscriber.original_purchase_date = "2024-01-01T00:00:00Z";

  const nb_id = "com.gingerlabs.notability.premium_subscription";
  
  // 注入 Plus 权益
  obj.subscriber.entitlements["plus_subscription"] = Object.assign({}, common_data, {
    "product_identifier": nb_id
  });

  // 注入订阅状态
  obj.subscriber.subscriptions[nb_id] = Object.assign({}, common_data, {
    "period_type": "normal",
    "is_sandbox": false
  });
}

$done({body: JSON.stringify(obj)});