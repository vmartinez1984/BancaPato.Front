import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Toast } from 'src/app/helpers/Toast';
import { PresupuestoDto, PresupuestoDtoIn } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-version-detalles',
  templateUrl: './version-detalles.component.html',
  styleUrls: ['./version-detalles.component.css']
})
export class VersionDetallesComponent {
  estaCargando = false
  presupuestos: PresupuestoDto[] = []
  versionId!: number
  @ViewChild('botonQueCierraElModal') botonQueCierraElModal?: ElementRef
  total = 0

  constructor(
    private activatedRoute: ActivatedRoute,
    private repo: RepositorioService,
  ) {
    //console.log("detalles")
    this.activatedRoute.params.subscribe((data) => {
      this.versionId = data['id']
    })
    this.activatedRoute.queryParams.subscribe((data) => {
      //console.log(data)
    })
    this.estaCargando = true
    this.obtenerPresupuestos();
  }

  obtenerPresupuestos() {
    this.repo.presupuesto.obtenerTodos(this.versionId).subscribe({
      next: (presupuestos) => {
        this.presupuestos = presupuestos
        //console.log(presupuestos)
        this.estaCargando = false
        this.presupuestos.forEach(item=>{
          this.total = this.total + item.cantidad          
        })
      }, error: (error) => {
        Toast.error(error)
      }
    })
  }

  /**
   * Agregar presupuesto
   * @param presupuesto 
   */
  agregar(presupuesto: PresupuestoDtoIn) {
    console.log(presupuesto)
    var presupuestoDtoIn: PresupuestoDtoIn = {
      cantidad: presupuesto.cantidad,
      subcategoriaId: presupuesto.subcategoriaId,
      versionId: parseInt(this.versionId + ''),
      ahorroId: presupuesto.ahorroId,
      ahorroTipo: presupuesto.ahorroTipo
    }
    //console.log(presupuestoDtoIn)
    this.repo.presupuesto.agregar(this.versionId, presupuestoDtoIn).subscribe({
      next: (data) => {
        console.log(data)
        this.presupuestos.unshift({
          ahorroTipo: presupuesto.ahorroTipo,
          cantidad: presupuesto.cantidad,
          subcategoria: { nombre: presupuesto.subcategoriaNombre + '', cantidadMeta: 0, esPrimario: true, estaActivo: true, id: presupuesto.subcategoriaId, nota: '', presupuesto: 0, categoria: { id: 0, nombre: '' } },
          id: 0,
          movimientos: [],
          versionId: 0
        })
        this.total = 0
        this.presupuestos.forEach(item=>{
          this.total = this.total + item.cantidad          
        })
        this.botonQueCierraElModal?.nativeElement.click()
      }, error: (error) => {
        Toast.error(error)
      }
    })
  }

}