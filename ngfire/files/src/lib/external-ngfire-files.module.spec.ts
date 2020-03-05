import { async, TestBed } from '@angular/core/testing';
import { ExternalNgfireFilesModule } from './external-ngfire-files.module';

describe('ExternalNgfireFilesModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExternalNgfireFilesModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExternalNgfireFilesModule).toBeDefined();
  });
});
