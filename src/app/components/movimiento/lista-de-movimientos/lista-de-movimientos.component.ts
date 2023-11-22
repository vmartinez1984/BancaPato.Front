import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovimientoDto, PeriodoDto } from 'src/app/interfaces/periodo-dto';
import { PresupuestoDto } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-lista-de-movimientos',
  templateUrl: './lista-de-movimientos.component.html',
  styleUrls: ['./lista-de-movimientos.component.css']
})
export class ListaDeMovimientosComponent {
  periodo!: PeriodoDto
  presupuestos: PresupuestoDto[]= []
  movimientos!: MovimientoDto[];
  id: any;
  versionId: any = 0

  constructor(
    private activateRoute: ActivatedRoute,
    private repo: RepositorioService
  ){
    this.activateRoute.params.subscribe(data=>{
      //this.obtenerMovimientos
      console.log(data)
      this.id = data['id']
      //this.obtenerPeriodo(this.id)
      // this.obtenerMovimientos(id)      
    })
    this.activateRoute.queryParams.subscribe(data=>{
      //console.log("queryParams",data)
      this.versionId = data['versionId']
    })
  }

  obtenerPresupuestos(versionId: number) {
    this.repo.presupuesto.obtenerTodos(versionId).subscribe({
      next: (presupuestos)=>{
        this.presupuestos = presupuestos
      }
    })
  }

  obtenerMovimientos(id: any) {
  this.repo.periodo.obtenerMovimientos(id).subscribe({
    next:(movimientos)=>{
      this.movimientos= movimientos
    }
  })
  }

  obtenerPeriodo(id: any) {
    this.repo.periodo.obtener(id).subscribe({
      next: (periodo)=>{
        this.periodo = periodo
        this.versionId = periodo.versionId
        console.log(periodo)
        this.obtenerPresupuestos(this.periodo.versionId)
      }      
    })
  }
}
