import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportedtransactionComponent } from './importedtransaction.component';

describe('ImportedtransactionComponent', () => {
  let component: ImportedtransactionComponent;
  let fixture: ComponentFixture<ImportedtransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportedtransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportedtransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
