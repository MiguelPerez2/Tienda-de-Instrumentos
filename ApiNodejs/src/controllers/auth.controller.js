import db_pool_connection from "../database/dataAccess.js";
import {response_created,response_success,response_error,response_not_fount} from '../res/responses.js';

export const Login=async(rep,res)=>{
  try {
    const {email,password}=rep.body;
    const [rows]=await db_pool_connection
    .query('SELECT id,nombre,apellido,email,rolId FROM usuario Where email=? and password=?',
      [email,password]);
    if (rows.length<=0) {
      return res.status(404).json(response_not_fount('No encontrado'))
    }
    res.status(200).json(response_success("Exito",rows));
  } catch (error) {
    res.status(500).json(response_error("error "+error['sqlMessage']))
  }
}
export const RenewSesion=async(rep,res)=>{
  try {
    const id=rep.params.id;
    const [rows]=await db_pool_connection
    .query('SELECT id,nombre,apellido,email,rolId FROM usuario Where id=?',
      [id]);
    if (rows.length<=0) {
      return res.status(404).json(response_not_fount('No encontrado'))
    }
    res.status(200).json(response_success("Exito",rows));
  } catch (error) {
    res.status(500).json(response_error("error "+error['sqlMessage']))
  }
}
//#region Usuario
  export const RegistrarUsuario=async(rep,res)=>{
    try {
      const {estadoId,companiaId,rolId,nombre,apellido,email,password,maxintentos,intentosfallidos}=rep.body;
      const [rows]=await db_pool_connection
      .query('INSERT INTO usuario (estadoId, companiaId, rolId, nombre, apellido, email, password, maxintentos, intentosfallidos) values (?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [estadoId,companiaId,rolId,nombre,apellido,email,password,maxintentos,intentosfallidos]);
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Registrado'))
      }else{
        res.status(200).json(response_created("Usuario Registrado",rows,rows.insertId));
      }
    } catch (error) {
      res.status(500).json(response_error("error al registrar "+ error['sqlMessage']))
    }
  }
  export const ActualizarUsuario=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const {nombre,apellido,email,password}=rep.body;
      const [rows]=await db_pool_connection
      .query('Update usuario set  nombre=?, apellido=?, email=?, password=? WHERE id=?',
        [nombre,apellido,email,password,id]);
        if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Actualizado'))
      }else{
        res.status(200).json(response_success("Usuario Actualizado",rows));
      }
      
    } catch (error) {
      res.status(500).json(response_error("error al Actualizar "+ error['sqlMessage']))
    }
  }
  export const EliminarUsuario=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const [rows]=await db_pool_connection.query('DELETE FROM Usuario WHERE id=?',[id]);
      if (rows.affectedRows>0) {
        res.status(200).json(response_success("Usuario eliminado",rows[0]));
      }
      res.status(404).json(response_not_fount('Usuario no Eliminado'));
    } catch (error) {
      res.status(500).json(response_error("error al eliminar "+error['sqlMessage']))
    }
  }
//#endregion Usuario

//#region estado
  export const EstadoById=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const [rows]=await db_pool_connection.query('SELECT * FROM estado WHERE id=?',[id]);
      if (rows.length<=0) {
          return res.status(404).json(response_not_fount('No hay estado disponibles'))
      }
      res.status(200).json(response_success("Ok",rows));
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
  export const RegistrarEstado=async(rep,res)=>{
    try {
      const {descripcion}=rep.body;
      const [rows]=await db_pool_connection
  .query('INSERT INTO estado (descripcion) values (?)',
      [descripcion]);
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Registrado'))
      }
      res.status(200).json(response_created("estado Registrado",rows,rows.insertId));
    } catch (error) {
      res.status(500).json(response_error("error al registrar "+ error['sqlMessage']))
    }
  }
  export const ActualizarEstado=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const {descripcion}=rep.body;
      const [rows]=await db_pool_connection
      .query('Update estado set descripcion=? WHERE id=?',
      [descripcion,id]);
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Actualizado'))
      }
      res.status(200).json(response_success("estado Actualizado",rows));
    } catch (error) {
      res.status(500).json(response_error("error al Actualizar "+ error['sqlMessage']))
    }
  }
  export const EliminarEstado=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const [rows]=await db_pool_connection.query('DELETE FROM estado WHERE id=?',[id]);
      if (rows.affectedRows>0) {
        res.status(200).json(response_success("estado eliminado",rows[0]));
      }
      res.status(404).json(response_not_fount('estado no Eliminado'));
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
//#endregion estado

//#region Rol
export const ListaRoles=async(rep,res)=>{
  try {
    const [rows]=await db_pool_connection.query('SELECT * FROM rol');
    if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No hay roles disponibles'))
    }
    res.status(200).json(response_success("Ok",rows));
  } catch (error) {
    res.status(500).json(response_error("error "+error['sqlMessage']))
  }
}
export const RegistrarRol=async(rep,res)=>{
  try {
    const {descripcion}=rep.body;
    const [rows]=await db_pool_connection
.query('INSERT INTO rol (descripcion) values (?)',
    [descripcion]);
    if (rows.length<=0) {
      return res.status(404).json(response_not_fount('No Registrado'))
    }
    res.status(200).json(response_created("rol Registrado",rows,rows.insertId));
  } catch (error) {
    res.status(500).json(response_error("error al registrar "+ error['sqlMessage']))
  }
}
export const ActualizarRol=async(rep,res)=>{
  try {
    const id=rep.params.id;
    const {descripcion}=rep.body;
    const [rows]=await db_pool_connection
    .query('Update rol set descripcion=? WHERE id=?',
    [descripcion,id]);
    if (rows.length<=0) {
      return res.status(404).json(response_not_fount('No Actualizado'))
    }
    res.status(200).json(response_success("rol Actualizado",rows));
  } catch (error) {
    res.status(500).json(response_error("error al Actualizar "+ error['sqlMessage']))
  }
}
export const EliminarRol=async(rep,res)=>{
  try {
    const id=rep.params.id;
    const [rows]=await db_pool_connection.query('DELETE FROM rol WHERE id=?',[id]);
    if (rows.affectedRows>0) {
      res.status(200).json(response_success("rol eliminado",rows[0]));
    }
    res.status(404).json(response_not_fount('rol no Eliminado'));
  } catch (error) {
    res.status(500).json(response_error("error "+error['sqlMessage']))
  }
}
//#endregion Rol









// {
//   "estadoId":1,
//   "companiaId":1,
//   "rolId": 1,
//   "nombre": "miguel",
//   "apellido":"perez",
//   "email":"miguel@gmail.com",
//   "password": "12345",
//   "maxintentos": 4,
//   "intentosfallidos":0
// }