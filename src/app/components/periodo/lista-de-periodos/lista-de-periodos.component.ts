import { Component } from '@angular/core';
import { PeriodoDto } from 'src/app/interfaces/periodo-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-lista-de-periodos',
  templateUrl: './lista-de-periodos.component.html',
  styleUrls: ['./lista-de-periodos.component.css']
})
export class ListaDePeriodosComponent {
  periodos: PeriodoDto[] = []

  constructor(
    private repo: RepositorioService
  ) {
    this.obtenerPeriodos()
  }

  obtenerPeriodos() {
    this.repo.periodo.obtenerTodos().subscribe({
      next: (periodos) => {
        this.periodos = periodos
        console.log(this.periodos)
      }
    })
  }


}
