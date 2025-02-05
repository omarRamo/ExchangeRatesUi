import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ExchangeRateService } from './exchange-rate.service';
import { ExchangeRate } from '../model/exchange-rate.model';

describe('ExchangeRateService', () => {
  let service: ExchangeRateService;
  let httpMock: HttpTestingController;

  // A dummy exchange rate object for testing.
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ExchangeRateService]
    });

    // Inject the service and the HttpTestingController.
    service = TestBed.inject(ExchangeRateService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    // Ensure that there are no outstanding HTTP requests.
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch exchange rate data via GET', () => {
    service.getExchangeRate().subscribe((data) => {
      // Expect the service to return the dummy exchange rate.
      expect(data).toEqual(dummyExchangeRate);
    });

    // Expect that a single GET request has been made to the specified URL.
    const req = httpMock.expectOne('http://localhost:5255/api/ExchangeRate');
    expect(req.request.method).toBe('GET');

    // Respond with the dummy exchange rate.
    req.flush(dummyExchangeRate);
  });
});
