import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuComponent } from './menu.component';
import { ExchangeRate } from '../model/exchange-rate.model';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      // Since the component is standalone and already imports CommonModule,
      // we can import the component directly.
      imports: [MenuComponent]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should not render the menu if exchangeRate is not provided', () => {
    // With no exchangeRate set, the *ngIf directive should hide the menu.
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.menu')).toBeNull();
  });

  it('should render the menu with correct exchange rates when exchangeRate is provided', () => {
    // Create a dummy exchange rate object.
    const dummyExchangeRate: ExchangeRate = {
      USD: 1.2,
      GBP: 0.9,
      CHF: 1.1,
      TND: 3.2,
      JPY: 130,
      AUD: 1.5,
      CAD: 1.3,
      CNH: 7.1,
      updated: '2025-02-05',
      base: ''
    };

    // Set the input property.
    component.exchangeRate = dummyExchangeRate;
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const menuEl = compiled.querySelector('.menu');
    expect(menuEl).toBeTruthy();

    // Verify the header text.
    const header = menuEl?.querySelector('h3');
    expect(header?.textContent).toContain('Taux de change');

    // Verify each exchange rate is displayed correctly.
    expect(menuEl?.textContent).toContain(`1 EUR = ${dummyExchangeRate.USD} USD`);
    expect(menuEl?.textContent).toContain(`1 EUR = ${dummyExchangeRate.GBP} GBP`);
    expect(menuEl?.textContent).toContain(`1 EUR = ${dummyExchangeRate.CHF} CHF`);
    expect(menuEl?.textContent).toContain(`1 EUR = ${dummyExchangeRate.TND} TND`);
    expect(menuEl?.textContent).toContain(`1 EUR = ${dummyExchangeRate.JPY} JPY`);
    expect(menuEl?.textContent).toContain(`1 EUR = ${dummyExchangeRate.AUD} AUD`);
    expect(menuEl?.textContent).toContain(`1 EUR = ${dummyExchangeRate.CAD} CAD`);
    expect(menuEl?.textContent).toContain(`1 EUR = ${dummyExchangeRate.CNH} CNH`);

    // Verify the updated date is displayed.
    const updatedParagraph = menuEl?.querySelector('.updated');
    expect(updatedParagraph?.textContent).toContain(`Mise à jour : ${dummyExchangeRate.updated}`);
  });
});
