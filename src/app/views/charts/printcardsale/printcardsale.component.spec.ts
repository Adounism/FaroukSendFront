import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintcardsaleComponent } from './printcardsale.component';

describe('PrintcardsaleComponent', () => {
  let component: PrintcardsaleComponent;
  let fixture: ComponentFixture<PrintcardsaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrintcardsaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrintcardsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
