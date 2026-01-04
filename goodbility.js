/*
脚本功能：GoodNotes 6 + Notability Plus (强力修正版)
逻辑更新：
1. 暴力清空原有的 entitlements，防止 Classic/Starter 权益残留干扰。
2. 将 Notability 的 period_type 统一改为 trial 或 normal (模拟新订阅)。
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
  // ⚠️ 关键操作：直接清空服务器返回的所有原始权益
  // 这能确保 App 不会读到任何 "Legacy" 或 "Classic" 的标记
  obj.subscriber.entitlements = {};
  obj.subscriber.subscriptions = {};

  // ==========================================
  // 1. GoodNotes 6 注入
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
  // 2. Notability Plus 注入
  // ==========================================
  const nb_id = "com.gingerlabs.notability.premium_subscription";

  // 这里的 key 必须是 plus_subscription
  obj.subscriber.entitlements["plus_subscription"] = Object.assign({}, common_data, {
    "product_identifier": nb_id
  });

  // 注入订阅信息
  obj.subscriber.subscriptions[nb_id] = Object.assign({}, common_data, {
    // 改回 normal，模仿正常的年费订阅状态
    "period_type": "normal", 
    "is_sandbox": false
  });
}

$done({body: JSON.stringify(obj)});