import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcartePurchaseComponent } from './editcarte-purchase.component';

describe('EditcartePurchaseComponent', () => {
  let component: EditcartePurchaseComponent;
  let fixture: ComponentFixture<EditcartePurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcartePurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcartePurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
