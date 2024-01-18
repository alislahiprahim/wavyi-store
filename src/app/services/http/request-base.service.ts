import { LoaderService } from './../loader.service';
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { ApiResponse } from "../../interfaces/response";
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable, catchError, finalize, throwError } from "rxjs";
import { environment } from "../../../environments/environment.development";
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class RequestBase {

  private apiUrl = environment.apiURL;
  private headers: any;
  private hostName: string = ''
  // Add a default header

  constructor(@Inject(PLATFORM_ID) private platformId: any, private http: HttpClient, private loaderService: LoaderService) {
    if (isPlatformBrowser(this.platformId)) {
      this.hostName = location.host.split('.')[0]
    }
  }

  private getRequestOptions(headers?: HttpHeaders, params?: HttpParams): Object {
    const mergedHeaders = headers ? { ...headers, 'X-Subdomain': this.hostName } : { 'X-Subdomain': this.hostName };
    return {
      headers: mergedHeaders,
      params: params || new HttpParams()
    };
  }

  get<T>(url: string, params?: HttpParams, enableLoader: boolean = true): Observable<ApiResponse<T>> {
    const options = this.getRequestOptions(undefined, params);

    if (enableLoader) {
      this.startLoader();
    }
    return this.http.get<ApiResponse<T>>(`${this.apiUrl}/${url}`, options)
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          if (enableLoader) {
            this.stopLoader();
          }
        })
      );
  }

  post<T>(url: string, data: any, headers?: HttpHeaders, enableLoader: boolean = true): Observable<ApiResponse<T>> {
    const options = this.getRequestOptions(headers);

    if (enableLoader) {
      this.startLoader();
    }

    return this.http.post<ApiResponse<T>>(`${this.apiUrl}/${url}`, data, options)
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          if (enableLoader) {
            this.stopLoader();
          }
        })
      );
  }

  put<T>(url: string, data: any, headers?: HttpHeaders, enableLoader: boolean = true): Observable<ApiResponse<T>> {
    const options = this.getRequestOptions(headers);

    if (enableLoader) {
      this.startLoader();
    }

    return this.http.put<ApiResponse<T>>(`${this.apiUrl}/${url}`, data, options)
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          if (enableLoader) {
            this.stopLoader();
          }
        })
      );
  }

  delete<T>(url: string, headers?: HttpHeaders, enableLoader: boolean = true): Observable<ApiResponse<T>> {
    const options = this.getRequestOptions(headers);

    if (enableLoader) {
      this.startLoader();
    }

    return this.http.delete<ApiResponse<T>>(`${this.apiUrl}/${url}`, options)
      .pipe(
        catchError(this.handleError),
        finalize(() => {
          if (enableLoader) {
            this.stopLoader();
          }
        })
      );
  }

  private handleError(error: HttpErrorResponse): Observable<ApiResponse<any>> {
    const errorMessage = error.error ? error.error.message : 'Server error';
    return throwError({
      success: false,
      message: errorMessage,
      status: error.status,
      errors: error
    });
  }

  private startLoader(): void {
    this.loaderService.loading$.set(true)
    console.log('Loader started');
  }

  private stopLoader(): void {
    this.loaderService.loading$.set(false)
    console.log('Loader stopped');
  }
}

