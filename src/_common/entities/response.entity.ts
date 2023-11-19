import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Survey } from './survey.entity';
import { ResponseDetail } from './response-detail.entity';
import { Answer } from './answer.entity';

@Entity('responses')
@ObjectType()
export class Response {
  @PrimaryGeneratedColumn()
  @Field(() => Int)
  id: number;

  @CreateDateColumn()
  @Field(() => Date)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => Date)
  updatedAt: Date;

  @ManyToOne(() => Survey, (survey) => survey.responses, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  @Field(() => Survey, { nullable: false })
  survey: Survey;

  @OneToMany(
    () => ResponseDetail,
    (responseDetails) => responseDetails.response,
    {
      cascade: true,
    },
  )
  @Field(() => [ResponseDetail])
  responseDetails: ResponseDetail[];

  @OneToMany(() => Answer, (answers) => answers.response)
  @Field(() => [Answer])
  answers: Answer[];
}
