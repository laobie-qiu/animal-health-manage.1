# 马驴健康管家小程序 - 下载指南

## 📦 项目包信息

- **文件名**: `animal-health-manager.tar.gz`
- **大小**: 616 KB
- **位置**: `/tmp/animal-health-manager.tar.gz`

---

## 🚀 下载方式

### 方式 1：通过临时文件服务器下载（推荐）

我已将文件放置在临时目录，您可以通过以下方式获取：

#### 使用 SCP 下载

```bash
# 从服务器下载到本地
scp root@9.129.16.91:/tmp/animal-health-manager.tar.gz ./
```

#### 使用 SFTP 下载

```bash
# 连接 SFTP
sftp root@9.129.16.91

# 下载文件
get /tmp/animal-health-manager.tar.gz

# 退出
exit
```

### 方式 2：通过 HTTP 下载

如果有 HTTP 服务器运行，可以访问：
```
http://9.129.16.91:8000/animal-health-manager.tar.gz
```

---

## 📂 解压和使用

### 解压文件

```bash
# 在本地解压
tar -xzf animal-health-manager.tar.gz

# 进入项目目录
cd animal-health-manager
```

### 安装依赖

```bash
# 安装 pnpm（如果还没有）
npm install -g pnpm

# 安装项目依赖
pnpm install
```

### 启动开发服务器

```bash
# 启动前后端开发服务器
pnpm dev

# 访问地址
# 前端 H5: http://localhost:5000
# 后端 API: http://localhost:3000
```

### 构建 H5 版本

```bash
# 构建 H5 生产版本
pnpm build:web

# 构建产物在 dist-web 目录
```

---

## 📋 项目结构

```
animal-health-manager/
├── src/                    # 前端源码
│   ├── pages/             # 页面组件
│   │   ├── index/         # 首页（动物标识）
│   │   ├── diagnosis/     # 诊断页面
│   │   └── profile/       # 我的页面
│   ├── assets/            # 静态资源
│   └── app.config.ts      # 应用配置
├── server/                # 后端源码
│   ├── src/
│   │   ├── animal.controller.ts
│   │   ├── animal.service.ts
│   │   └── animal.module.ts
│   └── nest-cli.json
├── .github/               # GitHub Actions 配置
│   └── workflows/
│       └── deploy.yml     # 自动部署配置
├── design_guidelines.md   # 设计指南
├── GITHUB_DEPLOYMENT_GUIDE.md  # GitHub 部署指南
├── VERCEL_DEPLOY_INSTRUCTIONS.md  # Vercel 部署指南
├── package.json           # 项目配置
└── tsconfig.json          # TypeScript 配置
```

---

## 🌐 部署到 GitHub Pages

### 快速开始

```bash
# 1. 解压项目
tar -xzf animal-health-manager.tar.gz
cd animal-health-manager

# 2. 初始化 Git 仓库
git init
git add .
git commit -m "feat: 初始化项目"

# 3. 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/animal-health-manager.git

# 4. 推送到 GitHub
git branch -M main
git push -u origin main
```

### 启用 GitHub Pages

1. 进入仓库 **Settings** → **Pages**
2. **Source**: 选择 **GitHub Actions**
3. 点击 **Save**

### 访问网站

等待部署完成后，访问：
```
https://YOUR_USERNAME.github.io/animal-health-manager/
```

---

## 📱 功能特性

### 首页（动物标识）
- ✅ 添加马或驴的信息
- ✅ 输入编号、类型、年龄等信息
- ✅ 查看已添加的动物列表

### 诊断页面
- ✅ 选择症状（多选）
- ✅ 智能诊断疾病
- ✅ 查看诊断结果和治疗方案

### 我的页面
- ✅ 查看历史诊断记录
- ✅ 查看动物列表
- ✅ 数据统计

---

## 🎨 设计风格

- **主色调**: 活力橙红 (#FF6B35)
- **辅助色**: 生命绿 (#2ECC71)、专业蓝 (#3498DB)
- **风格**: 鲜艳、亲和、易用

---

## 🔧 技术栈

- **前端**: Taro 4.1.9 + React 18.3.1
- **后端**: NestJS 10.4.15
- **样式**: Tailwind CSS 4.1.18
- **语言**: TypeScript 5.9.3
- **包管理器**: pnpm

---

## 📞 获取帮助

- 查看 `GITHUB_DEPLOYMENT_GUIDE.md` 了解如何部署到 GitHub Pages
- 查看 `VERCEL_DEPLOY_INSTRUCTIONS.md` 了解如何部署到 Vercel
- 查看 `design_guidelines.md` 了解设计规范

---

## ⚠️ 注意事项

1. **依赖安装**: 确保已安装 Node.js (v18+) 和 pnpm
2. **端口占用**: 开发服务器使用 5000（前端）和 3000（后端）端口
3. **跨端兼容**: H5 版本已在浏览器中测试，小程序端需要配置 app_id
4. **数据存储**: 当前使用内存存储，重启后数据会丢失

---

**下载完成后，按照上面的步骤即可快速启动项目！🎉**
