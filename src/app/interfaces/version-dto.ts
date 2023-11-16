import { SubcategoriaDto } from "./subcategoria-dto"

export interface VersionDto {
    id: number
    nombre: string
    fechaInicial: Date
    fechaFinal: Date
}

export interface VersionDtoIn {
    nombre: string
    fechaInicial: Date
    fechaFinal: Date
}

export interface PresupuestoDto {
    id: number
    subcategoria: SubcategoriaDto
    cantidad: number
    cantidadMeta: number
    versionId: number
}

export interface PresupuestoDtoIn {    
    subcategoriaId: number
    cantidad: number
    cantidadMeta: number
    versionId: number
}