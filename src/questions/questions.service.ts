import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import {
  CreateQuestionInput,
  UpdateQuestionInput,
} from 'src/_common/dtos/quetion.dto';
import { Question } from 'src/_common/entities/question.entity';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectRepository(Question)
    private readonly questionRepository: Repository<Question>,
  ) {}

  // 질문지 생성
  async createQuestion(
    entityManager: EntityManager,
    createQuestionInput: CreateQuestionInput,
  ): Promise<Question> {
    const { content, surveyId, isMultipleChoice } = createQuestionInput;

    const question = this.questionRepository.create({
      content,
      survey: { id: surveyId },
      isMultipleChoice,
      answers: [],
    });

    return entityManager.save(question);
  }

  // 설문지 ID별 질문지 조회
  async getQuestionBySurveyId(surveyId: number): Promise<Question[]> {
    const survey = await this.questionRepository.findOne({
      where: { survey: { id: surveyId } },
    });

    if (!survey)
      throw new ApolloError(
        '해당 설문지를 찾을 수 없습니다',
        'SURVEY_NOT_FOUND',
      );

    const questions = await this.questionRepository.find({
      where: { survey: { id: surveyId } },
    });

    return questions;
  }

  // 질문지 ID별 조회
  async getQuestionById(questionId: number): Promise<Question> {
    const question = await this.questionRepository.findOne({
      where: { id: questionId },
    });

    if (!question)
      throw new ApolloError(
        '해당 질문지를 찾을 수 없습니다',
        'QUESTION_NOT_FOUND',
      );

    return question;
  }

  // 질문지 업데이트
  async updateQuestion(
    updateQuestionInput: UpdateQuestionInput,
  ): Promise<Question> {
    try {
      const { content, id, isMultipleChoice } = updateQuestionInput;

      const question = await this.questionRepository.findOne({ where: { id } });

      if (!question)
        throw new ApolloError(
          '해당 질문지를 찾을 수 없습니다',
          'QUESTION_NOT_FOUND',
        );

      question.content = content || question.content;
      question.isMultipleChoice = isMultipleChoice || question.isMultipleChoice;

      return await this.questionRepository.save(question);
    } catch (err) {
      throw new ApolloError(err.message, 'QUESTION_UPDATE_ERROR');
    }
  }

  // 질문지 삭제
  async deleteQuestion(questionId: number): Promise<boolean> {
    try {
      const result = await this.questionRepository.delete(questionId);

      return result.affected > 0;
    } catch (err) {
      throw new ApolloError(err.message, 'QUESTION_DELETE_ERROR');
    }
  }
}
