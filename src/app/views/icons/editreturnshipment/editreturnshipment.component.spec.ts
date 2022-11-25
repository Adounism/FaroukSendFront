import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditreturnshipmentComponent } from './editreturnshipment.component';

describe('EditreturnshipmentComponent', () => {
  let component: EditreturnshipmentComponent;
  let fixture: ComponentFixture<EditreturnshipmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditreturnshipmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditreturnshipmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
