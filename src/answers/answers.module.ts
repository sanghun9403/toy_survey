import { Module } from '@nestjs/common';
import { AnswersResolver } from './answers.resolver';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/_common/entities/answer.entity';
import { Question } from 'src/_common/entities/question.entity';
import { QuestionsService } from 'src/questions/questions.service';

@Module({
  imports: [TypeOrmModule.forFeature([Answer, Question])],
  providers: [AnswersResolver, AnswersService, QuestionsService],
})
export class AnswersModule {}
