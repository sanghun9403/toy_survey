import { Args, Query, Resolver } from '@nestjs/graphql';
import { ResponseDetail } from 'src/_common/entities/response-detail.entity';
import { ResponseDetailsService } from './response-details.service';

@Resolver(() => ResponseDetail)
export class ResponseDetailsResolver {
  constructor(private readonly responseDetailService: ResponseDetailsService) {}

  @Query(() => ResponseDetail)
  async getDetailByResponseId(
    @Args('responseId') responseId: number,
  ): Promise<ResponseDetail> {
    return this.responseDetailService.getDetailByResponseId(responseId);
  }
}
