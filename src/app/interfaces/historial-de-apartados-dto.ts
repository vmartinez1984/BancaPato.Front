import { AhorroDto } from "./ahorro-dto"

export interface HistorialDeApartadosDto {
    id: number
    guid: string
    fechaDeRegistro: Date
    cantidad: number
    interes: number
    nota: string
    cuentaId: number
    cuenta?: AhorroDto
}

export interface HistorialDeApartadosDtoIn {
    guid: string
    cantidad: number
    interes: number
    nota: string
    cuentaId: number
}