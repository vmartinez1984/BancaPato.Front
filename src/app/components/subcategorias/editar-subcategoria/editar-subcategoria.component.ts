import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
//import { Guid } from 'src/app/helpers/Guid';
//import { Toast } from 'src/app/helpers/Toast';
import { SubcategoriaDto, SubcategoriaDtoIn } from 'src/app/interfaces/subcategoria-dto';
//import { ModalComponent } from '../../modal/modal.component'
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CategoriaDto } from 'src/app/interfaces/categoria-dto';

@Component({
  selector: 'app-editar-subcategoria',
  templateUrl: './editar-subcategoria.component.html',
  styleUrls: ['./editar-subcategoria.component.css']
})
export class EditarSubcategoriaComponent {
  @Input() targetModal!: string
  @Output() eventEmmiter = new EventEmitter<SubcategoriaDto>()
  @Input() subcategoria!: SubcategoriaDto

  //@ViewChild('formulario') formulario!: FormularioSubcategoriaComponent
  //@ViewChild('modalEditarSubcategoria') modal!: ModalComponent

  constructor(
    private repo: RepositorioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.queryParams.subscribe((data) => {
      //console.log(data)
      var subcategoria: SubcategoriaDto = {
        id: data['id'],
        cantidadMeta: 0,
        categoria: this.obtenerCategoria(data),
        esPrimario: data['esPrimario'],
        estaActivo: data['estaActivo'],
        nombre: data['nombre'],
        nota: data['nota'],
        presupuesto: data['presupuesto']
      }
      this.subcategoria = subcategoria
      //console.log(this.subcategoria)
    })
  }

  obtenerCategoria(data: Params): CategoriaDto {
    return {
      id: data['categoriaId'],
      nombre: ''
    }
  }

  actualizar(subcategoria: SubcategoriaDto) {
    //subcategoria.guid = this.subcategoria.guid
    subcategoria.id = this.subcategoria.id
    console.log(subcategoria)
    //this.formulario.estaGuardando(true)
    this.repo.subcategoria.actualizar(subcategoria.id, this.obtenerSubcategoriaDtoIn(subcategoria)).subscribe({
      next: (data) => {
        // this.formulario.estaGuardando(false)
        // this.modal.cerrarModal()        
        //this.eventEmmiter.emit(subcategoria)
        // Toast.ok()
        // this.formulario.estaGuardando(false)
        this.router.navigate(['subcategorias'])
      },
      error: (data) => {
        console.log(data)
        //Toast.error()
        //this.formulario.estaGuardando(false)
      }
    })
  }

  obtenerSubcategoriaDtoIn(subcategoria: SubcategoriaDto): SubcategoriaDtoIn {
    var subcategoriaDtoIn: SubcategoriaDtoIn = {
      presupuesto: subcategoria.presupuesto,
      cantidadMeta: subcategoria.cantidadMeta,
      categoriaId: subcategoria.categoria.id,
      esPrimario: subcategoria.esPrimario,
      estaActivo: subcategoria.estaActivo,
      //guid: Guid.newGuid(),
      nombre: subcategoria.nombre,
      nota: subcategoria.nota
    }

    return subcategoriaDtoIn
  }
}
