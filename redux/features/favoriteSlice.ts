import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArtProduct } from "@/models/ArtProduct";

type FavoriteState = {
	items: ArtProduct[],
	isFavorite: boolean
}

const initialState: FavoriteState = {
	items: [],
	isFavorite: false,
}

const favoriteSlice = createSlice({
	name: "favorite",
	initialState,
	reducers: {
		addToFavorites: (state, action: PayloadAction<ArtProduct>) => {
			const exists = state.items.find((item) => item.id === action.payload.id);
			if (!exists) {
				state.items.push(action.payload);
			}
		},
		removeFromFavorites: (state, action: PayloadAction<ArtProduct>) => {
			state.items.filter(item => item.id !== action.payload.id)
		},
		toggleFavorite(state, action: PayloadAction<ArtProduct>) {
			const exists = state.items.find((item) => item.id === action.payload.id);
			if (exists) {
				// Remove if already favorite
				state.items = state.items.filter((item) => item.id !== action.payload.id);
				state.isFavorite = false;
			} else {
				// Add if not already favorite
				state.items.push(action.payload);
				state.isFavorite = true;
			}
		},
	},
});

// Correctly export the actions
export const { addToFavorites, removeFromFavorites, toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
