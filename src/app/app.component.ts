import { Component, OnInit, inject } from '@angular/core';
import { AsyncPipe, CommonModule, NgIf } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { LoaderService } from './services/loader.service';
import { LoaderComponent } from './components/loader/loader.component';
import { StoreService } from './services/store.service';
import { LocalStorageConfigService } from './services/localStorageConfig.service';
import { shareReplay, switchMap, tap } from 'rxjs';
import { AnonymousUserService } from './services/anonymous-user.service';
import { VALUES } from './constant/values';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [NgIf, LoaderComponent, AsyncPipe, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  loading$ = inject(LoaderService).loading$

  constructor(private storeService: StoreService, private anonymousUser: AnonymousUserService, public localstorgConfig: LocalStorageConfigService) { }
  ngOnInit(): void {
    this.storeService.getStoreSettings()
      .pipe(
        tap((res) => {
          console.log('res', res);
          this.storeService.setStoreSetings(res.data)
        }),
        switchMap((storeData: any) => this.anonymousUser.createAnonymousUser()))
      .subscribe(userId => this.localstorgConfig.setData(VALUES.ANONYMOUS_USER_ID, userId));
  }
}
