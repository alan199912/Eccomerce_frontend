import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeCompletedComponent } from './unsubscribe-completed.component';

describe('UnsubscribeCompletedComponent', () => {
  let component: UnsubscribeCompletedComponent;
  let fixture: ComponentFixture<UnsubscribeCompletedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsubscribeCompletedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubscribeCompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
