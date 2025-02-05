import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppComponent } from './app.component';
import { ExchangeRate } from './model/exchange-rate.model';
import { ExchangeRateService } from './services/exchange-rate.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let exchangeRateServiceSpy: jasmine.SpyObj<ExchangeRateService>;

  // A dummy exchange rate object to use in tests.
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

  beforeEach(async () => {
    // Create a spy for ExchangeRateService with a stub for getExchangeRate().
    exchangeRateServiceSpy = jasmine.createSpyObj('ExchangeRateService', ['getExchangeRate']);
    // Have the spy return an Observable of the dummy exchange rate.
    exchangeRateServiceSpy.getExchangeRate.and.returnValue(of(dummyExchangeRate));

    await TestBed.configureTestingModule({
      // Import the standalone AppComponent, which already imports its child components.
      imports: [AppComponent],
      providers: [
        { provide: ExchangeRateService, useValue: exchangeRateServiceSpy }
      ]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app component', () => {
    expect(component).toBeTruthy();
  });

  it('should call getExchangeRate and render child components', fakeAsync(() => {
    // Trigger ngOnInit and subscribe to the exchangeRate$ Observable.
    fixture.detectChanges();

    // The startWith(0) in the pipe causes the first emission immediately.
    expect(exchangeRateServiceSpy.getExchangeRate).toHaveBeenCalledTimes(1);

    // Simulate the passage of 2 seconds so that interval emits again.
    tick(2000);
    fixture.detectChanges();

    // Now, the service should have been called a second time.
    expect(exchangeRateServiceSpy.getExchangeRate).toHaveBeenCalledTimes(2);

    const compiled = fixture.nativeElement as HTMLElement;

    // Verify that the title is rendered.
    const titleEl = compiled.querySelector('.app-title');
    expect(titleEl?.textContent).toContain('Rates Exchanger');

    // Check that the child components are rendered by querying their selectors.
    const menuElement = compiled.querySelector('app-menu');
    const conversionElement = compiled.querySelector('app-conversion');

    expect(menuElement).toBeTruthy();
    expect(conversionElement).toBeTruthy();
  }));
});
