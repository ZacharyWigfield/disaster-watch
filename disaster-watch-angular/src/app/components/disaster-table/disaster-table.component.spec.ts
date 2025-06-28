import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisasterTableComponent } from './disaster-table.component';

describe('DisasterTableComponent', () => {
  let component: DisasterTableComponent;
  let fixture: ComponentFixture<DisasterTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DisasterTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisasterTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
