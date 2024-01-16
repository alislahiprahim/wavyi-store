import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { AlertsComponent } from '../../components/alerts/alerts.component';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, AlertsComponent]
})
export class RegisterComponent implements OnInit {

  minDate: string;
  maxDate: string;

  registerForm: FormGroup = this.fb.group({
    email: ['', [Validators.email, Validators.required]],
    password: ['', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$^*&]).{6,}$/), Validators.required, Validators.minLength(6)]],
    // confirmPassword: ['', [Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$^*&]).{6,}$/), Validators.required, Validators.minLength(6)]],
    userType: ['Client'],
    fullName: ['', Validators.required],
    phone: ['', [Validators.required, Validators.pattern(/^(010|011|012)\d{8}$/)]],
    gender: ['Male'],
    dateOfBirth: ['2005-09-04'],
    pictureUrl: [''],
  },);

  constructor(private fb: FormBuilder, private authService: AuthService) {
    const today = new Date();
    this.minDate = new Date(1930, 11, 31).toISOString().slice(0, 10);
    this.maxDate = new Date(today.getFullYear() - 5, 2, 1).toISOString().slice(0, 10);
  }

  get email() {
    return this.registerForm.get('email');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get gender() {
    return this.registerForm.get('gender');
  }

  get phone() {
    return this.registerForm.get('phone');
  }
  get fullName() {
    return this.registerForm.get('fullName');
  }

  get dateOfBirth() {
    return this.registerForm.get('dateOfBirth');
  }


  togglePassIcon(element: any) {
    element.type == 'text' ? element.type = 'password' : element.type = 'text'
  }

  ngOnInit(): void { }

  onSubmit() {
    ;
    let { email, password, fullName, gender, userType, dateOfBirth, pictureUrl, phone } = this.registerForm.value;
    const body = { email, password, userType, userProfile: { fullName, gender, dateOfBirth, pictureUrl, phone } }
    try {
      this.authService.register(body)
    } catch (error: any) {
      ;
    }
  }

  get controls() {
    return this.registerForm.controls
  }


}


export function MustMatch(control: AbstractControl) {
  if (control.get('password')?.value !== control.get('confirmPassword')?.value) {
    return { mustMatch: true };
  }
  return null;
}
