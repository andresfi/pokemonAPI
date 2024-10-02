import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { tiposPokemon } from '../../shared/tipos-pokemon';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';

@Component({
  selector: 'app-help-types',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions],
  templateUrl: './help-types.component.html',
  styleUrl: './help-types.component.scss'
})
export class HelpTypesComponent {

  tipos = tiposPokemon;

  constructor(private router: Router) {}

  cerrarAyuda() {
    this.router.navigate(['/home']); // Navega de regreso a la ruta principal
  }

}
