-- Página para instalar el postgres
http://www.postgresqltutorial.com/install-postgresql/

-- Para crear el rol que se va a usar en postgres.
CREATE ROLE postgres LOGIN PASSWORD 'admin';

-- Para ver los roles creados.
SELECT rolname FROM pg_roles;

-- Para crear la base de datos a usar.
CREATE DATABASE cuatro_patas OWNER postgres;

-- Insertar usuario prueba
INSERT INTO public."USUARIOS"("createdAt", "updatedAt", "idUsuario", "primerNombre", "segundoNombre", "primerApellido", "segundoApellido", identificacion, clave, "correoElectronico", celular, estado, "tipoIdentificacion", "tipoUsuario")
	VALUES ('1593053220108','1593053220108', default,'Admin','','','','12345','Admin1234','admin@gmail.com','1',1,'1', 1);

INSERT INTO public."MASCOTAS"("createdAt", "updatedAt", "idMascota", nombre, raza, edad, genero, tamanio, personalidad, color, "urlImagen", estado)
	VALUES ('1593053220108','1593053220108', default, 'Orión', 'Shih Tzu', '4', 'Macho', 'Pequeño', 'Juguetón', 'Blanco con café', '../../assets/img/c1.jpg', 1);

INSERT INTO public."MASCOTAS"("createdAt", "updatedAt", "idMascota", nombre, raza, edad, genero, tamanio, personalidad, color, "urlImagen", estado)
	VALUES ('1593053220108','1593053220108', default, 'Tobi', 'Pinscher', '3', 'Macho', 'Pequeño', 'Juguetón', 'Café', '../../assets/img/c3.jpg', 1);
	
INSERT INTO public."MASCOTAS"("createdAt", "updatedAt", "idMascota", nombre, raza, edad, genero, tamanio, personalidad, color, "urlImagen", estado)
	VALUES ('1593053220108','1593053220108', default, 'Kaiser', 'Jindu Koreano', '2', 'Macho', 'Mediano', 'Jugueton y Cariñoso', 'Blanco', '../../assets/img/dg3.jpg', 1);

INSERT INTO public."MASCOTAS"("createdAt", "updatedAt", "idMascota", nombre, raza, edad, genero, tamanio, personalidad, color, "urlImagen", estado)
	VALUES ('1593053220108','1593053220108', default, 'Leo', 'JShikoku', '3', 'Macho', 'Mediano', 'Jugueton y Cariñoso', 'Blanco', '../../assets/img/dg1.jpg', 1);

INSERT INTO public."MASCOTAS"("createdAt", "updatedAt", "idMascota", nombre, raza, edad, genero, tamanio, personalidad, color, "urlImagen", estado)
	VALUES ('1593053220108','1593053220108', default, 'Geminis', 'Samoyedo', '3', 'Hembra', 'Mediano', 'Cariñosa y Timida', 'Café con Blanco', '../../assets/img/dg2.jpg', 1);

INSERT INTO public."MASCOTAS"("createdAt", "updatedAt", "idMascota", nombre, raza, edad, genero, tamanio, personalidad, color, "urlImagen", estado)
	VALUES ('1593053220108','1593053220108', default, 'Colby', 'Sabueso Aleman', '2', 'Macho', 'Mediano', 'Jugueton y amigable', 'Blanco, Café y Negro', '../../assets/img/dg4.jpg', 1);

INSERT INTO public."MASCOTAS"("createdAt", "updatedAt", "idMascota", nombre, raza, edad, genero, tamanio, personalidad, color, "urlImagen", estado)
	VALUES ('1593053220108','1593053220108', default, 'Lola', 'American Terrier', '2', 'Hembra', 'Mediano', 'Cariñosa y Juguetona', 'Café', '../../assets/img/dg5.jpg', 1);

INSERT INTO public."MASCOTAS"("createdAt", "updatedAt", "idMascota", nombre, raza, edad, genero, tamanio, personalidad, color, "urlImagen", estado)
	VALUES ('1593053220108','1593053220108', default, 'Acuario', 'Dalmata', '2', 'Hembra', 'Grande', 'Cariñosa', 'Blanco con negro', '../../assets/img/dg6.jpg', 1);

INSERT INTO public."MASCOTAS"("createdAt", "updatedAt", "idMascota", nombre, raza, edad, genero, tamanio, personalidad, color, "urlImagen", estado)
	VALUES ('1593053220108','1593053220108', default, 'Lucas', 'Terrier de norwich', '3', 'Macho', 'Pequeño', 'Juguetón', 'Café', '../../assets/img/dg7.jpg', 1);
