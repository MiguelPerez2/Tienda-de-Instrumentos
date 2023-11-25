import { Router } from "express";
import { ActualizarEstado, ActualizarRol, ActualizarUsuario, EliminarEstado, EliminarRol, EliminarUsuario, EstadoById, ListaRoles, Login, RegistrarEstado, RegistrarRol, RegistrarUsuario, RenewSesion } from "../controllers/auth.controller.js";

const auth=new Router();

auth.post('/login', Login);
auth.get('/renewsesion/:id', RenewSesion);

auth.post('/registrar_usuario',RegistrarUsuario);
auth.put('/actualizar_usuario/:id',ActualizarUsuario);
auth.delete('/eliminar_usuario/:id',EliminarUsuario);

auth.get('/estadobyid/:id',EstadoById);
auth.post('/registrar_estado',RegistrarEstado);
auth.put('/actualizar_estado/:id',ActualizarEstado);
auth.delete('/eliminar_estado/:id',EliminarEstado);

auth.get('/lista_roles',ListaRoles);
auth.post('/registrar_rol',RegistrarRol);
auth.put('/actualizar_rol/:id',ActualizarRol);
auth.delete('/eliminar_rol/:id',EliminarRol);

export default auth;

