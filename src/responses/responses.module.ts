import { Module } from '@nestjs/common';
import { ResponsesResolver } from './responses.resolver';
import { ResponsesService } from './responses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SurveysService } from 'src/surveys/surveys.service';
import { AnswersService } from 'src/answers/answers.service';
import { Survey } from 'src/_common/entities/survey.entity';
import { Answer } from 'src/_common/entities/answer.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { Question } from 'src/_common/entities/question.entity';
import { Response } from 'src/_common/entities/response.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response, Survey, Answer, Question])],
  providers: [
    ResponsesResolver,
    ResponsesService,
    SurveysService,
    AnswersService,
    QuestionsService,
  ],
})
export class ResponsesModule {}
