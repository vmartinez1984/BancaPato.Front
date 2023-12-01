import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Guid } from 'src/app/helpers/Guid';
import { MovimientoDtoIn } from 'src/app/interfaces/periodo-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';
import { FormularioMovimientoComponent } from '../formulario-movimiento/formulario-movimiento.component';

@Component({
  selector: 'app-agregar-movimiento',
  templateUrl: './agregar-movimiento.component.html',
  styleUrls: ['./agregar-movimiento.component.css']
})
export class AgregarMovimientoComponent {
  periodoId: number = 0
  versionId!: number

  @ViewChild('formulario') formulario! : FormularioMovimientoComponent

  constructor(
    private activatedRoute: ActivatedRoute,
    private repo: RepositorioService,
    private router: Router,
  ) {
    this.activatedRoute.params.subscribe((data) => {
      //console.log(data)
      this.periodoId = data['id']
    })
    this.activatedRoute.queryParams.subscribe(data => {
      //console.log("queryParams", data)
      this.versionId = data['versionId']
    })
  }

  agregar(movimiento: MovimientoDtoIn) {
    movimiento.guid = Guid.newGuid()
    //console.log(movimiento)
    this.formulario.cargando(true)
    this.repo.periodo.agregarMovimiento(this.periodoId, movimiento).subscribe({
      next: (data) => {
        this.router.navigateByUrl('/periodos/' + this.periodoId + '/detalles?versionId=' + this.versionId)
      }
    })
  }

}