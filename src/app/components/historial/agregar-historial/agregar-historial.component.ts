import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Guid } from 'src/app/helpers/Guid';
import { HistorialDeApartadosDto, HistorialDeApartadosDtoIn } from 'src/app/interfaces/historial-de-apartados-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-agregar-historial',
  templateUrl: './agregar-historial.component.html',
  styleUrls: ['./agregar-historial.component.css']
})
export class AgregarHistorialComponent {

  constructor(
    private repo: RepositorioService,
    private router: Router
  ){}

  agregar(historial: HistorialDeApartadosDto){
    //console.log(historial)
    var historialDtoIn : HistorialDeApartadosDtoIn={
      cantidad: historial.cantidad,
      cuentaId: historial.cuentaId,
      guid: Guid.newGuid(),
      interes: historial.interes,
      nota: historial.nota
    }
    this.repo.historial.agregar(historialDtoIn).subscribe({
      next:(data)=>{
        this.router.navigate(['historialDeApartados'])
      }
    })
  }
}
