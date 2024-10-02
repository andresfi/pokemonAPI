import { Injectable } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon.interface';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PokeApiService {

  baseUrl = 'https://pokeapi.co/api/v2';

  constructor(private http: HttpClient) { }

  //Método principal para obtener el pokemon por habilidad
  getTypePoke(type: string, limit: number = 30, offset: number = 0): Observable<any> {
    return this.http.get(`${this.baseUrl}/type/${type}?limit=${limit}&offset=${offset}`).pipe(
      catchError((error) => {
        console.error(`Error al obtener el tipo de Pokémon: ${type}`, error);
        return of('');
      })
    );
  }  

  //Método para obtener el pokemon por nombre
  getByName(pokemonName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${pokemonName}`);
  }

  //Método para obtener el detalle del pokemon seleccionado
  getPokemonDetails(pokemonName: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/pokemon/${pokemonName}`).pipe(
      catchError((error) => {
        console.error(`Error al obtener los detalles del Pokémon: ${pokemonName}`, error);
        return of(null);
      })
    );
  }

  // Método genérico para obtener el nombre en español de cualquier recurso (habilidad o movimiento)
  getNameInSpanish(url: string): Observable<string> {
    return this.http.get(url).pipe(
      map((data: any) => {
        const spanishEntry = data.names.find((entry: any) => entry.language.name === 'es');
        return spanishEntry ? spanishEntry.name : 'No disponible';
      }),
      catchError(() => of('No disponible'))
    );
  }
}
