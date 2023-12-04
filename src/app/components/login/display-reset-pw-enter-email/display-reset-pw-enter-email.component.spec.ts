import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayResetPwEnterEmailComponent } from './display-reset-pw-enter-email.component';

describe('DisplayResetPwEnterEmailComponent', () => {
  let component: DisplayResetPwEnterEmailComponent;
  let fixture: ComponentFixture<DisplayResetPwEnterEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayResetPwEnterEmailComponent]
    });
    fixture = TestBed.createComponent(DisplayResetPwEnterEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
