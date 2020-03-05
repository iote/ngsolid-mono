import { async, TestBed } from '@angular/core/testing';
import { ExternalNgfireTimeModule } from './external-ngfire-time.module';

describe('ExternalNgfireTimeModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExternalNgfireTimeModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExternalNgfireTimeModule).toBeDefined();
  });
});
