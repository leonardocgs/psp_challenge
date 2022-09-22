import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payable } from './entities/Payable.entity';
import { PayablesController } from './payables.controller';
import { PayablesService } from './payables.service';

@Module({
  imports: [TypeOrmModule.forFeature([Payable])],
  controllers: [PayablesController],
  providers: [PayablesService],
})
export class PayablesModule {}
