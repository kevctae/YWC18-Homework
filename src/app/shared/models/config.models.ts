import { Category } from './category.model';
import { Merchant } from './merchant.model';

export interface Config {
  categories: Category[];
  provinces: string[];
  priceRange: string[];
  merchants: Merchant[];
}