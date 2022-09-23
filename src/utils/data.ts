import { HttpException, HttpStatus } from '@nestjs/common';

export function isDataNotFound<Type>(data: Type[]) {
  const dataLenght = data.length;
  if (!dataLenght) {
    throw new HttpException('Data not found', HttpStatus.NOT_FOUND);
  }
}
