import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Pokemon } from '../clases/pokemon';

@Injectable({
  providedIn: 'root',
})
export class PokeService {
  private pokemonApi = 'https://pokeapi.co/api/v2/';
  private listaPokemon: Pokemon[];

  constructor(private router: Router, private http: HttpClient) {}

  getPokemones(offset: number, limit: number): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(
      this.pokemonApi + `pokemon?offset=${offset}&limit=${limit}`
    );
  }

  buscarPokemon(): Observable<Pokemon[]> {
    return this.http.get<Pokemon[]>(this.pokemonApi + `pokemon?&limit=151`).pipe( (respuesta: any) => respuesta);
  }


}
