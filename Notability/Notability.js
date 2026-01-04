/*
脚本功能：Notability Plus 全能解锁 (适配 Global + RevenueCat)
逻辑更新：同时兼容新版 Global 接口和旧版 RevenueCat 接口
*/

const url = $request.url;
const body = $response.body;
let obj = JSON.parse(body);

// 定义通用的 Plus 会员数据
const vipData = {
  "tier": "premium",
  "planId": "com.gingerlabs.notability.premium_subscription",
  "originalPurchaseDate": "2023-02-23T02:33:33.000Z",
  "expirationDate": "2099-09-09T09:09:09.000Z",
  "status": "active",
  "refundedDate": null,
  "isAutoRenewing": true
};

const rcData = {
  "expires_date": "2099-09-09T09:09:09Z",
  "original_purchase_date": "2023-02-23T02:33:33Z",
  "purchase_date": "2023-02-23T02:33:33Z",
  "product_identifier": "com.gingerlabs.notability.premium_subscription",
  "store": "app_store",
  "ownership_type": "PURCHASED"
};

// ==========================================
// 场景 1：命中 notability.com/global (新版接口)
// ==========================================
if (url.indexOf('notability.com/global') !== -1) {
  if (!obj.data) obj.data = {};
  
  // 强制注入 subscription 字段
  obj.data.subscription = vipData;
  
  // 同时也注入 userSubscription (防止字段变动)
  obj.data.userSubscription = vipData;
  
  // 开启一些功能开关
  if (obj.data.features) {
    obj.data.features.math_conversion = true; // 公式转换
    obj.data.features.handwriting_recognition = true; // 手写识别
  }
} 

// ==========================================
// 场景 2：命中 RevenueCat (旧版/恢复购买接口)
// ==========================================
else if (obj && (obj.subscriber || obj.entitlements)) {
  if (!obj.subscriber) obj.subscriber = { entitlements: {}, subscriptions: {} };
  
  obj.subscriber.entitlements["plus_subscription"] = rcData;
  obj.subscriber.subscriptions["com.gingerlabs.notability.premium_subscription"] = Object.assign({}, rcData, {
    "period_type": "active",
    "is_sandbox": false
  });
}

$done({body: JSON.stringify(obj)});