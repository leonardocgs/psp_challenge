import {
  Controller,
  Post,
  Body,
  Get,
  UseInterceptors,
  CacheInterceptor,
  Param,
} from '@nestjs/common';
import { isDataNotFound } from 'src/utils/data';
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
  @Get(':clientId')
  async getTransaction(@Param('clientId') clientId: string) {
    const transactions = await this.transactionService.findById(clientId);
    isDataNotFound(transactions);
    return {
      transactions,
    };
  }
}
