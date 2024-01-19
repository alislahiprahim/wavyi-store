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
import { Observable, concatMap, finalize, of } from "rxjs";

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

  getStoreSettings(): Observable<any> {
    return this.reqBase.get<any>('')
  }

  setStoreSetings(storeData: any) {
     this.localStorageConfig.setData(VALUES.STORE_DATA, JSON.stringify(storeData));
    this.localStorageConfig.setData(VALUES.STORE_ID, storeData.storeId);
    // this.localStorageConfig.setData(VALUES.STORE_CACHE_TIME, new Date().getTime() + this.storeCashingtime * 60 * 1000);
    this.localStorageConfig.setData(VALUES.IS_READY, 1);
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
