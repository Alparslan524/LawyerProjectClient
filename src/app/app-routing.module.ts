import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { LayoutComponent } from './admin/layout/layout.component';
import { AdvertComponent } from './ui/components/advert/advert.component';

const routes: Routes = [
  {
    path: "admin", component: LayoutComponent, children: [
      { path: "", component: DashboardComponent },//www.xxx.com/admin dediğimizde DashboardComponent gelicek.
      { path: "adminhome", loadChildren: () => import("./admin/components/admin-home/admin-home.module").then(module => module.AdminHomeModule) }
    ]
  },
  { path: "", component: AdvertComponent },
  { path: "calculation", loadChildren: () => import("./ui/components/calculation/calculation.module").then(module => module.CalculationModule) },
  { path: "constitution", loadChildren: () => import("./ui/components/constitution/constitution.module").then(module => module.ConstitutionModule) },
  { path: "case", loadChildren: () => import("./ui/components/case/case.module").then(module => module.CaseModule) },
  { path: "news", loadChildren: () => import("./ui/components/news/news.module").then(module => module.NewsModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
