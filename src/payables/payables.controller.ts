import {
  CacheInterceptor,
  CacheTTL,
  Controller,
  Get,
  UseInterceptors,
} from '@nestjs/common';
import { PayablesService } from './payables.service';

@Controller('payables')
export class PayablesController {
  constructor(private payableService: PayablesService) {}
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @Get('paid')
  async getPaidPayables() {
    const paidPayables = await this.payableService.findAllPaid();
    return {
      paid: paidPayables,
    };
  }
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @Get('waiting')
  async getWaitingPayables() {
    const waitingPayables = await this.payableService.findAllWaiting();
    return {
      waiting: waitingPayables,
    };
  }
}
