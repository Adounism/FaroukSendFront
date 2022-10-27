import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';

import { CardModule, CarouselModule, GridModule } from '@coreui/angular';
import { IconModule } from '@coreui/icons-angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { DocsComponentsModule } from '../../../../components';
import { AddOperationComponent } from './addoperation.component';

describe('AddOperationComponent', () => {
  let component: AddOperationComponent;
  let fixture: ComponentFixture<AddOperationComponent>;
  let iconSetService: IconSetService

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AddOperationComponent ],
      imports: [CarouselModule, NoopAnimationsModule, CardModule, GridModule, IconModule, DocsComponentsModule, RouterTestingModule],
      providers: [IconSetService]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(AddOperationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
