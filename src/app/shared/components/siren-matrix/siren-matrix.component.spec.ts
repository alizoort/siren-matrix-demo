import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SirenMatrixComponent } from './siren-matrix.component';

describe('BookingHistoryTableComponent', () => {
  let component: SirenMatrixComponent;
  let fixture: ComponentFixture<SirenMatrixComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SirenMatrixComponent]
    });
    fixture = TestBed.createComponent(SirenMatrixComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
