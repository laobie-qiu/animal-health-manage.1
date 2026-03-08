# 马驴健康管家小程序 - HTTP 下载指南

## 🌐 HTTP 下载链接（推荐）

### 直接下载地址

**请直接在浏览器中打开以下链接：**

```
http://115.191.1.219:8080/animal-health-manager.tar.gz
```

### 下载步骤

1. **复制上面的链接**
2. **在浏览器中粘贴并打开**
3. **等待下载完成**（文件大小：616 KB）
4. **下载完成后，按照下面的步骤解压和使用**

---

## 📦 文件信息

- **文件名**: `animal-health-manager.tar.gz`
- **大小**: 616 KB
- **格式**: tar.gz 压缩包
- **包含内容**:
  - ✅ 完整的前端源码
  - ✅ 完整的后端源码
  - ✅ GitHub Actions 配置
  - ✅ 详细文档

---

## 📋 解压和使用

### Windows 用户

#### 方法 1：使用 WinRAR 或 7-Zip

1. 右键点击 `animal-health-manager.tar.gz`
2. 选择"解压到当前文件夹"
3. 进入解压后的 `animal-health-manager` 文件夹

#### 方法 2：使用 Git Bash（推荐）

```bash
# 在 Git Bash 中执行
tar -xzf animal-health-manager.tar.gz
cd animal-health-manager
```

### macOS / Linux 用户

```bash
# 解压文件
tar -xzf animal-health-manager.tar.gz

# 进入项目目录
cd animal-health-manager
```

---

## 🚀 快速启动

### 1. 安装依赖

```bash
# 安装 Node.js（如果没有）
# 访问 https://nodejs.org 下载并安装

# 安装 pnpm
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 2. 启动开发服务器

```bash
# 启动前后端开发服务器
pnpm dev

# 访问地址
# 前端 H5: http://localhost:5000
# 后端 API: http://localhost:3000
```

### 3. 打开浏览器

访问 http://localhost:5000 即可看到项目！

---

## 🌐 部署到 GitHub Pages

### 方式 1：使用 GitHub CLI（推荐）

```bash
# 安装 GitHub CLI（如果还没有）
# Windows: 下载 https://cli.github.com/

# 登录 GitHub
gh auth login

# 创建仓库并推送
cd animal-health-manager
gh repo create animal-health-manager --public --source=. --remote=origin --push

# 启用 GitHub Pages
gh api repos/:owner/:repo/pages -X POST -f source[branch]=main
```

### 方式 2：手动部署

```bash
# 初始化 Git 仓库
git init
git add .
git commit -m "feat: 初始化项目"

# 添加远程仓库（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/animal-health-manager.git

# 推送到 GitHub
git branch -M main
git push -u origin main
```

然后访问仓库设置，启用 GitHub Pages（Source 选择 GitHub Actions）。

---

## 📱 访问你的网站

部署成功后，访问：

```
https://YOUR_USERNAME.github.io/animal-health-manager/
```

---

## ⚠️ 下载失败？

### 如果 HTTP 下载也失败，请尝试：

#### 方案 1：使用其他浏览器

- 尝试使用 Chrome、Firefox、Edge 等不同浏览器
- 禁用浏览器的广告拦截插件

#### 方案 2：使用下载工具

- 使用迅雷、IDM 等下载工具
- 复制链接后粘贴到下载工具中

#### 方案 3：检查网络连接

- 确保网络连接正常
- 尝试使用移动网络或其他网络

#### 方案 4：联系我获取其他方式

如果以上方法都失败，请告诉我：
- 您的网络环境（公司网络/家庭网络）
- 您所在的地区
- 您 preferred 的下载方式

我会为您提供其他解决方案（如网盘分享等）。

---

## 💡 其他下载方式

### 如果以上方法都不行

我可以为您：

1. **生成网盘分享链接**（百度网盘、阿里云盘等）
2. **分批提供代码**（通过消息逐个发送文件）
3. **提供 Git 仓库地址**（如果您有 GitHub 账号）

---

## 📞 需要帮助？

如果下载或使用过程中遇到问题，请告诉我：

1. 您使用的操作系统（Windows / macOS / Linux）
2. 遇到的具体错误信息
3. 您已经尝试的步骤

我会帮您解决问题！

---

**现在就复制上面的链接到浏览器下载吧！🚀**
