import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PresupuestoDto } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-editar-presupuesto',
  templateUrl: './editar-presupuesto.component.html',
  styleUrls: ['./editar-presupuesto.component.css']
})
export class EditarPresupuestoComponent {
  presupuesto!: PresupuestoDto

  constructor(
    private activateRoute: ActivatedRoute,
    private repo:RepositorioService,
  ){ 
    this.activateRoute.params.subscribe(data=>{
      console.log(data)
      this.obtnerPresupuestoDto(data['presupuestoId'])
    })
  }

  obtnerPresupuestoDto(presupuestoId: string) {
    this.repo.presupuesto.obtener(presupuestoId).subscribe({
      next:(data)=>{
        console.log(data)
      }
    })
  }

}
