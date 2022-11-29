import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CardModule, DropdownModule, GridModule, NavModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { PrintsupplierComponent } from './printsuppliers.component';
import { DocsComponentsModule } from '../../../../components';

describe('PrintsupplierComponent', () => {
  let component: PrintsupplierComponent;
  let fixture: ComponentFixture<PrintsupplierComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintsupplierComponent],
      imports: [GridModule, CardModule, RouterTestingModule, NavModule, DropdownModule, DocsComponentsModule],
      providers: [IconSetService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(PrintsupplierComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
