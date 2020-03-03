import { Component } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { Router } from '@angular/router';
import { IPokemon } from '../interfaces/IPokemon';
import { PokemonApiService } from '../servicos/pokemon-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  public listaPokemons = [
    {
      numero: '001',
      nome: 'Bulbasaur',
      tipos: ['Grass', 'Poison'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/001.png'
    },
    {
      numero: '004',
      nome: 'Charmander',
      tipos: ['Fire'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/004.png'
    },
    {
      numero: '007',
      nome: 'Squirtle',
      tipos: ['Water'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/007.png'
    },
    {
      numero: '025',
      nome: 'Pikachu',
      tipos: ['Electric'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/025.png'
    },
    {
      numero: '149',
      nome: 'Dragonite',
      tipos: ['Dragon', 'Flying'],
      img: 'https://assets.pokemon.com/assets/cms2/img/pokedex/full/149.png'
    }
  ];
  public listaFiltrada = [];

  public listaPokemonApi;
  public totalPokemons;
  public offset = 0;
  public limit = 10;

  constructor(
    public dadosService: DadosService,
    public router: Router,
    public pokeApi: PokemonApiService
  ) {
    this.resetarLista();
    this.buscarPokemons(this.offset, this.limit);
  }

  public buscarPokemons(offset, limit) {
    this.pokeApi.buscaPokemons(offset, limit).subscribe(dados => {
      console.log(dados);

      // Pega somente o total de pokemons
      this.totalPokemons = dados['count'];
      // Pega somente a lista de pokemons
      this.listaPokemonApi = dados['results'];
    })
  }

  abrirDadosPokemon(pokemon: IPokemon) {

    // Salva os dados do pokemon no BD Virtual.
    this.dadosService.setDados('dadosPokemon', pokemon);

    // Abre a página para exibir os dados.
    this.router.navigateByUrl('/dados-pokemon');

  }

  private resetarLista() {
    this.listaFiltrada = this.listaPokemons;
  }

  public buscarPokemon(evento: any) {
    let busca = evento.target.value;

    this.resetarLista();

    if (busca && busca.trim() != '') {
      this.listaFiltrada = this.listaFiltrada.filter(dados => {
        if ((dados.nome.toLowerCase().indexOf(busca.toLowerCase()) > -1) || (dados.numero.toLowerCase().indexOf(busca.toLowerCase()) > -1)) {
          return true;
        }
        return false;
      });
    }

  }

}
