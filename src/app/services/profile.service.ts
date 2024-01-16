import { BehaviorSubject } from "rxjs";
import { Injectable } from "@angular/core";
import { LocalStorageConfigService } from "./localStorageConfig.service";
import { RequestBase } from "./http/request-base.service";
import { AlertNotificationService } from "./alert-notification.service";
import { URLS } from "../constant/urls";
import { ApiResponse } from "../interfaces/response";

// HttpClient, HttpInterceptor, HttpHandler, HttpRequest, HttpEvent
@Injectable({
  providedIn: "root",
})
export class ProfileService {
  addresses$: BehaviorSubject<any> = new BehaviorSubject([]);
  orders$ = new BehaviorSubject(null);
  profileData = new BehaviorSubject(null);

  constructor(
    private reqBase: RequestBase,
    private toastService: AlertNotificationService,
    private localStorageConfig: LocalStorageConfigService
  ) { }

  // addresses

  addAddress(data: any) {
    this.reqBase.post<any>(URLS.PROFILE.ADDRESSES, data).subscribe({
      next: (res) => {
        this.getAddresses(false)
        this.toastService.toast({ type: 'success', title: "Address Added successful" });
      },
      error: (error: ApiResponse<any>) => {
        if (error.status == 400) {
          error.errors.forEach((message: any) => {
            this.toastService.toast({ type: 'success', title: '', subtitle: typeof message == 'string' ? message : message.message });
          });
        }
      }
    })

  }

  editAddress(data: any) {
    this.reqBase.put(`${URLS.PROFILE.ADDRESSES}/${data.id}`, data).subscribe({
      next: (res) => {
        this.getAddresses(false)
        this.toastService.toast({ type: 'success', title: "Address updated successful" });
      },
      error: (error) => {
        if (error.status == 400) {
          error.errors.forEach((message: any) => {
            this.toastService.toast({ type: 'error', title: '', subtitle: typeof message == 'string' ? message : message.message })
          });
        }
      }
    });
  }

  removeAddress(addressId: any) {
    this.reqBase.delete<any>(`${URLS.PROFILE.ADDRESSES}/${addressId}`).subscribe({
      next: (res) => {
        this.toastService.toast({ type: 'success', title: "Address removed successful" });
        this.getAddresses(false)
      },
      error: (error) => {
        this.toastService.toast({ type: 'error', title: '', subtitle: error?.message ?? '' })
      }
    })
  }


  setDefaultAddress(id: string) {
    this.reqBase.put<any>(
      `${URLS.PROFILE.ADDRESSES}/default/${id}`,
      {}
    ).subscribe({
      next: (res) => {
        console.log("res", res);
        this.getAddresses();
        this.toastService.toast({
          type: 'success',
          title: `Updated successful`,
          subtitle: `${res.data.title} is your default address!!`
        });
      }
    });
  }

  getAddresses(fromCache: boolean = true) {
    try {
      if (!this.localStorageConfig.Token) return
      this.reqBase.get<any>(URLS.PROFILE.ADDRESSES, undefined, false).subscribe({
        next: (res) => {
          this.addresses$.next(res.data);
        },
        error: (error: ApiResponse<any>) => {
          console.log("error", error);
          this.toastService.toast({ type: 'error', title: '', subtitle: error?.message ?? '' })
        }
      })
    } catch (error: any) {
    }
  }

  getProfileData(fromCache: boolean = true) {
    this.reqBase.get<any>(URLS.IDENTITY.GETPROFILE, undefined).subscribe({
      next: (res) => {
        this.profileData.next(res.data);
      }
    });
  }

  getOrders() {
    try {
      this.reqBase.get<any>(`${URLS.ORDER.GET_ORDERS}/${this.localStorageConfig.storeSettings.storeId}`).subscribe({
        next: (res) => {
          this.orders$.next(res.data);
        }
      })
    } catch (error) {
    }
  }
}
