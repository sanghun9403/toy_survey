import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Response } from 'src/_common/entities/response.entity';
import { ResponsesService } from './responses.service';
import {
  CreateResponseInput,
  UpdateResponseInput,
} from 'src/_common/dtos/response.dto';

@Resolver(() => Response)
export class ResponsesResolver {
  constructor(private readonly responseService: ResponsesService) {}

  @Mutation(() => Response)
  async createResponse(
    @Args('input') input: CreateResponseInput,
  ): Promise<Response> {
    return this.responseService.createResponse(input);
  }

  @Query(() => [Response])
  async getResponsesBySurveyId(
    @Args('surveyId') surveyId: number,
  ): Promise<Response[]> {
    return this.responseService.getResponsesBySurveyId(surveyId);
  }

  @Query(() => Response)
  async getResponseById(
    @Args('responseId') responseId: number,
  ): Promise<Response> {
    return this.responseService.getResponseById(responseId);
  }

  @Mutation(() => Response)
  async updateResponse(
    @Args('input') input: UpdateResponseInput,
  ): Promise<Response> {
    return this.responseService.updateResponse(input);
  }

  @Mutation(() => Boolean)
  async deleteResponse(
    @Args('responseId') responseId: number,
  ): Promise<boolean> {
    return await this.responseService.deleteResponse(responseId);
  }
}
