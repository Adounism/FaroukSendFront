import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintcreditPurchaseComponent } from './printcredit-purchase.component';

describe('PrintcreditPurchaseComponent', () => {
  let component: PrintcreditPurchaseComponent;
  let fixture: ComponentFixture<PrintcreditPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintcreditPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintcreditPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
