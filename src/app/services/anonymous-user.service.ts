import { LocalStorageConfigService } from './localStorageConfig.service';
import { Subscription } from 'rxjs';
import { Injectable } from '@angular/core';
import { RequestBaseService } from './http/request-base.service';
import { URLS } from 'src/app/shared/constant/urls';
import { VALUES } from 'src/app/shared/constant/values';
import { DestroySubscription } from 'src/app/shared/utils/destroySubsription';

@Injectable({
  providedIn: 'root'
})
export class AnonymousUserService implements DestroySubscription {

  subscriptions: { [key: string]: Subscription; } = {};
  constructor(private reqBase: RequestBaseService, private localStorageConfig: LocalStorageConfigService) { }

  async createAnonymousUser() {

    if (!this.localStorageConfig.getData(VALUES.ANONYMOUS_USER_ID)) {
      try {
        const res = await this.reqBase.post(URLS.ANONYMOUS_USER, {});
        this.localStorageConfig.setData(VALUES.ANONYMOUS_USER_ID, res)
      } catch (error) {
        ;
      }

    }
  }

}
