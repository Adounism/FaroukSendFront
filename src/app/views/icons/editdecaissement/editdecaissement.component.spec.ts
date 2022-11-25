import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditdecaissementComponent } from './editdecaissement.component';

describe('EditdecaissementComponent', () => {
  let component: EditdecaissementComponent;
  let fixture: ComponentFixture<EditdecaissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditdecaissementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditdecaissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
