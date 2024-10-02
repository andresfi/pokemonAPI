import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PokeApiService } from '../../services/poke-api.service';
import { firstValueFrom } from 'rxjs';
import { DetailPokemonComponent } from '../detail.pokemon/detail.pokemon.component';

@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [CommonModule, MatCard, MatCardHeader, MatCardTitle, MatCardSubtitle, MatCardContent, MatCardActions, MatDialogModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.scss'
})
export class PokemonComponent implements OnChanges{

  @Input() data?:any;

  pokemon : string = "";
  detailPoke : any[] = [];
  urlImage : string = "";

  constructor(private pokeService: PokeApiService, public dialog: MatDialog){
    
  }
  
  ngOnChanges(changes: SimpleChanges): void {
      this.atrapaPokemon();
  }  

  atrapaPokemon(){
    this.pokemon = this.data.pokemon.name;
    
    this.obtenDatosPoke(this.pokemon);
  }

  async obtenDatosPoke(pokemon: string){
    const resp = await firstValueFrom(this.pokeService.getByName(pokemon));
    this.urlImage = resp.sprites.other.dream_world.front_default;
    if(this.urlImage == "" || this.urlImage == null){
      this.urlImage = resp.sprites.other.home.front_default;
    }
  }

  muestraDetalle() {
    // Abrir el modal con el componente de detalle
    this.dialog.open(DetailPokemonComponent, {
      width: '90vw',
      height: '80vh',
      data: {
        name: this.pokemon,
        image: this.urlImage
      }, // Pasar datos al componente de detalle
    });
  }
}
