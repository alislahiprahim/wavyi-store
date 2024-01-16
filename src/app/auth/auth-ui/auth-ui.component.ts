import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-auth-ui',
  templateUrl: './auth-ui.component.html',
  styleUrls: ['./auth-ui.component.scss']
})
export class AuthUiComponent {

  @Input() type: 'login' | 'register' | 'forget-password';

  constructor(public activeModal: NgbActiveModal) { }
}
