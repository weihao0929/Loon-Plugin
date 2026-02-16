/*
脚本功能：Lightroom iPad 高级版 (全权限强制开启版)
脚本作者：Ayden
说明：追加交易流水号，强开所有 sao 权限。
*/
const body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);
        
        // 1. 强制激活并附送云空间
        obj.entitlement = {
            "status": "ACTIVE",
            "storage": {
                "used": 0,
                "limit": 1153433600000,
                "display_limit": 1098.5,
                "warn": 1038090240000
            }
        };
        
        // 2. 伪造完整订单信息 (全线特权置为 1)
        obj.current_subs = {
            "product_id": "lightroom",
            "store": "app_store", // 伪装成苹果商店内购
            "transaction_id": "490001234567890", // 追加假交易号
            "purchase_date": "2023-01-01T00:00:00.000Z",
            "sao": {
                "inpkg_CCES": "1",
                "inpkg_CCLE": "1",
                "inpkg_CCSN": "1",
                "inpkg_CCSV": "1",
                "inpkg_LCCC": "1",
                "inpkg_LPES": "1",
                "inpkg_LSCE": "1",
                "inpkg_MCMU": "1",
                "inpkg_PHLT": "1",
                "inpkg_PHLT2": "1",
                "inpkg_PLES": "1"
            }
        };
        
        // 3. 抹除试用记录
        if (obj.trial_subs) {
            delete obj.trial_subs;
        }
        
        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        $done({});
    }
} else {
    $done({});
}
