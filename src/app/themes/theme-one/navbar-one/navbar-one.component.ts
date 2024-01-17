import { AsyncPipe, CommonModule, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageConfigService } from '../../../services/localStorageConfig.service';
import { DropdownComponent } from '../../../components/dropdown/dropdown.component';
import { CategoryServices } from '../../../services/category.service';
import { ImgBaseUrlPipe } from '../../../pipes/img-base-url.pipe';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../services/auth.service';
import { Router } from 'express';
import { CartService } from '../../../services/cart.service';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthUiComponent } from '../../../auth/auth-ui/auth-ui.component';
import { Menu } from '../../../interfaces/menu';
import { StCurrencyPipe } from '../../../pipes/st-currency.pipe';
import { OverlayComponent } from '../../../components/overlay/overlay.component';
import { CollapseComponent } from '../../../components/collapse/collapse.component';

@Component({
  selector: 'app-navbar-one',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    NgFor,
    DropdownComponent,
    AsyncPipe,
    ImgBaseUrlPipe,
    MatMenuModule,
    MatDialogModule,
    StCurrencyPipe,
    DecimalPipe,
    OverlayComponent,
    CollapseComponent
  ],
  templateUrl: './navbar-one.component.html',
  styleUrl: './navbar-one.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarOneComponent {

  isNavbarFixed = false;
  menuItems!: Menu[];
  @HostListener('window:scroll', [])
  onScroll(): void {
    // Check the scroll position
    // if (window.pageYOffset >= 120) { // Adjust the scroll threshold as needed
    //   this.isNavbarFixed = true;
    // } else {
    //   this.isNavbarFixed = false;
    // }
  }

  constructor(
    public localStorageConfig: LocalStorageConfigService,
    public categoryService: CategoryServices,
    private authService: AuthService,
    public cartService: CartService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.cartService.getCartItems()

  }

  openAuth(type: 'login' | 'register') {
    const modalRef = this.dialog.open(AuthUiComponent)
    modalRef.componentInstance.type = type;
  }


  removeCartItem(item: any) {
    this.cartService.removeCartItem(item.id);
  }

  logOut() {
    this.authService.logOut();
  }

}
