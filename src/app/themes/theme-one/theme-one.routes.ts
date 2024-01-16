import { Routes } from '@angular/router';
import { HomeOneComponent } from './home-one/home-one.component';

export const themeOneRoutes: Routes = [
  { path: '', component: HomeOneComponent },
  { path: 'products', loadComponent: () => import('./products-one/products-one.component').then(c => c.ProductsOneComponent) }
];
