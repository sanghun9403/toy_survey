import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateResponseInput {
  @Field()
  surveyId: number;

  @Field()
  answerIds: number[];
}
