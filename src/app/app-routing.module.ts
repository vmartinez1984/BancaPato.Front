import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaDeCuentasComponent } from './components/cuenta/lista-de-cuentas/lista-de-cuentas.component';
import { AgregarCuentaComponent } from './components/cuenta/agregar-cuenta/agregar-cuenta.component';
import { RetiroComponent } from './components/transaccion/retiro/retiro.component';
import { DepositoComponent } from './components/transaccion/deposito/deposito.component';
import { ListaDeSubcategoriasComponent } from './components/subcategorias/lista-de-subcategorias/lista-de-subcategorias.component';
import { ListaDeVersionesComponent } from './components/version/lista-de-versiones/lista-de-versiones.component';
import { AgregarVersionComponent } from './components/version/agregar-version/agregar-version.component';
import { EditarVersionComponent } from './components/version/editar-version/editar-version.component';
import { AgregarSubcategoriaComponent } from './components/subcategorias/agregar-subcategoria/agregar-subcategoria.component';
import { EditarSubcategoriaComponent } from './components/subcategorias/editar-subcategoria/editar-subcategoria.component';
import { ListaDePeriodosComponent } from './components/periodo/lista-de-periodos/lista-de-periodos.component';
import { AgregarPeriodoComponent } from './components/periodo/agregar-periodo/agregar-periodo.component';
import { EditarCuentaComponent } from './components/cuenta/editar-cuenta/editar-cuenta.component';
import { DetallesDeCuentaComponent } from './components/cuenta/detalles/detalles.component';
import { DetallesDePeriodoComponent } from './components/periodo/detalles-de-periodo/detalles-de-periodo.component';
import { VersionDetallesComponent } from './components/version/version-detalles/version-detalles.component';

const routes: Routes = [  
  { path: '', component: ListaDeCuentasComponent },
  { path: 'ahorros', component: ListaDeCuentasComponent },
  { path: 'ahorros/agregar', component: AgregarCuentaComponent },
  { path: 'ahorros/:id/retiros', component: RetiroComponent },
  { path: 'ahorros/:id/depositos', component: DepositoComponent },
  { path: 'ahorros/:id/detalles', component: DetallesDeCuentaComponent },
  { path: 'ahorros/:id/editar', component: EditarCuentaComponent },
  { path: 'subcategorias', component: ListaDeSubcategoriasComponent },
  { path: 'versiones', component: ListaDeVersionesComponent },
  { path: 'versiones/agregar', component: AgregarVersionComponent },
  { path: 'versiones/editar/:id', component: EditarVersionComponent },
  { path: 'versiones/:id/presupuestos', component: VersionDetallesComponent },
  { path: 'subcategorias', component: ListaDeSubcategoriasComponent },
  { path: 'subcategorias/agregar', component: AgregarSubcategoriaComponent },
  { path: 'subcategorias/editar/:id', component: EditarSubcategoriaComponent },
  { path: 'periodos', component: ListaDePeriodosComponent },
  { path: 'periodos/agregar', component: AgregarPeriodoComponent },
  { path: 'periodos/:id/detalles', component: DetallesDePeriodoComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
