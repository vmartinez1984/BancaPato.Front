import { Component } from '@angular/core';
import { AhorroDto } from 'src/app/interfaces/ahorro-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-lista-de-cuentas',
  templateUrl: './lista-de-cuentas.component.html',
  styleUrls: ['./lista-de-cuentas.component.css']
})
export class ListaDeCuentasComponent {
  estaCargando= false
  // dtOptions: DataTables.Settings = {}

  borrar(ahorro: AhorroDto) {
    if (confirm("¿Desea borrar " + ahorro.nombre + " " + ahorro.nota + "?")) {
      this.repo.ahorro.borrar(ahorro.id).subscribe({
        next: (data) => {
          //this.obtenerTodosLosAhorros()
          var index = this.ahorros.findIndex(x => x.id == ahorro.id)
          this.ahorros.splice(index, 1)
        }
      })
    }
  }

  ahorros: AhorroDto[] = []

  constructor(private repo: RepositorioService) {
    this.obtenerTodosLosAhorros()
  }

  ngOnInit(): void {
    // this.dtOptions = {
    //   ajax: 'https://duck-bank.vmartinez84.xyz/api/Cuentas',
    //   columns: [{
    //     title: 'ID',
    //     data: 'id'
    //   }, {
    //     title: 'Nombre',
    //     data: 'nombre'
    //   }, {
    //     title: 'Tipo',
    //     data: 'tipoDeCuenta.nombre'
    //   }]
    // };
  }

  obtenerTodosLosAhorros() {
    this.estaCargando = true
    this.repo.ahorro.obtenerTodos().subscribe({
      next: (ahorros) => {
        this.ahorros = ahorros
        this.estaCargando = false
      },
      error: (error) => {
        alert("Valio pepino")
        console.log(error)
        this.estaCargando = false
      }
    })
  }
}
