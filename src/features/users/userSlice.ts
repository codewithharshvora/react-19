import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface User {
  id: number;
  name: string;
  username?: string;
  email?: string;
  [key: string]: string | number | boolean | null | undefined;
}

interface UsersState {
  list: User[];
}

const initialState: UsersState = {
  list: [],
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setUsers(state, action: PayloadAction<User[]>) {
      state.list = action.payload;
    },
    addUser(state, action: PayloadAction<User>) {
      state.list.push(action.payload);
    },
    updateUser(state, action: PayloadAction<User>) {
      const idx = state.list.findIndex((u) => u.id === action.payload.id);
      if (idx !== -1) {
        state.list[idx] = action.payload;
      }
    },
    removeUser(state, action: PayloadAction<number>) {
      state.list = state.list.filter((u) => u.id !== action.payload);
    },
  },
});

export const { setUsers, addUser, updateUser, removeUser } = usersSlice.actions;
export default usersSlice.reducer;
