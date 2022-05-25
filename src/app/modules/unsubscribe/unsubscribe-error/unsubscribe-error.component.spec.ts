import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsubscribeErrorComponent } from './unsubscribe-error.component';

describe('UnsubscribeErrorComponent', () => {
  let component: UnsubscribeErrorComponent;
  let fixture: ComponentFixture<UnsubscribeErrorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnsubscribeErrorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnsubscribeErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
