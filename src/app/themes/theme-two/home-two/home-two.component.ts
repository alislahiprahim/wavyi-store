import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-home-two',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>home-two works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeTwoComponent { }
