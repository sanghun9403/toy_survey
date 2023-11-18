import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Answer } from 'src/_common/entities/answer.entity';
import { AnswersService } from './answers.service';
import { CreateAnswerInput, UpdateAnswerInput } from 'src/_common/dtos/answer.dto';

@Resolver(() => Answer)
export class AnswersResolver {
  constructor(private readonly answerService : AnswersService) {}

  @Mutation(() => Answer)
  async createAnswer(@Args('createAnswerInput') createAnswerInput : CreateAnswerInput): Promise<Answer> {
    return this.answerService.createAnswer(createAnswerInput)
  }

  @Query(() => [Answer])
  async getAnswerByQuestionId(@Args('questionId') questionId : number) : Promise<Answer[]> {
    return this.answerService.getAnswersByQuestionId(questionId)
  }

  @Mutation(() => Answer)
  async updateAnswer(@Args('updateAnswerInput') updateAnswerInput :UpdateAnswerInput) :Promise<Answer> {
    return this.answerService.updateAnswer(updateAnswerInput)
  }

  @Mutation(() => Boolean)
  async deleteAnswer(@Args('answerId') answerId: number) : Promise<Boolean> {
    return this.answerService.deleteAnswer(answerId)
  }
}
