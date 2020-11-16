import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'priceLevel' })
export class PriceLevelPipe implements PipeTransform {
  transform(index: number, inverse: boolean) {
    var sign: string = '';
    if (inverse) index = 4 - index;
    for (let i = 0; i < index; i++) {
      sign = sign + '฿'
    }
    return sign;
  }
}