import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateAnswerInput {
  @Field()
  @IsNotEmpty({ message: '답변 내용을 입력해주세요.' })
  content: string;

  @Field()
  questionId: number;
}

@InputType()
export class UpdateAnswerInput {
  @Field()
  id: number;

  @Field()
  @IsNotEmpty({ message: '답변 내용을 입력해주세요.' })
  content: string;
}
