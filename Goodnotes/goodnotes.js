/*
脚本功能：GoodNotes 6 解锁 (双保险增强版)
脚本作者：Ayden
*/
const obj = JSON.parse(typeof $response != "undefined" && $response.body || null);

const common = {
  "expires_date": "2099-09-09T09:09:09Z",
  "original_purchase_date": "2023-02-23T02:33:33Z",
  "purchase_date": "2023-02-23T02:33:33Z",
  "ownership_type": "PURCHASED",
  "store": "app_store"
};

if (obj && obj.subscriber) {
  // GN6 权益
  const id6 = "com.goodnotes.gn6_one_time_unlock_3999";
  obj.subscriber.entitlements["apple_access"] = Object.assign({}, common, { "product_identifier": id6 });
  obj.subscriber.subscriptions[id6] = Object.assign({}, common, { "period_type": "normal", "is_sandbox": false });

  // GN5 权益
  const id5 = "com.goodnotes.gn.full_unlock";
  obj.subscriber.entitlements["com.goodnotes.gn.full_unlock"] = Object.assign({}, common, { "product_identifier": id5 });
  obj.subscriber.subscriptions[id5] = Object.assign({}, common, { "period_type": "normal", "is_sandbox": false });
}

$done({body: JSON.stringify(obj)});
