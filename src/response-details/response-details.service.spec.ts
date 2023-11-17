import { Test, TestingModule } from '@nestjs/testing';
import { ResponseDetailsService } from './response-details.service';

describe('ResponseDetailsService', () => {
  let service: ResponseDetailsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ResponseDetailsService],
    }).compile();

    service = module.get<ResponseDetailsService>(ResponseDetailsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
