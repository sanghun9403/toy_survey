import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { ResponseDetail } from 'src/_common/entities/response-detail.entity';
import { Response } from 'src/_common/entities/response.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ResponseDetailsService {
  constructor(
    @InjectRepository(ResponseDetail)
    private readonly responseDetailRepository: Repository<ResponseDetail>,
  ) {}

  async createResponseDetail(response: Response): Promise<ResponseDetail> {
    const responseDetail = new ResponseDetail();
    responseDetail.response = response;

    responseDetail.totalScore = await this.caculateTotalScore(responseDetail);

    return this.responseDetailRepository.save(responseDetail);
  }

  async getDetailByResponseId(responseId: number): Promise<ResponseDetail> {
    const responseDetail = await this.responseDetailRepository.findOne({
      where: { response: { id: responseId } },
      relations: ['question', 'answers'],
    });

    if (!responseDetail)
      throw new ApolloError(
        '해당 응답지를 찾을 수 없습니다.',
        'RESPONSE_NOT_FOUND',
      );

    return responseDetail;
  }

  async caculateTotalScore(responseDetail: ResponseDetail): Promise<number> {
    return responseDetail.response.answers.reduce(
      (totalScore, answer) => totalScore + answer.score,
      0,
    );
  }
}
