import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubcategoriaDto } from 'src/app/interfaces/subcategoria-dto';
import { PresupuestoDto } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-formulario-presupuesto',
  templateUrl: './formulario-presupuesto.component.html',
  styleUrls: ['./formulario-presupuesto.component.css']
})
export class FormularioPresupuestoComponent {
  formGroup!: FormGroup
  subcategorias: SubcategoriaDto[] = []

  @Output() eventEmitter = new EventEmitter<PresupuestoDto>()
  constructor(
    private repo: RepositorioService,
    private formBuilder: FormBuilder
  ) {
    this.obtenerSubcategorias()
    this.inicializarFormulario()
  }

  inicializarFormulario() {
    this.formGroup = this.formBuilder.group({
      subcategoriaId: ['', Validators.required],
      cantidad: ['', Validators.required],
      cantidadMeta: ['', Validators.required]
    })
  }

  obtenerSubcategorias() {
    this.repo.subcategoria.obtenerTodos().subscribe({
      next: (subcategorias) => {
        this.subcategorias = subcategorias
      }
    })
  }

  guardar() {
    //console.log(this.formGroup.value)
    if (this.formGroup.valid) {
      this.eventEmitter.emit({
        cantidad: this.formGroup.get('cantidad')?.value,
        cantidadMeta: this.formGroup.get('cantidadMeta')?.value,
        id: 0,
        subcategoria: this.obtenerSubcategoria(),
        versionId: 0
      })
    }
  }

  obtenerSubcategoria(): SubcategoriaDto {
    var id = this.formGroup.get('subcategoriaId')?.value
    var index = this.subcategorias.findIndex(x => x.id == id)
    return this.subcategorias[index]
  }
}
