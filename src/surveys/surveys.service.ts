import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import {
  CreateSurveyInput,
  UpdateSurveyInput,
} from 'src/_common/dtos/survey.dto';
import { Survey } from 'src/_common/entities/survey.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
  ) {}

  // 설문지 생성
  async createSurvey(createSurveyInput: CreateSurveyInput): Promise<Survey> {
    const survey = this.surveyRepository.create(createSurveyInput);

    return this.surveyRepository.save(survey);
  }

  // 설문지 전체 조회
  async getAllSurveys(): Promise<Survey[]> {
    const surveys = await this.surveyRepository.find();
    return surveys;
  }

  // 설문지 ID별 조회
  async getSurveyById(surveyId: number): Promise<Survey> {
    const survey = await this.surveyRepository.findOne({
      where: { id: surveyId },
    });

    if (!survey)
      throw new ApolloError(
        '해당 설문지를 찾을 수 없습니다.',
        'SURVEY_NOT_FOUND',
      );

    return survey;
  }

  // 설문지 업데이트
  async updateSurvey(updateSurveyInput: UpdateSurveyInput): Promise<Survey> {
    try {
      const survey = await this.surveyRepository.findOne({
        where: { id: updateSurveyInput.id },
      });

      if (!survey)
        throw new ApolloError(
          '해당 설문지를 찾을 수 없습니다.',
          'SURVEY_NOT_FOUND',
        );

      survey.title = updateSurveyInput.title || survey.title;
      survey.description = updateSurveyInput.description || survey.description;

      return this.surveyRepository.save(survey);
    } catch (err) {
      throw new ApolloError(err.message, 'SURVEY_UPDATE_ERROR');
    }
  }

  // 설문지 삭제
  async deleteSurvey(surveyId: number): Promise<boolean> {
    try {
      const result = await this.surveyRepository.delete(surveyId);

      if (!result)
        throw new ApolloError(
          '해당 설문지를 찾을 수 없습니다.',
          'SURVEY_NOT_FOUND',
        );

      return result.affected > 0;
    } catch (err) {
      throw new ApolloError(err.message, 'SURVEY_DELETE_ERROR');
    }
  }
}
