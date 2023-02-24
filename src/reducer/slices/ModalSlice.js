import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isOpen: false,
  showDateModal: false,
  selectionCourse: ''
};

export const modalSlice = createSlice({
  name: 'modalSlice',
  initialState,
  reducers: {
    openModal: (state, {payload}) => {
      state.isOpen = true;
      state.selectionCourse = payload
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.selectionCourse = '';
    },
    isShowDateModal: (state, {payload}) => {
      state.showDateModal = payload;
    }
  },
});

export const { openModal, closeModal, isShowDateModal } = modalSlice.actions;

export default modalSlice.reducer;