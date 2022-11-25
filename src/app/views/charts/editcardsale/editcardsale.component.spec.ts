import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcardsaleComponent } from './editcardsale.component';

describe('EditcardsaleComponent', () => {
  let component: EditcardsaleComponent;
  let fixture: ComponentFixture<EditcardsaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditcardsaleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditcardsaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
