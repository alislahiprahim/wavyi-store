import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { RequestBase } from "./http/request-base.service";
import { Router } from "@angular/router";
import { Meta, Title } from '@angular/platform-browser';
import { environment } from "../../environments/environment.development";
import { VALUES } from "../constant/values";
import { LocalStorageConfigService } from "./localStorageConfig.service";
import { ApiResponse } from "../interfaces/response";
import { isPlatformBrowser } from "@angular/common";
import { AnonymousUserService } from "./anonymous-user.service";
import { concatMap, finalize, of } from "rxjs";

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  private readonly storeCashingtime = .30;
  constructor(
    private reqBase: RequestBase,
    private router: Router,
    private localStorageConfig: LocalStorageConfigService,
    private titleService: Title,
    @Inject(PLATFORM_ID) private platformId: any,
    private anonymousUser: AnonymousUserService
  ) { }

  getStoreSettings() {
    this.localStorageConfig.loadingStore.set(true);
    // const now = new Date();
    // if (!this.localStorageConfig.storeExists() || !this.localStorageConfig.getData(VALUES.STORE_CACHE_TIME) || parseFloat(this.localStorageConfig.getData(VALUES.STORE_CACHE_TIME) || '') < now.getTime()) {
    this.reqBase.get<any>('').pipe(
      concatMap((res) => {
        if (res.data.storeId) {
          this.localStorageConfig.setData(VALUES.STORE_DATA, JSON.stringify(res.data));
          this.localStorageConfig.setData(VALUES.STORE_ID, res.data.storeId);
          // this.localStorageConfig.setData(VALUES.STORE_CACHE_TIME, new Date().getTime() + this.storeCashingtime * 60 * 1000);
          this.localStorageConfig.setData(VALUES.IS_READY, 1);
        } else {
          this.router.navigate(['/error']);
          this.localStorageConfig.setData(VALUES.IS_READY, 0);
          // Returning an observable with empty result to satisfy concatMap
        }
        return this.anonymousUser.createAnonymousUser();
      })
    ).subscribe({
      next: (res) => {
        // This block will be executed after the last observable completes
        if (res)
          this.localStorageConfig.setData(VALUES.ANONYMOUS_USER_ID, res)
        if (isPlatformBrowser(this.platformId)) {
          const styleTag = document.createElement('style');
          const favIcon: any = document.querySelector('#favIcon');
          document.head.appendChild(styleTag);
          styleTag.innerHTML = this.generateCsstheme(
            this.localStorageConfig.storeSettings?.primaryColour,
            this.localStorageConfig.storeSettings?.secondaryColour,
            this.localStorageConfig.storeSettings?.textStyle
          );
          favIcon.href = (`${environment.imgURL}/${this.localStorageConfig.storeSettings.imageUrl}`);
        }
        this.titleService.setTitle(this.localStorageConfig.storeSettings.storeName ?? 'Store');

        this.localStorageConfig.loadingStore.set(false);
        if (this.router.url.includes('error')) {
          this.router.navigate(['/']);
        }

      }
    })
    // }
  }
  generateCsstheme(primaryColor: string, secondaryColor: string, fontFamily: string): string {
    return `
      :root {
        --theme-primary: ${primaryColor};
        --theme-secondary: ${secondaryColor};
        --theme-primary-darker: darken(${primaryColor}, 10%);
        --theme-secondary-darker: darken(${secondaryColor}, 10%);
        --theme-font:${fontFamily};
      }
    `;
  }
}
