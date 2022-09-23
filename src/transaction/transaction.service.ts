import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payable } from 'src/payables/entities/Payable.entity';
import { PayableFactory } from 'src/payables/factories/PayableFactory';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private transactionRepository: Repository<Transaction>,
    @InjectRepository(Payable) private payableRepository: Repository<Payable>,
  ) {}
  async create(createTransaction: CreateTransactionDto) {
    const transaction = new Transaction(createTransaction);
    await this.transactionRepository.save(transaction);
    const payable = PayableFactory.getPayable({
      clientId: createTransaction.clientId,
      amount: createTransaction.amount,
      paymentOption: createTransaction.paymentOption,
    });
    await this.payableRepository.save(payable);
  }
  async findById(clientId: string): Promise<Transaction[]> {
    return this.transactionRepository.find({
      where: {
        clientId: clientId,
      },
    });
  }
}
