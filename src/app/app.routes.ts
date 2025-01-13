import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegistrationsComponent } from './components/registration/registrations/registrations.component';
import { NewRegistrationComponent } from './components/registration/new-registration/new-registration.component';
import { TournamentsComponent } from './components/tournament/tournaments/tournaments.component';
import { NewTournamentComponent } from './components/tournament/new-tournament/new-tournament.component';
import { EditTournamentComponent } from './components/tournament/edit-tournament/edit-tournament.component';
import { EditRegistrationComponent } from './components/registration/edit-registration/edit-registration.component';
import { SelectTestComponent } from './components/testing/select-test/select-test.component';
import { LoginComponent } from './components/login/login.component';

export const routes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
        title: 'Dashboard',
    },
    {
        path: 'login',
        component: LoginComponent,
        title: 'Login',
    },    
    {
        path: 'registration',
        component: RegistrationsComponent,
        title: 'Registrations'
    },
    {
        path: 'new-registration',
        component: NewRegistrationComponent,
        title: 'New Registration'
    },
    {
        path: 'edit-registration/:id',
        component: EditRegistrationComponent,
        title: 'Edit Registration'
    },
    {
        path: 'tournament',
        component: TournamentsComponent,
        title: 'Tournaments'
    },
    {
        path: 'new-tournament',
        component: NewTournamentComponent,
        title: 'New Tournament'
    },
    {
        path: 'edit-tournament/:id',
        component: EditTournamentComponent,
        title: 'Edit Tournament'
    },
    {
        path: 'select-test',
        component: SelectTestComponent,
        title: 'Select Test'
    },       
];
