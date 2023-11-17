import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { Survey } from '../entities/survey.entity';
import { Question } from '../entities/question.entity';
import { Answer } from '../entities/answer.entity';
import { Response } from '../entities/response.entity';
import { ResponseDetail } from '../entities/response-detail.entity';

function ormConfig(): TypeOrmModuleOptions {
  const commonConf = {
    SYNCRONIZE: true,
    ENTITIES: [Survey, Question, Answer, Response, ResponseDetail],
  };

  const ormconfig: TypeOrmModuleOptions = {
    type: 'postgres',
    database: process.env.PG_DATABASE,
    host: process.env.PG_HOST,
    port: Number(process.env.PG_PORT),
    username: process.env.PG_USERNAME,
    password: process.env.PG_PASSWORD,
    logging: true,
    synchronize: commonConf.SYNCRONIZE,
    entities: commonConf.ENTITIES,
    namingStrategy: new SnakeNamingStrategy(),
  };

  return ormconfig;
}

export { ormConfig };
