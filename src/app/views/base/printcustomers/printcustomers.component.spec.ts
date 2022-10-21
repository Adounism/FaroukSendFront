import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { CardModule, DropdownModule, GridModule, NavModule } from '@coreui/angular';
import { IconSetService } from '@coreui/icons-angular';
import { iconSubset } from '../../../icons/icon-subset';
import { PrintcustomersComponent } from './printcustomers.component';
import { DocsComponentsModule } from '../../../../components';

describe('PrintcustomersComponent', () => {
  let component: PrintcustomersComponent;
  let fixture: ComponentFixture<PrintcustomersComponent>;
  let iconSetService: IconSetService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PrintcustomersComponent],
      imports: [GridModule, CardModule, RouterTestingModule, NavModule, DropdownModule, DocsComponentsModule],
      providers: [IconSetService]
    })
      .compileComponents();
  });

  beforeEach(() => {
    iconSetService = TestBed.inject(IconSetService);
    iconSetService.icons = { ...iconSubset };

    fixture = TestBed.createComponent(PrintcustomersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
