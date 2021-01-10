import { Component, Input, OnInit } from '@angular/core';
import { Pokemon } from '../../clases/pokemon';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() listaPokemon: Pokemon[];
  @Input() id = -1;

  public urlImage =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';

  constructor() { }

  ngOnInit(): void {
  }

  obtenerFoto(id): string {
    return this.urlImage.concat(id + 1 + '.svg');
  }

  verPokemon(){
    
  }

}
