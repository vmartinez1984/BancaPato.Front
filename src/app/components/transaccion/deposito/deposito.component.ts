import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { data } from 'jquery';
import { Guid } from 'src/app/helpers/Guid';
import { Toast } from 'src/app/helpers/Toast';
import { AhorroDto } from 'src/app/interfaces/ahorro-dto';
import { DepositoDto } from 'src/app/interfaces/deposito-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent {
  submitted: boolean = false
  get f() { return this.formGroup.controls }

  estaCargando = false
  formGroup: FormGroup
  ahorroId: string = ''
  ahorro?: AhorroDto

  @ViewChild('cantidad') inputCantidad!: ElementRef

  constructor(
    private formBuilder: FormBuilder,
    private repo: RepositorioService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      //console.log(params)
      this.ahorroId = params.get('id') + ""
      this.obtenerAhorro(this.ahorroId)
    })
    this.formGroup = this.formBuilder.group({
      cantidad: ['', Validators.required],
      concepto: ''// ['', Validators.required],
      //nota: ''
    })
  }

  ngOnInit() {
    setTimeout(() => {
      this.inputCantidad.nativeElement.focus()
    }, 500)
  }

  obtenerAhorro(ahorroId: string) {
    this.repo.ahorro.obtener(parseInt(ahorroId)).subscribe({
      next: (ahorro) => {
        this.ahorro = ahorro
      }
    })
  }

  guardar() {
    //console.log(this.formGroup.valid)
    this.submitted = true
    if (this.formGroup.valid) {
      var deposito: DepositoDto = {
        cantidad: this.formGroup.get('cantidad')?.value,
        concepto: this.formGroup.get('concepto')?.value,
        nota: this.formGroup.get('nota')?.value,
        guid : Guid.newGuid()
      }
      //console.log(deposito)
      this.cargando(true)
      this.repo.ahorro.depositar(this.ahorroId, deposito).subscribe({
        next: (data) => {
          this.cargando(false)
          this.router.navigate(['ahorros'])
        }, error: (data) => {
          Toast.error()
          console.log(data)
          this.cargando(false)
        }
      })
    } else {
      this.inputCantidad.nativeElement.focus()
      // this.submitted = false
    }
  }

  cargando(estaCargando: boolean) {
    this.estaCargando = estaCargando
    this.habilitarFormulario(estaCargando)
  }

  habilitarFormulario(habilitar: boolean) {
    if (habilitar) {
      this.formGroup.controls['cantidad'].disable()
      this.formGroup.controls['concepto'].disable()
    } else {
      this.formGroup.controls['cantidad'].enable()
      this.formGroup.controls['concepto'].enable()
    }
  }

}
