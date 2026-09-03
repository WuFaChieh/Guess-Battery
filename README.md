# 猜電量 Guess the Battery ⚡

> 萬物皆有電量，你猜得準嗎？
> *Everything has a battery level. Can you guess it?*

一款以「電量 0～100%」為統一計分單位的猜謎遊戲：每題出一個硬核數學／物理／經濟／財務題目（或你自己出的自訂題），玩家憑直覺／計算滑動 0～100% 猜出答案，滑得越接近真實答案分數越高。單人速刷、每日挑戰、同螢幕多人派對、1v1 即時 PK 對戰，一套規則通吃全部模式。

線上遊玩：Web 版部署於 Vercel；也有 Capacitor 包裝的原生 iOS App。

## 特色

- **5 種遊戲模式**
  - 🔋 **經典速刷**：任選分類（微積分／幾何與向量／代數與機率／五大力學／經濟學／財務數學／自訂題庫），5 題一輪
  - 📅 **每日挑戰**：Wordle 式每日固定 5 題，全球玩家同題、可分享戰績方格，並記錄連續挑戰天數
  - 👥 **同屏派對**：2～4 人輪流傳遞裝置秘密作答，公開揭曉排名與冠軍
  - ⚔️ **1v1 PK 對戰**：透過 Supabase Realtime 即時配對真人對手，雙方互相出題；找不到對手或未設定後端時，自動退化成本地 AI 機器人對手（UI 上完全無法分辨）
  - ✏️ **自訂題庫**：自建題目、匯出/匯入 JSON 題庫，並可一鍵投稿到雲端資料庫等待官方審核收錄
- **140 題內建硬核題庫**：微積分、幾何與向量、代數與機率、古典力學（五大力學）、經濟學、財務數學，每題答案都是精確驗證過的整數，解說會把算式帶回battery %
- **雙語介面（繁中／English）**：自動偵測瀏覽器語言，並可用 Navbar 上的 EN/中 按鈕手動切換；內建題庫全部有對照英文翻譯
- **連擊加成、稱號徽章、Wordle 式分享戰績方格**
- **Web + 原生 iOS 雙平台並行維護**：同一套 React 程式碼，`@capacitor/*` 系列外掛在原生殼裡自動接上真實 API（如裝置電量、原生分享面板），Web 版則優雅降級

## 技術棧

- **React 18 + TypeScript + Vite**，Tailwind CSS 樣式
- **Framer Motion** 動畫、**canvas-confetti** 慶祝特效、**lucide-react** icon
- **@supabase/supabase-js**：PK 模式的即時配對（Realtime `postgres_changes`）與對戰同步（Realtime Broadcast）
- **@capacitor/\***：iOS 原生殼、裝置電量讀取、原生分享面板
- **Vitest**：純函式單元測試（計分、連擊、每日種子決定性、分享文字等）
- 無 router，單頁 client-side 狀態切換模式

## 開始使用

```bash
git clone https://github.com/WuFaChieh/Guess-Battery.git
cd Guess-Battery
npm install
npm run dev          # http://localhost:5173
```

Node 版本需 `>=22`（見 `package.json` engines；Windows 上若系統裝的是 Node 24，Rollup 的原生 Windows 附加元件會直接讓 build 崩潰，建議用 nvm 切到 22.x）。

### 環境變數（皆為選填）

複製 `.env.example` 成 `.env` 並依需求填入：

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_GOOGLE_SHEETS_URL=
```

- 不設定 Supabase：1v1 PK 模式會自動改用本地 AI 機器人對手，其餘功能不受影響
- 不設定 `VITE_GOOGLE_SHEETS_URL`：自訂題庫的「投稿至官方審核」功能會停用，本地建立/匯入/遊玩不受影響
- 若要啟用真正的 PK 配對，需要先在 Supabase 專案的 SQL editor 手動執行 `supabase/matchmaking_queue.sql`（建表、RLS 政策、開啟 Realtime），此檔案不會自動套用

## 常用指令

| 指令 | 說明 |
|---|---|
| `npm run dev` | 啟動開發伺服器 |
| `npm run build` | `tsc` 型別檢查 + `vite build` 產出 `dist/` |
| `npm run test` | 執行 Vitest 單元測試 |
| `npm run test:watch` | 監看模式跑測試 |
| `npm run lint` | ESLint 檢查 |
| `npm run preview` | 本地預覽 production build |
| `npm run cap:sync` | build + `cap sync`，把 `dist/` 同步進 `ios/` |
| `npm run cap:open:ios` | 用 Xcode 開啟原生專案（需要 Mac） |

## iOS 建置

開發機是 Windows，本地無法開啟/建置 Xcode 專案。`.github/workflows/ios-build.yml` 會在每次 push/PR 時於 GitHub Actions 的 macOS runner 上建置（未簽署，供模擬器使用），是目前唯一不靠實體 Mac 就能驗證的方式。

`capacitor.config.ts` 的 `appId` 目前是 placeholder（`com.guessbattery.app`），正式上架 App Store Connect 前務必換成自己的 reverse-DNS bundle identifier——上架後基本上不能再改。

## 部署

- **Web**：`vercel.json` 已設定 SPA rewrite，直接接上 Vercel 部署即可
- **PWA**：`public/manifest.json` + `index.html` 內的 iOS meta tag，讓 Web 版也能「加入主畫面」取得接近原生 App 的體驗

## 測試涵蓋範圍

Vitest 只測試純函式（`src/utils/gameLogic.ts` 的計分/稱號分級/洗牌/每日種子決定性/連擊加成/分享文字，`src/utils/dailyStreak.ts` 的連續天數計算，`src/utils/date.ts` 的在地日期格式化）。UI 元件與 Supabase 相關的配對/同步流程目前仍以人工測試為主。

---

作者：冷月仙
