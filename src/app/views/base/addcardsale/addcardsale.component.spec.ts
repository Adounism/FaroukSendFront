import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcardsaleComponent } from './addcardsale.component';

describe('AddcardsaleComponent', () => {
  let component: AddcardsaleComponent;
  let fixture: ComponentFixture<AddcardsaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcardsaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddcardsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
