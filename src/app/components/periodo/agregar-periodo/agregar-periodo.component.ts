import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'src/app/helpers/Guid';
import { PeriodoDto, PeriodoDtoIn } from 'src/app/interfaces/periodo-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-agregar-periodo',
  templateUrl: './agregar-periodo.component.html',
  styleUrls: ['./agregar-periodo.component.css']
})
export class AgregarPeriodoComponent {
  constructor(private repo: RepositorioService,
    private router: Router
  ) { }

  agregar(periodoDto: PeriodoDto) {
    console.log(periodoDto)
    var periodo: PeriodoDtoIn = {
      fechaFinal: periodoDto.fechaFinal,
      fechaInicial: periodoDto.fechaInicial,
      nombre: periodoDto.nombre,
      guid: Guid.newGuid()
    }
    this.repo.periodo.agregar(periodo).subscribe({
      next: (data)=>{
        this.router.navigate(['periodos'])
      },
      error: (error)=>{
        console.log(error)
        alert('Valio pepino')
      }
    })
  }
}
