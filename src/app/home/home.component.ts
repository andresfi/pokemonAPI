import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { PokeApiService } from '../services/poke-api.service';
import { PokemonComponent } from "../components/pokemon/pokemon.component";
import { CommonModule } from '@angular/common';
import { firstValueFrom } from 'rxjs';
import { TypeTranslations } from '../../assets/translates/type-translations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [PokemonComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  @ViewChild('pokemonList', { static: false }) pokemonList!: ElementRef;

  pokemones: any[] = [];

  offset: number = 0;    // Control de offset
  loading: boolean = false; // Control de estado de carga
  type: string = "";

  //Bandera para mostrar el gif cuando una consulta no trae resultados
  isFirstConsult: boolean = false;

  constructor(private pokeService: PokeApiService, private router: Router){ }

  ngOnInit(): void {
  }

  getPokemons(type: string) {
    //llamado a la función para traducir el tipo
    this.type = this.translateType(type.trim());
    this.pokemones = [];    
    this.offset = 0;
    this.getPokemonsScroll();
    this.loading = false;
  }

  async getPokemonsScroll() {

    const limit: number = 30; //Cantidad de pokemons a traer por consulta

    if (this.loading) return; // Evitar múltiples llamadas
    this.loading = true;
    
    const resp = await firstValueFrom(this.pokeService.getTypePoke(this.type, limit, this.offset));
    /* this.pokemones = resp === '' ? this.pokemones : [...this.pokemones, ...resp.pokemon.slice(this.offset, this.offset + limit)]; */
    if (resp && resp.pokemon) {
      this.pokemones = [...(this.pokemones || []), ...resp.pokemon.slice(this.offset, this.offset + limit)];
    }
    
    this.offset += limit; // Incrementar el offset para la siguiente carga
    this.loading = false;

    this.isFirstConsult = this.pokemones.length === 0;    
  }  

  onScroll(e:any){
    if(this.loading) return;

    if(Math.round(this.pokemonList.nativeElement.clientHeight + this.pokemonList.nativeElement.scrollTop) === e.srcElement.scrollHeight){
          this.getPokemonsScroll();
        }
  }

  translateType(type: string): string {
    return TypeTranslations[type.toLowerCase()] || type;
  }

  mostrarAyuda() {
    this.router.navigate(['/help']);
  }
}
