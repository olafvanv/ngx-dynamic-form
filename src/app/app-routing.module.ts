import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrudDemoComponent } from './pages/crud-demo/crud-demo.component';
import { SearchFormComponent } from './pages/search-form/search-form.component';
import { SimpleFormComponent } from './pages/simple-form/simple-form.component';

const routes: Routes = [
  {
    path: 'simple-form',
    component: SimpleFormComponent
  },
  {
    path: 'search-form',
    component: SearchFormComponent
  },
  {
    path: 'crud-demo',
    component: CrudDemoComponent
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
