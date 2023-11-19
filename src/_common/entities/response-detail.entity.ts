import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Response } from './response.entity';
import { Question } from './question.entity';
import { Answer } from './answer.entity';

@Entity('responseDetails')
@ObjectType()
export class ResponseDetail {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @Column()
  @Field(() => Int)
  totalScore: number;

  @ManyToOne(() => Response, (response) => response.responseDetails, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @Field(() => Response, { nullable: false })
  response: Response;

  @ManyToOne(() => Question, (question) => question.responseDetails)
  @Field(() => Question)
  question: Question;

  @ManyToOne(() => Answer, (answer) => answer.responseDetails)
  @Field(() => Answer)
  answer: Answer;
}
