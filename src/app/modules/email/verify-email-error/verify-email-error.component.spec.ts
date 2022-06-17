import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerifyEmailErrorComponent } from './verify-email-error.component';

describe('VerifyEmailErrorComponent', () => {
  let component: VerifyEmailErrorComponent;
  let fixture: ComponentFixture<VerifyEmailErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerifyEmailErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerifyEmailErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
