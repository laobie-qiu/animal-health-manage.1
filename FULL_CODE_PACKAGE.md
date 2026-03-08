# 📦 马驴健康管家 - 完整代码包（可以直接复制）

我已将所有核心代码整理在这里，您可以直接复制粘贴到对应文件！

---

## 🚀 快速开始（3步完成）

1. **初始化项目**（见下方第一步）
2. **复制代码到对应文件**（见下方代码部分）
3. **启动项目**

---

## 📁 第一步：初始化项目

### 在本地电脑执行以下命令：

```bash
# 1. 创建项目目录
mkdir animal-health-manager && cd animal-health-manager

# 2. 初始化 Taro 项目
npx @tarojs/cli init

# 选择配置：
# - 框架: React
# - 语言: TypeScript
# - CSS: Less
# - 编译器: Vite

# 3. 安装依赖
pnpm install

# 4. 安装额外依赖
pnpm add lucide-react-taro zustand

# 5. 创建后端目录和初始化
mkdir -p server/src
cd server
npm init -y
npm install @nestjs/common @nestjs/core @nestjs/platform-express rxjs reflect-metadata
npm install -D @nestjs/cli @nestjs/testing @types/node typescript ts-node

# 6. 创建后端配置文件
cd server
cat > nest-cli.json << 'NESTEOF'
{
  "$schema": "https://json.schemastore.org/nest-cli",
  "collection": "@nestjs/schematics",
  "sourceRoot": "src",
  "compilerOptions": {
    "deleteOutDir": true
  }
}
NESTEOF

cat > tsconfig.json << 'TSEOF'
{
  "compilerOptions": {
    "module": "commonjs",
    "declaration": true,
    "removeComments": true,
    "emitDecoratorMetadata": true,
    "experimentalDecorators": true,
    "allowSyntheticDefaultImports": true,
    "target": "ES2021",
    "sourceMap": true,
    "outDir": "./dist",
    "baseUrl": "./",
    "incremental": true,
    "skipLibCheck": true,
    "strictNullChecks": false,
    "noImplicitAny": false,
    "strictBindCallApply": false,
    "forceConsistentCasingInFileNames": false,
    "noFallthroughCasesInSwitch": false
  }
}
TSEOF

# 返回项目根目录
cd ..
```

---

## 📄 第二步：复制粘贴代码

### 文件 1: 根目录 package.json

**路径**: `package.json`

```json
{
  "name": "animal-health-manager",
  "version": "1.0.0",
  "private": true,
  "description": "马驴健康管家小程序",
  "scripts": {
    "build": "pnpm exec concurrently --kill-others-on-fail --kill-signal SIGKILL -n lint,tsc,web -c red,blue,green \"pnpm lint:build\" \"pnpm tsc\" \"pnpm build:web\"",
    "build:web": "taro build --type h5",
    "dev": "pnpm dev:web",
    "dev:web": "taro build --type h5 --watch",
    "lint": "eslint \"src/**/*.{js,jsx,ts,tsx}\"",
    "lint:build": "eslint \"src/**/*.{js,jsx,ts,tsx}\" --max-warnings=0",
    "lint:fix": "eslint \"src/**/*.{js,jsx,ts,tsx}\" --fix",
    "tsc": "npx tsc --noEmit --skipLibCheck"
  },
  "dependencies": {
    "@babel/runtime": "^7.24.4",
    "@tarojs/components": "4.1.9",
    "@tarojs/helper": "4.1.9",
    "@tarojs/plugin-framework-react": "4.1.9",
    "@tarojs/plugin-platform-h5": "4.1.9",
    "@tarojs/react": "4.1.9",
    "@tarojs/runtime": "4.1.9",
    "@tarojs/shared": "4.1.9",
    "@tarojs/taro": "4.1.9",
    "lucide-react-taro": "^1.2.0",
    "react": "^18.0.0",
    "react-dom": "^18.0.0",
    "zustand": "^5.0.9"
  },
  "devDependencies": {
    "@babel/core": "^7.24.4",
    "@eslint/eslintrc": "^3.3.1",
    "@tailwindcss/postcss": "^4.1.18",
    "@tarojs/cli": "4.1.9",
    "@tarojs/plugin-generator": "4.1.9",
    "@tarojs/vite-runner": "4.1.9",
    "@types/react": "^18.0.0",
    "@vitejs/plugin-react": "^4.3.0",
    "babel-preset-taro": "4.1.9",
    "eslint": "^8.57.0",
    "eslint-config-taro": "4.1.9",
    "eslint-plugin-react": "^7.34.1",
    "eslint-plugin-react-hooks": "^4.4.0",
    "postcss": "^8.5.6",
    "react-refresh": "^0.14.0",
    "tailwindcss": "^4.1.18",
    "typescript": "^5.4.5",
    "vite": "^4.2.0",
    "weapp-tailwindcss": "^4.9.2"
  },
  "packageManager": "pnpm@9.0.0",
  "engines": {
    "pnpm": ">=9.0.0"
  }
}
```

---

### 文件 2: src/app.config.ts

**路径**: `src/app.config.ts`

```typescript
export default typeof definePageConfig === 'function'
  ? defineAppConfig({
      pages: [
        'pages/index/index',
        'pages/diagnosis/index',
        'pages/profile/index'
      ],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#FF6B35',
        navigationBarTitleText: '马驴健康管家',
        navigationBarTextStyle: 'white'
      },
      tabBar: {
        color: '#999999',
        selectedColor: '#FF6B35',
        backgroundColor: '#FFFFFF',
        borderStyle: 'black',
        list: [
          {
            pagePath: 'pages/index/index',
            text: '首页',
            iconPath: './assets/tabbar/home.png',
            selectedIconPath: './assets/tabbar/home-active.png',
          },
          {
            pagePath: 'pages/diagnosis/index',
            text: '诊断',
            iconPath: './assets/tabbar/stethoscope.png',
            selectedIconPath: './assets/tabbar/stethoscope-active.png',
          },
          {
            pagePath: 'pages/profile/index',
            text: '我的',
            iconPath: './assets/tabbar/user.png',
            selectedIconPath: './assets/tabbar/user-active.png',
          }
        ]
      }
    })
  : {
      pages: [
        'pages/index/index',
        'pages/diagnosis/index',
        'pages/profile/index'
      ],
      window: {
        backgroundTextStyle: 'light',
        navigationBarBackgroundColor: '#FF6B35',
        navigationBarTitleText: '马驴健康管家',
        navigationBarTextStyle: 'white'
      },
      tabBar: {
        color: '#999999',
        selectedColor: '#FF6B35',
        backgroundColor: '#FFFFFF',
        borderStyle: 'black',
        list: [
          {
            pagePath: 'pages/index/index',
            text: '首页',
            iconPath: './assets/tabbar/home.png',
            selectedIconPath: './assets/tabbar/home-active.png',
          },
          {
            pagePath: 'pages/diagnosis/index',
            text: '诊断',
            iconPath: './assets/tabbar/stethoscope.png',
            selectedIconPath: './assets/tabbar/stethoscope-active.png',
          },
          {
            pagePath: 'pages/profile/index',
            text: '我的',
            iconPath: './assets/tabbar/user.png',
            selectedIconPath: './assets/tabbar/user-active.png',
          }
        ]
      }
    }
```

---

### 文件 3: src/pages/index/index.tsx（首页）

**路径**: `src/pages/index/index.tsx`

```typescript
import React, { useState, useEffect } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { Plus, Stethoscope, History, ChevronRight } from 'lucide-react-taro'
import { Network } from '@/network'

interface Animal {
  id: number
  type: 'horse' | 'donkey'
  number: string
  age: number
  gender: 'male' | 'female'
  createTime: string
}

export default function Index() {
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(false)
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

  useEffect(() => {
    loadAnimals()
  }, [])

  const loadAnimals = async () => {
    try {
      setLoading(true)
      const res: any = await Network.request({
        url: '/api/animals',
        method: 'GET'
      })
      if (res.data.code === 200) {
        setAnimals(res.data.data || [])
      }
    } catch (error) {
      console.error('加载动物列表失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAddAnimal = async () => {
    const { inputValue } = await Taro.showModal({
      title: '添加动物',
      content: '请输入动物编号',
      editable: true,
      placeholderText: '例如：H001'
    })

    if (!inputValue) return

    const { typeIndex } = await Taro.showActionSheet({
      itemList: ['马', '驴']
    })

    const { ageValue } = await Taro.showModal({
      title: '动物年龄',
      content: '请输入年龄（岁）',
      editable: true,
      placeholderText: '例如：5'
    })

    if (!ageValue) return

    const { genderIndex } = await Taro.showActionSheet({
      itemList: ['公', '母']
    })

    try {
      const res: any = await Network.request({
        url: '/api/animals',
        method: 'POST',
        data: {
          type: typeIndex === 0 ? 'horse' : 'donkey',
          number: inputValue,
          age: parseInt(ageValue),
          gender: genderIndex === 0 ? 'male' : 'female'
        }
      })

      if (res.data.code === 200) {
        Taro.showToast({ title: '添加成功', icon: 'success' })
        loadAnimals()
      } else {
        Taro.showToast({ title: res.data.msg || '添加失败', icon: 'error' })
      }
    } catch (error) {
      console.error('添加动物失败:', error)
      Taro.showToast({ title: '添加失败', icon: 'error' })
    }
  }

  const handleDiagnosis = (animal: Animal) => {
    Taro.navigateTo({
      url: `/pages/diagnosis/index?animalId=${animal.id}`
    })
  }

  const handleHistory = () => {
    Taro.switchTab({ url: '/pages/profile/index' })
  }

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 顶部横幅 */}
      <View className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] p-6 pb-12">
        <View className="flex items-center justify-between mb-4">
          <Text className="text-white text-2xl font-bold">马驴健康管家</Text>
          <View className="bg-white/20 px-3 py-1 rounded-full">
            <Text className="text-white text-sm">专业版</Text>
          </View>
        </View>
        <Text className="text-white/90 text-sm">智能诊断，科学养护</Text>
      </View>

      {/* 统计卡片 */}
      <View className="px-4 -mt-8">
        <View className="bg-white rounded-2xl shadow-lg p-6">
          <View className="flex justify-around">
            <View className="text-center">
              <Text className="text-3xl font-bold text-[#FF6B35]">{animals.length}</Text>
              <Text className="text-gray-600 text-sm mt-1 block">动物数量</Text>
            </View>
            <View className="w-px bg-gray-200"></View>
            <View className="text-center">
              <Text className="text-3xl font-bold text-[#2ECC71]">{animals.filter(a => a.type === 'horse').length}</Text>
              <Text className="text-gray-600 text-sm mt-1 block">马</Text>
            </View>
            <View className="w-px bg-gray-200"></View>
            <View className="text-center">
              <Text className="text-3xl font-bold text-[#3498DB]">{animals.filter(a => a.type === 'donkey').length}</Text>
              <Text className="text-gray-600 text-sm mt-1 block">驴</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 快捷操作 */}
      <View className="px-4 mt-6">
        <View className="grid grid-cols-3 gap-4">
          <View
            className="bg-white rounded-xl p-4 shadow-sm text-center"
            onClick={handleAddAnimal}
          >
            <View className="bg-[#FF6B35] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <Plus size={24} color="white" />
            </View>
            <Text className="text-gray-700 text-sm block">添加动物</Text>
          </View>
          <View
            className="bg-white rounded-xl p-4 shadow-sm text-center"
            onClick={handleHistory}
          >
            <View className="bg-[#2ECC71] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <History size={24} color="white" />
            </View>
            <Text className="text-gray-700 text-sm block">历史记录</Text>
          </View>
          <View
            className="bg-white rounded-xl p-4 shadow-sm text-center"
          >
            <View className="bg-[#3498DB] w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-2">
              <Stethoscope size={24} color="white" />
            </View>
            <Text className="text-gray-700 text-sm block">快速诊断</Text>
          </View>
        </View>
      </View>

      {/* 动物列表 */}
      <View className="px-4 mt-6 pb-8">
        <View className="flex justify-between items-center mb-4">
          <Text className="text-lg font-semibold text-gray-800 block">我的动物</Text>
          <Text
            className="text-[#FF6B35] text-sm block"
            onClick={handleAddAnimal}
          >
            + 添加
          </Text>
        </View>

        {loading ? (
          <View className="text-center py-8">
            <Text className="text-gray-500 block">加载中...</Text>
          </View>
        ) : animals.length === 0 ? (
          <View className="bg-white rounded-xl p-8 text-center shadow-sm">
            <Text className="text-gray-400 text-4xl mb-3 block">🐴</Text>
            <Text className="text-gray-500 block">还没有添加动物</Text>
            <Text className="text-gray-400 text-sm mt-2 block">点击上方按钮添加</Text>
          </View>
        ) : (
          <View className="space-y-3">
            {animals.map((animal) => (
              <View
                key={animal.id}
                className="bg-white rounded-xl p-4 shadow-sm flex items-center justify-between"
              >
                <View className="flex items-center">
                  <View className="bg-[#FF6B35] w-10 h-10 rounded-full flex items-center justify-center mr-3">
                    <Text className="text-white text-lg">
                      {animal.type === 'horse' ? '🐴' : '🫏'}
                    </Text>
                  </View>
                  <View>
                    <Text className="font-semibold text-gray-800 text-base block">
                      {animal.type === 'horse' ? '马' : '驴'} - {animal.number}
                    </Text>
                    <Text className="text-gray-500 text-sm block">
                      {animal.age}岁 · {animal.gender === 'male' ? '公' : '母'}
                    </Text>
                  </View>
                </View>
                <View onClick={() => handleDiagnosis(animal)}>
                  <ChevronRight size={20} color="#999" />
                </View>
              </View>
            ))}
          </View>
        )}
      </View>
    </View>
  )
}
```

---

### 文件 4: src/pages/index/index.config.ts

**路径**: `src/pages/index/index.config.ts`

```typescript
export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '首页'
    })
  : { navigationBarTitleText: '首页' }
```

---

### 文件 5: src/pages/diagnosis/index.tsx（诊断页）

**路径**: `src/pages/diagnosis/index.tsx`

```typescript
import React, { useState, useEffect } from 'react'
import { View, Text, Button, ScrollView } from '@tarojs/components'
import Taro, { useRouter } from '@tarojs/taro'
import { Check, Stethoscope, AlertCircle, Play } from 'lucide-react-taro'
import { Network } from '@/network'

interface Symptom {
  id: number
  name: string
  category: string
}

interface DiagnosisResult {
  disease: string
  severity: 'mild' | 'moderate' | 'severe'
  treatment: string[]
  prevention: string[]
}

const symptoms: Symptom[] = [
  // 呼吸系统
  { id: 1, name: '呼吸急促', category: '呼吸' },
  { id: 2, name: '咳嗽', category: '呼吸' },
  { id: 3, name: '鼻分泌物', category: '呼吸' },
  { id: 4, name: '呼吸困难', category: '呼吸' },
  // 消化系统
  { id: 5, name: '食欲不振', category: '消化' },
  { id: 6, name: '腹泻', category: '消化' },
  { id: 7, name: '便秘', category: '消化' },
  { id: 8, name: '腹痛', category: '消化' },
  // 神经系统
  { id: 9, name: '精神萎靡', category: '神经' },
  { id: 10, name: '行走不稳', category: '神经' },
  { id: 11, name: '抽搐', category: '神经' },
  { id: 12, name: '视力异常', category: '神经' },
  // 其他
  { id: 13, name: '发热', category: '其他' },
  { id: 14, name: '皮肤异常', category: '其他' },
  { id: 15, name: '体重下降', category: '其他' },
  { id: 16, name: '运动障碍', category: '其他' },
]

export default function Diagnosis() {
  const router = useRouter()
  const [animalId, setAnimalId] = useState<number>()
  const [selectedSymptoms, setSelectedSymptoms] = useState<number[]>([])
  const [diagnosing, setDiagnosing] = useState(false)
  const [result, setResult] = useState<DiagnosisResult | null>(null)
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

  useEffect(() => {
    const id = parseInt(router.params.animalId || '0')
    if (id) {
      setAnimalId(id)
    }
  }, [router.params])

  const toggleSymptom = (id: number) => {
    setSelectedSymptoms(prev =>
      prev.includes(id)
        ? prev.filter(s => s !== id)
        : [...prev, id]
    )
  }

  const handleDiagnosis = async () => {
    if (selectedSymptoms.length === 0) {
      Taro.showToast({ title: '请选择症状', icon: 'none' })
      return
    }

    try {
      setDiagnosing(true)

      const res: any = await Network.request({
        url: '/api/diagnosis',
        method: 'POST',
        data: {
          animalId,
          symptoms: selectedSymptoms
        }
      })

      if (res.data.code === 200) {
        setResult(res.data.data)
        Taro.showToast({ title: '诊断完成', icon: 'success' })
      } else {
        Taro.showToast({ title: res.data.msg || '诊断失败', icon: 'error' })
      }
    } catch (error) {
      console.error('诊断失败:', error)
      Taro.showToast({ title: '诊断失败', icon: 'error' })
    } finally {
      setDiagnosing(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'text-[#2ECC71] bg-green-50 border-green-200'
      case 'moderate': return 'text-[#FF6B35] bg-orange-50 border-orange-200'
      case 'severe': return 'text-red-600 bg-red-50 border-red-200'
      default: return 'text-gray-600 bg-gray-50 border-gray-200'
    }
  }

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'mild': return '轻微'
      case 'moderate': return '中等'
      case 'severe': return '严重'
      default: return '未知'
    }
  }

  const categories = ['呼吸', '消化', '神经', '其他']

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 顶部说明 */}
      <View className="bg-white p-4 border-b">
        <View className="flex items-center mb-2">
          <Stethoscope size={20} color="#FF6B35" />
          <Text className="ml-2 font-semibold text-gray-800 text-base block">症状选择</Text>
        </View>
        <Text className="text-gray-500 text-sm block">
          请选择动物出现的症状，系统将为您智能诊断
        </Text>
      </View>

      <ScrollView scrollY className="flex-1 pb-32">
        {/* 症状列表 */}
        <View className="p-4">
          {categories.map(category => (
            <View key={category} className="mb-6">
              <Text className="text-sm font-semibold text-gray-700 mb-3 block">{category}</Text>
              <View className="space-y-2">
                {symptoms
                  .filter(s => s.category === category)
                  .map(symptom => (
                    <View
                      key={symptom.id}
                      className={`bg-white rounded-lg p-4 flex items-center justify-between border-2 ${
                        selectedSymptoms.includes(symptom.id)
                          ? 'border-[#FF6B35] bg-orange-50'
                          : 'border-gray-200'
                      }`}
                      onClick={() => toggleSymptom(symptom.id)}
                    >
                      <Text className="text-gray-800 text-base flex-1">{symptom.name}</Text>
                      {selectedSymptoms.includes(symptom.id) && (
                        <View className="bg-[#FF6B35] rounded-full p-1">
                          <Check size={16} color="white" />
                        </View>
                      )}
                    </View>
                  ))}
              </View>
            </View>
          ))}
        </View>

        {/* 诊断结果 */}
        {result && (
          <View className="mx-4 mb-4 bg-white rounded-xl shadow-md p-6">
            <View className="flex items-center justify-between mb-4">
              <Text className="text-lg font-bold text-gray-800 block">诊断结果</Text>
              <View className={`px-3 py-1 rounded-full border ${getSeverityColor(result.severity)}`}>
                <Text className="text-sm font-medium block">{getSeverityText(result.severity)}</Text>
              </View>
            </View>

            <View className="mb-4 pb-4 border-b">
              <View className="flex items-center mb-2">
                <AlertCircle size={20} color="#FF6B35" />
                <Text className="ml-2 font-semibold text-gray-800 block">疑似疾病</Text>
              </View>
              <Text className="text-xl font-bold text-[#FF6B35] block">{result.disease}</Text>
            </View>

            <View className="mb-4 pb-4 border-b">
              <Text className="font-semibold text-gray-800 mb-2 block">治疗方案</Text>
              <View className="space-y-2">
                {result.treatment.map((item, index) => (
                  <View key={index} className="flex items-start">
                    <View className="bg-[#2ECC71] w-5 h-5 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Text className="text-white text-xs">{index + 1}</Text>
                    </View>
                    <Text className="text-gray-700 text-sm flex-1 block">{item}</Text>
                  </View>
                ))}
              </View>
            </View>

            <View>
              <Text className="font-semibold text-gray-800 mb-2 block">预防措施</Text>
              <View className="space-y-2">
                {result.prevention.map((item, index) => (
                  <View key={index} className="flex items-start">
                    <View className="bg-[#3498DB] w-5 h-5 rounded-full flex items-center justify-center mr-2 mt-0.5 flex-shrink-0">
                      <Text className="text-white text-xs">{index + 1}</Text>
                    </View>
                    <Text className="text-gray-700 text-sm flex-1 block">{item}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>

      {/* 底部操作栏 */}
      <View style={{
        position: 'fixed',
        bottom: isWeapp ? 50 : 0,
        left: 0,
        right: 0,
        backgroundColor: '#ffffff',
        borderTop: '1px solid #e5e5e5',
        padding: '16px',
        zIndex: 100
      }}>
        <View className="flex gap-3">
          <View style={{ flex: 1 }}>
            <Button
              className="w-full bg-[#FF6B35] text-white rounded-xl py-3"
              disabled={diagnosing || selectedSymptoms.length === 0}
              onClick={handleDiagnosis}
            >
              {diagnosing ? '诊断中...' : '开始诊断'}
            </Button>
          </View>
        </View>
      </View>
    </View>
  )
}
```

---

### 文件 6: src/pages/diagnosis/index.config.ts

**路径**: `src/pages/diagnosis/index.config.ts`

```typescript
export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '智能诊断'
    })
  : { navigationBarTitleText: '智能诊断' }
```

---

### 文件 7: src/pages/profile/index.tsx（我的页面）

**路径**: `src/pages/profile/index.tsx`

```typescript
import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { History, FileText, Settings, User, Calendar, Activity } from 'lucide-react-taro'
import { Network } from '@/network'

interface HistoryRecord {
  id: number
  animalId: number
  animalType: string
  animalNumber: string
  symptoms: string[]
  diagnosis: string
  severity: string
  createTime: string
}

export default function Profile() {
  const [history, setHistory] = useState<HistoryRecord[]>([])
  const [loading, setLoading] = useState(false)
  const isWeapp = Taro.getEnv() === Taro.ENV_TYPE.WEAPP

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    try {
      setLoading(true)
      const res: any = await Network.request({
        url: '/api/diagnosis/history',
        method: 'GET'
      })
      if (res.data.code === 200) {
        setHistory(res.data.data || [])
      }
    } catch (error) {
      console.error('加载历史记录失败:', error)
    } finally {
      setLoading(false)
    }
  }

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'mild': return 'bg-[#2ECC71] text-white'
      case 'moderate': return 'bg-[#FF6B35] text-white'
      case 'severe': return 'bg-red-500 text-white'
      default: return 'bg-gray-500 text-white'
    }
  }

  const getSeverityText = (severity: string) => {
    switch (severity) {
      case 'mild': return '轻微'
      case 'moderate': return '中等'
      case 'severe': return '严重'
      default: return '未知'
    }
  }

  return (
    <View className="min-h-screen bg-gray-50">
      {/* 用户信息卡片 */}
      <View className="bg-gradient-to-r from-[#FF6B35] to-[#FF8C61] p-6 pb-8">
        <View className="flex items-center">
          <View className="bg-white w-16 h-16 rounded-full flex items-center justify-center mr-4">
            <User size={32} color="#FF6B35" />
          </View>
          <View>
            <Text className="text-white text-xl font-bold block">养殖户</Text>
            <Text className="text-white/90 text-sm block">马驴健康管家</Text>
          </View>
        </View>
      </View>

      {/* 统计卡片 */}
      <View className="px-4 -mt-4">
        <View className="bg-white rounded-xl shadow-md p-4">
          <View className="flex justify-around">
            <View className="text-center">
              <Text className="text-2xl font-bold text-[#FF6B35]">{history.length}</Text>
              <Text className="text-gray-600 text-xs mt-1 block">诊断记录</Text>
            </View>
            <View className="w-px bg-gray-200"></View>
            <View className="text-center">
              <Text className="text-2xl font-bold text-[#2ECC71]">
                {history.filter(h => h.severity === 'mild').length}
              </Text>
              <Text className="text-gray-600 text-xs mt-1 block">轻微</Text>
            </View>
            <View className="w-px bg-gray-200"></View>
            <View className="text-center">
              <Text className="text-2xl font-bold text-[#3498DB]">
                {history.filter(h => h.severity === 'moderate').length}
              </Text>
              <Text className="text-gray-600 text-xs mt-1 block">中等</Text>
            </View>
            <View className="w-px bg-gray-200"></View>
            <View className="text-center">
              <Text className="text-2xl font-bold text-red-500">
                {history.filter(h => h.severity === 'severe').length}
              </Text>
              <Text className="text-gray-600 text-xs mt-1 block">严重</Text>
            </View>
          </View>
        </View>
      </View>

      {/* 历史记录列表 */}
      <View className="px-4 mt-6 pb-8">
        <View className="flex items-center mb-4">
          <History size={20} color="#FF6B35" />
          <Text className="ml-2 font-semibold text-gray-800 text-lg block">历史记录</Text>
        </View>

        {loading ? (
          <View className="text-center py-8">
            <Text className="text-gray-500 block">加载中...</Text>
          </View>
        ) : history.length === 0 ? (
          <View className="bg-white rounded-xl p-8 text-center">
            <FileText size={48} color="#d1d5db" />
            <Text className="text-gray-400 mt-3 block">暂无诊断记录</Text>
            <Text className="text-gray-300 text-sm mt-2 block">去诊断页面添加第一条记录</Text>
          </View>
        ) : (
          <ScrollView scrollY className="space-y-3" style={{ maxHeight: '60vh' }}>
            {history.map(record => (
              <View key={record.id} className="bg-white rounded-xl p-4 shadow-sm">
                {/* 头部信息 */}
                <View className="flex items-center justify-between mb-3">
                  <View className="flex items-center">
                    <Text className="text-xl mr-2">
                      {record.animalType === 'horse' ? '🐴' : '🫏'}
                    </Text>
                    <View>
                      <Text className="font-semibold text-gray-800 text-sm block">
                        {record.animalNumber}
                      </Text>
                      <Text className="text-gray-400 text-xs block">
                        {new Date(record.createTime).toLocaleString('zh-CN')}
                      </Text>
                    </View>
                  </View>
                  <View className={`px-2 py-1 rounded text-xs ${getSeverityColor(record.severity)}`}>
                    {getSeverityText(record.severity)}
                  </View>
                </View>

                {/* 诊断结果 */}
                <View className="bg-gray-50 rounded-lg p-3 mb-3">
                  <View className="flex items-center mb-2">
                    <Activity size={16} color="#FF6B35" />
                    <Text className="ml-2 font-medium text-gray-800 text-sm block">诊断结果</Text>
                  </View>
                  <Text className="text-[#FF6B35] font-semibold text-base block">
                    {record.diagnosis}
                  </Text>
                </View>

                {/* 症状标签 */}
                <View>
                  <View className="flex items-center mb-2">
                    <FileText size={16} color="#666" />
                    <Text className="ml-2 text-gray-600 text-xs block">症状</Text>
                  </View>
                  <View className="flex flex-wrap gap-2">
                    {record.symptoms.slice(0, 3).map((symptom, index) => (
                      <View key={index} className="bg-[#FF6B35]/10 text-[#FF6B35] px-2 py-1 rounded text-xs">
                        <Text block>{symptom}</Text>
                      </View>
                    ))}
                    {record.symptoms.length > 3 && (
                      <View className="bg-gray-100 text-gray-500 px-2 py-1 rounded text-xs">
                        <Text block>+{record.symptoms.length - 3}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
        )}
      </View>
    </View>
  )
}
```

---

### 文件 8: src/pages/profile/index.config.ts

**路径**: `src/pages/profile/index.config.ts`

```typescript
export default typeof definePageConfig === 'function'
  ? definePageConfig({
      navigationBarTitleText: '我的'
    })
  : { navigationBarTitleText: '我的' }
```

---

### 文件 9: src/network/index.ts（网络请求封装）

**路径**: `src/network/index.ts`

```typescript
import Taro from '@tarojs/taro'

// 项目域名（开发环境使用 localhost，生产环境请配置 PROJECT_DOMAIN）
const PROJECT_DOMAIN = process.env.PROJECT_DOMAIN || ''

class Network {
  private baseUrl: string

  constructor() {
    this.baseUrl = PROJECT_DOMAIN
  }

  private isExternalUrl(url: string): boolean {
    return url.startsWith('http://') || url.startsWith('https://')
  }

  private getFullUrl(url: string): string {
    if (this.isExternalUrl(url)) {
      return url
    }
    return `${this.baseUrl}${url}`
  }

  request(options: Taro.request.Option): Promise<any> {
    const url = this.getFullUrl(options.url!)

    console.log('[Network Request]', {
      url,
      method: options.method || 'GET',
      data: options.data,
      header: options.header
    })

    return Taro.request({
      ...options,
      url,
      success: (res) => {
        console.log('[Network Response]', {
          url,
          statusCode: res.statusCode,
          data: res.data
        })
      },
      fail: (err) => {
        console.error('[Network Error]', {
          url,
          error: err
        })
      }
    })
  }

  uploadFile(options: Taro.uploadFile.Option): Promise<any> {
    const url = this.getFullUrl(options.url!)

    console.log('[Network UploadFile]', {
      url,
      filePath: options.filePath,
      name: options.name
    })

    return Taro.uploadFile({
      ...options,
      url,
      success: (res) => {
        console.log('[Network UploadFile Response]', {
          url,
          statusCode: res.statusCode,
          data: res.data
        })
      },
      fail: (err) => {
        console.error('[Network UploadFile Error]', {
          url,
          error: err
        })
      }
    })
  }

  downloadFile(options: Taro.downloadFile.Option): Promise<any> {
    const url = this.getFullUrl(options.url!)

    console.log('[Network DownloadFile]', { url })

    return Taro.downloadFile({
      ...options,
      url,
      success: (res) => {
        console.log('[Network DownloadFile Response]', {
          url,
          statusCode: res.statusCode,
          tempFilePath: res.tempFilePath
        })
      },
      fail: (err) => {
        console.error('[Network DownloadFile Error]', {
          url,
          error: err
        })
      }
    })
  }
}

export const network = new Network()

export default Network
```

---

### 文件 10: server/src/main.ts（后端入口）

**路径**: `server/src/main.ts`

```typescript
import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from './app.module'

async function bootstrap() {
  const app = await NestFactory.create(AppModule)

  // 全局路由前缀
  app.setGlobalPrefix('api')

  // 全局验证管道
  app.useGlobalPipes(new ValidationPipe())

  // 启用 CORS
  app.enableCors()

  const port = process.env.PORT || 3000
  await app.listen(port)
  console.log(`🚀 Server is running on: http://localhost:${port}`)
}

bootstrap()
```

---

### 文件 11: server/src/app.module.ts（后端主模块）

**路径**: `server/src/app.module.ts`

```typescript
import { Module } from '@nestjs/common'
import { AnimalModule } from './animal.module'

@Module({
  imports: [AnimalModule],
})
export class AppModule {}
```

---

### 文件 12: server/src/animal.controller.ts（后端控制器）

**路径**: `server/src/animal.controller.ts`

```typescript
import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { AnimalService } from './animal.service'

@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  @Get()
  async getAllAnimals() {
    const animals = await this.animalService.findAll()
    return {
      code: 200,
      msg: 'success',
      data: animals
    }
  }

  @Post()
  async createAnimal(@Body() body: any) {
    const animal = await this.animalService.create(body)
    return {
      code: 200,
      msg: 'success',
      data: animal
    }
  }
}

@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly animalService: AnimalService) {}

  @Post()
  async createDiagnosis(@Body() body: any) {
    const result = await this.animalService.createDiagnosis(body)
    return {
      code: 200,
      msg: 'success',
      data: result
    }
  }

  @Get('history')
  async getHistory() {
    const history = await this.animalService.getDiagnosisHistory()
    return {
      code: 200,
      msg: 'success',
      data: history
    }
  }
}
```

---

### 文件 13: server/src/animal.service.ts（后端服务）

**路径**: `server/src/animal.service.ts`

```typescript
import { Injectable } from '@nestjs/common'

interface Animal {
  id: number
  type: 'horse' | 'donkey'
  number: string
  age: number
  gender: 'male' | 'female'
  createTime: string
}

interface DiagnosisRecord {
  id: number
  animalId: number
  animalType: string
  animalNumber: string
  symptoms: string[]
  diagnosis: string
  severity: 'mild' | 'moderate' | 'severe'
  treatment: string[]
  prevention: string[]
  createTime: string
}

@Injectable()
export class AnimalService {
  private animals: Animal[] = []
  private diagnoses: DiagnosisRecord[] = []
  private animalIdCounter = 1
  private diagnosisIdCounter = 1

  findAll() {
    return this.animals
  }

  create(data: any) {
    const newAnimal: Animal = {
      id: this.animalIdCounter++,
      type: data.type,
      number: data.number,
      age: data.age,
      gender: data.gender,
      createTime: new Date().toISOString()
    }
    this.animals.push(newAnimal)
    return newAnimal
  }

  createDiagnosis(data: any) {
    const animal = this.animals.find(a => a.id === data.animalId)
    const symptomNames = this.getSymptomNames(data.symptoms)
    const result = this.analyzeSymptoms(data.symptoms)

    const newDiagnosis: DiagnosisRecord = {
      id: this.diagnosisIdCounter++,
      animalId: data.animalId,
      animalType: animal?.type || 'unknown',
      animalNumber: animal?.number || '未知',
      symptoms: symptomNames,
      diagnosis: result.disease,
      severity: result.severity,
      treatment: result.treatment,
      prevention: result.prevention,
      createTime: new Date().toISOString()
    }

    this.diagnoses.push(newDiagnosis)
    return newDiagnosis
  }

  getDiagnosisHistory() {
    return this.diagnoses.reverse()
  }

  private getSymptomNames(symptomIds: number[]): string[] {
    const symptomMap: { [key: number]: string } = {
      1: '呼吸急促', 2: '咳嗽', 3: '鼻分泌物', 4: '呼吸困难',
      5: '食欲不振', 6: '腹泻', 7: '便秘', 8: '腹痛',
      9: '精神萎靡', 10: '行走不稳', 11: '抽搐', 12: '视力异常',
      13: '发热', 14: '皮肤异常', 15: '体重下降', 16: '运动障碍'
    }
    return symptomIds.map(id => symptomMap[id] || '未知症状')
  }

  private analyzeSymptoms(symptomIds: number[]) {
    // 简化版诊断逻辑（实际项目应该使用更复杂的算法或 AI）
    const respiratorySymptoms = [1, 2, 3, 4]
    const digestiveSymptoms = [5, 6, 7, 8]
    const neurologicalSymptoms = [9, 10, 11, 12]

    const hasRespiratory = symptomIds.some(id => respiratorySymptoms.includes(id))
    const hasDigestive = symptomIds.some(id => digestiveSymptoms.includes(id))
    const hasNeurological = symptomIds.some(id => neurologicalSymptoms.includes(id))

    // 根据症状组合返回诊断结果
    if (hasRespiratory && hasDigestive) {
      return {
        disease: '呼吸道感染伴随消化不良',
        severity: 'moderate' as const,
        treatment: [
          '保持环境清洁通风',
          '提供易消化的饲料',
          '补充电解质和维生素',
          '必要时使用抗生素治疗',
          '隔离患病动物'
        ],
        prevention: [
          '定期疫苗接种',
          '保持饲料和饮水清洁',
          '定期清理饲养环境',
          '避免与其他患病动物接触'
        ]
      }
    } else if (hasRespiratory) {
      return {
        disease: '呼吸道疾病',
        severity: 'mild' as const,
        treatment: [
          '保持环境通风',
          '避免粉尘和刺激物',
          '提供充足饮水',
          '观察呼吸状况',
          '必要时使用支气管扩张剂'
        ],
        prevention: [
          '定期清理饲养环境',
          '保持空气质量',
          '避免过度劳累',
          '定期检查呼吸系统'
        ]
      }
    } else if (hasDigestive) {
      return {
        disease: '消化系统疾病',
        severity: 'moderate' as const,
        treatment: [
          '调整饲料配比',
          '提供易消化食物',
          '补充益生菌',
          '保持充足饮水',
          '必要时使用止泻药'
        ],
        prevention: [
          '定期更换饲料',
          '避免突然改变饲料',
          '保持饲料清洁',
          '定期消毒食槽'
        ]
      }
    } else if (hasNeurological) {
      return {
        disease: '神经系统异常',
        severity: 'severe' as const,
        treatment: [
          '立即隔离患病动物',
          '保持环境安静',
          '避免刺激',
          '尽快联系兽医',
          '提供营养支持'
        ],
        prevention: [
          '避免接触有毒物质',
          '定期疫苗接种',
          '保持饲养环境安全',
          '定期检查神经系统'
        ]
      }
    } else {
      return {
        disease: '需要进一步观察',
        severity: 'mild' as const,
        treatment: [
          '密切观察症状变化',
          '提供营养均衡的饲料',
          '保持饲养环境清洁',
          '记录症状发展情况',
          '必要时咨询兽医'
        ],
        prevention: [
          '定期健康检查',
          '保持良好的饲养环境',
          '合理搭配饲料',
          '避免应激因素'
        ]
      }
    }
  }
}
```

---

### 文件 14: server/src/animal.module.ts（后端模块）

**路径**: `server/src/animal.module.ts`

```typescript
import { Module } from '@nestjs/common'
import { AnimalController, DiagnosisController } from './animal.controller'
import { AnimalService } from './animal.service'

@Module({
  controllers: [AnimalController, DiagnosisController],
  providers: [AnimalService],
})
export class AnimalModule {}
```

---

### 文件 15: .github/workflows/deploy.yml（GitHub Actions）

**路径**: `.github/workflows/deploy.yml`

```yaml
name: Deploy H5 to GitHub Pages

on:
  push:
    branches: [ main, master ]
  pull_request:
    branches: [ main, master ]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node.js
        uses: actions/setup-node@v4
        with:
          node-version: '18'
          cache: 'npm'

      - name: Setup pnpm
        uses: pnpm/action-setup@v4
        with:
          version: 8

      - name: Install dependencies
        run: pnpm install --frozen-lockfile

      - name: Build H5
        run: pnpm build:web

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist-web

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

---

## 🚀 第三步：启动项目

### 1. 启动前端开发服务器

```bash
# 在项目根目录
cd animal-health-manager
pnpm dev:web
```

访问：http://localhost:5000

### 2. 启动后端开发服务器（新开一个终端）

```bash
# 在 server 目录
cd server
npm run start:dev
```

访问：http://localhost:3000

---

## 🌐 第四步：部署到 GitHub Pages

```bash
# 初始化 Git
git init
git add .
git commit -m "feat: 初始化项目"

# 创建 GitHub 仓库（在 https://github.com/new）

# 推送代码（替换 YOUR_USERNAME）
git remote add origin https://github.com/YOUR_USERNAME/animal-health-manager.git
git branch -M main
git push -u origin main

# 启用 GitHub Pages
# 进入仓库 Settings → Pages → Source 选择 GitHub Actions
```

等待部署完成后，访问：
```
https://YOUR_USERNAME.github.io/animal-health-manager/
```

---

## 🎨 配置 TabBar 图标（可选）

如果需要配置 TabBar 图标，在项目根目录执行：

```bash
# 创建图标目录
mkdir -p src/assets/tabbar

# 生成图标（需要安装 npx taro-lucide-tabbar）
npx taro-lucide-tabbar Home Stethoscope User -c "#999999" -a "#FF6B35" -o ./src/assets/tabbar -s 81
```

---

## ✅ 完成！

现在您已经拥有了完整的马驴健康管家项目！

**功能特性**：
- ✅ 动物标识管理
- ✅ 症状选择和智能诊断
- ✅ 历史记录查看
- ✅ 精美的 UI 设计
- ✅ 响应式布局

**技术栈**：
- Taro + React + TypeScript
- NestJS + TypeScript
- Tailwind CSS
- GitHub Pages 自动部署

---

**如果遇到任何问题，请随时告诉我！💪**
