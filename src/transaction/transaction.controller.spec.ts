import { CacheModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisClientOptions } from 'redis';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PaymentOption } from './util/PayamentOption.enum';

import * as redisStore from 'cache-manager-redis-store';
describe('TransactionController', () => {
  let transactionController: TransactionController;
  let transactionService: TransactionService;
  const transactionDto: CreateTransactionDto = {
    clientId: '123Abc',
    amount: 2012,
    paymentOption: PaymentOption.CREDIT_CARD,
    cardNumber: '4350',
    cardHolderName: 'Mario',
    cardExpiration: '10/21',
    cardVerificationCode: 423,
    transactionDescription: 'descricao',
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        CacheModule.register<RedisClientOptions>({
          store: redisStore,
          url: process.env.REDIS_URL,
        }),
      ],
      controllers: [TransactionController],

      providers: [
        {
          provide: TransactionService,
          useValue: {
            create: jest
              .fn()
              .mockImplementation(
                (createTransactionDto: CreateTransactionDto) => {
                  Promise.resolve({ id: '2', ...createTransactionDto });
                },
              ),
          },
        },
      ],
    }).compile();

    transactionController = module.get<TransactionController>(
      TransactionController,
    );
    transactionService = module.get<TransactionService>(TransactionService);
  });

  it('should be defined', () => {
    expect(transactionController).toBeDefined();
  });
  describe('createTransaction()', () => {
    it('Should execute the transactionService.create() method ', () => {
      transactionController.createTransaction(transactionDto);
      expect(transactionService.create).toHaveBeenCalledWith(transactionDto);
    });
  });
});
