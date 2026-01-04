/*
脚本功能：Notability Plus 稳健解锁版
逻辑：不删除原有数据，仅精准覆盖 Plus 权限，防止 App 报错。
*/

const obj = JSON.parse(typeof $response != "undefined" && $response.body || null);

if (obj && obj.subscriber) {
  // 定义 Plus 会员数据
  const data = {
    "expires_date": "2099-09-09T09:09:09Z",
    "original_purchase_date": "2023-02-23T02:33:33Z",
    "purchase_date": "2023-02-23T02:33:33Z",
    "product_identifier": "com.gingerlabs.notability.premium_subscription",
    "period_type": "active", // 使用 active 而不是 normal
    "store": "app_store",
    "is_sandbox": false,
    "ownership_type": "PURCHASED",
    "billing_issues_detected_at": null,
    "unsubscribe_detected_at": null
  };

  // 1. 注入 Entitlements (权限)
  obj.subscriber.entitlements["plus_subscription"] = data;

  // 2. 注入 Subscriptions (订阅状态)
  obj.subscriber.subscriptions["com.gingerlabs.notability.premium_subscription"] = data;
  
  // 3. 确保非订阅列表为空，防止冲突
  obj.subscriber.non_subscriptions = {};
}

$done({body: JSON.stringify(obj)});