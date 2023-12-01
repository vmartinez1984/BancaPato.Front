import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AhorroDto } from 'src/app/interfaces/ahorro-dto';
import { MovimientoPresupuesto, PeriodoDto } from 'src/app/interfaces/periodo-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-lista-de-movimientos',
  templateUrl: './lista-de-movimientos.component.html',
  styleUrls: ['./lista-de-movimientos.component.css']
})
export class ListaDeMovimientosComponent {
  periodo!: PeriodoDto
  movimientos: MovimientoPresupuesto[] = []
  id: any;
  versionId: any = 0
  ahorro?: AhorroDto;
  estaCargando: boolean = false;

  constructor(
    private activateRoute: ActivatedRoute,
    private repo: RepositorioService
  ) {
    this.activateRoute.params.subscribe(data => {
      //console.log(data)
      this.id = data['id']
    })
    this.activateRoute.queryParams.subscribe(data => {
      //console.log("queryParams", data)
      this.versionId = data['versionId']
      this.obtenerPresupuestos(this.versionId)
    })
    this.obtenerCuentaDeNomina()
  }

  obtenerCuentaDeNomina() {
    this.estaCargando = true
    this.repo.ahorro.obtener(1007).subscribe({
      next: (ahorro) => {
        this.ahorro = ahorro
        this.estaCargando = false
      }
    })
  }

  obtenerPresupuestos(versionId: number) {
    this.estaCargando = true
    this.repo.presupuesto.obtenerTodos(versionId).subscribe({
      next: (presupuestos) => {
        presupuestos.forEach(item => {
          this.movimientos.push({ presupuesto: item })
        })
        this.obtenerMovimientos(this.id)
        this.estaCargando = false
      }
    })
  }

  obtenerMovimientos(id: any) {
    this.estaCargando = true
    this.repo.periodo.obtenerMovimientos(id).subscribe({
      next: (movimientos) => {
        //console.log(movimientos)
        this.movimientos.forEach(item => {
          const movimiento = movimientos.find(x => x.presupuestoId == item.presupuesto.id)
          //console.log(movimiento)
          if (movimiento != undefined)
            item.movimiento = movimiento
        })
        //console.log(this.movimientos)
        this.estaCargando = false
      },
      error: (error) => {
        alert('Valio pepino')
      }
    })
  }

  obtenerPeriodo(id: any) {
    this.estaCargando = true
    this.repo.periodo.obtener(id).subscribe({
      next: (periodo) => {
        this.periodo = periodo
        this.versionId = periodo.versionId
        console.log(periodo)
        this.obtenerPresupuestos(this.periodo.versionId)
        this.estaCargando = false
      }
    })
  }

}