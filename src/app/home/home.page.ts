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

  public listaPokemonApi = [];
  public totalPokemons;
  public offset = 0;
  public limit = 10;
  public paginaAtual = 0;

  constructor(
    public dadosService: DadosService,
    public router: Router,
    public pokeApi: PokemonApiService
  ) {
    this.resetarLista();
    this.buscarPokemons(this.offset, this.limit);
  }

  public buscarPokemons(offset, limit) {

    if (this.offset <= offset) {
      this.paginaAtual++;
    } else {
      this.paginaAtual--;
    }
    // Atualiza o offset geral
    this.offset = offset;

    this.pokeApi.buscaPokemons(offset, limit).subscribe(dados => {
      // Limpa a lista para exibir os próximos pokemons buscados.
      this.listaPokemonApi = [];

      // Pega somente o total de pokemons
      this.totalPokemons = dados['count'];
      // Pega somente a lista de pokemons da api
      let listaApi = dados['results'];

      // Percorre a lista e busca na Api todos os dados do pokemon
      for (let item of listaApi) {
        this.pokeApi.buscaPokemonUrl(item.url).subscribe(dadosPokemon => {
          // Adiciona os dados do pokemon ao final da lista
          this.listaPokemonApi.push(dadosPokemon);

          // Atualiza a listaFiltrada com os pokemons buscados.
          this.resetarLista();
        });
      }

    })
  }

  abrirDadosPokemon(pokemon: IPokemon) {

    // Salva os dados do pokemon no BD Virtual.
    this.dadosService.setDados('dadosPokemon', pokemon);

    // Abre a página para exibir os dados.
    this.router.navigateByUrl('/dados-pokemon');

  }

  private resetarLista() {
    // this.listaFiltrada = this.listaPokemons;

    // Ordena a lista de pokemons pelo numero(id)
    this.listaPokemonApi.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      }
      if (a.id < b.id) {
        return -1;
      }
      // a must be equal to b
      return 0;
    });

    this.listaFiltrada = this.listaPokemonApi;
  }

  public buscarPokemon(evento: any) {
    let busca = evento.target.value;

    this.resetarLista();

    if (busca && busca.trim() != '') {
      this.listaFiltrada = this.listaFiltrada.filter(dados => {
        if ((dados.name.toLowerCase().indexOf(busca.toLowerCase()) > -1) || (String(dados.id).toLowerCase().indexOf(busca.toLowerCase()) > -1)) {
          return true;
        }
        return false;
      });
    }

  }

}
