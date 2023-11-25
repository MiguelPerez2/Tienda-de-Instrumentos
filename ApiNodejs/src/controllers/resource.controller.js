import db_pool_connection from "../database/dataAccess.js";
import {response_created,response_success,response_error,response_not_fount} from '../res/responses.js';

//#region Producto
  export const ListaProductos=async(rep,res)=>{
    try {
      const [rows]=await db_pool_connection.query('SELECT * FROM producto');
      if (rows.length<=0) {
          return res.status(404).json(response_not_fount('No hay productos disponibles'))
      }
      res.status(200).json(response_success("Ok",rows));
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
  export const RegistrarProducto=async(rep,res)=>{
    try {
      const {estadoId,companiaId,marca_producto_Id,categoria_producto_Id,nombre_producto,descripcion,stock,estrellas,url_Img,precio_ahora,precio_antes}=rep.body;
      const [rows]=await db_pool_connection
  .query('INSERT INTO producto (estadoId,companiaId,marca_producto_Id,categoria_producto_Id,nombre_producto,descripcion,stock,estrellas,url_Img,precio_ahora,precio_antes) values (?, ?, ?, ?, ?, ?, ?, ?, ?,?,?)',
      [estadoId,companiaId,marca_producto_Id,categoria_producto_Id,nombre_producto,descripcion,stock,estrellas,url_Img,precio_ahora,precio_antes]);
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Registrado'))
      }
      res.status(200).json(response_created("Producto Registrado",rows,rows.insertId));
    } catch (error) {
      res.status(500).json(response_error("error al registrar "+ error['sqlMessage']))
    }
  }
  export const ActualizarProducto=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const {estadoId,companiaId,marca_producto_Id,categoria_producto_Id,nombre_producto,descripcion,stock,estrellas,url_Img,precio_ahora,precio_antes}=rep.body;
      const [rows]=await db_pool_connection
      .query('Update producto set estadoId=?,companiaId=?,marca_producto_Id=?,categoria_producto_Id=?,nombre_producto=?,descripcion=?,stock=?,estrellas=?,url_Img=?,precio_ahora=?,precio_antes=?  WHERE id=?',
      [estadoId,companiaId,marca_producto_Id,categoria_producto_Id,nombre_producto,descripcion,stock,estrellas,url_Img,precio_ahora,precio_antes,id]);
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Actualizado'))
      }
      res.status(200).json(response_success("Producto Actualizado",rows));
    } catch (error) {
      res.status(500).json(response_error("error al Actualizar "+ error['sqlMessage']))
    }
  }
  export const EliminarProducto=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const [rows]=await db_pool_connection.query('DELETE FROM producto WHERE id=?',[id]);
      if (rows.affectedRows>0) {
        res.status(200).json(response_success("producto eliminado",rows[0]));
      }else{
        res.status(404).json(response_not_fount('producto no Eliminado'));
      }
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
//#endregion Producto
  
//#region Marca Producto
  export const ListaMarcas_Producto=async(rep,res)=>{
    try {
      const [rows]=await db_pool_connection.query('SELECT * FROM Marca_Producto');
      if (rows.length<=0) {
          return res.status(404).json(response_not_fount('No hay Marcas disponibles'))
      }
      res.status(200).json(response_success("Ok",rows));
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
  export const RegistrarMarca_Producto=async(rep,res)=>{
    try {
      const {estadoId,companiaId,nombre_marca}=rep.body;
      const [rows]=await db_pool_connection
  .query('INSERT INTO Marca_Producto (estadoId,companiaId,nombre_marca) values (?, ?, ?)',
      [estadoId,companiaId,nombre_marca]);
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Registrado'))
      }
      res.status(200).json(response_created("Marca Registrada",rows,rows.insertId));
    } catch (error) {
      res.status(500).json(response_error("error al registrar "+ error['sqlMessage']))
    }
  }
  export const ActualizarMarca_Producto=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const {estadoId,companiaId,nombre_marca}=rep.body;
      const [rows]=await db_pool_connection
      .query('Update Marca_Producto set estadoId=?,companiaId=?,nombre_marca=? WHERE id=?',
      [estadoId,companiaId,nombre_marca,id]);
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Actualizado'))
      }
      res.status(200).json(response_success("Marca Actualizado",rows));
    } catch (error) {
      res.status(500).json(response_error("error al Actualizar "+ error['sqlMessage']))
    }
  }
  export const EliminarMarca_Producto=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const [rows]=await db_pool_connection.query('DELETE FROM Marca_Producto WHERE id=?',[id]);
      if (rows.affectedRows>0) {
        res.status(200).json(response_success("Marca eliminado",rows[0]));
      }else{
        res.status(404).json(response_not_fount('Marca no Eliminado'));
      }
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
//#endregion Marca Producto
  
//#region categoria_producto
  export const ListaCategorias_producto=async(rep,res)=>{
    try {
      const [rows]=await db_pool_connection.query('SELECT * FROM categoria_producto');
      if (rows.length<=0) {
          return res.status(404).json(response_not_fount('No hay Marcas disponibles'))
      }
      res.status(200).json(response_success("Ok",rows));
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
  export const RegistrarCategoria_producto=async(rep,res)=>{
    try {
      const {estadoId,nombre_categoria}=rep.body;
      const [rows]=await db_pool_connection
  .query('INSERT INTO categoria_producto (estadoId,nombre_categoria) values (?, ?)',
      [estadoId,nombre_categoria]);
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Registrado'))
      }
      res.status(200).json(response_created("Categoria Registrada",rows,rows.insertId));
    } catch (error) {
      res.status(500).json(response_error("error al registrar "+ error['sqlMessage']))
    }
  }
  export const ActualizarCategoria_producto=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const {estadoId,nombre_categoria}=rep.body;
      const [rows]=await db_pool_connection
      .query('Update categoria_producto set estadoId=?,nombre_categoria=? WHERE id=?',
      [estadoId,nombre_categoria,id]);
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Actualizado'))
      }else{
        res.status(200).json(response_success("Categoria Actualizado",rows));
      }
    } catch (error) {
      res.status(500).json(response_error("error al Actualizar "+ error['sqlMessage']))
    }
  }
  export const EliminarCategoria_producto=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const [rows]=await db_pool_connection.query('DELETE FROM categoria_producto WHERE id=?',[id]);
      if (rows.affectedRows>0) {
        res.status(200).json(response_success("Categoria eliminado",rows[0]));
      }else{
        res.status(404).json(response_not_fount('Categoria no Eliminado'));
      }
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
//#endregion categoria_producto

//#region Orden
  export const ListaOrdenes_Items_ByIdUser=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const [rows] = await db_pool_connection.query(
        'SELECT * FROM Orden WHERE estadoId = 1 and usuarioId=?', [id]
      );
      if (rows.length<=0) {
          return res.status(404).json(response_not_fount('No hay Orden disponibles'))
      }else{
        const OrdenIds = rows.map(row => row.id);
        const [items] = await db_pool_connection.query(
          `
          SELECT  P.nombre_producto, 
          I.id as id_item,
          I.ordenId,
          P.nombre_producto,
          P.precio_ahora,
          I.cantidad
          FROM Items I JOIN producto P ON I.productoId = P.id WHERE ordenId IN (?)
          `, [OrdenIds]
        );
        const data={
          ordenes:rows,
          items:items
        }
        res.status(200).json(response_success("Ok",data));
      }
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
  export const ListaOrdenesByIdUser=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const [rows]=await db_pool_connection.query('SELECT * FROM Orden WHERE id=?',[id]);
      if (rows.length<=0) {
          return res.status(404).json(response_not_fount('No hay Orden disponibles'))
      }else{
        res.status(200).json(response_success("Ok",rows));
      }
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
  export const RegistrarOrden=async(rep,res)=>{
    try {
      const {estadoId,usuarioId,companiaId,nombre,apellido,email,costo_envio,total,token_orden,direccion_1,direccion_2,fecha}=rep.body;
      const [rows]=await db_pool_connection
      .query('INSERT INTO Orden (estadoId,usuarioId,companiaId,nombre,apellido,email,costo_envio,total,token_orden,direccion_1,direccion_2,fecha) values (?,?,?,?,?,?,?,?,?,?,?,?)',
      [estadoId,usuarioId,companiaId,nombre,apellido,email,costo_envio,total,token_orden,direccion_1,direccion_2,fecha]);
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Registrado'))
      }else{
        const [data]=await db_pool_connection.query(`SELECT*FROM Orden where id=?`,[rows.insertId]);
        res.status(200).json(response_success("Orden Registrada",data));
      }
    } catch (error) {
      res.status(500).json(response_error("error al registrar "+ error['sqlMessage']))
    }
  }
  export const ActualizarOrden=async(rep,res)=>{
    try {
      const id = rep.params.id;
      const token_orden = rep.params.token_orden;
      const { estadoId, fecha, usuarioId } = rep.body;

      const [rows] = await db_pool_connection.query(
        'UPDATE Orden o, items i ' +
        'SET o.estadoId = ?, o.fecha = ?, i.ordenId = o.id, i.estadoId = o.estadoId ' +
        'WHERE o.id = ? AND o.token_orden = ? ' +
        'AND i.usuarioId = ? AND i.estadoId = ?',
        [estadoId, fecha, id, token_orden, usuarioId, 2]
      );
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Actualizado'))
      }else{
        res.status(200).json(response_success("Orden Actualizado",rows));
      }
    } catch (error) {
      res.status(500).json(response_error("error al Actualizar "+ error['sqlMessage']))
    }
  }
  export const EliminarOrden=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const [rows]=await db_pool_connection.query('DELETE FROM Orden WHERE id=?',[id]);
      if (rows.affectedRows>0) {
        res.status(200).json(response_success("Orden eliminado",rows[0]));
      }else{
        res.status(404).json(response_not_fount('Orden no Eliminado'));
      }
      
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
//#endregion Orden

//#region Items

  export const ListaItemsByIdUser=async(rep,res)=>{
    try {
      const id = rep.params.id;
      const estadoId = rep.params.estadoId;
      const [rows] = await db_pool_connection.query(`
        SELECT 
        I.id as id_item,
        I.fecha,
        I.estadoId,
        P.id,
        P.nombre_producto,
        P.precio_ahora,
        P.url_Img,
        P.stock,
        I.cantidad
        FROM Items I
        INNER JOIN producto P ON I.productoId = P.id
        WHERE I.usuarioId = ? AND I.estadoId=?
      `, [id,estadoId]);
      if (rows.length <= 0) {
        return ""
      }else{
        res.status(200).json(response_success("OK", rows));
      }
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
  export const RegistrarItem=async(rep,res)=>{
    try {
      const {estadoId,usuarioId,productoId,ordenId,cantidad,fecha}=rep.body;
      const [rows]=await db_pool_connection
      .query('INSERT INTO Items (estadoId,usuarioId,productoId,ordenId,cantidad,fecha) values (?,?,?,?,?,?)',
      [estadoId,usuarioId,productoId,ordenId,cantidad,fecha]);
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Registrado'))
      }else{
        const [rows2] = await db_pool_connection.query(`
          SELECT 
          I.id as id_item,
          I.fecha,
          I.estadoId,
          P.id,
          P.nombre_producto,
          P.precio_ahora,
          P.url_Img,
          P.stock,
          I.cantidad
          FROM Items I
          INNER JOIN producto P ON I.productoId = P.id
          WHERE I.usuarioId = ? AND I.estadoId=? 
        `, [usuarioId,2]);
        res.status(200).json(response_success("OK",rows2));
      }
      
    } catch (error) {
      res.status(500).json(response_error("error al registrar "+ error['sqlMessage']))
    }
  }
  export const ActualizarItem=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const {estadoId,ordenId,cantidad,fecha}=rep.body;
      const [rows]=await db_pool_connection
      .query('Update Items set estadoId=?,ordenId=?,cantidad=?,fecha=? WHERE id=?',
      [estadoId,ordenId,cantidad,fecha,id]);
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Actualizado'))
      }else{
        res.status(200).json(response_success("Item Actualizado",rows));
      }
      
    } catch (error) {
      res.status(500).json(response_error("error al Actualizar "+ error['sqlMessage']))
    }
  }
  export const EliminarItem=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const [rows]=await db_pool_connection.query('DELETE FROM Items WHERE id=?',[id]);
      if (rows.affectedRows>0) {
        res.status(200).json(response_success("Item eliminado",rows[0]));
      }else{
        res.status(404).json(response_not_fount('Item no Eliminado'));
      }
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
//#endregion Items

//#region estado_compra
  export const Estado_compraById=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const [rows]=await db_pool_connection.query('SELECT * FROM estado_compra WHERE id=?',[id]);
      if (rows.length<=0) {
          return res.status(404).json(response_not_fount('No hay estado_compra disponibles'))
      }
      res.status(200).json(response_success("Ok",rows));
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
  export const RegistrarEstado_compra=async(rep,res)=>{
    try {
      const {descripcion}=rep.body;
      const [rows]=await db_pool_connection
    .query('INSERT INTO estado_compra (descripcion) values (?)',
      [descripcion]);
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Registrado'))
      }
      res.status(200).json(response_created("Estado_compra Registrado",rows,rows.insertId));
    } catch (error) {
      res.status(500).json(response_error("error al registrar "+ error['sqlMessage']))
    }
  }
  export const ActualizarEstado_compra=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const {descripcion}=rep.body;
      const [rows]=await db_pool_connection
      .query('Update estado_compra set descripcion=? WHERE id=?',
      [descripcion,id]);
      if (rows.length<=0) {
        return res.status(404).json(response_not_fount('No Actualizado'))
      }
      res.status(200).json(response_success("Estado_compra Actualizado",rows));
    } catch (error) {
      res.status(500).json(response_error("error al Actualizar "+ error['sqlMessage']))
    }
  }
  export const EliminarEstado_compra=async(rep,res)=>{
    try {
      const id=rep.params.id;
      const [rows]=await db_pool_connection.query('DELETE FROM estado_compra WHERE id=?',[id]);
      if (rows.affectedRows>0) {
        res.status(200).json(response_success("Estado_compra eliminado",rows[0]));
      }else{
        res.status(404).json(response_not_fount('Estado_compra no Eliminado'));
      }
    } catch (error) {
      res.status(500).json(response_error("error "+error['sqlMessage']))
    }
  }
//#endregion