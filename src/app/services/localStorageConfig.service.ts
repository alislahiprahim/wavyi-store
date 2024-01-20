import { isPlatformBrowser } from "@angular/common";
import { Injectable, PLATFORM_ID, Inject, signal } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, Subject } from "rxjs";
import { VALUES } from "../constant/values";

@Injectable({ providedIn: 'root' })

export class LocalStorageConfigService {

  isBrowser: boolean = false;
  loadingStore = signal<boolean>(false);

  constructor(private router: Router, @Inject(PLATFORM_ID) platformId: Object,) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  setData(key: string, value: any) {
    this.isBrowser && localStorage.setItem(key, value);
  }

  removeItem(key: string) {
    return this.isBrowser && localStorage.removeItem(key)
  }

  getData(key: string) {
    return this.isBrowser && localStorage.getItem(key)
  }

  get anonyomousUserId() {
    return (this.isBrowser && localStorage.getItem(VALUES.ANONYMOUS_USER_ID)) ?? ''
  }

  get Token() {
    return (this.isBrowser && localStorage.getItem(VALUES.TOKEN)) ?? ''
  }

  get RefreshToken() {
    return (this.isBrowser && localStorage.getItem(VALUES.REFRESH_TOKEN)) ?? ''
  }

  // get isTokenExpired(): boolean {
  //   const expirationDate = new Date(parseFloat(this.isBrowser && localStorage.getItem(VALUES.TOKEN_EXPIRATION)) * 1000);
  //   const currentDate = new Date();
  //   return currentDate > expirationDate;
  // }

  get userData(): any {
    if (this.isBrowser && localStorage.getItem(VALUES.USER_DATA) != 'undefined')
      return JSON.parse((this.isBrowser && localStorage.getItem(VALUES.USER_DATA)) || '') ?? '{}';
    return "{}"
  }

  storeExists(): boolean {
    return !!this.isBrowser && !!localStorage.getItem(VALUES.STORE_ID) && !!this.isBrowser && !!localStorage.getItem(VALUES.IS_READY) && !!JSON.parse((this.isBrowser && localStorage.getItem(VALUES.STORE_DATA) || ''))?.storeId
  }

  get storeSettings() {
    return JSON.parse((this.isBrowser && localStorage.getItem(VALUES.STORE_DATA) || '{}'));
  }

  get currency(): string {
    const storeData: any = JSON.parse((this.isBrowser && localStorage.getItem(VALUES.STORE_DATA) || ''));
    return storeData?.storeCurrencySymbol ?? 'L.E';
  }

  navigate(url: string, params?: any, queryParams?: Record<string, string | undefined>) {
    if (!url) {
      this.router.navigate(['/']);
      return
    }
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(params ? [url, params] : [url], { queryParams });
    });
  }

  get hostName(): string {
    return this.isBrowser ? location.host.split('.')[0] : '';
  }

}
