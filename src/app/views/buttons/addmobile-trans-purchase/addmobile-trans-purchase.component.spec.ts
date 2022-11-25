import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmobileTransPurchaseComponent } from './addmobile-trans-purchase.component';

describe('AddmobileTransPurchaseComponent', () => {
  let component: AddmobileTransPurchaseComponent;
  let fixture: ComponentFixture<AddmobileTransPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmobileTransPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmobileTransPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
