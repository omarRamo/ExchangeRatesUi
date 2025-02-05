import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ExchangeRate } from '../model/exchange-rate.model';

@Injectable({
  providedIn: 'root'
})
export class ExchangeRateService {
  private apiUrl = 'http://localhost:5255/api/ExchangeRate';

  constructor(private http: HttpClient) {}

  getExchangeRate(): Observable<ExchangeRate> {
    return this.http.get<ExchangeRate>(this.apiUrl);
  }
}
