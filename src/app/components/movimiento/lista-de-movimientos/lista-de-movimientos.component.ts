import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
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
  estaCargando: boolean = false
  
  dtOptions: DataTables.Settings = {}
  dtTrigger: Subject<any> = new Subject<any>()

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

  ngOnInit(){
    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true
    }
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
        this.dtTrigger.next(null)
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
        this.obtenerAhorros()
      },
      error: (error) => {
        alert('Valio pepino')
      }
    })
  }

  obtenerAhorros() {
    this.repo.ahorro.obtenerTodos().subscribe({
      next: (ahorros)=>{
        ahorros.forEach(item =>{
          var index = this.movimientos.findIndex(x=> x.presupuesto.ahorroId== item.id)          
          if(index != -1){
            this.movimientos[index].tipoDeAhorro = item.tipoDeCuenta.nombre
          }
        })
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