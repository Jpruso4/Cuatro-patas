export class Adopcion{

    constructor(
        public createdAt: number,
        public updatedAt: number,
        public id: number,
        public direccion: string,
        public ciudad: string,
        public barrio: string,
        public estrato: string,
        public primeraVezAdopta: number,
        public cantidadMascotas: string,
        public recursosEconomicos: number,
        public hogarSeguro: number,
        public todosSeguros: number,
        public porqueAdoptar: string,
        public idUsuario: number,
        public nombreUsuario: String,
        public idMascota: number,
        public nombreMascota: string,
        public estado: number
    ){        
    }
}