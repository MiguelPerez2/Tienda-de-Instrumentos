import { createSlice } from "@reduxjs/toolkit";

export const itemsSlice = createSlice({
  name:"items",
  initialState: {
      statusI: 'Loading', 
      items:[],
  },
  reducers: {
    onLoadingItems: (state) => {
      state.statusI = 'Loading';
    },
    onLoadItems:(state, { payload })=>{
      state.statusI = 'Loaded';
      // state.items = payload;
      if (state.items.length !== payload.length) {
        state.items = payload;
      }
    },
    onAddItems:(state, { payload })=>{
      state.statusI = 'Add';
      if (Array.isArray(payload) && Array.isArray(state.items)) {
        // Filtra los items de payload que no existen actualmente en state.items=> items existentes
        const newItems = payload.filter((newItem) => 
          //some  comprobar si al menos un elemento del array cumple con una condición específica. 
          !state.items.some(itemExistente => itemExistente.id === newItem.id)
        );
        // Añade el nuevo item al estado
        state.items = [...state.items, ...newItems];
      }
    },
    onUpdateItems: ( state, { payload } ) => {
      state.statusI = 'Update';
       // Verifica si el elemento existe en state.items por su ID
       const index = state.items.findIndex(item => item.id_item === payload.id);
       if (index !== -1) {
        // Si el elemento existe, modifica el campo cantidad
        state.items[index].cantidad = payload.cantidad;
       }
    },
    onDeleteItems: ( state, { payload } ) => {
      state.statusI = 'Delete';
      if (state.items && payload) {
        // quita el item eliminado
        state.items = state.items.filter(item => item.id !== payload.id);
      }
    },
    onResetItems:(state)=>{
      state.statusI = 'Reset';
      state.items = []; 
    },
  }
});


export const { onLoadItems, onUpdateItems, onDeleteItems,onResetItems,onLoadingItems,onAddItems } = itemsSlice.actions;