import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './views/home/home.component';
import { NavigationComponent } from './views/navigation/navigation.component';
import { PageNotFoundComponent } from './views/page-not-found/page-not-found.component';

import { AuthGuard } from './shared/auth/guards/auth.guard';

const routes: Routes = [
  // views
  // ** Lazy-load:
  // $ ng g m shared/components --route login --module app.module
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  {
    path: '',
    component: NavigationComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'projects',
        loadChildren: () =>
          import('./views/projects/projects.module').then(
            (m) => m.ProjectsModule
          ),
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./views/users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'cables',
        loadChildren: () =>
          import('./views/cables/cables.module').then((m) => m.CablesModule),
      },
      {
        path: 'devices',
        loadChildren: () =>
          import('./views/devices/devices.module').then((m) => m.DevicesModule),
      },
      {
        path: 'networks',
        loadChildren: () =>
          import('./views/networks/networks.module').then(
            (m) => m.NetworksModule
          ),
      },
    ],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./shared/components/login/login.module').then(
        (m) => m.LoginModule
      ),
  },
  {
    path: '**',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
