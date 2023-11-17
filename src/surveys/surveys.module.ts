import { Module } from '@nestjs/common';
import { SurveysResolver } from './surveys.resolver';
import { SurveysService } from './surveys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from 'src/_common/entities/survey.entity';
import { Question } from 'src/_common/entities/question.entity';
import { Response } from 'src/_common/entities/response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Survey])],
  providers: [SurveysResolver, SurveysService],
})
export class SurveysModule {}
