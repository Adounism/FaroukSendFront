import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcreditPurchaseComponent } from './editcredit-purchase.component';

describe('EditcreditPurchaseComponent', () => {
  let component: EditcreditPurchaseComponent;
  let fixture: ComponentFixture<EditcreditPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcreditPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcreditPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
