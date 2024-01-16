import { Injectable } from '@angular/core';
import Swal, { SweetAlertOptions } from 'sweetalert2';


@Injectable({
  providedIn: 'root',
})
export class AlertNotificationService {

  toast({
    title,
    subtitle = '',
    type = 'success',
    options = {},
  }: {
    title: string;
    subtitle?: string;
    type?: 'success' | 'error' | 'warning' | 'info' | 'question';
    options?: SweetAlertOptions;
  }) {
    return Swal.fire({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      title,
      text: subtitle,

      customClass: {
        title: 'swal-custom-class',
        htmlContainer: 'swal-html-container',
      },

      icon: type,
      ...options,
    });
  }

  confirm({
    title,
    type = 'success',
    options = {},
  }: {
    title: string;
    type?: 'success' | 'error' | 'warning' | 'info' | 'question';
    options?: SweetAlertOptions;
  }) {
    return Swal.fire({
      title,
      showCancelButton: true,
      confirmButtonText: 'ok',
      cancelButtonText: 'cancel',
      cancelButtonColor: '#7987a1',
      customClass: type == 'error' ? 'Custom_Cancel' : '',
      icon: type,
      ...options,
    });
  }

  alert({
    title,
    text = '',
    type = 'success',
    options = {},
  }: {
    title: string;
    text?: string;
    type?: 'success' | 'error' | 'warning' | 'info' | 'question';
    options?: SweetAlertOptions;
  }) {
    return Swal.fire({
      title,
      text,
      showCancelButton: false,
      confirmButtonText: 'cancel',
      icon: type,
      ...options,
    });
  }
}
