import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LocalStorageConfigService } from '../../../services/localStorageConfig.service';
import { DropdownComponent } from '../../../components/dropdown/dropdown.component';
import { CategoryServices } from '../../../services/category.service';
import { ImgBaseUrlPipe } from '../../../pipes/img-base-url.pipe';

@Component({
  selector: 'app-navbar-one',
  standalone: true,
  imports: [
    RouterModule,
    NgIf,
    DropdownComponent,
    AsyncPipe,
    ImgBaseUrlPipe
  ],
  templateUrl: './navbar-one.component.html',
  styleUrl: './navbar-one.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarOneComponent {
  isNavbarFixed: boolean = false;
  constructor(public localStorageConfig: LocalStorageConfigService, public categoryService: CategoryServices) { }
}
