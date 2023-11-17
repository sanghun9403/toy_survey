import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { Response } from './response.entity';

@Entity('surveys')
@ObjectType()
export class Survey {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  title: string;

  @Column()
  @Field()
  description: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @OneToMany(() => Question, (question) => question.survey, {
    cascade: true,
  })
  @Field(() => [Question])
  questions: Question[];

  @OneToMany(() => Response, (response) => response.survey, {
    cascade: true,
  })
  @Field(() => [Response])
  responses: Response[];
}
