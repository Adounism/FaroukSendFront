import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditmobiletransactionComponent } from './editmobiletransaction.component';

describe('EditmobiletransactionComponent', () => {
  let component: EditmobiletransactionComponent;
  let fixture: ComponentFixture<EditmobiletransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditmobiletransactionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditmobiletransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
