import { Injectable } from "@angular/core";
import { RequestBase } from "./http/request-base.service";
import { Router } from "@angular/router";
import { Meta, Title } from '@angular/platform-browser';
import { environment } from "../../environments/environment.development";
import { VALUES } from "../constant/values";
import { LocalStorageConfigService } from "./localStorageConfig.service";
import { ApiResponse } from "../interfaces/response";

@Injectable({
  providedIn: 'root'
})

export class StoreService {

  private readonly storeCashingtime = .30;
  constructor(
    private reqBase: RequestBase,
    private router: Router,
    private localStorageConfig: LocalStorageConfigService,
    private titleService: Title
  ) { }

  getStoreSettings() {
    this.localStorageConfig.loadingStore.next(true);
    const now = new Date();
    if (!this.localStorageConfig.storeExists() || !this.localStorageConfig.getData(VALUES.STORE_CACHE_TIME) || parseFloat(this.localStorageConfig.getData(VALUES.STORE_CACHE_TIME) || '') < now.getTime()) {
      this.reqBase.get<any>('').subscribe({
        next: (res) => {
          if (res.data.storeId) {
            this.localStorageConfig.setData(VALUES.STORE_DATA, JSON.stringify(res.data))
            this.localStorageConfig.setData(VALUES.STORE_ID, res.data.storeId)
            this.localStorageConfig.setData(VALUES.STORE_CACHE_TIME, new Date().getTime() + this.storeCashingtime * 60 * 1000)
            this.localStorageConfig.setData(VALUES.IS_READY, 1)

            this.localStorageConfig.loadingStore.next(false);
            const styleTag = document.createElement('style');
            const favIcon: any = document.querySelector('#favIcon');
            document.head.appendChild(styleTag);
            styleTag.innerHTML = this.generateCsstheme(this.localStorageConfig.storeSettings?.primaryColour, this.localStorageConfig.storeSettings?.secondaryColour, this.localStorageConfig.storeSettings?.textStyle);

            favIcon.href = (`${environment.imgURL}/${this.localStorageConfig.storeSettings.imageUrl}`);
            this.titleService.setTitle(this.localStorageConfig.storeSettings.storeName ?? 'Store');

            if (this.router.url.includes('error')) {
              this.router.navigate(['/'])
            }

          } else {
            this.router.navigate(['/error'])
            this.localStorageConfig.setData(VALUES.IS_READY, 0)
          }
        },
        error: (error: ApiResponse<any>) => {
          if (error.status == 404) {
            this.localStorageConfig.removeItem(VALUES.STORE_ID)
            this.router.navigate(['/error'])
            this.localStorageConfig.setData(VALUES.IS_READY, 0)
          }
        }
      })
    }
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
