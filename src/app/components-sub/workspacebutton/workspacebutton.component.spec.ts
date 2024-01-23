import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkspacebuttonComponent } from './workspacebutton.component';

describe('WorkspacebuttonComponent', () => {
  let component: WorkspacebuttonComponent;
  let fixture: ComponentFixture<WorkspacebuttonComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WorkspacebuttonComponent]
    });
    fixture = TestBed.createComponent(WorkspacebuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
