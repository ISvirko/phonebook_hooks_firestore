import { createSlice } from "@reduxjs/toolkit";

const darkTheme = createSlice({
  name: "theme",
  initialState: false,
  reducers: {
    toggleTheme: (state) => !state,
  },
});

export default { darkTheme };
