import { CacheModule, CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { RedisClientOptions } from 'redis';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';
import { PaymentOption } from './util/PayamentOption.enum';

import * as redisStore from 'cache-manager-redis-store';
import { Transaction } from './entities/transaction.entity';
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
  const transaction = new Transaction(transactionDto);
  const transactions = [transaction, transaction, transaction];
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

            findById: jest.fn().mockImplementation((clientId) => {
              if (clientId == 0) {
                return Promise.resolve([]);
              } else if (clientId == '123Abc') {
                return Promise.resolve(transactions);
              }
            }),
          },
        },
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => 'teste',
            set: () => jest.fn(),
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
  describe('findById()', () => {
    it('Should throw an error if no transaction is found with the given clientId', async () => {
      const clientId = '0';
      return expect(
        transactionController.getTransaction(clientId),
      ).rejects.toThrow();
    });
    it('Should execute the transactionService.findById() method', async () => {
      const clientId = '123Abc';
      await transactionController.getTransaction(clientId);
      expect(transactionService.findById).toHaveBeenCalledWith(clientId);
    });
    it('Should return a list of transactions ', async () => {
      const clientId = '123Abc';
      const expectResult = {
        transactions,
      };
      const result = await transactionController.getTransaction(clientId);
      return expect(result).toStrictEqual(expectResult);
    });
  });
});
