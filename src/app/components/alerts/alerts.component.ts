import { NgClass } from '@angular/common';
import { Component, Input } from '@angular/core';

const enum AlertType {
  Success = 1,
  Error = 2,
  Info = 3,
  Warning = 4
}

@Component({
  selector: 'app-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.scss'],
  standalone: true,
  imports: [NgClass]
})
export class AlertsComponent {

  @Input({ required: true }) type!: AlertType;
  @Input({ required: true }) message: string = '';

  protected close(alert: any) {
    console.log('alert', alert);

  }

}
