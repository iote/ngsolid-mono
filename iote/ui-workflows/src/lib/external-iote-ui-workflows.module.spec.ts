import { async, TestBed } from '@angular/core/testing';
import { ExternalIoteUiWorkflowsModule } from './external-iote-ui-workflows.module';

describe('ExternalIoteUiWorkflowsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExternalIoteUiWorkflowsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExternalIoteUiWorkflowsModule).toBeDefined();
  });
});
