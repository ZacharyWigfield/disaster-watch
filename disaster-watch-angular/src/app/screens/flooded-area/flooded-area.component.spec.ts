import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloodedAreaComponent } from './flooded-area.component';

describe('FloodedAreaComponent', () => {
  let component: FloodedAreaComponent;
  let fixture: ComponentFixture<FloodedAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FloodedAreaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FloodedAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
