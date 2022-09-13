import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { Transaction } from './entities/transaction.entity';

@Injectable()
export class TransactionService {
  constructor(
    @InjectRepository(Transaction)
    private userRepository: Repository<Transaction>,
  ) {}
  async create({
    value,
    paymentOption,
    cardHolderName,
    cardExpiration,
    cardVerificationCode,
    cardNumber,
  }: CreateTransactionDto) {
    const transaction = new Transaction(
      value,
      paymentOption,
      cardHolderName,
      cardExpiration,
      cardVerificationCode,
      cardNumber,
    );
    await this.userRepository.save(transaction);
  }
}
