import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcarteTypeComponent } from './editcarte-type.component';

describe('EditcarteTypeComponent', () => {
  let component: EditcarteTypeComponent;
  let fixture: ComponentFixture<EditcarteTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcarteTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcarteTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
