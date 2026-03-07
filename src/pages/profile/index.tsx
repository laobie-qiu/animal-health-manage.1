import { View, Text, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { Network } from '@/network'
import './index.css'

interface DiagnosisHistory {
  id: string
  animalName: string
  animalType: 'horse' | 'donkey'
  disease: string
  date: string
  urgency: 'low' | 'medium' | 'high'
  symptoms: string[]
}

const ProfilePage = () => {
  const [diagnosisHistory, setDiagnosisHistory] = useState<DiagnosisHistory[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    loadHistory()
  }, [])

  const loadHistory = async () => {
    setLoading(true)
    try {
      const res = await Network.request({
        url: '/api/diagnosis/history',
        method: 'GET'
      })
      console.log('History response:', res.data)
      if (res.data?.code === 200) {
        setDiagnosisHistory(res.data.data || [])
      }
    } catch (error) {
      console.error('Failed to load history:', error)
      // 模拟历史数据
      setDiagnosisHistory([
        {
          id: '1',
          animalName: '小红马',
          animalType: 'horse',
          disease: '急性呼吸道感染',
          date: '2024-03-05',
          urgency: 'high',
          symptoms: ['发热', '呼吸困难', '咳嗽']
        },
        {
          id: '2',
          animalName: '小灰驴',
          animalType: 'donkey',
          disease: '消化不良',
          date: '2024-03-01',
          urgency: 'medium',
          symptoms: ['食欲不振', '腹泻']
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-500'
      case 'medium':
        return 'bg-yellow-500'
      case 'low':
        return 'bg-green-500'
      default:
        return 'bg-gray-500'
    }
  }

  const getUrgencyText = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return '紧急'
      case 'medium':
        return '中等'
      case 'low':
        return '轻微'
      default:
        return '未知'
    }
  }

  const handleShare = () => {
    Taro.showShareMenu({
      withShareTicket: true,
      menus: ['shareAppMessage', 'shareTimeline'],
    } as any)
  }

  const handleAbout = () => {
    Taro.showModal({
      title: '关于我们',
      content: '马驴健康管家是一款专业的动物疾病诊断小程序，帮助养殖户快速识别疾病并提供治疗建议。',
      showCancel: false
    })
  }

  return (
    <View className="h-full bg-gray-50">
      <ScrollView scrollY className="h-full pb-6">
        {/* 用户信息卡片 */}
        <View className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 pb-12">
          <View className="flex items-center gap-4">
            <View className="w-20 h-20 bg-white rounded-full flex items-center justify-center shadow-lg">
              <Text className="text-4xl">👨‍🌾</Text>
            </View>
            <View>
              <Text className="block text-xl font-bold text-white mb-1">养殖户</Text>
              <Text className="block text-sm text-white opacity-90">
                专业动物健康管理
              </Text>
            </View>
          </View>
        </View>

        {/* 统计数据 */}
        <View className="mx-4 -mt-6 bg-white rounded-2xl shadow-lg p-4 flex mb-4">
          <View className="flex-1 flex flex-col items-center">
            <Text className="block text-2xl font-bold text-orange-600">12</Text>
            <Text className="block text-sm text-gray-500 mt-1">动物总数</Text>
          </View>
          <View className="flex-1 flex flex-col items-center border-l border-r border-gray-200">
            <Text className="block text-2xl font-bold text-green-600">8</Text>
            <Text className="block text-sm text-gray-500 mt-1">健康</Text>
          </View>
          <View className="flex-1 flex flex-col items-center">
            <Text className="block text-2xl font-bold text-red-600">4</Text>
            <Text className="block text-sm text-gray-500 mt-1">治疗中</Text>
          </View>
        </View>

        {/* 历史诊断记录 */}
        <View className="px-4">
          <View className="flex items-center justify-between mb-3">
            <Text className="block text-lg font-bold text-gray-800">诊断历史</Text>
            <Text className="text-sm text-orange-500">查看全部</Text>
          </View>

          {loading ? (
            <View className="flex flex-col items-center justify-center h-32">
              <Text className="text-4xl mb-4 animate-bounce">🔍</Text>
              <Text className="text-orange-500 text-base font-medium">加载中...</Text>
            </View>
          ) : diagnosisHistory.length === 0 ? (
            <View className="flex flex-col items-center justify-center h-32 bg-white rounded-xl">
              <Text className="text-4xl mb-3">📋</Text>
              <Text className="text-gray-500 text-sm">暂无诊断记录</Text>
            </View>
          ) : (
            diagnosisHistory.map((record) => (
              <View
                key={record.id}
                className="bg-white rounded-xl shadow-md p-4 mb-3"
                onClick={() => {
                  Taro.showModal({
                    title: record.disease,
                    content: `症状: ${record.symptoms.join(', ')}\n诊断日期: ${record.date}`,
                    showCancel: false
                  })
                }}
              >
                <View className="flex items-center justify-between mb-3">
                  <View className="flex items-center gap-2">
                    <Text className="text-2xl">{record.animalType === 'horse' ? '🐴' : '🦙'}</Text>
                    <Text className="text-base font-semibold text-gray-800">
                      {record.animalName}
                    </Text>
                  </View>
                  <View className={`${getUrgencyColor(record.urgency)} px-2 py-1 rounded-full`}>
                    <Text className="text-xs font-medium text-white">
                      {getUrgencyText(record.urgency)}
                    </Text>
                  </View>
                </View>
                <View className="mb-2">
                  <Text className="text-sm text-gray-700">
                    疾病: <Text className="font-semibold text-orange-600">{record.disease}</Text>
                  </Text>
                </View>
                <View className="flex items-center gap-2">
                  <Text className="text-xs text-gray-500">{record.date}</Text>
                  <Text className="text-xs text-gray-400">·</Text>
                  <Text className="text-xs text-gray-500">{record.symptoms.length}个症状</Text>
                </View>
              </View>
            ))
          )}
        </View>

        {/* 功能菜单 */}
        <View className="px-4 mt-6">
          <View className="bg-white rounded-2xl shadow-md overflow-hidden">
            <View
              className="flex items-center justify-between p-4 border-b border-gray-100"
              onClick={handleShare}
            >
              <View className="flex items-center gap-3">
                <Text className="text-xl">📤</Text>
                <Text className="text-base text-gray-800">分享给好友</Text>
              </View>
              <Text className="text-gray-400">›</Text>
            </View>

            <View
              className="flex items-center justify-between p-4 border-b border-gray-100"
              onClick={handleAbout}
            >
              <View className="flex items-center gap-3">
                <Text className="text-xl">ℹ️</Text>
                <Text className="text-base text-gray-800">关于我们</Text>
              </View>
              <Text className="text-gray-400">›</Text>
            </View>

            <View
              className="flex items-center justify-between p-4"
              onClick={() => {
                Taro.showModal({
                  title: '版本信息',
                  content: '当前版本: 1.0.0',
                  showCancel: false
                })
              }}
            >
              <View className="flex items-center gap-3">
                <Text className="text-xl">🔄</Text>
                <Text className="text-base text-gray-800">检查更新</Text>
              </View>
              <Text className="text-gray-400">›</Text>
            </View>
          </View>
        </View>

        {/* 底部版本信息 */}
        <View className="px-4 mt-6 mb-4">
          <Text className="block text-center text-xs text-gray-400">
            马驴健康管家 v1.0.0
          </Text>
          <Text className="block text-center text-xs text-gray-300 mt-1">
            专业诊断 · 科学护理
          </Text>
        </View>
      </ScrollView>
    </View>
  )
}

export default ProfilePage
