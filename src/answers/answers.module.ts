import { Module } from '@nestjs/common';
import { AnswersResolver } from './answers.resolver';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/_common/entities/answer.entity';
import { Question } from 'src/_common/entities/question.entity';
import { ResponseDetail } from 'src/_common/entities/response-detail.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { SurveysService } from 'src/surveys/surveys.service';
import { Survey } from 'src/_common/entities/survey.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Question, Survey])],
  providers: [
    AnswersResolver,
    AnswersService,
    QuestionsService,
    SurveysService,
  ],
})
export class AnswersModule {}
