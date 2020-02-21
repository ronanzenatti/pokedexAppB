import { Component } from '@angular/core';
import { DadosService } from '../servicos/dados.service';

export interface IPokemon {
  numero: string;
  nome: string;
  tipos: string[];
  img: string;
}

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

  public busca;

  constructor(dadosService: DadosService) {
    this.resetarLista();
  }

  abrirDadosPokemon(pokemon: IPokemon) {
    console.log(pokemon);
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
