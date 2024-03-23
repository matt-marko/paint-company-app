import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Colour } from '../enums/colour';
import { Status } from '../enums/status';
import { Paint } from '../paint';
import { Observable, map } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaintStockService {
  apiUrl: string = environment.apiUrl;

  private http: HttpClient = inject(HttpClient);

  getPaints(): Observable<Paint[]> {
    return this.http.get<Paint[]>(this.apiUrl);
  }

  updatePaints(paints: Paint[]): Observable<Paint[]> {
    return this.http.put<Paint[]>(this.apiUrl, paints);
  }
}
