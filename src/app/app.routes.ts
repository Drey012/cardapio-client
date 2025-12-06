import { Routes } from '@angular/router';
import { MenuListComponent } from './features/menu/menu-list.component';

export const routes: Routes = [
  {
    path: '',
    component: MenuListComponent
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
