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
    private userRepository: Repository<Transaction>,
    @InjectRepository(Payable) private payableRepository: Repository<Payable>,
  ) {}
  async create({
    amount,
    paymentOption,
    cardHolderName,
    cardExpiration,
    cardVerificationCode,
    cardNumber,
    transactionDescription,
  }: CreateTransactionDto) {
    const transaction = new Transaction(
      amount,
      paymentOption,
      cardHolderName,
      cardExpiration,
      cardVerificationCode,
      cardNumber,
      transactionDescription,
    );
    await this.userRepository.save(transaction);
    const payable = PayableFactory.getPayable(paymentOption);
    payable.setAmount(amount);
    await this.payableRepository.save(payable);
  }
}
