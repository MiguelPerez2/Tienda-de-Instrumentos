import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Resource_api } from "../api/index";
import { onAddItems, onDeleteItems, onLoadItems, onResetItems, onUpdateItems } from "../store";

export const useResourceStore=()=>{

  const dispatch = useDispatch();
  const { statusI, items } = useSelector( state => state.cart_items );
  const [Lista_Producto, setLista_Producto] = useState([]);
  const [CategoriaProducto, setCategoriaProducto] = useState([]);
  const [ItemsCartCompradoUser, setItemsCartCompradoUser] = useState([]);


  const ListarCategoriaProducto = async () => {
    try {
      const { data } = await Resource_api.get("/consultar_categoria_producto");
      setCategoriaProducto(data.data);
    } catch (error) {
      console.error('Error', error);
    }
  }

  const ListarProductos = async () => {
    try {
      const { data } = await Resource_api.get("/consultar_productos");
      setLista_Producto(data.data);
    } catch (error) {
      console.error('Error', error);
    }
  }
  
  const ListCompradoCartUserId = async ({id}) => {
    try {
      const { data } = await Resource_api.get(`/consultar_orden_items/${id}`);
      setItemsCartCompradoUser(data.data);
    } catch (error) {
      console.error('Error', error);
    }
  }

  const ListItemsCartUserId = async ({id}) => {
    try {
      const { data } = await Resource_api.get(`/consultar_itemsbyiduser/${id}/${2}`);
      if (data.success) {
        dispatch(onLoadItems(data.data));
      }

    } catch (error) {
      console.error('Error', error);
    }
  }

  const UpdateItemsCart = async ({id,estadoId,ordenId,cantidad,fecha}) => {
    try {
      await Resource_api.put(`/actualizar_item/${id}`,{estadoId,ordenId,cantidad,fecha});
      dispatch(onUpdateItems({id,cantidad}));
    } catch (error) {
      console.error('Error', error);
    }
  }

  const AddItemsCart = async ({estadoId,usuarioId,productoId,ordenId,cantidad,fecha}) => {
    try {
      const { data } = await Resource_api.post("/registrar_item",{estadoId,usuarioId,productoId,ordenId,cantidad,fecha});
      dispatch(onAddItems(data.data));
    } catch (error) {
      console.error('Error', error);
    }
  }

  const EliminarItemsCartUserId = async ({id},object) => {
    try {
      await Resource_api.delete(`/eliminar_item/${id}`);
      dispatch(onDeleteItems(object))
    } catch (error) {
      // console.error('Error', error);
    }
  }

  const RegistarOrden = async ({estadoId,usuarioId,companiaId,nombre,apellido,email,costo_envio,total,token_orden,direccion_1,direccion_2,fecha}) => {
    try {
      const {data} =await Resource_api.post("/registrar_orden",{estadoId,usuarioId,companiaId,nombre,apellido,email,costo_envio,total,token_orden,direccion_1,direccion_2,fecha});
      if (data.success) {
        const updata= await Resource_api.put(`/actualizar_orden/${data.data[0].id}/${data.data[0].token_orden}`,{estadoId:1,fecha:fecha,usuarioId:data.data[0].usuarioId});
        dispatch(onResetItems());
        return updata.data.success
      }
    } catch (error) {
      console.error('Error', error);
    }
  }

  return{
    Lista_Producto,
    ListarProductos,
    ListItemsCartUserId,
    ListCompradoCartUserId,
    ListarCategoriaProducto,
    AddItemsCart,
    UpdateItemsCart,
    EliminarItemsCartUserId,
    RegistarOrden,
    ItemsCartCompradoUser,
    statusI,
    items,
    CategoriaProducto
  }
}