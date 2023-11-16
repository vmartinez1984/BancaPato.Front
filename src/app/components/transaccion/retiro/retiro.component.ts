import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RetiroDto } from 'src/app/interfaces/retiro-dto';
import { RepositorioService } from 'src/app/services/repositories/repositorio.service';

@Component({
  selector: 'app-retiro',
  templateUrl: './retiro.component.html',
  styleUrls: ['./retiro.component.css']
})
export class RetiroComponent {
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
      nota: ''
    })
  }

  guardar() {
    var retiro: RetiroDto = {
      cantidad: this.formGroup.get('cantidad')?.value,      
      nota: this.formGroup.get('nota')?.value
    }
    console.log(this.formGroup.value)
    this.repo.ahorro.retirar(this.ahorroId, retiro).subscribe({
      next: (data) => {
        this.router.navigate(['ahorros'])
      }
    })
  }

}