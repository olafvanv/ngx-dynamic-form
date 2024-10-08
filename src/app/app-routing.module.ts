import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NonDynamicFormComponent } from './pages/non-dynamic-form/non-dynamic-form.component';
import { SearchFormComponent } from './pages/search-form/search-form.component';
import { SimpleFormComponent } from './pages/simple-form/simple-form.component';

const routes: Routes = [
  {
    path: 'non-dynamic',
    component: NonDynamicFormComponent
  },
  {
    path: 'simple-form',
    component: SimpleFormComponent
  },
  {
    path: 'search-form',
    component: SearchFormComponent
  },
  {
    path: '',
    redirectTo: '/simple-form',
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
