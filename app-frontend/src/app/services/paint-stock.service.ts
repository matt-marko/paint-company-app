import { Injectable } from '@angular/core';
import { Colour } from '../enums/colour';
import { Status } from '../enums/status';
import { Paint } from '../paint';

@Injectable({
  providedIn: 'root'
})
export class PaintStockService {
  private paints: Paint[];

  constructor() {
    this.paints = [
      {
        colour: Colour.black,
        status: Status.outOfStock,
      },
      {
        colour: Colour.white,
        status: Status.runningLow,
      },
      {
        colour: Colour.purple,
        status: Status.runningLow,
      },
      {
        colour: Colour.blue,
        status: Status.available,
      },
      {
        colour: Colour.grey,
        status: Status.available,
      },
    ];
  }

  getPaints(): Paint[] {
    return this.paints;
  }
}
