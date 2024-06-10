import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CovidStatsComponent } from './components/covid-stats/covid-stats.component';
import { StateFilterComponent } from './components/state-filter/state-filter.component';

const routes: Routes = [
  { path: '', component: CovidStatsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
