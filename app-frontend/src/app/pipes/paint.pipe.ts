import { Pipe, PipeTransform } from '@angular/core';
import { Paint } from '../paint';
import { Status } from '../enums/status';
import { Colour } from '../enums/colour';

@Pipe({
  name: 'paint'
})
export class PaintPipe implements PipeTransform {

  transform(paint: Paint): string {
    switch(paint.colour) {
      case Colour.blue:
        return 'Blue';
      case Colour.black:
        return 'Black';
      case Colour.white:
        return 'White';
      case Colour.grey:
        return 'Grey';
      case Colour.purple:
        return 'Purple';
      default:
        return '';
    }
  }

}
