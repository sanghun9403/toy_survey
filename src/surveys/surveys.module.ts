import { Module } from '@nestjs/common';
import { SurveysResolver } from './surveys.resolver';
import { SurveysService } from './surveys.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from 'src/_common/entities/survey.entity';
import { Question } from 'src/_common/entities/question.entity';
import { Answer } from 'src/_common/entities/answer.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { AnswersService } from 'src/answers/answers.service';

@Module({
  imports: [TypeOrmModule.forFeature([Survey, Question, Answer])],
  providers: [
    SurveysResolver,
    SurveysService,
    QuestionsService,
    AnswersService,
  ],
})
export class SurveysModule {}
