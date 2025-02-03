import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ExchangeRate } from '../model/exchange-rate.model';

@Component({
  selector: 'app-conversion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './conversion.component.html',
  styleUrls: ['./conversion.component.css']
})
export class ConversionComponent {
  @Input() exchangeRate?: ExchangeRate | null;
  amountInEUR = 1;
}
