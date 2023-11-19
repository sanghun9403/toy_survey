import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import { AnswerInput } from 'src/_common/dtos/answer.dto';
import {
  CreateSurveyInput,
  UpdateSurveyInput,
} from 'src/_common/dtos/survey.dto';
import { Survey } from 'src/_common/entities/survey.entity';
import { AnswersService } from 'src/answers/answers.service';
import { QuestionsService } from 'src/questions/questions.service';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class SurveysService {
  constructor(
    @InjectRepository(Survey)
    private readonly surveyRepository: Repository<Survey>,
    private readonly questionService: QuestionsService,
    private readonly answerService: AnswersService,
  ) {}

  // 설문지 생성
  async createSurvey(
    createSurveyInput: CreateSurveyInput,
    questionContents: string[],
    answerContents: AnswerInput[][],
    isMultipleChoice: boolean,
  ): Promise<Survey> {
    return this.surveyRepository.manager.transaction(
      async (transactionEntityManager: EntityManager) => {
        // 설문지 생성
        const survey = this.surveyRepository.create(createSurveyInput);
        const createdSurvey = await transactionEntityManager.save(survey);

        // 질문 및 선택지 생성
        const questions = await Promise.all(
          questionContents.map(async (questionContent, idx) => {
            const createdQuestion = await this.questionService.createQuestion(
              transactionEntityManager,
              {
                content: questionContent,
                surveyId: createdSurvey.id,
                isMultipleChoice,
              },
            );

            const answers = await Promise.all(
              answerContents[idx].map(async (answerContent) => {
                return this.answerService.createAnswer(
                  transactionEntityManager,
                  {
                    content: answerContent.content,
                    questionId: createdQuestion.id,
                    score: answerContent.score,
                  },
                );
              }),
            );

            createdQuestion.answers = answers;
            return createdQuestion;
          }),
        );

        createdSurvey.questions = questions;
        return createdSurvey;
      },
    );
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
      relations: ['questions', 'questions.answers'],
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
