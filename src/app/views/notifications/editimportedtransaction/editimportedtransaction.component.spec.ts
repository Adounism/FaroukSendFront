import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditimportedtransactionComponent } from './editimportedtransaction.component';

describe('EditimportedtransactionComponent', () => {
  let component: EditimportedtransactionComponent;
  let fixture: ComponentFixture<EditimportedtransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditimportedtransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditimportedtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
