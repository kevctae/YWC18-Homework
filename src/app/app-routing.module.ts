import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { HeaderModule } from './header/header.module';
import { HomeComponent } from './home/home.component';


const routes: Routes = [
  {
    path: '',
    component: HeaderComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
