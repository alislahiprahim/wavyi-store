import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-home-one',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <p>home-one works!</p>
  <button></button>
  `,

  styleUrl: './home-one.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeOneComponent {
  themeService = Inject(ThemeService);


}
