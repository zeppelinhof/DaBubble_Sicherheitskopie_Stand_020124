import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldMessageComponent } from './input-field-message.component';

describe('InputFieldMessageComponent', () => {
  let component: InputFieldMessageComponent;
  let fixture: ComponentFixture<InputFieldMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputFieldMessageComponent]
    });
    fixture = TestBed.createComponent(InputFieldMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
