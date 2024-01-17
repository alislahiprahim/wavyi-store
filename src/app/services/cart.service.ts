import { Injectable } from '@angular/core';
import { RequestBase } from './http/request-base.service';
import { LocalStorageConfigService } from './localStorageConfig.service';
import { BehaviorSubject, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AlertNotificationService } from './alert-notification.service';
import { URLS } from '../constant/urls';
import { VALUES } from '../constant/values';

export interface CartData {
  productItemId: string,
  quantity: number,
  selectionVariationOptions?: { variationOptionId: string, variantId: string }[]
}

export interface CartDataWithoutVariantId extends Omit<CartData, 'selectionVariationOptions'> {
  selectionVariationOptions?: { variationOptionId: string }[];
}

@Injectable({
  providedIn: 'root'
})
export class CartService {

  cartItems$: BehaviorSubject<any> = new BehaviorSubject([])
  cartTotalItemCount: number = 0;
  cartTotalPrice: number = 0;
  itemAddedToCart$: Subject<boolean> = new Subject();
  order$: BehaviorSubject<any> = new BehaviorSubject([])
  constructor(
    private localStorageConfig: LocalStorageConfigService,
    private reqBase: RequestBase,
    private toastService: AlertNotificationService,
    private router: Router) {
  }

  addToCart(cartData: CartDataWithoutVariantId) {
    let url: any = '';
    this.localStorageConfig.Token ? url = `${URLS.USER}/${URLS.CART}/${this.localStorageConfig.storeSettings.storeId}` : url = `${URLS.ANONYMOUS_USER}/${this.localStorageConfig.anonyomousUserId}/${URLS.CART}/${this.localStorageConfig.storeSettings.storeId}`;
    this.reqBase.post(url, cartData).subscribe({
      next: (res) => {
        this.itemAddedToCart$.next(true);
        this.getCartItems()
        this.toastService.toast({ type: 'success', title: 'Item added to cart' })
      },
      error: (error) => {
        if (error.status == 400)
          this.toastService.toast({ type: 'error', title: '', subtitle: error.error.message ?? '' })
      }
    })
  }

  getCartItems() {
    let url: any = '';
    this.localStorageConfig.Token ? url = `GetUserCart/${URLS.USER}/${URLS.CART}/${this.localStorageConfig.storeSettings.storeId}` : url = `${URLS.ANONYMOUS_USER}/${this.localStorageConfig.anonyomousUserId}/${URLS.CART}`;

    console.log('url', url);
    this.reqBase.get(url).subscribe({
      next: (res) => {
        this.cartItems$.next(res.data);
        this.CalcCartTotalPrice();
        this.calcCartTotalCount();
      }, error: (error) => {
        // console.log('error', error);
      }
    });

  }

  removeCartItem(itemId: string) {
    let url: any = '';
    this.localStorageConfig.Token ? url = `${URLS.USER}/${URLS.CART}` : url = `${URLS.ANONYMOUS_USER}/${this.localStorageConfig.anonyomousUserId}/${URLS.CART}`;

    this.reqBase.delete(`${url}/${itemId}`).subscribe({
      next: (res) => {
        const cartItems = this.cartItems$.getValue().filter((i: any) => i.id != itemId)
        this.cartItems$.next(cartItems);
        this.CalcCartTotalPrice();
        this.calcCartTotalCount();
      }
    })
  }

  udpateCart(itemId: string, quantity: number) {
    let url: any = '';
    this.localStorageConfig.Token ? url = `${URLS.USER}/${URLS.CART}` : url = `${URLS.ANONYMOUS_USER}/${this.localStorageConfig.anonyomousUserId}/${URLS.CART}`;

    this.reqBase.put(`${url}/${itemId}`, { quantity }).subscribe({
      next: (res) => {

        const cartItems: any = this.cartItems$.getValue().map((item: any) => {
          if (item.id === itemId) {
            return { ...item, quantity };
          }
          return item;
        })

        this.cartItems$.next(cartItems)
        this.CalcCartTotalPrice();
        this.calcCartTotalCount();
      }
    });
  }


  checkOut(data: { userAddressId: string, promoCode?: string }) {
    if (!this.localStorageConfig.Token) {
      this.toastService.toast({ type: 'info', title: 'Not logged in!!', subtitle: 'Sign in or Create new account.', options: { showConfirmButton: true, confirmButtonText: 'Sign in' } }).then(result => {
        result.isConfirmed ? this.router.navigate(['/auth']) : null
      })
      return
    }
    try {
      this.reqBase.post(`${URLS.ORDER.CREATE_ORDER}/${this.localStorageConfig.storeSettings.storeId}`, undefined).subscribe({
        next: (res) => {
          this.localStorageConfig.setData(VALUES.ORDER_ID, res.message);
          this.updateOrder(res.message, data)
          this.getCartItems()
        },
        error: (error) => {
          this.toastService.toast({ type: 'error', title: '', subtitle: error.errors[0].message });
        }
      });
    } catch (error) {
    }
  }

  updateOrder(orderId: any, data: any) {
    try {
      this.reqBase.put(`${URLS.ORDER.ORDER}/${orderId}`, data).subscribe({
        next: (res) => {
          this.router.navigate(['/shop/orders', orderId])
        },
        error: (error) => {
          this.toastService.toast({ type: 'error', title: '', subtitle: error.errors[0].message });
        }
      })
    } catch (error) {

    }
  }

  getOrderSummary(orderId: any) {
    if (!this.localStorageConfig.Token) {
      this.toastService.toast({ type: 'info', title: 'Not logged in!!', subtitle: 'Sign in or Create new account.', options: { showConfirmButton: true, confirmButtonText: 'Sign in' } }).then(result => {
        result.isConfirmed ? this.router.navigate(['/auth']) : null
      })
      return
    }
    this.reqBase.get(`${URLS.ORDER.SUMMARY}/${orderId}`).subscribe({
      next: (res) => {
        this.order$.next(res.data);
      }
    })
  }

  getOrderDetails(orderId: any) {
    if (!this.localStorageConfig.Token) {
      this.toastService.toast({ type: 'info', title: 'Not logged in!!', subtitle: 'Sign in or Create new account.', options: { showConfirmButton: true, confirmButtonText: 'Sign in' } }).then(result => {
        result.isConfirmed ? this.router.navigate(['/auth']) : null
      })
      return
    }
    this.reqBase.get(`${URLS.ORDER.DETAILS}/${orderId}`).subscribe({
      next: (res) => {
        this.order$.next(res.data);
      },
      error: (error) => {
        this.toastService.toast({ type: 'error', title: '', subtitle: error?.errors });
      }
    })
  }

  confirmOrder(orderId: any, data: any) {
    this.reqBase.put(`${URLS.ORDER.ORDER}/${orderId}/payment`, data).subscribe({
      next: (res) => {
        this.toastService.toast({ title: 'Order created', subtitle: 'Your order has been added successfully!!' }).then(_ => { this.router.navigate(['/profile', 1]) })
      },
      error: (error) => {
        this.toastService.toast({ type: 'error', title: '', subtitle: error.errors[0].message });
      }
    });


  }

  // utils

  CalcCartTotalPrice() {
    this.cartTotalPrice = 0
    this.cartItems$.getValue().forEach((element: any) => {
      this.cartTotalPrice += element.quantity * element.productItem.price;
    });
  }

  calcCartTotalCount() {
    this.cartTotalItemCount = 0;
    this.cartItems$.getValue().forEach((element: any) => {
      this.cartTotalItemCount += element.quantity;
    });
  }
}
