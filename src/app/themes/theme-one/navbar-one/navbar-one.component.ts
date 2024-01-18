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
import { NavbarCartComponent } from '../../../components/navbar-cart/navbar-cart.component';
import { NavbarProfileComponent } from '../../../components/navbar-profile/navbar-profile.component';
import { SidenavComponent } from '../../../components/sidenav/sidenav.component';

@Component({
  selector: 'app-navbar-one',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    NgFor,
    DropdownComponent,
    ImgBaseUrlPipe,
    CollapseComponent,
    NavbarCartComponent,
    NavbarProfileComponent,
    SidenavComponent
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
    if (window.pageYOffset >= 120) { // Adjust the scroll threshold as needed
      this.isNavbarFixed = true;
    } else {
      this.isNavbarFixed = false;
    }
  }

  constructor(
    public localStorageConfig: LocalStorageConfigService,
    public categoryService: CategoryServices,
  ) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories();
  }



}
