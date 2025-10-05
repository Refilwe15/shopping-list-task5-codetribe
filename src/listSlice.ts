import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id: number;
  name: string;
  category: string;
  quantity: number;
  description?: string;
  image?: string;
  favorite?: boolean;
}

interface ListState {
  items: Item[];
}

const initialState: ListState = {
  items: [],
};

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    setItems: (state, action: PayloadAction<Item[]>) => {
      state.items = action.payload;
    },
  },
});

export const { setItems } = listSlice.actions; // ✅ Named export
export default listSlice.reducer;
