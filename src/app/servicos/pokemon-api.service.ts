import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PokemonApiService {

  private url = "https://pokeapi.co/api/v2/pokemon";

  constructor(public http: HttpClient) { }

  public buscaPokemons(offset: Number, limit = 10) {
    return this.http.get(`${this.url}/?offset=${offset}&limit=${limit}`);
  }

  public pokemonPorNumero(numero: Number) {
    return this.http.get(`${this.url}/${numero}`);
  }

  public buscaPokemonUrl(url: string) {
    return this.http.get(url);
  }
}
