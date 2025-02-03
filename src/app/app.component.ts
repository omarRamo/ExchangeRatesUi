import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable, interval, startWith, switchMap } from 'rxjs';

import { ExchangeRate } from './model/exchange-rate.model';
import { ExchangeRateService } from './services/exchange-rate.service';
import { MenuComponent } from './menu/menu.component';
import { ConversionComponent } from './conversion/conversion.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    MenuComponent,
    ConversionComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  exchangeRate$!: Observable<ExchangeRate>;

  constructor(private exchangeRateService: ExchangeRateService) {}

  ngOnInit() {
    // On appelle l'API toutes les 2 secondes
    this.exchangeRate$ = interval(2000).pipe(
      startWith(0),
      switchMap(() => this.exchangeRateService.getExchangeRate())
    );
  }
}
