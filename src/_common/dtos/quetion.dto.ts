import { InputType, Field, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateQuestionInput {
  @Field()
  @IsNotEmpty({ message: '질문 내용을 입력해주세요.' })
  content: string;

  @Field(() => Int)
  surveyId: number;

  @Field(() => Boolean)
  isMultipleChoice: boolean;
}

@InputType()
export class UpdateQuestionInput {
  @Field(() => Int)
  id: number;

  @Field()
  @IsNotEmpty({ message: '질문 내용을 입력해주세요.' })
  content: string;

  @Field(() => Boolean)
  isMultipleChoice: boolean;
}
