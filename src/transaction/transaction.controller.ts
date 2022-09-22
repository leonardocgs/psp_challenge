import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  CacheInterceptor,
} from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { TransactionService } from './transaction.service';

@Controller('transaction')
export class TransactionController {
  constructor(private transactionService: TransactionService) {}
  @Post()
  async createTransaction(@Body() createTransactionDto: CreateTransactionDto) {
    this.transactionService.create(createTransactionDto);
    return { message: 'Transaction was successful' };
  }
  @UseInterceptors(CacheInterceptor)
  @Get()
  async getTransaction() {
    const transactions = await this.transactionService.findAll();
    return {
      transactions,
    };
  }
}
