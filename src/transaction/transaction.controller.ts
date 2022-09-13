import { Controller, Post, Body } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}
  @Post()
  createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    this.transactionService.create(createTransactionDto);
  }
}
