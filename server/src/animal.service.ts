import { Injectable } from '@nestjs/common'

export interface Animal {
  id: string
  name: string
  type: 'horse' | 'donkey'
  age: number
  healthStatus: 'healthy' | 'sick' | 'recovering'
  photo?: string
  createdAt: Date
  updatedAt: Date
}

export interface DiagnosisRecord {
  id: string
  animalId: string
  animalName: string
  animalType: 'horse' | 'donkey'
  symptoms: string[]
  disease: string
  probability: number
  urgency: 'low' | 'medium' | 'high'
  description: string
  treatment: string[]
  createdAt: Date
}

@Injectable()
export class AnimalService {
  private animals: Map<string, Animal> = new Map()
  private diagnosisHistory: DiagnosisRecord[] = []

  constructor() {
    // 初始化一些示例数据
    const initialAnimals: Animal[] = [
      {
        id: '1',
        name: '小红马',
        type: 'horse',
        age: 5,
        healthStatus: 'healthy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '2',
        name: '大白马',
        type: 'horse',
        age: 8,
        healthStatus: 'healthy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '3',
        name: '小灰驴',
        type: 'donkey',
        age: 4,
        healthStatus: 'healthy',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id: '4',
        name: '老黑驴',
        type: 'donkey',
        age: 10,
        healthStatus: 'sick',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]

    initialAnimals.forEach(animal => this.animals.set(animal.id, animal))
  }

  // 获取动物列表
  getAnimals(type?: 'horse' | 'donkey'): Animal[] {
    const allAnimals = Array.from(this.animals.values())
    if (type) {
      return allAnimals.filter(animal => animal.type === type)
    }
    return allAnimals
  }

  // 获取单个动物
  getAnimalById(id: string): Animal | null {
    return this.animals.get(id) || null
  }

  // 添加动物
  addAnimal(animalData: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>): Animal {
    const id = Date.now().toString()
    const now = new Date()
    const animal: Animal = {
      ...animalData,
      id,
      createdAt: now,
      updatedAt: now
    }
    this.animals.set(id, animal)
    return animal
  }

  // 更新动物健康状态
  updateAnimalHealthStatus(id: string, healthStatus: 'healthy' | 'sick' | 'recovering'): Animal | null {
    const animal = this.animals.get(id)
    if (!animal) return null

    animal.healthStatus = healthStatus
    animal.updatedAt = new Date()
    this.animals.set(id, animal)
    return animal
  }

  // 诊断疾病
  diagnose(symptoms: string[]): DiagnosisRecord {
    const urgency = this.calculateUrgency(symptoms)
    const { disease, probability, description, treatment } = this.analyzeSymptoms(symptoms)

    const record: DiagnosisRecord = {
      id: Date.now().toString(),
      animalId: '',
      animalName: '',
      animalType: 'horse',
      symptoms,
      disease,
      probability,
      urgency,
      description,
      treatment,
      createdAt: new Date()
    }

    this.diagnosisHistory.unshift(record)
    return record
  }

  // 获取诊断历史
  getDiagnosisHistory(limit: number = 10): DiagnosisRecord[] {
    return this.diagnosisHistory.slice(0, limit)
  }

  // 计算紧急程度
  private calculateUrgency(symptoms: string[]): 'low' | 'medium' | 'high' {
    const severeSymptoms = ['发热', '呼吸困难', '呕吐']
    const moderateSymptoms = ['腹泻', '咳嗽', '跛行']

    const hasSevere = symptoms.some(s => severeSymptoms.includes(s))
    const hasModerate = symptoms.some(s => moderateSymptoms.includes(s))

    if (hasSevere) return 'high'
    if (hasModerate) return 'high'
    if (symptoms.length >= 3) return 'medium'
    return 'low'
  }

  // 分析症状（简化版）
  private analyzeSymptoms(symptoms: string[]): {
    disease: string
    probability: number
    urgency: 'low' | 'medium' | 'high'
    description: string
    treatment: string[]
  } {
    // 简化的症状分析逻辑
    if (symptoms.includes('呼吸困难') || symptoms.includes('咳嗽')) {
      return {
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
      }
    }

    if (symptoms.includes('腹泻') || symptoms.includes('呕吐')) {
      return {
        disease: '消化系统疾病',
        probability: 80,
        urgency: 'high',
        description: '可能存在消化系统感染或肠胃不适，需要调整饮食和治疗。',
        treatment: [
          '暂停喂食 12-24 小时',
          '提供充足清水',
          '喂食易消化的饲料',
          '必要时使用止泻药',
          '观察体温和精神状态'
        ]
      }
    }

    if (symptoms.includes('跛行')) {
      return {
        disease: '肌肉骨骼损伤',
        probability: 75,
        urgency: 'medium',
        description: '可能存在腿部肌肉或骨骼损伤，需要限制活动并进行治疗。',
        treatment: [
          '限制动物活动，减少负重',
          '检查受伤部位是否有外伤',
          '冷敷受伤部位，减少肿胀',
          '必要时使用消炎镇痛药物',
          '严重情况需联系兽医'
        ]
      }
    }

    return {
      disease: '一般性疾病',
      probability: 60,
      urgency: 'low',
      description: '根据症状分析，可能存在轻微健康问题，建议密切观察。',
      treatment: [
        '密切观察动物状态',
        '保持良好环境卫生',
        '提供充足营养和饮水',
        '定期测量体温',
        '症状加重时及时就医'
      ]
    }
  }
}
