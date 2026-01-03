/*
脚本功能：GoodNotes 6 解锁订阅
逻辑复刻：基于 ddgksf2013 逻辑
*/

const obj = JSON.parse(typeof $response != "undefined" && $response.body || null);

if (obj && obj.subscriber) {
  // 构造解锁数据
  const ent = {
    "apple_access": {
      "expires_date": "2099-09-09T09:09:09Z",
      "original_purchase_date": "2023-02-23T02:33:33Z",
      "purchase_date": "2023-02-23T02:33:33Z",
      "product_identifier": "com.goodnotes.gn6_one_time_unlock_3999"
    }
  };

  // 注入 entitlements
  obj.subscriber.entitlements = ent;
  
  // 注入 subscriptions
  obj.subscriber.subscriptions = {
    "com.goodnotes.gn6_one_time_unlock_3999": {
      "expires_date": "2099-09-09T09:09:09Z",
      "original_purchase_date": "2023-02-23T02:33:33Z",
      "purchase_date": "2023-02-23T02:33:33Z",
      "store": "app_store",
      "ownership_type": "PURCHASED"
    }
  };
}

$done({body: JSON.stringify(obj)});
