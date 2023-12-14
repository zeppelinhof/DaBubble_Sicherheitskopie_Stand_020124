import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageOfUserComponent } from './message-of-user.component';

describe('MessageOfUserComponent', () => {
  let component: MessageOfUserComponent;
  let fixture: ComponentFixture<MessageOfUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageOfUserComponent]
    });
    fixture = TestBed.createComponent(MessageOfUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
