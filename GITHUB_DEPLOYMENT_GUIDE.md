# GitHub Pages 部署指南 🚀

本指南将帮助您将马驴健康管家项目自动部署到 GitHub Pages，获得免费的公开网址。

---

## 📋 前提条件

- ✅ 已有 GitHub 账号
- ✅ 已在本地安装 Git
- ✅ 已在本地安装 Node.js (v18+)

---

## 🎯 部署概览

1. 创建 GitHub 仓库
2. 推送代码到 GitHub
3. 启用 GitHub Pages
4. 自动部署
5. 获取访问地址

---

## 📝 详细步骤

### 第 1 步：创建 GitHub 仓库

1. 访问 https://github.com/new
2. 填写仓库信息：
   - **Repository name**: `animal-health-manager`（或其他你喜欢的名称）
   - **Description**: 马驴健康管家小程序 - H5 版本
   - **Public/Private**: 选择 **Public**（GitHub Pages 免费版需要公开仓库）
3. 点击 **Create repository**
4. **不要**选择 "Initialize this repository with a README"（我们已有代码）

---

### 第 2 步：推送代码到 GitHub

#### 方式 A：使用 HTTPS（推荐）

```bash
# 在本地项目目录执行

# 1. 初始化 Git 仓库（如果还没有）
git init

# 2. 添加所有文件
git add .

# 3. 创建首次提交
git commit -m "feat: 初始化马驴健康管家项目"

# 4. 添加远程仓库
git remote add origin https://github.com/YOUR_USERNAME/animal-health-manager.git
# 将 YOUR_USERNAME 替换为你的 GitHub 用户名

# 5. 推送到 GitHub
git branch -M main
git push -u origin main
```

#### 方式 B：使用 SSH（如果已配置 SSH 密钥）

```bash
git remote add origin git@github.com:YOUR_USERNAME/animal-health-manager.git
git push -u origin main
```

---

### 第 3 步：启用 GitHub Pages

#### 方法 A：使用 GitHub Actions（推荐）

1. 进入仓库页面
2. 点击 **Settings** 标签
3. 在左侧菜单找到 **Pages**
4. 在 **Build and deployment** 部分：
   - **Source**: 选择 **GitHub Actions**
   - 点击 **Save**

5. GitHub 会自动检测到 `.github/workflows/deploy.yml` 配置文件

#### 方法 B：使用传统方式（不推荐）

1. 进入仓库页面
2. 点击 **Settings** → **Pages**
3. **Source**: 选择 **Deploy from a branch**
4. **Branch**: 选择 **gh-pages** 分支
5. 点击 **Save**

---

### 第 4 步：触发自动部署

#### 自动触发（推荐）

当你推送代码到 `main` 或 `master` 分支时，GitHub Actions 会自动执行部署。

你可以：
1. 修改任意文件（如 README.md）
2. 提交并推送：
   ```bash
   git add README.md
   git commit -m "docs: 更新文档"
   git push origin main
   ```

#### 手动触发

1. 进入仓库页面
2. 点击 **Actions** 标签
3. 在左侧菜单找到 **Deploy H5 to GitHub Pages**
4. 点击 **Run workflow** 按钮
5. 选择 **main** 分支
6. 点击 **Run workflow**

---

### 第 5 步：查看部署状态和获取网址

#### 查看部署状态

1. 点击仓库页面的 **Actions** 标签
2. 查看最新的 workflow 运行状态
3. 等待几分钟，状态变为 ✅ **Success**

#### 获取访问地址

部署成功后，访问地址为：

```
https://YOUR_USERNAME.github.io/animal-health-manager/
```

**示例**：
- 如果你的 GitHub 用户名是 `zhangsan`
- 仓库名是 `animal-health-manager`
- 访问地址就是：`https://zhangsan.github.io/animal-health-manager/`

---

## 🔍 验证部署

### 1. 检查 Actions 运行日志

1. 进入 **Actions** 标签
2. 点击最新的 workflow 运行记录
3. 查看日志，确认：
   - ✅ **Build** 步骤成功
   - ✅ **Deploy** 步骤成功

### 2. 访问网站

在浏览器中打开你的 GitHub Pages 地址：
```
https://YOUR_USERNAME.github.io/animal-health-manager/
```

### 3. 测试功能

- ✅ 首页动物标识功能
- ✅ 诊断页面症状选择
- ✅ 历史记录查看

---

## 🔄 更新部署

### 自动更新

每次推送代码到 `main` 分支，GitHub Actions 会自动重新部署：

```bash
git add .
git commit -m "feat: 添加新功能"
git push origin main
```

### 手动触发

如果需要手动触发部署：

1. 进入 **Actions** 标签
2. 点击 **Run workflow**
3. 选择分支并运行

---

## ⚙️ 配置说明

### GitHub Actions 配置文件

`.github/workflows/deploy.yml` 文件说明：

```yaml
name: Deploy H5 to GitHub Pages  # 工作流名称

on:
  push:
    branches: [ main, master ]    # 推送到 main/master 分支时触发
  pull_request:
    branches: [ main, master ]    # PR 到 main/master 时触发
  workflow_dispatch:             # 允许手动触发

jobs:
  build:                          # 构建任务
    - 安装依赖
    - 构建 H5 版本 (pnpm build:web)
    - 上传构建产物

  deploy:                         # 部署任务
    - 部署到 GitHub Pages
```

### 环境变量

如果需要配置后端 API 地址：

1. 进入 **Settings** → **Secrets and variables** → **Actions**
2. 点击 **New repository secret**
3. 添加变量：
   - Name: `API_BASE_URL`
   - Value: 你的后端 API 地址
4. 在代码中使用：
   ```typescript
   const apiUrl = process.env.API_BASE_URL || 'https://default-api.com'
   ```

---

## 🌍 自定义域名（可选）

### 方法 1：使用 GitHub Pages 自定义域名

1. 进入 **Settings** → **Pages**
2. 在 **Custom domain** 部分输入你的域名（如 `app.example.com`）
3. 点击 **Save**
4. 按照提示配置 DNS：
   ```
   CNAME app.example.com -> YOUR_USERNAME.github.io
   ```

### 方法 2：使用子域名

如果你有自己的域名，可以配置子域名指向 GitHub Pages：

1. 在域名服务商添加 DNS 记录：
   ```
   Type: CNAME
   Name: animal-health
   Value: YOUR_USERNAME.github.io
   ```

2. 在 GitHub Pages 设置中添加自定义域名

---

## 📱 移动端访问

部署成功后，可以直接在手机浏览器中访问 GitHub Pages 地址，体验 H5 版本。

**建议**：
- 将网址添加到手机主屏幕（类似 App 体验）
- 分享链接给他人测试

---

## 🐛 常见问题

### Q1: 部署失败，提示 "Page build failed"

**解决方案**：
1. 检查 Actions 日志，查看具体错误信息
2. 确认 `package.json` 中的 `build:web` 脚本正确
3. 本地运行 `pnpm build:web` 确认构建成功

### Q2: 访问网址显示 404

**解决方案**：
1. 等待 5-10 分钟，GitHub Pages 需要时间生效
2. 确认仓库名称正确
3. 确认分支是 `main` 或 `master`

### Q3: 部署成功但页面空白

**解决方案**：
1. 检查浏览器控制台是否有错误
2. 确认 API 地址是否正确配置
3. 检查相对路径是否正确

### Q4: 如何回滚到上一个版本？

**解决方案**：
1. 在仓库中点击 **Commits**
2. 找到上一个成功的提交
3. 点击该提交的 **<> Code**
4. 选择 **Create branch from this commit**
5. 将新分支合并到 main

### Q5: 如何查看历史部署？

**解决方案**：
1. 进入 **Settings** → **Pages**
2. 滚动到 **Deployments** 部分
3. 查看所有历史部署记录

---

## 📊 性能优化

### 启用 CDN

GitHub Pages 默认使用 GitHub 的 CDN，无需额外配置。

### 压缩资源

项目已配置 Vite 自动压缩：
- ✅ JavaScript 压缩
- ✅ CSS 压缩
- ✅ HTML 压缩

### 图片优化

建议使用以下方式优化图片：
1. 使用 WebP 格式
2. 压缩图片大小
3. 使用懒加载

---

## 🔐 安全建议

### 1. 保护敏感信息

不要在代码中硬编码：
- ❌ API 密钥
- ❌ 数据库密码
- ❌ 用户凭证

使用 GitHub Secrets 存储敏感信息。

### 2. 启用 HTTPS

GitHub Pages 默认启用 HTTPS，无需额外配置。

### 3. 定期更新依赖

```bash
pnpm update
```

---

## 📚 参考资源

- [GitHub Pages 官方文档](https://docs.github.com/pages)
- [GitHub Actions 文档](https://docs.github.com/actions)
- [Taro H5 构建文档](https://docs.taro.zone/docs/config-detail#h5)

---

## 🎉 完成！

恭喜你！现在你的马驴健康管家 H5 版本已经部署到 GitHub Pages，可以免费公开访问了。

**访问地址**：
```
https://YOUR_USERNAME.github.io/animal-health-manager/
```

**下一步**：
1. 分享网址给朋友测试
2. 收集反馈，持续优化
3. 考虑添加更多功能
4. 如果需要自定义域名，参考上面的配置说明

---

## 💡 高级技巧

### 添加自定义 404 页面

创建 `src/pages/404/index.tsx`：
```tsx
export default function NotFound() {
  return (
    <View className="flex items-center justify-center h-full">
      <Text className="text-xl">页面不存在</Text>
    </View>
  )
}
```

### 添加网站图标

1. 将 favicon 放在 `src/assets/` 目录
2. 在 `src/app.config.ts` 中配置：
   ```typescript
   window: {
     navigationBarTitleText: '马驴健康管家',
   }
   ```

### 添加 Analytics

使用 Google Analytics 或其他分析工具：
1. 注册并获取跟踪代码
2. 在 `src/app.config.ts` 中添加：
   ```typescript
   window: {
     navigationBarTitleText: '马驴健康管家',
   }
   ```

---

**祝你部署顺利！🚀**
