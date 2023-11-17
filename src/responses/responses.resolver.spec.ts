import { Test, TestingModule } from '@nestjs/testing';
import { ResponsesResolver } from './responses.resolver';

describe('ResponsesResolver', () => {
  let resolver: ResponsesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponsesResolver],
    }).compile();

    resolver = module.get<ResponsesResolver>(ResponsesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
