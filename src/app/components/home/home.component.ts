import { Component, HostListener, OnInit, ValueProvider } from '@angular/core';
import { PokeService } from 'src/app/services/poke.service';
import Swal from 'sweetalert2';
import { Pokemon } from '../../clases/pokemon';
import { tap, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  public listaPokemon: Pokemon[];
  private offset = 0;
  private limit = 21;
  private limitePokemon = 151;
  public showGoUpButton: boolean;
  public showScrollHeight = 400;
  public hideScrollHeight = 200;
  public tamano = 'col-sm-12 col-md-6 col-lg-4 p-0 m-0';

  public urlImage =
    'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/';

  constructor(private pokeService: PokeService) {
    this.showGoUpButton = false;
  }

  ngOnInit(): void {
    this.pokeService
      .getPokemones(this.offset, this.limit)
      .subscribe((respuesta: any) => {
        this.listaPokemon = respuesta.results;
        this.asignarIndex();
      });
  }

  asignarIndex(): void {
    this.listaPokemon.forEach((element) => {
      const index = this.obtenerIndex(element);
      element.id = index;
    });
  }

  obtenerIndex(pokemon: Pokemon): number {
    const indice = this.listaPokemon.findIndex((poke) => poke === pokemon);
    return indice + 1;
  }

  onScroll(): void {
    if (this.limit < 151) {
      this.limit = this.limit + 21;
      if (this.limit < this.limitePokemon) {
        this.pokeService
          .getPokemones(this.offset, this.limit)
          .subscribe((respuesta: any) => {
            this.listaPokemon = respuesta.results;
            this.asignarIndex();
          });
      } else {
        const size = this.listaPokemon.length;
        if (size < this.limitePokemon) {
          this.pokeService
            .getPokemones(this.offset, this.limitePokemon)
            .subscribe((respuesta: any) => {
              this.listaPokemon = respuesta.results;
              this.asignarIndex();
            });
        }
      }
    } else {
      console.log('llegó al limite');
    }
  }

  scrollTop(): void {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) > this.showScrollHeight
    ) {
      this.showGoUpButton = true;
    } else if (
      this.showGoUpButton &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop) < this.hideScrollHeight
    ) {
      this.showGoUpButton = false;
    }
  }
}
