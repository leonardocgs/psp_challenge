import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Payable } from './entities/Payable.entity';
import { Status } from './util/PayableStatus.enum';

@Injectable()
export class PayablesService {
  constructor(
    @InjectRepository(Payable) private payableRepository: Repository<Payable>,
  ) {}

  async findAllPaid(clientId: string): Promise<Payable[]> {
    const allPaid = await this.payableRepository.find({
      where: {
        status: Status.PAID,
        clientId,
      },
    });
    return allPaid;
  }
  async findAllWaiting(clientId: string): Promise<Payable[]> {
    const allWating = await this.payableRepository.find({
      where: {
        status: Status.WAITING_FUNDS,
        clientId,
      },
    });
    return allWating;
  }
}
