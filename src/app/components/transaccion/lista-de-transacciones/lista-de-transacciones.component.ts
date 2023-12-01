import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AhorroDto, TrasaccionDto } from 'src/app/interfaces/ahorro-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-lista-de-transacciones',
  templateUrl: './lista-de-transacciones.component.html',
  styleUrls: ['./lista-de-transacciones.component.css']
})
export class ListaDeTransaccionesComponent {
  transacciones: TrasaccionDto[] = []
  
  constructor(
    private repo : RepositorioService,
    private activatedRoute: ActivatedRoute
  ){
    this.activatedRoute.params.subscribe((data)=>{
      //console.log(data)
      this.obtenerTransacciones(data['id'])   
    })  
  }
  obtenerTransacciones(ahorroId: number) {
    this.repo.transacciones.obtenerTodos(ahorroId).subscribe({
      next:(transacciones)=>{
        this.transacciones = transacciones
        //console.log(transacciones)
      }
    })
  }

}