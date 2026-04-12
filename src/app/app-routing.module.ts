import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'showcase',
    loadComponent: () => import('./pages/showcase/showcase.component').then((m) => m.ShowcaseComponent)
  },
  {
    path: '',
    redirectTo: '/showcase',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
