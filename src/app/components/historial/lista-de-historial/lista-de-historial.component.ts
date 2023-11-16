import { Component } from '@angular/core';
import { HistorialDeApartadosDto } from 'src/app/interfaces/historial-de-apartados-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-lista-de-historial',
  templateUrl: './lista-de-historial.component.html',
  styleUrls: ['./lista-de-historial.component.css']
})
export class ListaDeHistorialComponent {
  historial: HistorialDeApartadosDto[]=[]

  constructor(private repo: RepositorioService){
    this.repo.historial.obtenerTodos().subscribe({
      next:(historial)=>{
        this.historial = historial
        console.log(this.historial)
      }
    })
  }
}
