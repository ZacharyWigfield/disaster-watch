import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoadingComponent } from './loading.component';
import { Component } from '@angular/core';

@Component({
  standalone: true,
  imports: [LoadingComponent],
  template: `<app-loading [loading]="isLoading" />`
})
class HostComponent {
  isLoading = false;
}

describe('LoadingComponent', () => {
  let component: HostComponent;
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HostComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(HostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should show loading message when loading is true', () => {
    component.isLoading = true;
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('#loading-spinner');
    expect(spinner).toBeTruthy();
  });

  it('should not show anything when loading is false', () => {
    component.isLoading = false;
    fixture.detectChanges();

    const spinner = fixture.nativeElement.querySelector('#loading-spinner');
    expect(spinner).toBeFalsy();
  });
});
