import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayCreateAccountComponent } from './display-create-account.component';

describe('DisplayCreateAccountComponent', () => {
  let component: DisplayCreateAccountComponent;
  let fixture: ComponentFixture<DisplayCreateAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayCreateAccountComponent]
    });
    fixture = TestBed.createComponent(DisplayCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
