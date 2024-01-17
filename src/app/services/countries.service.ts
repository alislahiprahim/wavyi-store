// import { BehaviorSubject } from 'rxjs';
// import { Injectable } from '@angular/core';
// import { RequestBaseService } from './http/request-base.service';
// import { ToastService } from './toast.service';
// import { Router } from '@angular/router';
// import { URLS } from 'src/app/shared/constant/urls';

// @Injectable({
//   providedIn: 'root'
// })
// export class CountriesService {

//   countries$: BehaviorSubject<any[]> = new BehaviorSubject([]);
//   cities$: BehaviorSubject<any[]> = new BehaviorSubject([]);
//   constructor(private reqBase: RequestBaseService, private toastService: ToastService, private router: Router) { }

//   async getCountries(searchTerm?: string) {
//     try {
//       const res = await this.reqBase.get(URLS.COUNTRIES, { search: searchTerm ?? '', pageSize: 30 });
//       if (res) {
//         this.countries$.next(res.data);
//       }
//     } catch (error: any) {
//       if (error.status == 401) {
//         this.toastService.error('Not authorized!!', 'Login or create account.').then(t => {
//           if (t.isDismissed)
//             this.router.navigate(['/auth'])
//         })
//       }
//     }
//   }

//   async getCitiesBycountry(id: any, searchTerm?: string) {
//     try {
//       const res = await this.reqBase.get(`${URLS.COUNTRIES}/${id}/${URLS.CITIES}`, { search: searchTerm ?? '' });
//       if (res) {
//         this.cities$.next(res.data);
//       }
//     } catch (error: any) {
//       if (error.status == 401) {
//         this.toastService.error('Not authorized!!', 'Login or create account.')
//       }
//     }
//   }

// }
