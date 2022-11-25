import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditencaissementComponent } from './editencaissement.component';

describe('EditencaissementComponent', () => {
  let component: EditencaissementComponent;
  let fixture: ComponentFixture<EditencaissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditencaissementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditencaissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
