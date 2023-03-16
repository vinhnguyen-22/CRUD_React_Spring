import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState = {
  book: null,
  languages: [],
  genres: [],
};

export const bookSlice = createSlice({
  initialState,
  name: 'bookSlice',
  reducers: {
    bookState: (state, action) => {
      state.book = action.payload;
    },
  },
});

export default bookSlice.reducer;

export const { bookState } = bookSlice.actions;
