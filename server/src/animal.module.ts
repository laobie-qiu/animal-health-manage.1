import { Module } from '@nestjs/common'
import { AnimalController, DiagnosisController } from './animal.controller'
import { AnimalService } from './animal.service'

@Module({
  controllers: [AnimalController, DiagnosisController],
  providers: [AnimalService],
  exports: [AnimalService]
})
export class AnimalModule {}
