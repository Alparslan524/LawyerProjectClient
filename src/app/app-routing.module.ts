import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin/components/admin-home/admin-home.component';
import { AuthGuard } from './guards/auth.guard';
import { RegisterComponent } from './ui/components/register/register.component';
import { SidebarComponent } from './ui/components/sidebar/sidebar.component';

const routes: Routes = [

  { path: "", component: RegisterComponent, pathMatch: 'full' },
  {
    path: "sidebar", component: SidebarComponent, canActivate: [AuthGuard], children: [
      { path: "advert", loadChildren: () => import("./ui/components/advert/advert.module").then(module => module.AdvertModule), canActivate: [AuthGuard] },
      { path: "calculation", loadChildren: () => import("./ui/components/calculation/calculation.module").then(module => module.CalculationModule), canActivate: [AuthGuard] },
      { path: "petition", loadChildren: () => import("./ui/components/petition/petition.module").then(module => module.PetitionModule), canActivate: [AuthGuard] },
      { path: "case", loadChildren: () => import("./ui/components/case/case.module").then(module => module.CaseModule), canActivate: [AuthGuard] },
      { path: "myadvert", loadChildren: () => import("./ui/components/my-advert/my-advert.module").then(module => module.MyAdvertModule), canActivate: [AuthGuard] },
      { path: "profile", loadChildren: () => import("./ui/components/profile/profile.module").then(module => module.ProfileModule), canActivate: [AuthGuard] },

      {
        path: "admin", component: AdminHomeComponent, children: [
          { path: "adminhome", loadChildren: () => import("./admin/components/admin-home/admin-home.module").then(module => module.AdminHomeModule) }
        ]
      },
    ]
  },
  { path: "password-reset", loadChildren: () => import("./ui/components/password-reset/password-reset.module").then(module => module.PasswordResetModule) },
  { path: "update-password/:userId/:resetToken", loadChildren: () => import("./ui/components/password-update/password-update.module").then(module => module.PasswordUpdateModule) },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
