import { MAX_QUANTITY } from '@/shared/constants';

type CalcPages = {
  totalItems: number;
};

export function calcPages({ totalItems }: CalcPages): number {
  return Math.ceil(totalItems / MAX_QUANTITY);
}
