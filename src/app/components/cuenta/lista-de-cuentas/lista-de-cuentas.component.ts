import { Component } from '@angular/core';
import { AhorroDto } from 'src/app/interfaces/ahorro-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-lista-de-cuentas',
  templateUrl: './lista-de-cuentas.component.html',
  styleUrls: ['./lista-de-cuentas.component.css']
})
export class ListaDeCuentasComponent {
  ahorros: AhorroDto[] = []

  constructor(private repo: RepositorioService) {
    this.repo.ahorro.obtenerTodos().subscribe({
      next: (ahorros) => {
        this.ahorros = ahorros
      },
      error: (error)=>{
        alert("Valio pepino")
        console.log(error)
      }
    })
  }
}
