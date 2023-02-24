import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  isSmallLayout: window.innerWidth <= 767,
  toast: {
    toastType: '',
    content: '',
    autoDeleteTime: 3000
  },
  filterDate: {
    type: null,
    startDate: null,
    endDate: null
  }
};

export const globalSlice = createSlice({
  name: 'globalSlice',
  initialState,
  reducers: {
    setSmallLayout: (state, {payload}) => {
      state.isSmallLayout = payload;
    },
    setToastType: (state, {payload}) => {
      state.toast.toastType = payload.type;
      state.toast.content = payload.content;
    },
    closeToastNotification: (state) => {
      state.toast.toastType = '';
      state.toast.content = '';
    },
    setFilterDate: (state, {payload}) => {
      state.filterDate = payload;
    },
    resetFilterDate: (state) => {
      state.filterDate = initialState.filterDate;
    }
  },
});

export const { setSmallLayout, setToastType, closeToastNotification, setFilterDate, resetFilterDate } = globalSlice.actions;

export default globalSlice.reducer;