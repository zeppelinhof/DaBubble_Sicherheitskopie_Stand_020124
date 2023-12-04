import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayChooseAvatarComponent } from './display-choose-avatar.component';

describe('DisplayChooseAvatarComponent', () => {
  let component: DisplayChooseAvatarComponent;
  let fixture: ComponentFixture<DisplayChooseAvatarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayChooseAvatarComponent]
    });
    fixture = TestBed.createComponent(DisplayChooseAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
