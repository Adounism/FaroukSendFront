import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcreditPurchaseComponent } from './addcredit-purchase.component';

describe('AddcreditPurchaseComponent', () => {
  let component: AddcreditPurchaseComponent;
  let fixture: ComponentFixture<AddcreditPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcreditPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcreditPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
