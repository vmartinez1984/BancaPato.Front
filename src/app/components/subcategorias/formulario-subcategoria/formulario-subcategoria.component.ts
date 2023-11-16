import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoriaDto } from 'src/app/interfaces/categoria-dto';
import { SubcategoriaDto, SubcategoriaDtoIn } from 'src/app/interfaces/subcategoria-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-formulario-subcategoria',
  templateUrl: './formulario-subcategoria.component.html',
  styleUrls: ['./formulario-subcategoria.component.css']
})
export class FormularioSubcategoriaComponent {
  formGroup!: FormGroup
  submitted = false
  estaCargando: boolean = false

  @Input() tituloDelModal = ''
  @Input() subcategoria!: SubcategoriaDto
  @Output() eventEmmiter = new EventEmitter<SubcategoriaDto>()

  categorias: CategoriaDto[] = []

  constructor(
    private formBuilder: FormBuilder,
    private repo: RepositorioService
  ) {
    this.formGroup = this.formBuilder.group({
      id: 0,
      categoriaId: ['', Validators.required],
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      cantidadMeta: '',
      esPrimario: false,
      nota: ''
    })
    this.obtenerCategorias()
  }

  get f() { return this.formGroup.controls }

  ngOnChanges() {
    if (this.subcategoria != undefined) {
      //console.log(this.subcategoria)
      this.formGroup.patchValue(
        {
          id: this.subcategoria.id,
          categoriaId: this.subcategoria.categoria.id,
          nombre: this.subcategoria.nombre,
          cantidad: this.subcategoria.presupuesto,
          cantidadMeta: this.subcategoria.cantidadMeta,
          esPrimario: this.subcategoria.esPrimario,
          nota: this.subcategoria.nota
        }
      )
    }
  }

  obtenerCategorias() {
    this.repo.categoria.obtenerTodos().subscribe({
      next: (categorias) => {
        this.categorias = categorias
      }
    })
  }

  guardar() {
    console.log(this.formGroup.value)
    this.submitted = true
    if (this.formGroup.valid) {
      var subcategoria: SubcategoriaDto = {
        id: 0,
        presupuesto: this.formGroup.get('cantidad')?.value,
        nombre: this.formGroup.get('nombre')?.value,
        esPrimario: this.formGroup.get('esPrimario')?.value.toString() == 'true' ? true : false,
        categoria: this.obtenerCategoria(this.formGroup.get('categoriaId')?.value),
        cantidadMeta: this.formGroup.get('cantidadMeta')?.value,
        estaActivo: this.formGroup.get('estaActivo')?.value.toString() == 'true' ? true : false,
        nota: this.formGroup.get('nota')?.value
      }
      console.log(subcategoria)
      this.eventEmmiter.emit(subcategoria)
    }    
  }

  // obtenerSubcategoria(id: number, subcategoria: SubcategoriaDtoIn): SubcategoriaDto {
  //   var subcategoriaDto: SubcategoriaDto = {
  //     id: id,
  //     presupuesto: subcategoria.presupuesto,
  //     cantidadMeta: subcategoria.cantidadMeta,
  //     categoria: this.obtenerCategoria(subcategoria.categoriaId),
  //     esPrimario: subcategoria.esPrimario,
  //     estaActivo: true,
  //     nombre: subcategoria.nombre,
  //     nota: subcategoria.nota
  //   }

  //   return subcategoriaDto
  // }

  obtenerCategoria(categoriaId: number): CategoriaDto {
    var categoria: CategoriaDto = { id: 0, nombre: '' }
    this.categorias.forEach(item => {
      if (item.id == categoriaId)
        categoria = item
    })

    return categoria
  }

  /**
   * Deshabilita el formulario y coloca los letrero que indica que esta procesando
   * @param estaGuardando true o false
   */
  estaGuardando(estaGuardando: boolean) {
    if (estaGuardando) {
      this.estaCargando = true
      this.habilitarFormulario(false)
    } else {
      this.estaCargando = false
      this.habilitarFormulario(true)
    }
  }

  private habilitarFormulario(habilitar: boolean) {
    if (habilitar) {
      this.formGroup.controls['categoriaId'].enable()
      this.formGroup.controls['cantidad'].enable()
      this.formGroup.controls['nombre'].enable()
      this.formGroup.controls['esPrimario'].enable()
    } else {
      this.formGroup.controls['categoriaId'].disable()
      this.formGroup.controls['cantidad'].disable()
      this.formGroup.controls['nombre'].disable()
      this.formGroup.controls['esPrimario'].disable()
    }
  }

}