import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AhorroDto } from 'src/app/interfaces/ahorro-dto';
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
  ahorros: AhorroDto[] = []

  @Output() eventEmitter = new EventEmitter<PresupuestoDto>()
  @Input() presupuesto!: PresupuestoDto

  constructor(
    private repo: RepositorioService,
    private formBuilder: FormBuilder
  ) {
    this.obtenerSubcategorias()
    this.obtenerAhorros()
    this.inicializarFormulario()
  }

  ngOnChanges(){
    if(this.presupuesto != undefined){
      console.log("Formulario", this.presupuesto)
      this.formGroup.patchValue({
        subcategoriaId: this.presupuesto.subcategoria.id,
        cantidad: this.presupuesto.cantidad,
        cantidadMeta: this.presupuesto.cantidadMeta,
        ahorroId: this.presupuesto.ahorroId == undefined ?'':this.presupuesto.ahorroId
      })
    }
  }

  obtenerAhorros() {
    const apartados = 2
    this.repo.ahorro.obtenerTodos().subscribe({
      next: (ahorros) => {
        ahorros.forEach(item => {
          if (item.tipoDeCuenta.id == apartados)
            this.ahorros.push(item)
        })
      }
    })
  }

  inicializarFormulario() {
    this.formGroup = this.formBuilder.group({
      subcategoriaId: ['', Validators.required],
      cantidad: ['', Validators.required],
      cantidadMeta: ['', Validators.required],
      ahorroId: ''
    })
  }

  obtenerSubcategorias() {
    this.repo.subcategoria.obtenerTodos().subscribe({
      next: (subcategorias) => {
        this.subcategorias = subcategorias
        //console.log(this.subcategorias)
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
        versionId: this.presupuesto.versionId,
        ahorroId:parseInt(this.formGroup.get('ahorroId')?.value)
      })
    }
  }

  obtenerSubcategoria(): SubcategoriaDto {
    var id = this.formGroup.get('subcategoriaId')?.value
    var index = this.subcategorias.findIndex(x => x.id == id)
    return this.subcategorias[index]
  }
}
