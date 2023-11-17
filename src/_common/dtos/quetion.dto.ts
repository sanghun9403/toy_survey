import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field()
  @IsNotEmpty({ message: '질문 내용을 입력해주세요.' })
  content: string;

  @Field()
  surveyId: number;
}

@InputType()
export class UpdateQuestionInput {
  @Field()
  id: number;

  @Field()
  @IsNotEmpty({ message: '질문 내용을 입력해주세요.' })
  content: string;
}
