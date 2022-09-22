import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payable } from 'src/payables/entities/Payable.entity';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  imports: [TypeOrmModule.forFeature([Transaction, Payable])],
  controllers: [TransactionController],
  providers: [TransactionService],
})
export class TransactionModule {}
