import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AhorroDto } from 'src/app/interfaces/ahorro-dto';
import { SubcategoriaDto } from 'src/app/interfaces/subcategoria-dto';
import { PresupuestoDto, PresupuestoDtoIn } from 'src/app/interfaces/version-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-formulario-presupuesto',
  templateUrl: './formulario-presupuesto.component.html',
  styleUrls: ['./formulario-presupuesto.component.css']
})
export class FormularioPresupuestoComponent {
  submitted: boolean = false
  get f() { return this.formGroup.controls }
  protected estaCargando = false
  
  formGroup!: FormGroup
  subcategorias: SubcategoriaDto[] = []
  ahorros: AhorroDto[] = []

  @Output() eventEmitter = new EventEmitter<PresupuestoDtoIn>()
  @Input() presupuesto?: PresupuestoDtoIn  

  constructor(
    private repo: RepositorioService,
    private formBuilder: FormBuilder
  ) {
    this.obtenerSubcategorias()
    this.obtenerAhorros()
    this.inicializarFormulario()
  }

  ngOnChanges() {
    if (this.presupuesto != undefined) {
      //console.log("Formulario", this.presupuesto)
      this.formGroup.patchValue({
        subcategoriaId: this.presupuesto.subcategoriaId,
        cantidad: this.presupuesto.cantidad,        
        ahorroId: this.presupuesto.ahorroId == undefined ? '' : this.presupuesto.ahorroId
      })
    }
  }

  obtenerAhorros() {
    const apartados = 2
    this.repo.ahorro.obtenerTodos().subscribe({
      next: (ahorros) => {
        ahorros.forEach(item => {
          //if (item.tipoDeCuenta.id == apartados)
            this.ahorros.push(item)
        })
      }
    })
  }

  inicializarFormulario() {
    this.formGroup = this.formBuilder.group({
      subcategoriaId: ['', Validators.required],
      cantidad: ['', Validators.required],
      cantidadMeta: '',
      ahorroId: [''],
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
    this.submitted = true
    if (this.formGroup.valid) {
      this.eventEmitter.emit({
        cantidad: this.formGroup.get('cantidad')?.value,
        ahorroTipo: this.obtenerTipoDeAhorro(this.formGroup.get('ahorroId')?.value),
        subcategoriaId: this.formGroup.value.subcategoriaId,
        versionId: this.presupuesto == undefined ? 0 : this.presupuesto.versionId,
        ahorroId: parseInt(this.formGroup.get('ahorroId')?.value)
      })
    }
  }

  obtenerTipoDeAhorro(value: any): string | undefined {
    if(value== undefined)
      return undefined;
    let index = this.ahorros.findIndex(x=>x.id ==value)
    return this.ahorros[index].tipoDeCuenta.nombre
  }

  obtenerSubcategoria(): SubcategoriaDto {
    var id = this.formGroup.get('subcategoriaId')?.value
    var index = this.subcategorias.findIndex(x => x.id == id)
    return this.subcategorias[index]
  }

  cargando(estaCargando: boolean){
    this.estaCargando = estaCargando
    this.habilitarFormulario(estaCargando)
  }

  protected habilitarFormulario(habilitar: boolean) {
    if (habilitar) {
     this.formGroup.controls['subcategoriaId'].disable()
     this.formGroup.controls['cantidad'].disable()
     this.formGroup.controls['cantidadMeta'].disable()
     this.formGroup.controls['ahorroId'].disable()     
   } else {
     this.formGroup.controls['subcategoriaId'].enable()
     this.formGroup.controls['cantidad'].enable()
     this.formGroup.controls['cantidadMeta'].enable()
     this.formGroup.controls['ahorroId'].enable()     
   }
 }
}
