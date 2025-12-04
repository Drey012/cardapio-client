import { Routes } from '@angular/router';
import { MenuListComponent } from './features/menu/menu-list.component';
import { MenuDetailComponent } from './features/menu/menu-detail.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuListComponent
  },
  {
    path: 'menu/:id',
    component: MenuDetailComponent
  },
  {
    path: 'menu',
    component: MenuListComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
];
