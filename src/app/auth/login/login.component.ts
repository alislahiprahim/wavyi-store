import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertsComponent } from '../../components/alerts/alerts.component';
import { AuthService } from '../../services/auth.service';
import { NgClass, NgIf } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AlertsComponent, NgIf, NgClass]
})
export class LoginComponent implements OnInit {

  loginForm = this.fb.group({
    userName: ['', [Validators.required]],
    password: ['', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$^*&]).{6,}$/), Validators.required, Validators.minLength(6)]],
  });

  constructor(private fb: FormBuilder, private authService: AuthService) { }


  ngOnInit(): void { }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }

  togglePassIcon(element: any) {
    element.type == 'text' ? element.type = 'password' : element.type = 'text'
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const { userName, password } = this.loginForm.value;
      this.authService.login({ userName: userName ?? '', password: password ?? '' });
    }
  }

}
