import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/transaction.dto';

@Injectable()
export class TransactionService {
  create(createTransactionDto: CreateTransactionDto) {}
}
