import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintcartePurchaseComponent } from './printcarte-purchase.component';

describe('PrintcartePurchaseComponent', () => {
  let component: PrintcartePurchaseComponent;
  let fixture: ComponentFixture<PrintcartePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintcartePurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintcartePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
