import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../clases/pokemon';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
})
export class CardComponent implements OnInit {
  @Input() listaPokemon: Pokemon[];
  @Input() id = -1;
  @Input() tamano: string;

  public urlImage =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';

  constructor() {}

  ngOnInit(): void {}

  imprimir(pokemon: Pokemon): void {
    console.log(pokemon);
  }

  obtenerFoto(pokemon: Pokemon): string {
    /* const index = this.obtenerIndex(pokemon); */
    return this.urlImage.concat(pokemon.id + '.svg');
  }

  verPokemon(): void {}
}
