import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintmobileTransPurchaseComponent } from './printmobile-trans-purchase.component';

describe('PrintmobileTransPurchaseComponent', () => {
  let component: PrintmobileTransPurchaseComponent;
  let fixture: ComponentFixture<PrintmobileTransPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintmobileTransPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintmobileTransPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
