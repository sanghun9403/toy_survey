import { InputType, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { AnswerInput } from './answer.dto';

@InputType()
export class CreateSurveyInput {
  @Field()
  @IsNotEmpty({ message: '설문지 제목을 입력해주세요.' })
  title: string;

  @Field()
  @IsNotEmpty({ message: '설문지 개요를 입력해주세요.' })
  description: string;
}

@InputType()
export class UpdateSurveyInput {
  @Field()
  id: number;

  @Field()
  @IsNotEmpty({ message: '설문지 제목을 입력해주세요.' })
  title: string;

  @Field()
  @IsNotEmpty({ message: '설문지 개요를 입력해주세요.' })
  description: string;
}

@InputType()
export class CreateSurveyWith {
  @Field(() => CreateSurveyInput)
  createSurveyInput: CreateSurveyInput;

  @Field(() => [String])
  questionContents: string[];

  @Field(() => [[AnswerInput]])
  answerContents: AnswerInput[][];

  @Field({ nullable: true })
  isMultipleChoice: boolean;
}
