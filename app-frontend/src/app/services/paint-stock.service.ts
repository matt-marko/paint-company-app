import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Colour } from '../enums/colour';
import { Status } from '../enums/status';
import { Paint } from '../paint';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaintStockService {

  private http: HttpClient = inject(HttpClient);

  constructor() {
   /* this.paints = [
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
    ];*/
  }

  getPaints(): Observable<Paint[]> {
    return this.http.get<Paint[]>('http://localhost:8080/paint');
  }

  updatePaints(paints: Paint[]): Observable<Paint[]> {
    return this.http.put<Paint[]>('http://localhost:8080/paint', paints);
  }
}
