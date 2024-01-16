import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-loader',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `
  <div class="loading-overlay">
     <div class="st-spinner">
        <div class="spinner">
            <div></div>
            <div>
                <div></div>
            </div>
        </div>
    </div>
</div>
  `,
  styleUrl: './loader.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoaderComponent { }
