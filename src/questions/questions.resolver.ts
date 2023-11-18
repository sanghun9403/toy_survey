import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Question } from 'src/_common/entities/question.entity';
import { QuestionsService } from './questions.service';
import {
  CreateQuestionInput,
  UpdateQuestionInput,
} from 'src/_common/dtos/quetion.dto';
import { EntityManager } from 'typeorm';

@Resolver(() => Question)
export class QuestionsResolver {
  constructor(private readonly questionService: QuestionsService) {}

  @Mutation(() => Question)
  async createQuestion(
    @Args('createQuestionInput') createQuestionInput: CreateQuestionInput,
    @Context('transactionalEntityManager')
    transactionalEntityManager: EntityManager,
  ): Promise<Question> {
    return this.questionService.createQuestion(
      transactionalEntityManager,
      createQuestionInput,
    );
  }

  @Query(() => [Question])
  async getQuestionsBySurveyId(
    @Args('surveyId') surveyId: number,
  ): Promise<Question[]> {
    return this.questionService.getQuestionBySurveyId(surveyId);
  }

  @Mutation(() => Question)
  async updateQuestion(
    @Args('updateQuestionInput') updateQuestionInput: UpdateQuestionInput,
  ): Promise<Question> {
    return this.questionService.updateQuestion(updateQuestionInput);
  }

  @Mutation(() => Boolean)
  async deleteQuestion(
    @Args('questionId') questionId: number,
  ): Promise<boolean> {
    return this.questionService.deleteQuestion(questionId);
  }
}
