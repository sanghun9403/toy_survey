import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import {
  CreateResponseInput,
  UpdateResponseInput,
} from 'src/_common/dtos/response.dto';
import { Response } from 'src/_common/entities/response.entity';
import { AnswersService } from 'src/answers/answers.service';
import { SurveysService } from 'src/surveys/surveys.service';
import { Repository } from 'typeorm';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private readonly responseRepository: Repository<Response>,
    private readonly surveyService: SurveysService,
    private readonly answerService: AnswersService,
  ) {}

  // 응답 생성
  async createResponse(input: CreateResponseInput): Promise<Response> {
    const { surveyId, answerIds } = input;

    const survey = await this.surveyService.getSurveyById(surveyId);

    const response = new Response();
    response.survey = survey;
    response.answers = [];
    response.totalScore = 0;

    for (const answerId of answerIds) {
      const answer = await this.answerService.getAnswerById(answerId);
      response.answers.push(answer);

      response.totalScore += answer.score;
    }

    return this.responseRepository.save(response);
  }

  // 설문지ID별 응답 조회
  async getResponsesBySurveyId(surveyId: number): Promise<Response[]> {
    const response = await this.responseRepository.find({
      where: { survey: { id: surveyId } },
      relations: ['survey', 'answers'],
    });

    if (!response)
      throw new ApolloError(
        '해당 설문지를 찾을 수 없습니다',
        'SURVEY_NOT_FOUND',
      );

    return response;
  }

  // 응답ID별 조회
  async getResponseById(responseId: number): Promise<Response> {
    const response = await this.responseRepository.findOne({
      where: { id: responseId },
      relations: ['answers'],
    });

    if (!response)
      throw new ApolloError(
        '해당 응답지를 찾을 수 없습니다.',
        'RESPONSE_NOT_FOUND',
      );

    return response;
  }

  // 응답 업데이트
  async updateResponse(input: UpdateResponseInput): Promise<Response> {
    try {
      const { id, answerIds } = input;

      const response = await this.responseRepository.findOne({
        where: { id },
        relations: ['survey', 'answers'],
      });

      if (!response)
        throw new ApolloError('해당 응답지가 없습니다.', 'RESPONSE_NOT_FOUND');

      response.answers = [];

      for (const answerId of answerIds) {
        const answer = await this.answerService.getAnswerById(answerId);
        response.answers.push(answer);
      }

      return this.responseRepository.save(response);
    } catch (err) {
      throw new ApolloError(err.message, 'RESPONSE_UPDATE_ERROR');
    }
  }

  // 응답 삭제
  async deleteResponse(responseId: number): Promise<boolean> {
    try {
      const result = await this.responseRepository.delete(responseId);

      return result.affected > 0;
    } catch (err) {
      throw new ApolloError(err.message, 'RESPONSE_DELETE_ERROR');
    }
  }
}
