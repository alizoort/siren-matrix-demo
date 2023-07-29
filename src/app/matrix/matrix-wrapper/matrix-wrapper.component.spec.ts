import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrixWrapperComponent } from './matrix-wrapper.component';

describe('MatrixWrapperComponent', () => {
  let component: MatrixWrapperComponent;
  let fixture: ComponentFixture<MatrixWrapperComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MatrixWrapperComponent]
    });
    fixture = TestBed.createComponent(MatrixWrapperComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
