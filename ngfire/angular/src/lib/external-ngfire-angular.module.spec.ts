import { async, TestBed } from '@angular/core/testing';
import { ExternalNgfireAngularModule } from './external-ngfire-angular.module';

describe('ExternalNgfireAngularModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExternalNgfireAngularModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExternalNgfireAngularModule).toBeDefined();
  });
});
