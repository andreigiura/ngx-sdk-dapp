import { TokenPayment } from '@multiversx/sdk-core';
import { DECIMALS } from '../constants';

export function parseAmount(amount: string, decimals: number = DECIMALS) {
  return TokenPayment.fungibleFromAmount('', amount, decimals).toString();
}
