import { Module } from '@nestjs/common';
import { AnswersResolver } from './answers.resolver';
import { AnswersService } from './answers.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/_common/entities/answer.entity';
import { Question } from 'src/_common/entities/question.entity';
import { ResponseDetail } from 'src/_common/entities/response-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Answer])],
  providers: [AnswersResolver, AnswersService],
})
export class AnswersModule {}
