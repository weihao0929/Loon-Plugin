/*
脚本功能：Lightroom iPad 高级版 (终极补全版)
脚本作者：Ayden
说明：强制覆写所有权限字段，清空试用标记。
*/
const body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);
        
        // 1. 强制覆写授权状态，并附送 1TB 云空间假象防检测
        obj.entitlement = {
            "status": "ACTIVE",
            "storage": {
                "used": 0,
                "limit": 1153433600000,
                "display_limit": 1098.5,
                "warn": 1038090240000
            }
        };
        
        // 2. 注入核心套餐包
        obj.current_subs = {
            "product_id": "lightroom",
            "store": "adobe",
            "purchase_date": "2023-01-01T00:00:00.000Z",
            "sao": {
                "inpkg_CCES": "0",
                "inpkg_CCLE": "1", // 核心 Lightroom 权限
                "inpkg_CCSN": "0",
                "inpkg_CCSV": "0",
                "inpkg_LCCC": "0",
                "inpkg_LPES": "0",
                "inpkg_LSCE": "0",
                "inpkg_MCMU": "0",
                "inpkg_PHLT": "0",
                "inpkg_PHLT2": "0",
                "inpkg_PLES": "0"
            }
        };
        
        // 3. 删除可能导致冲突的试用标记
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