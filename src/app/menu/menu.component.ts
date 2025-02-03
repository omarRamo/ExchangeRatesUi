// src/app/components/menu.component.ts
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangeRate } from '../model/exchange-rate.model';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  @Input() exchangeRate?: ExchangeRate | null;
}
