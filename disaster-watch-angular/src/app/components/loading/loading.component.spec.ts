import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingComponent } from './loading.component';
import { provideZonelessChangeDetection } from '@angular/core';

describe('LoadingComponent', () => {
  let fixture: ComponentFixture<LoadingComponent>;
  let component: LoadingComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [provideZonelessChangeDetection()],
      imports: [LoadingComponent] 
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingComponent);
    component = fixture.componentInstance;
  });

  it('should show loading spinner when loading is true', () => {
    fixture.componentRef.setInput('loading', true);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('#loading-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should not show anything when loading is false', () => {
    fixture.componentRef.setInput('loading', false);
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('#loading-spinner');
    expect(spinner).toBeFalsy();
  });
});
