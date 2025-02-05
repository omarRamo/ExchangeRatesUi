import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConversionComponent } from './conversion.component';
import { ExchangeRate } from '../model/exchange-rate.model';

describe('ConversionComponent', () => {
  let component: ConversionComponent;
  let fixture: ComponentFixture<ConversionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Since the component is standalone and already imports CommonModule and FormsModule,
      // we can import the component directly.
      imports: [ConversionComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversionComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not render conversion UI when exchangeRate is not provided', () => {
    // exchangeRate is undefined by default.
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.conversion')).toBeNull();
  });

  it('should render conversion UI when exchangeRate is provided', () => {
    // Provide a dummy exchange rate.
    const dummyExchangeRate: ExchangeRate = {
      USD: 1.2,
      GBP: 0.9,
      CHF: 1.1,
      TND: 3.2,
      JPY: 130,
      AUD: 1.5,
      CAD: 1.3,
      CNH: 7.1,
      base: '',
      updated: ''
    };

    component.exchangeRate = dummyExchangeRate;
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.conversion')).toBeTruthy();
  });

  it('should display correct conversion values based on amountInEUR and exchangeRate', () => {
    const dummyExchangeRate: ExchangeRate = {
      USD: 1.2,
      GBP: 0.9,
      CHF: 1.1,
      TND: 3.2,
      JPY: 130,
      AUD: 1.5,
      CAD: 1.3,
      CNH: 7.1,
      base: '',
      updated: ''
    };

    // Set the input properties.
    component.exchangeRate = dummyExchangeRate;
    component.amountInEUR = 2;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    // Query the conversion results.
    const resultParagraphs = compiled.querySelectorAll('.results p');

    // The number pipe with format '1.4-4' forces 4 decimal places.
    const expectedUSD = (2 * dummyExchangeRate.USD).toFixed(4);
    const expectedGBP = (2 * dummyExchangeRate.GBP).toFixed(4);
    const expectedCHF = (2 * dummyExchangeRate.CHF).toFixed(4);
    const expectedTND = (2 * dummyExchangeRate.TND).toFixed(4);
    const expectedJPY = (2 * dummyExchangeRate.JPY).toFixed(4);
    const expectedAUD = (2 * dummyExchangeRate.AUD).toFixed(4);
    const expectedCAD = (2 * dummyExchangeRate.CAD).toFixed(4);
    const expectedCNH = (2 * dummyExchangeRate.CNH).toFixed(4);

    // Verify that each paragraph contains the expected converted value.
    expect(resultParagraphs[0].textContent).toContain(expectedUSD);
    expect(resultParagraphs[1].textContent).toContain(expectedGBP);
    expect(resultParagraphs[2].textContent).toContain(expectedCHF);
    expect(resultParagraphs[3].textContent).toContain(expectedTND);
    expect(resultParagraphs[4].textContent).toContain(expectedJPY);
    expect(resultParagraphs[5].textContent).toContain(expectedAUD);
    expect(resultParagraphs[6].textContent).toContain(expectedCAD);
    expect(resultParagraphs[7].textContent).toContain(expectedCNH);
  });

  it('should update amountInEUR when the input value changes', () => {
    const dummyExchangeRate: ExchangeRate = {
      USD: 1.2,
      GBP: 0.9,
      CHF: 1.1,
      TND: 3.2,
      JPY: 130,
      AUD: 1.5,
      CAD: 1.3,
      CNH: 7.1,
      base: '',
      updated: ''
    };

    component.exchangeRate = dummyExchangeRate;
    fixture.detectChanges();

    // Get the input element bound with [(ngModel)]="amountInEUR"
    const inputEl: HTMLInputElement = fixture.nativeElement.querySelector('#eurAmount');
    expect(inputEl).toBeTruthy();

    // Simulate a change in the input value.
    inputEl.value = '5';
    inputEl.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    // Verify that the component's property is updated.
    expect(component.amountInEUR).toBe(5);
  });
});
