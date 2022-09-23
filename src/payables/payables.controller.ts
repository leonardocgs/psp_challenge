import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  Param,
  UseInterceptors,
} from '@nestjs/common';
import { isDataNotFound } from 'src/utils/data';
import { PayablesService } from './payables.service';

@Controller('payables')
export class PayablesController {
  constructor(private payableService: PayablesService) {}
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @Get('paid/:clientId')
  async getPaidPayables(@Param('clientId') clientId: string) {
    const paidPayables = await this.payableService.findAllPaid(clientId);
    isDataNotFound(paidPayables);
    return {
      paid: paidPayables,
    };
  }
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @Get('waiting/:clientId')
  async getWaitingPayables(@Param('clientId') clientId: string) {
    const waitingPayables = await this.payableService.findAllWaiting(clientId);
    isDataNotFound(waitingPayables);
    return {
      waiting: waitingPayables,
    };
  }
}
