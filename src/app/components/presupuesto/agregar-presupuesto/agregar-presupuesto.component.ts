import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PresupuestoDto, PresupuestoDtoIn } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-agregar-presupuesto',
  templateUrl: './agregar-presupuesto.component.html',
  styleUrls: ['./agregar-presupuesto.component.css']
})
export class AgregarPresupuestoComponent {
  versionId = 0
  constructor(
    private repo: RepositorioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe(data => {
      //console.log(data)
      this.versionId = data['id']
    })
  }

  agregar(presupuesto: PresupuestoDto) {
    console.log(presupuesto)
    var presupuestoDtoIn: PresupuestoDtoIn = {
      cantidad: presupuesto.cantidad,
      cantidadMeta: presupuesto.cantidadMeta,
      subcategoriaId: presupuesto.subcategoria.id,
      versionId: this.versionId
    }
    this.repo.presupuesto.agregar(this.versionId, presupuestoDtoIn).subscribe({
      next: (data) => {
        this.router.navigate(['versiones', this.versionId, 'presupuestos'])
      }, error: (error) => {
        alert("Valio pepino")
        console.log(error)
      }
    })
  }
}
