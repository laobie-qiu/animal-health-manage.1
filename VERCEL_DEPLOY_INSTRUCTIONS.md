# Vercel 部署快速指南

## 🚀 5 分钟快速部署

### 前提条件
- 已有 GitHub 账号
- 已有 Vercel 账号（使用 GitHub 登录即可）

---

## 步骤 1：准备构建文件

1. **下载 dist-web 目录**
   - 从当前环境下载 `dist-web` 目录
   - 或者将代码推送到 GitHub 仓库

2. **本地电脑操作**
   ```bash
   # 确保已安装 Node.js (v18+)
   node -v
   
   # 安装 Vercel CLI
   npm install -g vercel
   ```

---

## 步骤 2：部署到 Vercel

### 方法 A：使用 Vercel CLI（推荐）

```bash
# 1. 进入 dist-web 目录
cd dist-web

# 2. 登录 Vercel（会打开浏览器）
vercel login

# 3. 部署（首次部署会询问一些配置）
vercel

# 4. 生产环境部署
vercel --prod
```

### 方法 B：使用 Vercel 网页界面

1. 访问 https://vercel.com
2. 使用 GitHub 账号登录
3. 点击 "New Project"
4. 选择 "Upload Files" 或连接 GitHub 仓库
5. 上传 dist-web 目录中的所有文件
6. 点击 "Deploy"

---

## 步骤 3：获取访问地址

部署成功后，Vercel 会提供一个地址，类似：

```
https://animal-health-manager.vercel.app
```

---

## ⚙️ 配置说明

### 环境变量

如果后端 API 需要配置，在 Vercel 项目设置中添加：

1. 进入项目 Settings → Environment Variables
2. 添加以下变量：
   - `API_BASE_URL`: 你的后端 API 地址
   - `PROJECT_DOMAIN`: 你的域名

---

## 🔗 连接 GitHub 仓库（推荐）

1. 在 Vercel 项目中点击 "Git Integration"
2. 连接你的 GitHub 仓库
3. 每次推送代码，Vercel 会自动部署

---

## 📱 移动端访问

部署后，可以直接在手机浏览器中访问网址，体验 H5 版本。

---

## 🎨 自定义域名（可选）

1. 进入项目 Settings → Domains
2. 点击 "Add Domain"
3. 输入你的域名
4. 按照提示配置 DNS

---

## ❓ 常见问题

### Q: 部署后页面空白？
A: 检查 API 地址是否正确配置

### Q: API 请求失败？
A: 需要配置 CORS 或使用代理

### Q: 如何更新？
A: 使用 `vercel --prod` 重新部署

---

## 📞 获取帮助

- Vercel 文档：https://vercel.com/docs
- Vercel 社区：https://vercel.com/help
