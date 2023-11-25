create database venta_instruments;
use venta_instruments;
create table estado(
id int auto_increment primary key,
descripcion varchar(50)
);
create table estado_compra(
id int auto_increment primary key,
descripcion varchar(50)
);
create table rol(
id int auto_increment primary key,
descripcion varchar(50)
);
create table compania(
id int auto_increment primary key,
estadoId int,
nombre_compania varchar(50),
ruc varchar(50),
descripcion varchar(50),
razon_Social varchar(50),
direccion_Matriz varchar(50),
url_img  varchar(50),
FOREIGN KEY (estadoId) REFERENCES estado(id)
);
select *from usuario;
create table usuario(
id int auto_increment primary key,
estadoId int,
companiaId int,
rolId int,
nombre varchar(50),
apellido varchar(50),
email varchar(50),
password varchar(50),
maxintentos int,
intentosfallidos int,
FOREIGN KEY (estadoId) REFERENCES estado(id),
FOREIGN KEY (rolId) REFERENCES rol(id),
FOREIGN KEY (companiaId) REFERENCES compania(id)
);
create table categoria_producto(
id int auto_increment primary key,
estadoId int,
nombre_categoria varchar(50),
FOREIGN KEY (estadoId) REFERENCES estado(id)
);
create table Marca_Producto(
id int auto_increment primary key,
estadoId int,
companiaId int,
nombre_marca varchar(50),
FOREIGN KEY (estadoId) REFERENCES estado(id),
FOREIGN KEY (companiaId) REFERENCES compania(id)
);

create table producto(
id int auto_increment primary key,
estadoId int,
companiaId int,
marca_producto_Id int,
categoria_producto_Id int,
nombre_producto varchar(50),
descripcionlg varchar(500),
descripcionxs varchar(500),
stock int,
estrellas int,
url_Img varchar(50),
precio_ahora decimal(10,2),
precio_antes decimal(10,2),
FOREIGN KEY (estadoId) REFERENCES estado(id),
FOREIGN KEY (marca_producto_Id) REFERENCES Marca_Producto(id),
FOREIGN KEY (categoria_producto_Id) REFERENCES categoria_producto(id),
FOREIGN KEY (companiaId) REFERENCES compania(id)
);
create table Orden(
id int auto_increment primary key,
estadoId int,
usuarioId int,
companiaId int,
nombre varchar(50),
apellido varchar(50),
email varchar(50),
costo_envio decimal(10,2),
total decimal(10,2),
token_orden varchar(50),
direccion_1 varchar(50),
direccion_2 varchar(50),
fecha datetime,
FOREIGN KEY (estadoId) REFERENCES estado_compra(id),
FOREIGN KEY (usuarioId) REFERENCES usuario(id),
FOREIGN KEY (companiaId) REFERENCES compania(id)
);
create table Items(
id int auto_increment primary key,
estadoId int,
usuarioId int,
productoId int,
ordenId int NULL, 
cantidad int,
fecha datetime,
FOREIGN KEY (estadoId) REFERENCES estado_compra(id),
FOREIGN KEY (usuarioId) REFERENCES usuario(id),
FOREIGN KEY (productoId) REFERENCES producto(id),
FOREIGN KEY (ordenId) REFERENCES orden(id)
)