import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsUserDataMessageComponent } from './settings-user-data-message.component';

describe('SettingsUserDataMessageComponent', () => {
  let component: SettingsUserDataMessageComponent;
  let fixture: ComponentFixture<SettingsUserDataMessageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsUserDataMessageComponent]
    });
    fixture = TestBed.createComponent(SettingsUserDataMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
