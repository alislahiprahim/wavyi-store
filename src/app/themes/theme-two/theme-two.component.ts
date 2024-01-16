import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-theme-two',
  standalone: true,
  imports: [
    RouterOutlet,
  ],
  template: `
  theme two
  <router-outlet></router-outlet>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ThemeTwoComponent { }
