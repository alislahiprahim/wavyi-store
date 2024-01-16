import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-products-one',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>products-one works!</p>`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsOneComponent { }
