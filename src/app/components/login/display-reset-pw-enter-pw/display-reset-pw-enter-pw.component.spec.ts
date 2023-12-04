import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayResetPwEnterPwComponent } from './display-reset-pw-enter-pw.component';

describe('DisplayResetPwEnterPwComponent', () => {
  let component: DisplayResetPwEnterPwComponent;
  let fixture: ComponentFixture<DisplayResetPwEnterPwComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayResetPwEnterPwComponent]
    });
    fixture = TestBed.createComponent(DisplayResetPwEnterPwComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
