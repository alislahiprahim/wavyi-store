import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgClass, NgIf]
})
export class ForgetPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
