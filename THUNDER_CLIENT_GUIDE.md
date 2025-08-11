# Thunder Client 測試配置指南

## 🚀 開始之前
1. 確保後端服務器正在運行：`node server.js`
2. 服務器應該在 http://localhost:3000 運行

## 📋 Thunder Client 測試步驟

### 1️⃣ 測試用戶註冊

**新建請求 → POST 請求**
```
URL: http://localhost:3000/api/users
Method: POST
Headers: 
  Content-Type: application/json

Body (JSON):
{
  "name": "測試用戶",
  "email": "test@example.com", 
  "password": "password123"
}
```

**預期回應：**
```json
{
  "message": "Registration successful!",
  "user": {
    "_id": "...",
    "name": "測試用戶",
    "email": "test@example.com",
    "role": "user"
  }
}
```

### 2️⃣ 測試用戶登錄

**新建請求 → POST 請求**
```
URL: http://localhost:3000/api/auth/signin
Method: POST
Headers:
  Content-Type: application/json

Body (JSON):
{
  "email": "test@example.com",
  "password": "password123"
}
```

**預期回應：**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "_id": "...",
    "name": "測試用戶", 
    "email": "test@example.com",
    "role": "user"
  }
}
```

### 3️⃣ 測試獲取項目（公開API）

**新建請求 → GET 請求**
```
URL: http://localhost:3000/api/projects
Method: GET
```

### 4️⃣ 測試受保護的API（需要Token）

**新建請求 → GET 請求**
```
URL: http://localhost:3000/api/users/me
Method: GET
Headers:
  Authorization: Bearer YOUR_TOKEN_FROM_LOGIN
```

**注意：** 將 `YOUR_TOKEN_FROM_LOGIN` 替換為步驟2中獲得的實際token

### 5️⃣ 測試管理員功能（創建項目）

**新建請求 → POST 請求**
```
URL: http://localhost:3000/api/projects/admin
Method: POST
Headers:
  Content-Type: application/json
  Authorization: Bearer YOUR_TOKEN_FROM_LOGIN

Body (JSON):
{
  "title": "測試項目",
  "description": "這是一個測試項目",
  "technologies": ["React", "Node.js", "MongoDB"],
  "status": "completed"
}
```

## 🔧 Thunder Client 使用技巧

### 設置環境變量
1. 點擊 Thunder Client 側邊欄的 "Env" 標籤
2. 創建新環境，例如 "Local Development"
3. 添加變量：
   - `baseUrl`: `http://localhost:3000`
   - `token`: `YOUR_JWT_TOKEN`

### 使用環境變量
在請求中使用 `{{baseUrl}}` 和 `{{token}}`：
```
URL: {{baseUrl}}/api/auth/signin
Authorization: Bearer {{token}}
```

### 保存請求集合
1. 創建新的 Collection（集合）
2. 將所有相關請求保存到集合中
3. 按順序排列：註冊 → 登錄 → 測試API

## 📊 常見回應狀態碼

- **200 OK**: 請求成功
- **201 Created**: 資源創建成功
- **400 Bad Request**: 請求格式錯誤
- **401 Unauthorized**: 未授權（需要登錄或token無效）
- **403 Forbidden**: 禁止訪問（權限不足）
- **404 Not Found**: 端點不存在
- **500 Internal Server Error**: 服務器內部錯誤

## 🚨 故障排除

### 如果出現 "User not found" 錯誤：
1. 確認 email 地址拼寫正確
2. 先運行註冊API創建用戶
3. 檢查數據庫連接狀態

### 如果出現連接錯誤：
1. 確認服務器正在運行（檢查終端）
2. 確認URL正確（必須包含 `/api`）
3. 檢查防火牆設置

### 如果出現權限錯誤：
1. 確認已包含 Authorization header
2. 確認token格式：`Bearer YOUR_TOKEN`
3. 確認token未過期

## 📝 測試順序建議

1. **基礎連接測試**: `GET http://localhost:3000/`
2. **用戶註冊**: `POST /api/users`
3. **用戶登錄**: `POST /api/auth/signin`（記錄token）
4. **查看項目**: `GET /api/projects`
5. **測試認證**: `GET /api/users/me`（使用token）
6. **管理員功能**: `POST /api/projects/admin`（使用token）
