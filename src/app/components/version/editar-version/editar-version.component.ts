import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VersionDto } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-editar-version',
  templateUrl: './editar-version.component.html',
  styleUrls: ['./editar-version.component.css']
})
export class EditarVersionComponent {
  version!: VersionDto

  constructor(
    private activatedRoute: ActivatedRoute,
    private repo: RepositorioService,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((data) => {
      //console.log(data)
      this.version = data as VersionDto
      //console.log(this.version)
    })
  }

  actualizar(version: VersionDto){
    this.repo.version.actualizar(this.version.id, {nombre: version.nombre, fechaInicial: version.fechaInicial, fechaFinal: version.fechaFinal}).subscribe({
      next: (data)=>{
        this.router.navigate(['/versiones'])
      }
    })
  }
}
