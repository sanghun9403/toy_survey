import { Module } from '@nestjs/common';
import { ResponseDetailsResolver } from './response-details.resolver';
import { ResponseDetailsService } from './response-details.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResponseDetail } from 'src/_common/entities/response-detail.entity';
import { Response } from 'src/_common/entities/response.entity';
import { Question } from 'src/_common/entities/question.entity';
import { Answer } from 'src/_common/entities/answer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ResponseDetail])],
  providers: [ResponseDetailsResolver, ResponseDetailsService],
})
export class ResponseDetailsModule {}
