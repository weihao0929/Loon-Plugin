/*
脚本功能：GoodNotes 6 独立解锁
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
  const gn_id = "com.goodnotes.gn6_one_time_unlock_3999";
  
  // 注入权益
  obj.subscriber.entitlements["apple_access"] = Object.assign({}, common_data, {
    "product_identifier": gn_id
  });
  
  // 注入订阅状态 (标记为 normal 以去除试用条)
  obj.subscriber.subscriptions[gn_id] = Object.assign({}, common_data, {
    "period_type": "normal",
    "is_sandbox": false
  });
}

$done({body: JSON.stringify(obj)});