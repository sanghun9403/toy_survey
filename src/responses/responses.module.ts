import { Module } from '@nestjs/common';
import { ResponsesResolver } from './responses.resolver';
import { ResponsesService } from './responses.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Survey } from 'src/_common/entities/survey.entity';
import { ResponseDetail } from 'src/_common/entities/response-detail.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Response])],
  providers: [ResponsesResolver, ResponsesService],
})
export class ResponsesModule {}
