import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './core/guards/auth.guard';
import { DashboardComponent } from './home/private/dashboard/dashboard.component';
import { DroneLibraryComponent } from './home/private/drone-library/drone-library.component';

const routes: Routes = [
  // ✅ Auth & Registration Routes
  {
    path: 'auth',
    loadChildren: () =>
      import('./auth/auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      {
        path: 'drone-library',
        component: DroneLibraryComponent
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: 'auth/account-type',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
