import { createSlice} from "@reduxjs/toolkit";
import  type { PayloadAction } from "@reduxjs/toolkit";

export interface Item {
  id: number;
  name: string;
  category: string;
  quantity: number;
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
    addItem: (state, action: PayloadAction<Item>) => {
      state.items.push(action.payload);
    },
    deleteItem: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

export const { addItem, deleteItem } = listSlice.actions;
export default listSlice.reducer;
