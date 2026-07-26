# 以斯拉點交聖殿器皿(hfpc-ezra-screw)

聖經版「螺絲解謎」第二款(fork hfpc-tabernacle-screw,skill=screw-pile-puzzle-kit):
照以斯拉記的清單把行囊層層打開,器皿(金盤/銀盤/刀/碗/上等光銅/別樣的器皿)分進祭司的看守箱,
滿三件同類整箱抬去過秤——「點了數目,按著分量寫在冊上」(拉 8:34)。
零相依、零美術檔、可離線(PWA)、DOM/CSS 渲染。

## 現況(2026-07-26 建立,agape250 機)

- 6 站:古列王發還(拉1:7,教學)→ 金盤銀盤(1:9)→ 金碗銀碗(1:10)→ 都秤了交給他們(8:25)
  → 警醒看守(8:29,細長件 teenMin 0.2)→ 點了數目寫在冊上(8:34)。
- 經文八節全過 cuv 核對(拉 1:7、1:9、1:10、8:25、8:27、8:28、8:29、8:34),逐字照和合本。
- 神學主線:「你們歸耶和華為聖,器皿也為聖」(拉 8:28)——神所交託的要警醒看守、如數交回。
  under 約束只做行李物理次序,不冒充經文誡命(以斯拉記沒有規定堆疊次序)。
- ⚠ **文案待牧者審核**;過審前大廳卡片不點亮。

## 引擎鐵則(同 tabernacle-screw,詳見 skill screw-pile-puzzle-kit)

- 規則只有一份 rules.js(遊戲/solver/產生器共用);遮擋照真形狀 pointInPoly。
- 佈局 PILES 由 `npm run tune` 隨機搜+兩隻 bot 量到分齡帶(青少 30~55%/兒童 ≤30%/幼幼 ≤10%);
  手改 PILES 無效。出廠檢驗=`npm run check`(exit 1 閘門)。
- 部署一律 `node scripts/build-dist.mjs` 再 `wrangler pages deploy dist`(白名單制;Pages 不吃 .assetsignore)。
