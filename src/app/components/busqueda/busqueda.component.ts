import { Component, HostListener, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Pokemon } from 'src/app/clases/pokemon';
import { PokeService } from 'src/app/services/poke.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styleUrls: ['./busqueda.component.scss'],
})
export class BusquedaComponent implements OnInit {
  public listaPokemon: Pokemon[];
  public termino: string;
  public showGoUpButton: boolean;
  public showScrollHeight = 400;
  public hideScrollHeight = 200;

  constructor(
    private activatedRoute: ActivatedRoute,
    private pokeService: PokeService,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((params) => {
      this.pokeService.buscarPokemon().subscribe((respuesta: any) => {
        const listaPoke: Pokemon[] = [];
        const list: Pokemon[] = respuesta.results;
        const termino = params.nombre.toLowerCase();
        list.forEach((element) => {
          if (element.name.indexOf(termino)  >= 0) {
            listaPoke.push(element);
          }
        });
        this.listaPokemon = listaPoke;
      });
      this.termino = params.nombre;
    });
  }

  ngOnInit(): void {}

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
