import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Toast } from 'src/app/helpers/Toast';
import { PresupuestoDto, PresupuestoDtoIn } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';
import { FormularioPresupuestoComponent } from '../formulario-presupuesto/formulario-presupuesto.component';

@Component({
  selector: 'app-editar-presupuesto',
  templateUrl: './editar-presupuesto.component.html',
  styleUrls: ['./editar-presupuesto.component.css']
})
export class EditarPresupuestoComponent {
  presupuesto!: PresupuestoDto

  @ViewChild('formulario') formulario! : FormularioPresupuestoComponent

  constructor(
    private activateRoute: ActivatedRoute,
    private router: Router,
    private repo: RepositorioService,
  ) {
    this.activateRoute.params.subscribe(data => {
      //console.log(data)
      this.obtnerPresupuestoDto(data['presupuestoId'])
    })
  }

  obtnerPresupuestoDto(presupuestoId: string) {
    this.repo.presupuesto.obtener(presupuestoId).subscribe({
      next: (data) => {
        //console.log(data)
        this.presupuesto = data
      }
    })
  }

  actualizar(presupuestoDto: PresupuestoDto) {
    //console.log(presupuestoDto)
    var presupuesto: PresupuestoDtoIn = {
      cantidad: presupuestoDto.cantidad,
      cantidadMeta: presupuestoDto.cantidadMeta,
      subcategoriaId: presupuestoDto.subcategoria.id,
      versionId: presupuestoDto.versionId,
      ahorroId: presupuestoDto.ahorroId
    }
    this.formulario.cargando(true)
    this.repo.presupuesto.actualizar(this.presupuesto.id,presupuesto).subscribe({
      next:(data)=>{
        this.router.navigate(['/versiones', presupuesto.versionId, 'presupuestos'])
        this.formulario.cargando(false)
      }, error: (error) => {
        Toast.error()
        console.log(error)
        this.formulario.cargando(false)
      }
    })
  }

}
