import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreturnshipmentComponent } from './addreturnshipment.component';

describe('AddreturnshipmentComponent', () => {
  let component: AddreturnshipmentComponent;
  let fixture: ComponentFixture<AddreturnshipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddreturnshipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddreturnshipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
