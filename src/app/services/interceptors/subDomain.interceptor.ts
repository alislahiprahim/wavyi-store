import { isPlatformBrowser } from '@angular/common';
import type { HttpInterceptorFn } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';

export const subDomainInterceptor: HttpInterceptorFn = (req, next) => {

  const platformId = inject(PLATFORM_ID);
  let hostName = '';
  if (isPlatformBrowser(platformId)) {
    hostName = location.host.split('.')[0]
  }

  const modifiedRequest = req.clone({
    setHeaders: { 'X-Subdomain': hostName },
  });
  console.log('modifiedRequest', modifiedRequest);

  return next(modifiedRequest);
};
