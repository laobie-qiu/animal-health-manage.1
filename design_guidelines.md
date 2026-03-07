# 马和驴疾病诊治小程序 - 设计指南

## 1. 品牌定位

**应用名称**：马驴健康管家

**应用定位**：为马和驴提供专业的疾病诊断和治疗指导的小程序

**设计风格**：
- 色彩鲜艳、活力四射
- 专业友好、易于操作
- 动物主题、生动形象

**目标用户**：马和驴的养殖户、兽医、动物护理者

## 2. 配色方案（色彩鲜艳）

### 主色板
- **主色调（活力橙红）**：`#FF6B35` → Tailwind: `bg-orange-500`
- **辅助色（生命绿）**：`#2ECC71` → Tailwind: `bg-green-500`
- **专业蓝（医疗）**：`#3498DB` → Tailwind: `bg-blue-500`

### 动物标识色
- **马标识色（棕红色）**：`#E67E22` → Tailwind: `bg-orange-600`
- **驴标识色（灰蓝色）**：`#7F8C8D` → Tailwind: `bg-gray-500`

### 中性色
- **背景色**：`#F5F7FA` → Tailwind: `bg-gray-50`
- **白色背景**：`#FFFFFF` → Tailwind: `bg-white`
- **主要文字**：`#2C3E50` → Tailwind: `text-gray-800`
- **次要文字**：`#7F8C8D` → Tailwind: `text-gray-500`

### 语义色
- **成功（健康）**：`#2ECC71` → Tailwind: `bg-green-500` / `text-green-500`
- **警告（症状）**：`#F39C12` → Tailwind: `bg-yellow-500` / `text-yellow-500`
- **错误（疾病）**：`#E74C3C` → Tailwind: `bg-red-500` / `text-red-500`

## 3. 字体规范

- **H1 标题**：`text-2xl font-bold text-gray-800`
- **H2 标题**：`text-xl font-semibold text-gray-700`
- **H3 标题**：`text-lg font-medium text-gray-700`
- **正文**：`text-base text-gray-600`
- **辅助文字**：`text-sm text-gray-500`
- **Caption**：`text-xs text-gray-400`

## 4. 间距系统

- **页面边距**：`p-4` (16px)
- **卡片内边距**：`p-4` (16px)
- **组件间距**：`gap-3` (12px) / `gap-4` (16px)
- **区块间距**：`mb-4` (16px) / `mb-6` (24px)

## 5. 组件规范

### 主按钮
```tsx
<View className="w-full">
  <Button className="w-full bg-orange-500 text-white rounded-xl py-3 text-base font-semibold shadow-lg">
    开始诊断
  </Button>
</View>
```

### 次按钮
```tsx
<View className="w-full">
  <Button className="w-full bg-blue-500 text-white rounded-xl py-3 text-base font-semibold shadow-md">
    查看历史
  </Button>
</View>
```

### 卡片容器
```tsx
<View className="bg-white rounded-2xl shadow-lg p-4 mb-4">
  {/* 卡片内容 */}
</View>
```

### 输入框（跨端兼容）
```tsx
<View className="bg-gray-50 rounded-xl px-4 py-3 mb-4">
  <Input
    className="w-full bg-transparent text-base"
    placeholder="请输入动物名称"
    placeholderClass="text-gray-400"
  />
</View>
```

### 列表项
```tsx
<View className="bg-white rounded-xl shadow-md p-4 mb-3 flex items-center justify-between">
  <View className="flex items-center gap-3">
    <View className="w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center">
      <Text className="text-white text-xl">🐴</Text>
    </View>
    <View className="flex flex-col">
      <Text className="text-lg font-semibold text-gray-800">马匹名称</Text>
      <Text className="text-sm text-gray-500">编号: #001</Text>
    </View>
  </View>
  <View className="bg-green-100 px-3 py-1 rounded-full">
    <Text className="text-green-600 text-sm font-medium">健康</Text>
  </View>
</View>
```

### 空状态
```tsx
<View className="flex flex-col items-center justify-center h-64">
  <Text className="text-6xl mb-4">🐎</Text>
  <Text className="text-gray-500 text-base">暂无动物记录</Text>
  <Text className="text-gray-400 text-sm mt-2">点击下方按钮添加</Text>
</View>
```

### 加载态
```tsx
<View className="flex flex-col items-center justify-center h-64">
  <Text className="text-4xl mb-4 animate-bounce">🔍</Text>
  <Text className="text-orange-500 text-base font-medium">诊断中...</Text>
</View>
```

## 6. 导航结构

### TabBar 配置
- **首页**：动物标识与管理
- **诊断**：疾病诊断
- **我的**：个人中心

### TabBar 图标
- 使用 `npx taro-lucide-tabbar` 生成图标
- 选中色：`#FF6B35`（活力橙红）
- 未选中色：`#999999`

### 图标生成命令
```bash
npx taro-lucide-tabbar Stethoscope User Home -c "#999999" -a "#FF6B35" -o ./src/assets/tabbar -s 81
```

## 7. 页面结构规划

### 首页（动物标识）
- 顶部：应用标题 + 动物切换（马/驴）
- 中部：动物列表（卡片式）
- 底部：添加动物按钮（固定底部）

### 诊断页面
- 动物选择区域
- 症状选择区域（多选卡片）
- 诊断结果卡片（鲜艳色块）
- 治疗方案列表

### 我的页面
- 用户信息卡片
- 历史诊断记录
- 设置选项

## 8. 小程序约束

- **包体积**：控制图片资源大小，优先使用在线图标
- **图片策略**：使用真实可访问的图片链接或 emoji
- **性能优化**：列表使用虚拟滚动，避免渲染过多节点
- **跨端兼容**：Text 组件添加 `block` 类，Input 组件使用 View 包裹

## 9. 动物标识

### 马的标识
- Emoji: 🐴 / 🐎
- 颜色: `bg-orange-600`
- 标识特征：棕红色调、强壮感

### 驴的标识
- Emoji: 🦙
- 颜色: `bg-gray-500`
- 标识特征：灰蓝色调、稳重感

## 10. 鲜艳色彩使用规范

- **主操作按钮**：使用活力橙红 `bg-orange-500`
- **健康状态**：使用生命绿 `bg-green-500`
- **警告提示**：使用亮黄 `bg-yellow-500`
- **疾病标记**：使用鲜艳红 `bg-red-500`
- **背景卡片**：使用白色 `bg-white` + 阴影 `shadow-lg`
- **分隔线**：使用浅灰 `bg-gray-100`
