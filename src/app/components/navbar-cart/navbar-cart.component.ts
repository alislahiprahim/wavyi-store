import { AsyncPipe, CommonModule, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { StCurrencyPipe } from '../../pipes/st-currency.pipe';
import { OverlayComponent } from '../overlay/overlay.component';
import { LocalStorageConfigService } from '../../services/localStorageConfig.service';
import { CartService } from '../../services/cart.service';
import { ImgBaseUrlPipe } from '../../pipes/img-base-url.pipe';

@Component({
  selector: 'app-navbar-cart',
  standalone: true,
  imports: [NgFor, NgIf, DecimalPipe, AsyncPipe, ImgBaseUrlPipe, StCurrencyPipe, OverlayComponent],
  templateUrl: './navbar-cart.component.html',
  styleUrl: './navbar-cart.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarCartComponent implements OnInit{
  constructor(public localStorageConfig: LocalStorageConfigService, public cartService: CartService) { }
  ngOnInit(): void {
    this.cartService.getCartItems()
  }

  removeCartItem(item: any) {
    this.cartService.removeCartItem(item.id);
  }
}
