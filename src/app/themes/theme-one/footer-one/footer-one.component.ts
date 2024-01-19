import { Component } from '@angular/core';
import { NgIf } from '@angular/common';
import { LocalStorageConfigService } from '../../../services/localStorageConfig.service';

@Component({
  selector: 'footer-one',
  templateUrl: './footer-one.component.html',
  styleUrls: ['./footer-one.component.scss'],
  standalone: true,
  imports: [NgIf]
})
export class FooterOneComponent {

  storeSettings: any = {};
  constructor(private localStorageConfig: LocalStorageConfigService) {
    this.storeSettings = this.localStorageConfig.storeSettings;
  }

}
