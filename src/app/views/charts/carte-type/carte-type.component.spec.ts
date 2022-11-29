import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarteTypeComponent } from './carte-type.component';

describe('CarteTypeComponent', () => {
  let component: CarteTypeComponent;
  let fixture: ComponentFixture<CarteTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarteTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
