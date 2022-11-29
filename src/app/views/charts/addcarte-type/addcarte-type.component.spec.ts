import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcarteTypeComponent } from './addcarte-type.component';

describe('AddcarteTypeComponent', () => {
  let component: AddcarteTypeComponent;
  let fixture: ComponentFixture<AddcarteTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcarteTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcarteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
