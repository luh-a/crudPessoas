import { Routes } from '@angular/router';
import { FormularioComponent } from './component/formulario-component/formulario-component';
import { ListaComponent } from './component/lista-component/lista-component';
import { HomeComponent } from './component/home-component/home-component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'cadastro',
        component: FormularioComponent
    },
    {
        path: 'cadastro/:id',
        component: FormularioComponent
    },
    {
        path: 'lista',
        component: ListaComponent
    }
];
