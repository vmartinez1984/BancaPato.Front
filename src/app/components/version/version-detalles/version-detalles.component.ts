import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-version-detalles',
  templateUrl: './version-detalles.component.html',
  styleUrls: ['./version-detalles.component.css']
})
export class VersionDetallesComponent {
  versionId!: number

  constructor(private activatedRoute: ActivatedRoute) {
    //console.log("detalles")
    this.activatedRoute.params.subscribe((data) => {
      //console.log(data)
      this.versionId = data['id']
    })
    this.activatedRoute.queryParams.subscribe((data) => {
      //console.log(data)
    })
  }

}
