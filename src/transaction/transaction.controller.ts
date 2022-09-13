import { Controller, Post, Body } from '@nestjs/common';

import { CreateTransactionDto } from './dto/transaction.dto';

@Controller('transaction')
export class TransactionController {
  @Post()
  createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    return createTransactionDto;
  }
}
