import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcartePurchaseComponent } from './addcarte-purchase.component';

describe('AddcartePurchaseComponent', () => {
  let component: AddcartePurchaseComponent;
  let fixture: ComponentFixture<AddcartePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcartePurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcartePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
