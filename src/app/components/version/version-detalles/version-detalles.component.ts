import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'src/app/helpers/Toast';
import { PresupuestoDto } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-version-detalles',
  templateUrl: './version-detalles.component.html',
  styleUrls: ['./version-detalles.component.css']
})
export class VersionDetallesComponent {
  versionId!: number

  constructor(
    private activatedRoute: ActivatedRoute,
    private repo: RepositorioService,
  ) {
    //console.log("detalles")
    this.activatedRoute.params.subscribe((data) => {
      //console.log(data)
      this.versionId = data['id']
    })
    this.activatedRoute.queryParams.subscribe((data) => {
      //console.log(data)
    })
    this.estaCargando = true    
    this.repo.presupuesto.obtenerTodos(this.versionId).subscribe({
      next: (presupuestos) => {
        this.presupuestos = presupuestos
        //console.log(presupuestos)
        this.estaCargando = false
      }, error: (error)=>{
        Toast.error()
      }
    })
  }
  
  estaCargando = false

  presupuestos: PresupuestoDto[] = []

 
}
