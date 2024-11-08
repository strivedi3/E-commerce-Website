import { createSlice } from "@reduxjs/toolkit";
import {
  collection,
  setDoc,
  doc,
  getDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { auth } from "../firebase";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    token: "",
    items: [],
    wishlist: [],
  },
  reducers: {
    addToken: (state, action) => {
      state.token = action.payload;
    },
    setCart: (state, action) => {
      state.items = action.payload;
    },
    setWishlist: (state, action) => {
      state.wishlist = action.payload;
    },
    addItem: (state, action) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );
      if (existingItem) {
        existingItem.quantity =
          (existingItem.quantity || 0) + (action.payload.quantity || 1);
      } else {
        state.items.push({
          ...action.payload,
          quantity: action.payload.quantity || 1,
        });
      }
      saveCartToFirestore(state.items);
    },
    adjustQuantity: (state, action) => {
      const { id, change } = action.payload;
      const item = state.items.find((item) => item.id === id);
      if (item) {
        item.quantity = (item.quantity || 0) + change;
        if (item.quantity <= 0) {
          state.items = state.items.filter((item) => item.id !== id);
        }
      }
      saveCartToFirestore(state.items);
    },
    removeItem: (state, action) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      saveCartToFirestore(state.items);
    },
    clearCart: (state) => {
      state.items = [];
      saveCartToFirestore([]);
    },

    addToWishlist: (state, action) => {
      const exists = state.wishlist.find(
        (item) => item.id === action.payload.id
      );
      if (!exists) {
        state.wishlist.push(action.payload);
      }
      saveWishlistToFirestore(state.wishlist);
    },
    removeFromWishlist: (state, action) => {
      state.wishlist = state.wishlist.filter(
        (item) => item.id !== action.payload
      );
      saveWishlistToFirestore(state.wishlist);
    },
  },
});

const saveCartToFirestore = async (items) => {
  const user = auth.currentUser;

  if (user) {
    const cartDocRef = doc(db, "carts", user.uid);
    await setDoc(cartDocRef, { items });
  }
};

const saveWishlistToFirestore = async (wishlist) => {
  const user = auth.currentUser;

  if (user) {
    const wishlistDocRef = doc(db, "wishlists", user.uid);
    await setDoc(wishlistDocRef, { wishlist });
  }
};

export const {
  addItem,
  removeItem,
  clearCart,
  adjustQuantity,
  addToWishlist,
  removeFromWishlist,
  addToken,
  setCart,
  setWishlist
} = cartSlice.actions;
export default cartSlice.reducer;
