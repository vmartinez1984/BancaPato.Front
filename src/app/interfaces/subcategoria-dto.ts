import { CategoriaDto } from "./categoria-dto"

export interface SubcategoriaDto {
    id: number
    categoria: CategoriaDto
    nombre: string
    presupuesto: number
    estaActivo: boolean
    cantidadMeta: number
    nota: string
    esPrimario: boolean
}

export interface SubcategoriaDtoIn {
    categoriaId: number
    nombre: string
    presupuesto: number
    guid?: string
    estaActivo: boolean
    esPrimario: boolean
    cantidadMeta: number
    nota: string
}