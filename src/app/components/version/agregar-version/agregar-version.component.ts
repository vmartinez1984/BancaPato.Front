import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { VersionDto, VersionDtoIn } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-agregar-version',
  templateUrl: './agregar-version.component.html',
  styleUrls: ['./agregar-version.component.css']
})
export class AgregarVersionComponent {

  constructor(private repo: RepositorioService,private router: Router) { }

  guardar(version: VersionDto) {
    console.log(version)
    var versionDtoIn: VersionDtoIn = {
      fechaFinal: version.fechaFinal,
      fechaInicial: version.fechaInicial,
      nombre: version.nombre
    }
    this.repo.version.agregar(versionDtoIn).subscribe({
      next:(data)=>{
        this.router.navigate(['versiones'])
      }
    })
  }
}
