import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './components/loader/loader.component';
import { StoreService } from './services/store.service';
import { LocalStorageConfigService } from './services/localStorageConfig.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, LoaderComponent, AsyncPipe, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  loading$ = inject(LoaderService).loading$

  constructor(private storeService: StoreService, public localstorgConfig: LocalStorageConfigService) { }
  ngOnInit(): void {
    this.storeService.getStoreSettings()
  }
}
