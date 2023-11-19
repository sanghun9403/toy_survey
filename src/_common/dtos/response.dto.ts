import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CreateResponseInput {
  @Field(() => Int)
  surveyId: number;

  @Field(() => [Int])
  answerIds: number[];
}

@InputType()
export class UpdateResponseInput {
  @Field()
  id: number;

  @Field(() => [Int])
  answerIds: number[];
}
