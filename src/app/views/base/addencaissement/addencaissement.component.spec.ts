import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddencaissementComponent } from './addencaissement.component';

describe('AddencaissementComponent', () => {
  let component: AddencaissementComponent;
  let fixture: ComponentFixture<AddencaissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddencaissementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddencaissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
