import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { SurveysService } from './surveys.service';
import { Survey } from 'src/_common/entities/survey.entity';
import {
  CreateSurveyWith,
  UpdateSurveyInput,
} from 'src/_common/dtos/survey.dto';

@Resolver(() => Survey)
export class SurveysResolver {
  constructor(private readonly surveyService: SurveysService) {}

  @Mutation(() => Survey)
  async createSurvey(@Args('input') input: CreateSurveyWith): Promise<Survey> {
    return this.surveyService.createSurvey(
      input.createSurveyInput,
      input.questionContents,
      input.answerContents,
      input.isMultipleChoice,
    );
  }

  @Query(() => [Survey])
  async getAllSurveys(): Promise<Survey[]> {
    return this.surveyService.getAllSurveys();
  }

  @Query(() => Survey)
  async getSurveyById(@Args('surveyId') surveyId: number): Promise<Survey> {
    return this.surveyService.getSurveyById(surveyId);
  }

  @Mutation(() => Survey)
  async updateSurvey(
    @Args('updateSurveyInput') updateSurveyInput: UpdateSurveyInput,
  ): Promise<Survey> {
    return await this.surveyService.updateSurvey(updateSurveyInput);
  }

  @Mutation(() => Boolean)
  async deleteSurvey(@Args('surveyId') surveyId: number): Promise<boolean> {
    return await this.surveyService.deleteSurvey(surveyId);
  }
}
