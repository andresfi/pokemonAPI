import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { 
      path: '', 
      redirectTo: 'home', // Redirige a 'home' por defecto
      pathMatch: 'full' 
    },
    { 
      path: 'home', 
      component: HomeComponent // Ruta para HomeComponent
    },
    {
      path: 'help',
      loadComponent: () => import('./components/help-types/help-types.component').then((m) => m.HelpTypesComponent) //Carga componente de ayuda usando lazy loading
    },
    { 
      path: '**', 
      redirectTo: 'home'
    }
  ];
  
