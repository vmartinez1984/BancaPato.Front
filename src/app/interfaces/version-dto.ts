import { MovimientoDto } from "./periodo-dto"
import { SubcategoriaDto } from "./subcategoria-dto"

export interface VersionDto {
    id: number
    nombre: string
    fechaInicial: Date
    fechaFinal: Date
    presupuestos: PresupuestoDto[]
}

export interface VersionDtoIn {
    nombre: string
    fechaInicial: Date
    fechaFinal: Date
}

export interface PresupuestoDto {
    movimientos: MovimientoDto[]
    ahorroTipo?: string
    ahorroId?: number
    id: number
    subcategoria?: SubcategoriaDto
    cantidad: number    
    versionId: number
}

export interface PresupuestoDtoIn {    
    subcategoriaId: number
    subcategoriaNombre?:string
    cantidad: number    
    versionId: number
    ahorroId?:number
    ahorroTipo?:string
}