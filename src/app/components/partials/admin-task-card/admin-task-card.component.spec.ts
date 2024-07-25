import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTaskCardComponent } from './admin-task-card.component';

describe('AdminTaskCardComponent', () => {
  let component: AdminTaskCardComponent;
  let fixture: ComponentFixture<AdminTaskCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminTaskCardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(AdminTaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
