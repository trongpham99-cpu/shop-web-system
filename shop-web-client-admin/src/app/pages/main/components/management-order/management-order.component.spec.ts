import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementOrderComponent } from './management-order.component';

describe('ManagementOrderComponent', () => {
  let component: ManagementOrderComponent;
  let fixture: ComponentFixture<ManagementOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagementOrderComponent]
    });
    fixture = TestBed.createComponent(ManagementOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
