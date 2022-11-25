import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintreturnshipmentComponent } from './printreturnshipment.component';

describe('PrintreturnshipmentComponent', () => {
  let component: PrintreturnshipmentComponent;
  let fixture: ComponentFixture<PrintreturnshipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintreturnshipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintreturnshipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
