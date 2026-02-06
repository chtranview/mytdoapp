# Todo List App (mytdoapp)

一個現代化、響應式的待辦事項清單 (Todo List) 網頁應用程式。
本專案使用純 HTML、CSS 與 JavaScript 構建，不依賴任何前端框架，並支援資料持久化。

## ✨ 功能特色

- **新增事項**：支援鍵盤 Enter 鍵或點擊按鈕快速新增。
- **狀態管理**：點擊文字或勾選框即可切換完成/未完成狀態。
- **刪除功能**：滑鼠懸停 (或手機版) 顯示刪除按鈕，並具備確認提示防止誤刪。
- **篩選檢視**：可快速切換查看「全部」、「未完成」或「已完成」的項目。
- **資料持久化**：使用瀏覽器 LocalStorage，關閉視窗或重新整理後資料依然存在。
- **響應式設計**：優化手機與桌面版顯示體驗。

## 🛠️ 技術堆疊

- **HTML5**: 語意化標籤結構。
- **CSS3**: 使用 CSS Variables、Flexbox 佈局、CSS Animations 與響應式 Media Queries。
- **JavaScript (ES6+)**: 模組化逻辑，包含 DOM 操作、事件處理與 LocalStorage 存取。

## 🚀 如何執行

由於是純靜態網頁，無需安裝任何依賴或伺服器。

1. Clone 此專案：
   ```bash
   git clone https://github.com/chtranview/mytdoapp.git
   ```
2.直接使用瀏覽器開啟 `index.html` 檔案即可使用。

## 🤝 專案結構

```
mytdoapp/
├── index.html    # 主頁面結構
├── style.css     # 樣式定義
├── script.js     # 應用程式邏輯
└── README.md     # 專案說明
```

---
*Created as a demo project.*
