import { Component, Input } from '@angular/core';
import { MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { NavbarOneComponent } from '../../themes/theme-one/navbar-one/navbar-one.component';
import { LoginComponent } from '../login/login.component';
import { RegisterComponent } from '../register/register.component';
import { ForgetPasswordComponent } from '../forget-password/forget-password.component';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-auth-ui',
  templateUrl: './auth-ui.component.html',
  styleUrls: ['./auth-ui.component.scss'],
  standalone: true,
  imports: [MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, LoginComponent, RegisterComponent, ForgetPasswordComponent, NgClass],
})
export class AuthUiComponent {

  @Input() type!: 'login' | 'register' | 'forget-password';

  constructor(public activeModal: MatDialogRef<NavbarOneComponent>) { }
}
