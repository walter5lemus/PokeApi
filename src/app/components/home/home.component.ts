import { Component, OnInit } from '@angular/core';
import { PokeService } from 'src/app/services/poke.service';
import Swal from 'sweetalert2';
import { Pokemon } from '../../clases/pokemon';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

public listaPokemon: Pokemon[];
  public urlImage =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';

  constructor(private pokeService: PokeService) {}

  ngOnInit(): void {
    this.pokeService.getPokemones().subscribe((respuesta) => {
      this.listaPokemon = respuesta['results'];
    });
  }

 

}
