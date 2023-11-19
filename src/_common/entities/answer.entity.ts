import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Question } from './question.entity';
import { ResponseDetail } from './response-detail.entity';
import { Response } from './response.entity';

@Entity('answers')
@ObjectType()
export class Answer {
  @PrimaryGeneratedColumn({ type: 'int' })
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  content: string;

  @Column({ type: 'int' })
  @Field(() => Int)
  score: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => Question, (question) => question.answers, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @Field(() => Question, { nullable: false })
  question: Question;

  @ManyToOne(() => Response, (response) => response.answers)
  @Field(() => Response)
  response: Response;

  @OneToMany(() => ResponseDetail, (responseDetail) => responseDetail.answers)
  @Field(() => [ResponseDetail])
  responseDetail: ResponseDetail;
}
