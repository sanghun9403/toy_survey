import { Test, TestingModule } from '@nestjs/testing';
import { SurveysResolver } from './surveys.resolver';

describe('SurveysResolver', () => {
  let resolver: SurveysResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SurveysResolver],
    }).compile();

    resolver = module.get<SurveysResolver>(SurveysResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
