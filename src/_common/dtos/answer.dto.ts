import { InputType, Field, Float, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAnswerInput {
  @Field()
  @IsNotEmpty({ message: '답변 내용을 입력해주세요.' })
  content: string;

  @Field(() => Int)
  questionId: number;

  @Field(() => Int)
  score: number;
}

@InputType()
export class UpdateAnswerInput {
  @Field(() => Int)
  id: number;

  @Field()
  @IsNotEmpty({ message: '답변 내용을 입력해주세요.' })
  content: string;

  @Field(() => Int)
  score: number;
}

@InputType()
export class AnswerInput {
  @Field()
  content: string;

  @Field(() => Int)
  score: number;
}
