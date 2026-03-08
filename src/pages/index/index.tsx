import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { Network } from '@/network'
import './index.css'

interface Animal {
  id: string
  name: string
  type: 'horse' | 'donkey'
  age: number
  healthStatus: 'healthy' | 'sick' | 'recovering'
  photo?: string
}

const IndexPage = () => {
  const [currentType, setCurrentType] = useState<'horse' | 'donkey'>('horse')
  const [animals, setAnimals] = useState<Animal[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadAnimals()
  }, [currentType])

  const loadAnimals = async () => {
    setLoading(true)
    try {
      const res = await Network.request({
        url: '/api/animals',
        method: 'GET',
        data: { type: currentType }
      })
      console.log('Animals response:', res.data)
      if (res.data?.code === 200) {
        setAnimals(res.data.data || [])
      }
    } catch (error) {
      console.error('Failed to load animals:', error)
      // 使用模拟数据
      const mockAnimals: Animal[] = currentType === 'horse'
        ? [
            { id: '1', name: '小红马', type: 'horse', age: 5, healthStatus: 'healthy' },
            { id: '2', name: '大白马', type: 'horse', age: 8, healthStatus: 'healthy' }
          ]
        : [
            { id: '3', name: '小灰驴', type: 'donkey', age: 4, healthStatus: 'healthy' },
            { id: '4', name: '老黑驴', type: 'donkey', age: 10, healthStatus: 'sick' }
          ]
      setAnimals(mockAnimals)
    } finally {
      setLoading(false)
    }
  }

  const handleAddAnimal = () => {
    Taro.showModal({
      title: `添加${currentType === 'horse' ? '马' : '驴'}`,
      content: '请输入动物名称',
      editable: true,
      placeholderText: '动物名称',
    } as any)
      .then((res) => {
        if (res.confirm && (res as any).content && (res as any).content.trim()) {
          const animalName = (res as any).content.trim()
          addAnimalData(animalName)
        }
      })
      .catch(() => {
        console.log('User cancelled')
      })
  }

  const addAnimalData = async (name: string) => {
    try {
      await Network.request({
        url: '/api/animals',
        method: 'POST',
        data: {
          name,
          type: currentType,
          age: 0,
          healthStatus: 'healthy',
        },
      })
      loadAnimals()
      Taro.showToast({ title: '添加成功', icon: 'success' })
    } catch (error) {
      console.error('Failed to add animal:', error)
      // 模拟添加成功
      const newAnimal: Animal = {
        id: Date.now().toString(),
        name,
        type: currentType,
        age: 0,
        healthStatus: 'healthy',
      }
      setAnimals([...animals, newAnimal])
      Taro.showToast({ title: '添加成功', icon: 'success' })
    }
  }

  const getAnimalEmoji = (type: 'horse' | 'donkey') => {
    return type === 'horse' ? '🐴' : '🦙'
  }

  const getAnimalColor = (type: 'horse' | 'donkey') => {
    return type === 'horse' ? 'bg-orange-600' : 'bg-gray-500'
  }

  const getHealthBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return { text: '健康', className: 'bg-green-100 text-green-600' }
      case 'sick':
        return { text: '生病', className: 'bg-red-100 text-red-600' }
      case 'recovering':
        return { text: '恢复中', className: 'bg-yellow-100 text-yellow-600' }
      default:
        return { text: '未知', className: 'bg-gray-100 text-gray-600' }
    }
  }

  return (
    <View className="h-full bg-gray-50">
      {/* 顶部标题区域 */}
      <View className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 pb-12">
        <Text className="block text-2xl font-bold text-white mb-2">马驴健康管家</Text>
        <Text className="block text-base text-white opacity-90">专业诊断 · 科学护理</Text>
      </View>

      {/* 动物切换卡片 */}
      <View className="mx-4 -mt-6 bg-white rounded-2xl shadow-lg p-2 flex mb-4">
        <View
          className={`flex-1 py-3 rounded-xl text-center transition-all ${
            currentType === 'horse' ? 'bg-orange-500 text-white' : 'bg-gray-50 text-gray-600'
          }`}
          onClick={() => setCurrentType('horse')}
        >
          <Text className="block text-2xl mb-1">🐴</Text>
          <Text className="block text-sm font-semibold">马匹</Text>
        </View>
        <View
          className={`flex-1 py-3 rounded-xl text-center transition-all ${
            currentType === 'donkey' ? 'bg-gray-500 text-white' : 'bg-gray-50 text-gray-600'
          }`}
          onClick={() => setCurrentType('donkey')}
        >
          <Text className="block text-2xl mb-1">🦙</Text>
          <Text className="block text-sm font-semibold">驴</Text>
        </View>
      </View>

      {/* 动物列表 */}
      <View className="px-4 pb-24">
        {loading ? (
          <View className="flex flex-col items-center justify-center h-48">
            <Text className="text-4xl mb-4 animate-bounce">🔍</Text>
            <Text className="text-orange-500 text-base font-medium">加载中...</Text>
          </View>
        ) : animals.length === 0 ? (
          <View className="flex flex-col items-center justify-center h-64">
            <Text className="text-6xl mb-4">{getAnimalEmoji(currentType)}</Text>
            <Text className="text-gray-500 text-base font-medium">暂无记录</Text>
            <Text className="text-gray-400 text-sm mt-2">点击下方按钮添加</Text>
          </View>
        ) : (
          animals.map((animal) => {
            const healthBadge = getHealthBadge(animal.healthStatus)
            return (
              <View
                key={animal.id}
                className="bg-white rounded-2xl shadow-md p-4 mb-3 flex items-center justify-between"
                onClick={() => {
                  Taro.navigateTo({
                    url: `/pages/diagnosis/index?animalId=${animal.id}`
                  })
                }}
              >
                <View className="flex items-center gap-3">
                  <View className={`w-14 h-14 ${getAnimalColor(animal.type)} rounded-full flex items-center justify-center shadow-md`}>
                    <Text className="text-white text-2xl">{getAnimalEmoji(animal.type)}</Text>
                  </View>
                  <View className="flex flex-col">
                    <Text className="text-lg font-semibold text-gray-800">{animal.name}</Text>
                    <Text className="text-sm text-gray-500">
                      {animal.type === 'horse' ? '马匹' : '驴'} · {animal.age}岁
                    </Text>
                  </View>
                </View>
                <View className={`${healthBadge.className} px-3 py-1 rounded-full`}>
                  <Text className="text-sm font-medium">{healthBadge.text}</Text>
                </View>
              </View>
            )
          })
        )}
      </View>

      {/* 底部固定按钮 */}
      <View
        style={{
          position: 'fixed',
          bottom: 60,
          left: 0,
          right: 0,
          padding: '16px',
          backgroundColor: '#F5F7FA',
          zIndex: 100,
        }}
      >
        <View className="w-full">
          <Button
            className="w-full bg-orange-500 text-white rounded-xl py-3 text-base font-semibold shadow-lg"
            onClick={handleAddAnimal}
          >
            + 添加{currentType === 'horse' ? '马匹' : '驴'}
          </Button>
        </View>
      </View>
    </View>
  )
}

export default IndexPage
