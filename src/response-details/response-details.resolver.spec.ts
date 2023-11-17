import { Test, TestingModule } from '@nestjs/testing';
import { ResponseDetailsResolver } from './response-details.resolver';

describe('ResponseDetailsResolver', () => {
  let resolver: ResponseDetailsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseDetailsResolver],
    }).compile();

    resolver = module.get<ResponseDetailsResolver>(ResponseDetailsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
