import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DepositoDto } from 'src/app/interfaces/deposito-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-deposito',
  templateUrl: './deposito.component.html',
  styleUrls: ['./deposito.component.css']
})
export class DepositoComponent {
  formGroup: FormGroup
  ahorroId: string = ''

  constructor(
    private formBuilder: FormBuilder,
    private repo: RepositorioService,
    private activatedRoute: ActivatedRoute,   
    private router: Router 
  ) {
    this.activatedRoute.paramMap.subscribe(params => {
      //console.log(params)
      this.ahorroId = params.get('id') + ""
    })
    this.formGroup = this.formBuilder.group({
      cantidad: ['', Validators.required],
      concepto: ['', Validators.required],
      nota: ''
    })
  }

  guardar() {
    var deposito: DepositoDto = {
      cantidad : this.formGroup.get('cantidad')?.value,
      concepto: this.formGroup.get('concepto')?.value,
      nota: this.formGroup.get('nota')?.value
    }
    //console.log(deposito)
    this.repo.ahorro.depositar(this.ahorroId, deposito).subscribe({
      next: (data)=>{
        this.router.navigate(['ahorros'])
      }
    })
  }
}
