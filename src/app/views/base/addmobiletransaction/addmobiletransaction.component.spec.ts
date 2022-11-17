import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddmobiletransactionComponent } from './addmobiletransaction.component';

describe('AddmobiletransactionComponent', () => {
  let component: AddmobiletransactionComponent;
  let fixture: ComponentFixture<AddmobiletransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddmobiletransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddmobiletransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
