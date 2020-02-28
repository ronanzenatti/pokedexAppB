import { Component, OnInit } from '@angular/core';
import { DadosService } from '../servicos/dados.service';
import { IPokemon } from '../interfaces/IPokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dados-pokemon',
  templateUrl: './dados-pokemon.page.html',
  styleUrls: ['./dados-pokemon.page.scss'],
})
export class DadosPokemonPage implements OnInit {

  public pokemon: IPokemon;

  constructor(
    public dadosService: DadosService,
    public router: Router
  ) {
    this.pokemon = this.dadosService.getDados('dadosPokemon');
    if (!this.pokemon) {
      this.router.navigateByUrl('/home');
    }
  }

  ngOnInit() {

  }

}
