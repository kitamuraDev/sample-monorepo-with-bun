import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'chart/bar',
    loadComponent: () => import('./chart/bar-chart')
  },
  {
    path: 'chart/pie',
    loadComponent: () => import('./chart/pie-chart')
  },
];
