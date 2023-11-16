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
import { VersionDetallesComponent } from './components/version/version-detalles/version-detalles.component';
import { AgregarSubcategoriaComponent } from './components/subcategorias/agregar-subcategoria/agregar-subcategoria.component';
import { EditarSubcategoriaComponent } from './components/subcategorias/editar-subcategoria/editar-subcategoria.component';
import { AgregarPresupuestoComponent } from './components/presupuesto/agregar-presupuesto/agregar-presupuesto.component';
import { EditarPresupuestoComponent } from './components/presupuesto/editar-presupuesto/editar-presupuesto.component';
import { ListaDePresupuestoComponent } from './components/presupuesto/lista-de-presupuesto/lista-de-presupuesto.component';
import { ListaDeHistorialComponent } from './components/historial/lista-de-historial/lista-de-historial.component';
import { AgregarHistorialComponent } from './components/historial/agregar-historial/agregar-historial.component';

const routes: Routes = [
  { path: 'ahorros', component: ListaDeCuentasComponent },
  { path: 'ahorros/agregar', component: AgregarCuentaComponent },
  { path: 'ahorros/:id/retiros', component: RetiroComponent },
  { path: 'ahorros/:id/depositos', component: DepositoComponent },
  { path: 'subcategorias', component: ListaDeSubcategoriasComponent },
  { path: 'versiones', component: ListaDeVersionesComponent },
  { path: 'versiones/agregar', component: AgregarVersionComponent },
  { path: 'versiones/editar/:id', component: EditarVersionComponent },
  { path: 'versiones/:id/presupuestos', component: ListaDePresupuestoComponent },
  { path: 'versiones/:id/presupuestos/agregar', component: AgregarPresupuestoComponent },
  { path: 'versiones/:id/presupuestos/editar/:presupuestoId', component: EditarPresupuestoComponent },
  { path: 'subcategorias', component: ListaDeSubcategoriasComponent },
  { path: 'subcategorias/agregar', component: AgregarSubcategoriaComponent },
  { path: 'subcategorias/editar/:id', component: EditarSubcategoriaComponent },
  { path: 'historialDeApartados', component:ListaDeHistorialComponent},
  { path: 'historialDeApartados/agregar', component:AgregarHistorialComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
