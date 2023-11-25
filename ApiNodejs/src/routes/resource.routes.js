import { Router } from "express";
import { ActualizarCategoria_producto, ActualizarEstado_compra, ActualizarItem, ActualizarMarca_Producto, ActualizarOrden, ActualizarProducto, EliminarCategoria_producto, EliminarEstado_compra, EliminarItem, EliminarMarca_Producto, EliminarOrden, EliminarProducto, Estado_compraById, ListaCategorias_producto, ListaItemsByIdUser, ListaMarcas_Producto, ListaOrdenesByIdUser, ListaOrdenes_Items_ByIdUser, ListaProductos, RegistrarCategoria_producto, RegistrarEstado_compra, RegistrarItem, RegistrarMarca_Producto, RegistrarOrden, RegistrarProducto } from "../controllers/resource.controller.js";

const resource=new Router();

resource.get('/consultar_productos',ListaProductos);
resource.post('/registrar_producto',RegistrarProducto);
resource.put('/actualizar_producto/:id',ActualizarProducto);
resource.delete('/eliminar_producto/:id',EliminarProducto);

resource.get('/consultar_marcas_producto',ListaMarcas_Producto);
resource.post('/registrar_marca_producto',RegistrarMarca_Producto);
resource.put('/actualizar_marca_producto/:id',ActualizarMarca_Producto);
resource.delete('/eliminar_marca_producto/:id',EliminarMarca_Producto);

resource.get('/consultar_categoria_producto',ListaCategorias_producto);
resource.post('/registrar_categoria_producto',RegistrarCategoria_producto);
resource.put('/actualizar_categoria_producto/:id',ActualizarCategoria_producto);
resource.delete('/eliminar_categoria_producto/:id',EliminarCategoria_producto);

resource.get('/consultar_ordenbyiduser/:id',ListaOrdenesByIdUser);
resource.get('/consultar_orden_items/:id',ListaOrdenes_Items_ByIdUser);
resource.post('/registrar_orden',RegistrarOrden);
resource.put('/actualizar_orden/:id/:token_orden',ActualizarOrden);
resource.delete('/eliminar_orden/:id',EliminarOrden);

resource.get('/consultar_itemsbyiduser/:id/:estadoId',ListaItemsByIdUser);
resource.post('/registrar_item',RegistrarItem);
resource.put('/actualizar_item/:id',ActualizarItem);
resource.delete('/eliminar_item/:id',EliminarItem);

resource.get('/consultar_estado_compra/:id',Estado_compraById);
resource.post('/registrar_estado_compra',RegistrarEstado_compra);
resource.put('/actualizar_estado_compra/:id',ActualizarEstado_compra);
resource.delete('/eliminar_estado_compra/:id',EliminarEstado_compra);

export default resource;

