import { InputType, Field, Float } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAnswerInput {
  @Field()
  @IsNotEmpty({ message: '답변 내용을 입력해주세요.' })
  content: string;

  @Field()
  questionId: number;

  @Field()
  score: number;
}

@InputType()
export class UpdateAnswerInput {
  @Field()
  id: number;

  @Field()
  @IsNotEmpty({ message: '답변 내용을 입력해주세요.' })
  content: string;

  @Field()
  score: number;
}

@InputType()
export class AnswerInput {
  @Field()
  content: string;

  @Field(() => Float)
  score: number;
}
