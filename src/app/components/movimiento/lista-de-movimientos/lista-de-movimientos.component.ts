import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-lista-de-movimientos',
  templateUrl: './lista-de-movimientos.component.html',
  styleUrls: ['./lista-de-movimientos.component.css']
})
export class ListaDeMovimientosComponent {

  constructor(
    private activateRoute: ActivatedRoute,
    private repo: RepositorioService
  ){
    this.activateRoute.params.subscribe(data=>{
      //this.obtenerMovimientos
    })
  }
}
