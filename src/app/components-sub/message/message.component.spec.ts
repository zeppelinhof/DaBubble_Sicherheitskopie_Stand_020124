import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MessageComponent } from './message.component';
import { provideRouter } from '@angular/router';

describe('MessageComponent', () => {
  let component: MessageComponent;
  let fixture: ComponentFixture<MessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MessageComponent]
    });
    fixture = TestBed.createComponent(MessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideRouter([])]
  })});

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
