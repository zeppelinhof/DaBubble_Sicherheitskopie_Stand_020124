import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsEditUserDataComponent } from './settings-edit-user-data.component';

describe('SettingsEditUserDataComponent', () => {
  let component: SettingsEditUserDataComponent;
  let fixture: ComponentFixture<SettingsEditUserDataComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SettingsEditUserDataComponent]
    });
    fixture = TestBed.createComponent(SettingsEditUserDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
