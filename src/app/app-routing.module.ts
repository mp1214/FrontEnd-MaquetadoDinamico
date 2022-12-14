import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ErrorComponent } from './error/error.component';
import { GuardianGuard } from './guard/guardian.guard';
import { IntroComponent } from './intro/intro.component';
import { AcercadeMiComponent } from './acercade-mi/acercade-mi.component';

const routes: Routes = [
{path: 'intro', component:IntroComponent},
{path: 'dashboard', component:DashboardComponent,canActivate:[GuardianGuard]},
{path: '', redirectTo: '/intro', pathMatch:'full'},
{path:'**', component:ErrorComponent},
{path: 'acercademi', component:AcercadeMiComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
