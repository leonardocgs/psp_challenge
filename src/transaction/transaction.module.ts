import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payable } from 'src/payables/entities/Payable.entity';
import { Repository } from 'typeorm';
import { Transaction } from './entities/transaction.entity';
import { TransactionController } from './transaction.controller';
import { TransactionService } from './transaction.service';

@Module({
  controllers: [TransactionController],
  providers: [
    TransactionService,
    {
      provide: Payable,
      useClass: Repository,
    },
    {
      provide: Transaction,
      useClass: Repository,
    },
  ],
})
export class TransactionModule {}
