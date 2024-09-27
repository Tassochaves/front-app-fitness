import { Routes } from '@angular/router';
import { AtividadeComponent } from './components/atividade/atividade.component';
import { TreinoComponent } from './components/treino/treino.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { MetasComponent } from './components/metas/metas.component';

export const routes: Routes = [
  {path: "dashboard", component: DashboardComponent},
  {path: "atividade", component: AtividadeComponent},
  {path: "treino", component: TreinoComponent},
  {path: "metas", component: MetasComponent}
];
