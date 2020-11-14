export class Mascota{

    constructor(
        public createdAt: number,
        public updatedAt: number,
        public id: number,
        public nombre: string,
        public raza: string,
        public edad: string,
        public genero: string,
        public tamanio: string,
        public personalidad: String,
        public color: string,
        public urlImagen: string,
        public estado: number
    ){        
    }
}