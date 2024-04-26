import { Test, TestingModule } from '@nestjs/testing';
import { GlobalErrorHandlerService } from './global-error-handler.service';

describe('GlobalErrorHandlerService', () => {
  let service: GlobalErrorHandlerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlobalErrorHandlerService],
    }).compile();

    service = module.get<GlobalErrorHandlerService>(GlobalErrorHandlerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
