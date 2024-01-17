import { LocalStorageConfigService } from './localStorageConfig.service';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CartService } from './cart.service';
import { AnonymousUserService } from './anonymous-user.service';
import { environment } from '../../environments/environment.development';
import { URLS } from '../constant/urls';
import { VALUES } from '../constant/values';
import { AlertNotificationService } from './alert-notification.service';
import { RequestBase } from './http/request-base.service';
import { ApiResponse } from '../interfaces/response';
import { mergeMap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private reqBase: RequestBase,
    private alertService: AlertNotificationService,
    private localStorageConfig: LocalStorageConfigService,
    private router: Router,
    private CartService: CartService,
    private http: HttpClient,
    private anonymousUserService: AnonymousUserService) { }


  register(body: any) {
    try {
      this.reqBase.post<any>(URLS.IDENTITY.REGISTER, body).subscribe({
        next: (res) => {
          this.localStorageConfig.setData(VALUES.TOKEN, res.data?.token);
          this.localStorageConfig.setData(VALUES.REFRESH_TOKEN, res.data?.refreshToken);
          this.migrateAnonymous()
          // this.parseToken(res.data?.token)
          this.getUserProfile()
          this.CartService.getCartItems()
          this.alertService.toast({ type: 'success', title: 'Registration Successful', subtitle: 'shop now' })
        },
        error: (error: ApiResponse<any>) => {
          if (error.status == 400) {
            error.errors.forEach((message: any) => {
              this.alertService.toast({ type: 'error', title: '', subtitle: typeof message == 'string' ? message : message.message })
            });
          }
        }
      })

    } catch (error) {
    }
  }

  login(credentials: { userName: string, password: string, userType?: 'client' }) {
    this.reqBase.post<any>(URLS.IDENTITY.LOGIN, credentials).subscribe({
      next: (res) => {
        this.localStorageConfig.setData(VALUES.TOKEN, res.data?.token);
        this.localStorageConfig.setData(VALUES.REFRESH_TOKEN, res.data?.refreshToken);
        this.migrateAnonymous()
        // this.parseToken(res.data?.token)
        this.getUserProfile()
        this.CartService.getCartItems()
        this.alertService.toast({ type: 'success', title: 'Registration Successful', subtitle: 'shop now' })
      },
      error: (error: ApiResponse<any>) => {
        if (error.status == 400) {
          error.errors.forEach((message: any) => {
            this.alertService.toast({ type: 'error', title: '', subtitle: typeof message == 'string' ? message : message.message })
          });
        }
      }
    })
  }

  getUserProfile() {
    this.reqBase.get<any>(URLS.PROFILE.PROFILE).subscribe({
      next: (res) => {
        this.localStorageConfig.setData(VALUES.USER_DATA, JSON.stringify(res.data))
      }
    });
  }

  refreshToken() {
    console.log('refresh token method',);
    // Send a request to the server to obtain a new access token
    return this.http.post<any>(environment.apiURL + URLS.IDENTITY.REFRESH_TOKEN, { token: this.localStorageConfig.Token, refreshToken: this.localStorageConfig.RefreshToken })
  }

  migrateAnonymous() {
    this.reqBase.post<any>(`${URLS.ANONYMOUS_USER}/${this.localStorageConfig.anonyomousUserId}`, {}).subscribe(((res) => this.CartService.getCartItems()))

    // .subscribe({
    //   next: (res) => {
    //     this.CartService.getCartItems()
    //   }
    // })
  }

  logOut() {
    this.localStorageConfig.removeItem(VALUES.TOKEN);
    this.localStorageConfig.removeItem(VALUES.REFRESH_TOKEN);
    this.localStorageConfig.removeItem(VALUES.TOKEN_EXPIRATION);
    this.localStorageConfig.removeItem(VALUES.USER_DATA);
    this.localStorageConfig.removeItem(VALUES.ORDER_ID);
    this.localStorageConfig.removeItem(VALUES.ANONYMOUS_USER_ID);
    this.CartService.cartItems$.next([])
    this.CartService.calcCartTotalCount();
    this.CartService.CalcCartTotalPrice();
    this.anonymousUserService.createAnonymousUser()
    this.router.navigate(['/']);

  }

  // parseToken(token: string) {
  //   const parsedToken: any = jwt_decode(token);
  //   const expireDate = parsedToken.exp;
  //   this.localStorageConfig.setData(VALUES.TOKEN_EXPIRATION, expireDate);
  // }
}
