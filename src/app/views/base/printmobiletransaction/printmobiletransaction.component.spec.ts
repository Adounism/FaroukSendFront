import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintmobiletransactionComponent } from './printmobiletransaction.component';

describe('PrintmobiletransactionComponent', () => {
  let component: PrintmobiletransactionComponent;
  let fixture: ComponentFixture<PrintmobiletransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintmobiletransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintmobiletransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
