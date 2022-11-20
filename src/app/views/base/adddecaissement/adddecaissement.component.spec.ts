import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdddecaissementComponent } from './adddecaissement.component';

describe('AdddecaissementComponent', () => {
  let component: AdddecaissementComponent;
  let fixture: ComponentFixture<AdddecaissementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdddecaissementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdddecaissementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
