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
import { ResponseDetail } from 'src/_common/entities/response-detail.entity';
import { ResponseDetailsService } from 'src/response-details/response-details.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Response,
      Survey,
      Answer,
      Question,
      ResponseDetail,
    ]),
  ],
  providers: [
    ResponsesResolver,
    ResponsesService,
    SurveysService,
    AnswersService,
    QuestionsService,
    ResponseDetailsService,
  ],
})
export class ResponsesModule {}
