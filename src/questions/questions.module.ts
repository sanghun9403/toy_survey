import { Module } from '@nestjs/common';
import { QuestionsResolver } from './questions.resolver';
import { QuestionsService } from './questions.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Question } from 'src/_common/entities/question.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Question])],
  providers: [QuestionsResolver, QuestionsService],
})
export class QuestionsModule {}
