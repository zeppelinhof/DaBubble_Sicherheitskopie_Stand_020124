import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoogleScreenComponent } from './google-screen.component';

describe('GoogleScreenComponent', () => {
  let component: GoogleScreenComponent;
  let fixture: ComponentFixture<GoogleScreenComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GoogleScreenComponent]
    });
    fixture = TestBed.createComponent(GoogleScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
