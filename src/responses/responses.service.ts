import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateResponseInput } from 'src/_common/dtos/response.dto';
import { Response } from 'src/_common/entities/response.entity';
import { AnswersService } from 'src/answers/answers.service';
import { SurveysService } from 'src/surveys/surveys.service';
import { Repository } from 'typeorm';

@Injectable()
export class ResponsesService {
  constructor(
    @InjectRepository(Response)
    private readonly responseRepositry: Repository<Response>,
    private readonly surveyService: SurveysService,
    private readonly answerService: AnswersService,
  ) {}

  // async createResponse(input: CreateResponseInput): Promise<Response> {
  //   const { surveyId, answerIds } = input;

  //   const survey = await this.surveyService.getSurveyById(surveyId);

  //   const response = new Response()
  //   response.survey = survey
  //   response.answers = []
  // }
}
