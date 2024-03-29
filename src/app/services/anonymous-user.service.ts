import { LocalStorageConfigService } from './localStorageConfig.service';
import { Observable, Subscription, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { RequestBase } from './http/request-base.service';
import { URLS } from '../constant/urls';
import { VALUES } from '../constant/values';
import { DestroySubscription } from '../utils/destroySubsription';

@Injectable({
  providedIn: 'root'
})
export class AnonymousUserService implements DestroySubscription {

  subscriptions: { [key: string]: Subscription; } = {};
  constructor(private reqBase: RequestBase, private localStorageConfig: LocalStorageConfigService) { }

  createAnonymousUser(storeData: any): Observable<any> {
    if (storeData.storeName != this.localStorageConfig.hostName) this.localStorageConfig.removeItem(VALUES.ANONYMOUS_USER_ID)
    if (!this.localStorageConfig.getData(VALUES.ANONYMOUS_USER_ID)) {
      return this.reqBase.post<any>(URLS.ANONYMOUS_USER, {})
    }
    return of(this.localStorageConfig.getData(VALUES.ANONYMOUS_USER_ID))
  }

}
