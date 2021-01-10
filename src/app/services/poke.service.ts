import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http'; 
import { Pokemon } from '../clases/pokemon';


@Injectable({
  providedIn: 'root'
})
export class PokeService {

  private pokemonApi = 'https://pokeapi.co/api/v2/';

  constructor(private router: Router, private http: HttpClient) {}

  getPokemones(offset: number, limit: number): Observable<Pokemon[]> {
    console.log(this.pokemonApi + `offset=${offset}&limit=${limit}`);
    return this.http
      .get<Pokemon[]>(this.pokemonApi + `pokemon?offset=${offset}&limit=${limit}`);
  }
}
