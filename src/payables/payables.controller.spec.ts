import { CACHE_MANAGER } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { CreditPayable } from './entities/CreditPayable.entity';
import { DebitPayable } from './entities/DebitPayable.entity';
import { PayablesController } from './payables.controller';
import { PayablesService } from './payables.service';
import * as dataModule from 'src/utils/data';
describe('PayablesController', () => {
  let payableService: PayablesService;
  let payableController: PayablesController;
  const creditPayable = new CreditPayable('123Abc', 1000.5);
  const debitPayable = new DebitPayable('123Abc', 1000.5);
  const waitingPayables = [creditPayable, creditPayable, creditPayable];
  const paidPayables = [debitPayable, debitPayable, debitPayable];
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PayablesController],
      providers: [
        {
          provide: CACHE_MANAGER,
          useValue: {
            get: () => 'teste',
            set: () => jest.fn(),
          },
        },
        {
          provide: PayablesService,
          useValue: {
            findAllPaid: jest.fn().mockImplementation((clientId) => {
              if (clientId == 0) {
                return Promise.resolve([]);
              } else {
                return Promise.resolve(paidPayables);
              }
            }),
            findAllWaiting: jest.fn().mockImplementation((clientId) => {
              if (clientId == 0) {
                return Promise.resolve([]);
              } else {
                return Promise.resolve(waitingPayables);
              }
            }),
          },
        },
      ],
    }).compile();
    payableService = module.get<PayablesService>(PayablesService);
    payableController = module.get<PayablesController>(PayablesController);
  });

  it('should be defined', () => {
    expect(payableController).toBeDefined();
  });
  describe('getPaidPayables()', () => {
    it('Should execute the isDataNotFound() function', async () => {
      const clientId = '123Abc';
      const isDatNotFoundSpy = jest.spyOn(dataModule, 'isDataNotFound');
      await payableController.getPaidPayables(clientId);

      expect(isDatNotFoundSpy).toHaveBeenCalledWith(paidPayables);
    });
    it('Should execute the payableService.findAllPaid() method', async () => {
      const clientId = '123Abc';
      await payableController.getPaidPayables(clientId);
      expect(payableService.findAllPaid).toHaveBeenCalledWith(clientId);
    });
    it('Should return a list of PaidPayables', async () => {
      const clientId = '123Abc';
      const expectResult = {
        paid: paidPayables,
      };
      const result = await payableController.getPaidPayables(clientId);
      expect(result).toStrictEqual(expectResult);
    });
  });
  describe('getWaitingPayables()', () => {
    it('Should execute the isDataNotFound() function', async () => {
      const clientId = '123Abc';
      const isDatNotFoundSpy = jest.spyOn(dataModule, 'isDataNotFound');
      await payableController.getWaitingPayables(clientId);

      expect(isDatNotFoundSpy).toHaveBeenCalledWith(paidPayables);
    });
    it('Should execute the payableService.findAllWaiting() method', async () => {
      const clientId = '123Abc';
      await payableController.getWaitingPayables(clientId);
      expect(payableService.findAllWaiting).toHaveBeenCalledWith(clientId);
    });
    it('Should return a list of Waiting Payabels', async () => {
      const clientId = '123Abc';
      const expectResult = {
        waiting: waitingPayables,
      };
      const result = await payableController.getWaitingPayables(clientId);
      expect(result).toStrictEqual(expectResult);
    });
  });
});
