import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'showcase',
    loadComponent: () => import('./pages/showcase/showcase.component').then((m) => m.ShowcaseComponent)
  },
  {
    path: 'docs',
    loadComponent: () => import('./pages/docs/docs.component').then((m) => m.DocsComponent)
  },
  {
    path: '',
    redirectTo: '/showcase',
    pathMatch: 'full'
  }
];
