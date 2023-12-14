import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesChannelComponent } from './messages-channel.component';

describe('MessagesChannelComponent', () => {
  let component: MessagesChannelComponent;
  let fixture: ComponentFixture<MessagesChannelComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessagesChannelComponent]
    });
    fixture = TestBed.createComponent(MessagesChannelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
