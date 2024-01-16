import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import { NavbarOneComponent } from './navbar-one/navbar-one.component';

@Component({
  selector: 'app-theme-one',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarOneComponent
  ],
  template: `
   <app-navbar-one></app-navbar-one>
  <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeOneComponent { }
