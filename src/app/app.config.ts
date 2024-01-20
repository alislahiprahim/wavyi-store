import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { ROUTES, Routes, provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { ThemeService } from './services/theme.service';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withFetch, withInterceptors, withInterceptorsFromDi } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { VALUES } from './constant/values';
import { subDomainInterceptor } from './services/interceptors/subDomain.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
          allowedDomains: ["example.com"],
          disallowedRoutes: ["http://example.com/examplebadroute/"],
        },
      }),
    ),
    provideHttpClient(
      withInterceptors(
        [subDomainInterceptor]
      ),
      withInterceptorsFromDi(),
      // withFetch()
    ),
    provideRouter(routes),
    // provideClientHydration(),
    {
      provide: ROUTES,
      useFactory: setTheme,
      deps: [ThemeService],
      multi: true
    }, provideAnimations()]
};

function setTheme(themeService: ThemeService): Routes {
  switch (themeService.themeId()) {
    case 1:
      return [
        {
          path: '', loadComponent: () => import('./themes/theme-one/theme-one.component').then(t => t.ThemeOneComponent), children: [
            { path: '', loadChildren: () => import('./themes/theme-one/theme-one.routes').then(r => r.themeOneRoutes) }
          ]
        },
        { path: '**', redirectTo: '' }
      ]
    case 2:
      return [
        {
          path: '', loadComponent: () => import('./themes/theme-two/theme-two.component').then(t => t.ThemeTwoComponent), children: [
            { path: '', loadChildren: () => import('./themes/theme-two/theme-two.routes').then(r => r.themeTwoRoutes) }
          ]
        },
        { path: '**', redirectTo: '' }
      ]
    default:
      return [
        { path: '', loadComponent: () => import('./themes/theme-one/theme-one.component').then(t => t.ThemeOneComponent) },
        { path: '**', redirectTo: '' }
      ]
  }
}

function tokenGetter() {
  return localStorage.getItem(VALUES.TOKEN);
}
