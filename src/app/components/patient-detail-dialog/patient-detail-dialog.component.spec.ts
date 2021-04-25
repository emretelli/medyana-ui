import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientDetailDialogComponent } from './patient-detail-dialog.component';

describe('PatientDetailDialogComponent', () => {
  let component: PatientDetailDialogComponent;
  let fixture: ComponentFixture<PatientDetailDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PatientDetailDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientDetailDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
