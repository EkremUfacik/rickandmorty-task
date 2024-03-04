import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/app/store";

const initialState: { favChars: Character[] } = {
  favChars: [],
};

export const favoritesSlice = createSlice({
  name: "favorities",
  initialState,
  reducers: {
    addFavs: (state, action: PayloadAction<Character>) => {
      state.favChars.push(action.payload);
    },

    removeFavs: (state, action: PayloadAction<string>) => {
      state.favChars = state.favChars.filter(
        (char) => char.id !== action.payload
      );
    },
  },
});

export const { addFavs, removeFavs } = favoritesSlice.actions;

export const selectFavorites = (state: RootState) => state.favorities.favChars;

export default favoritesSlice.reducer;
