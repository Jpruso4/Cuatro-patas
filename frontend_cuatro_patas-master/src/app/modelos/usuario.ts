export class Usuario{

    constructor(
        public createdAt: number,
        public updatedAt: number,
        public id: number,
        public primerNombre: string,
        public segundoNombre: string,
        public primerApellido: string,
        public segundoApellido: string,
        public identificacion: string,
        public clave: String,
        public correoElectronico: string,
        public celular: string,
        public estado: number,
        public tipoIdentificacion: string,
        public tipoUsuario: number
    ){        
    }
}