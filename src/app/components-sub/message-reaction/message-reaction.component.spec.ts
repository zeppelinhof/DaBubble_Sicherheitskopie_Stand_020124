import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageReactionComponent } from './message-reaction.component';

describe('MessageReactionComponent', () => {
  let component: MessageReactionComponent;
  let fixture: ComponentFixture<MessageReactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageReactionComponent]
    });
    fixture = TestBed.createComponent(MessageReactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
