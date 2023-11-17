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
import { Survey } from './survey.entity';
import { Answer } from './answer.entity';
import { ResponseDetail } from './response-detail.entity';

@Entity('questions')
@ObjectType()
export class Question {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field()
  questionText: string;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => Survey, (survey) => survey.questions, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @Field(() => Survey, { nullable: false })
  survey: Survey;

  @OneToMany(() => Answer, (answer) => answer.question, {
    cascade: true,
  })
  @Field(() => [Answer])
  answers: Answer[];

  @OneToMany(() => ResponseDetail, (responseDetail) => responseDetail.question)
  @Field(() => [ResponseDetail])
  responseDetails: ResponseDetail[];
}
