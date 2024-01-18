import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { AuthUiComponent } from '../../auth/auth-ui/auth-ui.component';
import { LocalStorageConfigService } from '../../services/localStorageConfig.service';
import { AuthService } from '../../services/auth.service';
import { AuthModalService } from '../../services/auth-modal.service';

@Component({
  selector: 'app-navbar-profile',
  standalone: true,
  imports: [
    MatMenuModule,
    MatDialogModule,
    NgIf
  ],
  templateUrl: './navbar-profile.component.html',
  styleUrl: './navbar-profile.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarProfileComponent {

  constructor(
    public localStorageConfig: LocalStorageConfigService,
    public authModal:AuthModalService,
    private authService:AuthService
  ) { }


  logOut() {
    this.authService.logOut();
  }

}
