/*
脚本功能：Lightroom 移动版高级功能解锁 (防失效版)
脚本作者：Ayden
文件位置：Lightroom/lightroom.js
说明：解锁本地 Premium 高级编辑工具 (选择性编辑、修复、几何等)
*/
const body = $response.body;

if (body) {
    try {
        let obj = JSON.parse(body);
        
        // 核心1：强制将 Adobe 授权状态激活
        if (!obj.entitlement) {
            obj.entitlement = {};
        }
        obj.entitlement.status = "ACTIVE";
        
        // 核心2：伪造一个永久有效的订阅套餐凭证
        obj.current_subs = {
            "product_id": "lightroom",
            "store": "adobe",
            "purchase_date": "2023-01-01T00:00:00.000Z",
            "sao": {
                "inpkg_CCES": "0",
                "inpkg_CCLE": "1", // Lightroom 核心权益包开启
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

        $done({ body: JSON.stringify(obj) });
    } catch (e) {
        $done({});
    }
} else {
    $done({});
}