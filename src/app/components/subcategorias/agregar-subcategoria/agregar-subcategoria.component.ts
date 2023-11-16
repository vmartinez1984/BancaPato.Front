import { Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { SubcategoriaDto, SubcategoriaDtoIn } from 'src/app/interfaces/subcategoria-dto';
import { FormularioSubcategoriaComponent } from '../formulario-subcategoria/formulario-subcategoria.component';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';
import { Router } from '@angular/router';
//import { Guid } from 'src/app/helpers/Guid';
// import { Toast } from 'src/app/helpers/Toast';
// import { ModalComponent } from '../../modal/modal.component';

@Component({
  selector: 'app-agregar-subcategoria',
  templateUrl: './agregar-subcategoria.component.html',
  styleUrls: ['./agregar-subcategoria.component.css']
})
export class AgregarSubcategoriaComponent {
  @Input() targetModal!: string
  @Output() eventEmmiter = new EventEmitter<SubcategoriaDto>()

  //@ViewChild('formulario') formulario!: FormularioSubcategoriaComponent
  //@ViewChild('modalAgregarSubcategoria') modal!: ModalComponent

  constructor(
    private repo: RepositorioService,
    private router: Router
  ) { }

  guardar(subcategoria: SubcategoriaDto) {
    console.log(subcategoria)
    //this.formulario.estaGuardando(true)
    
    this.repo.subcategoria.agregar(this.obtenerSubcategoriaDtoIn(subcategoria)).subscribe({
      next: (data) => {
        //this.formulario.estaGuardando(false)
        //this.modal.cerrarModal()
        //subcategoria.id = data.id
        //this.eventEmmiter.emit(subcategoria)
        //Toast.ok()
        this.router.navigate(['subcategorias'])
      },
      error: (data)=>{
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
