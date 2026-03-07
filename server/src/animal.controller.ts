import { Controller, Get, Post, Body, Param, Query, HttpCode, HttpStatus } from '@nestjs/common'
import { AnimalService, Animal, DiagnosisRecord } from './animal.service'

@Controller('animals')
export class AnimalController {
  constructor(private readonly animalService: AnimalService) {}

  // 获取动物列表
  @Get()
  @HttpCode(HttpStatus.OK)
  async getAnimals(@Query('type') type?: 'horse' | 'donkey') {
    const animals = this.animalService.getAnimals(type)
    return {
      code: 200,
      msg: '获取成功',
      data: animals
    }
  }

  // 获取单个动物
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async getAnimalById(@Param('id') id: string) {
    const animal = this.animalService.getAnimalById(id)
    if (!animal) {
      return {
        code: 404,
        msg: '动物不存在',
        data: null
      }
    }
    return {
      code: 200,
      msg: '获取成功',
      data: animal
    }
  }

  // 添加动物
  @Post()
  @HttpCode(HttpStatus.OK)
  async addAnimal(@Body() animalData: Omit<Animal, 'id' | 'createdAt' | 'updatedAt'>) {
    const animal = this.animalService.addAnimal(animalData)
    return {
      code: 200,
      msg: '添加成功',
      data: animal
    }
  }

  // 更新动物健康状态
  @Post(':id/health')
  @HttpCode(HttpStatus.OK)
  async updateAnimalHealthStatus(
    @Param('id') id: string,
    @Body('healthStatus') healthStatus: 'healthy' | 'sick' | 'recovering'
  ) {
    const animal = this.animalService.updateAnimalHealthStatus(id, healthStatus)
    if (!animal) {
      return {
        code: 404,
        msg: '动物不存在',
        data: null
      }
    }
    return {
      code: 200,
      msg: '更新成功',
      data: animal
    }
  }
}

@Controller('diagnosis')
export class DiagnosisController {
  constructor(private readonly animalService: AnimalService) {}

  // 诊断疾病
  @Post()
  @HttpCode(HttpStatus.OK)
  async diagnose(@Body() body: { animalId?: string; symptoms: string[] }) {
    const result = this.animalService.diagnose(body.symptoms)

    // 如果提供了 animalId，更新诊断记录的动物信息
    if (body.animalId) {
      const animal = this.animalService.getAnimalById(body.animalId)
      if (animal) {
        result.animalId = animal.id
        result.animalName = animal.name
        result.animalType = animal.type

        // 更新动物健康状态
        this.animalService.updateAnimalHealthStatus(animal.id, 'sick')
      }
    }

    return {
      code: 200,
      msg: '诊断完成',
      data: result
    }
  }

  // 获取诊断历史
  @Get('history')
  @HttpCode(HttpStatus.OK)
  async getDiagnosisHistory(@Query('limit') limit?: string) {
    const limitNum = limit ? parseInt(limit) : 10
    const history = this.animalService.getDiagnosisHistory(limitNum)

    return {
      code: 200,
      msg: '获取成功',
      data: history
    }
  }
}
