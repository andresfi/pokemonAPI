import { Component, Inject, OnInit } from '@angular/core';
import { PokeApiService } from '../../services/poke-api.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-detail.pokemon',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './detail.pokemon.component.html',
  styleUrls: ['./detail.pokemon.component.scss'],
})
export class DetailPokemonComponent implements OnInit {
  name: string | undefined;
  attack: number = 0;
  defense: number = 0;
  abilities: string[] = [];
  moves: string[] = [];
  urlImage: string = '';

  constructor(
    private pokeService: PokeApiService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<DetailPokemonComponent>
  ) {}

  ngOnInit(): void {
    this.urlImage = this.data.image;
    this.getPokemonDetails(this.data.name); // Obtener detalles del Pokémon
  }

  getPokemonDetails(pokemonName: string): void {
    this.pokeService.getPokemonDetails(pokemonName).subscribe((data) => {
      if (data) {
        this.name = data.name;
        const stats = data.stats;
        this.attack = stats.find((stat: any) => stat.stat.name === 'attack')?.base_stat;
        this.defense = stats.find((stat: any) => stat.stat.name === 'defense')?.base_stat;

        // Obtener las habilidades en español usando getNameInSpanish
        this.getAbilitiesInSpanish(data.abilities);

        // Obtener los movimientos en español usando getNameInSpanish
        this.getMovesInSpanish(data.moves);
      }
    });
  }

  getAbilitiesInSpanish(abilities: any[]): void {
    abilities.forEach((ability) => {
      this.pokeService.getNameInSpanish(ability.ability.url).subscribe((translatedName) => {
        this.abilities.push(translatedName);
      });
    });
  }

  getMovesInSpanish(moves: any[]): void {
    moves.forEach((move) => {
      this.pokeService.getNameInSpanish(move.move.url).subscribe((translatedName) => {
        this.moves.push(translatedName);
      });
    });
  }

  // Método para cerrar el modal
  closeModal(): void {
    this.dialogRef.close();
  }
}
