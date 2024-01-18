import { CommonModule, NgFor, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { OverlayComponent } from '../overlay/overlay.component';
import { LocalStorageConfigService } from '../../services/localStorageConfig.service';
import { AuthModalService } from '../../services/auth-modal.service';
import { DialogModule } from '@angular/cdk/dialog';
import { CategoryServices } from '../../services/category.service';
import { CollapseComponent } from '../collapse/collapse.component';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [OverlayComponent, NgIf, NgFor,DialogModule,CollapseComponent],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SidenavComponent {
  
  constructor(public categoryService: CategoryServices,private authService:AuthService,public localStorageConfig:LocalStorageConfigService,public authModal:AuthModalService ){}

  logOut() {
    this.authService.logOut();
  }
}

