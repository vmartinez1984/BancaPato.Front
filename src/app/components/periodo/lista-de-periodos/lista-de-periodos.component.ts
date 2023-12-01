import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PeriodoDto } from 'src/app/interfaces/periodo-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-lista-de-periodos',
  templateUrl: './lista-de-periodos.component.html',
  styleUrls: ['./lista-de-periodos.component.css']
})
export class ListaDePeriodosComponent {
  periodos: PeriodoDto[] = []
  estaCargando = false

  constructor(
    private repo: RepositorioService,
    //private activatedRoute: ActivatedRoute
  ) {    
    this.obtenerPeriodos()
  }

  obtenerPeriodos() {
    this.estaCargando  = true
    this.repo.periodo.obtenerTodos().subscribe({
      next: (periodos) => {
        this.periodos = periodos
        //console.log(this.periodos)
        this.estaCargando = false
      }
    })
  }


}
