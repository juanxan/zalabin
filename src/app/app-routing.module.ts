import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        loadComponent: ()=> import('./modules/form/form.component').then(m => m.FormComponent)
    },
    {
        path: 'automovile',
        loadComponent: ()=> import('./modules/shared/components/automovile/automovile.component').then(m => m.AutomovileComponent)
    },
    {
        path:'**',
        redirectTo:'/'
    }
];


