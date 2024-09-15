import { createSlice } from '@reduxjs/toolkit';

export const CartSlice = createSlice({

  name: 'cart',
  initialState: {
    items: [], // Initialize items as an empty array
    totalItems: 0,
  },

  reducers: {

    addItem: (state, action) => {
        // Add the item to the cart
       const {name, image, cost} = action.payload;

         // Check if the item is already in the cart
       const existingItem = state.items.find(item => item.name === name);
       if (existingItem) {
         // If the item is already in the cart, update the quantity
         existingItem.quantity++;
       } else {
         // If the item is not in the cart, add the item
         state.items.push({
           name,
           image,
           cost,
           quantity: 1,
         });
       }
       state.totalItems++;
    },


    removeItem: (state, action) => {
        // Remove the item from the cart and return a new array of items that do not include the item to be removed
        const { name } = action.payload;
        state.items = state.items.filter(item => item.name !== name);
        state.totalItems = state.items.length;




    },

    updateQuantity: (state, action) => {

        const { name, quantity } = action.payload;
        // Find the item in the cart
        const itemToUpdate = state.items.find(item => item.name === name);

        // Update the quantity of the item
        if (itemToUpdate) {
            itemToUpdate.quantity = quantity;
            state.totalItems = state.items.reduce((total, item) => total + item.quantity, 0);
        }
    },

  },
});

export const selectorTotalItems = (state) => state.cart.totalItems;

export const { addItem, removeItem, updateQuantity } = CartSlice.actions;

export default CartSlice.reducer;
