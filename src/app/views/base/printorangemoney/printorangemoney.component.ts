import { Component } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-list-groups',
  templateUrl: './printorangemoney.component.html',
  styleUrls: ['./printorangemoney.component.scss']
})
export class PrintOrangeMoneyComponent {

  constructor(
    private formBuilder: UntypedFormBuilder
  ) { }

}
