import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';

export const mainRoutes = {
  home: {
    path: '',
    component: HomeComponent,
  },
};

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(Object.values(mainRoutes) as Routes)],
  providers: [],
  exports: [RouterModule],
})
export class AppRoutingModule {}
