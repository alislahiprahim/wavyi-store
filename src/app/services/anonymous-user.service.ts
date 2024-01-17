import { LocalStorageConfigService } from './localStorageConfig.service';
import { Subscription } from 'rxjs';
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

  createAnonymousUser() {
    if (!this.localStorageConfig.getData(VALUES.ANONYMOUS_USER_ID)) {

      this.reqBase.post<any>(URLS.ANONYMOUS_USER, {}).subscribe({
        next: (res) => {
          this.localStorageConfig.setData(VALUES.ANONYMOUS_USER_ID, res.data)
        }
      });


    }
  }

}
