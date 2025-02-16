import { Routes } from '@angular/router';

import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { FichajeComponent } from './pages/fichaje/fichaje.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { VacacionesComponent } from './pages/vacaciones/vacaciones.component';
import { PeticionesComponent } from './pages/peticiones/peticiones.component';
import { HistorialComponent } from './pages/historial/historial.component';


export const routes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent },
    { path: 'dashboard', component: DashboardComponent, children: [
        { path: 'fichaje', component: FichajeComponent },
        { path: 'vacaciones', component: VacacionesComponent},
        { path: 'peticiones', component: PeticionesComponent},
        { path: 'historial', component: HistorialComponent}
    ]}
];
