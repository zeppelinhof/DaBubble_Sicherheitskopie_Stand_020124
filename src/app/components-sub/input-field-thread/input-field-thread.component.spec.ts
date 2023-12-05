import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldThreadComponent } from './input-field-thread.component';

describe('InputFieldThreadComponent', () => {
  let component: InputFieldThreadComponent;
  let fixture: ComponentFixture<InputFieldThreadComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputFieldThreadComponent]
    });
    fixture = TestBed.createComponent(InputFieldThreadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
