# API 測試指南 - 完整流程

後端服務器已在 http://localhost:3000 運行
MongoDB 已成功連接

## � 快速開始 - 完整測試流程

### 第一步：創建用戶帳戶
在登錄之前，您需要先註冊一個帳戶：

```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "測試用戶",
    "email": "test@example.com",
    "password": "password123"
  }'
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

### 第二步：登錄獲取JWT Token
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{
    "email": "test@example.com",
    "password": "password123"
  }'
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

### 第三步：使用Token測試受保護的端點
複製上一步獲得的token，然後測試：

```bash
# 測試獲取當前用戶信息
curl -X GET http://localhost:3000/api/users/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

## ⚠️ 常見錯誤解決方案

### 1. "User not found" 錯誤
**原因：** 嘗試登錄不存在的用戶
**解決方案：** 先使用註冊API創建用戶帳戶

### 2. "Email and password don't match" 錯誤  
**原因：** 密碼錯誤
**解決方案：** 檢查密碼是否正確

### 3. "Access denied" 錯誤
**原因：** 沒有提供有效的JWT token
**解決方案：** 確保在請求頭中包含 `Authorization: Bearer YOUR_TOKEN`

## 📝 API 端點測試

### 1. 用戶註冊 (User Registration)
```
POST http://localhost:3000/api/users
Content-Type: application/json

{
  "name": "Test User",
  "email": "test@example.com",
  "password": "password123"
}
```

### 2. 用戶登錄 (User Login)
```
POST http://localhost:3000/api/auth/signin
Content-Type: application/json

{
  "email": "test@example.com",
  "password": "password123"
}
```

### 3. 獲取所有項目 (Get All Projects - 公開)
```
GET http://localhost:3000/api/projects
```

### 4. 創建項目 (Create Project - 需要管理員權限)
```
POST http://localhost:3000/api/projects/admin
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "測試項目",
  "description": "這是一個測試項目",
  "technologies": ["React", "Node.js", "MongoDB"],
  "status": "completed"
}
```

### 5. 獲取所有教育記錄 (Get All Education Records - 公開)
```
GET http://localhost:3000/api/educationsorqualifications
```

### 6. 創建教育記錄 (Create Education Record - 需要管理員權限)
```
POST http://localhost:3000/api/educationsorqualifications/admin
Content-Type: application/json
Authorization: Bearer YOUR_JWT_TOKEN

{
  "title": "學士學位",
  "institution": "測試大學",
  "completionDate": "2023-06-01",
  "description": "電腦科學學士學位"
}
```

### 7. 發送聯絡信息 (Send Contact Message)
```
POST http://localhost:3000/api/contact
Content-Type: application/json

{
  "name": "張三",
  "email": "zhang@example.com",
  "message": "你好，我對你的服務很感興趣。"
}
```

### 8. 獲取所有用戶 (Get All Users - 僅管理員)
```
GET http://localhost:3000/api/users/admin
Authorization: Bearer YOUR_JWT_TOKEN
```

## 🔐 身份驗證流程

1. **註冊新用戶**:
   - 使用 `POST /api/users` 創建帳戶
   - 默認角色為 "user"

2. **登錄獲取Token**:
   - 使用 `POST /api/auth/signin` 登錄
   - 複製返回的 `token` 

3. **使用Token進行認證**:
   - 在請求標頭中添加: `Authorization: Bearer YOUR_TOKEN`

4. **創建管理員帳戶**:
   - 先註冊普通用戶
   - 在MongoDB中手動將用戶角色改為 "admin"

## 🧪 測試步驟

### 使用 curl 命令測試:

1. **測試用戶註冊**:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```

2. **測試用戶登錄**:
```bash
curl -X POST http://localhost:3000/api/auth/signin \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

3. **測試獲取項目**:
```bash
curl -X GET http://localhost:3000/api/projects
```

4. **測試創建項目（需要token）**:
```bash
curl -X POST http://localhost:3000/api/projects/admin \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -d '{"title":"Test Project","description":"A test project","technologies":["React","Node.js"],"status":"completed"}'
```

## 📊 預期回應

### 成功註冊:
```json
{
  "message": "User created successfully!",
  "user": {
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  }
}
```

### 成功登錄:
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "name": "Test User",
    "email": "test@example.com",
    "role": "user"
  }
}
```

### 權限錯誤:
```json
{
  "error": "Access denied. Admin privileges required."
}
```

## 🔍 檢查數據庫

你可以登錄MongoDB Atlas查看數據是否正確存儲:
1. 訪問 [MongoDB Atlas](https://cloud.mongodb.com/)
2. 選擇你的集群
3. 點擊 "Browse Collections"
4. 查看 Portfolio 數據庫中的集合（users、projects、educationsorqualifications、contacts）

## 🚨 常見問題

1. **連接錯誤**: 確保MongoDB服務正在運行
2. **401未授權**: 檢查JWT token是否正確
3. **403禁止訪問**: 確保用戶有正確的角色權限
4. **CORS錯誤**: 已在後端配置CORS，應該不會出現此問題

服務器正在運行，可以開始測試了！
