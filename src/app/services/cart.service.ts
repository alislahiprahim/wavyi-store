// import { Injectable } from '@angular/core';
// import { RequestBaseService } from './http/request-base.service';
// import { LocalStorageConfigService } from './localStorageConfig.service';
// import { BehaviorSubject, Subject } from 'rxjs';
// import { ToastService } from './toast.service';
// import { Router } from '@angular/router';
// import { URLS } from 'src/app/shared/constant/urls';
// import { VALUES } from 'src/app/shared/constant/values';

// export interface CartData {
//   productItemId: string,
//   quantity: number,
//   selectionVariationOptions?: { variationOptionId: string, variantId: string }[]
// }

// export interface CartDataWithoutVariantId extends Omit<CartData, 'selectionVariationOptions'> {
//   selectionVariationOptions?: { variationOptionId: string }[];
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class CartService {

//   cartItems$: BehaviorSubject<any[]> = new BehaviorSubject([])
//   cartTotalItemCount: number = 0;
//   cartTotalPrice: number = 0;
//   itemAddedToCart$: Subject<boolean> = new Subject();
//   order$: BehaviorSubject<any[]> = new BehaviorSubject([])
//   constructor(
//     private localStorageConfig: LocalStorageConfigService,
//     private reqBase: RequestBaseService,
//     private toastService: ToastService,
//     private router: Router) {
//   }

//   addToCart(cartData: CartDataWithoutVariantId) {
//     let url: any = '';
//     this.localStorageConfig.Token ? url = `${URLS.USER}/${URLS.CART}/${this.localStorageConfig.storeSettings.storeId}` : url = `${URLS.ANONYMOUS_USER}/${this.localStorageConfig.anonyomousUserId}/${URLS.CART}/${this.localStorageConfig.storeSettings.storeId}`;
//     this.reqBase.post(url, cartData)
//       .then(res => {
//         ;
//         this.itemAddedToCart$.next(true);
//         this.getCartItems()
//         this.toastService.toast('success', 'Item added to cart', '')
//       }).catch(err => {
//         ;
//         if (err.status == 400)
//           this.toastService.error('', err.error.message)
//       })
//   }

//   async getCartItems() {
//     let url: any = '';
//     this.localStorageConfig.Token ? url = `GetUserCart/${URLS.USER}/${URLS.CART}/${this.localStorageConfig.storeSettings.storeId}` : url = `${URLS.ANONYMOUS_USER}/${this.localStorageConfig.anonyomousUserId}/${URLS.CART}`;
//     try {
//       const res = await this.reqBase.get(url, {},);
//       this.cartItems$.next(res.data);
//       this.CalcCartTotalPrice();
//       this.calcCartTotalCount();
//     } catch (error) {
//       // this.toastrService.error('getCartProducts error from service : ', error)
//     }
//   }

//   async removeCartItem(itemId: string) {
//     let url: any = '';
//     this.localStorageConfig.Token ? url = `${URLS.USER}/${URLS.CART}` : url = `${URLS.ANONYMOUS_USER}/${this.localStorageConfig.anonyomousUserId}/${URLS.CART}`;
//     try {
//       const res = await this.reqBase.delete(`${url}/${itemId}`, {});
//       ;
//       if (res) {
//         const cartItems = this.cartItems$.getValue().filter(i => i.id != itemId)
//         this.cartItems$.next(cartItems);
//         this.CalcCartTotalPrice();
//         this.calcCartTotalCount();
//       }
//     } catch (error) {
//       ;
//       // this.toastrService.error('deleteProductCart error from service : ', error)
//     }
//   }

//   async udpateCart(itemId: string, quantity: number) {
//     let url: any = '';
//     this.localStorageConfig.Token ? url = `${URLS.USER}/${URLS.CART}` : url = `${URLS.ANONYMOUS_USER}/${this.localStorageConfig.anonyomousUserId}/${URLS.CART}`;
//     try {
//       const res = await this.reqBase.put(`${url}/${itemId}`, { quantity });
//       if (res) {
//         const cartItems: any = this.cartItems$.getValue().map(item => {
//           if (item.id === itemId) {
//             return { ...item, quantity };
//           }
//           return item;
//         })

//         this.cartItems$.next(cartItems)
//         this.CalcCartTotalPrice();
//         this.calcCartTotalCount();
//       }
//     } catch (error) {
//       // this.toastrService.error('error : ', error)
//     }
//   }


//   async checkOut(data: { userAddressId: string, promoCode?: string }) {
//     if (!this.localStorageConfig.Token) {
//       this.toastService.info('Not logged in!!', 'Sign in or Create new account.', { showConfirmButton: true, confirmButtonText: 'Sign in' }).then(result => {
//         result.isConfirmed ? this.router.navigate(['/auth']) : null
//       })
//       return
//     }
//     try {
//       const res = await this.reqBase.post(`${URLS.ORDER.CREATE_ORDER}/${this.localStorageConfig.storeSettings.storeId}`);
//       if (res) {
//         this.localStorageConfig.setData(VALUES.ORDER_ID, res.message);
//         await this.updateOrder(res.message, data)
//         this.getCartItems()
//       }
//     } catch (error) {
//       this.toastService.error('', error.error.errors[0].message);
//     }
//   }

//   async updateOrder(orderId: any, data: any) {
//     try {
//       const res = await this.reqBase.put(`${URLS.ORDER.ORDER}/${orderId}`, data);
//       if (res) {

//         this.router.navigate(['/shop/orders', orderId])
//       }
//     } catch (error) {
//       this.toastService.error('', error.error.errors[0].message);

//     }
//   }

//   async getOrderSummary(orderId: any) {
//     if (!this.localStorageConfig.Token) {
//       this.toastService.info('Not logged in!!', 'Sign in or Create new account.', { showConfirmButton: true, confirmButtonText: 'Sign in' }).then(result => {
//         result.isConfirmed ? this.router.navigate(['/auth']) : null
//       })
//       return
//     }
//     try {
//       const res = await this.reqBase.get(`${URLS.ORDER.SUMMARY}/${orderId}`);
//       if (res) {
//         this.order$.next(res.data);
//       }
//     } catch (error) {
//       // this.toastService.error(error.status, error.error.message);

//     }
//   }
//   async getOrderDetails(orderId: any) {
//     if (!this.localStorageConfig.Token) {
//       this.toastService.info('Not logged in!!', 'Sign in or Create new account.', { showConfirmButton: true, confirmButtonText: 'Sign in' }).then(result => {
//         result.isConfirmed ? this.router.navigate(['/auth']) : null
//       })
//       return
//     }
//     try {
//       const res = await this.reqBase.get(`${URLS.ORDER.DETAILS}/${orderId}`);
//       if (res) {
//         this.order$.next(res.data);
//       }
//     } catch (error) {
//       this.toastService.error(error.status, error.error);

//     }
//   }

//   async confirmOrder(orderId: any, data: any) {
//     try {
//       const res = await this.reqBase.put(`${URLS.ORDER.ORDER}/${orderId}/payment`, data);
//       if (res) {
//         this.toastService.success('Order created', 'Your order has been added successfully!!').then(_ => { this.router.navigate(['/profile', 1]) })

//       }
//     } catch (error) {
//       this.toastService.error('', error.error.errors[0].message);

//     }
//   }

//   // utils

//   CalcCartTotalPrice() {
//     this.cartTotalPrice = 0
//     this.cartItems$.getValue().forEach(element => {
//       this.cartTotalPrice += element.quantity * element.productItem.price;
//     });
//   }

//   calcCartTotalCount() {
//     this.cartTotalItemCount = 0;
//     this.cartItems$.getValue().forEach(element => {
//       this.cartTotalItemCount += element.quantity;
//     });
//   }
// }
