import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainShopComponent } from './main-shop.component';

describe('MainShopComponent', () => {
  let component: MainShopComponent;
  let fixture: ComponentFixture<MainShopComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MainShopComponent]
    });
    fixture = TestBed.createComponent(MainShopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
