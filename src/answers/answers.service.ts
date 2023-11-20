import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ApolloError } from 'apollo-server-express';
import {
  CreateAnswerInput,
  UpdateAnswerInput,
} from 'src/_common/dtos/answer.dto';
import { Answer } from 'src/_common/entities/answer.entity';
import { QuestionsService } from 'src/questions/questions.service';
import { EntityManager, Repository } from 'typeorm';

@Injectable()
export class AnswersService {
  constructor(
    @InjectRepository(Answer)
    private readonly answerRepository: Repository<Answer>,
    private readonly questionService: QuestionsService,
  ) {}

  // 선택지 생성
  async createAnswer(
    entityManager: EntityManager,
    createAnswerInput: CreateAnswerInput,
  ): Promise<Answer> {
    const { content, questionId, score } = createAnswerInput;
    const answer = this.answerRepository.create({
      content,
      score,
      question: { id: questionId },
    });

    return entityManager.save(answer);
  }

  // 질문지ID별 선택지 조회
  async getAnswersByQuestionId(questionId: number): Promise<Answer[]> {
    const question = await this.questionService.getQuestionById(questionId);

    if (!question)
      throw new ApolloError(
        '해당 질문지를 찾을 수 없습니다',
        'QUESTION_NOT_FOUND',
      );

    const answers = await this.answerRepository.find({
      where: { question: { id: questionId } },
      relations: ['question'],
    });

    return answers;
  }

  // 선택지ID별 조회
  async getAnswerById(answerId: number): Promise<Answer> {
    const answer = await this.answerRepository.findOne({
      where: { id: answerId },
    });

    if (!answer)
      throw new ApolloError(
        '해당 선택지를 찾을 수 없습니다.',
        'ANSWER_NOT_FOUND',
      );

    return answer;
  }

  // 선택지 업데이트
  async updateAnswer(updateAnswerInput: UpdateAnswerInput): Promise<Answer> {
    try {
      const { content, score, id } = updateAnswerInput;

      const answer = await this.answerRepository.findOne({
        where: { id },
        relations: ['question'],
      });

      if (!answer) {
        throw new ApolloError(
          '해당 선택지를 찾을 수 없습니다',
          'ANSWER_NOT_FOUND',
        );
      }

      answer.content = content || answer.content;
      answer.score = score || answer.score;

      return this.answerRepository.save(answer);
    } catch (err) {
      throw new ApolloError(err.message, 'ANSWER_UPDATE_ERROR');
    }
  }

  // 선택지 삭제
  async deleteAnswer(answerId: number): Promise<boolean> {
    try {
      const result = await this.answerRepository.delete(answerId);

      return result.affected > 0;
    } catch (err) {
      throw new ApolloError(err.message, 'ANSWER_DELETE_ERROR');
    }
  }
}
