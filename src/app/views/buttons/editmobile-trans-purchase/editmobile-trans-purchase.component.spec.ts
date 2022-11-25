import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmobileTransPurchaseComponent } from './editmobile-trans-purchase.component';

describe('EditmobileTransPurchaseComponent', () => {
  let component: EditmobileTransPurchaseComponent;
  let fixture: ComponentFixture<EditmobileTransPurchaseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmobileTransPurchaseComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmobileTransPurchaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
