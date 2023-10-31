import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AdvertComponent } from './ui/components/advert/advert.component';
import { RegisterComponent } from './ui/components/register/register.component';
import { AuthGuard } from './guards/auth.guard';
import { SidebarComponent } from './ui/components/sidebar/sidebar.component';

const routes: Routes = [

  { path: "", component:RegisterComponent},
  {
    path: "sidebar", component: SidebarComponent, canActivate: [AuthGuard], children: [
      { path: "advert", loadChildren: () => import("./ui/components/advert/advert.module").then(module => module.AdvertModule), canActivate: [AuthGuard] },
      { path: "calculation", loadChildren: () => import("./ui/components/calculation/calculation.module").then(module => module.CalculationModule), canActivate: [AuthGuard] },
      { path: "constitution", loadChildren: () => import("./ui/components/constitution/constitution.module").then(module => module.ConstitutionModule), canActivate: [AuthGuard] },
      { path: "case", loadChildren: () => import("./ui/components/case/case.module").then(module => module.CaseModule), canActivate: [AuthGuard] },
      { path: "news", loadChildren: () => import("./ui/components/news/news.module").then(module => module.NewsModule), canActivate: [AuthGuard] },
      {
        path: "admin", component: LayoutComponent, children: [
          { path: "", component: DashboardComponent },//www.xxx.com/admin dediğimizde DashboardComponent gelicek.
          { path: "adminhome", loadChildren: () => import("./admin/components/admin-home/admin-home.module").then(module => module.AdminHomeModule) }
        ]
      },
    ]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
