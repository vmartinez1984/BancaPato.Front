import { Component } from '@angular/core';
import { VersionDto } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-lista-de-versiones',
  templateUrl: './lista-de-versiones.component.html',
  styleUrls: ['./lista-de-versiones.component.css']
})
export class ListaDeVersionesComponent {
  versiones: VersionDto[] = []
  estaCargando = false

  constructor(private repo: RepositorioService) {
    this.obtenerTodos()
  }

  obtenerTodos() {
    this.estaCargando = true
    this.repo.version.obtenerTodos().subscribe({
      next: (versiones) => {
        this.versiones = versiones
        //console.log(versiones)
        this.estaCargando = false
      }, error: (error) => {
        alert('Valio pepino')
        this.estaCargando = false
      }
    })
  }

  borrar(version: VersionDto) {
    if (confirm('¿Desea borrar?' + version.nombre)) {
      this.repo.version.borrar(version.id).subscribe({
        next: (data) => {
          this.obtenerTodos()
        }
      })
    }
  }
}
