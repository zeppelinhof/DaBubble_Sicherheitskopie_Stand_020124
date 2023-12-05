import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldChannelComponent } from './input-field-channel.component';

describe('InputFieldChannelComponent', () => {
  let component: InputFieldChannelComponent;
  let fixture: ComponentFixture<InputFieldChannelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InputFieldChannelComponent]
    });
    fixture = TestBed.createComponent(InputFieldChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
