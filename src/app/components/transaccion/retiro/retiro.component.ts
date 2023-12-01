import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AhorroDto } from 'src/app/interfaces/ahorro-dto';
import { RetiroDto } from 'src/app/interfaces/retiro-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.css']
})
export class RetiroComponent {
  estaCargando = false
  submitted: boolean = false
  get f() { return this.formGroup.controls }

  formGroup: FormGroup
  ahorroId: string = ''
  ahorro?: AhorroDto

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
      nota: ''
    })
  }

  obtenerAhorro(ahorroId: string) {
    this.repo.ahorro.obtener(parseInt(ahorroId)).subscribe({
      next: (ahorro) => {
        this.ahorro = ahorro
        console.log(ahorro)
      }
    })
  }

  guardar() {
    this.submitted = true
    if (this.formGroup.valid) {
      var retiro: RetiroDto = {
        cantidad: this.formGroup.get('cantidad')?.value,
        nota: this.formGroup.get('nota')?.value
      }
      this.estaCargando = true
      console.log(this.formGroup.value)
      this.repo.ahorro.retirar(this.ahorroId, retiro).subscribe({
        next: (data) => {
          this.router.navigate(['ahorros'])
          this.estaCargando = false
        },
        error: (data)=>{
          alert('Valio pepino')
          console.log(data)
        }
      })
    }
  }

}