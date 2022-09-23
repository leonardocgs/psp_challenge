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
  async create({
    clientId,
    amount,
    paymentOption,
    cardHolderName,
    cardExpiration,
    cardVerificationCode,
    cardNumber,
    transactionDescription,
  }: CreateTransactionDto) {
    const transaction = new Transaction(
      clientId,
      amount,
      paymentOption,
      cardHolderName,
      cardExpiration,
      cardVerificationCode,
      cardNumber,
      transactionDescription,
    );
    await this.transactionRepository.save(transaction);
    const payable = PayableFactory.getPayable({
      clientId,
      amount,
      paymentOption,
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
