import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'arraySpacer' })
export class ArraySpacerPipe implements PipeTransform {
  transform(array: string[]) {
    var spacer: string = '';
    array.map((data) => {
      spacer = spacer + " " + data;
    });
    return spacer;
  }
}