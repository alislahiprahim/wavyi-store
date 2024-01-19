import { Injectable } from '@angular/core';
import { RequestBase } from './http/request-base.service';
import { Observable, catchError, map, of } from 'rxjs';
import { URLS } from '../constant/urls';
import { LocalStorageConfigService } from './localStorageConfig.service';
import { VALUES } from '../constant/values';

@Injectable()
export class HomeService {

  constructor(private reqBase: RequestBase, private LocalStorageConfig: LocalStorageConfigService) { }

  getPosters(): Observable<any> {
    return this.reqBase.get(URLS.POSTERS + `/${this.LocalStorageConfig.getData(VALUES.STORE_ID)}`).pipe(
      map((res) => { return { data: res.data, message: '', status: true } }),
      catchError((error: any) => {
        return of({ data: [], message: 'no data...', status: false })
      })
    );
  }

}
