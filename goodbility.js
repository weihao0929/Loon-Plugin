/*
脚本功能：GoodNotes 6 解锁订阅 + 去除试用条/弹窗
更新逻辑：强制注入 period_type="normal" 以消除试用提示
*/

const obj = JSON.parse(typeof $response != "undefined" && $response.body || null);

if (obj && obj.subscriber) {
  // 1. 设置核心权益 (Entitlements)
  // 这是让你能用功能的部分
  obj.subscriber.entitlements = {
    "apple_access": {
      "expires_date": "2099-09-09T09:09:09Z",
      "original_purchase_date": "2023-02-23T02:33:33Z",
      "purchase_date": "2023-02-23T02:33:33Z",
      "product_identifier": "com.goodnotes.gn6_one_time_unlock_3999"
    }
  };

  // 2. 设置订阅详情 (Subscriptions)
  // 这是控制 UI 显示（如“剩余天数”）的部分
  obj.subscriber.subscriptions = {
    "com.goodnotes.gn6_one_time_unlock_3999": {
      "billing_issues_detected_at": null,
      "expires_date": "2099-09-09T09:09:09Z",
      "is_sandbox": false,
      "original_purchase_date": "2023-02-23T02:33:33Z",
      "period_type": "normal",  // 关键：标记为“正式版”，去除“试用”标签
      "purchase_date": "2023-02-23T02:33:33Z",
      "store": "app_store",
      "unsubscribe_detected_at": null,
      "ownership_type": "PURCHASED"
    }
  };

  // 3. (可选) 清理其他可能导致弹窗的字段
  // 强制将非订阅者状态置空，防止冲突
  obj.subscriber.non_subscriptions = {}; 
}

$done({body: JSON.stringify(obj)});
