import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import { NavbarOneComponent } from './navbar-one/navbar-one.component';
import { FooterOneComponent } from './footer-one/footer-one.component';

@Component({
  selector: 'app-theme-one',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarOneComponent,
    FooterOneComponent
  ],
  template: `
   <app-navbar-one></app-navbar-one>
    <div style="height: 100vh;">
    <router-outlet></router-outlet>
    </div>
  <footer-one></footer-one>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeOneComponent { }
