import { LocalStorageConfigService } from './../localStorageConfig.service';
import { isPlatformBrowser } from '@angular/common';
import type { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';

export const subDomainInterceptor: HttpInterceptorFn = (req, next) => {


  const localStorageConfig = inject(LocalStorageConfigService)

  const modifiedRequest = req.clone({
    setHeaders: { 'X-Subdomain': localStorageConfig.hostName },
  });

  return next(modifiedRequest);
};
