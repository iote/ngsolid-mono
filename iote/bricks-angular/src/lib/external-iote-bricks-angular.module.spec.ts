import { async, TestBed } from '@angular/core/testing';
import { ExternalIoteBricksAngularModule } from './external-iote-bricks-angular.module';

describe('ExternalIoteBricksAngularModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ExternalIoteBricksAngularModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(ExternalIoteBricksAngularModule).toBeDefined();
  });
});
