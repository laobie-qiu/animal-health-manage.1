import { View, Text, Button, ScrollView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { useState, useEffect } from 'react'
import { Network } from '@/network'
import './index.css'

interface Symptom {
  id: string
  name: string
  category: string
  severity: 'mild' | 'moderate' | 'severe'
}

interface DiagnosisResult {
  disease: string
  probability: number
  urgency: 'low' | 'medium' | 'high'
  description: string
  treatment: string[]
}

const DiagnosisPage = () => {
  const [selectedAnimal, setSelectedAnimal] = useState<any>(null)
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [diagnosing, setDiagnosing] = useState(false)
  const [diagnosisResult, setDiagnosisResult] = useState<DiagnosisResult | null>(null)

  const symptoms: Symptom[] = [
    { id: '1', name: '食欲不振', category: 'general', severity: 'moderate' },
    { id: '2', name: '发热', category: 'general', severity: 'severe' },
    { id: '3', name: '呼吸困难', category: 'respiratory', severity: 'severe' },
    { id: '4', name: '咳嗽', category: 'respiratory', severity: 'moderate' },
    { id: '5', name: '腹泻', category: 'digestive', severity: 'moderate' },
    { id: '6', name: '呕吐', category: 'digestive', severity: 'severe' },
    { id: '7', name: '跛行', category: 'musculoskeletal', severity: 'moderate' },
    { id: '8', name: '精神萎靡', category: 'general', severity: 'mild' },
    { id: '9', name: '皮肤异常', category: 'skin', severity: 'mild' },
    { id: '10', name: '眼部异常', category: 'eyes', severity: 'moderate' }
  ]

  useEffect(() => {
    const instance = Taro.getCurrentInstance()
    const animalId = instance.router?.params?.animalId
    if (animalId) {
      loadAnimal(animalId)
    }
  }, [])

  const loadAnimal = async (animalId: string) => {
    try {
      const res = await Network.request({
        url: `/api/animals/${animalId}`,
        method: 'GET'
      })
      if (res.data?.code === 200) {
        setSelectedAnimal(res.data.data)
      }
    } catch (error) {
      console.error('Failed to load animal:', error)
      // 模拟数据
      setSelectedAnimal({
        id: animalId,
        name: '小红马',
        type: 'horse'
      })
    }
  }

  const toggleSymptom = (symptomId: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId)
        ? prev.filter(id => id !== symptomId)
        : [...prev, symptomId]
    )
  }

  const handleDiagnose = async () => {
    if (selectedSymptoms.length === 0) {
      Taro.showToast({ title: '请选择症状', icon: 'none' })
      return
    }

    setDiagnosing(true)
    try {
      const res = await Network.request({
        url: '/api/diagnosis',
        method: 'POST',
        data: {
          animalId: selectedAnimal?.id,
          symptoms: selectedSymptoms
        }
      })
      console.log('Diagnosis response:', res.data)
      if (res.data?.code === 200) {
        setDiagnosisResult(res.data.data)
      }
    } catch (error) {
      console.error('Failed to diagnose:', error)
      // 模拟诊断结果
      setDiagnosisResult({
        disease: '急性呼吸道感染',
        probability: 85,
        urgency: 'high',
        description: '根据症状分析，可能存在呼吸道感染，需要及时治疗。',
        treatment: [
          '立即隔离患病动物',
          '保持环境清洁通风',
          '提供充足饮水和易消化食物',
          '必要时使用抗生素治疗',
          '建议联系专业兽医进行进一步检查'
        ]
      })
    } finally {
      setDiagnosing(false)
    }
  }

  const resetDiagnosis = () => {
    setSelectedSymptoms([])
    setDiagnosisResult(null)
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

  return (
    <View className="h-full bg-gray-50">
      <ScrollView scrollY className="h-full pb-6">
        {/* 动物信息卡片 */}
        {selectedAnimal ? (
          <View className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 mb-4">
            <View className="flex items-center gap-4">
              <View className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                <Text className="text-3xl">{selectedAnimal.type === 'horse' ? '🐴' : '🦙'}</Text>
              </View>
              <View>
                <Text className="block text-xl font-bold text-white mb-1">
                  {selectedAnimal.name}
                </Text>
                <Text className="block text-sm text-white opacity-90">
                  {selectedAnimal.type === 'horse' ? '马匹' : '驴'}
                </Text>
              </View>
            </View>
          </View>
        ) : (
          <View className="bg-gradient-to-br from-orange-500 to-orange-600 p-6 mb-4">
            <Text className="block text-white text-base">请先选择动物</Text>
          </View>
        )}

        {/* 症状选择区域 */}
        {!diagnosisResult && (
          <View className="px-4">
            <Text className="block text-lg font-bold text-gray-800 mb-3">选择症状</Text>
            <View className="grid grid-cols-2 gap-3">
              {symptoms.map((symptom) => {
                const isSelected = selectedSymptoms.includes(symptom.id)
                return (
                  <View
                    key={symptom.id}
                    className={`p-4 rounded-xl border-2 transition-all ${
                      isSelected
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 bg-white'
                    }`}
                    onClick={() => toggleSymptom(symptom.id)}
                  >
                    <Text className={`block text-sm font-medium ${isSelected ? 'text-orange-600' : 'text-gray-700'}`}>
                      {symptom.name}
                    </Text>
                  </View>
                )
              })}
            </View>

            {/* 诊断按钮 */}
            <View className="mt-6">
              <Button
                className="w-full bg-orange-500 text-white rounded-xl py-3 text-base font-semibold shadow-lg"
                onClick={handleDiagnose}
                disabled={diagnosing}
              >
                {diagnosing ? '诊断中...' : '开始诊断'}
              </Button>
            </View>
          </View>
        )}

        {/* 诊断结果 */}
        {diagnosisResult && (
          <View className="px-4">
            {/* 诊断结果卡片 */}
            <View className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <View className="flex items-center justify-between mb-4">
                <Text className="block text-lg font-bold text-gray-800">诊断结果</Text>
                <View className={`${getUrgencyColor(diagnosisResult.urgency)} px-3 py-1 rounded-full`}>
                  <Text className="text-sm font-semibold text-white">
                    {getUrgencyText(diagnosisResult.urgency)}
                  </Text>
                </View>
              </View>

              <View className="mb-4">
                <Text className="block text-sm text-gray-500 mb-1">疑似疾病</Text>
                <Text className="block text-2xl font-bold text-orange-600 mb-2">
                  {diagnosisResult.disease}
                </Text>
              </View>

              <View className="mb-4">
                <Text className="block text-sm text-gray-500 mb-1">匹配度</Text>
                <View className="w-full bg-gray-200 rounded-full h-3">
                  <View
                    className="bg-orange-500 h-3 rounded-full transition-all"
                    style={{ width: `${diagnosisResult.probability}%` }}
                  />
                </View>
                <Text className="block text-sm text-orange-600 mt-1">
                  {diagnosisResult.probability}%
                </Text>
              </View>

              <View className="bg-orange-50 rounded-xl p-4 mb-4">
                <Text className="block text-sm text-gray-700 leading-relaxed">
                  {diagnosisResult.description}
                </Text>
              </View>
            </View>

            {/* 治疗方案 */}
            <View className="bg-white rounded-2xl shadow-lg p-6 mb-4">
              <Text className="block text-lg font-bold text-gray-800 mb-4">治疗方案</Text>
              {diagnosisResult.treatment.map((item, index) => (
                <View key={index} className="flex items-start gap-3 mb-3">
                  <View className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Text className="text-white text-xs font-bold">{index + 1}</Text>
                  </View>
                  <Text className="flex-1 text-base text-gray-700 leading-relaxed">
                    {item}
                  </Text>
                </View>
              ))}
            </View>

            {/* 重新诊断按钮 */}
            <Button
              className="w-full bg-blue-500 text-white rounded-xl py-3 text-base font-semibold shadow-md"
              onClick={resetDiagnosis}
            >
              重新诊断
            </Button>
          </View>
        )}
      </ScrollView>
    </View>
  )
}

export default DiagnosisPage
